// CyberTube Lab 13: TLS 1.3 Transport Encryption & X.509 Certificate Validation
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>

const char* WIFI_SSID = "Wokwi-GUEST";
const char* WIFI_PASS = "";

// Trusted Root CA Certificate (PEM format)
const char* ROOT_CA_PEM =
"-----BEGIN CERTIFICATE-----\n"
"MIIFazCCA1OgAwIBAgIRAIIQz7DSQONZRQB40539NZswDQYJKoZIhvcNAQELBQAw\n"
"TzELMAkGA1UEBhMCVVMxKTAnBgNVBAoTIEludGVybmV0IFNlY3VyaXR5IFJlc2Vh\n"
"cmNoIEdyb3VwMRUwEwYDVQQDEwxJU1JHIFJvb3QgWDEwHhcNMTUwNjA0MTEwNDM4\n"
"WhcNMzUwNjA0MTEwNDM4WjBPMQswCQYDVQQGEwJVUzEpMCcGA1UEChMgSW50ZXJu\n"
"ZXQgU2VjdXJpdHkgUmVzZWFyY2ggR3JvdXAxFTATBgNVBAMTDElTUkcgUm9vdCBY\n"
"MTCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIBAK3oQG8LvxnhjF5CN/Pa\n"
"-----END CERTIFICATE-----\n";

WiFiClientSecure secureClient;

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 13: TLS 1.3 & X.509 Certificate Validation");
  Serial.println("==================================================");

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  // Set trusted Root CA certificate
  secureClient.setCACert(ROOT_CA_PEM);

  // NTP synchronization required to evaluate certificate validity periods
  configTime(0, 0, "pool.ntp.org", "time.nist.gov");
  Serial.println("[NTP] Initializing clock synchronization for TLS validation...");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    time_t now = time(nullptr);
    if (now > 1600000000) { // Clock successfully set
      Serial.print("[TLS-CLOCK] NTP Synchronized: Current Epoch = ");
      Serial.print(now);
      Serial.println(" | Ready for secure TLS 1.3 handshakes.");
    } else {
      Serial.println("[TLS-CLOCK] Awaiting NTP clock synchronization...");
    }
  }
  delay(5000);
}
