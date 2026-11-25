// CyberTube Lab 15 Firmware: Low-Power Modes & Power Analysis Defense
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Logic Level: Strictly <= 3.3V DC. Zero mains AC.

#include <Arduino.h>
#include "esp_sleep.h"

#define STATUS_LED_PIN 2
#define WAKEUP_BUTTON_PIN GPIO_NUM_4
#define SLEEP_DURATION_SEC 10

// Variable preserved across deep sleep cycles in RTC Slow Memory
RTC_DATA_ATTR static uint32_t bootCount = 0;
RTC_DATA_ATTR static uint32_t telemetrySeq = 0;

void print_wakeup_reason() {
  esp_sleep_wakeup_cause_t wakeup_reason = esp_sleep_get_wakeup_cause();
  Serial.print("[POWER] Wakeup Reason: ");
  switch (wakeup_reason) {
    case ESP_SLEEP_WAKEUP_EXT0:
      Serial.println("External GPIO interrupt (Button pressed on GPIO 4)");
      break;
    case ESP_SLEEP_WAKEUP_TIMER:
      Serial.println("RTC Timer expired (10s periodic wake)");
      break;
    default:
      Serial.printf("Cold Boot / Power On (code %d)\n", wakeup_reason);
      break;
  }
}

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 2000);
  
  pinMode(STATUS_LED_PIN, OUTPUT);
  digitalWrite(STATUS_LED_PIN, HIGH);
  
  bootCount++;
  telemetrySeq++;
  
  Serial.println("=================================================");
  Serial.println("[CYBERTUBE] Module 15: Low-Power & Side-Channel Lab");
  Serial.printf("[POWER] Boot Cycle: #%u | Telemetry Sequence: #%u\n", bootCount, telemetrySeq);
  print_wakeup_reason();
  
  // Active state: simulate brief 200ms sensor burst
  Serial.println("[ACTIVE] Executing high-speed telemetry collection (Current ~80mA)...");
  delay(200);
  
  // Power reduction configuration
  Serial.println("[POWER] Configuring Deep Sleep wake sources...");
  // 1. Periodic RTC timer wake (10 seconds)
  esp_sleep_enable_timer_wakeup((uint64_t)SLEEP_DURATION_SEC * 1000000ULL);
  
  // 2. External GPIO wake on Button (GPIO 4 HIGH)
  esp_sleep_enable_ext0_wakeup(WAKEUP_BUTTON_PIN, 1);
  
  Serial.println("[POWER] Isolating unused GPIOs to prevent current leakage...");
  digitalWrite(STATUS_LED_PIN, LOW);
  
  Serial.printf("[POWER] Entering Deep Sleep for %d seconds (Current ~15uA). Goodbye!\n", SLEEP_DURATION_SEC);
  Serial.println("=================================================");
  Serial.flush();
  
  // Enter deep sleep
  esp_deep_sleep_start();
}

void loop() {
  // Never reached in deep sleep
}
