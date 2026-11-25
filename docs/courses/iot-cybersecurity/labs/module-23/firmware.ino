// CyberTube Lab 23 Firmware: Ghidra Decompilation Target with Cryptographic Primitives
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
