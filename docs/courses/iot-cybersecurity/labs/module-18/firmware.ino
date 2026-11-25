// CyberTube Lab 18 Firmware: Sub-GHz OOK Transmitter & Pulse Train Generator
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
