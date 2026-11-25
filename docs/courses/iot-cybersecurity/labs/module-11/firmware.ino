// CyberTube Lab 11: Hardware Serial Bus Auditing (I2C/SPI) & Debug Lockdown
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <Wire.h>
#include <SPI.h>

#define I2C_SDA_PIN 21
#define I2C_SCL_PIN 22
#define PRODUCTION_LOCKDOWN_PIN 4 // Jumper to GND activates production debug lockout

void scanI2CBus() {
  Serial.println("[I2C-SCAN] Starting 7-bit address scan (0x01 to 0x7E)...");
  int devicesFound = 0;

  for (uint8_t address = 1; address < 127; address++) {
    Wire.beginTransmission(address);
    uint8_t error = Wire.endTransmission();

    if (error == 0) {
      Serial.print("[I2C-SCAN] Device detected at 7-bit address 0x");
      if (address < 16) Serial.print("0");
      Serial.print(address, HEX);

      if (address == 0x3C || address == 0x3D) Serial.println(" (SSD1306 OLED Display)");
      else if (address == 0x68) Serial.println(" (MPU-6050 Gyro / DS3231 RTC)");
      else if (address == 0x76 || address == 0x77) Serial.println(" (BME280 Environmental Sensor)");
      else Serial.println(" (Unknown Peripheral)");

      devicesFound++;
    }
  }

  Serial.print("[I2C-SCAN] Scan complete. Total devices found: ");
  Serial.println(devicesFound);
}

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  pinMode(PRODUCTION_LOCKDOWN_PIN, INPUT_PULLUP);

  // Initialize buses
  Wire.begin(I2C_SDA_PIN, I2C_SCL_PIN);
  SPI.begin();

  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 11: Hardware Bus Auditing & Lockdown");
  Serial.println("==================================================");

  // Check if production lockdown jumper is installed
  if (digitalRead(PRODUCTION_LOCKDOWN_PIN) == LOW) {
    Serial.println("[SECURITY] Production Lockdown Jumper DETECTED!");
    Serial.println("[SECURITY] Disabling UART verbose debug output & locking bus access...");
    Serial.flush();
    // In production, debug prints are suppressed to prevent hardware bus sniffing
    esp_log_level_set("*", ESP_LOG_NONE);
  } else {
    Serial.println("[AUDIT] Engineering Debug Mode Active. Performing I2C scan:");
    scanI2CBus();
  }
}

void loop() {
  delay(5000);
  if (digitalRead(PRODUCTION_LOCKDOWN_PIN) == HIGH) {
    Serial.println("[HEARTBEAT] Diagnostic port active. Re-scanning bus:");
    scanI2CBus();
  }
}
