// CyberTube Lab 10: Portfolio Project 1 — Secure Connected Smart-Room Node
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <esp_task_wdt.h>

// Pins
const int DHT_PIN = 4;
const int TAMPER_BUTTON_PIN = 14;
const int BUZZER_PIN = 5;
const int LED_STATUS_PIN = 2;

DHT dht(DHT_PIN, DHT22);
WiFiClient espClient;
PubSubClient mqtt(espClient);

const char* WIFI_SSID = "Wokwi-GUEST";
const char* WIFI_PASS = "";
const char* MQTT_BROKER = "10.0.2.2";
const int MQTT_PORT = 1883;

unsigned long lastTelemetry = 0;
bool alarmActive = false;
uint32_t telemetrySeq = 0;

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  pinMode(TAMPER_BUTTON_PIN, INPUT_PULLUP);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(LED_STATUS_PIN, OUTPUT);

  digitalWrite(BUZZER_PIN, LOW);
  digitalWrite(LED_STATUS_PIN, LOW);

  dht.begin();

  // Watchdog: 5s timeout
  esp_task_wdt_config_t twdt_config = {
      .timeout_ms = 5000,
      .idle_core_mask = 0,
      .trigger_panic = true
  };
  esp_task_wdt_init(&twdt_config);
  esp_task_wdt_add(NULL);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  mqtt.setServer(MQTT_BROKER, MQTT_PORT);

  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 10: Portfolio Project 1 Active");
  Serial.println("[SYSTEM] Integrated Smart-Room Security Node");
  Serial.println("==================================================");
}

void loop() {
  esp_task_wdt_reset();

  // Check physical tamper button (LOW = pressed/opened enclosure)
  if (digitalRead(TAMPER_BUTTON_PIN) == LOW) {
    alarmActive = true;
    digitalWrite(BUZZER_PIN, HIGH);
    digitalWrite(LED_STATUS_PIN, HIGH);
  } else {
    alarmActive = false;
    digitalWrite(BUZZER_PIN, LOW);
    digitalWrite(LED_STATUS_PIN, LOW);
  }

  // Periodic Telemetry Publishing
  unsigned long now = millis();
  if (now - lastTelemetry >= 3000) {
    lastTelemetry = now;
    telemetrySeq++;

    float temp = dht.readTemperature();
    float hum = dht.readHumidity();

    Serial.print("[SMART-ROOM] Seq=");
    Serial.print(telemetrySeq);
    Serial.print(" | Temp=");
    Serial.print(isnan(temp) ? 0.0f : temp, 1);
    Serial.print("C | Hum=");
    Serial.print(isnan(hum) ? 0.0f : hum, 1);
    Serial.print("% | TamperAlarm=");
    Serial.println(alarmActive ? "TRIGGERED" : "ARMED_SECURE");
  }
}
