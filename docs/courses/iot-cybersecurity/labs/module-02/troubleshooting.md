# Troubleshooting Guide: Module 02

## 1. Electrical Issues
- **Problem**: Status LED does not illuminate.
  - **Check**: Verify LED polarity (long lead is Anode +, short lead with flat rim is Cathode -).
  - **Check**: Measure voltage between resistor and LED anode; it must be between 1.8V and 2.1V forward drop.
  - **Check**: Confirm ground wire is seated in the ESP32 GND pin, not 3V3.

- **Problem**: Multimeter reads 0.0V on power rail.
  - **Check**: Ensure USB cable provides both power and data (charge-only cables fail).
  - **Check**: Test ESP32 3V3 pin directly to ensure internal LDO regulator is active.

## 2. Serial Communication Issues
- **Problem**: Serial Monitor displays gibberish / inverted characters.
  - **Fix**: Set Serial baud rate to exactly **115200 baud** in Arduino IDE / terminal.
- **Problem**: `A fatal error occurred: Failed to connect to ESP32`.
  - **Fix**: Hold down the **BOOT** button on the ESP32 board during `Connecting......____` prompt.

## 3. Security & Protocol Issues
- **Problem**: MQTT broker connection refused (Return code 5).
  - **Fix**: Ensure username/password match the Mosquitto password file entry configured in the lab.
- **Problem**: Wireshark displays `Check checksum failed`.
  - **Fix**: Disable IP/TCP Checksum Offloading in Wireshark Preferences (normal behavior on loopback/virtual adapters).
