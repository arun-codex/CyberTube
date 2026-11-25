// CyberTube Lab 26 Firmware: Active Enclosure Tamper Detection & Zeroization
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Logic Level: Strictly <= 3.3V DC. Zero mains AC.

#include <Arduino.h>

#define STATUS_LED_PIN 2
#define TAMPER_SWITCH_PIN 4
#define ALARM_BUZZER_PIN 5

// Volatile cryptographic key buffer in SRAM
static uint8_t s_device_master_key[32];
static volatile bool s_tamper_tripped = false;

// Hardware interrupt triggered immediately on enclosure breach
void IRAM_ATTR on_tamper_isr() {
  s_tamper_tripped = true;
  // Emergency immediate zeroization directly in ISR
  for (size_t i = 0; i < sizeof(s_device_master_key); i++) {
    s_device_master_key[i] = 0x00;
  }
}

void initialize_keys() {
  Serial.println("[CRYPTO] Provisioning ephemeral device keys in protected RAM...");
  for (size_t i = 0; i < sizeof(s_device_master_key); i++) {
    s_device_master_key[i] = (uint8_t)(0xAA ^ (i * 7));
  }
  Serial.print("[CRYPTO] Master Key Digest: ");
  for (int i = 0; i < 8; i++) Serial.printf("%02X", s_device_master_key[i]);
  Serial.println("...[ARMED]");
}

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 2000);
  
  pinMode(STATUS_LED_PIN, OUTPUT);
  pinMode(ALARM_BUZZER_PIN, OUTPUT);
  pinMode(TAMPER_SWITCH_PIN, INPUT_PULLUP);
  
  Serial.println("=================================================");
  Serial.println("[CYBERTUBE] Module 26: Hardware Tamper Defense");
  Serial.println("[SAFETY] Enclosure microswitch monitored on GPIO 4");
  
  initialize_keys();
  
  // Attach immediate falling-edge interrupt (switch opened)
  attachInterrupt(digitalPinToInterrupt(TAMPER_SWITCH_PIN), on_tamper_isr, FALLING);
  
  digitalWrite(STATUS_LED_PIN, HIGH);
  Serial.println("[SYSTEM] Tamper perimeter armed. System operating in SECURE state.");
  Serial.println("=================================================");
}

void loop() {
  if (s_tamper_tripped) {
    digitalWrite(STATUS_LED_PIN, LOW);
    digitalWrite(ALARM_BUZZER_PIN, HIGH);
    
    Serial.println("!!! [SECURITY ALERT] ENCLOSURE TAMPER DETECTED !!!");
    Serial.println("[TAMPER] Enclosure microswitch circuit broken.");
    Serial.println("[TAMPER] Cryptographic zeroization executed in hardware ISR.");
    Serial.print("[TAMPER] Memory Verification: ");
    bool zeroed = true;
    for (size_t i = 0; i < sizeof(s_device_master_key); i++) {
      if (s_device_master_key[i] != 0) zeroed = false;
      Serial.printf("%02X", s_device_master_key[i]);
    }
    Serial.println();
    if (zeroed) {
      Serial.println("[TAMPER] CONFIRMED: All secrets purged from RAM.");
    }
    Serial.println("[TAMPER] Device halted in secure lockdown state.");
    
    // Freeze device in lockdown state
    while (true) {
      digitalWrite(STATUS_LED_PIN, HIGH);
      delay(100);
      digitalWrite(STATUS_LED_PIN, LOW);
      delay(100);
    }
  }
  
  delay(1000);
  Serial.println("[STATUS] Perimeter secure. Key memory intact. Heartbeat OK.");
}
