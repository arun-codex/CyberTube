// CyberTube Lab 06: Transistor Actuator Control & Hardware Watchdog Safety
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
