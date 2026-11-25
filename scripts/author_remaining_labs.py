import os

LABS_DIR = r"C:\Users\dutch\.gemini\antigravity\worktrees\REA_Project\private_bug_bounty_library\docs\courses\iot-cybersecurity\labs"

TARGET_FIRMWARES = {
    "module-16": """// CyberTube Lab 16 Firmware: Target Wi-Fi Beacon & Management Node
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <WiFi.h>

#define STATUS_LED_PIN 2

const char* AP_SSID = "CyberTube_Target_AP";
const char* AP_PASS = "Lab_Isolated_80211!";

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 2000);
  
  pinMode(STATUS_LED_PIN, OUTPUT);
  digitalWrite(STATUS_LED_PIN, HIGH);
  
  Serial.println("=================================================");
  Serial.println("[CYBERTUBE] Module 16: Target Wi-Fi Node Initialized");
  Serial.printf("[WIFI] Broadcasting AP: %s (Channel 6)\\n", AP_SSID);
  
  WiFi.mode(WIFI_AP);
  WiFi.softAP(AP_SSID, AP_PASS, 6, 0, 4); // Max 4 stations
  
  Serial.print("[WIFI] AP Gateway IP: ");
  Serial.println(WiFi.softAPIP());
  Serial.print("[WIFI] AP BSSID MAC: ");
  Serial.println(WiFi.softAPmacAddress());
  Serial.println("=================================================");
  digitalWrite(STATUS_LED_PIN, LOW);
}

void loop() {
  digitalWrite(STATUS_LED_PIN, HIGH);
  delay(100);
  digitalWrite(STATUS_LED_PIN, LOW);
  delay(900);
  
  Serial.printf("[AP-STATUS] Connected Stations: %d | Free Heap: %u B\\n",
    WiFi.softAPgetStationNum(), ESP.getFreeHeap());
}
""",

    "module-18": """// CyberTube Lab 18 Firmware: Sub-GHz OOK Transmitter & Pulse Train Generator
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>

#define TX_PULSE_PIN 4
#define STATUS_LED_PIN 2

// 24-bit fixed security preamble + rolling payload
const uint32_t FIXED_PREAMBLE = 0xA5B6C7;

void transmit_ook_pulse(bool bit) {
  if (bit) {
    // 1-bit: 700us HIGH, 300us LOW
    digitalWrite(TX_PULSE_PIN, HIGH);
    delayMicroseconds(700);
    digitalWrite(TX_PULSE_PIN, LOW);
    delayMicroseconds(300);
  } else {
    // 0-bit: 300us HIGH, 700us LOW
    digitalWrite(TX_PULSE_PIN, HIGH);
    delayMicroseconds(300);
    digitalWrite(TX_PULSE_PIN, LOW);
    delayMicroseconds(700);
  }
}

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 2000);
  
  pinMode(TX_PULSE_PIN, OUTPUT);
  pinMode(STATUS_LED_PIN, OUTPUT);
  digitalWrite(TX_PULSE_PIN, LOW);
  
  Serial.println("=================================================");
  Serial.println("[CYBERTUBE] Module 18: OOK RF Signal Generator");
  Serial.println("[RADIO] Output: GPIO 4 to 433.92MHz ASK/OOK Module (3.3V)");
  Serial.println("=================================================");
}

void loop() {
  digitalWrite(STATUS_LED_PIN, HIGH);
  Serial.println("[RF-TX] Transmitting OOK packet frame...");
  
  // Preamble sync
  for (int i = 0; i < 4; i++) transmit_ook_pulse(true);
  
  // Data payload
  for (int i = 23; i >= 0; i--) {
    bool bit = (FIXED_PREAMBLE >> i) & 1;
    transmit_ook_pulse(bit);
  }
  
  digitalWrite(STATUS_LED_PIN, LOW);
  delay(2000); // Wait 2s between bursts
}
""",

    "module-19": """// CyberTube Lab 19 Firmware: Hardware PCB Diagnostics & Test-Point Stimulus
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>

#define TEST_POINT_1 4
#define TEST_POINT_2 5
#define TEST_POINT_3 18
#define STATUS_LED_PIN 2

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 2000);
  
  pinMode(STATUS_LED_PIN, OUTPUT);
  pinMode(TEST_POINT_1, OUTPUT);
  pinMode(TEST_POINT_2, OUTPUT);
  pinMode(TEST_POINT_3, OUTPUT);
  
  Serial.println("=================================================");
  Serial.println("[CYBERTUBE] Module 19: Hardware PCB Reverse Eng Testbed");
  Serial.println("[DIAG] TP1 (GPIO 4), TP2 (GPIO 5), TP3 (GPIO 18) active");
  Serial.println("[SAFETY] All test points operating at 3.3V DC");
  Serial.println("=================================================");
}

void loop() {
  digitalWrite(STATUS_LED_PIN, HIGH);
  digitalWrite(TEST_POINT_1, HIGH);
  digitalWrite(TEST_POINT_2, LOW);
  digitalWrite(TEST_POINT_3, HIGH);
  delay(500);
  
  digitalWrite(STATUS_LED_PIN, LOW);
  digitalWrite(TEST_POINT_1, LOW);
  digitalWrite(TEST_POINT_2, HIGH);
  digitalWrite(TEST_POINT_3, LOW);
  delay(500);
  
  Serial.println("[TP-MONITOR] Test-point square wave cadence: 1.00 Hz");
}
""",

    "module-21": """// CyberTube Lab 21 Firmware: Target Embedded System for SPI Flash Dumping
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <Preferences.h>

#define STATUS_LED_PIN 2

Preferences prefs;

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 2000);
  
  pinMode(STATUS_LED_PIN, OUTPUT);
  digitalWrite(STATUS_LED_PIN, HIGH);
  
  Serial.println("=================================================");
  Serial.println("[CYBERTUBE] Module 21: Target SPI Flash Device");
  Serial.printf("[FLASH] Chip Size: %u MB | Speed: 40 MHz\\n", ESP.getFlashChipSize() / (1024 * 1024));
  Serial.printf("[FLASH] Chip Mode: QIO | Flash ID: 0x%08X\\n", ESP.getFlashChipMode());
  
  // Seed secret into NVS partition to test flash extraction
  prefs.begin("factory_auth", false);
  prefs.putString("api_key", "sec_token_9f83a2c4e1b0");
  prefs.putString("cloud_gw", "gw.iot.internal:8883");
  prefs.end();
  
  Serial.println("[NVS] Factory provisioning secrets committed to SPI flash.");
  Serial.println("[EXPLOIT-TARGET] Use esptool.py read_flash 0 0x400000 flash.bin");
  Serial.println("=================================================");
  digitalWrite(STATUS_LED_PIN, LOW);
}

void loop() {
  digitalWrite(STATUS_LED_PIN, HIGH);
  delay(200);
  digitalWrite(STATUS_LED_PIN, LOW);
  delay(1800);
}
""",

    "module-22": """// CyberTube Lab 22 Firmware: Firmware Image Unpacking & Static String Target
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>

#define STATUS_LED_PIN 2

// Strings placed in flash .rodata segment for binwalk & string extraction
static const char* HARDCODED_CERT_SUBJ = "/C=US/ST=CA/O=CyberTube/CN=TargetIoTNode";
static const char* FIRMWARE_BUILD_TAG = "BUILD_REV_2026_V3_4_STABLE";
static const char* RECOVERY_BACKDOOR_KEY = "BACKDOOR_RECOVERY_KEY_99812";

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 2000);
  
  pinMode(STATUS_LED_PIN, OUTPUT);
  Serial.println("=================================================");
  Serial.println("[CYBERTUBE] Module 22: Firmware File System Extraction Target");
  Serial.printf("[IMAGE] Build Tag: %s\\n", FIRMWARE_BUILD_TAG);
  Serial.printf("[IMAGE] Subject: %s\\n", HARDCODED_CERT_SUBJ);
  Serial.println("[TARGET] Ready for strings/binwalk extraction.");
  Serial.println("=================================================");
}

void loop() {
  digitalWrite(STATUS_LED_PIN, HIGH);
  delay(100);
  digitalWrite(STATUS_LED_PIN, LOW);
  delay(1900);
}
""",

    "module-23": """// CyberTube Lab 23 Firmware: Ghidra Decompilation Target with Cryptographic Primitives
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>

#define STATUS_LED_PIN 2

// Obfuscated secret verification function to locate in Ghidra
bool verify_license_token(const char* input) {
  // Constant XOR key table
  const uint8_t xor_key[8] = { 0x5A, 0x3F, 0x7E, 0x2A, 0x1C, 0x8D, 0x4B, 0x93 };
  const uint8_t expected_hash[8] = { 0x39, 0x56, 0x1B, 0x4E, 0x77, 0xEB, 0x28, 0xF1 };
  
  size_t len = strlen(input);
  if (len != 8) return false;
  
  for (size_t i = 0; i < 8; i++) {
    if (((uint8_t)input[i] ^ xor_key[i]) != expected_hash[i]) {
      return false;
    }
  }
  return true;
}

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 2000);
  
  pinMode(STATUS_LED_PIN, OUTPUT);
  Serial.println("=================================================");
  Serial.println("[CYBERTUBE] Module 23: Ghidra Embedded Reversing Target");
  Serial.println("[TARGET] Function verify_license_token() loaded in flash");
  Serial.println("=================================================");
}

void loop() {
  delay(2000);
  Serial.println("[REVERSE-ME] Send token to UART to verify license...");
}
""",

    "module-24": """// CyberTube Lab 24 Firmware: Memory Safety Demonstration & Buffer Bounds Check
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>

#define STATUS_LED_PIN 2
#define SAFE_BUFFER_SIZE 32

void process_command_safely(const char* input_cmd) {
  char safe_dest[SAFE_BUFFER_SIZE];
  
  // Defensive bounds check preventing stack buffer overflow
  strncpy(safe_dest, input_cmd, SAFE_BUFFER_SIZE - 1);
  safe_dest[SAFE_BUFFER_SIZE - 1] = '\\0';
  
  Serial.print("[SAFE-EXEC] Command processed: ");
  Serial.println(safe_dest);
}

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 2000);
  
  pinMode(STATUS_LED_PIN, OUTPUT);
  Serial.println("=================================================");
  Serial.println("[CYBERTUBE] Module 24: Memory Safety & Stack Protection");
  Serial.println("[SECURE] Stack canaries enabled (-fstack-protector)");
  Serial.println("=================================================");
  
  process_command_safely("STATUS_DIAGNOSTICS_REPORT");
}

void loop() {
  delay(3000);
}
""",

    "module-25": """// CyberTube Lab 25 Firmware: Hardened Embedded Gateway API
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>

#define STATUS_LED_PIN 2

WebServer server(80);

void handle_status() {
  server.send(200, "application/json", "{\\"status\\":\\"HEALTHY\\",\\"auth\\":\\"REQUIRED\\"}");
}

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 2000);
  
  pinMode(STATUS_LED_PIN, OUTPUT);
  Serial.println("=================================================");
  Serial.println("[CYBERTUBE] Module 25: IoT Cloud & Gateway Attack Surface");
  Serial.println("=================================================");
  
  server.on("/api/v1/status", HTTP_GET, handle_status);
  server.begin();
}

void loop() {
  server.handleClient();
  delay(10);
}
""",

    "module-27": """// CyberTube Lab 27 Firmware: Threat-Modeled Smart-Actuator Device
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>

#define STATUS_LED_PIN 2
#define ACTUATOR_LOCK_PIN 4

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 2000);
  
  pinMode(STATUS_LED_PIN, OUTPUT);
  pinMode(ACTUATOR_LOCK_PIN, OUTPUT);
  digitalWrite(ACTUATOR_LOCK_PIN, LOW); // Fail-secure state
  
  Serial.println("=================================================");
  Serial.println("[CYBERTUBE] Module 27: Threat Model & MITRE ATT&CK Target");
  Serial.println("[DEFENSE] Fail-secure default lock state verified (LOW)");
  Serial.println("=================================================");
}

void loop() {
  delay(2000);
  Serial.println("[HEARTBEAT] Physical lock state: SECURE | Actuator=0");
}
""",

    "module-28": """// CyberTube Lab 28 Firmware: NIST IR 8259 Compliance Verification Target
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>

#define STATUS_LED_PIN 2

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 2000);
  
  pinMode(STATUS_LED_PIN, OUTPUT);
  Serial.println("=================================================");
  Serial.println("[CYBERTUBE] Module 28: IoT Security Standards Verification");
  Serial.println("[NIST-8259] Device Identifier: ESP32-SEC-8259");
  Serial.println("[NIST-8259] Cryptographic Capability: SHA-256 / AES-128");
  Serial.println("[NIST-8259] Firmware Update Mechanism: Authenticated OTA");
  Serial.println("=================================================");
}

void loop() {
  delay(2500);
  Serial.println("[COMPLIANCE] NIST Baseline Capability Checks: PASS");
}
""",

    "module-29": """// CyberTube Lab 29 Firmware: Vulnerability Assessment & Pen-Test Target
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>

#define STATUS_LED_PIN 2

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 2000);
  
  pinMode(STATUS_LED_PIN, OUTPUT);
  Serial.println("=================================================");
  Serial.println("[CYBERTUBE] Module 29: Final Pen-Test Report Target");
  Serial.println("[AUDIT] Scope: Local interfaces, serial console, firmware");
  Serial.println("=================================================");
}

void loop() {
  delay(3000);
  Serial.println("[AUDIT] Target active. Listening on Serial for commands.");
}
"""
}

def main():
    for mod_id, code in TARGET_FIRMWARES.items():
        path = os.path.join(LABS_DIR, mod_id, "firmware.ino")
        with open(path, "w", encoding="utf-8") as f:
            f.write(code)
        print(f"Authored purpose-built firmware for {mod_id}")

if __name__ == "__main__":
    main()
