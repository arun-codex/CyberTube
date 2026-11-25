// CyberTube Lab 04: Robust Button Debouncing & Hardware Interrupts (ISR)
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>

const int BUTTON_PIN = 4;   // Active-LOW input switch
const int LED_PIN = 2;      // Controlled output indicator
const unsigned long DEBOUNCE_DELAY_MS = 50; // Stable debounce window

// Volatile variables modified in ISR
volatile uint32_t isrTriggerCount = 0;
volatile unsigned long lastIsrTimestamp = 0;

// Button state machine
int buttonState = HIGH;
int lastReading = HIGH;
unsigned long lastDebounceTime = 0;
uint32_t debouncedPressCount = 0;
bool ledState = false;

// IRAM_ATTR ensures ISR execution from internal instruction RAM for low jitter
void IRAM_ATTR buttonInterruptHandler() {
  isrTriggerCount++;
  lastIsrTimestamp = millis();
}

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  pinMode(LED_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  digitalWrite(LED_PIN, LOW);

  // Attach falling-edge interrupt (button press to GND)
  attachInterrupt(digitalPinToInterrupt(BUTTON_PIN), buttonInterruptHandler, FALLING);

  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 04: GPIO Debounce & ISR Security Lab");
  Serial.println("[CONFIG] Button Pin: GPIO 4 (INPUT_PULLUP)");
  Serial.println("[CONFIG] LED Pin:    GPIO 2 (OUTPUT)");
  Serial.println("[CONFIG] Debounce:   50ms Non-blocking Window");
  Serial.println("==================================================");
}

void loop() {
  int currentReading = digitalRead(BUTTON_PIN);

  // Reset debounce timer on any state transition
  if (currentReading != lastReading) {
    lastDebounceTime = millis();
  }

  // Validate state only if steady for >= DEBOUNCE_DELAY_MS
  if ((millis() - lastDebounceTime) > DEBOUNCE_DELAY_MS) {
    if (currentReading != buttonState) {
      buttonState = currentReading;

      // On verified LOW transition (pressed)
      if (buttonState == LOW) {
        debouncedPressCount++;
        ledState = !ledState;
        digitalWrite(LED_PIN, ledState ? HIGH : LOW);

        Serial.print("[EVENT] Debounced Press #");
        Serial.print(debouncedPressCount);
        Serial.print(" | Raw ISR Triggers: ");
        Serial.print(isrTriggerCount);
        Serial.print(" | Bounces Suppressed: ");
        Serial.print(isrTriggerCount > debouncedPressCount ? (isrTriggerCount - debouncedPressCount) : 0);
        Serial.print(" | LED State: ");
        Serial.println(ledState ? "ON" : "OFF");
      }
    }
  }

  lastReading = currentReading;
}
