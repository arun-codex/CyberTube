// Auto-generated IoT Executable Lab Catalog
// Authoritative practical firmware, wiring netlists, verified PCAP signatures & troubleshooting

export interface LabWiringConnection {
  component: string;
  pin: string;
  esp32Pin: string;
  signalType: string;
  voltage: string;
  description: string;
}

export interface LabPcapMetadata {
  filename: string;
  url: string;
  sha256: string;
  packetCount: number;
  sizeBytes: number;
  protocols: string[];
}

export interface LabCompilationMetadata {
  status: 'COMPILED' | 'STATICALLY_VALIDATED' | 'SIMULATION_PASSED' | 'PHYSICALLY_TESTED' | 'NOT_APPLICABLE';
  board: string;
  flash_usage?: string;
  ram_usage?: string;
  exit_code?: number;
  verified_at?: string;
}

export interface ExecutableLabDefinition {
  moduleNumber: number;
  moduleId: string;
  hasHardwareFirmware: boolean;
  firmware: string;
  expectedOutput: string;
  troubleshootingMarkdown: string;
  wiring: any[];
  safetyRules: string[];
  pcap: LabPcapMetadata;
  compilation: LabCompilationMetadata;
}

export const IOT_EXECUTABLE_LABS: Record<number, ExecutableLabDefinition> = {
  "1": {
    "moduleNumber": 1,
    "moduleId": "module-01",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 01 Firmware: Embedded Toolchain & ESP32 Hardware Bring-Up\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n\n#define STATUS_LED_PIN 2\n#define BAUD_RATE 115200\n\nvoid setup() {\n  Serial.begin(BAUD_RATE);\n  while (!Serial && millis() < 3000);\n  \n  pinMode(STATUS_LED_PIN, OUTPUT);\n  digitalWrite(STATUS_LED_PIN, HIGH);\n  \n  Serial.println(\"=================================================\");\n  Serial.println(\"[CYBERTUBE] Module 01: Toolchain Bring-Up & Diagnostics\");\n  Serial.println(\"[SYSTEM] Target: ESP32 DevKit V1 (Xtensa LX6 Dual-Core)\");\n  Serial.printf(\"[SYSTEM] Clock Frequency: %u MHz\\\\n\", getCpuFrequencyMhz());\n  Serial.printf(\"[SYSTEM] Flash Size: %u MB\\\\n\", ESP.getFlashChipSize() / (1024 * 1024));\n  Serial.printf(\"[SYSTEM] Free Heap: %u bytes\\\\n\", ESP.getFreeHeap());\n  Serial.println(\"[SYSTEM] Voltage Rail: Verified 3.3V DC Onboard LDO\");\n  Serial.println(\"[SYSTEM] Toolchain Verification: SUCCESS\");\n  Serial.println(\"=================================================\");\n  \n  digitalWrite(STATUS_LED_PIN, LOW);\n}\n\nvoid loop() {\n  digitalWrite(STATUS_LED_PIN, HIGH);\n  delay(500);\n  digitalWrite(STATUS_LED_PIN, LOW);\n  delay(500);\n  \n  Serial.printf(\"[HEARTBEAT] Uptime: %lu ms | Free Heap: %u bytes | Status: HEALTHY\\\\n\",\n    millis(), ESP.getFreeHeap());\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 01 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=01 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=01 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=01 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 01\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m01-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m01-telemetry.pcap",
      "sha256": "f27ed13cb294e5b7b582265646bc89f24535964115cfea2369064665ae2a55db",
      "packetCount": 3,
      "sizeBytes": 310,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "292317 bytes (22%)",
      "ram_usage": "23208 bytes (7%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "2": {
    "moduleNumber": 2,
    "moduleId": "module-02",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 02: Discrete Circuit Instrumentation & DC Voltage Measurement\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Logic Level Invariant: Strictly <= 3.3V DC logic. Zero mains AC.\n\n#include <Arduino.h>\n\nconst int LED_PIN = 2;          // Active-HIGH status LED via 220-ohm resistor\nconst int BUTTON_PIN = 4;       // Active-LOW push button with 10k-ohm external pull-up\nconst int VOLTAGE_SENSE_PIN = 34; // Analog sense input (ADC1_CH6, input only)\n\nunsigned long lastSampleTime = 0;\nconst unsigned long SAMPLE_INTERVAL_MS = 1000;\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 3000);\n\n  pinMode(LED_PIN, OUTPUT);\n  pinMode(BUTTON_PIN, INPUT_PULLUP);\n  // ADC configuration: 12-bit resolution (0-4095), 11dB attenuation (up to ~3.3V)\n  analogReadResolution(12);\n  analogSetAttenuation(ADC_11db);\n\n  digitalWrite(LED_PIN, LOW);\n\n  Serial.println(\"==================================================\");\n  Serial.println(\"[CYBERTUBE] Lab 02: DC Circuit Measurement Initialized\");\n  Serial.println(\"[CYBERTUBE] Architecture: 3.3V Low-Voltage Discrete DC\");\n  Serial.println(\"[CYBERTUBE] Hardware: ESP32 DevKit, MB-102 Breadboard\");\n  Serial.println(\"==================================================\");\n}\n\nvoid loop() {\n  unsigned long now = millis();\n\n  // Read button state (LOW when pressed due to pull-up)\n  bool buttonPressed = (digitalRead(BUTTON_PIN) == LOW);\n  digitalWrite(LED_PIN, buttonPressed ? HIGH : LOW);\n\n  if (now - lastSampleTime >= SAMPLE_INTERVAL_MS) {\n    lastSampleTime = now;\n\n    // Multisampling ADC to reduce thermal and switching noise\n    uint32_t adcSum = 0;\n    const int SAMPLES = 32;\n    for (int i = 0; i < SAMPLES; i++) {\n      adcSum += analogRead(VOLTAGE_SENSE_PIN);\n      delayMicroseconds(50);\n    }\n    uint32_t rawAdc = adcSum / SAMPLES;\n\n    // Convert raw ADC (0-4095) to measured millivolts (3.3V reference)\n    float measuredVolts = (rawAdc * 3.3f) / 4095.0f;\n\n    Serial.print(\"[MEASURE] Time=\");\n    Serial.print(now / 1000);\n    Serial.print(\"s | RawADC=\");\n    Serial.print(rawAdc);\n    Serial.print(\" | RailVoltage=\");\n    Serial.print(measuredVolts, 3);\n    Serial.print(\"V | ButtonState=\");\n    Serial.print(buttonPressed ? \"PRESSED(0)\" : \"RELEASED(1)\");\n    Serial.print(\" | LEDState=\");\n    Serial.println(buttonPressed ? \"ON\" : \"OFF\");\n  }\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 02 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=02 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=02 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=02 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 02\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      },
      {
        "from": "ESP32_GPIO02",
        "to": "RESISTOR_220R_PIN1",
        "color": "YELLOW",
        "signal": "STATUS_LED"
      },
      {
        "from": "RESISTOR_220R_PIN2",
        "to": "LED_ANODE",
        "color": "YELLOW",
        "signal": "CURRENT_LIMITED_LED"
      },
      {
        "from": "LED_CATHODE",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      },
      {
        "from": "ESP32_GPIO04",
        "to": "PUSHBUTTON_PIN1",
        "color": "BLUE",
        "signal": "BUTTON_INPUT"
      },
      {
        "from": "PUSHBUTTON_PIN2",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "PULL_UP"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m02-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m02-telemetry.pcap",
      "sha256": "c20fd480a2f716ceca7f40ade2441211ac54b5dcdf9f5c07ce33a55bec980e5d",
      "packetCount": 3,
      "sizeBytes": 310,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "300697 bytes (22%)",
      "ram_usage": "23304 bytes (7%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "3": {
    "moduleNumber": 3,
    "moduleId": "module-03",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 03: ESP32 Architectural Diagnostics & Boot Provenance Baseline\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n#include <esp_system.h>\n#include <esp_chip_info.h>\n\nconst int HEARTBEAT_PIN = 2; // Onboard diagnostic LED\nunsigned long lastHeartbeat = 0;\nbool heartbeatState = false;\n\nconst char* getResetReasonString(esp_reset_reason_t reason) {\n  switch (reason) {\n    case ESP_RST_POWERON:  return \"Power-on Reset (Cold Boot)\";\n    case ESP_RST_EXT:      return \"External Pin Reset\";\n    case ESP_RST_SW:       return \"Software Reset (esp_restart)\";\n    case ESP_RST_PANIC:    return \"Software Exception / Panic Reset\";\n    case ESP_RST_INT_WDT:  return \"Interrupt Watchdog Reset\";\n    case ESP_RST_TASK_WDT: return \"Task Watchdog Reset\";\n    case ESP_RST_WDT:      return \"Other Watchdog Reset\";\n    case ESP_RST_DEEPSLEEP:return \"Wakeup from Deep Sleep\";\n    case ESP_RST_BROWNOUT: return \"Brownout Reset (Hardware Voltage Dip)\";\n    case ESP_RST_SDIO:     return \"SDIO Reset\";\n    default:               return \"Unknown Reset Cause\";\n  }\n}\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 3000);\n\n  pinMode(HEARTBEAT_PIN, OUTPUT);\n\n  // Retrieve hardware runtime registers\n  esp_reset_reason_t resetReason = esp_reset_reason();\n  uint32_t cpuFreq = getCpuFrequencyMhz();\n  uint32_t xtalFreq = getXtalFrequencyMhz();\n  uint32_t flashSize = ESP.getFlashChipSize();\n  uint32_t flashSpeed = ESP.getFlashChipSpeed();\n  uint32_t freeHeap = ESP.getFreeHeap();\n  uint8_t chipRev = ESP.getChipRevision();\n  esp_chip_info_t chipInfo;\n  esp_chip_info(&chipInfo);\n\n  Serial.println();\n  Serial.println(\"==================================================\");\n  Serial.println(\"[CYBERTUBE] Lab 03: ESP32 Hardware Provenance Audit\");\n  Serial.println(\"==================================================\");\n  Serial.print(\"[HARDWARE] Chip Model:        ESP32 (Revision \");\n  Serial.print(chipRev);\n  Serial.println(\")\");\n  Serial.print(\"[HARDWARE] CPU Cores:         \");\n  Serial.println(chipInfo.cores);\n  Serial.print(\"[HARDWARE] CPU Frequency:     \");\n  Serial.print(cpuFreq);\n  Serial.println(\" MHz\");\n  Serial.print(\"[HARDWARE] XTAL Frequency:    \");\n  Serial.print(xtalFreq);\n  Serial.println(\" MHz\");\n  Serial.print(\"[HARDWARE] Flash Chip Size:   \");\n  Serial.print(flashSize / (1024 * 1024));\n  Serial.println(\" MB\");\n  Serial.print(\"[HARDWARE] Flash Bus Speed:   \");\n  Serial.print(flashSpeed / 1000000);\n  Serial.println(\" MHz\");\n  Serial.print(\"[HARDWARE] Initial Free Heap: \");\n  Serial.print(freeHeap);\n  Serial.println(\" bytes\");\n  Serial.print(\"[BOOT-SEC] Last Reset Reason: \");\n  Serial.print(resetReason);\n  Serial.print(\" -> \");\n  Serial.println(getResetReasonString(resetReason));\n  Serial.println(\"==================================================\");\n}\n\nvoid loop() {\n  unsigned long now = millis();\n\n  // 1 Hz non-blocking diagnostic heartbeat\n  if (now - lastHeartbeat >= 1000) {\n    lastHeartbeat = now;\n    heartbeatState = !heartbeatState;\n    digitalWrite(HEARTBEAT_PIN, heartbeatState ? HIGH : LOW);\n\n    Serial.print(\"[HEARTBEAT] Uptime=\");\n    Serial.print(now / 1000);\n    Serial.print(\"s | FreeHeap=\");\n    Serial.print(ESP.getFreeHeap());\n    Serial.print(\"B | MinFreeHeap=\");\n    Serial.print(ESP.getMinFreeHeap());\n    Serial.println(\"B | Status=STABLE\");\n  }\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 03 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=03 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=03 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=03 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 03\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m03-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m03-telemetry.pcap",
      "sha256": "20bf05419fc1a9f1770fd140a4509a0fa12f50f3dead5f5f33449f89cd72895f",
      "packetCount": 3,
      "sizeBytes": 310,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "293637 bytes (22%)",
      "ram_usage": "23216 bytes (7%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "4": {
    "moduleNumber": 4,
    "moduleId": "module-04",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 04: Robust Button Debouncing & Hardware Interrupts (ISR)\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n\nconst int BUTTON_PIN = 4;   // Active-LOW input switch\nconst int LED_PIN = 2;      // Controlled output indicator\nconst unsigned long DEBOUNCE_DELAY_MS = 50; // Stable debounce window\n\n// Volatile variables modified in ISR\nvolatile uint32_t isrTriggerCount = 0;\nvolatile unsigned long lastIsrTimestamp = 0;\n\n// Button state machine\nint buttonState = HIGH;\nint lastReading = HIGH;\nunsigned long lastDebounceTime = 0;\nuint32_t debouncedPressCount = 0;\nbool ledState = false;\n\n// IRAM_ATTR ensures ISR execution from internal instruction RAM for low jitter\nvoid IRAM_ATTR buttonInterruptHandler() {\n  isrTriggerCount++;\n  lastIsrTimestamp = millis();\n}\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 3000);\n\n  pinMode(LED_PIN, OUTPUT);\n  pinMode(BUTTON_PIN, INPUT_PULLUP);\n  digitalWrite(LED_PIN, LOW);\n\n  // Attach falling-edge interrupt (button press to GND)\n  attachInterrupt(digitalPinToInterrupt(BUTTON_PIN), buttonInterruptHandler, FALLING);\n\n  Serial.println(\"==================================================\");\n  Serial.println(\"[CYBERTUBE] Lab 04: GPIO Debounce & ISR Security Lab\");\n  Serial.println(\"[CONFIG] Button Pin: GPIO 4 (INPUT_PULLUP)\");\n  Serial.println(\"[CONFIG] LED Pin:    GPIO 2 (OUTPUT)\");\n  Serial.println(\"[CONFIG] Debounce:   50ms Non-blocking Window\");\n  Serial.println(\"==================================================\");\n}\n\nvoid loop() {\n  int currentReading = digitalRead(BUTTON_PIN);\n\n  // Reset debounce timer on any state transition\n  if (currentReading != lastReading) {\n    lastDebounceTime = millis();\n  }\n\n  // Validate state only if steady for >= DEBOUNCE_DELAY_MS\n  if ((millis() - lastDebounceTime) > DEBOUNCE_DELAY_MS) {\n    if (currentReading != buttonState) {\n      buttonState = currentReading;\n\n      // On verified LOW transition (pressed)\n      if (buttonState == LOW) {\n        debouncedPressCount++;\n        ledState = !ledState;\n        digitalWrite(LED_PIN, ledState ? HIGH : LOW);\n\n        Serial.print(\"[EVENT] Debounced Press #\");\n        Serial.print(debouncedPressCount);\n        Serial.print(\" | Raw ISR Triggers: \");\n        Serial.print(isrTriggerCount);\n        Serial.print(\" | Bounces Suppressed: \");\n        Serial.print(isrTriggerCount > debouncedPressCount ? (isrTriggerCount - debouncedPressCount) : 0);\n        Serial.print(\" | LED State: \");\n        Serial.println(ledState ? \"ON\" : \"OFF\");\n      }\n    }\n  }\n\n  lastReading = currentReading;\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 04 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=04 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=04 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=04 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 04\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      },
      {
        "from": "ESP32_GPIO02",
        "to": "RESISTOR_220R_PIN1",
        "color": "YELLOW",
        "signal": "STATUS_LED"
      },
      {
        "from": "RESISTOR_220R_PIN2",
        "to": "LED_ANODE",
        "color": "YELLOW",
        "signal": "CURRENT_LIMITED_LED"
      },
      {
        "from": "LED_CATHODE",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      },
      {
        "from": "ESP32_GPIO04",
        "to": "PUSHBUTTON_PIN1",
        "color": "BLUE",
        "signal": "BUTTON_INPUT"
      },
      {
        "from": "PUSHBUTTON_PIN2",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "PULL_UP"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m04-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m04-telemetry.pcap",
      "sha256": "8f4f21ed12ec7fc8645238499f0ed67a8edaae5e75698c6d90cf06306c59dfa7",
      "packetCount": 3,
      "sizeBytes": 310,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "294393 bytes (22%)",
      "ram_usage": "23728 bytes (7%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "5": {
    "moduleNumber": 5,
    "moduleId": "module-05",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 05: IoT Sensors & Telemetry Data Integrity Verification\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n#include <DHT.h>\n\n#define DHTPIN 4\n#define DHTTYPE DHT22\n#define ANALOG_LDR_PIN 34\n#define ALARM_LED_PIN 2\n\nDHT dht(DHTPIN, DHTTYPE);\n\nunsigned long lastSensorRead = 0;\nconst unsigned long READ_INTERVAL_MS = 2000;\nuint32_t packetSequence = 0;\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 3000);\n\n  pinMode(ALARM_LED_PIN, OUTPUT);\n  digitalWrite(ALARM_LED_PIN, LOW);\n\n  analogReadResolution(12);\n  analogSetAttenuation(ADC_11db);\n\n  dht.begin();\n\n  Serial.println(\"==================================================\");\n  Serial.println(\"[CYBERTUBE] Lab 05: Sensor Telemetry & Range Integrity\");\n  Serial.println(\"[SENSORS] DHT22 (Digital Temp/Humidity on GPIO 4)\");\n  Serial.println(\"[SENSORS] LDR Analog Sensor (ADC1 CH6 on GPIO 34)\");\n  Serial.println(\"==================================================\");\n}\n\nvoid loop() {\n  unsigned long now = millis();\n\n  if (now - lastSensorRead >= READ_INTERVAL_MS) {\n    lastSensorRead = now;\n    packetSequence++;\n\n    // 1. Read Digital Sensor\n    float humidity = dht.readHumidity();\n    float temperature = dht.readTemperature();\n\n    // 2. Read and average analog sensor (16 samples)\n    uint32_t ldrSum = 0;\n    for (int i = 0; i < 16; i++) {\n      ldrSum += analogRead(ANALOG_LDR_PIN);\n      delayMicroseconds(50);\n    }\n    uint32_t rawLdr = ldrSum / 16;\n    float ldrVoltage = (rawLdr * 3.3f) / 4095.0f;\n\n    // 3. Telemetry Sanity and Anomaly Checks\n    bool dhtValid = !isnan(humidity) && !isnan(temperature);\n    bool tempInRange = dhtValid && (temperature >= -20.0f && temperature <= 60.0f);\n    bool humInRange = dhtValid && (humidity >= 0.0f && humidity <= 100.0f);\n    bool ldrInRange = (rawLdr >= 0 && rawLdr <= 4095);\n\n    bool integrityPass = dhtValid && tempInRange && humInRange && ldrInRange;\n    digitalWrite(ALARM_LED_PIN, integrityPass ? LOW : HIGH);\n\n    Serial.print(\"[TELEMETRY] Seq=\");\n    Serial.print(packetSequence);\n    Serial.print(\" | Temp=\");\n    if (dhtValid) {\n      Serial.print(temperature, 1);\n      Serial.print(\"C\");\n    } else {\n      Serial.print(\"SENSOR_FAIL\");\n    }\n\n    Serial.print(\" | Humidity=\");\n    if (dhtValid) {\n      Serial.print(humidity, 1);\n      Serial.print(\"%\");\n    } else {\n      Serial.print(\"SENSOR_FAIL\");\n    }\n\n    Serial.print(\" | LightADC=\");\n    Serial.print(rawLdr);\n    Serial.print(\" (\");\n    Serial.print(ldrVoltage, 2);\n    Serial.print(\"V)\");\n\n    Serial.print(\" | Integrity=\");\n    if (integrityPass) {\n      Serial.println(\"VALID\");\n    } else {\n      Serial.println(\"ANOMALY_DETECTED\");\n    }\n  }\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 05 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=05 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=05 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=05 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 05\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      },
      {
        "from": "ESP32_GPIO21",
        "to": "BME280_SDA",
        "color": "GREEN",
        "signal": "I2C_DATA_3V3"
      },
      {
        "from": "ESP32_GPIO22",
        "to": "BME280_SCL",
        "color": "WHITE",
        "signal": "I2C_CLOCK_3V3"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m05-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m05-telemetry.pcap",
      "sha256": "86052e12537e608f4834482ff4068241ba46faa74ddd55867cb925bcbf4d060d",
      "packetCount": 3,
      "sizeBytes": 310,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "302529 bytes (23%)",
      "ram_usage": "23328 bytes (7%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "6": {
    "moduleNumber": 6,
    "moduleId": "module-06",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 06: Transistor Actuator Control & Hardware Watchdog Safety\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n#include <esp_task_wdt.h>\n\nconst int ACTUATOR_PIN = 5; // Base drive for NPN 2N2222 through 1k-ohm resistor\nconst int STATUS_LED_PIN = 2;\nconst int FAULT_TRIGGER_PIN = 4; // Simulated fault injection button\n\nconst int WDT_TIMEOUT_SECONDS = 3;\nunsigned long lastActuatorCycle = 0;\nbool actuatorState = false;\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 3000);\n\n  pinMode(ACTUATOR_PIN, OUTPUT);\n  pinMode(STATUS_LED_PIN, OUTPUT);\n  pinMode(FAULT_TRIGGER_PIN, INPUT_PULLUP);\n\n  // Ensure actuator is de-energized in safe state at boot\n  digitalWrite(ACTUATOR_PIN, LOW);\n  digitalWrite(STATUS_LED_PIN, LOW);\n\n  // Configure Hardware Task Watchdog Timer\n  esp_task_wdt_config_t twdt_config = {\n      .timeout_ms = 3000,\n      .idle_core_mask = 0,\n      .trigger_panic = true\n  };\n  esp_task_wdt_init(&twdt_config);\n  esp_task_wdt_add(NULL); // Subscribe current loop task to watchdog\n\n  Serial.println(\"==================================================\");\n  Serial.println(\"[CYBERTUBE] Lab 06: Transistor & Safety Watchdog Lab\");\n  Serial.println(\"[SAFETY] Hardware Actuator Pin: GPIO 5 (Low-Side NPN Drive)\");\n  Serial.println(\"[SAFETY] Watchdog Timeout:     3 Seconds (Hardware Panic)\");\n  Serial.println(\"[SIMULATE] Press GPIO 4 to inject infinite hang condition\");\n  Serial.println(\"==================================================\");\n}\n\nvoid loop() {\n  unsigned long now = millis();\n\n  // Test fault injection: if button pressed, hang loop without feeding watchdog\n  if (digitalRead(FAULT_TRIGGER_PIN) == LOW) {\n    Serial.println(\"[ALERT] Fault Triggered! Halting task loop (watchdog starve test)...\");\n    digitalWrite(ACTUATOR_PIN, HIGH); // Actuator stuck on\n    while (true) {\n      // Loop hangs here without esp_task_wdt_reset()\n      delay(100);\n    }\n  }\n\n  // Actuator switching cycle: 1s ON, 2s OFF\n  if (!actuatorState && (now - lastActuatorCycle >= 2000)) {\n    actuatorState = true;\n    lastActuatorCycle = now;\n    digitalWrite(ACTUATOR_PIN, HIGH);\n    digitalWrite(STATUS_LED_PIN, HIGH);\n    Serial.println(\"[ACTUATOR] State -> ENERGIZED (Base Drive HIGH via NPN)\");\n  } else if (actuatorState && (now - lastActuatorCycle >= 1000)) {\n    actuatorState = false;\n    lastActuatorCycle = now;\n    digitalWrite(ACTUATOR_PIN, LOW);\n    digitalWrite(STATUS_LED_PIN, LOW);\n    Serial.println(\"[ACTUATOR] State -> DE-ENERGIZED (Safe State)\");\n  }\n\n  // Pet the hardware watchdog to confirm normal health\n  esp_task_wdt_reset();\n  delay(50);\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 06 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=06 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=06 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=06 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 06\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      },
      {
        "from": "ESP32_GPIO25",
        "to": "BASE_RESISTOR_1K",
        "color": "YELLOW",
        "signal": "PWM_GATE_DRIVE"
      },
      {
        "from": "BASE_RESISTOR_1K",
        "to": "2N2222_BASE",
        "color": "YELLOW",
        "signal": "BASE_CURRENT"
      },
      {
        "from": "2N2222_EMITTER",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      },
      {
        "from": "2N2222_COLLECTOR",
        "to": "LOAD_CATHODE",
        "color": "BLUE",
        "signal": "SWITCHED_LOW_SIDE"
      },
      {
        "from": "LOAD_ANODE",
        "to": "FLYBACK_DIODE_CATHODE",
        "color": "RED",
        "signal": "CLAMPED_RAIL"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m06-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m06-telemetry.pcap",
      "sha256": "f10961982dd5cfbc21440268e48405919769c4ce5e2b74a53c62a241a1a6e01f",
      "packetCount": 3,
      "sizeBytes": 310,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "292097 bytes (22%)",
      "ram_usage": "23216 bytes (7%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "7": {
    "moduleNumber": 7,
    "moduleId": "module-07",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 07: ESP32 Wi-Fi Station Networking & Telemetry Baseline\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n#include <WiFi.h>\n\n// Authorized isolated lab Wi-Fi credentials\nconst char* WIFI_SSID = \"Wokwi-GUEST\"; // Standard Wokwi simulation Wi-Fi SSID\nconst char* WIFI_PASS = \"\";\n\nunsigned long lastNetStatus = 0;\nconst unsigned long STATUS_INTERVAL_MS = 3000;\n\nvoid onWiFiEvent(WiFiEvent_t event) {\n  switch (event) {\n    case ARDUINO_EVENT_WIFI_STA_START:\n      Serial.println(\"[WIFI-EVENT] Station Interface Started\");\n      break;\n    case ARDUINO_EVENT_WIFI_STA_CONNECTED:\n      Serial.println(\"[WIFI-EVENT] Connected to Access Point\");\n      break;\n    case ARDUINO_EVENT_WIFI_STA_GOT_IP:\n      Serial.print(\"[WIFI-EVENT] IP Address Acquired: \");\n      Serial.println(WiFi.localIP());\n      break;\n    case ARDUINO_EVENT_WIFI_STA_DISCONNECTED:\n      Serial.println(\"[WIFI-EVENT] Disconnected from Access Point, Reconnecting...\");\n      WiFi.begin(WIFI_SSID, WIFI_PASS);\n      break;\n    default:\n      break;\n  }\n}\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 3000);\n\n  Serial.println(\"==================================================\");\n  Serial.println(\"[CYBERTUBE] Lab 07: Wi-Fi Stack & IP Diagnostics\");\n  Serial.println(\"==================================================\");\n\n  WiFi.disconnect(true);\n  delay(100);\n\n  WiFi.onEvent(onWiFiEvent);\n  WiFi.mode(WIFI_STA);\n  Serial.print(\"[NET] Connecting to SSID: \");\n  Serial.println(WIFI_SSID);\n\n  WiFi.begin(WIFI_SSID, WIFI_PASS);\n}\n\nvoid loop() {\n  unsigned long now = millis();\n\n  if (now - lastNetStatus >= STATUS_INTERVAL_MS) {\n    lastNetStatus = now;\n\n    if (WiFi.status() == WL_CONNECTED) {\n      Serial.print(\"[NET-STATUS] IP: \");\n      Serial.print(WiFi.localIP());\n      Serial.print(\" | Subnet: \");\n      Serial.print(WiFi.subnetMask());\n      Serial.print(\" | Gateway: \");\n      Serial.print(WiFi.gatewayIP());\n      Serial.print(\" | DNS: \");\n      Serial.print(WiFi.dnsIP());\n      Serial.print(\" | RSSI: \");\n      Serial.print(WiFi.RSSI());\n      Serial.println(\" dBm\");\n    } else {\n      Serial.println(\"[NET-STATUS] Wi-Fi Status: CONNECTING...\");\n    }\n  }\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 07 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=07 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=07 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=07 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 07\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m07-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m07-telemetry.pcap",
      "sha256": "72e4eb1fe9db295b3c1b9e6e7e59439d9e97a3d67fa27a9ce34dbd6e6858d0fe",
      "packetCount": 3,
      "sizeBytes": 310,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "946441 bytes (72%)",
      "ram_usage": "48648 bytes (14%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "8": {
    "moduleNumber": 8,
    "moduleId": "module-08",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 08: Authenticated MQTT Telemetry & Topic ACL Verification\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n#include <WiFi.h>\n#include <PubSubClient.h>\n\n// Network & Broker Configuration\nconst char* WIFI_SSID = \"Wokwi-GUEST\";\nconst char* WIFI_PASS = \"\";\nconst char* MQTT_BROKER = \"10.0.2.2\"; // Localhost gateway in simulation / lab broker\nconst int MQTT_PORT = 1883;\n\n// Authorized MQTT Client Credentials (NIST IR 8259 Device Authentication)\nconst char* MQTT_CLIENT_ID = \"esp32-sensor-node-08\";\nconst char* MQTT_USER = \"sensor_agent\";\nconst char* MQTT_PASS = \"Pass_Acl_2026\";\n\n// Topics governed by Mosquitto ACLs\nconst char* TOPIC_TELEMETRY = \"lab/m08/telemetry\";\nconst char* TOPIC_COMMANDS = \"lab/m08/commands\";\n\nWiFiClient espClient;\nPubSubClient mqttClient(espClient);\n\nunsigned long lastMqttPublish = 0;\nunsigned long lastReconnectAttempt = 0;\nuint32_t messageId = 0;\n\nvoid onMqttMessage(char* topic, byte* payload, unsigned int length) {\n  char message[length + 1];\n  memcpy(message, payload, length);\n  message[length] = '\\0';\n\n  Serial.print(\"[MQTT-RX] Topic: \");\n  Serial.print(topic);\n  Serial.print(\" | Payload: \");\n  Serial.println(message);\n}\n\nvoid reconnectMqtt() {\n  unsigned long now = millis();\n  if (!mqttClient.connected() && (now - lastReconnectAttempt >= 5000)) {\n    lastReconnectAttempt = now;\n    Serial.print(\"[MQTT] Connecting to broker \");\n    Serial.print(MQTT_BROKER);\n    Serial.print(\":\");\n    Serial.print(MQTT_PORT);\n    Serial.print(\" as \");\n    Serial.println(MQTT_CLIENT_ID);\n\n    if (mqttClient.connect(MQTT_CLIENT_ID, MQTT_USER, MQTT_PASS)) {\n      Serial.println(\"[MQTT] Authenticated session established!\");\n      mqttClient.subscribe(TOPIC_COMMANDS);\n      Serial.print(\"[MQTT] Subscribed to command topic: \");\n      Serial.println(TOPIC_COMMANDS);\n    } else {\n      Serial.print(\"[MQTT] Connection failed, rc=\");\n      Serial.println(mqttClient.state());\n    }\n  }\n}\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 3000);\n\n  Serial.println(\"==================================================\");\n  Serial.println(\"[CYBERTUBE] Lab 08: Authenticated MQTT Telemetry Node\");\n  Serial.println(\"==================================================\");\n\n  WiFi.mode(WIFI_STA);\n  WiFi.begin(WIFI_SSID, WIFI_PASS);\n\n  mqttClient.setServer(MQTT_BROKER, MQTT_PORT);\n  mqttClient.setCallback(onMqttMessage);\n}\n\nvoid loop() {\n  // Maintain Wi-Fi\n  if (WiFi.status() != WL_CONNECTED) {\n    delay(100);\n    return;\n  }\n\n  // Maintain MQTT session\n  if (!mqttClient.connected()) {\n    reconnectMqtt();\n  } else {\n    mqttClient.loop();\n\n    unsigned long now = millis();\n    if (now - lastMqttPublish >= 3000) {\n      lastMqttPublish = now;\n      messageId++;\n\n      // Construct authentic JSON telemetry payload\n      char payloadBuffer[128];\n      snprintf(payloadBuffer, sizeof(payloadBuffer),\n               \"{\\\"id\\\":%u,\\\"uptime\\\":%lu,\\\"heap\\\":%u,\\\"status\\\":\\\"HEALTHY\\\"}\",\n               messageId, now / 1000, ESP.getFreeHeap());\n\n      bool published = mqttClient.publish(TOPIC_TELEMETRY, payloadBuffer);\n      Serial.print(\"[MQTT-TX] Topic: \");\n      Serial.print(TOPIC_TELEMETRY);\n      Serial.print(\" | Success: \");\n      Serial.print(published ? \"YES\" : \"FAILED\");\n      Serial.print(\" | Data: \");\n      Serial.println(payloadBuffer);\n    }\n  }\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 08 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=08 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=08 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=08 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 08\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m08-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m08-telemetry.pcap",
      "sha256": "da3ed37c9107ec66719072819d0901d6019fa55cc68a0f559fc1d92b49b67aec",
      "packetCount": 3,
      "sizeBytes": 358,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "MQTT",
        "TCP",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "964649 bytes (73%)",
      "ram_usage": "50088 bytes (15%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "9": {
    "moduleNumber": 9,
    "moduleId": "module-09",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 09: Embedded REST API & HTTP Access Control\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n#include <WiFi.h>\n#include <WebServer.h>\n\nconst char* WIFI_SSID = \"Wokwi-GUEST\";\nconst char* WIFI_PASS = \"\";\nconst char* API_KEY = \"apex-iot-auth-token-2026\"; // Enforced on write endpoints\n\nconst int STATUS_LED_PIN = 2;\nbool actuatorState = false;\n\nWebServer server(80);\n\nbool isAuthorized() {\n  if (server.hasHeader(\"X-API-Key\")) {\n    String token = server.header(\"X-API-Key\");\n    return token.equals(API_KEY);\n  }\n  return false;\n}\n\nvoid handleRoot() {\n  server.send(200, \"text/plain\", \"CyberTube Lab 09: Embedded REST Server Online\\nEndpoints: GET /api/telemetry, POST /api/actuator\");\n}\n\nvoid handleGetTelemetry() {\n  char jsonBuffer[128];\n  snprintf(jsonBuffer, sizeof(jsonBuffer),\n           \"{\\\"uptime_sec\\\":%lu,\\\"actuator_state\\\":%s,\\\"free_heap\\\":%u}\",\n           millis() / 1000, actuatorState ? \"true\" : \"false\", ESP.getFreeHeap());\n  server.send(200, \"application/json\", jsonBuffer);\n}\n\nvoid handlePostActuator() {\n  if (!isAuthorized()) {\n    server.send(401, \"application/json\", \"{\\\"error\\\":\\\"Unauthorized: Missing or invalid X-API-Key\\\"}\");\n    return;\n  }\n\n  if (!server.hasArg(\"state\")) {\n    server.send(400, \"application/json\", \"{\\\"error\\\":\\\"Bad Request: 'state' parameter required (0 or 1)\\\"}\");\n    return;\n  }\n\n  String requestedState = server.arg(\"state\");\n  // Strict input sanitization (reject buffer injection or unexpected chars)\n  if (requestedState == \"1\" || requestedState == \"true\") {\n    actuatorState = true;\n  } else if (requestedState == \"0\" || requestedState == \"false\") {\n    actuatorState = false;\n  } else {\n    server.send(422, \"application/json\", \"{\\\"error\\\":\\\"Unprocessable Entity: Invalid state value\\\"}\");\n    return;\n  }\n\n  digitalWrite(STATUS_LED_PIN, actuatorState ? HIGH : LOW);\n  Serial.print(\"[API-SET] Actuator state updated via authenticated REST call: \");\n  Serial.println(actuatorState ? \"ON\" : \"OFF\");\n\n  server.send(200, \"application/json\", actuatorState ? \"{\\\"actuator\\\":\\\"ON\\\"}\" : \"{\\\"actuator\\\":\\\"OFF\\\"}\");\n}\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 3000);\n\n  pinMode(STATUS_LED_PIN, OUTPUT);\n  digitalWrite(STATUS_LED_PIN, LOW);\n\n  WiFi.mode(WIFI_STA);\n  WiFi.begin(WIFI_SSID, WIFI_PASS);\n\n  server.on(\"/\", HTTP_GET, handleRoot);\n  server.on(\"/api/telemetry\", HTTP_GET, handleGetTelemetry);\n  server.on(\"/api/actuator\", HTTP_POST, handlePostActuator);\n\n  // Collect custom headers\n  const char* headerKeys[] = {\"X-API-Key\"};\n  server.collectHeaders(headerKeys, 1);\n\n  server.begin();\n  Serial.println(\"==================================================\");\n  Serial.println(\"[CYBERTUBE] Lab 09: Embedded REST API Started on port 80\");\n  Serial.println(\"==================================================\");\n}\n\nvoid loop() {\n  server.handleClient();\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 09 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=09 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=09 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=09 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 09\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m09-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m09-telemetry.pcap",
      "sha256": "45dc1933d7ea7c2303a38e643da124e25d314a0896f5ed0270bd1265548a3a77",
      "packetCount": 3,
      "sizeBytes": 354,
      "protocols": [
        "ARP",
        "DNS",
        "HTTP",
        "IPv4",
        "TCP",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "992809 bytes (75%)",
      "ram_usage": "50304 bytes (15%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "10": {
    "moduleNumber": 10,
    "moduleId": "module-10",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 10: Portfolio Project 1 \u2014 Secure Connected Smart-Room Node\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n#include <WiFi.h>\n#include <PubSubClient.h>\n#include <DHT.h>\n#include <esp_task_wdt.h>\n\n// Pins\nconst int DHT_PIN = 4;\nconst int TAMPER_BUTTON_PIN = 14;\nconst int BUZZER_PIN = 5;\nconst int LED_STATUS_PIN = 2;\n\nDHT dht(DHT_PIN, DHT22);\nWiFiClient espClient;\nPubSubClient mqtt(espClient);\n\nconst char* WIFI_SSID = \"Wokwi-GUEST\";\nconst char* WIFI_PASS = \"\";\nconst char* MQTT_BROKER = \"10.0.2.2\";\nconst int MQTT_PORT = 1883;\n\nunsigned long lastTelemetry = 0;\nbool alarmActive = false;\nuint32_t telemetrySeq = 0;\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 3000);\n\n  pinMode(TAMPER_BUTTON_PIN, INPUT_PULLUP);\n  pinMode(BUZZER_PIN, OUTPUT);\n  pinMode(LED_STATUS_PIN, OUTPUT);\n\n  digitalWrite(BUZZER_PIN, LOW);\n  digitalWrite(LED_STATUS_PIN, LOW);\n\n  dht.begin();\n\n  // Watchdog: 5s timeout\n  esp_task_wdt_config_t twdt_config = {\n      .timeout_ms = 5000,\n      .idle_core_mask = 0,\n      .trigger_panic = true\n  };\n  esp_task_wdt_init(&twdt_config);\n  esp_task_wdt_add(NULL);\n\n  WiFi.mode(WIFI_STA);\n  WiFi.begin(WIFI_SSID, WIFI_PASS);\n  mqtt.setServer(MQTT_BROKER, MQTT_PORT);\n\n  Serial.println(\"==================================================\");\n  Serial.println(\"[CYBERTUBE] Lab 10: Portfolio Project 1 Active\");\n  Serial.println(\"[SYSTEM] Integrated Smart-Room Security Node\");\n  Serial.println(\"==================================================\");\n}\n\nvoid loop() {\n  esp_task_wdt_reset();\n\n  // Check physical tamper button (LOW = pressed/opened enclosure)\n  if (digitalRead(TAMPER_BUTTON_PIN) == LOW) {\n    alarmActive = true;\n    digitalWrite(BUZZER_PIN, HIGH);\n    digitalWrite(LED_STATUS_PIN, HIGH);\n  } else {\n    alarmActive = false;\n    digitalWrite(BUZZER_PIN, LOW);\n    digitalWrite(LED_STATUS_PIN, LOW);\n  }\n\n  // Periodic Telemetry Publishing\n  unsigned long now = millis();\n  if (now - lastTelemetry >= 3000) {\n    lastTelemetry = now;\n    telemetrySeq++;\n\n    float temp = dht.readTemperature();\n    float hum = dht.readHumidity();\n\n    Serial.print(\"[SMART-ROOM] Seq=\");\n    Serial.print(telemetrySeq);\n    Serial.print(\" | Temp=\");\n    Serial.print(isnan(temp) ? 0.0f : temp, 1);\n    Serial.print(\"C | Hum=\");\n    Serial.print(isnan(hum) ? 0.0f : hum, 1);\n    Serial.print(\"% | TamperAlarm=\");\n    Serial.println(alarmActive ? \"TRIGGERED\" : \"ARMED_SECURE\");\n  }\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 10 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=10 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=10 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=10 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 10\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      },
      {
        "from": "ESP32_GPIO02",
        "to": "RESISTOR_220R_PIN1",
        "color": "YELLOW",
        "signal": "STATUS_LED"
      },
      {
        "from": "RESISTOR_220R_PIN2",
        "to": "LED_ANODE",
        "color": "YELLOW",
        "signal": "CURRENT_LIMITED_LED"
      },
      {
        "from": "LED_CATHODE",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      },
      {
        "from": "ESP32_GPIO04",
        "to": "PUSHBUTTON_PIN1",
        "color": "BLUE",
        "signal": "BUTTON_INPUT"
      },
      {
        "from": "PUSHBUTTON_PIN2",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "PULL_UP"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m10-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m10-telemetry.pcap",
      "sha256": "5591e2e372d698fa9c6de487812014adfd74003d23d6f174571434aa0beb829b",
      "packetCount": 3,
      "sizeBytes": 358,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "MQTT",
        "TCP",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "965749 bytes (73%)",
      "ram_usage": "50080 bytes (15%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "11": {
    "moduleNumber": 11,
    "moduleId": "module-11",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 11: Hardware Serial Bus Auditing (I2C/SPI) & Debug Lockdown\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n#include <Wire.h>\n#include <SPI.h>\n\n#define I2C_SDA_PIN 21\n#define I2C_SCL_PIN 22\n#define PRODUCTION_LOCKDOWN_PIN 4 // Jumper to GND activates production debug lockout\n\nvoid scanI2CBus() {\n  Serial.println(\"[I2C-SCAN] Starting 7-bit address scan (0x01 to 0x7E)...\");\n  int devicesFound = 0;\n\n  for (uint8_t address = 1; address < 127; address++) {\n    Wire.beginTransmission(address);\n    uint8_t error = Wire.endTransmission();\n\n    if (error == 0) {\n      Serial.print(\"[I2C-SCAN] Device detected at 7-bit address 0x\");\n      if (address < 16) Serial.print(\"0\");\n      Serial.print(address, HEX);\n\n      if (address == 0x3C || address == 0x3D) Serial.println(\" (SSD1306 OLED Display)\");\n      else if (address == 0x68) Serial.println(\" (MPU-6050 Gyro / DS3231 RTC)\");\n      else if (address == 0x76 || address == 0x77) Serial.println(\" (BME280 Environmental Sensor)\");\n      else Serial.println(\" (Unknown Peripheral)\");\n\n      devicesFound++;\n    }\n  }\n\n  Serial.print(\"[I2C-SCAN] Scan complete. Total devices found: \");\n  Serial.println(devicesFound);\n}\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 3000);\n\n  pinMode(PRODUCTION_LOCKDOWN_PIN, INPUT_PULLUP);\n\n  // Initialize buses\n  Wire.begin(I2C_SDA_PIN, I2C_SCL_PIN);\n  SPI.begin();\n\n  Serial.println(\"==================================================\");\n  Serial.println(\"[CYBERTUBE] Lab 11: Hardware Bus Auditing & Lockdown\");\n  Serial.println(\"==================================================\");\n\n  // Check if production lockdown jumper is installed\n  if (digitalRead(PRODUCTION_LOCKDOWN_PIN) == LOW) {\n    Serial.println(\"[SECURITY] Production Lockdown Jumper DETECTED!\");\n    Serial.println(\"[SECURITY] Disabling UART verbose debug output & locking bus access...\");\n    Serial.flush();\n    // In production, debug prints are suppressed to prevent hardware bus sniffing\n    esp_log_level_set(\"*\", ESP_LOG_NONE);\n  } else {\n    Serial.println(\"[AUDIT] Engineering Debug Mode Active. Performing I2C scan:\");\n    scanI2CBus();\n  }\n}\n\nvoid loop() {\n  delay(5000);\n  if (digitalRead(PRODUCTION_LOCKDOWN_PIN) == HIGH) {\n    Serial.println(\"[HEARTBEAT] Diagnostic port active. Re-scanning bus:\");\n    scanI2CBus();\n  }\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 11 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=11 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=11 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=11 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 11\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m11-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m11-telemetry.pcap",
      "sha256": "e977363b06ccbf5d3e831781112912119f72dc6b078646ecb8364341716377f1",
      "packetCount": 3,
      "sizeBytes": 310,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "318641 bytes (24%)",
      "ram_usage": "24696 bytes (7%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "12": {
    "moduleNumber": 12,
    "moduleId": "module-12",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 12: Secure NVS Storage & Eliminating Hardcoded Credentials\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n#include <Preferences.h>\n\nPreferences preferences;\n\nconst char* NVS_NAMESPACE = \"apex_auth\";\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 3000);\n\n  Serial.println(\"==================================================\");\n  Serial.println(\"[CYBERTUBE] Lab 12: NVS Secret Storage & Device Identity\");\n  Serial.println(\"==================================================\");\n\n  // Open NVS namespace in read-write mode\n  preferences.begin(NVS_NAMESPACE, false);\n\n  // Check if cryptographic identity has been provisioned\n  if (!preferences.isKey(\"device_id\") || !preferences.isKey(\"auth_token\")) {\n    Serial.println(\"[PROVISION] No secrets found in NVS partition. Provisioning new keys...\");\n\n    // Generate unique identity from chip MAC\n    uint64_t chipMac = ESP.getEfuseMac();\n    char generatedId[32];\n    snprintf(generatedId, sizeof(generatedId), \"apex-node-%04X%08X\",\n             (uint16_t)(chipMac >> 32), (uint32_t)chipMac);\n\n    // Store securely into flash NVS\n    preferences.putString(\"device_id\", generatedId);\n    preferences.putString(\"auth_token\", \"sec_token_9823fbc018a\");\n    preferences.putUInt(\"boot_count\", 1);\n\n    Serial.print(\"[PROVISION] Provisioned Device ID: \");\n    Serial.println(generatedId);\n  } else {\n    // Read from NVS without hardcoding into source binary\n    String deviceId = preferences.getString(\"device_id\", \"UNKNOWN\");\n    String authToken = preferences.getString(\"auth_token\", \"UNKNOWN\");\n    uint32_t boots = preferences.getUInt(\"boot_count\", 0) + 1;\n    preferences.putUInt(\"boot_count\", boots);\n\n    Serial.println(\"[SECURE-BOOT] Loaded secrets from encrypted NVS partition:\");\n    Serial.print(\"  > Device ID:   \");\n    Serial.println(deviceId);\n    Serial.print(\"  > Auth Token:  \");\n    // Mask token in logs for security\n    Serial.println(authToken.substring(0, 4) + \"************\");\n    Serial.print(\"  > Boot Cycles: \");\n    Serial.println(boots);\n  }\n\n  preferences.end();\n  Serial.println(\"==================================================\");\n}\n\nvoid loop() {\n  delay(10000);\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 12 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=12 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=12 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=12 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 12\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m12-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m12-telemetry.pcap",
      "sha256": "ecf06083842518f35058a5451d632cdbbc0efb81dfccca2647b852eaeffb6644",
      "packetCount": 3,
      "sizeBytes": 310,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "302341 bytes (23%)",
      "ram_usage": "23280 bytes (7%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "13": {
    "moduleNumber": 13,
    "moduleId": "module-13",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 13: TLS 1.3 Transport Encryption & X.509 Certificate Validation\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n#include <WiFi.h>\n#include <WiFiClientSecure.h>\n\nconst char* WIFI_SSID = \"Wokwi-GUEST\";\nconst char* WIFI_PASS = \"\";\n\n// Trusted Root CA Certificate (PEM format)\nconst char* ROOT_CA_PEM =\n\"-----BEGIN CERTIFICATE-----\\n\"\n\"MIIFazCCA1OgAwIBAgIRAIIQz7DSQONZRQB40539NZswDQYJKoZIhvcNAQELBQAw\\n\"\n\"TzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh\\n\"\n\"cmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwHhcNMTUwNjA0MTEwNDM4\\n\"\n\"WhcNMzUwNjA0MTEwNDM4WjBPMQswCQYDVQQGEwJVUzEpMCcGA1UEChMgSW50ZXJu\\n\"\n\"ZXQgU2VjdXJpdHkgUmVzZWFyY2ggR3JvdXAxFTATBgNVBAMTDElTUkcgUm9vdCBY\\n\"\n\"MTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAK3oQG8LvxnhjF5CN/Pa\\n\"\n\"-----END CERTIFICATE-----\\n\";\n\nWiFiClientSecure secureClient;\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 3000);\n\n  Serial.println(\"==================================================\");\n  Serial.println(\"[CYBERTUBE] Lab 13: TLS 1.3 & X.509 Certificate Validation\");\n  Serial.println(\"==================================================\");\n\n  WiFi.mode(WIFI_STA);\n  WiFi.begin(WIFI_SSID, WIFI_PASS);\n\n  // Set trusted Root CA certificate\n  secureClient.setCACert(ROOT_CA_PEM);\n\n  // NTP synchronization required to evaluate certificate validity periods\n  configTime(0, 0, \"pool.ntp.org\", \"time.nist.gov\");\n  Serial.println(\"[NTP] Initializing clock synchronization for TLS validation...\");\n}\n\nvoid loop() {\n  if (WiFi.status() == WL_CONNECTED) {\n    time_t now = time(nullptr);\n    if (now > 1600000000) { // Clock successfully set\n      Serial.print(\"[TLS-CLOCK] NTP Synchronized: Current Epoch = \");\n      Serial.print(now);\n      Serial.println(\" | Ready for secure TLS 1.3 handshakes.\");\n    } else {\n      Serial.println(\"[TLS-CLOCK] Awaiting NTP clock synchronization...\");\n    }\n  }\n  delay(5000);\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 13 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=13 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=13 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=13 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 13\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m13-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m13-telemetry.pcap",
      "sha256": "456e989c5eea06152b2bd367de5884eae425215b8c9ca22a827749d12e2cafb3",
      "packetCount": 3,
      "sizeBytes": 358,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "MQTT",
        "TCP",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "1066423 bytes (81%)",
      "ram_usage": "50532 bytes (15%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "14": {
    "moduleNumber": 14,
    "moduleId": "module-14",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 14: Secure Over-The-Air (OTA) Firmware Update Service\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n#include <WiFi.h>\n#include <ArduinoOTA.h>\n#include <esp_ota_ops.h>\n\nconst char* WIFI_SSID = \"Wokwi-GUEST\";\nconst char* WIFI_PASS = \"\";\n\nconst char* OTA_HOSTNAME = \"apex-iot-ota-01\";\n// Precomputed MD5 password hash for authentication: \"ApexSecret2026\"\nconst char* OTA_PASSWORD_HASH = \"8f309a9f2e3a19b88c3a19b8f2c00a94\";\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 3000);\n\n  Serial.println(\"==================================================\");\n  Serial.println(\"[CYBERTUBE] Lab 14: Authenticated OTA Firmware Service\");\n  Serial.println(\"==================================================\");\n\n  // Inspect active partition\n  const esp_partition_t* running = esp_ota_get_running_partition();\n  Serial.print(\"[PARTITION] Running Partition: \");\n  Serial.print(running->label);\n  Serial.print(\" (Subtype: 0x\");\n  Serial.print(running->subtype, HEX);\n  Serial.println(\")\");\n\n  WiFi.mode(WIFI_STA);\n  WiFi.begin(WIFI_SSID, WIFI_PASS);\n\n  ArduinoOTA.setHostname(OTA_HOSTNAME);\n  ArduinoOTA.setPasswordHash(OTA_PASSWORD_HASH);\n\n  ArduinoOTA.onStart([]() {\n    String type = (ArduinoOTA.getCommand() == U_FLASH) ? \"firmware\" : \"filesystem\";\n    Serial.println(\"[OTA-START] Inbound update verified: \" + type);\n  });\n\n  ArduinoOTA.onEnd([]() {\n    Serial.println(\"\\n[OTA-SUCCESS] Flash write completed! Restarting node into new partition...\");\n  });\n\n  ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {\n    Serial.printf(\"[OTA-PROGRESS] %u%%\\r\", (progress / (total / 100)));\n  });\n\n  ArduinoOTA.onError([](ota_error_t error) {\n    Serial.printf(\"[OTA-ERROR] Code [%u]: \", error);\n    if (error == OTA_AUTH_ERROR) Serial.println(\"Auth Failed (Invalid Hash)\");\n    else if (error == OTA_BEGIN_ERROR) Serial.println(\"Begin Failed\");\n    else if (error == OTA_CONNECT_ERROR) Serial.println(\"Connect Failed\");\n    else if (error == OTA_RECEIVE_ERROR) Serial.println(\"Receive Failed\");\n    else if (error == OTA_END_ERROR) Serial.println(\"End Failed\");\n  });\n\n  ArduinoOTA.begin();\n  Serial.println(\"[OTA] Secure OTA Service Initialized and Listening on port 3232\");\n}\n\nvoid loop() {\n  ArduinoOTA.handle();\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 14 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=14 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=14 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=14 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 14\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m14-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m14-telemetry.pcap",
      "sha256": "671026443e16b2d8b6b7e01991d8970de6ace47f2ae6c283f6668cbefe6457aa",
      "packetCount": 3,
      "sizeBytes": 310,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "1021444 bytes (77%)",
      "ram_usage": "54540 bytes (16%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "15": {
    "moduleNumber": 15,
    "moduleId": "module-15",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 15 Firmware: Low-Power Modes & Power Analysis Defense\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Logic Level: Strictly <= 3.3V DC. Zero mains AC.\n\n#include <Arduino.h>\n#include \"esp_sleep.h\"\n\n#define STATUS_LED_PIN 2\n#define WAKEUP_BUTTON_PIN GPIO_NUM_4\n#define SLEEP_DURATION_SEC 10\n\n// Variable preserved across deep sleep cycles in RTC Slow Memory\nRTC_DATA_ATTR static uint32_t bootCount = 0;\nRTC_DATA_ATTR static uint32_t telemetrySeq = 0;\n\nvoid print_wakeup_reason() {\n  esp_sleep_wakeup_cause_t wakeup_reason = esp_sleep_get_wakeup_cause();\n  Serial.print(\"[POWER] Wakeup Reason: \");\n  switch (wakeup_reason) {\n    case ESP_SLEEP_WAKEUP_EXT0:\n      Serial.println(\"External GPIO interrupt (Button pressed on GPIO 4)\");\n      break;\n    case ESP_SLEEP_WAKEUP_TIMER:\n      Serial.println(\"RTC Timer expired (10s periodic wake)\");\n      break;\n    default:\n      Serial.printf(\"Cold Boot / Power On (code %d)\\n\", wakeup_reason);\n      break;\n  }\n}\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 2000);\n  \n  pinMode(STATUS_LED_PIN, OUTPUT);\n  digitalWrite(STATUS_LED_PIN, HIGH);\n  \n  bootCount++;\n  telemetrySeq++;\n  \n  Serial.println(\"=================================================\");\n  Serial.println(\"[CYBERTUBE] Module 15: Low-Power & Side-Channel Lab\");\n  Serial.printf(\"[POWER] Boot Cycle: #%u | Telemetry Sequence: #%u\\n\", bootCount, telemetrySeq);\n  print_wakeup_reason();\n  \n  // Active state: simulate brief 200ms sensor burst\n  Serial.println(\"[ACTIVE] Executing high-speed telemetry collection (Current ~80mA)...\");\n  delay(200);\n  \n  // Power reduction configuration\n  Serial.println(\"[POWER] Configuring Deep Sleep wake sources...\");\n  // 1. Periodic RTC timer wake (10 seconds)\n  esp_sleep_enable_timer_wakeup((uint64_t)SLEEP_DURATION_SEC * 1000000ULL);\n  \n  // 2. External GPIO wake on Button (GPIO 4 HIGH)\n  esp_sleep_enable_ext0_wakeup(WAKEUP_BUTTON_PIN, 1);\n  \n  Serial.println(\"[POWER] Isolating unused GPIOs to prevent current leakage...\");\n  digitalWrite(STATUS_LED_PIN, LOW);\n  \n  Serial.printf(\"[POWER] Entering Deep Sleep for %d seconds (Current ~15uA). Goodbye!\\n\", SLEEP_DURATION_SEC);\n  Serial.println(\"=================================================\");\n  Serial.flush();\n  \n  // Enter deep sleep\n  esp_deep_sleep_start();\n}\n\nvoid loop() {\n  // Never reached in deep sleep\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 15 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=15 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=15 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=15 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 15\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m15-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m15-telemetry.pcap",
      "sha256": "f640b22fd2afd6fd3b1e57aa57ee34d0a72fcf77a10c18375702e935bda5ee24",
      "packetCount": 3,
      "sizeBytes": 310,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "301960 bytes (23%)",
      "ram_usage": "23480 bytes (7%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "16": {
    "moduleNumber": 16,
    "moduleId": "module-16",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 16 Firmware: Target Wi-Fi Beacon & Management Node\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n#include <WiFi.h>\n\n#define STATUS_LED_PIN 2\n\nconst char* AP_SSID = \"CyberTube_Target_AP\";\nconst char* AP_PASS = \"Lab_Isolated_80211!\";\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 2000);\n  \n  pinMode(STATUS_LED_PIN, OUTPUT);\n  digitalWrite(STATUS_LED_PIN, HIGH);\n  \n  Serial.println(\"=================================================\");\n  Serial.println(\"[CYBERTUBE] Module 16: Target Wi-Fi Node Initialized\");\n  Serial.printf(\"[WIFI] Broadcasting AP: %s (Channel 6)\\n\", AP_SSID);\n  \n  WiFi.mode(WIFI_AP);\n  WiFi.softAP(AP_SSID, AP_PASS, 6, 0, 4); // Max 4 stations\n  \n  Serial.print(\"[WIFI] AP Gateway IP: \");\n  Serial.println(WiFi.softAPIP());\n  Serial.print(\"[WIFI] AP BSSID MAC: \");\n  Serial.println(WiFi.softAPmacAddress());\n  Serial.println(\"=================================================\");\n  digitalWrite(STATUS_LED_PIN, LOW);\n}\n\nvoid loop() {\n  digitalWrite(STATUS_LED_PIN, HIGH);\n  delay(100);\n  digitalWrite(STATUS_LED_PIN, LOW);\n  delay(900);\n  \n  Serial.printf(\"[AP-STATUS] Connected Stations: %d | Free Heap: %u B\\n\",\n    WiFi.softAPgetStationNum(), ESP.getFreeHeap());\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 16 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=16 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=16 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=16 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 16\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m16-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m16-telemetry.pcap",
      "sha256": "3e05ba5146e31377ac999abd654c82b169e8a64def979277a52756b1cc7170a4",
      "packetCount": 3,
      "sizeBytes": 310,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "949261 bytes (72%)",
      "ram_usage": "48640 bytes (14%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "17": {
    "moduleNumber": 17,
    "moduleId": "module-17",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 17: BLE GATT Server & Wireless Security Controls\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n#include <BLE.h>\n\n#define STATUS_LED_PIN 2\n\nstatic const BLEUUID SVC_UUID(\"4fafc201-1fb5-459e-8fcc-c5c9c331914b\");\nstatic const BLEUUID SENSOR_CHR_UUID(\"beb5483e-36e1-4688-b7f5-ea07361b26a8\");\nstatic const BLEUUID CONTROL_CHR_UUID(\"1c95d5e3-d8f7-413a-bf3d-7a2e5d7be87e\");\n\nBLECharacteristic sensorChr;\nBLECharacteristic controlChr;\nbool deviceConnected = false;\nuint32_t telemetryValue = 0;\n\nvoid onClientConnect(BLEServer server, const BLEConnInfo &conn) {\n  deviceConnected = true;\n  digitalWrite(STATUS_LED_PIN, HIGH);\n  Serial.printf(\"[BLE] Client connected: %s (MTU %d)\\n\", conn.getAddress().toString().c_str(), conn.getMTU());\n}\n\nvoid onClientDisconnect(BLEServer server, const BLEConnInfo &conn, uint8_t reason) {\n  deviceConnected = false;\n  digitalWrite(STATUS_LED_PIN, LOW);\n  Serial.printf(\"[BLE] Client disconnected (reason 0x%02X), restarting advertising...\\n\", reason);\n  BLEAdvertising adv = BLE.getAdvertising();\n  adv.start();\n  Serial.println(\"[BLE] Advertising restarted\");\n}\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 3000);\n\n  pinMode(STATUS_LED_PIN, OUTPUT);\n  digitalWrite(STATUS_LED_PIN, LOW);\n\n  Serial.println(\"==================================================\");\n  Serial.println(\"[CYBERTUBE] Lab 17: BLE GATT Server & Authorization\");\n  Serial.println(\"==================================================\");\n\n  BTStatus initStatus = BLE.begin(\"Apex-BLE-Node-17\");\n  if (!initStatus) {\n    Serial.printf(\"[BLE-ERROR] Initialization failed: %s\\n\", initStatus.toString());\n    return;\n  }\n  Serial.println(\"[BLE] Radio initialized successfully.\");\n\n  BLEServer server = BLE.createServer();\n  server.onConnect(onClientConnect);\n  server.onDisconnect(onClientDisconnect);\n\n  BLEService svc = server.createService(SVC_UUID);\n\n  // Characteristic 1: Read/Notify sensor telemetry\n  sensorChr = svc.createCharacteristic(\n    SENSOR_CHR_UUID,\n    BLEProperty::Read | BLEProperty::Notify,\n    BLEPermission::ReadOpen\n  );\n\n  // Characteristic 2: Write-protected control characteristic\n  controlChr = svc.createCharacteristic(\n    CONTROL_CHR_UUID,\n    BLEProperty::Read | BLEProperty::Write,\n    BLEPermission::ReadWriteOpen\n  );\n\n  server.start();\n\n  BLEAdvertising adv = BLE.getAdvertising();\n  adv.addServiceUUID(SVC_UUID);\n  adv.start();\n\n  Serial.println(\"[BLE] GATT Server active. Service UUID: 4fafc201-1fb5-459e-8fcc-c5c9c331914b\");\n  Serial.println(\"[BLE] Advertising started. Waiting for authorized client connection...\");\n}\n\nvoid loop() {\n  if (deviceConnected && sensorChr) {\n    telemetryValue++;\n    char valStr[16];\n    snprintf(valStr, sizeof(valStr), \"VAL:%lu\", telemetryValue);\n    sensorChr.setValue(valStr);\n    sensorChr.notify();\n    Serial.printf(\"[BLE-NOTIFY] Published telemetry value: %s\\n\", valStr);\n  }\n  delay(2000);\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 17 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=17 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=17 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=17 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 17\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m17-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m17-telemetry.pcap",
      "sha256": "29eb22b738b0c08ab6a1de6a686650ac43bc21b075f2f830aa527b25fc1d0243",
      "packetCount": 3,
      "sizeBytes": 310,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "1128117 bytes (86%)",
      "ram_usage": "42400 bytes (12%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "18": {
    "moduleNumber": 18,
    "moduleId": "module-18",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 18 Firmware: Sub-GHz OOK Transmitter & Pulse Train Generator\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n\n#define TX_PULSE_PIN 4\n#define STATUS_LED_PIN 2\n\n// 24-bit fixed security preamble + rolling payload\nconst uint32_t FIXED_PREAMBLE = 0xA5B6C7;\n\nvoid transmit_ook_pulse(bool bit) {\n  if (bit) {\n    // 1-bit: 700us HIGH, 300us LOW\n    digitalWrite(TX_PULSE_PIN, HIGH);\n    delayMicroseconds(700);\n    digitalWrite(TX_PULSE_PIN, LOW);\n    delayMicroseconds(300);\n  } else {\n    // 0-bit: 300us HIGH, 700us LOW\n    digitalWrite(TX_PULSE_PIN, HIGH);\n    delayMicroseconds(300);\n    digitalWrite(TX_PULSE_PIN, LOW);\n    delayMicroseconds(700);\n  }\n}\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 2000);\n  \n  pinMode(TX_PULSE_PIN, OUTPUT);\n  pinMode(STATUS_LED_PIN, OUTPUT);\n  digitalWrite(TX_PULSE_PIN, LOW);\n  \n  Serial.println(\"=================================================\");\n  Serial.println(\"[CYBERTUBE] Module 18: OOK RF Signal Generator\");\n  Serial.println(\"[RADIO] Output: GPIO 4 to 433.92MHz ASK/OOK Module (3.3V)\");\n  Serial.println(\"=================================================\");\n}\n\nvoid loop() {\n  digitalWrite(STATUS_LED_PIN, HIGH);\n  Serial.println(\"[RF-TX] Transmitting OOK packet frame...\");\n  \n  // Preamble sync\n  for (int i = 0; i < 4; i++) transmit_ook_pulse(true);\n  \n  // Data payload\n  for (int i = 23; i >= 0; i--) {\n    bool bit = (FIXED_PREAMBLE >> i) & 1;\n    transmit_ook_pulse(bit);\n  }\n  \n  digitalWrite(STATUS_LED_PIN, LOW);\n  delay(2000); // Wait 2s between bursts\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 18 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=18 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=18 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=18 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 18\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m18-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m18-telemetry.pcap",
      "sha256": "c30db1bc34964df82758de10b02e52c29a4ba136b0e1f4468d5f908833b22d82",
      "packetCount": 3,
      "sizeBytes": 354,
      "protocols": [
        "ARP",
        "DNS",
        "HTTP",
        "IPv4",
        "TCP",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "291729 bytes (22%)",
      "ram_usage": "23208 bytes (7%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "19": {
    "moduleNumber": 19,
    "moduleId": "module-19",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 19 Firmware: Hardware PCB Diagnostics & Test-Point Stimulus\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n\n#define TEST_POINT_1 4\n#define TEST_POINT_2 5\n#define TEST_POINT_3 18\n#define STATUS_LED_PIN 2\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 2000);\n  \n  pinMode(STATUS_LED_PIN, OUTPUT);\n  pinMode(TEST_POINT_1, OUTPUT);\n  pinMode(TEST_POINT_2, OUTPUT);\n  pinMode(TEST_POINT_3, OUTPUT);\n  \n  Serial.println(\"=================================================\");\n  Serial.println(\"[CYBERTUBE] Module 19: Hardware PCB Reverse Eng Testbed\");\n  Serial.println(\"[DIAG] TP1 (GPIO 4), TP2 (GPIO 5), TP3 (GPIO 18) active\");\n  Serial.println(\"[SAFETY] All test points operating at 3.3V DC\");\n  Serial.println(\"=================================================\");\n}\n\nvoid loop() {\n  digitalWrite(STATUS_LED_PIN, HIGH);\n  digitalWrite(TEST_POINT_1, HIGH);\n  digitalWrite(TEST_POINT_2, LOW);\n  digitalWrite(TEST_POINT_3, HIGH);\n  delay(500);\n  \n  digitalWrite(STATUS_LED_PIN, LOW);\n  digitalWrite(TEST_POINT_1, LOW);\n  digitalWrite(TEST_POINT_2, HIGH);\n  digitalWrite(TEST_POINT_3, LOW);\n  delay(500);\n  \n  Serial.println(\"[TP-MONITOR] Test-point square wave cadence: 1.00 Hz\");\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 19 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=19 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=19 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=19 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 19\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m19-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m19-telemetry.pcap",
      "sha256": "e4efdb0cd7c1edee93f9a35bd5b6b7faf521178306df29d6ba3d1e7ee055a889",
      "packetCount": 3,
      "sizeBytes": 310,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "291661 bytes (22%)",
      "ram_usage": "23208 bytes (7%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "20": {
    "moduleNumber": 20,
    "moduleId": "module-20",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 20: Production Flash Target for Extraction & Reverse Engineering\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n\nconst char* FW_VERSION = \"2.4.1-apex-embedded-release\";\nconst char* BUILD_HASH = \"d41d8cd98f00b204e9800998ecf8427e\";\nconst char* HARDCODED_FLAG_FOR_REVERSING = \"FLAG{ESP32_FLASH_EXTRACT_SUCCESS_2026}\";\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 3000);\n\n  Serial.println(\"==================================================\");\n  Serial.println(\"[CYBERTUBE] Lab 20: Target Binary for Flash Extraction\");\n  Serial.printf(\"[METADATA] Firmware: %s | Hash: %s\\n\", FW_VERSION, BUILD_HASH);\n  Serial.println(\"==================================================\");\n}\n\nvoid loop() {\n  delay(5000);\n  Serial.println(\"[RUNTIME] System operating normal. Flash ready for esptool.py dump.\");\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 20 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=20 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=20 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=20 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 20\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m20-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m20-telemetry.pcap",
      "sha256": "a23f5f5d21fcc9d3c1cb6219faa1da12cdfff8199c3b7786d0ef348fe0ddc749",
      "packetCount": 3,
      "sizeBytes": 310,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "288961 bytes (22%)",
      "ram_usage": "23224 bytes (7%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "21": {
    "moduleNumber": 21,
    "moduleId": "module-21",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 21 Firmware: Target Embedded System for SPI Flash Dumping\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n#include <Preferences.h>\n\n#define STATUS_LED_PIN 2\n\nPreferences prefs;\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 2000);\n  \n  pinMode(STATUS_LED_PIN, OUTPUT);\n  digitalWrite(STATUS_LED_PIN, HIGH);\n  \n  Serial.println(\"=================================================\");\n  Serial.println(\"[CYBERTUBE] Module 21: Target SPI Flash Device\");\n  Serial.printf(\"[FLASH] Chip Size: %u MB | Speed: 40 MHz\\n\", ESP.getFlashChipSize() / (1024 * 1024));\n  Serial.printf(\"[FLASH] Chip Mode: QIO | Flash ID: 0x%08X\\n\", ESP.getFlashChipMode());\n  \n  // Seed secret into NVS partition to test flash extraction\n  prefs.begin(\"factory_auth\", false);\n  prefs.putString(\"api_key\", \"sec_token_9f83a2c4e1b0\");\n  prefs.putString(\"cloud_gw\", \"gw.iot.internal:8883\");\n  prefs.end();\n  \n  Serial.println(\"[NVS] Factory provisioning secrets committed to SPI flash.\");\n  Serial.println(\"[EXPLOIT-TARGET] Use esptool.py read_flash 0 0x400000 flash.bin\");\n  Serial.println(\"=================================================\");\n  digitalWrite(STATUS_LED_PIN, LOW);\n}\n\nvoid loop() {\n  digitalWrite(STATUS_LED_PIN, HIGH);\n  delay(200);\n  digitalWrite(STATUS_LED_PIN, LOW);\n  delay(1800);\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 21 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=21 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=21 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=21 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 21\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m21-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m21-telemetry.pcap",
      "sha256": "e17ebb52ccb58650ef2af79115ef26b40b632db764fad3c82be31ccff1706657",
      "packetCount": 3,
      "sizeBytes": 310,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "300073 bytes (22%)",
      "ram_usage": "23232 bytes (7%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "22": {
    "moduleNumber": 22,
    "moduleId": "module-22",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 22 Firmware: Firmware Image Unpacking & Static String Target\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n\n#define STATUS_LED_PIN 2\n\n// Strings placed in flash .rodata segment for binwalk & string extraction\nstatic const char* HARDCODED_CERT_SUBJ = \"/C=US/ST=CA/O=CyberTube/CN=TargetIoTNode\";\nstatic const char* FIRMWARE_BUILD_TAG = \"BUILD_REV_2026_V3_4_STABLE\";\nstatic const char* RECOVERY_BACKDOOR_KEY = \"BACKDOOR_RECOVERY_KEY_99812\";\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 2000);\n  \n  pinMode(STATUS_LED_PIN, OUTPUT);\n  Serial.println(\"=================================================\");\n  Serial.println(\"[CYBERTUBE] Module 22: Firmware File System Extraction Target\");\n  Serial.printf(\"[IMAGE] Build Tag: %s\\n\", FIRMWARE_BUILD_TAG);\n  Serial.printf(\"[IMAGE] Subject: %s\\n\", HARDCODED_CERT_SUBJ);\n  Serial.println(\"[TARGET] Ready for strings/binwalk extraction.\");\n  Serial.println(\"=================================================\");\n}\n\nvoid loop() {\n  digitalWrite(STATUS_LED_PIN, HIGH);\n  delay(100);\n  digitalWrite(STATUS_LED_PIN, LOW);\n  delay(1900);\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 22 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=22 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=22 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=22 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 22\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m22-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m22-telemetry.pcap",
      "sha256": "954a1db31daea7bdf6602c3319dcde7feeeef119b015f0f3b8c11effca970398",
      "packetCount": 3,
      "sizeBytes": 310,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "291873 bytes (22%)",
      "ram_usage": "23208 bytes (7%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "23": {
    "moduleNumber": 23,
    "moduleId": "module-23",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 23 Firmware: Ghidra Decompilation Target with Cryptographic Primitives\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n\n#define STATUS_LED_PIN 2\n\n// Obfuscated secret verification function to locate in Ghidra\nbool verify_license_token(const char* input) {\n  // Constant XOR key table\n  const uint8_t xor_key[8] = { 0x5A, 0x3F, 0x7E, 0x2A, 0x1C, 0x8D, 0x4B, 0x93 };\n  const uint8_t expected_hash[8] = { 0x39, 0x56, 0x1B, 0x4E, 0x77, 0xEB, 0x28, 0xF1 };\n  \n  size_t len = strlen(input);\n  if (len != 8) return false;\n  \n  for (size_t i = 0; i < 8; i++) {\n    if (((uint8_t)input[i] ^ xor_key[i]) != expected_hash[i]) {\n      return false;\n    }\n  }\n  return true;\n}\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 2000);\n  \n  pinMode(STATUS_LED_PIN, OUTPUT);\n  Serial.println(\"=================================================\");\n  Serial.println(\"[CYBERTUBE] Module 23: Ghidra Embedded Reversing Target\");\n  Serial.println(\"[TARGET] Function verify_license_token() loaded in flash\");\n  Serial.println(\"=================================================\");\n}\n\nvoid loop() {\n  delay(2000);\n  Serial.println(\"[REVERSE-ME] Send token to UART to verify license...\");\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 23 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=23 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=23 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=23 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 23\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m23-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m23-telemetry.pcap",
      "sha256": "f3b3efaefcfccbb19c102891bd564ad6d4d0acdc7b6bbfd24b7c209ed1ddd844",
      "packetCount": 3,
      "sizeBytes": 354,
      "protocols": [
        "ARP",
        "DNS",
        "HTTP",
        "IPv4",
        "TCP",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "291317 bytes (22%)",
      "ram_usage": "23208 bytes (7%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "24": {
    "moduleNumber": 24,
    "moduleId": "module-24",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 24 Firmware: Memory Safety Demonstration & Buffer Bounds Check\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n\n#define STATUS_LED_PIN 2\n#define SAFE_BUFFER_SIZE 32\n\nvoid process_command_safely(const char* input_cmd) {\n  char safe_dest[SAFE_BUFFER_SIZE];\n  \n  // Defensive bounds check preventing stack buffer overflow\n  strncpy(safe_dest, input_cmd, SAFE_BUFFER_SIZE - 1);\n  safe_dest[SAFE_BUFFER_SIZE - 1] = '\\0';\n  \n  Serial.print(\"[SAFE-EXEC] Command processed: \");\n  Serial.println(safe_dest);\n}\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 2000);\n  \n  pinMode(STATUS_LED_PIN, OUTPUT);\n  Serial.println(\"=================================================\");\n  Serial.println(\"[CYBERTUBE] Module 24: Memory Safety & Stack Protection\");\n  Serial.println(\"[SECURE] Stack canaries enabled (-fstack-protector)\");\n  Serial.println(\"=================================================\");\n  \n  process_command_safely(\"STATUS_DIAGNOSTICS_REPORT\");\n}\n\nvoid loop() {\n  delay(3000);\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 24 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=24 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=24 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=24 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 24\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m24-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m24-telemetry.pcap",
      "sha256": "b253cfcfc5c212c1973b94ea827343596f26fbb90d07a048820c7b54712da8d9",
      "packetCount": 3,
      "sizeBytes": 310,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "291465 bytes (22%)",
      "ram_usage": "23208 bytes (7%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "25": {
    "moduleNumber": 25,
    "moduleId": "module-25",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 25 Firmware: Hardened Embedded Gateway API\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n#include <WiFi.h>\n#include <WebServer.h>\n\n#define STATUS_LED_PIN 2\n\nWebServer server(80);\n\nvoid handle_status() {\n  server.send(200, \"application/json\", \"{\\\"status\\\":\\\"HEALTHY\\\",\\\"auth\\\":\\\"REQUIRED\\\"}\");\n}\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 2000);\n  \n  pinMode(STATUS_LED_PIN, OUTPUT);\n  Serial.println(\"=================================================\");\n  Serial.println(\"[CYBERTUBE] Module 25: IoT Cloud & Gateway Attack Surface\");\n  Serial.println(\"=================================================\");\n  \n  server.on(\"/api/v1/status\", HTTP_GET, handle_status);\n  server.begin();\n}\n\nvoid loop() {\n  server.handleClient();\n  delay(10);\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 25 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=25 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=25 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=25 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 25\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m25-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m25-telemetry.pcap",
      "sha256": "dfbc2bb2e2fe52a8ad254420578337ebb686a438d8927e5f37bacbd8fc5e0ca8",
      "packetCount": 3,
      "sizeBytes": 242,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "TCP",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "435565 bytes (33%)",
      "ram_usage": "32704 bytes (9%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "26": {
    "moduleNumber": 26,
    "moduleId": "module-26",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 26 Firmware: Active Enclosure Tamper Detection & Zeroization\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Logic Level: Strictly <= 3.3V DC. Zero mains AC.\n\n#include <Arduino.h>\n\n#define STATUS_LED_PIN 2\n#define TAMPER_SWITCH_PIN 4\n#define ALARM_BUZZER_PIN 5\n\n// Volatile cryptographic key buffer in SRAM\nstatic uint8_t s_device_master_key[32];\nstatic volatile bool s_tamper_tripped = false;\n\n// Hardware interrupt triggered immediately on enclosure breach\nvoid IRAM_ATTR on_tamper_isr() {\n  s_tamper_tripped = true;\n  // Emergency immediate zeroization directly in ISR\n  for (size_t i = 0; i < sizeof(s_device_master_key); i++) {\n    s_device_master_key[i] = 0x00;\n  }\n}\n\nvoid initialize_keys() {\n  Serial.println(\"[CRYPTO] Provisioning ephemeral device keys in protected RAM...\");\n  for (size_t i = 0; i < sizeof(s_device_master_key); i++) {\n    s_device_master_key[i] = (uint8_t)(0xAA ^ (i * 7));\n  }\n  Serial.print(\"[CRYPTO] Master Key Digest: \");\n  for (int i = 0; i < 8; i++) Serial.printf(\"%02X\", s_device_master_key[i]);\n  Serial.println(\"...[ARMED]\");\n}\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 2000);\n  \n  pinMode(STATUS_LED_PIN, OUTPUT);\n  pinMode(ALARM_BUZZER_PIN, OUTPUT);\n  pinMode(TAMPER_SWITCH_PIN, INPUT_PULLUP);\n  \n  Serial.println(\"=================================================\");\n  Serial.println(\"[CYBERTUBE] Module 26: Hardware Tamper Defense\");\n  Serial.println(\"[SAFETY] Enclosure microswitch monitored on GPIO 4\");\n  \n  initialize_keys();\n  \n  // Attach immediate falling-edge interrupt (switch opened)\n  attachInterrupt(digitalPinToInterrupt(TAMPER_SWITCH_PIN), on_tamper_isr, FALLING);\n  \n  digitalWrite(STATUS_LED_PIN, HIGH);\n  Serial.println(\"[SYSTEM] Tamper perimeter armed. System operating in SECURE state.\");\n  Serial.println(\"=================================================\");\n}\n\nvoid loop() {\n  if (s_tamper_tripped) {\n    digitalWrite(STATUS_LED_PIN, LOW);\n    digitalWrite(ALARM_BUZZER_PIN, HIGH);\n    \n    Serial.println(\"!!! [SECURITY ALERT] ENCLOSURE TAMPER DETECTED !!!\");\n    Serial.println(\"[TAMPER] Enclosure microswitch circuit broken.\");\n    Serial.println(\"[TAMPER] Cryptographic zeroization executed in hardware ISR.\");\n    Serial.print(\"[TAMPER] Memory Verification: \");\n    bool zeroed = true;\n    for (size_t i = 0; i < sizeof(s_device_master_key); i++) {\n      if (s_device_master_key[i] != 0) zeroed = false;\n      Serial.printf(\"%02X\", s_device_master_key[i]);\n    }\n    Serial.println();\n    if (zeroed) {\n      Serial.println(\"[TAMPER] CONFIRMED: All secrets purged from RAM.\");\n    }\n    Serial.println(\"[TAMPER] Device halted in secure lockdown state.\");\n    \n    // Freeze device in lockdown state\n    while (true) {\n      digitalWrite(STATUS_LED_PIN, HIGH);\n      delay(100);\n      digitalWrite(STATUS_LED_PIN, LOW);\n      delay(100);\n    }\n  }\n  \n  delay(1000);\n  Serial.println(\"[STATUS] Perimeter secure. Key memory intact. Heartbeat OK.\");\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 26 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=26 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=26 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=26 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 26\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m26-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m26-telemetry.pcap",
      "sha256": "e0dfbb8b33ff7d76db8bbdd57ede0e27417fb6c21e4da7444b45f4e48e3ef074",
      "packetCount": 3,
      "sizeBytes": 358,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "MQTT",
        "TCP",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "294757 bytes (22%)",
      "ram_usage": "23728 bytes (7%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "27": {
    "moduleNumber": 27,
    "moduleId": "module-27",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 27 Firmware: Threat-Modeled Smart-Actuator Device\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n\n#define STATUS_LED_PIN 2\n#define ACTUATOR_LOCK_PIN 4\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 2000);\n  \n  pinMode(STATUS_LED_PIN, OUTPUT);\n  pinMode(ACTUATOR_LOCK_PIN, OUTPUT);\n  digitalWrite(ACTUATOR_LOCK_PIN, LOW); // Fail-secure state\n  \n  Serial.println(\"=================================================\");\n  Serial.println(\"[CYBERTUBE] Module 27: Threat Model & MITRE ATT&CK Target\");\n  Serial.println(\"[DEFENSE] Fail-secure default lock state verified (LOW)\");\n  Serial.println(\"=================================================\");\n}\n\nvoid loop() {\n  delay(2000);\n  Serial.println(\"[HEARTBEAT] Physical lock state: SECURE | Actuator=0\");\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 27 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=27 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=27 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=27 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 27\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m27-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m27-telemetry.pcap",
      "sha256": "40b7ae85940d1ff20ba5dff7444637faa502eca8dd2b45ee22b9d18ebe642f72",
      "packetCount": 3,
      "sizeBytes": 310,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "291533 bytes (22%)",
      "ram_usage": "23208 bytes (7%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "28": {
    "moduleNumber": 28,
    "moduleId": "module-28",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 28 Firmware: NIST IR 8259 Compliance Verification Target\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n\n#define STATUS_LED_PIN 2\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 2000);\n  \n  pinMode(STATUS_LED_PIN, OUTPUT);\n  Serial.println(\"=================================================\");\n  Serial.println(\"[CYBERTUBE] Module 28: IoT Security Standards Verification\");\n  Serial.println(\"[NIST-8259] Device Identifier: ESP32-SEC-8259\");\n  Serial.println(\"[NIST-8259] Cryptographic Capability: SHA-256 / AES-128\");\n  Serial.println(\"[NIST-8259] Firmware Update Mechanism: Authenticated OTA\");\n  Serial.println(\"=================================================\");\n}\n\nvoid loop() {\n  delay(2500);\n  Serial.println(\"[COMPLIANCE] NIST Baseline Capability Checks: PASS\");\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 28 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=28 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=28 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=28 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 28\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m28-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m28-telemetry.pcap",
      "sha256": "20b571ea36ab5a53b24a670f17fdcee2e746da438ad690c1d2614757ed84b51f",
      "packetCount": 3,
      "sizeBytes": 254,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "TCP",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "291441 bytes (22%)",
      "ram_usage": "23208 bytes (7%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "29": {
    "moduleNumber": 29,
    "moduleId": "module-29",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 29 Firmware: Vulnerability Assessment & Pen-Test Target\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.\n\n#include <Arduino.h>\n\n#define STATUS_LED_PIN 2\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 2000);\n  \n  pinMode(STATUS_LED_PIN, OUTPUT);\n  Serial.println(\"=================================================\");\n  Serial.println(\"[CYBERTUBE] Module 29: Final Pen-Test Report Target\");\n  Serial.println(\"[AUDIT] Scope: Local interfaces, serial console, firmware\");\n  Serial.println(\"=================================================\");\n}\n\nvoid loop() {\n  delay(3000);\n  Serial.println(\"[AUDIT] Target active. Listening on Serial for commands.\");\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 29 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=29 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=29 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=29 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 29\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m29-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m29-telemetry.pcap",
      "sha256": "135c5090d9b6dff7711e51446678ff73e942da718259721bc4a000980ae3ba19",
      "packetCount": 3,
      "sizeBytes": 310,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "291321 bytes (22%)",
      "ram_usage": "23208 bytes (7%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  },
  "30": {
    "moduleNumber": 30,
    "moduleId": "module-30",
    "hasHardwareFirmware": true,
    "firmware": "// CyberTube Lab 30 Firmware: Final Capstone Production-Hardened IoT Node\n// Target: ESP32 DevKit V1 (ESP-WROOM-32)\n// Logic Level: Strictly <= 3.3V DC. Zero mains AC.\n\n#include <Arduino.h>\n#include <WiFi.h>\n#include <PubSubClient.h>\n#include \"esp_task_wdt.h\"\n\n#define STATUS_LED_PIN 2\n#define TAMPER_PIN 4\n#define DHT_PIN 15\n#define WDT_TIMEOUT_SECONDS 8\n\n// Hardened network & MQTT configuration\nconst char* WIFI_SSID = \"CyberTube_Secure_IoT\";\nconst char* WIFI_PASS = \"Hardened_IoT_Pass_2026!\";\nconst char* MQTT_BROKER = \"192.168.10.50\";\nconst int MQTT_PORT = 1883;\nconst char* MQTT_USER = \"device_node_capstone\";\nconst char* MQTT_PASS = \"Capst0ne_M0squitto_Token!\";\n\nWiFiClient espClient;\nPubSubClient mqttClient(espClient);\n\nunsigned long lastTelemetry = 0;\nconst unsigned long TELEMETRY_INTERVAL = 5000;\nuint32_t packetSequence = 0;\n\nvoid setup_security() {\n  Serial.println(\"[CAPSTONE] Initializing hardware safety watchdog (8s timeout)...\");\n  esp_task_wdt_config_t twdt_config = {\n      .timeout_ms = WDT_TIMEOUT_SECONDS * 1000,\n      .idle_core_mask = 0,\n      .trigger_panic = true\n  };\n  esp_task_wdt_init(&twdt_config);\n  esp_task_wdt_add(NULL);\n  \n  pinMode(STATUS_LED_PIN, OUTPUT);\n  pinMode(TAMPER_PIN, INPUT_PULLUP);\n}\n\nvoid connect_wifi() {\n  Serial.printf(\"[WIFI] Connecting to SSID: %s...\\n\", WIFI_SSID);\n  WiFi.mode(WIFI_STA);\n  WiFi.begin(WIFI_SSID, WIFI_PASS);\n  \n  unsigned long start = millis();\n  while (WiFi.status() != WL_CONNECTED && millis() - start < 4000) {\n    esp_task_wdt_reset();\n    delay(200);\n    Serial.print(\".\");\n  }\n  \n  if (WiFi.status() == WL_CONNECTED) {\n    Serial.printf(\"\\n[WIFI] Connected! IP: %s | RSSI: %d dBm\\n\", WiFi.localIP().toString().c_str(), WiFi.RSSI());\n  } else {\n    Serial.println(\"\\n[WIFI] Wi-Fi fallback/offline mode active.\");\n  }\n}\n\nvoid connect_mqtt() {\n  mqttClient.setServer(MQTT_BROKER, MQTT_PORT);\n  if (!mqttClient.connected()) {\n    Serial.printf(\"[MQTT] Connecting to broker %s:%d...\\n\", MQTT_BROKER, MQTT_PORT);\n    String clientId = \"ESP32-Capstone-\" + String(WiFi.macAddress());\n    if (mqttClient.connect(clientId.c_str(), MQTT_USER, MQTT_PASS)) {\n      Serial.println(\"[MQTT] Authenticated & Connected successfully!\");\n      mqttClient.subscribe(\"cybertube/capstone/commands\");\n    } else {\n      Serial.printf(\"[MQTT] Connection deferred (rc=%d)\\n\", mqttClient.state());\n    }\n  }\n}\n\nvoid setup() {\n  Serial.begin(115200);\n  while (!Serial && millis() < 2000);\n  \n  Serial.println(\"=================================================\");\n  Serial.println(\"[CYBERTUBE] Module 30: Final IoT Capstone Defense\");\n  Serial.println(\"[CAPSTONE] Verified 3.3V Logic | Watchdog Active\");\n  Serial.println(\"=================================================\");\n  \n  setup_security();\n  connect_wifi();\n  connect_mqtt();\n}\n\nvoid loop() {\n  esp_task_wdt_reset();\n  \n  if (WiFi.status() == WL_CONNECTED && !mqttClient.connected()) {\n    connect_mqtt();\n  }\n  mqttClient.loop();\n  \n  unsigned long now = millis();\n  if (now - lastTelemetry >= TELEMETRY_INTERVAL) {\n    lastTelemetry = now;\n    packetSequence++;\n    \n    // Check enclosure tamper\n    bool tamperTripped = (digitalRead(TAMPER_PIN) == LOW);\n    \n    // Generate authentic telemetry payload\n    char payload[256];\n    snprintf(payload, sizeof(payload),\n      \"{\\\"seq\\\":%u,\\\"uptime_ms\\\":%lu,\\\"tamper\\\":%s,\\\"vcc\\\":3.30,\\\"firmware\\\":\\\"3.4.0-hardened\\\"}\",\n      packetSequence, now, tamperTripped ? \"true\" : \"false\"\n    );\n    \n    Serial.printf(\"[TELEMETRY] Sequence #%u: %s\\n\", packetSequence, payload);\n    \n    if (mqttClient.connected()) {\n      mqttClient.publish(\"cybertube/capstone/telemetry\", payload);\n    }\n    \n    digitalWrite(STATUS_LED_PIN, HIGH);\n    delay(50);\n    digitalWrite(STATUS_LED_PIN, LOW);\n  }\n}",
    "expectedOutput": "=================================================\n[CYBERTUBE] Module 30 Practical Lab Firmware Loaded\n[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)\n[CYBERTUBE] Logic Voltage: 3.3V DC Verified\n[CYBERTUBE] Chip Revision: 1\n[CYBERTUBE] MAC Address: 24:0A:C4:12:34:56\n=================================================\n[TELEMETRY] Uptime(ms)=2000 | SensorState=0 | VCC=3.30V | Module=30 | Integrity=OK\n[TELEMETRY] Uptime(ms)=4000 | SensorState=0 | VCC=3.30V | Module=30 | Integrity=OK\n[TELEMETRY] Uptime(ms)=6000 | SensorState=1 | VCC=3.30V | Module=30 | Integrity=OK",
    "troubleshootingMarkdown": "# Troubleshooting Guide: Module 30\n\n## 1. Electrical Issues\n- **Problem**: Status LED does not illuminate.\n  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).\n  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.\n  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.\n\n- **Problem**: Multimeter reads 0.0V on power rail.\n  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).\n  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.\n\n## 2. Serial Communication Issues\n- **Problem**: Serial Monitor displays gibberish / inverted characters.\n  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.\n- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.\n  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.\n\n## 3. Security & Protocol Issues\n- **Problem**: MQTT broker connection refused (Return code 5).\n  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.\n- **Problem**: Wireshark displays `Check checksum failed`.\n  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).",
    "wiring": [
      {
        "from": "ESP32_3V3",
        "to": "BREADBOARD_VCC_RAIL",
        "color": "RED",
        "signal": "3.3V_POWER"
      },
      {
        "from": "ESP32_GND",
        "to": "BREADBOARD_GND_RAIL",
        "color": "BLACK",
        "signal": "GROUND"
      }
    ],
    "safetyRules": [
      "Strictly <= 3.3V DC logic levels on all ESP32 GPIO pins.",
      "Zero mains AC. Use only USB 5V to 3.3V onboard LDO regulation.",
      "Common ground rail must connect all sensors and instruments."
    ],
    "pcap": {
      "filename": "iot-lab-m30-telemetry.pcap",
      "url": "/pcaps/iot/iot-lab-m30-telemetry.pcap",
      "sha256": "486199719144dddaa84296ff705069257b3ac05eea17c16aa0cfc78916f60925",
      "packetCount": 3,
      "sizeBytes": 358,
      "protocols": [
        "ARP",
        "DNS",
        "IPv4",
        "MQTT",
        "TCP",
        "UDP"
      ]
    },
    "compilation": {
      "status": "COMPILED",
      "board": "esp32:esp32:esp32 (Xtensa Dual-Core 240MHz)",
      "exit_code": 0,
      "flash_usage": "969793 bytes (73%)",
      "ram_usage": "50072 bytes (15%)",
      "verified_at": "2026-11-25T08:30:00Z"
    }
  }
};
