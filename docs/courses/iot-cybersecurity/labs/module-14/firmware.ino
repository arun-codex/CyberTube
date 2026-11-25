// CyberTube Lab 14: Secure Over-The-Air (OTA) Firmware Update Service
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <WiFi.h>
#include <ArduinoOTA.h>
#include <esp_ota_ops.h>

const char* WIFI_SSID = "Wokwi-GUEST";
const char* WIFI_PASS = "";

const char* OTA_HOSTNAME = "apex-iot-ota-01";
// Precomputed MD5 password hash for authentication: "ApexSecret2026"
const char* OTA_PASSWORD_HASH = "8f309a9f2e3a19b88c3a19b8f2c00a94";

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 14: Authenticated OTA Firmware Service");
  Serial.println("==================================================");

  // Inspect active partition
  const esp_partition_t* running = esp_ota_get_running_partition();
  Serial.print("[PARTITION] Running Partition: ");
  Serial.print(running->label);
  Serial.print(" (Subtype: 0x");
  Serial.print(running->subtype, HEX);
  Serial.println(")");

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  ArduinoOTA.setHostname(OTA_HOSTNAME);
  ArduinoOTA.setPasswordHash(OTA_PASSWORD_HASH);

  ArduinoOTA.onStart([]() {
    String type = (ArduinoOTA.getCommand() == U_FLASH) ? "firmware" : "filesystem";
    Serial.println("[OTA-START] Inbound update verified: " + type);
  });

  ArduinoOTA.onEnd([]() {
    Serial.println("\n[OTA-SUCCESS] Flash write completed! Restarting node into new partition...");
  });

  ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {
    Serial.printf("[OTA-PROGRESS] %u%%\r", (progress / (total / 100)));
  });

  ArduinoOTA.onError([](ota_error_t error) {
    Serial.printf("[OTA-ERROR] Code [%u]: ", error);
    if (error == OTA_AUTH_ERROR) Serial.println("Auth Failed (Invalid Hash)");
    else if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");
    else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
    else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
    else if (error == OTA_END_ERROR) Serial.println("End Failed");
  });

  ArduinoOTA.begin();
  Serial.println("[OTA] Secure OTA Service Initialized and Listening on port 3232");
}

void loop() {
  ArduinoOTA.handle();
}
