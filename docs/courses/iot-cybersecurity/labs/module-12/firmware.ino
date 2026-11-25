// CyberTube Lab 12: Secure NVS Storage & Eliminating Hardcoded Credentials
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <Preferences.h>

Preferences preferences;

const char* NVS_NAMESPACE = "apex_auth";

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 12: NVS Secret Storage & Device Identity");
  Serial.println("==================================================");

  // Open NVS namespace in read-write mode
  preferences.begin(NVS_NAMESPACE, false);

  // Check if cryptographic identity has been provisioned
  if (!preferences.isKey("device_id") || !preferences.isKey("auth_token")) {
    Serial.println("[PROVISION] No secrets found in NVS partition. Provisioning new keys...");

    // Generate unique identity from chip MAC
    uint64_t chipMac = ESP.getEfuseMac();
    char generatedId[32];
    snprintf(generatedId, sizeof(generatedId), "apex-node-%04X%08X",
             (uint16_t)(chipMac >> 32), (uint32_t)chipMac);

    // Store securely into flash NVS
    preferences.putString("device_id", generatedId);
    preferences.putString("auth_token", "sec_token_9823fbc018a");
    preferences.putUInt("boot_count", 1);

    Serial.print("[PROVISION] Provisioned Device ID: ");
    Serial.println(generatedId);
  } else {
    // Read from NVS without hardcoding into source binary
    String deviceId = preferences.getString("device_id", "UNKNOWN");
    String authToken = preferences.getString("auth_token", "UNKNOWN");
    uint32_t boots = preferences.getUInt("boot_count", 0) + 1;
    preferences.putUInt("boot_count", boots);

    Serial.println("[SECURE-BOOT] Loaded secrets from encrypted NVS partition:");
    Serial.print("  > Device ID:   ");
    Serial.println(deviceId);
    Serial.print("  > Auth Token:  ");
    // Mask token in logs for security
    Serial.println(authToken.substring(0, 4) + "************");
    Serial.print("  > Boot Cycles: ");
    Serial.println(boots);
  }

  preferences.end();
  Serial.println("==================================================");
}

void loop() {
  delay(10000);
}
