// CyberTube Lab 20: Production Flash Target for Extraction & Reverse Engineering
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
  Serial.printf("[METADATA] Firmware: %s | Hash: %s\n", FW_VERSION, BUILD_HASH);
  Serial.println("==================================================");
}

void loop() {
  delay(5000);
  Serial.println("[RUNTIME] System operating normal. Flash ready for esptool.py dump.");
}
