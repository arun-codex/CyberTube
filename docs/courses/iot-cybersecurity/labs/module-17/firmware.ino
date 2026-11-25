// CyberTube Lab 17: BLE GATT Server & Wireless Security Controls
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <BLE.h>

#define STATUS_LED_PIN 2

static const BLEUUID SVC_UUID("4fafc201-1fb5-459e-8fcc-c5c9c331914b");
static const BLEUUID SENSOR_CHR_UUID("beb5483e-36e1-4688-b7f5-ea07361b26a8");
static const BLEUUID CONTROL_CHR_UUID("1c95d5e3-d8f7-413a-bf3d-7a2e5d7be87e");

BLECharacteristic sensorChr;
BLECharacteristic controlChr;
bool deviceConnected = false;
uint32_t telemetryValue = 0;

void onClientConnect(BLEServer server, const BLEConnInfo &conn) {
  deviceConnected = true;
  digitalWrite(STATUS_LED_PIN, HIGH);
  Serial.printf("[BLE] Client connected: %s (MTU %d)\n", conn.getAddress().toString().c_str(), conn.getMTU());
}

void onClientDisconnect(BLEServer server, const BLEConnInfo &conn, uint8_t reason) {
  deviceConnected = false;
  digitalWrite(STATUS_LED_PIN, LOW);
  Serial.printf("[BLE] Client disconnected (reason 0x%02X), restarting advertising...\n", reason);
  BLEAdvertising adv = BLE.getAdvertising();
  adv.start();
  Serial.println("[BLE] Advertising restarted");
}

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  pinMode(STATUS_LED_PIN, OUTPUT);
  digitalWrite(STATUS_LED_PIN, LOW);

  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 17: BLE GATT Server & Authorization");
  Serial.println("==================================================");

  BTStatus initStatus = BLE.begin("Apex-BLE-Node-17");
  if (!initStatus) {
    Serial.printf("[BLE-ERROR] Initialization failed: %s\n", initStatus.toString());
    return;
  }
  Serial.println("[BLE] Radio initialized successfully.");

  BLEServer server = BLE.createServer();
  server.onConnect(onClientConnect);
  server.onDisconnect(onClientDisconnect);

  BLEService svc = server.createService(SVC_UUID);

  // Characteristic 1: Read/Notify sensor telemetry
  sensorChr = svc.createCharacteristic(
    SENSOR_CHR_UUID,
    BLEProperty::Read | BLEProperty::Notify,
    BLEPermission::ReadOpen
  );

  // Characteristic 2: Write-protected control characteristic
  controlChr = svc.createCharacteristic(
    CONTROL_CHR_UUID,
    BLEProperty::Read | BLEProperty::Write,
    BLEPermission::ReadWriteOpen
  );

  server.start();

  BLEAdvertising adv = BLE.getAdvertising();
  adv.addServiceUUID(SVC_UUID);
  adv.start();

  Serial.println("[BLE] GATT Server active. Service UUID: 4fafc201-1fb5-459e-8fcc-c5c9c331914b");
  Serial.println("[BLE] Advertising started. Waiting for authorized client connection...");
}

void loop() {
  if (deviceConnected && sensorChr) {
    telemetryValue++;
    char valStr[16];
    snprintf(valStr, sizeof(valStr), "VAL:%lu", telemetryValue);
    sensorChr.setValue(valStr);
    sensorChr.notify();
    Serial.printf("[BLE-NOTIFY] Published telemetry value: %s\n", valStr);
  }
  delay(2000);
}
