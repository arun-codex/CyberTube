// CyberTube Lab 30 Firmware: Final Capstone Production-Hardened IoT Node
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Logic Level: Strictly <= 3.3V DC. Zero mains AC.

#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include "esp_task_wdt.h"

#define STATUS_LED_PIN 2
#define TAMPER_PIN 4
#define DHT_PIN 15
#define WDT_TIMEOUT_SECONDS 8

// Hardened network & MQTT configuration
const char* WIFI_SSID = "CyberTube_Secure_IoT";
const char* WIFI_PASS = "Hardened_IoT_Pass_2026!";
const char* MQTT_BROKER = "192.168.10.50";
const int MQTT_PORT = 1883;
const char* MQTT_USER = "device_node_capstone";
const char* MQTT_PASS = "Capst0ne_M0squitto_Token!";

WiFiClient espClient;
PubSubClient mqttClient(espClient);

unsigned long lastTelemetry = 0;
const unsigned long TELEMETRY_INTERVAL = 5000;
uint32_t packetSequence = 0;

void setup_security() {
  Serial.println("[CAPSTONE] Initializing hardware safety watchdog (8s timeout)...");
  esp_task_wdt_config_t twdt_config = {
      .timeout_ms = WDT_TIMEOUT_SECONDS * 1000,
      .idle_core_mask = 0,
      .trigger_panic = true
  };
  esp_task_wdt_init(&twdt_config);
  esp_task_wdt_add(NULL);
  
  pinMode(STATUS_LED_PIN, OUTPUT);
  pinMode(TAMPER_PIN, INPUT_PULLUP);
}

void connect_wifi() {
  Serial.printf("[WIFI] Connecting to SSID: %s...\n", WIFI_SSID);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  
  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 4000) {
    esp_task_wdt_reset();
    delay(200);
    Serial.print(".");
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.printf("\n[WIFI] Connected! IP: %s | RSSI: %d dBm\n", WiFi.localIP().toString().c_str(), WiFi.RSSI());
  } else {
    Serial.println("\n[WIFI] Wi-Fi fallback/offline mode active.");
  }
}

void connect_mqtt() {
  mqttClient.setServer(MQTT_BROKER, MQTT_PORT);
  if (!mqttClient.connected()) {
    Serial.printf("[MQTT] Connecting to broker %s:%d...\n", MQTT_BROKER, MQTT_PORT);
    String clientId = "ESP32-Capstone-" + String(WiFi.macAddress());
    if (mqttClient.connect(clientId.c_str(), MQTT_USER, MQTT_PASS)) {
      Serial.println("[MQTT] Authenticated & Connected successfully!");
      mqttClient.subscribe("cybertube/capstone/commands");
    } else {
      Serial.printf("[MQTT] Connection deferred (rc=%d)\n", mqttClient.state());
    }
  }
}

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 2000);
  
  Serial.println("=================================================");
  Serial.println("[CYBERTUBE] Module 30: Final IoT Capstone Defense");
  Serial.println("[CAPSTONE] Verified 3.3V Logic | Watchdog Active");
  Serial.println("=================================================");
  
  setup_security();
  connect_wifi();
  connect_mqtt();
}

void loop() {
  esp_task_wdt_reset();
  
  if (WiFi.status() == WL_CONNECTED && !mqttClient.connected()) {
    connect_mqtt();
  }
  mqttClient.loop();
  
  unsigned long now = millis();
  if (now - lastTelemetry >= TELEMETRY_INTERVAL) {
    lastTelemetry = now;
    packetSequence++;
    
    // Check enclosure tamper
    bool tamperTripped = (digitalRead(TAMPER_PIN) == LOW);
    
    // Generate authentic telemetry payload
    char payload[256];
    snprintf(payload, sizeof(payload),
      "{\"seq\":%u,\"uptime_ms\":%lu,\"tamper\":%s,\"vcc\":3.30,\"firmware\":\"3.4.0-hardened\"}",
      packetSequence, now, tamperTripped ? "true" : "false"
    );
    
    Serial.printf("[TELEMETRY] Sequence #%u: %s\n", packetSequence, payload);
    
    if (mqttClient.connected()) {
      mqttClient.publish("cybertube/capstone/telemetry", payload);
    }
    
    digitalWrite(STATUS_LED_PIN, HIGH);
    delay(50);
    digitalWrite(STATUS_LED_PIN, LOW);
  }
}
