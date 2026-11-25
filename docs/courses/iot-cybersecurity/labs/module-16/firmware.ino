// CyberTube Lab 16 Firmware: Target Wi-Fi Beacon & Management Node
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <WiFi.h>

#define STATUS_LED_PIN 2

const char* AP_SSID = "CyberTube_Target_AP";
const char* AP_PASS = "Lab_Isolated_80211!";

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 2000);
  
  pinMode(STATUS_LED_PIN, OUTPUT);
  digitalWrite(STATUS_LED_PIN, HIGH);
  
  Serial.println("=================================================");
  Serial.println("[CYBERTUBE] Module 16: Target Wi-Fi Node Initialized");
  Serial.printf("[WIFI] Broadcasting AP: %s (Channel 6)\n", AP_SSID);
  
  WiFi.mode(WIFI_AP);
  WiFi.softAP(AP_SSID, AP_PASS, 6, 0, 4); // Max 4 stations
  
  Serial.print("[WIFI] AP Gateway IP: ");
  Serial.println(WiFi.softAPIP());
  Serial.print("[WIFI] AP BSSID MAC: ");
  Serial.println(WiFi.softAPmacAddress());
  Serial.println("=================================================");
  digitalWrite(STATUS_LED_PIN, LOW);
}

void loop() {
  digitalWrite(STATUS_LED_PIN, HIGH);
  delay(100);
  digitalWrite(STATUS_LED_PIN, LOW);
  delay(900);
  
  Serial.printf("[AP-STATUS] Connected Stations: %d | Free Heap: %u B\n",
    WiFi.softAPgetStationNum(), ESP.getFreeHeap());
}
