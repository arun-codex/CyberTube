// CyberTube Lab 21 Firmware: Target Embedded System for SPI Flash Dumping
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
  Serial.printf("[FLASH] Chip Size: %u MB | Speed: 40 MHz\n", ESP.getFlashChipSize() / (1024 * 1024));
  Serial.printf("[FLASH] Chip Mode: QIO | Flash ID: 0x%08X\n", ESP.getFlashChipMode());
  
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
