// CyberTube IoT Course Diagrams Registry
// Links each module and lesson to its appropriate code-rendered SVG or Three.js interactive diagram.

export type DiagramType = 'architecture' | 'circuit' | '3d-viewer' | 'protocol' | 'forensics' | 'hardware-explorer';

export interface DiagramSpec {
  id: string;
  title: string;
  type: DiagramType;
  description: string;
  relatedModuleOrders: number[];
  componentName: string;
}

export const IOT_DIAGRAMS: DiagramSpec[] = [
  {
    id: 'diag-iot-architecture',
    title: 'End-to-End IoT & Threat Boundary Architecture',
    type: 'architecture',
    description: 'Interactive SVG system diagram showing Sensor, ESP32, Gateway, Mosquitto Broker, Cloud, App, and SOC SIEM with trust boundaries and secure/attack mode toggle.',
    relatedModuleOrders: [1, 7, 8, 9, 10, 16, 17, 18, 26, 29, 30],
    componentName: 'IotArchitectureDiagram',
  },
  {
    id: 'diag-breadboard-circuit',
    title: 'Step-by-Step Breadboard & Discrete Circuit CAD',
    type: 'circuit',
    description: 'Browser-rendered inline SVG breadboard showing verified pinouts for ESP32 DevKit, 220Ω resistor (color bands), 5mm LED, tactile switch, 2N2222 transistor, 1N4007 diode, buzzer, and DHT22.',
    relatedModuleOrders: [2, 4, 5, 6, 10, 11, 24, 30],
    componentName: 'InteractiveCircuitDiagram',
  },
  {
    id: 'diag-3d-esp32-devkit',
    title: 'Rotatable 3D ESP32 DevKit & Assembly CAD',
    type: '3d-viewer',
    description: 'Full Three.js WebGL 3D model of ESP32 DevKit V1 PCB, WROOM-32 RF can, pin headers, exploded view animation, and accessible 2D schematic fallback.',
    relatedModuleOrders: [3, 4, 10, 14, 20, 24, 28, 30],
    componentName: 'Device3DViewer',
  },
  {
    id: 'diag-mqtt-tls-sequence',
    title: 'MQTTS over TLS 1.3 Handshake & Telemetry Flow',
    type: 'protocol',
    description: 'Vector protocol sequence diagram illustrating TCP handshake, TLS 1.3 ClientHello/ServerHello, certificate exchange, MQTT CONNECT, and ACL verification.',
    relatedModuleOrders: [8, 9, 13, 14, 15, 23, 30],
    componentName: 'ProtocolSequenceDiagram',
  },
  {
    id: 'diag-forensic-timeline',
    title: 'IoT Multi-Source Forensic Incident Correlation Timeline',
    type: 'forensics',
    description: 'Interactive timeline correlating Serial UART logs, Wireshark PCAPs, Mosquitto broker events, and gateway firewall alerts with certainty indicators.',
    relatedModuleOrders: [15, 21, 22, 25, 26, 27, 30],
    componentName: 'IoTForensicTimeline',
  },
  {
    id: 'diag-hardware-catalog-explorer',
    title: 'Interactive Electronic Hardware & Component Explorer',
    type: 'hardware-explorer',
    description: 'Searchable component catalog with vector schematic symbols, electrical ratings, 3.3V logic boundaries, pinouts, and datasheet links.',
    relatedModuleOrders: [1, 2, 3, 5, 6, 11, 12, 19, 24, 28, 29, 30],
    componentName: 'HardwareExplorer',
  },
];

export function getDiagramForModule(moduleOrder: number): DiagramSpec {
  const match = IOT_DIAGRAMS.find((d) => d.relatedModuleOrders.includes(moduleOrder));
  return match || IOT_DIAGRAMS[0];
}
