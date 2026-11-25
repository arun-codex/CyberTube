// CyberTube Lab 05: IoT Sensors & Telemetry Data Integrity Verification
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT22
#define ANALOG_LDR_PIN 34
#define ALARM_LED_PIN 2

DHT dht(DHTPIN, DHTTYPE);

unsigned long lastSensorRead = 0;
const unsigned long READ_INTERVAL_MS = 2000;
uint32_t packetSequence = 0;

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  pinMode(ALARM_LED_PIN, OUTPUT);
  digitalWrite(ALARM_LED_PIN, LOW);

  analogReadResolution(12);
  analogSetAttenuation(ADC_11db);

  dht.begin();

  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 05: Sensor Telemetry & Range Integrity");
  Serial.println("[SENSORS] DHT22 (Digital Temp/Humidity on GPIO 4)");
  Serial.println("[SENSORS] LDR Analog Sensor (ADC1 CH6 on GPIO 34)");
  Serial.println("==================================================");
}

void loop() {
  unsigned long now = millis();

  if (now - lastSensorRead >= READ_INTERVAL_MS) {
    lastSensorRead = now;
    packetSequence++;

    // 1. Read Digital Sensor
    float humidity = dht.readHumidity();
    float temperature = dht.readTemperature();

    // 2. Read and average analog sensor (16 samples)
    uint32_t ldrSum = 0;
    for (int i = 0; i < 16; i++) {
      ldrSum += analogRead(ANALOG_LDR_PIN);
      delayMicroseconds(50);
    }
    uint32_t rawLdr = ldrSum / 16;
    float ldrVoltage = (rawLdr * 3.3f) / 4095.0f;

    // 3. Telemetry Sanity and Anomaly Checks
    bool dhtValid = !isnan(humidity) && !isnan(temperature);
    bool tempInRange = dhtValid && (temperature >= -20.0f && temperature <= 60.0f);
    bool humInRange = dhtValid && (humidity >= 0.0f && humidity <= 100.0f);
    bool ldrInRange = (rawLdr >= 0 && rawLdr <= 4095);

    bool integrityPass = dhtValid && tempInRange && humInRange && ldrInRange;
    digitalWrite(ALARM_LED_PIN, integrityPass ? LOW : HIGH);

    Serial.print("[TELEMETRY] Seq=");
    Serial.print(packetSequence);
    Serial.print(" | Temp=");
    if (dhtValid) {
      Serial.print(temperature, 1);
      Serial.print("C");
    } else {
      Serial.print("SENSOR_FAIL");
    }

    Serial.print(" | Humidity=");
    if (dhtValid) {
      Serial.print(humidity, 1);
      Serial.print("%");
    } else {
      Serial.print("SENSOR_FAIL");
    }

    Serial.print(" | LightADC=");
    Serial.print(rawLdr);
    Serial.print(" (");
    Serial.print(ldrVoltage, 2);
    Serial.print("V)");

    Serial.print(" | Integrity=");
    if (integrityPass) {
      Serial.println("VALID");
    } else {
      Serial.println("ANOMALY_DETECTED");
    }
  }
}
