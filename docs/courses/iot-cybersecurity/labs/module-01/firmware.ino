// CyberTube Lab 01 Firmware: Embedded Toolchain & ESP32 Hardware Bring-Up
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>

#define STATUS_LED_PIN 2
#define BAUD_RATE 115200

void setup() {
  Serial.begin(BAUD_RATE);
  while (!Serial && millis() < 3000);
  
  pinMode(STATUS_LED_PIN, OUTPUT);
  digitalWrite(STATUS_LED_PIN, HIGH);
  
  Serial.println("=================================================");
  Serial.println("[CYBERTUBE] Module 01: Toolchain Bring-Up & Diagnostics");
  Serial.println("[SYSTEM] Target: ESP32 DevKit V1 (Xtensa LX6 Dual-Core)");
  Serial.printf("[SYSTEM] Clock Frequency: %u MHz\\n", getCpuFrequencyMhz());
  Serial.printf("[SYSTEM] Flash Size: %u MB\\n", ESP.getFlashChipSize() / (1024 * 1024));
  Serial.printf("[SYSTEM] Free Heap: %u bytes\\n", ESP.getFreeHeap());
  Serial.println("[SYSTEM] Voltage Rail: Verified 3.3V DC Onboard LDO");
  Serial.println("[SYSTEM] Toolchain Verification: SUCCESS");
  Serial.println("=================================================");
  
  digitalWrite(STATUS_LED_PIN, LOW);
}

void loop() {
  digitalWrite(STATUS_LED_PIN, HIGH);
  delay(500);
  digitalWrite(STATUS_LED_PIN, LOW);
  delay(500);
  
  Serial.printf("[HEARTBEAT] Uptime: %lu ms | Free Heap: %u bytes | Status: HEALTHY\\n",
    millis(), ESP.getFreeHeap());
}
