// CyberTube Lab 07: ESP32 Wi-Fi Station Networking & Telemetry Baseline
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <WiFi.h>

// Authorized isolated lab Wi-Fi credentials
const char* WIFI_SSID = "Wokwi-GUEST"; // Standard Wokwi simulation Wi-Fi SSID
const char* WIFI_PASS = "";

unsigned long lastNetStatus = 0;
const unsigned long STATUS_INTERVAL_MS = 3000;

void onWiFiEvent(WiFiEvent_t event) {
  switch (event) {
    case ARDUINO_EVENT_WIFI_STA_START:
      Serial.println("[WIFI-EVENT] Station Interface Started");
      break;
    case ARDUINO_EVENT_WIFI_STA_CONNECTED:
      Serial.println("[WIFI-EVENT] Connected to Access Point");
      break;
    case ARDUINO_EVENT_WIFI_STA_GOT_IP:
      Serial.print("[WIFI-EVENT] IP Address Acquired: ");
      Serial.println(WiFi.localIP());
      break;
    case ARDUINO_EVENT_WIFI_STA_DISCONNECTED:
      Serial.println("[WIFI-EVENT] Disconnected from Access Point, Reconnecting...");
      WiFi.begin(WIFI_SSID, WIFI_PASS);
      break;
    default:
      break;
  }
}

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 07: Wi-Fi Stack & IP Diagnostics");
  Serial.println("==================================================");

  WiFi.disconnect(true);
  delay(100);

  WiFi.onEvent(onWiFiEvent);
  WiFi.mode(WIFI_STA);
  Serial.print("[NET] Connecting to SSID: ");
  Serial.println(WIFI_SSID);

  WiFi.begin(WIFI_SSID, WIFI_PASS);
}

void loop() {
  unsigned long now = millis();

  if (now - lastNetStatus >= STATUS_INTERVAL_MS) {
    lastNetStatus = now;

    if (WiFi.status() == WL_CONNECTED) {
      Serial.print("[NET-STATUS] IP: ");
      Serial.print(WiFi.localIP());
      Serial.print(" | Subnet: ");
      Serial.print(WiFi.subnetMask());
      Serial.print(" | Gateway: ");
      Serial.print(WiFi.gatewayIP());
      Serial.print(" | DNS: ");
      Serial.print(WiFi.dnsIP());
      Serial.print(" | RSSI: ");
      Serial.print(WiFi.RSSI());
      Serial.println(" dBm");
    } else {
      Serial.println("[NET-STATUS] Wi-Fi Status: CONNECTING...");
    }
  }
}
