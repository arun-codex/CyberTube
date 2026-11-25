// CyberTube Lab 08: Authenticated MQTT Telemetry & Topic ACL Verification
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>

// Network & Broker Configuration
const char* WIFI_SSID = "Wokwi-GUEST";
const char* WIFI_PASS = "";
const char* MQTT_BROKER = "10.0.2.2"; // Localhost gateway in simulation / lab broker
const int MQTT_PORT = 1883;

// Authorized MQTT Client Credentials (NIST IR 8259 Device Authentication)
const char* MQTT_CLIENT_ID = "esp32-sensor-node-08";
const char* MQTT_USER = "sensor_agent";
const char* MQTT_PASS = "Pass_Acl_2026";

// Topics governed by Mosquitto ACLs
const char* TOPIC_TELEMETRY = "lab/m08/telemetry";
const char* TOPIC_COMMANDS = "lab/m08/commands";

WiFiClient espClient;
PubSubClient mqttClient(espClient);

unsigned long lastMqttPublish = 0;
unsigned long lastReconnectAttempt = 0;
uint32_t messageId = 0;

void onMqttMessage(char* topic, byte* payload, unsigned int length) {
  char message[length + 1];
  memcpy(message, payload, length);
  message[length] = '\0';

  Serial.print("[MQTT-RX] Topic: ");
  Serial.print(topic);
  Serial.print(" | Payload: ");
  Serial.println(message);
}

void reconnectMqtt() {
  unsigned long now = millis();
  if (!mqttClient.connected() && (now - lastReconnectAttempt >= 5000)) {
    lastReconnectAttempt = now;
    Serial.print("[MQTT] Connecting to broker ");
    Serial.print(MQTT_BROKER);
    Serial.print(":");
    Serial.print(MQTT_PORT);
    Serial.print(" as ");
    Serial.println(MQTT_CLIENT_ID);

    if (mqttClient.connect(MQTT_CLIENT_ID, MQTT_USER, MQTT_PASS)) {
      Serial.println("[MQTT] Authenticated session established!");
      mqttClient.subscribe(TOPIC_COMMANDS);
      Serial.print("[MQTT] Subscribed to command topic: ");
      Serial.println(TOPIC_COMMANDS);
    } else {
      Serial.print("[MQTT] Connection failed, rc=");
      Serial.println(mqttClient.state());
    }
  }
}

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 08: Authenticated MQTT Telemetry Node");
  Serial.println("==================================================");

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  mqttClient.setServer(MQTT_BROKER, MQTT_PORT);
  mqttClient.setCallback(onMqttMessage);
}

void loop() {
  // Maintain Wi-Fi
  if (WiFi.status() != WL_CONNECTED) {
    delay(100);
    return;
  }

  // Maintain MQTT session
  if (!mqttClient.connected()) {
    reconnectMqtt();
  } else {
    mqttClient.loop();

    unsigned long now = millis();
    if (now - lastMqttPublish >= 3000) {
      lastMqttPublish = now;
      messageId++;

      // Construct authentic JSON telemetry payload
      char payloadBuffer[128];
      snprintf(payloadBuffer, sizeof(payloadBuffer),
               "{\"id\":%u,\"uptime\":%lu,\"heap\":%u,\"status\":\"HEALTHY\"}",
               messageId, now / 1000, ESP.getFreeHeap());

      bool published = mqttClient.publish(TOPIC_TELEMETRY, payloadBuffer);
      Serial.print("[MQTT-TX] Topic: ");
      Serial.print(TOPIC_TELEMETRY);
      Serial.print(" | Success: ");
      Serial.print(published ? "YES" : "FAILED");
      Serial.print(" | Data: ");
      Serial.println(payloadBuffer);
    }
  }
}
