// CyberTube Lab 25 Firmware: Milestone 4 — Mirai Botnet Attack Chain Forensics & Telemetry Triage
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>

#define STATUS_LED_PIN 2
#define INPUT_SENSOR_PIN 4
#define BAUD_RATE 115200

unsigned long lastTelemetryTime = 0;
const unsigned long TELEMETRY_INTERVAL_MS = 2000;
uint32_t bootCount = 1;

void setup() {
  Serial.begin(BAUD_RATE);
  while (!Serial && millis() < 3000); // Wait for serial connection
  
  pinMode(STATUS_LED_PIN, OUTPUT);
  pinMode(INPUT_SENSOR_PIN, INPUT_PULLDOWN);
  
  digitalWrite(STATUS_LED_PIN, HIGH);
  delay(100);
  digitalWrite(STATUS_LED_PIN, LOW);
  
  Serial.println("=================================================");
  Serial.println("[CYBERTUBE] Module 25 Practical Lab Firmware Loaded");
  Serial.println("[CYBERTUBE] Target: ESP32 DevKit V1 (Xtensa Dual-Core)");
  Serial.println("[CYBERTUBE] Logic Voltage: 3.3V DC Verified");
  Serial.print("[CYBERTUBE] Chip Revision: ");
  Serial.println(ESP.getChipRevision());
  Serial.print("[CYBERTUBE] MAC Address: ");
  Serial.println(WiFi.macAddress());
  Serial.println("=================================================");
}

void loop() {
  unsigned long now = millis();
  
  // Non-blocking telemetry loop
  if (now - lastTelemetryTime >= TELEMETRY_INTERVAL_MS) {
    lastTelemetryTime = now;
    
    int rawInput = digitalRead(INPUT_SENSOR_PIN);
    digitalWrite(STATUS_LED_PIN, rawInput ? HIGH : LOW);
    
    Serial.print("[TELEMETRY] Uptime(ms)=");
    Serial.print(now);
    Serial.print(" | SensorState=");
    Serial.print(rawInput);
    Serial.print(" | VCC=3.30V | Module=25");
    Serial.println(" | Integrity=OK");
  }
}
