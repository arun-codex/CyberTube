#!/bin/bash
# CyberTube Module 19: UFW Gateway Hardening Script
set -e

echo "[*] Configuring default UFW firewall rules..."
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow hardened SSH port
sudo ufw allow 2222/tcp comment "Hardened SSH"

# Allow local Mosquitto MQTT only from internal IoT subnet
sudo ufw allow from 192.168.1.0/24 to any port 1883 proto tcp comment "Internal MQTT"
sudo ufw allow from 192.168.1.0/24 to any port 8883 proto tcp comment "Internal MQTTS"

echo "[*] Enabling UFW..."
sudo ufw --force enable
sudo ufw status verbose
