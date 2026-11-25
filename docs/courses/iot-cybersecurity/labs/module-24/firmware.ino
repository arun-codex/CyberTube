// CyberTube Lab 24 Firmware: Memory Safety Demonstration & Buffer Bounds Check
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>

#define STATUS_LED_PIN 2
#define SAFE_BUFFER_SIZE 32

void process_command_safely(const char* input_cmd) {
  char safe_dest[SAFE_BUFFER_SIZE];
  
  // Defensive bounds check preventing stack buffer overflow
  strncpy(safe_dest, input_cmd, SAFE_BUFFER_SIZE - 1);
  safe_dest[SAFE_BUFFER_SIZE - 1] = '\0';
  
  Serial.print("[SAFE-EXEC] Command processed: ");
  Serial.println(safe_dest);
}

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 2000);
  
  pinMode(STATUS_LED_PIN, OUTPUT);
  Serial.println("=================================================");
  Serial.println("[CYBERTUBE] Module 24: Memory Safety & Stack Protection");
  Serial.println("[SECURE] Stack canaries enabled (-fstack-protector)");
  Serial.println("=================================================");
  
  process_command_safely("STATUS_DIAGNOSTICS_REPORT");
}

void loop() {
  delay(3000);
}
