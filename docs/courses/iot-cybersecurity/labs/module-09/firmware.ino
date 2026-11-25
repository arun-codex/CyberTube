// CyberTube Lab 09: Embedded REST API & HTTP Access Control
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>

const char* WIFI_SSID = "Wokwi-GUEST";
const char* WIFI_PASS = "";
const char* API_KEY = "apex-iot-auth-token-2026"; // Enforced on write endpoints

const int STATUS_LED_PIN = 2;
bool actuatorState = false;

WebServer server(80);

bool isAuthorized() {
  if (server.hasHeader("X-API-Key")) {
    String token = server.header("X-API-Key");
    return token.equals(API_KEY);
  }
  return false;
}

void handleRoot() {
  server.send(200, "text/plain", "CyberTube Lab 09: Embedded REST Server Online\nEndpoints: GET /api/telemetry, POST /api/actuator");
}

void handleGetTelemetry() {
  char jsonBuffer[128];
  snprintf(jsonBuffer, sizeof(jsonBuffer),
           "{\"uptime_sec\":%lu,\"actuator_state\":%s,\"free_heap\":%u}",
           millis() / 1000, actuatorState ? "true" : "false", ESP.getFreeHeap());
  server.send(200, "application/json", jsonBuffer);
}

void handlePostActuator() {
  if (!isAuthorized()) {
    server.send(401, "application/json", "{\"error\":\"Unauthorized: Missing or invalid X-API-Key\"}");
    return;
  }

  if (!server.hasArg("state")) {
    server.send(400, "application/json", "{\"error\":\"Bad Request: 'state' parameter required (0 or 1)\"}");
    return;
  }

  String requestedState = server.arg("state");
  // Strict input sanitization (reject buffer injection or unexpected chars)
  if (requestedState == "1" || requestedState == "true") {
    actuatorState = true;
  } else if (requestedState == "0" || requestedState == "false") {
    actuatorState = false;
  } else {
    server.send(422, "application/json", "{\"error\":\"Unprocessable Entity: Invalid state value\"}");
    return;
  }

  digitalWrite(STATUS_LED_PIN, actuatorState ? HIGH : LOW);
  Serial.print("[API-SET] Actuator state updated via authenticated REST call: ");
  Serial.println(actuatorState ? "ON" : "OFF");

  server.send(200, "application/json", actuatorState ? "{\"actuator\":\"ON\"}" : "{\"actuator\":\"OFF\"}");
}

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  pinMode(STATUS_LED_PIN, OUTPUT);
  digitalWrite(STATUS_LED_PIN, LOW);

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  server.on("/", HTTP_GET, handleRoot);
  server.on("/api/telemetry", HTTP_GET, handleGetTelemetry);
  server.on("/api/actuator", HTTP_POST, handlePostActuator);

  // Collect custom headers
  const char* headerKeys[] = {"X-API-Key"};
  server.collectHeaders(headerKeys, 1);

  server.begin();
  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 09: Embedded REST API Started on port 80");
  Serial.println("==================================================");
}

void loop() {
  server.handleClient();
}
