// CyberTube Lab 02: Discrete Circuit Instrumentation & DC Voltage Measurement
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
