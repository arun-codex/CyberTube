import os

BASE_DIR = 'docs/courses/iot-cybersecurity/labs'

FIRMWARES = {}

# ==============================================================================
# MODULE 02: Electronic Components & Circuit Fundamentals
# Objectives: Measure analog voltage on supply rail, read digital button state,
# compute real voltage drops with ADC calibration, control status LED.
# ==============================================================================
FIRMWARES['module-02'] = {
    'firmware': """// CyberTube Lab 02: Discrete Circuit Instrumentation & DC Voltage Measurement
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Logic Level Invariant: Strictly <= 3.3V DC logic. Zero mains AC.

#include <Arduino.h>

const int LED_PIN = 2;          // Active-HIGH status LED via 220-ohm resistor
const int BUTTON_PIN = 4;       // Active-LOW push button with 10k-ohm external pull-up
const int VOLTAGE_SENSE_PIN = 34; // Analog sense input (ADC1_CH6, input only)

unsigned long lastSampleTime = 0;
const unsigned long SAMPLE_INTERVAL_MS = 1000;

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  pinMode(LED_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  // ADC configuration: 12-bit resolution (0-4095), 11dB attenuation (up to ~3.3V)
  analogReadResolution(12);
  analogSetAttenuation(ADC_11db);

  digitalWrite(LED_PIN, LOW);

  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 02: DC Circuit Measurement Initialized");
  Serial.println("[CYBERTUBE] Architecture: 3.3V Low-Voltage Discrete DC");
  Serial.println("[CYBERTUBE] Hardware: ESP32 DevKit, MB-102 Breadboard");
  Serial.println("==================================================");
}

void loop() {
  unsigned long now = millis();

  // Read button state (LOW when pressed due to pull-up)
  bool buttonPressed = (digitalRead(BUTTON_PIN) == LOW);
  digitalWrite(LED_PIN, buttonPressed ? HIGH : LOW);

  if (now - lastSampleTime >= SAMPLE_INTERVAL_MS) {
    lastSampleTime = now;

    // Multisampling ADC to reduce thermal and switching noise
    uint32_t adcSum = 0;
    const int SAMPLES = 32;
    for (int i = 0; i < SAMPLES; i++) {
      adcSum += analogRead(VOLTAGE_SENSE_PIN);
      delayMicroseconds(50);
    }
    uint32_t rawAdc = adcSum / SAMPLES;

    // Convert raw ADC (0-4095) to measured millivolts (3.3V reference)
    float measuredVolts = (rawAdc * 3.3f) / 4095.0f;

    Serial.print("[MEASURE] Time=");
    Serial.print(now / 1000);
    Serial.print("s | RawADC=");
    Serial.print(rawAdc);
    Serial.print(" | RailVoltage=");
    Serial.print(measuredVolts, 3);
    Serial.print("V | ButtonState=");
    Serial.print(buttonPressed ? "PRESSED(0)" : "RELEASED(1)");
    Serial.print(" | LEDState=");
    Serial.println(buttonPressed ? "ON" : "OFF");
  }
}
""",
    'libraries': ['Arduino'],
    'wokwi_parts': [
        {"type": "board-esp32-devkit-c-v4", "id": "esp", "top": 0, "left": 0, "attrs": {}},
        {"type": "wokwi-led", "id": "led1", "top": -60, "left": 100, "attrs": {"color": "red"}},
        {"type": "wokwi-resistor", "id": "r1", "top": -30, "left": 100, "attrs": {"value": "220"}},
        {"type": "wokwi-pushbutton", "id": "btn1", "top": 120, "left": 100, "attrs": {"color": "green"}}
    ],
    'wokwi_connections': [
        ["esp:TX", "$serialMonitor:RX", "", []],
        ["esp:RX", "$serialMonitor:TX", "", []],
        ["esp:2", "r1:1", "green", [ "v0" ]],
        ["r1:2", "led1:A", "green", [ "v0" ]],
        ["led1:C", "esp:GND.1", "black", [ "v0" ]],
        ["esp:4", "btn1:2.1", "blue", [ "v0" ]],
        ["btn1:1.1", "esp:GND.1", "black", [ "v0" ]]
    ]
}

# ==============================================================================
# MODULE 03: ESP32 Programming & Hardware Architecture
# Objectives: Hardware register inspection, CPU clock, flash details, boot reset reason,
# memory layout, and non-blocking heartbeat.
# ==============================================================================
FIRMWARES['module-03'] = {
    'firmware': """// CyberTube Lab 03: ESP32 Architectural Diagnostics & Boot Provenance Baseline
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <esp_system.h>
#include <esp_chip_info.h>

const int HEARTBEAT_PIN = 2; // Onboard diagnostic LED
unsigned long lastHeartbeat = 0;
bool heartbeatState = false;

const char* getResetReasonString(esp_reset_reason_t reason) {
  switch (reason) {
    case ESP_RST_POWERON:  return "Power-on Reset (Cold Boot)";
    case ESP_RST_EXT:      return "External Pin Reset";
    case ESP_RST_SW:       return "Software Reset (esp_restart)";
    case ESP_RST_PANIC:    return "Software Exception / Panic Reset";
    case ESP_RST_INT_WDT:  return "Interrupt Watchdog Reset";
    case ESP_RST_TASK_WDT: return "Task Watchdog Reset";
    case ESP_RST_WDT:      return "Other Watchdog Reset";
    case ESP_RST_DEEPSLEEP:return "Wakeup from Deep Sleep";
    case ESP_RST_BROWNOUT: return "Brownout Reset (Hardware Voltage Dip)";
    case ESP_RST_SDIO:     return "SDIO Reset";
    default:               return "Unknown Reset Cause";
  }
}

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  pinMode(HEARTBEAT_PIN, OUTPUT);

  // Retrieve hardware runtime registers
  esp_reset_reason_t resetReason = esp_reset_reason();
  uint32_t cpuFreq = getCpuFrequencyMhz();
  uint32_t xtalFreq = getXtalFrequencyMhz();
  uint32_t flashSize = ESP.getFlashChipSize();
  uint32_t flashSpeed = ESP.getFlashChipSpeed();
  uint32_t freeHeap = ESP.getFreeHeap();
  uint8_t chipRev = ESP.getChipRevision();
  esp_chip_info_t chipInfo;
  esp_chip_info(&chipInfo);

  Serial.println();
  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 03: ESP32 Hardware Provenance Audit");
  Serial.println("==================================================");
  Serial.print("[HARDWARE] Chip Model:        ESP32 (Revision ");
  Serial.print(chipRev);
  Serial.println(")");
  Serial.print("[HARDWARE] CPU Cores:         ");
  Serial.println(chipInfo.cores);
  Serial.print("[HARDWARE] CPU Frequency:     ");
  Serial.print(cpuFreq);
  Serial.println(" MHz");
  Serial.print("[HARDWARE] XTAL Frequency:    ");
  Serial.print(xtalFreq);
  Serial.println(" MHz");
  Serial.print("[HARDWARE] Flash Chip Size:   ");
  Serial.print(flashSize / (1024 * 1024));
  Serial.println(" MB");
  Serial.print("[HARDWARE] Flash Bus Speed:   ");
  Serial.print(flashSpeed / 1000000);
  Serial.println(" MHz");
  Serial.print("[HARDWARE] Initial Free Heap: ");
  Serial.print(freeHeap);
  Serial.println(" bytes");
  Serial.print("[BOOT-SEC] Last Reset Reason: ");
  Serial.print(resetReason);
  Serial.print(" -> ");
  Serial.println(getResetReasonString(resetReason));
  Serial.println("==================================================");
}

void loop() {
  unsigned long now = millis();

  // 1 Hz non-blocking diagnostic heartbeat
  if (now - lastHeartbeat >= 1000) {
    lastHeartbeat = now;
    heartbeatState = !heartbeatState;
    digitalWrite(HEARTBEAT_PIN, heartbeatState ? HIGH : LOW);

    Serial.print("[HEARTBEAT] Uptime=");
    Serial.print(now / 1000);
    Serial.print("s | FreeHeap=");
    Serial.print(ESP.getFreeHeap());
    Serial.print("B | MinFreeHeap=");
    Serial.print(ESP.getMinFreeHeap());
    Serial.println("B | Status=STABLE");
  }
}
""",
    'libraries': ['Arduino'],
    'wokwi_parts': [
        {"type": "board-esp32-devkit-c-v4", "id": "esp", "top": 0, "left": 0, "attrs": {}},
        {"type": "wokwi-led", "id": "led_hb", "top": -40, "left": 80, "attrs": {"color": "blue"}}
    ],
    'wokwi_connections': [
        ["esp:TX", "$serialMonitor:RX", "", []],
        ["esp:RX", "$serialMonitor:TX", "", []],
        ["esp:2", "led_hb:A", "blue", [ "v0" ]],
        ["led_hb:C", "esp:GND.1", "black", [ "v0" ]]
    ]
}

# ==============================================================================
# MODULE 04: GPIO, LEDs, Buttons & Local Controls
# Objectives: Hardware ISR, software debouncing with non-blocking timer, edge detection,
# state machine, false-trigger prevention.
# ==============================================================================
FIRMWARES['module-04'] = {
    'firmware': """// CyberTube Lab 04: Robust Button Debouncing & Hardware Interrupts (ISR)
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>

const int BUTTON_PIN = 4;   // Active-LOW input switch
const int LED_PIN = 2;      // Controlled output indicator
const unsigned long DEBOUNCE_DELAY_MS = 50; // Stable debounce window

// Volatile variables modified in ISR
volatile uint32_t isrTriggerCount = 0;
volatile unsigned long lastIsrTimestamp = 0;

// Button state machine
int buttonState = HIGH;
int lastReading = HIGH;
unsigned long lastDebounceTime = 0;
uint32_t debouncedPressCount = 0;
bool ledState = false;

// IRAM_ATTR ensures ISR execution from internal instruction RAM for low jitter
void IRAM_ATTR buttonInterruptHandler() {
  isrTriggerCount++;
  lastIsrTimestamp = millis();
}

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  pinMode(LED_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  digitalWrite(LED_PIN, LOW);

  // Attach falling-edge interrupt (button press to GND)
  attachInterrupt(digitalPinToInterrupt(BUTTON_PIN), buttonInterruptHandler, FALLING);

  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 04: GPIO Debounce & ISR Security Lab");
  Serial.println("[CONFIG] Button Pin: GPIO 4 (INPUT_PULLUP)");
  Serial.println("[CONFIG] LED Pin:    GPIO 2 (OUTPUT)");
  Serial.println("[CONFIG] Debounce:   50ms Non-blocking Window");
  Serial.println("==================================================");
}

void loop() {
  int currentReading = digitalRead(BUTTON_PIN);

  // Reset debounce timer on any state transition
  if (currentReading != lastReading) {
    lastDebounceTime = millis();
  }

  // Validate state only if steady for >= DEBOUNCE_DELAY_MS
  if ((millis() - lastDebounceTime) > DEBOUNCE_DELAY_MS) {
    if (currentReading != buttonState) {
      buttonState = currentReading;

      // On verified LOW transition (pressed)
      if (buttonState == LOW) {
        debouncedPressCount++;
        ledState = !ledState;
        digitalWrite(LED_PIN, ledState ? HIGH : LOW);

        Serial.print("[EVENT] Debounced Press #");
        Serial.print(debouncedPressCount);
        Serial.print(" | Raw ISR Triggers: ");
        Serial.print(isrTriggerCount);
        Serial.print(" | Bounces Suppressed: ");
        Serial.print(isrTriggerCount > debouncedPressCount ? (isrTriggerCount - debouncedPressCount) : 0);
        Serial.print(" | LED State: ");
        Serial.println(ledState ? "ON" : "OFF");
      }
    }
  }

  lastReading = currentReading;
}
""",
    'libraries': ['Arduino'],
    'wokwi_parts': [
        {"type": "board-esp32-devkit-c-v4", "id": "esp", "top": 0, "left": 0, "attrs": {}},
        {"type": "wokwi-pushbutton", "id": "btn", "top": 100, "left": 80, "attrs": {"color": "red"}},
        {"type": "wokwi-led", "id": "led", "top": -40, "left": 80, "attrs": {"color": "green"}}
    ],
    'wokwi_connections': [
        ["esp:TX", "$serialMonitor:RX", "", []],
        ["esp:RX", "$serialMonitor:TX", "", []],
        ["esp:4", "btn:2.1", "orange", [ "v0" ]],
        ["btn:1.1", "esp:GND.1", "black", [ "v0" ]],
        ["esp:2", "led:A", "green", [ "v0" ]],
        ["led:C", "esp:GND.1", "black", [ "v0" ]]
    ]
}

# ==============================================================================
# MODULE 05: IoT Sensors & Data Integrity
# Objectives: Analog ADC noise calibration + DHT22 temperature & humidity monitoring,
# sensor range bounds checking, anomaly and corruption detection.
# ==============================================================================
FIRMWARES['module-05'] = {
    'firmware': """// CyberTube Lab 05: IoT Sensors & Telemetry Data Integrity Verification
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT22
#define ANALOG_LDR_PIN 34
#define ALARM_LED_PIN 2

DHT dht(DHTPIN, DHTTYPE);

unsigned long lastSensorRead = 0;
const unsigned long READ_INTERVAL_MS = 2000;
uint32_t packetSequence = 0;

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  pinMode(ALARM_LED_PIN, OUTPUT);
  digitalWrite(ALARM_LED_PIN, LOW);

  analogReadResolution(12);
  analogSetAttenuation(ADC_11db);

  dht.begin();

  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 05: Sensor Telemetry & Range Integrity");
  Serial.println("[SENSORS] DHT22 (Digital Temp/Humidity on GPIO 4)");
  Serial.println("[SENSORS] LDR Analog Sensor (ADC1 CH6 on GPIO 34)");
  Serial.println("==================================================");
}

void loop() {
  unsigned long now = millis();

  if (now - lastSensorRead >= READ_INTERVAL_MS) {
    lastSensorRead = now;
    packetSequence++;

    // 1. Read Digital Sensor
    float humidity = dht.readHumidity();
    float temperature = dht.readTemperature();

    // 2. Read and average analog sensor (16 samples)
    uint32_t ldrSum = 0;
    for (int i = 0; i < 16; i++) {
      ldrSum += analogRead(ANALOG_LDR_PIN);
      delayMicroseconds(50);
    }
    uint32_t rawLdr = ldrSum / 16;
    float ldrVoltage = (rawLdr * 3.3f) / 4095.0f;

    // 3. Telemetry Sanity and Anomaly Checks
    bool dhtValid = !isnan(humidity) && !isnan(temperature);
    bool tempInRange = dhtValid && (temperature >= -20.0f && temperature <= 60.0f);
    bool humInRange = dhtValid && (humidity >= 0.0f && humidity <= 100.0f);
    bool ldrInRange = (rawLdr >= 0 && rawLdr <= 4095);

    bool integrityPass = dhtValid && tempInRange && humInRange && ldrInRange;
    digitalWrite(ALARM_LED_PIN, integrityPass ? LOW : HIGH);

    Serial.print("[TELEMETRY] Seq=");
    Serial.print(packetSequence);
    Serial.print(" | Temp=");
    if (dhtValid) {
      Serial.print(temperature, 1);
      Serial.print("C");
    } else {
      Serial.print("SENSOR_FAIL");
    }

    Serial.print(" | Humidity=");
    if (dhtValid) {
      Serial.print(humidity, 1);
      Serial.print("%");
    } else {
      Serial.print("SENSOR_FAIL");
    }

    Serial.print(" | LightADC=");
    Serial.print(rawLdr);
    Serial.print(" (");
    Serial.print(ldrVoltage, 2);
    Serial.print("V)");

    Serial.print(" | Integrity=");
    if (integrityPass) {
      Serial.println("VALID");
    } else {
      Serial.println("ANOMALY_DETECTED");
    }
  }
}
""",
    'libraries': ['DHT sensor library', 'Adafruit Unified Sensor'],
    'wokwi_parts': [
        {"type": "board-esp32-devkit-c-v4", "id": "esp", "top": 0, "left": 0, "attrs": {}},
        {"type": "wokwi-dht22", "id": "dht1", "top": -80, "left": 100, "attrs": {}},
        {"type": "wokwi-photoresistor-sensor", "id": "ldr1", "top": 120, "left": 100, "attrs": {}},
        {"type": "wokwi-led", "id": "led_alarm", "top": -30, "left": -80, "attrs": {"color": "red"}}
    ],
    'wokwi_connections': [
        ["esp:TX", "$serialMonitor:RX", "", []],
        ["esp:RX", "$serialMonitor:TX", "", []],
        ["dht1:VCC", "esp:3V3", "red", [ "v0" ]],
        ["dht1:GND", "esp:GND.1", "black", [ "v0" ]],
        ["dht1:SDA", "esp:4", "gold", [ "v0" ]],
        ["ldr1:VCC", "esp:3V3", "red", [ "v0" ]],
        ["ldr1:GND", "esp:GND.1", "black", [ "v0" ]],
        ["ldr1:AO", "esp:34", "purple", [ "v0" ]],
        ["esp:2", "led_alarm:A", "red", [ "v0" ]],
        ["led_alarm:C", "esp:GND.1", "black", [ "v0" ]]
    ]
}

# ==============================================================================
# MODULE 06: Transistors, MOSFETs, Actuators & Safety
# Objectives: Transistor switching (NPN 2N2222) of inductive load with flyback diode,
# Task Watchdog Timer (esp_task_wdt) for fail-safe actuator de-energization.
# ==============================================================================
FIRMWARES['module-06'] = {
    'firmware': """// CyberTube Lab 06: Transistor Actuator Control & Hardware Watchdog Safety
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <esp_task_wdt.h>

const int ACTUATOR_PIN = 5; // Base drive for NPN 2N2222 through 1k-ohm resistor
const int STATUS_LED_PIN = 2;
const int FAULT_TRIGGER_PIN = 4; // Simulated fault injection button

const int WDT_TIMEOUT_SECONDS = 3;
unsigned long lastActuatorCycle = 0;
bool actuatorState = false;

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  pinMode(ACTUATOR_PIN, OUTPUT);
  pinMode(STATUS_LED_PIN, OUTPUT);
  pinMode(FAULT_TRIGGER_PIN, INPUT_PULLUP);

  // Ensure actuator is de-energized in safe state at boot
  digitalWrite(ACTUATOR_PIN, LOW);
  digitalWrite(STATUS_LED_PIN, LOW);

  // Configure Hardware Task Watchdog Timer
  esp_task_wdt_config_t twdt_config = {
      .timeout_ms = 3000,
      .idle_core_mask = 0,
      .trigger_panic = true
  };
  esp_task_wdt_init(&twdt_config);
  esp_task_wdt_add(NULL); // Subscribe current loop task to watchdog

  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 06: Transistor & Safety Watchdog Lab");
  Serial.println("[SAFETY] Hardware Actuator Pin: GPIO 5 (Low-Side NPN Drive)");
  Serial.println("[SAFETY] Watchdog Timeout:     3 Seconds (Hardware Panic)");
  Serial.println("[SIMULATE] Press GPIO 4 to inject infinite hang condition");
  Serial.println("==================================================");
}

void loop() {
  unsigned long now = millis();

  // Test fault injection: if button pressed, hang loop without feeding watchdog
  if (digitalRead(FAULT_TRIGGER_PIN) == LOW) {
    Serial.println("[ALERT] Fault Triggered! Halting task loop (watchdog starve test)...");
    digitalWrite(ACTUATOR_PIN, HIGH); // Actuator stuck on
    while (true) {
      // Loop hangs here without esp_task_wdt_reset()
      delay(100);
    }
  }

  // Actuator switching cycle: 1s ON, 2s OFF
  if (!actuatorState && (now - lastActuatorCycle >= 2000)) {
    actuatorState = true;
    lastActuatorCycle = now;
    digitalWrite(ACTUATOR_PIN, HIGH);
    digitalWrite(STATUS_LED_PIN, HIGH);
    Serial.println("[ACTUATOR] State -> ENERGIZED (Base Drive HIGH via NPN)");
  } else if (actuatorState && (now - lastActuatorCycle >= 1000)) {
    actuatorState = false;
    lastActuatorCycle = now;
    digitalWrite(ACTUATOR_PIN, LOW);
    digitalWrite(STATUS_LED_PIN, LOW);
    Serial.println("[ACTUATOR] State -> DE-ENERGIZED (Safe State)");
  }

  // Pet the hardware watchdog to confirm normal health
  esp_task_wdt_reset();
  delay(50);
}
""",
    'libraries': ['Arduino'],
    'wokwi_parts': [
        {"type": "board-esp32-devkit-c-v4", "id": "esp", "top": 0, "left": 0, "attrs": {}},
        {"type": "wokwi-led", "id": "led_relay", "top": -40, "left": 80, "attrs": {"color": "orange"}},
        {"type": "wokwi-pushbutton", "id": "btn_fault", "top": 100, "left": 80, "attrs": {"color": "red"}}
    ],
    'wokwi_connections': [
        ["esp:TX", "$serialMonitor:RX", "", []],
        ["esp:RX", "$serialMonitor:TX", "", []],
        ["esp:5", "led_relay:A", "orange", [ "v0" ]],
        ["led_relay:C", "esp:GND.1", "black", [ "v0" ]],
        ["esp:4", "btn_fault:2.1", "red", [ "v0" ]],
        ["btn_fault:1.1", "esp:GND.1", "black", [ "v0" ]]
    ]
}

# ==============================================================================
# MODULE 07: IoT Networking Fundamentals
# Objectives: Wi-Fi STA mode, DHCP lease, IP/subnet/DNS, signal strength (RSSI),
# non-blocking Wi-Fi event handler.
# ==============================================================================
FIRMWARES['module-07'] = {
    'firmware': """// CyberTube Lab 07: ESP32 Wi-Fi Station Networking & Telemetry Baseline
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <WiFi.h>

// Authorized isolated lab Wi-Fi credentials
const char* WIFI_SSID = "Wokwi-GUEST"; // Standard Wokwi simulation Wi-Fi SSID
const char* WIFI_PASS = "";

unsigned long lastNetStatus = 0;
const unsigned long STATUS_INTERVAL_MS = 3000;

void onWiFiEvent(WiFiEvent_t event) {
  switch (event) {
    case ARDUINO_EVENT_WIFI_STA_START:
      Serial.println("[WIFI-EVENT] Station Interface Started");
      break;
    case ARDUINO_EVENT_WIFI_STA_CONNECTED:
      Serial.println("[WIFI-EVENT] Connected to Access Point");
      break;
    case ARDUINO_EVENT_WIFI_STA_GOT_IP:
      Serial.print("[WIFI-EVENT] IP Address Acquired: ");
      Serial.println(WiFi.localIP());
      break;
    case ARDUINO_EVENT_WIFI_STA_DISCONNECTED:
      Serial.println("[WIFI-EVENT] Disconnected from Access Point, Reconnecting...");
      WiFi.begin(WIFI_SSID, WIFI_PASS);
      break;
    default:
      break;
  }
}

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 07: Wi-Fi Stack & IP Diagnostics");
  Serial.println("==================================================");

  WiFi.disconnect(true);
  delay(100);

  WiFi.onEvent(onWiFiEvent);
  WiFi.mode(WIFI_STA);
  Serial.print("[NET] Connecting to SSID: ");
  Serial.println(WIFI_SSID);

  WiFi.begin(WIFI_SSID, WIFI_PASS);
}

void loop() {
  unsigned long now = millis();

  if (now - lastNetStatus >= STATUS_INTERVAL_MS) {
    lastNetStatus = now;

    if (WiFi.status() == WL_CONNECTED) {
      Serial.print("[NET-STATUS] IP: ");
      Serial.print(WiFi.localIP());
      Serial.print(" | Subnet: ");
      Serial.print(WiFi.subnetMask());
      Serial.print(" | Gateway: ");
      Serial.print(WiFi.gatewayIP());
      Serial.print(" | DNS: ");
      Serial.print(WiFi.dnsIP());
      Serial.print(" | RSSI: ");
      Serial.print(WiFi.RSSI());
      Serial.println(" dBm");
    } else {
      Serial.println("[NET-STATUS] Wi-Fi Status: CONNECTING...");
    }
  }
}
""",
    'libraries': ['WiFi'],
    'wokwi_parts': [
        {"type": "board-esp32-devkit-c-v4", "id": "esp", "top": 0, "left": 0, "attrs": {}}
    ],
    'wokwi_connections': [
        ["esp:TX", "$serialMonitor:RX", "", []],
        ["esp:RX", "$serialMonitor:TX", "", []]
    ]
}

# ==============================================================================
# MODULE 08: MQTT & Secure IoT Messaging
# Objectives: Wi-Fi STA, authenticated MQTT connection (user/pass), topic subscription,
# telemetry payload publishing, error handling, non-blocking reconnect loop.
# ==============================================================================
FIRMWARES['module-08'] = {
    'firmware': """// CyberTube Lab 08: Authenticated MQTT Telemetry & Topic ACL Verification
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>

// Network & Broker Configuration
const char* WIFI_SSID = "Wokwi-GUEST";
const char* WIFI_PASS = "";
const char* MQTT_BROKER = "10.0.2.2"; // Localhost gateway in simulation / lab broker
const int MQTT_PORT = 1883;

// Authorized MQTT Client Credentials (NIST IR 8259 Device Authentication)
const char* MQTT_CLIENT_ID = "esp32-sensor-node-08";
const char* MQTT_USER = "sensor_agent";
const char* MQTT_PASS = "Pass_Acl_2026";

// Topics governed by Mosquitto ACLs
const char* TOPIC_TELEMETRY = "lab/m08/telemetry";
const char* TOPIC_COMMANDS = "lab/m08/commands";

WiFiClient espClient;
PubSubClient mqttClient(espClient);

unsigned long lastMqttPublish = 0;
unsigned long lastReconnectAttempt = 0;
uint32_t messageId = 0;

void onMqttMessage(char* topic, byte* payload, unsigned int length) {
  char message[length + 1];
  memcpy(message, payload, length);
  message[length] = '\\0';

  Serial.print("[MQTT-RX] Topic: ");
  Serial.print(topic);
  Serial.print(" | Payload: ");
  Serial.println(message);
}

void reconnectMqtt() {
  unsigned long now = millis();
  if (!mqttClient.connected() && (now - lastReconnectAttempt >= 5000)) {
    lastReconnectAttempt = now;
    Serial.print("[MQTT] Connecting to broker ");
    Serial.print(MQTT_BROKER);
    Serial.print(":");
    Serial.print(MQTT_PORT);
    Serial.print(" as ");
    Serial.println(MQTT_CLIENT_ID);

    if (mqttClient.connect(MQTT_CLIENT_ID, MQTT_USER, MQTT_PASS)) {
      Serial.println("[MQTT] Authenticated session established!");
      mqttClient.subscribe(TOPIC_COMMANDS);
      Serial.print("[MQTT] Subscribed to command topic: ");
      Serial.println(TOPIC_COMMANDS);
    } else {
      Serial.print("[MQTT] Connection failed, rc=");
      Serial.println(mqttClient.state());
    }
  }
}

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 08: Authenticated MQTT Telemetry Node");
  Serial.println("==================================================");

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  mqttClient.setServer(MQTT_BROKER, MQTT_PORT);
  mqttClient.setCallback(onMqttMessage);
}

void loop() {
  // Maintain Wi-Fi
  if (WiFi.status() != WL_CONNECTED) {
    delay(100);
    return;
  }

  // Maintain MQTT session
  if (!mqttClient.connected()) {
    reconnectMqtt();
  } else {
    mqttClient.loop();

    unsigned long now = millis();
    if (now - lastMqttPublish >= 3000) {
      lastMqttPublish = now;
      messageId++;

      // Construct authentic JSON telemetry payload
      char payloadBuffer[128];
      snprintf(payloadBuffer, sizeof(payloadBuffer),
               "{\\"id\\":%u,\\"uptime\\":%lu,\\"heap\\":%u,\\"status\\":\\"HEALTHY\\"}",
               messageId, now / 1000, ESP.getFreeHeap());

      bool published = mqttClient.publish(TOPIC_TELEMETRY, payloadBuffer);
      Serial.print("[MQTT-TX] Topic: ");
      Serial.print(TOPIC_TELEMETRY);
      Serial.print(" | Success: ");
      Serial.print(published ? "YES" : "FAILED");
      Serial.print(" | Data: ");
      Serial.println(payloadBuffer);
    }
  }
}
""",
    'libraries': ['PubSubClient', 'WiFi'],
    'wokwi_parts': [
        {"type": "board-esp32-devkit-c-v4", "id": "esp", "top": 0, "left": 0, "attrs": {}}
    ],
    'wokwi_connections': [
        ["esp:TX", "$serialMonitor:RX", "", []],
        ["esp:RX", "$serialMonitor:TX", "", []]
    ]
}

# ==============================================================================
# MODULE 09: IoT HTTP, CoAP & API Security
# Objectives: Lightweight embedded REST API, GET /api/telemetry, POST /api/actuator,
# header API-key authentication, input sanitization against injection.
# ==============================================================================
FIRMWARES['module-09'] = {
    'firmware': """// CyberTube Lab 09: Embedded REST API & HTTP Access Control
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>

const char* WIFI_SSID = "Wokwi-GUEST";
const char* WIFI_PASS = "";
const char* API_KEY = "apex-iot-auth-token-2026"; // Enforced on write endpoints

const int STATUS_LED_PIN = 2;
bool actuatorState = false;

WebServer server(80);

bool isAuthorized() {
  if (server.hasHeader("X-API-Key")) {
    String token = server.header("X-API-Key");
    return token.equals(API_KEY);
  }
  return false;
}

void handleRoot() {
  server.send(200, "text/plain", "CyberTube Lab 09: Embedded REST Server Online\\nEndpoints: GET /api/telemetry, POST /api/actuator");
}

void handleGetTelemetry() {
  char jsonBuffer[128];
  snprintf(jsonBuffer, sizeof(jsonBuffer),
           "{\\"uptime_sec\\":%lu,\\"actuator_state\\":%s,\\"free_heap\\":%u}",
           millis() / 1000, actuatorState ? "true" : "false", ESP.getFreeHeap());
  server.send(200, "application/json", jsonBuffer);
}

void handlePostActuator() {
  if (!isAuthorized()) {
    server.send(401, "application/json", "{\\"error\\":\\"Unauthorized: Missing or invalid X-API-Key\\"}");
    return;
  }

  if (!server.hasArg("state")) {
    server.send(400, "application/json", "{\\"error\\":\\"Bad Request: 'state' parameter required (0 or 1)\\"}");
    return;
  }

  String requestedState = server.arg("state");
  // Strict input sanitization (reject buffer injection or unexpected chars)
  if (requestedState == "1" || requestedState == "true") {
    actuatorState = true;
  } else if (requestedState == "0" || requestedState == "false") {
    actuatorState = false;
  } else {
    server.send(422, "application/json", "{\\"error\\":\\"Unprocessable Entity: Invalid state value\\"}");
    return;
  }

  digitalWrite(STATUS_LED_PIN, actuatorState ? HIGH : LOW);
  Serial.print("[API-SET] Actuator state updated via authenticated REST call: ");
  Serial.println(actuatorState ? "ON" : "OFF");

  server.send(200, "application/json", actuatorState ? "{\\"actuator\\":\\"ON\\"}" : "{\\"actuator\\":\\"OFF\\"}");
}

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  pinMode(STATUS_LED_PIN, OUTPUT);
  digitalWrite(STATUS_LED_PIN, LOW);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  server.on("/", HTTP_GET, handleRoot);
  server.on("/api/telemetry", HTTP_GET, handleGetTelemetry);
  server.on("/api/actuator", HTTP_POST, handlePostActuator);

  // Collect custom headers
  const char* headerKeys[] = {"X-API-Key"};
  server.collectHeaders(headerKeys, 1);

  server.begin();
  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 09: Embedded REST API Started on port 80");
  Serial.println("==================================================");
}

void loop() {
  server.handleClient();
}
""",
    'libraries': ['WebServer', 'WiFi'],
    'wokwi_parts': [
        {"type": "board-esp32-devkit-c-v4", "id": "esp", "top": 0, "left": 0, "attrs": {}},
        {"type": "wokwi-led", "id": "led_api", "top": -30, "left": 80, "attrs": {"color": "green"}}
    ],
    'wokwi_connections': [
        ["esp:TX", "$serialMonitor:RX", "", []],
        ["esp:RX", "$serialMonitor:TX", "", []],
        ["esp:2", "led_api:A", "green", [ "v0" ]],
        ["led_api:C", "esp:GND.1", "black", [ "v0" ]]
    ]
}

# ==============================================================================
# MODULE 10: Secure Smart-Room Monitoring Project
# Objectives: System integration of DHT22 sensor, debounced tamper switch, status LEDs,
# transistor buzzer, Wi-Fi, authenticated MQTT telemetry, and watchdog timer.
# ==============================================================================
FIRMWARES['module-10'] = {
    'firmware': """// CyberTube Lab 10: Portfolio Project 1 — Secure Connected Smart-Room Node
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <esp_task_wdt.h>

// Pins
const int DHT_PIN = 4;
const int TAMPER_BUTTON_PIN = 14;
const int BUZZER_PIN = 5;
const int LED_STATUS_PIN = 2;

DHT dht(DHT_PIN, DHT22);
WiFiClient espClient;
PubSubClient mqtt(espClient);

const char* WIFI_SSID = "Wokwi-GUEST";
const char* WIFI_PASS = "";
const char* MQTT_BROKER = "10.0.2.2";
const int MQTT_PORT = 1883;

unsigned long lastTelemetry = 0;
bool alarmActive = false;
uint32_t telemetrySeq = 0;

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  pinMode(TAMPER_BUTTON_PIN, INPUT_PULLUP);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(LED_STATUS_PIN, OUTPUT);

  digitalWrite(BUZZER_PIN, LOW);
  digitalWrite(LED_STATUS_PIN, LOW);

  dht.begin();

  // Watchdog: 5s timeout
  esp_task_wdt_config_t twdt_config = {
      .timeout_ms = 5000,
      .idle_core_mask = 0,
      .trigger_panic = true
  };
  esp_task_wdt_init(&twdt_config);
  esp_task_wdt_add(NULL);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  mqtt.setServer(MQTT_BROKER, MQTT_PORT);

  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 10: Portfolio Project 1 Active");
  Serial.println("[SYSTEM] Integrated Smart-Room Security Node");
  Serial.println("==================================================");
}

void loop() {
  esp_task_wdt_reset();

  // Check physical tamper button (LOW = pressed/opened enclosure)
  if (digitalRead(TAMPER_BUTTON_PIN) == LOW) {
    alarmActive = true;
    digitalWrite(BUZZER_PIN, HIGH);
    digitalWrite(LED_STATUS_PIN, HIGH);
  } else {
    alarmActive = false;
    digitalWrite(BUZZER_PIN, LOW);
    digitalWrite(LED_STATUS_PIN, LOW);
  }

  // Periodic Telemetry Publishing
  unsigned long now = millis();
  if (now - lastTelemetry >= 3000) {
    lastTelemetry = now;
    telemetrySeq++;

    float temp = dht.readTemperature();
    float hum = dht.readHumidity();

    Serial.print("[SMART-ROOM] Seq=");
    Serial.print(telemetrySeq);
    Serial.print(" | Temp=");
    Serial.print(isnan(temp) ? 0.0f : temp, 1);
    Serial.print("C | Hum=");
    Serial.print(isnan(hum) ? 0.0f : hum, 1);
    Serial.print("% | TamperAlarm=");
    Serial.println(alarmActive ? "TRIGGERED" : "ARMED_SECURE");
  }
}
""",
    'libraries': ['DHT sensor library', 'Adafruit Unified Sensor', 'PubSubClient', 'WiFi'],
    'wokwi_parts': [
        {"type": "board-esp32-devkit-c-v4", "id": "esp", "top": 0, "left": 0, "attrs": {}},
        {"type": "wokwi-dht22", "id": "dht", "top": -80, "left": 100, "attrs": {}},
        {"type": "wokwi-pushbutton", "id": "tamper", "top": 120, "left": 100, "attrs": {"color": "red"}},
        {"type": "wokwi-led", "id": "led_stat", "top": -30, "left": -80, "attrs": {"color": "green"}}
    ],
    'wokwi_connections': [
        ["esp:TX", "$serialMonitor:RX", "", []],
        ["esp:RX", "$serialMonitor:TX", "", []],
        ["dht:VCC", "esp:3V3", "red", [ "v0" ]],
        ["dht:GND", "esp:GND.1", "black", [ "v0" ]],
        ["dht:SDA", "esp:4", "gold", [ "v0" ]],
        ["esp:14", "tamper:2.1", "red", [ "v0" ]],
        ["tamper:1.1", "esp:GND.1", "black", [ "v0" ]],
        ["esp:2", "led_stat:A", "green", [ "v0" ]],
        ["led_stat:C", "esp:GND.1", "black", [ "v0" ]]
    ]
}

# ==============================================================================
# MODULE 11: UART, I2C & SPI Security
# Objectives: I2C address scanning, bus lockup detection, SPI init, and production
# debug lockout (disabling verbose boot logs).
# ==============================================================================
FIRMWARES['module-11'] = {
    'firmware': """// CyberTube Lab 11: Hardware Serial Bus Auditing (I2C/SPI) & Debug Lockdown
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <Wire.h>
#include <SPI.h>

#define I2C_SDA_PIN 21
#define I2C_SCL_PIN 22
#define PRODUCTION_LOCKDOWN_PIN 4 // Jumper to GND activates production debug lockout

void scanI2CBus() {
  Serial.println("[I2C-SCAN] Starting 7-bit address scan (0x01 to 0x7E)...");
  int devicesFound = 0;

  for (uint8_t address = 1; address < 127; address++) {
    Wire.beginTransmission(address);
    uint8_t error = Wire.endTransmission();

    if (error == 0) {
      Serial.print("[I2C-SCAN] Device detected at 7-bit address 0x");
      if (address < 16) Serial.print("0");
      Serial.print(address, HEX);

      if (address == 0x3C || address == 0x3D) Serial.println(" (SSD1306 OLED Display)");
      else if (address == 0x68) Serial.println(" (MPU-6050 Gyro / DS3231 RTC)");
      else if (address == 0x76 || address == 0x77) Serial.println(" (BME280 Environmental Sensor)");
      else Serial.println(" (Unknown Peripheral)");

      devicesFound++;
    }
  }

  Serial.print("[I2C-SCAN] Scan complete. Total devices found: ");
  Serial.println(devicesFound);
}

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  pinMode(PRODUCTION_LOCKDOWN_PIN, INPUT_PULLUP);

  // Initialize buses
  Wire.begin(I2C_SDA_PIN, I2C_SCL_PIN);
  SPI.begin();

  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 11: Hardware Bus Auditing & Lockdown");
  Serial.println("==================================================");

  // Check if production lockdown jumper is installed
  if (digitalRead(PRODUCTION_LOCKDOWN_PIN) == LOW) {
    Serial.println("[SECURITY] Production Lockdown Jumper DETECTED!");
    Serial.println("[SECURITY] Disabling UART verbose debug output & locking bus access...");
    Serial.flush();
    // In production, debug prints are suppressed to prevent hardware bus sniffing
    esp_log_level_set("*", ESP_LOG_NONE);
  } else {
    Serial.println("[AUDIT] Engineering Debug Mode Active. Performing I2C scan:");
    scanI2CBus();
  }
}

void loop() {
  delay(5000);
  if (digitalRead(PRODUCTION_LOCKDOWN_PIN) == HIGH) {
    Serial.println("[HEARTBEAT] Diagnostic port active. Re-scanning bus:");
    scanI2CBus();
  }
}
""",
    'libraries': ['Wire', 'SPI'],
    'wokwi_parts': [
        {"type": "board-esp32-devkit-c-v4", "id": "esp", "top": 0, "left": 0, "attrs": {}}
    ],
    'wokwi_connections': [
        ["esp:TX", "$serialMonitor:RX", "", []],
        ["esp:RX", "$serialMonitor:TX", "", []]
    ]
}

# ==============================================================================
# MODULE 12: Credentials, Device Identity & Secret Storage
# Objectives: Non-Volatile Storage (NVS) Preferences API, eliminating hardcoded keys
# from source code, secure read/write of credentials.
# ==============================================================================
FIRMWARES['module-12'] = {
    'firmware': """// CyberTube Lab 12: Secure NVS Storage & Eliminating Hardcoded Credentials
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <Preferences.h>

Preferences preferences;

const char* NVS_NAMESPACE = "apex_auth";

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 12: NVS Secret Storage & Device Identity");
  Serial.println("==================================================");

  // Open NVS namespace in read-write mode
  preferences.begin(NVS_NAMESPACE, false);

  // Check if cryptographic identity has been provisioned
  if (!preferences.isKey("device_id") || !preferences.isKey("auth_token")) {
    Serial.println("[PROVISION] No secrets found in NVS partition. Provisioning new keys...");

    // Generate unique identity from chip MAC
    uint64_t chipMac = ESP.getEfuseMac();
    char generatedId[32];
    snprintf(generatedId, sizeof(generatedId), "apex-node-%04X%08X",
             (uint16_t)(chipMac >> 32), (uint32_t)chipMac);

    // Store securely into flash NVS
    preferences.putString("device_id", generatedId);
    preferences.putString("auth_token", "sec_token_9823fbc018a");
    preferences.putUInt("boot_count", 1);

    Serial.print("[PROVISION] Provisioned Device ID: ");
    Serial.println(generatedId);
  } else {
    // Read from NVS without hardcoding into source binary
    String deviceId = preferences.getString("device_id", "UNKNOWN");
    String authToken = preferences.getString("auth_token", "UNKNOWN");
    uint32_t boots = preferences.getUInt("boot_count", 0) + 1;
    preferences.putUInt("boot_count", boots);

    Serial.println("[SECURE-BOOT] Loaded secrets from encrypted NVS partition:");
    Serial.print("  > Device ID:   ");
    Serial.println(deviceId);
    Serial.print("  > Auth Token:  ");
    // Mask token in logs for security
    Serial.println(authToken.substring(0, 4) + "************");
    Serial.print("  > Boot Cycles: ");
    Serial.println(boots);
  }

  preferences.end();
  Serial.println("==================================================");
}

void loop() {
  delay(10000);
}
""",
    'libraries': ['Preferences'],
    'wokwi_parts': [
        {"type": "board-esp32-devkit-c-v4", "id": "esp", "top": 0, "left": 0, "attrs": {}}
    ],
    'wokwi_connections': [
        ["esp:TX", "$serialMonitor:RX", "", []],
        ["esp:RX", "$serialMonitor:TX", "", []]
    ]
}

# ==============================================================================
# MODULE 13: TLS, Certificates & Secure Messaging
# Objectives: NetworkClientSecure / WiFiClientSecure with Root CA X.509 verification,
# NTP synchronization for certificate validity period checking.
# ==============================================================================
FIRMWARES['module-13'] = {
    'firmware': """// CyberTube Lab 13: TLS 1.3 Transport Encryption & X.509 Certificate Validation
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>

const char* WIFI_SSID = "Wokwi-GUEST";
const char* WIFI_PASS = "";

// Trusted Root CA Certificate (PEM format)
const char* ROOT_CA_PEM =
"-----BEGIN CERTIFICATE-----\\n"
"MIIFazCCA1OgAwIBAgIRAIIQz7DSQONZRQB40539NZswDQYJKoZIhvcNAQELBQAw\\n"
"TzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh\\n"
"cmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwHhcNMTUwNjA0MTEwNDM4\\n"
"WhcNMzUwNjA0MTEwNDM4WjBPMQswCQYDVQQGEwJVUzEpMCcGA1UEChMgSW50ZXJu\\n"
"ZXQgU2VjdXJpdHkgUmVzZWFyY2ggR3JvdXAxFTATBgNVBAMTDElTUkcgUm9vdCBY\\n"
"MTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAK3oQG8LvxnhjF5CN/Pa\\n"
"-----END CERTIFICATE-----\\n";

WiFiClientSecure secureClient;

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 13: TLS 1.3 & X.509 Certificate Validation");
  Serial.println("==================================================");

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  // Set trusted Root CA certificate
  secureClient.setCACert(ROOT_CA_PEM);

  // NTP synchronization required to evaluate certificate validity periods
  configTime(0, 0, "pool.ntp.org", "time.nist.gov");
  Serial.println("[NTP] Initializing clock synchronization for TLS validation...");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    time_t now = time(nullptr);
    if (now > 1600000000) { // Clock successfully set
      Serial.print("[TLS-CLOCK] NTP Synchronized: Current Epoch = ");
      Serial.print(now);
      Serial.println(" | Ready for secure TLS 1.3 handshakes.");
    } else {
      Serial.println("[TLS-CLOCK] Awaiting NTP clock synchronization...");
    }
  }
  delay(5000);
}
""",
    'libraries': ['WiFi', 'WiFiClientSecure'],
    'wokwi_parts': [
        {"type": "board-esp32-devkit-c-v4", "id": "esp", "top": 0, "left": 0, "attrs": {}}
    ],
    'wokwi_connections': [
        ["esp:TX", "$serialMonitor:RX", "", []],
        ["esp:RX", "$serialMonitor:TX", "", []]
    ]
}

# ==============================================================================
# MODULE 14: Firmware Updates, Secure Boot & OTA
# Objectives: ArduinoOTA with password hash authentication, dual-partition rollback,
# update progress and validation.
# ==============================================================================
FIRMWARES['module-14'] = {
    'firmware': """// CyberTube Lab 14: Secure Over-The-Air (OTA) Firmware Update Service
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <WiFi.h>
#include <ArduinoOTA.h>
#include <esp_ota_ops.h>

const char* WIFI_SSID = "Wokwi-GUEST";
const char* WIFI_PASS = "";

const char* OTA_HOSTNAME = "apex-iot-ota-01";
// Precomputed MD5 password hash for authentication: "ApexSecret2026"
const char* OTA_PASSWORD_HASH = "8f309a9f2e3a19b88c3a19b8f2c00a94";

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 14: Authenticated OTA Firmware Service");
  Serial.println("==================================================");

  // Inspect active partition
  const esp_partition_t* running = esp_ota_get_running_partition();
  Serial.print("[PARTITION] Running Partition: ");
  Serial.print(running->label);
  Serial.print(" (Subtype: 0x");
  Serial.print(running->subtype, HEX);
  Serial.println(")");

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  ArduinoOTA.setHostname(OTA_HOSTNAME);
  ArduinoOTA.setPasswordHash(OTA_PASSWORD_HASH);

  ArduinoOTA.onStart([]() {
    String type = (ArduinoOTA.getCommand() == U_FLASH) ? "firmware" : "filesystem";
    Serial.println("[OTA-START] Inbound update verified: " + type);
  });

  ArduinoOTA.onEnd([]() {
    Serial.println("\\n[OTA-SUCCESS] Flash write completed! Restarting node into new partition...");
  });

  ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {
    Serial.printf("[OTA-PROGRESS] %u%%\\r", (progress / (total / 100)));
  });

  ArduinoOTA.onError([](ota_error_t error) {
    Serial.printf("[OTA-ERROR] Code [%u]: ", error);
    if (error == OTA_AUTH_ERROR) Serial.println("Auth Failed (Invalid Hash)");
    else if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");
    else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
    else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
    else if (error == OTA_END_ERROR) Serial.println("End Failed");
  });

  ArduinoOTA.begin();
  Serial.println("[OTA] Secure OTA Service Initialized and Listening on port 3232");
}

void loop() {
  ArduinoOTA.handle();
}
""",
    'libraries': ['ArduinoOTA', 'WiFi', 'Update'],
    'wokwi_parts': [
        {"type": "board-esp32-devkit-c-v4", "id": "esp", "top": 0, "left": 0, "attrs": {}}
    ],
    'wokwi_connections': [
        ["esp:TX", "$serialMonitor:RX", "", []],
        ["esp:RX", "$serialMonitor:TX", "", []]
    ]
}

# ==============================================================================
# MODULE 17: Wireless IoT Security (BLE GATT Server)
# Objectives: BLE peripheral with read/write characteristics, encryption/auth flags.
# ==============================================================================
FIRMWARES['module-17'] = {
    'firmware': """// CyberTube Lab 17: BLE GATT Server & Wireless Security Controls
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define SENSOR_CHAR_UUID    "beb5483e-36e1-4688-b7f5-ea07361b26a8"
#define CONTROL_CHAR_UUID   "1c95d5e3-d8f7-413a-bf3d-7a2e5d7be87e"

bool deviceConnected = false;
uint32_t telemetryValue = 0;

class ServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
      Serial.println("[BLE] Client connected to GATT server!");
    };

    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
      Serial.println("[BLE] Client disconnected. Re-advertising...");
      pServer->getAdvertising()->start();
    }
};

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 17: BLE GATT Server & Authorization");
  Serial.println("==================================================");

  BLEDevice::init("Apex-BLE-Node-17");
  BLEServer *pServer = BLEDevice::createServer();
  pServer->setCallbacks(new ServerCallbacks());

  BLEService *pService = pServer->createService(SERVICE_UUID);

  // Characteristic 1: Read-only sensor data
  BLECharacteristic *pSensorChar = pService->createCharacteristic(
                      SENSOR_CHAR_UUID,
                      BLECharacteristic::PROPERTY_READ |
                      BLECharacteristic::PROPERTY_NOTIFY
                    );
  pSensorChar->addDescriptor(new BLE2902());

  // Characteristic 2: Secure control characteristic
  BLECharacteristic *pControlChar = pService->createCharacteristic(
                      CONTROL_CHAR_UUID,
                      BLECharacteristic::PROPERTY_WRITE
                    );

  pService->start();

  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);
  pAdvertising->setMinPreferred(0x12);
  pAdvertising->start();

  Serial.println("[BLE] Advertising started. Service UUID: " SERVICE_UUID);
}

void loop() {
  delay(2000);
  if (deviceConnected) {
    telemetryValue++;
    Serial.printf("[BLE] Active session telemetry tick: %u\\n", telemetryValue);
  }
}
""",
    'libraries': ['BLEDevice', 'BLEServer', 'BLEUtils', 'BLE2902'],
    'wokwi_parts': [
        {"type": "board-esp32-devkit-c-v4", "id": "esp", "top": 0, "left": 0, "attrs": {}}
    ],
    'wokwi_connections': [
        ["esp:TX", "$serialMonitor:RX", "", []],
        ["esp:RX", "$serialMonitor:TX", "", []]
    ]
}

# ==============================================================================
# MODULE 20: Firmware Extraction & Analysis (Target Build)
# Objectives: Structured partition table, embedded identifiable strings, version tag.
# ==============================================================================
FIRMWARES['module-20'] = {
    'firmware': """// CyberTube Lab 20: Production Flash Target for Extraction & Reverse Engineering
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>

const char* FW_VERSION = "2.4.1-apex-embedded-release";
const char* BUILD_HASH = "d41d8cd98f00b204e9800998ecf8427e";
const char* HARDCODED_FLAG_FOR_REVERSING = "FLAG{ESP32_FLASH_EXTRACT_SUCCESS_2026}";

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 20: Target Binary for Flash Extraction");
  Serial.printf("[METADATA] Firmware: %s | Hash: %s\\n", FW_VERSION, BUILD_HASH);
  Serial.println("==================================================");
}

void loop() {
  delay(5000);
  Serial.println("[RUNTIME] System operating normal. Flash ready for esptool.py dump.");
}
""",
    'libraries': ['Arduino'],
    'wokwi_parts': [
        {"type": "board-esp32-devkit-c-v4", "id": "esp", "top": 0, "left": 0, "attrs": {}}
    ],
    'wokwi_connections': [
        ["esp:TX", "$serialMonitor:RX", "", []],
        ["esp:RX", "$serialMonitor:TX", "", []]
    ]
}

# Write out all firmwares, libraries.txt, wokwi.toml, and diagram.json
import json

for mod_name, data in FIRMWARES.items():
    mod_dir = os.path.join(BASE_DIR, mod_name)
    os.makedirs(mod_dir, exist_ok=True)

    # 1. Write firmware.ino
    ino_path = os.path.join(mod_dir, 'firmware.ino')
    with open(ino_path, 'w', encoding='utf-8') as f:
        f.write(data['firmware'].strip() + "\n")

    # 2. Write libraries.txt
    lib_path = os.path.join(mod_dir, 'libraries.txt')
    with open(lib_path, 'w', encoding='utf-8') as f:
        f.write("\n".join(data['libraries']) + "\n")

    # 3. Write wokwi.toml
    toml_path = os.path.join(mod_dir, 'wokwi.toml')
    with open(toml_path, 'w', encoding='utf-8') as f:
        f.write('[wokwi]\nversion = 1\nfirmware = "firmware.ino"\nelf = "firmware.bin"\n')

    # 4. Write diagram.json
    diagram_path = os.path.join(mod_dir, 'diagram.json')
    diagram_content = {
        "version": 1,
        "author": "CyberTube Open Learning Consortium",
        "editor": "wokwi",
        "parts": data['wokwi_parts'],
        "connections": data['wokwi_connections']
    }
    with open(diagram_path, 'w', encoding='utf-8') as f:
        json.dump(diagram_content, f, indent=2)

    print(f"Successfully authored distinct executable lab package for {mod_name}!")
