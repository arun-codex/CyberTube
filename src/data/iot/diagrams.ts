// CyberTube IoT Course Diagrams Registry
// Comprehensive 20 Code-Rendered 2D Interactive Diagram Configurations
// Accurately models connections, pin labels, voltages, ground, components, and signal flow.

export type DiagramCategory =
  | 'architecture'
  | 'circuits'
  | 'hardware-pinouts'
  | 'protocols-networking'
  | 'firmware-security';

export interface DiagramPinConnection {
  fromPin: string;
  toPin: string;
  wireColor: string;
  signalType: 'power-3v3' | 'power-5v' | 'ground' | 'gpio-digital' | 'analog' | 'i2c-sda' | 'i2c-scl' | 'spi-bus' | 'uart-bus';
  voltageRating: string;
  description: string;
}

export interface DiagramComponentSpec {
  id: string;
  name: string;
  designator: string;
  partNumber?: string;
  packageType?: string;
  voltageRating?: string;
  operatingCurrent?: string;
  pinout?: string[];
  keyFunction: string;
}

export interface Diagram2DSpec {
  id: string;
  order: number;
  title: string;
  category: DiagramCategory;
  shortDescription: string;
  technicalDescription: string;
  safetyGuidance: string;
  relatedModuleOrders: number[];
  relatedLessonSlugs?: string[];
  components: DiagramComponentSpec[];
  connections: DiagramPinConnection[];
  probes: {
    probePoint: string;
    expectedMeasurement: string;
    tolerance: string;
  }[];
  interactiveModes?: {
    id: string;
    label: string;
    description: string;
  }[];
}

export const IOT_2D_DIAGRAMS: Diagram2DSpec[] = [
  {
    id: 'diag-01-iot-architecture',
    order: 1,
    title: '1. Complete IoT End-to-End Threat Boundary Architecture',
    category: 'architecture',
    shortDescription: 'Full system topology: Sensor Node -> ESP32 -> Gateway -> Mosquitto Broker -> Cloud API -> SOC SIEM.',
    technicalDescription: 'Comprehensive end-to-end connected topology mapping edge sensors, microcontroller logic, local broker namespaces, cloud ingestion pipelines, and defensive telemetry forwarding. Delineates trust boundaries between untrusted physical edge and hardened enterprise perimeter.',
    safetyGuidance: 'Isolate experimental IoT traffic on a dedicated non-routable subnet; never connect unauthenticated test devices directly to corporate or production networks.',
    relatedModuleOrders: [1, 3, 7, 8, 9, 10, 16, 23, 30],
    components: [
      { id: 'c1', name: 'Edge Sensor Array', designator: 'S1', partNumber: 'DHT22 / BME280', keyFunction: 'Physical telemetry acquisition' },
      { id: 'c2', name: 'ESP32 Edge Microcontroller', designator: 'U1', partNumber: 'ESP32-WROOM-32D', voltageRating: '3.3V DC', keyFunction: 'Local processing and TLS telemetry encryption' },
      { id: 'c3', name: 'IoT Access Point / Gateway', designator: 'GW1', partNumber: 'Linux HostAP / OpenWrt', keyFunction: 'Layer 2 isolation and packet forwarding' },
      { id: 'c4', name: 'Mosquitto MQTT Broker', designator: 'BRK1', partNumber: 'Eclipse Mosquitto 2.x', keyFunction: 'Pub/Sub topic message routing with ACLs' },
      { id: 'c5', name: 'Enterprise SIEM / Wazuh', designator: 'SIEM1', partNumber: 'Wazuh 4.x / ELK', keyFunction: 'Security event correlation and anomaly detection' },
    ],
    connections: [
      { fromPin: 'Sensor DATA', toPin: 'ESP32 GPIO 4', wireColor: '#EAB308', signalType: 'gpio-digital', voltageRating: '3.3V', description: 'Single-wire bidirectional sensor data pulse stream' },
      { fromPin: 'ESP32 Wi-Fi Radio', toPin: 'Gateway 2.4GHz WLAN', wireColor: '#3B82F6', signalType: 'gpio-digital', voltageRating: 'RF 2.4GHz', description: 'WPA3/WPA2-PSK isolated Wi-Fi association' },
      { fromPin: 'Gateway Ethernet', toPin: 'Mosquitto Port 8883', wireColor: '#10B981', signalType: 'gpio-digital', voltageRating: 'TCP/IP', description: 'MQTTS encrypted TCP stream with mutual TLS' },
      { fromPin: 'Mosquitto Syslog', toPin: 'SIEM UDP 514', wireColor: '#8B5CF6', signalType: 'gpio-digital', voltageRating: 'Syslog RFC 5424', description: 'Authentication and access log forwarding' },
    ],
    probes: [
      { probePoint: 'ESP32 3V3 Rail', expectedMeasurement: '3.30V DC', tolerance: '+/- 0.05V' },
      { probePoint: 'Mosquitto Port State', expectedMeasurement: 'TCP 8883 Listening (TLS Only)', tolerance: 'Exact' },
    ],
    interactiveModes: [
      { id: 'normal', label: 'Normal Operation', description: 'Authorized telemetry flowing over encrypted TLS 1.3 session.' },
      { id: 'attack', label: 'Attack Vector Simulation', description: 'Attacker attempting rogue topic subscription and cleartext injection.' },
    ],
  },
  {
    id: 'diag-02-smart-home-network',
    order: 2,
    title: '2. Smart-Home Multi-Radio Device Network',
    category: 'architecture',
    shortDescription: 'Multi-radio ecosystem integrating Wi-Fi 802.11, BLE 5.0, and Zigbee/Thread mesh coordinators.',
    technicalDescription: 'Illustrates RF coexistence, physical gateway transceivers, low-power mesh repeating nodes, and edge bridge boundaries separating batteryless Zigbee end-devices from Internet-facing IP networks.',
    safetyGuidance: 'RF testing must adhere to local regulatory EIRP limits and strictly owned laboratory radios.',
    relatedModuleOrders: [7, 10, 11, 12, 17, 23],
    components: [
      { id: 'sh1', name: 'Smart Gateway / Hub', designator: 'HUB1', keyFunction: 'Protocol translation bridge (Zigbee/BLE to IP)' },
      { id: 'sh2', name: 'ESP32 Environmental Node', designator: 'NODE1', voltageRating: '3.3V DC', keyFunction: 'Direct Wi-Fi telemetry client' },
      { id: 'sh3', name: 'BLE Door Lock / Beacon', designator: 'BLE1', voltageRating: '3.0V (CR2032)', keyFunction: 'Low-energy proximity authentication' },
      { id: 'sh4', name: 'Zigbee Smart Plug (Router)', designator: 'ZB1', voltageRating: 'Mains AC + 3.3V Logic', keyFunction: 'Mesh network repeater and power switch' },
    ],
    connections: [
      { fromPin: 'ESP32 Wi-Fi', toPin: 'Home Router WLAN', wireColor: '#3B82F6', signalType: 'gpio-digital', voltageRating: '2.4 GHz', description: '802.11b/g/n 20MHz Wi-Fi connection' },
      { fromPin: 'BLE Peripheral', toPin: 'Hub BLE Radio', wireColor: '#06B6D4', signalType: 'gpio-digital', voltageRating: '2.4 GHz BLE', description: 'GATT service connection with Numeric Comparison' },
      { fromPin: 'Zigbee End-Device', toPin: 'Zigbee Router (ZB1)', wireColor: '#EC4899', signalType: 'gpio-digital', voltageRating: '2.4 GHz 802.15.4', description: 'Mesh link encrypted with 128-bit Network Key' },
    ],
    probes: [
      { probePoint: 'Zigbee Channel', expectedMeasurement: 'Channel 15 (2.425 GHz)', tolerance: 'Exact channel' },
      { probePoint: 'Wi-Fi RSSI', expectedMeasurement: '-45 dBm to -65 dBm', tolerance: '> -75 dBm' },
    ],
  },
  {
    id: 'diag-03-esp32-pinout',
    order: 3,
    title: '3. ESP32 DevKit GPIO Pinout & Multiplexing Architecture',
    category: 'hardware-pinouts',
    shortDescription: 'Complete 30-pin & 38-pin DevKit pinout: strapping pins, ADC1 vs ADC2, UART, SPI, and I2C buses.',
    technicalDescription: 'Hardware pinout diagram illustrating silicon pad assignments on the ESP32-WROOM-32 module. Distinguishes input-only GPIOs (34, 35, 36, 39), ADC1 pads compatible with active Wi-Fi, strapping pins (GPIO 0, 2, 12, 15), and hardware bus defaults.',
    safetyGuidance: 'All ESP32 GPIOs operate strictly at 3.3V logic. Connecting 5V signals directly to any GPIO pin will permanently destroy the internal protection diodes and output stage.',
    relatedModuleOrders: [3, 4, 5, 11, 14, 24],
    components: [
      { id: 'p1', name: 'ESP32-WROOM-32D', designator: 'U1', partNumber: 'ESP32-D0WD-V3', voltageRating: '3.0V - 3.6V (3.3V nominal)', operatingCurrent: '80mA - 240mA peak', keyFunction: 'Dual-Core Xtensa LX6 SoC' },
      { id: 'p2', name: 'AMS1117-3.3 LDO', designator: 'U2', partNumber: 'AMS1117-3.3', voltageRating: 'Vin: 5V (USB), Vout: 3.3V', operatingCurrent: 'Up to 800mA', keyFunction: 'Low-dropout voltage regulator' },
    ],
    connections: [
      { fromPin: 'Micro-USB VBUS', toPin: 'VIN / 5V Header', wireColor: '#EF4444', signalType: 'power-5v', voltageRating: '5.0V DC', description: 'Unregulated USB input power rail' },
      { fromPin: 'AMS1117 Output', toPin: '3V3 Header Pin', wireColor: '#F59E0B', signalType: 'power-3v3', voltageRating: '3.3V DC', description: 'Regulated system power rail for ESP32 and sensors' },
      { fromPin: 'GND Header', toPin: 'Common Ground', wireColor: '#1E293B', signalType: 'ground', voltageRating: '0V Reference', description: 'Common system ground plane' },
      { fromPin: 'GPIO 21', toPin: 'I2C SDA', wireColor: '#3B82F6', signalType: 'i2c-sda', voltageRating: '3.3V Pull-Up', description: 'Default hardware I2C Serial Data' },
      { fromPin: 'GPIO 22', toPin: 'I2C SCL', wireColor: '#10B981', signalType: 'i2c-scl', voltageRating: '3.3V Pull-Up', description: 'Default hardware I2C Serial Clock' },
    ],
    probes: [
      { probePoint: '3V3 Rail to GND', expectedMeasurement: '3.30V DC', tolerance: '+/- 0.05V' },
      { probePoint: 'GPIO 0 Boot State', expectedMeasurement: '3.3V (HIGH for SPI Flash Boot)', tolerance: '+/- 0.1V' },
    ],
  },
  {
    id: 'diag-04-breadboard-connectivity',
    order: 4,
    title: '4. Breadboard Internal Connectivity & Rail Topology',
    category: 'circuits',
    shortDescription: 'Internal spring clips: power distribution rails (+ and -) vs 5-hole terminal rows and center trough.',
    technicalDescription: 'Structural internal schematic of a 400-point / 830-point solderless breadboard. Demonstrates continuous longitudinal metal bus strips for VCC and GND alongside 5-hole lateral terminal columns separated by the 0.3-inch DIP center divider.',
    safetyGuidance: 'Ensure power distribution jumper wires connect left and right bus strips properly when splitting dual-rail circuits.',
    relatedModuleOrders: [2, 4, 6, 10, 13],
    components: [
      { id: 'bb1', name: '400-Point Solderless Breadboard', designator: 'BB1', voltageRating: 'Max 30V DC', operatingCurrent: 'Max 1.5A per strip', keyFunction: 'Prototyping platform with 0.1-inch pitch spring clips' },
    ],
    connections: [
      { fromPin: 'Red Bus Line (+)', toPin: 'Longitudinal Strip', wireColor: '#EF4444', signalType: 'power-3v3', voltageRating: '3.3V DC', description: 'Continuous 50-hole power rail' },
      { fromPin: 'Blue Bus Line (-)', toPin: 'Longitudinal Strip', wireColor: '#1E293B', signalType: 'ground', voltageRating: '0.0V DC', description: 'Continuous 50-hole ground rail' },
      { fromPin: 'Terminal Pin a', toPin: 'Terminal Pin e (Row n)', wireColor: '#64748B', signalType: 'gpio-digital', voltageRating: 'Signal', description: '5-hole connected lateral spring clip' },
    ],
    probes: [
      { probePoint: 'Bus Strip Continuity', expectedMeasurement: '0.00 Ω (Continuous)', tolerance: '< 0.5 Ω' },
      { probePoint: 'Cross-Trough Isolation', expectedMeasurement: 'Open Loop (OL / Megaohms)', tolerance: '> 10 MΩ' },
    ],
  },
  {
    id: 'diag-05-led-resistor',
    order: 5,
    title: '5. LED & Current-Limiting Resistor Circuit',
    category: 'circuits',
    shortDescription: 'Active-high indicator circuit with 220 Ω series resistor enforcing 6 mA forward current from 3.3V GPIO.',
    technicalDescription: 'Fundamental discrete output loop: ESP32 GPIO 2 (3.3V logic) drives a 5mm green or red LED through a 220 Ω current-limiting resistor to Ground. Ohm’s Law calculation: (3.3V - 2.0V V_f) / 220 Ω = 5.9 mA forward current, well within the 12 mA safe pad continuous rating.',
    safetyGuidance: 'Never connect an LED directly between GPIO and GND without a series resistor; doing so induces thermal runaway and burns out the microcontroller silicon pad.',
    relatedModuleOrders: [2, 4, 10, 13],
    components: [
      { id: 'led1', name: '5mm Green LED', designator: 'D1', partNumber: '5mm Diffused', voltageRating: 'V_forward = 2.0V - 2.2V', operatingCurrent: '20mA absolute max, 6mA typical', keyFunction: 'Visual optical state indicator' },
      { id: 'res1', name: '220 Ω Metal Film Resistor', designator: 'R1', partNumber: '1/4W 220R 1%', voltageRating: '250V', keyFunction: 'Current limiter (Red-Red-Brown bands)' },
    ],
    connections: [
      { fromPin: 'ESP32 GPIO 2', toPin: 'Resistor R1 Lead 1', wireColor: '#EAB308', signalType: 'gpio-digital', voltageRating: '0V / 3.3V', description: 'Controlled microcontroller digital output' },
      { fromPin: 'Resistor R1 Lead 2', toPin: 'LED D1 Anode (+)', wireColor: '#10B981', signalType: 'gpio-digital', voltageRating: '2.0V DC', description: 'Current-limited intermediate node' },
      { fromPin: 'LED D1 Cathode (-)', toPin: 'GND Rail', wireColor: '#1E293B', signalType: 'ground', voltageRating: '0.0V DC', description: 'Ground return' },
    ],
    probes: [
      { probePoint: 'Across R1 (when HIGH)', expectedMeasurement: '1.30V DC', tolerance: '+/- 0.1V' },
      { probePoint: 'Across D1 Anode-Cathode', expectedMeasurement: '2.00V DC', tolerance: '+/- 0.15V' },
      { probePoint: 'Current through loop', expectedMeasurement: '5.91 mA', tolerance: '+/- 0.5 mA' },
    ],
  },
  {
    id: 'diag-06-button-input',
    order: 6,
    title: '6. Push-Button Input with 10 kΩ Pull-Down & RC Debounce',
    category: 'circuits',
    shortDescription: 'Tactile switch input with 10 kΩ external pull-down resistor and optional 100 nF hardware debouncing filter.',
    technicalDescription: 'Active-high digital input circuit providing deterministic logic 0 (0.0V) when unpressed and logic 1 (3.3V) when depressed. Prevents high-impedance floating gate conditions and eliminates contact mechanical bounce.',
    safetyGuidance: 'Ensure pull-down resistor connects to GND, not 5V; an accidental short between 5V and a floating pin will exceed maximum silicon ratings.',
    relatedModuleOrders: [2, 4, 10, 13, 14],
    components: [
      { id: 'sw1', name: 'Tactile Push-Button Switch', designator: 'SW1', partNumber: '6x6mm 4-Pin Tactile', voltageRating: '12V DC 50mA', keyFunction: 'Momentary user contact input' },
      { id: 'res2', name: '10 kΩ Pull-Down Resistor', designator: 'R2', partNumber: '1/4W 10K 5%', keyFunction: 'Ground reference pull-down (Brown-Black-Orange)' },
      { id: 'cap1', name: '100 nF Ceramic Capacitor', designator: 'C1', partNumber: '0.1uF 50V 104', keyFunction: 'Hardware low-pass debounce filter (tau = 1 ms)' },
    ],
    connections: [
      { fromPin: '3.3V Rail', toPin: 'Switch SW1 Pin 1', wireColor: '#EF4444', signalType: 'power-3v3', voltageRating: '3.3V DC', description: 'Positive logic pull-up source' },
      { fromPin: 'Switch SW1 Pin 2', toPin: 'ESP32 GPIO 4', wireColor: '#3B82F6', signalType: 'gpio-digital', voltageRating: '0V / 3.3V', description: 'Digital input sense trace' },
      { fromPin: 'Switch SW1 Pin 2', toPin: 'Resistor R2 (10k)', wireColor: '#64748B', signalType: 'ground', voltageRating: '0V (unpressed)', description: 'Pull-down resistor path to ground' },
      { fromPin: 'Resistor R2 other end', toPin: 'GND Rail', wireColor: '#1E293B', signalType: 'ground', voltageRating: '0.0V DC', description: 'Ground bus connection' },
    ],
    probes: [
      { probePoint: 'GPIO 4 (Unpressed)', expectedMeasurement: '0.00V DC (Solid Logic LOW)', tolerance: '< 0.05V' },
      { probePoint: 'GPIO 4 (Pressed)', expectedMeasurement: '3.30V DC (Solid Logic HIGH)', tolerance: '+/- 0.05V' },
    ],
  },
  {
    id: 'diag-07-npn-transistor',
    order: 7,
    title: '7. NPN Bipolar Junction Transistor (2N2222) Switching Circuit',
    category: 'circuits',
    shortDescription: 'Low-side driver switch for high-current loads (buzzers, relays) controlled by 3.3V GPIO through 1 kΩ base resistor.',
    technicalDescription: 'Low-side saturated NPN transistor switch circuit. Demonstrates base current injection: I_b = (3.3V - 0.7V V_be) / 1000 Ω = 2.6 mA. With forced beta = 10, allows up to 26 mA collector load to be driven safely while drawing minimal current from the GPIO pad.',
    safetyGuidance: 'Always connect the transistor Emitter directly to common GND. Never connect loads to the emitter in a high-side configuration without an appropriate PNP/P-channel level shifter.',
    relatedModuleOrders: [2, 6, 10, 13, 24],
    components: [
      { id: 'q1', name: '2N2222 NPN Transistor', designator: 'Q1', partNumber: '2N2222A TO-92', voltageRating: 'V_ceo = 40V', operatingCurrent: 'I_c = 600mA max', keyFunction: 'Low-side electronic power switch' },
      { id: 'rb1', name: '1 kΩ Base Resistor', designator: 'R_B', partNumber: '1/4W 1K 1%', keyFunction: 'Base current limiter (Brown-Black-Red)' },
      { id: 'load1', name: 'Piezo Buzzer (Active 3.3V)', designator: 'BZ1', operatingCurrent: '25mA', keyFunction: 'Acoustic tamper alarm actuator' },
    ],
    connections: [
      { fromPin: 'ESP32 GPIO 25', toPin: 'Base Resistor R_B', wireColor: '#EAB308', signalType: 'gpio-digital', voltageRating: '0V / 3.3V', description: 'Actuator drive control signal' },
      { fromPin: 'Base Resistor other lead', toPin: '2N2222 Base (Pin 2)', wireColor: '#F97316', signalType: 'gpio-digital', voltageRating: '0.7V (when ON)', description: 'Forward-biased base-emitter junction' },
      { fromPin: '2N2222 Emitter (Pin 1)', toPin: 'GND Rail', wireColor: '#1E293B', signalType: 'ground', voltageRating: '0.0V DC', description: 'Common ground return' },
      { fromPin: 'Buzzer Positive (+)', toPin: '3.3V Rail', wireColor: '#EF4444', signalType: 'power-3v3', voltageRating: '3.3V DC', description: 'Load positive power supply' },
      { fromPin: 'Buzzer Negative (-)', toPin: '2N2222 Collector (Pin 3)', wireColor: '#8B5CF6', signalType: 'gpio-digital', voltageRating: 'Switched 0.1V - 3.3V', description: 'Low-side collector switching node' },
    ],
    probes: [
      { probePoint: 'V_be (Base-to-Emitter)', expectedMeasurement: '0.70V DC (Active) / 0.0V (Off)', tolerance: '+/- 0.05V' },
      { probePoint: 'V_ce (Collector Saturation)', expectedMeasurement: '0.08V – 0.20V DC (Saturated)', tolerance: '< 0.25V' },
    ],
  },
  {
    id: 'diag-08-mosfet-switching',
    order: 8,
    title: '8. Logic-Level N-Channel MOSFET Switching Circuit',
    category: 'circuits',
    shortDescription: 'High-current low-side switch using logic-level MOSFET (IRLZ44N) with 100k gate pull-down.',
    technicalDescription: 'Voltage-controlled low-side switch for power actuators (solenoids, DC motors, high-intensity LEDs). Logic-level gate threshold (V_gs(th) = 1.0V - 2.0V) ensures full channel saturation at 3.3V gate drive without drawing static gate current.',
    safetyGuidance: 'A 100 kΩ pull-down resistor on the gate is mandatory to prevent floating gate states from turning the load ON during microcontroller boot or reset.',
    relatedModuleOrders: [6, 10, 13, 24],
    components: [
      { id: 'm1', name: 'IRLZ44N Logic-Level MOSFET', designator: 'Q2', partNumber: 'IRLZ44N TO-220', voltageRating: 'V_ds = 55V', operatingCurrent: 'I_d = 47A max, R_ds(on) = 0.022Ω', keyFunction: 'High-power low-side electronic switch' },
      { id: 'rg1', name: '100 Ω Gate Resistor', designator: 'R_G', keyFunction: 'Suppresses parasitic gate ringing' },
      { id: 'rpd1', name: '100 kΩ Gate Pull-Down', designator: 'R_PD', keyFunction: 'Ensures OFF state during MCU boot' },
    ],
    connections: [
      { fromPin: 'ESP32 GPIO 26', toPin: 'Gate Resistor R_G', wireColor: '#EAB308', signalType: 'gpio-digital', voltageRating: '0V / 3.3V', description: 'MCU gate control signal' },
      { fromPin: 'R_G output', toPin: 'MOSFET Gate (Pin 1)', wireColor: '#F59E0B', signalType: 'gpio-digital', voltageRating: '0V / 3.3V', description: 'MOSFET gate terminal' },
      { fromPin: 'MOSFET Gate (Pin 1)', toPin: '100k Pull-Down to GND', wireColor: '#64748B', signalType: 'ground', voltageRating: '0V DC', description: 'Fail-safe pull-down' },
      { fromPin: 'MOSFET Source (Pin 3)', toPin: 'GND Rail', wireColor: '#1E293B', signalType: 'ground', voltageRating: '0.0V DC', description: 'Common power ground return' },
      { fromPin: 'MOSFET Drain (Pin 2)', toPin: 'Actuator Load (-)', wireColor: '#8B5CF6', signalType: 'gpio-digital', voltageRating: 'Switched Ground', description: 'Switched load terminal' },
    ],
    probes: [
      { probePoint: 'V_gs (Gate-to-Source)', expectedMeasurement: '3.30V DC (Full Conduction)', tolerance: '+/- 0.05V' },
      { probePoint: 'V_ds (Drain-to-Source ON)', expectedMeasurement: '< 0.05V DC', tolerance: '< 0.1V' },
    ],
  },
  {
    id: 'diag-09-flyback-protection',
    order: 9,
    title: '9. Inductive-Load Flyback Protection Diode Circuit',
    category: 'circuits',
    shortDescription: '1N4007 clamping diode in reverse parallel across relay/motor coils dissipating inductive kickback spikes.',
    technicalDescription: 'Demonstrates inductive voltage spike suppression: V = -L * (di/dt). When the switching transistor turns OFF, collapsing magnetic flux produces reverse EMF exceeding hundreds of volts. The 1N4007 flyback diode conducts reverse current back into the positive rail, clamping collector voltage to VCC + 0.7V.',
    safetyGuidance: 'Omitting the flyback diode across inductive loads will immediately destroy the switching transistor or punch through ESP32 silicon boundaries on the first power-off cycle.',
    relatedModuleOrders: [6, 10, 13, 24],
    components: [
      { id: 'd_fly', name: '1N4007 Rectifier Diode', designator: 'D2', partNumber: '1N4007 DO-41', voltageRating: 'V_rrm = 1000V, I_f = 1A', keyFunction: 'Flyback reverse-EMF clamping diode' },
      { id: 'relay1', name: '5V / 3.3V Relay Module Coil', designator: 'K1', operatingCurrent: '70mA coil current', keyFunction: 'Galvanically isolated inductive mechanical relay' },
    ],
    connections: [
      { fromPin: 'Load VCC Rail', toPin: 'Diode D2 Cathode (Silver Ring)', wireColor: '#EF4444', signalType: 'power-5v', voltageRating: '3.3V / 5.0V', description: 'Diode reverse-biased in normal operation' },
      { fromPin: 'Transistor Collector', toPin: 'Diode D2 Anode', wireColor: '#8B5CF6', signalType: 'gpio-digital', voltageRating: 'Clamped to VCC + 0.7V', description: 'Suppression clamp node' },
      { fromPin: 'Relay Coil Pin 1', toPin: 'Diode Cathode', wireColor: '#EF4444', signalType: 'power-3v3', voltageRating: 'VCC Rail', description: 'Coil positive' },
      { fromPin: 'Relay Coil Pin 2', toPin: 'Diode Anode', wireColor: '#8B5CF6', signalType: 'gpio-digital', voltageRating: 'Collector node', description: 'Coil switched negative' },
    ],
    probes: [
      { probePoint: 'Collector Turn-Off Spike', expectedMeasurement: 'Max 4.0V DC (Clamped)', tolerance: '< 5.0V peak' },
      { probePoint: 'Diode Forward Drop', expectedMeasurement: '0.70V DC during discharge', tolerance: '+/- 0.1V' },
    ],
  },
  {
    id: 'diag-10-dht22-sensor',
    order: 10,
    title: '10. DHT22 Digital Temperature & Humidity Sensor Wiring',
    category: 'circuits',
    shortDescription: 'Single-wire bi-directional sensor connection with 4.7 kΩ pull-up resistor to ESP32 GPIO 4.',
    technicalDescription: 'DHT22 (AM2302) single-bus digital communication circuit. Pin 1 connects to 3.3V, Pin 2 to GPIO 4 with a 4.7 kΩ pull-up to 3.3V, Pin 4 to GND (Pin 3 is NC). Uses custom pulse-width modulation protocol sending 40 bits of telemetry with 8-bit checksum.',
    safetyGuidance: 'Ensure sensor is connected to 3.3V. While DHT22 tolerates 5V, doing so pulls the ESP32 GPIO pin to 5V and damages the microcontroller.',
    relatedModuleOrders: [5, 10, 13, 30],
    components: [
      { id: 'dht1', name: 'DHT22 Temperature & Humidity Sensor', designator: 'U3', partNumber: 'AM2302 / DHT22', voltageRating: '3.3V - 5.5V (Use 3.3V)', operatingCurrent: '1.5mA measuring, 40uA standby', keyFunction: 'Capacitive humidity & NTC thermistor module' },
      { id: 'rp1', name: '4.7 kΩ Pull-Up Resistor', designator: 'R_PU', keyFunction: 'Single-bus idle HIGH pull-up (Yellow-Violet-Red)' },
    ],
    connections: [
      { fromPin: '3.3V Rail', toPin: 'DHT22 Pin 1 (VCC)', wireColor: '#EF4444', signalType: 'power-3v3', voltageRating: '3.3V DC', description: 'Sensor power supply' },
      { fromPin: 'ESP32 GPIO 4', toPin: 'DHT22 Pin 2 (DATA)', wireColor: '#EAB308', signalType: 'gpio-digital', voltageRating: '3.3V Logic', description: 'Bi-directional open-drain data signal' },
      { fromPin: '3.3V Rail', toPin: 'Resistor R_PU to DATA', wireColor: '#F59E0B', signalType: 'power-3v3', voltageRating: '3.3V Pull-Up', description: 'Bus idle pull-up' },
      { fromPin: 'DHT22 Pin 4 (GND)', toPin: 'GND Rail', wireColor: '#1E293B', signalType: 'ground', voltageRating: '0.0V DC', description: 'Ground reference' },
    ],
    probes: [
      { probePoint: 'DHT22 Pin 2 Bus Idle', expectedMeasurement: '3.30V DC (HIGH)', tolerance: '+/- 0.05V' },
      { probePoint: 'Start Signal Pulse', expectedMeasurement: 'LOW pulse 1ms - 10ms', tolerance: 'Within specs' },
    ],
  },
  {
    id: 'diag-11-bme280-i2c',
    order: 11,
    title: '11. BME280 Precision Environmental Sensor I2C Wiring',
    category: 'circuits',
    shortDescription: 'I2C multi-drop bus: ESP32 GPIO 21 (SDA) and GPIO 22 (SCL) with hardware pull-ups and address selection.',
    technicalDescription: 'Inter-Integrated Circuit (I2C) 2-wire serial connection to Bosch BME280 sensor measuring temperature, relative humidity, and barometric pressure. Pin connections: VIN to 3.3V, GND to GND, SCL to GPIO 22, SDA to GPIO 21. SDO pin pulled to GND sets address 0x76 (pulled to VCC sets 0x77).',
    safetyGuidance: 'Check breakout board schematic: some boards lack onboard 3.3V regulators. Connecting 5V to an unbuffered 3.3V BME280 chip will destroy the sensor.',
    relatedModuleOrders: [5, 10, 11, 13, 30],
    components: [
      { id: 'bme1', name: 'BME280 Environmental Sensor Breakout', designator: 'U4', partNumber: 'Bosch BME280', voltageRating: '1.71V - 3.6V (3.3V nominal)', operatingCurrent: '3.6uA @ 1Hz humidity/temp', keyFunction: 'Pressure, temperature and humidity I2C sensor' },
    ],
    connections: [
      { fromPin: '3.3V Rail', toPin: 'BME280 VIN', wireColor: '#EF4444', signalType: 'power-3v3', voltageRating: '3.3V DC', description: 'Sensor power rail' },
      { fromPin: 'GND Rail', toPin: 'BME280 GND', wireColor: '#1E293B', signalType: 'ground', voltageRating: '0.0V DC', description: 'Ground reference' },
      { fromPin: 'ESP32 GPIO 22 (SCL)', toPin: 'BME280 SCL', wireColor: '#10B981', signalType: 'i2c-scl', voltageRating: '3.3V Clock', description: 'I2C Serial Clock (up to 400 kHz Fast Mode)' },
      { fromPin: 'ESP32 GPIO 21 (SDA)', toPin: 'BME280 SDA', wireColor: '#3B82F6', signalType: 'i2c-sda', voltageRating: '3.3V Data', description: 'I2C Serial Data bidirectional line' },
      { fromPin: 'GND Rail', toPin: 'BME280 SDO', wireColor: '#1E293B', signalType: 'ground', voltageRating: '0.0V', description: 'Selects I2C 7-bit Slave Address 0x76' },
    ],
    probes: [
      { probePoint: 'I2C Bus Idle Voltages', expectedMeasurement: 'SDA: 3.3V, SCL: 3.3V', tolerance: '+/- 0.05V' },
      { probePoint: 'I2C Address Response', expectedMeasurement: 'ACK on 0x76', tolerance: 'Exact' },
    ],
  },
  {
    id: 'diag-12-uart-comm',
    order: 12,
    title: '12. UART Asynchronous Serial Interface & Level Shifting',
    category: 'protocols-networking',
    shortDescription: 'Full-duplex serial link: crossed TX/RX lines, baud rate synchronization, and 3.3V logic level enforcement.',
    technicalDescription: 'Universal Asynchronous Receiver-Transmitter (UART) communication between ESP32 UART0/UART2 and a host USB-to-UART bridge (CP2102/FT232R). Connects ESP32 TX (GPIO 1 / 17) to Adapter RX, and ESP32 RX (GPIO 3 / 16) to Adapter TX, with common ground reference.',
    safetyGuidance: 'Ensure USB-UART adapter jumper is set to 3.3V mode. Applying RS-232 (+/-12V) or 5V TTL serial directly to ESP32 RX will immediately burn out the internal input buffer.',
    relatedModuleOrders: [3, 11, 14, 24],
    components: [
      { id: 'u1', name: 'ESP32 UART Controller', designator: 'U1_UART', keyFunction: 'Hardware serial transceiver with FIFO buffers' },
      { id: 'ft1', name: 'USB-to-UART Serial Adapter', designator: 'FT1', partNumber: 'CP2102 / FT232RL', voltageRating: '3.3V Logic Mode', keyFunction: 'Virtual COM port bridge for PC Serial Monitor' },
    ],
    connections: [
      { fromPin: 'ESP32 TXD (GPIO 1)', toPin: 'Adapter RXD', wireColor: '#3B82F6', signalType: 'uart-bus', voltageRating: '3.3V Logic', description: 'Microcontroller outbound serial data' },
      { fromPin: 'Adapter TXD', toPin: 'ESP32 RXD (GPIO 3)', wireColor: '#EAB308', signalType: 'uart-bus', voltageRating: '3.3V Logic', description: 'Host inbound serial data' },
      { fromPin: 'ESP32 GND', toPin: 'Adapter GND', wireColor: '#1E293B', signalType: 'ground', voltageRating: '0.0V Reference', description: 'Essential common ground reference' },
    ],
    probes: [
      { probePoint: 'UART TX Idle State', expectedMeasurement: '3.30V DC (Mark state / HIGH)', tolerance: '+/- 0.1V' },
      { probePoint: 'Baud Rate Timing', expectedMeasurement: '115200 Baud (8.68 us per bit)', tolerance: '+/- 2%' },
    ],
  },
  {
    id: 'diag-13-spi-comm',
    order: 13,
    title: '13. High-Speed 4-Wire SPI Bus Interface',
    category: 'protocols-networking',
    shortDescription: 'Serial Peripheral Interface: MOSI, MISO, SCK, and active-low CS/SS lines for flash memory and OLED displays.',
    technicalDescription: 'High-speed synchronous serial bus architecture. Connects ESP32 VSPI/HSPI hardware controller to slave peripherals (W25Q64 SPI flash or SSD1306 OLED): MOSI (GPIO 23), MISO (GPIO 19), SCK (GPIO 18), and CS (GPIO 5). Clock speeds up to 80 MHz.',
    safetyGuidance: 'Keep high-speed SPI jumper wires under 10 cm to prevent signal distortion, clock overshoot, and cross-talk.',
    relatedModuleOrders: [11, 14, 15, 20],
    components: [
      { id: 'spi_m', name: 'ESP32 SPI Master', designator: 'U1_SPI', keyFunction: 'Hardware SPI bus master' },
      { id: 'spi_s', name: 'SPI Flash Memory / OLED', designator: 'SLAVE1', partNumber: 'W25Q32 / SSD1306', voltageRating: '3.3V DC', keyFunction: 'Synchronous slave peripheral' },
    ],
    connections: [
      { fromPin: 'ESP32 MOSI (GPIO 23)', toPin: 'Slave SDI / MOSI', wireColor: '#3B82F6', signalType: 'spi-bus', voltageRating: '3.3V Clocked', description: 'Master Out Slave In data trace' },
      { fromPin: 'Slave SDO / MISO', toPin: 'ESP32 MISO (GPIO 19)', wireColor: '#10B981', signalType: 'spi-bus', voltageRating: '3.3V Clocked', description: 'Master In Slave Out data trace' },
      { fromPin: 'ESP32 SCK (GPIO 18)', toPin: 'Slave SCLK', wireColor: '#EAB308', signalType: 'spi-bus', voltageRating: '3.3V Clock', description: 'Synchronous Serial Clock' },
      { fromPin: 'ESP32 CS (GPIO 5)', toPin: 'Slave CS#', wireColor: '#EC4899', signalType: 'spi-bus', voltageRating: 'Active LOW', description: 'Chip Select peripheral enable' },
    ],
    probes: [
      { probePoint: 'CS# Unasserted', expectedMeasurement: '3.30V DC (HIGH / Inactive)', tolerance: '+/- 0.05V' },
      { probePoint: 'SCK Waveform', expectedMeasurement: 'Square Wave (0V - 3.3V)', tolerance: '< 5% ringing' },
    ],
  },
  {
    id: 'diag-14-mqtt-pubsub',
    order: 14,
    title: '14. MQTT Publisher–Broker–Subscriber Architecture & Topic ACLs',
    category: 'protocols-networking',
    shortDescription: 'Pub/Sub message topology: publishing sensor telemetry, broker topic routing, and subscriber event queues.',
    technicalDescription: 'Decoupled Publish/Subscribe messaging architecture over TCP port 1883/8883. Highlights topic hierarchy (e.g. `sensors/room1/temperature`), QoS 0/1/2 delivery semantics, persistent sessions, retain flags, and Mosquitto ACL authorization boundaries.',
    safetyGuidance: 'Never run MQTT brokers with anonymous access enabled in production. Always configure username/password files and explicit topic-level ACLs.',
    relatedModuleOrders: [8, 9, 13, 14, 25, 27, 30],
    components: [
      { id: 'pub1', name: 'ESP32 Sensor Publisher', designator: 'PUB1', keyFunction: 'Publishes periodic JSON telemetry' },
      { id: 'brk1', name: 'Mosquitto MQTT Broker', designator: 'BROKER', keyFunction: 'Topic matching, ACL enforcement and packet distribution' },
      { id: 'sub1', name: 'Node-RED / Dashboard Subscriber', designator: 'SUB1', keyFunction: 'Subscribes to sensor telemetry topic' },
      { id: 'sub2', name: 'SOC SIEM Threat Monitor', designator: 'SOC_SUB', keyFunction: 'Audits anomalous topic publishes and connect events' },
    ],
    connections: [
      { fromPin: 'ESP32 MQTT Client', toPin: 'Broker Topic Ingestion', wireColor: '#3B82F6', signalType: 'gpio-digital', voltageRating: 'TCP Port 8883', description: 'PUBLISH sensors/room1/telemetry (QoS 1)' },
      { fromPin: 'Broker Router', toPin: 'Dashboard Client', wireColor: '#10B981', signalType: 'gpio-digital', voltageRating: 'TCP Port 8883', description: 'FORWARD payload to authorized subscribers' },
      { fromPin: 'Broker Audit Hook', toPin: 'SIEM Log Ingestion', wireColor: '#8B5CF6', signalType: 'gpio-digital', voltageRating: 'Syslog / TCP', description: 'Publish audit event log stream' },
    ],
    probes: [
      { probePoint: 'Broker Connect Auth', expectedMeasurement: 'CONNACK Return Code 0 (Accepted)', tolerance: 'Exact' },
      { probePoint: 'Unauthorized Topic Access', expectedMeasurement: 'DISCONNECT / SubAck 0x80 (Failure)', tolerance: 'Exact' },
    ],
  },
  {
    id: 'diag-15-tls-connection',
    order: 15,
    title: '15. Embedded TLS 1.3 Handshake & Certificate Validation Flow',
    category: 'protocols-networking',
    shortDescription: 'Cryptographic handshake sequence: ClientHello, ServerHello, X.509 Certificate verification, and AES-GCM session.',
    technicalDescription: 'Complete step-by-step cryptographic sequence diagram showing TLS 1.3 handshake between an ESP32 embedded client and a hardened Mosquitto broker: Supported CipherSuites negotiation, Diffie-Hellman Ephemeral key exchange, Root CA certificate validation, and encrypted payload session.',
    safetyGuidance: 'Ensure client clock is synchronized via NTP; expired or pre-dated X.509 certificates will fail verification during the handshake.',
    relatedModuleOrders: [8, 9, 13, 22, 30],
    components: [
      { id: 'tls_cli', name: 'ESP32 mbedTLS Client', designator: 'CLIENT', keyFunction: 'Cryptographic client library with embedded Root CA' },
      { id: 'tls_srv', name: 'Mosquitto TLS Listener', designator: 'SERVER', keyFunction: 'Server with private key and signed certificate' },
    ],
    connections: [
      { fromPin: 'Client Step 1', toPin: 'Server Step 1', wireColor: '#3B82F6', signalType: 'gpio-digital', voltageRating: 'TCP', description: 'ClientHello: TLS 1.3, Random, CipherSuites (TLS_AES_128_GCM_SHA256)' },
      { fromPin: 'Server Step 2', toPin: 'Client Step 2', wireColor: '#10B981', signalType: 'gpio-digital', voltageRating: 'TCP', description: 'ServerHello, KeyShare, EncryptedExtensions, Certificate, Finished' },
      { fromPin: 'Client Step 3', toPin: 'Local Flash NVS', wireColor: '#F59E0B', signalType: 'gpio-digital', voltageRating: 'Internal', description: 'Validates server certificate chain against embedded trusted Root CA' },
      { fromPin: 'Client Step 4', toPin: 'Server Step 4', wireColor: '#8B5CF6', signalType: 'gpio-digital', voltageRating: 'TCP (Encrypted)', description: 'Client Finished -> Bi-directional symmetric AES-GCM session active' },
    ],
    probes: [
      { probePoint: 'TLS Version Negotiated', expectedMeasurement: 'TLS 1.3 (0x0304)', tolerance: 'Exact' },
      { probePoint: 'Certificate Validity', expectedMeasurement: 'Status: OK (Signed by Trusted Lab Root CA)', tolerance: 'Exact' },
    ],
  },
  {
    id: 'diag-16-firmware-partitions',
    order: 16,
    title: '16. Secure Boot & Flash Memory Partition Table Layout',
    category: 'firmware-security',
    shortDescription: '4MB / 16MB SPI flash memory map: Bootloader, Partition Table, NVS, OTA Data, App0, App1, and SPIFFS.',
    technicalDescription: 'Memory map visualization of ESP32 SPI NOR flash memory. Details boot stages from Boot ROM (0x40000000) to 2nd stage bootloader (0x1000), partition table (0x8000), non-volatile storage (0x9000), dual OTA application partitions (0x10000 and 0x110000), and encrypted secret regions.',
    safetyGuidance: 'Burning eFuses for Secure Boot and Flash Encryption is irreversible. Ensure keys and configurations are verified in software simulation first.',
    relatedModuleOrders: [3, 14, 15, 17, 21, 22],
    components: [
      { id: 'fl1', name: 'SPI NOR Flash Chip', designator: 'FLASH', partNumber: 'W25Q32 (4MB / 32Mbit)', keyFunction: 'Persistent code and data storage' },
    ],
    connections: [
      { fromPin: '0x00001000', toPin: '0x00007FFF', wireColor: '#EF4444', signalType: 'gpio-digital', voltageRating: 'Flash Map', description: '2nd Stage Bootloader Partition (28KB)' },
      { fromPin: '0x00008000', toPin: '0x00008FFF', wireColor: '#F59E0B', signalType: 'gpio-digital', voltageRating: 'Flash Map', description: 'Partition Table Partition (4KB)' },
      { fromPin: '0x00009000', toPin: '0x0000EFFF', wireColor: '#EAB308', signalType: 'gpio-digital', voltageRating: 'Flash Map', description: 'NVS Storage Partition (Encrypted, 24KB)' },
      { fromPin: '0x00010000', toPin: '0x0010FFFF', wireColor: '#10B981', signalType: 'gpio-digital', voltageRating: 'Flash Map', description: 'ota_0 Factory / Primary Firmware Slot (1MB)' },
      { fromPin: '0x00110000', toPin: '0x0020FFFF', wireColor: '#3B82F6', signalType: 'gpio-digital', voltageRating: 'Flash Map', description: 'ota_1 Secondary Over-the-Air Update Slot (1MB)' },
      { fromPin: '0x00210000', toPin: '0x003FFFFF', wireColor: '#8B5CF6', signalType: 'gpio-digital', voltageRating: 'Flash Map', description: 'SPIFFS / LittleFS User Filesystem Partition (1.9MB)' },
    ],
    probes: [
      { probePoint: 'Bootloader Checksum', expectedMeasurement: 'SHA-256 Validated against eFuse Key', tolerance: 'Exact match' },
      { probePoint: 'NVS Encryption Status', expectedMeasurement: 'XTS-AES-256 Active', tolerance: 'Exact' },
    ],
  },
  {
    id: 'diag-17-ota-lifecycle',
    order: 17,
    title: '17. Safe Over-The-Air (OTA) Firmware Update Lifecycle',
    category: 'firmware-security',
    shortDescription: 'Dual-partition update flow: download, digital signature verification, flash write to inactive slot, and rollback.',
    technicalDescription: 'Finite State Machine diagram of a secure embedded OTA update. Shows staging of new binary in passive partition slot, RSA-3072 signature validation before reboot, bootloader trial execution, and automatic watchdog rollback to previous version if boot fails.',
    safetyGuidance: 'Never apply single-partition OTA updates; power loss or corrupt images will permanently brick remote field devices.',
    relatedModuleOrders: [14, 21, 29, 30],
    components: [
      { id: 'ota_fsm', name: 'ESP-IDF OTA State Machine', designator: 'OTA_CTRL', keyFunction: 'Manages partition switching and boot verification' },
    ],
    connections: [
      { fromPin: 'State 1: IDLE', toPin: 'State 2: CHECKING', wireColor: '#64748B', signalType: 'gpio-digital', voltageRating: 'FSM', description: 'Queries HTTPS server for new version manifest' },
      { fromPin: 'State 2: CHECKING', toPin: 'State 3: DOWNLOADING', wireColor: '#3B82F6', signalType: 'gpio-digital', voltageRating: 'FSM', description: 'Streams binary chunks into inactive partition slot (ota_1)' },
      { fromPin: 'State 3: DOWNLOADING', toPin: 'State 4: VERIFYING', wireColor: '#F59E0B', signalType: 'gpio-digital', voltageRating: 'FSM', description: 'Computes SHA-256 and validates RSA-3072 signature' },
      { fromPin: 'State 4: VERIFYING', toPin: 'State 5: BOOT_TEST', wireColor: '#10B981', signalType: 'gpio-digital', voltageRating: 'FSM', description: 'Sets otadata boot flag and executes controlled reboot' },
      { fromPin: 'State 5: BOOT_TEST', toPin: 'State 6: ROLLBACK', wireColor: '#EF4444', signalType: 'gpio-digital', voltageRating: 'FSM', description: 'Reverts to ota_0 if self-test fails or watchdog expires' },
    ],
    probes: [
      { probePoint: 'Signature Verification Result', expectedMeasurement: 'ESP_OK (0)', tolerance: 'Exact' },
      { probePoint: 'Rollback Timer', expectedMeasurement: '30 seconds self-test window', tolerance: '+/- 2s' },
    ],
  },
  {
    id: 'diag-18-network-segmentation',
    order: 18,
    title: '18. IoT Network Segmentation, VLANs & Gateway Firewall',
    category: 'architecture',
    shortDescription: 'Defensive network isolation: VLAN 10 (Corporate), VLAN 20 (IoT Devices), and stateful firewall rules.',
    technicalDescription: 'Network segmentation topology separating untrusted smart devices from critical enterprise resources. Implements 802.1Q tagged VLANs: VLAN 20 (192.168.20.0/24) for IoT devices, with firewall rules blocking cross-VLAN traffic and permitting only outbound TLS on port 8883.',
    safetyGuidance: 'Verify client isolation is enabled on the Wi-Fi AP to prevent compromised IoT devices from attacking neighboring nodes on the same radio subnet.',
    relatedModuleOrders: [6, 7, 10, 18, 23, 24],
    components: [
      { id: 'sw_vlan', name: 'Managed L2/L3 Switch', designator: 'SW1', keyFunction: '802.1Q VLAN separation and port isolation' },
      { id: 'fw_gw', name: 'Stateful Linux Firewall / Router', designator: 'FW1', keyFunction: 'nftables / iptables inter-VLAN access control' },
    ],
    connections: [
      { fromPin: 'IoT AP Radio', toPin: 'Switch Port 2 (VLAN 20)', wireColor: '#EAB308', signalType: 'gpio-digital', voltageRating: 'VLAN 20', description: 'Isolated IoT device network (192.168.20.0/24)' },
      { fromPin: 'Corporate PC', toPin: 'Switch Port 1 (VLAN 10)', wireColor: '#3B82F6', signalType: 'gpio-digital', voltageRating: 'VLAN 10', description: 'Corporate LAN subnet (192.168.10.0/24)' },
      { fromPin: 'Switch Trunk Port', toPin: 'Firewall Router Interface', wireColor: '#10B981', signalType: 'gpio-digital', voltageRating: '802.1Q Trunk', description: 'Tagged multi-VLAN trunk' },
    ],
    probes: [
      { probePoint: 'IoT to Corporate Ping', expectedMeasurement: 'Packet Dropped / ICMP Host Unreachable', tolerance: '100% Drop' },
      { probePoint: 'IoT Outbound Port 8883', expectedMeasurement: 'SYN-ACK Received (Allowed)', tolerance: 'Allowed' },
    ],
  },
  {
    id: 'diag-19-iiot-purdue',
    order: 19,
    title: '19. Industrial IoT & ICS/SCADA Purdue Security Model',
    category: 'architecture',
    shortDescription: 'Layered industrial defense: Level 0 (Sensors/Actuators) through Level 4 (Enterprise) with Industrial DMZ.',
    technicalDescription: 'Purdue Enterprise Reference Architecture (PERA) mapping industrial IoT telemetry: Level 0 (Physical Process & Actuators), Level 1 (PLCs & RTUs), Level 2 (Area Control & SCADA HMI), Level 3 (Site Operations), and Level 3.5 (Industrial DMZ with unauthenticated Modbus filtering).',
    safetyGuidance: 'Never test active scanning, fuzzing, or penetration tools against operational Level 1/Level 2 industrial control equipment; unexpected packets can trigger safety shutdowns.',
    relatedModuleOrders: [28, 29, 30],
    components: [
      { id: 'plc1', name: 'Field PLC / RTU', designator: 'PLC1', keyFunction: 'Level 1 real-time deterministic process control' },
      { id: 'hmi1', name: 'SCADA HMI Supervisory Station', designator: 'HMI1', keyFunction: 'Level 2 supervisory monitoring and alarm display' },
      { id: 'idmz1', name: 'Industrial DMZ Gateway', designator: 'IDMZ_PROXY', keyFunction: 'Level 3.5 protocol-break proxy and data historian' },
    ],
    connections: [
      { fromPin: 'Level 0 Sensor', toPin: 'Level 1 PLC Input', wireColor: '#EF4444', signalType: 'analog', voltageRating: '4-20 mA Loop', description: 'Hardwired analog sensor signal' },
      { fromPin: 'Level 1 PLC', toPin: 'Level 2 HMI Switch', wireColor: '#EAB308', signalType: 'gpio-digital', voltageRating: 'Modbus/TCP', description: 'Unauthenticated Modbus/TCP polling (Port 502)' },
      { fromPin: 'Level 2 HMI', toPin: 'Level 3.5 Historian', wireColor: '#10B981', signalType: 'gpio-digital', voltageRating: 'OPC-UA Secure', description: 'Encrypted OPC-UA telemetry across DMZ firewall' },
    ],
    probes: [
      { probePoint: 'Modbus Port 502 at DMZ', expectedMeasurement: 'Blocked by Firewall', tolerance: 'Exact' },
      { probePoint: 'OPC-UA Channel Encryption', expectedMeasurement: 'SignAndEncrypt (Basic256Sha256)', tolerance: 'Exact' },
    ],
  },
  {
    id: 'diag-20-capstone-architecture',
    order: 20,
    title: '20. Complete Secure Smart-Room IoT Capstone Architecture',
    category: 'architecture',
    shortDescription: 'Final portfolio blueprint: ESP32 sensor node, encrypted mTLS telemetry, local dashboard, and SOC detection.',
    technicalDescription: 'Comprehensive end-to-end architecture of the Portfolio Capstone Project. Combines all 30 modules: 3.3V breadboard electronics, ESP32 secure boot and encrypted NVS, mutual TLS Mosquitto broker, Node-RED operator dashboard, and Wazuh SOC detection pipeline with automated alerting.',
    safetyGuidance: 'Adhere to all electrical safety limits (<=3.3V DC logic), sanitize private tokens from reports, and maintain verifiable evidence chain.',
    relatedModuleOrders: [10, 15, 20, 25, 27, 30],
    components: [
      { id: 'cap_node', name: 'Hardened Smart-Room Node', designator: 'NODE_CAP', voltageRating: '3.3V DC', keyFunction: 'ESP32 with DHT22, LED, buzzer, and encrypted NVS' },
      { id: 'cap_brk', name: 'Mutual TLS Mosquitto Broker', designator: 'BRK_CAP', keyFunction: 'Brokers encrypted telemetry with strict topic ACLs' },
      { id: 'cap_dash', name: 'Local Operator Dashboard', designator: 'DASH_CAP', keyFunction: 'Displays live environmental status and alarm controls' },
      { id: 'cap_siem', name: 'Wazuh SOC Monitoring Server', designator: 'SOC_CAP', keyFunction: 'Detects unauthorized topic subscriptions and brute force' },
    ],
    connections: [
      { fromPin: 'Hardened ESP32 Node', toPin: 'Mosquitto mTLS Port 8883', wireColor: '#10B981', signalType: 'gpio-digital', voltageRating: 'MQTTS TLS 1.3', description: 'Encrypted publish: sensors/smartroom/telemetry' },
      { fromPin: 'Mosquitto Broker', toPin: 'Operator Dashboard', wireColor: '#3B82F6', signalType: 'gpio-digital', voltageRating: 'MQTTS TLS 1.3', description: 'Authorized telemetry display' },
      { fromPin: 'Mosquitto Broker Event Log', toPin: 'Wazuh SIEM Agent', wireColor: '#8B5CF6', signalType: 'gpio-digital', voltageRating: 'Syslog RFC 5424', description: 'Log ingestion for Sigma rule analysis' },
    ],
    probes: [
      { probePoint: 'End-to-End Latency', expectedMeasurement: '< 150 ms (Sensor to Dashboard)', tolerance: '< 250 ms' },
      { probePoint: 'SOC Alert Trigger Time', expectedMeasurement: '< 5 seconds upon anomalous publish', tolerance: '< 10s' },
    ],
  },
];

export function getDiagramForModule(moduleOrder: number): Diagram2DSpec {
  const match = IOT_2D_DIAGRAMS.find((d) => d.relatedModuleOrders.includes(moduleOrder));
  return match || IOT_2D_DIAGRAMS[0];
}

export function getDiagramById(id: string): Diagram2DSpec | undefined {
  return IOT_2D_DIAGRAMS.find((d) => d.id === id);
}

// Backward-compatible alias
export const IOT_DIAGRAMS = IOT_2D_DIAGRAMS;
