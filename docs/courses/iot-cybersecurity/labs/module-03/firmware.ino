// CyberTube Lab 03: ESP32 Architectural Diagnostics & Boot Provenance Baseline
// Target: ESP32 DevKit V1 (ESP-WROOM-32)
// Safety Invariant: Strictly <= 3.3V DC logic bounds. Zero mains AC.

#include <Arduino.h>
#include <esp_system.h>
#include <esp_chip_info.h>

const int HEARTBEAT_PIN = 2; // Onboard diagnostic LED
unsigned long lastHeartbeat = 0;
bool heartbeatState = false;

const char* getResetReasonString(esp_reset_reason_t reason) {
  switch (reason) {
    case ESP_RST_POWERON:  return "Power-on Reset (Cold Boot)";
    case ESP_RST_EXT:      return "External Pin Reset";
    case ESP_RST_SW:       return "Software Reset (esp_restart)";
    case ESP_RST_PANIC:    return "Software Exception / Panic Reset";
    case ESP_RST_INT_WDT:  return "Interrupt Watchdog Reset";
    case ESP_RST_TASK_WDT: return "Task Watchdog Reset";
    case ESP_RST_WDT:      return "Other Watchdog Reset";
    case ESP_RST_DEEPSLEEP:return "Wakeup from Deep Sleep";
    case ESP_RST_BROWNOUT: return "Brownout Reset (Hardware Voltage Dip)";
    case ESP_RST_SDIO:     return "SDIO Reset";
    default:               return "Unknown Reset Cause";
  }
}

void setup() {
  Serial.begin(115200);
  while (!Serial && millis() < 3000);

  pinMode(HEARTBEAT_PIN, OUTPUT);

  // Retrieve hardware runtime registers
  esp_reset_reason_t resetReason = esp_reset_reason();
  uint32_t cpuFreq = getCpuFrequencyMhz();
  uint32_t xtalFreq = getXtalFrequencyMhz();
  uint32_t flashSize = ESP.getFlashChipSize();
  uint32_t flashSpeed = ESP.getFlashChipSpeed();
  uint32_t freeHeap = ESP.getFreeHeap();
  uint8_t chipRev = ESP.getChipRevision();
  esp_chip_info_t chipInfo;
  esp_chip_info(&chipInfo);

  Serial.println();
  Serial.println("==================================================");
  Serial.println("[CYBERTUBE] Lab 03: ESP32 Hardware Provenance Audit");
  Serial.println("==================================================");
  Serial.print("[HARDWARE] Chip Model:        ESP32 (Revision ");
  Serial.print(chipRev);
  Serial.println(")");
  Serial.print("[HARDWARE] CPU Cores:         ");
  Serial.println(chipInfo.cores);
  Serial.print("[HARDWARE] CPU Frequency:     ");
  Serial.print(cpuFreq);
  Serial.println(" MHz");
  Serial.print("[HARDWARE] XTAL Frequency:    ");
  Serial.print(xtalFreq);
  Serial.println(" MHz");
  Serial.print("[HARDWARE] Flash Chip Size:   ");
  Serial.print(flashSize / (1024 * 1024));
  Serial.println(" MB");
  Serial.print("[HARDWARE] Flash Bus Speed:   ");
  Serial.print(flashSpeed / 1000000);
  Serial.println(" MHz");
  Serial.print("[HARDWARE] Initial Free Heap: ");
  Serial.print(freeHeap);
  Serial.println(" bytes");
  Serial.print("[BOOT-SEC] Last Reset Reason: ");
  Serial.print(resetReason);
  Serial.print(" -> ");
  Serial.println(getResetReasonString(resetReason));
  Serial.println("==================================================");
}

void loop() {
  unsigned long now = millis();

  // 1 Hz non-blocking diagnostic heartbeat
  if (now - lastHeartbeat >= 1000) {
    lastHeartbeat = now;
    heartbeatState = !heartbeatState;
    digitalWrite(HEARTBEAT_PIN, heartbeatState ? HIGH : LOW);

    Serial.print("[HEARTBEAT] Uptime=");
    Serial.print(now / 1000);
    Serial.print("s | FreeHeap=");
    Serial.print(ESP.getFreeHeap());
    Serial.print("B | MinFreeHeap=");
    Serial.print(ESP.getMinFreeHeap());
    Serial.println("B | Status=STABLE");
  }
}
