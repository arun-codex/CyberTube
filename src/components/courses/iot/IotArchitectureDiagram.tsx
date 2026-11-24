'use client';

import React, { useState } from 'react';
import { Shield, ShieldAlert, Cpu, Radio, Server, Cloud, Smartphone, Eye, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

export interface ArchitectureNode {
  id: string;
  name: string;
  category: 'sensor' | 'controller' | 'actuator' | 'gateway' | 'broker' | 'cloud' | 'app' | 'soc';
  x: number;
  y: number;
  protocols: string[];
  ports: string[];
  trustLevel: 'untrusted' | 'device-local' | 'trusted-lan' | 'cloud-dmz' | 'soc-secure';
  threatVectors: string[];
  defenses: string[];
  description: string;
}

const NODES: ArchitectureNode[] = [
  {
    id: 'sensor-node',
    name: 'DHT22 / BME280 Sensor',
    category: 'sensor',
    x: 60,
    y: 120,
    protocols: ['Single-Wire / I2C (3.3V)'],
    ports: ['GPIO 4 / GPIO 21 (SDA)'],
    trustLevel: 'untrusted',
    threatVectors: ['Physical pin spoofing', 'Fault injection', 'Out-of-range sensor manipulation'],
    defenses: ['Software range bounds check', 'Sensor sanity check (di/dt limit)', 'Hardware pull-up resistor'],
    description: 'Analog/digital environmental transducer measuring ambient conditions.',
  },
  {
    id: 'esp32-controller',
    name: 'ESP32 Edge Device',
    category: 'controller',
    x: 230,
    y: 120,
    protocols: ['Wi-Fi 802.11 b/g/n', 'MQTT / MQTTS', 'TLS 1.2/1.3'],
    ports: ['Outbound TCP 8883 / 1883', 'Local HTTP 80 (disabled)'],
    trustLevel: 'device-local',
    threatVectors: ['Hardcoded credentials in flash', 'Cleartext Wi-Fi PSK leak', 'Insecure boot / unauthorized OTA', 'UART debug console access'],
    defenses: ['ESP32 Flash Encryption', 'Hardware Secure Boot', 'TLS certificate verification', 'NVS encrypted secret storage'],
    description: 'Microcontroller executing firmware, reading sensors, and publishing encrypted telemetry.',
  },
  {
    id: 'actuator-buzzer',
    name: 'Alarm Actuator (Buzzer/LED)',
    category: 'actuator',
    x: 230,
    y: 280,
    protocols: ['GPIO Low-Side Switch (3.3V)'],
    ports: ['GPIO 2 / 2N2222 Driver'],
    trustLevel: 'device-local',
    threatVectors: ['Unauthorized actuation', 'Actuator exhaustion / spamming', 'Unsafe inductive spike without diode'],
    defenses: ['Watchdog timer timeout', '1N4007 flyback protection diode', 'Fail-safe state on crash'],
    description: 'Physical alert indicator driven via an isolated 2N2222 transistor stage.',
  },
  {
    id: 'iot-gateway',
    name: 'IoT Gateway (Router / RPi)',
    category: 'gateway',
    x: 430,
    y: 120,
    protocols: ['WPA2/WPA3 Enterprise', 'IPv4 / DHCP / DNS', 'iptables'],
    ports: ['UDP 53 (DNS)', 'UDP 67 (DHCP)', 'TCP 8883 forwarded'],
    trustLevel: 'trusted-lan',
    threatVectors: ['VLAN hopping', 'Weak default router admin password', 'DNS spoofing / ARP poisoning', 'Cleartext packet interception'],
    defenses: ['Isolated IoT VLAN / subnet', 'Port isolation / client isolation', 'Strict outbound firewall whitelist', 'WPA3 encryption'],
    description: 'Network boundary routing IoT traffic, isolating devices from home workstation subnets.',
  },
  {
    id: 'mqtt-broker',
    name: 'Mosquitto MQTT Broker',
    category: 'broker',
    x: 630,
    y: 120,
    protocols: ['MQTT over TLS 1.3', 'Topic ACLs'],
    ports: ['TCP 8883 (MQTTS TLS)', 'TCP 1883 (Blocked)'],
    trustLevel: 'trusted-lan',
    threatVectors: ['Anonymous connections', 'Wildcard subscription (#) snooping', 'Unauthorized topic injection', 'DoS message flooding'],
    defenses: ['allow_anonymous false', 'Per-client username + password', 'Granular topic ACLs', 'Mutual TLS (mTLS) client certs'],
    description: 'Central publish/subscribe messaging hub dispatching sensor telemetry to subscribers.',
  },
  {
    id: 'cloud-backend',
    name: 'Cloud Telemetry & API',
    category: 'cloud',
    x: 820,
    y: 120,
    protocols: ['HTTPS REST', 'WebSockets', 'OAuth 2.0 / JWT'],
    ports: ['TCP 443 (HTTPS)'],
    trustLevel: 'cloud-dmz',
    threatVectors: ['API key exposure', 'Insecure direct object reference (IDOR)', 'Unauthenticated telemetry endpoint'],
    defenses: ['Rotating API bearer tokens', 'TLS with HSTS', 'Database input sanitization', 'Audit access logging'],
    description: 'Remote cloud service storing historical sensor readings and hosting user dashboards.',
  },
  {
    id: 'mobile-app',
    name: 'Learner Dashboard / App',
    category: 'app',
    x: 820,
    y: 280,
    protocols: ['HTTPS', 'WSS'],
    ports: ['Client outbound 443'],
    trustLevel: 'untrusted',
    threatVectors: ['Session hijacking', 'Cached tokens on device', 'Man-in-the-Middle on public Wi-Fi'],
    defenses: ['Certificate pinning', 'Short-lived access tokens', 'MFA for control actions'],
    description: 'User-facing monitoring interface displaying real-time metrics and device status.',
  },
  {
    id: 'soc-analyst',
    name: 'IoT SOC SIEM & Analyst',
    category: 'soc',
    x: 630,
    y: 280,
    protocols: ['Syslog TLS', 'Suricata / Zeek Alerts', 'PCAP'],
    ports: ['TCP 514 (Syslog)', 'TCP 9200 (Elastic)'],
    trustLevel: 'soc-secure',
    threatVectors: ['Alert fatigue', 'Log tampering', 'Blind spots on encrypted channels without flow analysis'],
    defenses: ['Immutable append-only logs', 'Automated anomaly detection rules', 'Network flow & packet size baseline'],
    description: 'Security Operations Center platform detecting unauthorized topics and traffic surges.',
  },
];

export const IotArchitectureDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(NODES[1]); // Default to ESP32
  const [isSecureMode, setIsSecureMode] = useState<boolean>(true);
  const [animatingPacket, setAnimatingPacket] = useState<boolean>(true);

  const getNodeIcon = (category: ArchitectureNode['category']) => {
    switch (category) {
      case 'sensor':
        return <Radio className="w-4 h-4 text-amber-500" />;
      case 'controller':
        return <Cpu className="w-4 h-4 text-cyan-500" />;
      case 'actuator':
        return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      case 'gateway':
        return <Server className="w-4 h-4 text-blue-500" />;
      case 'broker':
        return <Shield className="w-4 h-4 text-emerald-500" />;
      case 'cloud':
        return <Cloud className="w-4 h-4 text-purple-500" />;
      case 'app':
        return <Smartphone className="w-4 h-4 text-indigo-500" />;
      case 'soc':
        return <Eye className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#0c121c] p-4 sm:p-5 text-[#E6EDF3] space-y-4">
      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1E293B]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-[4px] bg-[#0E7490]/20 text-[#22D3EE]">
              <Cpu className="w-4 h-4" />
            </span>
            <h3 className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#E6EDF3]">
              Interactive IoT System & Threat Boundary Architecture
            </h3>
          </div>
          <p className="text-[11px] text-[#9BA8B7] mt-0.5">
            Click any node or trust zone to inspect protocols, attack vectors, and hardened defenses.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Mode Switcher */}
          <button
            type="button"
            onClick={() => setIsSecureMode(!isSecureMode)}
            className={`px-3 py-1.5 rounded-[4px] text-xs font-mono font-medium flex items-center gap-1.5 border transition-colors cursor-pointer ${
              isSecureMode
                ? 'bg-emerald-950/50 text-emerald-300 border-emerald-700/60 hover:bg-emerald-900/50'
                : 'bg-rose-950/50 text-rose-300 border-rose-700/60 hover:bg-rose-900/50'
            }`}
          >
            {isSecureMode ? (
              <>
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mode: Hardened (TLS + ACLs)</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>Mode: Insecure / Attack Simulation</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setAnimatingPacket(!animatingPacket)}
            className="p-1.5 rounded-[4px] border border-[#243044] bg-[#162234] hover:bg-[#1f2f47] text-[#9BA8B7] transition-colors cursor-pointer"
            title="Toggle animated telemetry pulses"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${animatingPacket ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full overflow-x-auto rounded-[6px] border border-[#1E293B] bg-[#070b12] p-2">
        <svg
          viewBox="0 0 920 380"
          className="w-full h-auto min-w-[760px] select-none font-mono"
          style={{ maxHeight: '420px' }}
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="trust-boundary-lan" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0E7490" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0E7490" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="trust-boundary-cloud" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.02" />
            </linearGradient>

            {/* Markers */}
            <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#10B981" />
            </marker>
            <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#EF4444" />
            </marker>
            <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#38BDF8" />
            </marker>
          </defs>

          {/* ZONE 1: Physical Edge Boundary */}
          <rect x="20" y="30" width="310" height="320" rx="8" fill="none" stroke="#334155" strokeDasharray="4 4" strokeWidth="1" />
          <text x="35" y="52" fill="#64748B" fontSize="10" fontWeight="bold">ZONE 1: PHYSICAL DEVICE PERIMETER</text>

          {/* ZONE 2: Local Isolated IoT VLAN */}
          <rect x="360" y="30" width="370" height="320" rx="8" fill="url(#trust-boundary-lan)" stroke="#0E7490" strokeDasharray="4 4" strokeWidth="1.2" />
          <text x="375" y="52" fill="#22D3EE" fontSize="10" fontWeight="bold">ZONE 2: ISOLATED IoT SUBNET (192.168.10.0/24)</text>

          {/* ZONE 3: Public Cloud & External */}
          <rect x="750" y="30" width="150" height="320" rx="8" fill="url(#trust-boundary-cloud)" stroke="#8B5CF6" strokeDasharray="4 4" strokeWidth="1" />
          <text x="760" y="52" fill="#A78BFA" fontSize="10" fontWeight="bold">ZONE 3: CLOUD & APP</text>

          {/* INTERCONNECT PATHS */}
          {/* Sensor -> ESP32 */}
          <path d="M 120 140 L 190 140" stroke="#F59E0B" strokeWidth="2" strokeDasharray={animatingPacket ? '4 3' : 'none'} markerEnd="url(#arrow-blue)" />
          <text x="135" y="132" fill="#F59E0B" fontSize="9">3.3V Data</text>

          {/* ESP32 -> Actuator */}
          <path d="M 250 160 L 250 250" stroke="#EF4444" strokeWidth="2" markerEnd="url(#arrow-red)" />
          <text x="256" y="210" fill="#F87171" fontSize="9">2N2222 Gate</text>

          {/* ESP32 -> Gateway (Wi-Fi 2.4GHz) */}
          <path
            d="M 290 140 L 390 140"
            stroke={isSecureMode ? '#10B981' : '#EF4444'}
            strokeWidth={isSecureMode ? '2' : '2.5'}
            strokeDasharray={animatingPacket ? '6 4' : 'none'}
            markerEnd={isSecureMode ? 'url(#arrow-green)' : 'url(#arrow-red)'}
          />
          <text x="305" y="132" fill={isSecureMode ? '#34D399' : '#F87171'} fontSize="9">
            {isSecureMode ? 'WPA2 + TLS' : 'Cleartext Wi-Fi'}
          </text>

          {/* Gateway -> Mosquitto Broker */}
          <path
            d="M 490 140 L 590 140"
            stroke={isSecureMode ? '#10B981' : '#EF4444'}
            strokeWidth="2"
            markerEnd={isSecureMode ? 'url(#arrow-green)' : 'url(#arrow-red)'}
          />
          <text x="505" y="132" fill={isSecureMode ? '#34D399' : '#F87171'} fontSize="9">
            {isSecureMode ? 'TCP 8883 (mTLS)' : 'TCP 1883 (No Auth)'}
          </text>

          {/* Mosquitto -> SOC Analyst */}
          <path d="M 650 165 L 650 250" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrow-blue)" />
          <text x="656" y="210" fill="#38BDF8" fontSize="9">Broker Logs</text>

          {/* Gateway -> SOC Tap */}
          <path d="M 470 165 C 470 230, 570 280, 590 290" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" fill="none" markerEnd="url(#arrow-blue)" />
          <text x="490" y="240" fill="#38BDF8" fontSize="9">PCAP Tap</text>

          {/* Mosquitto -> Cloud Bridge */}
          <path
            d="M 690 140 L 780 140"
            stroke={isSecureMode ? '#10B981' : '#EF4444'}
            strokeWidth="2"
            markerEnd={isSecureMode ? 'url(#arrow-green)' : 'url(#arrow-red)'}
          />
          <text x="705" y="132" fill={isSecureMode ? '#A78BFA' : '#F87171'} fontSize="9">
            {isSecureMode ? 'TLS Bridge' : 'HTTP REST'}
          </text>

          {/* Cloud -> Mobile App */}
          <path d="M 840 165 L 840 250" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arrow-blue)" />
          <text x="846" y="210" fill="#C4B5FD" fontSize="9">HTTPS/WSS</text>

          {/* NODES RENDERING */}
          {NODES.map((node) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <g
                key={node.id}
                transform={`translate(${node.x - 40}, ${node.y - 25})`}
                onClick={() => setSelectedNode(node)}
                className="cursor-pointer group"
              >
                {/* Node Card Box */}
                <rect
                  width="85"
                  height="50"
                  rx="6"
                  fill={isSelected ? '#1E293B' : '#0F172A'}
                  stroke={
                    isSelected
                      ? '#22D3EE'
                      : isSecureMode
                      ? '#334155'
                      : '#64748B'
                  }
                  strokeWidth={isSelected ? '2' : '1'}
                  className="transition-all"
                />

                {/* Node Status Dot */}
                <circle
                  cx="12"
                  cy="14"
                  r="4"
                  fill={isSecureMode ? '#10B981' : '#EF4444'}
                />

                {/* Node Label */}
                <text
                  x="22"
                  y="17"
                  fill={isSelected ? '#22D3EE' : '#E6EDF3'}
                  fontSize="9"
                  fontWeight="bold"
                >
                  {node.name.length > 12 ? node.name.substring(0, 11) + '…' : node.name}
                </text>

                {/* Category Subtext */}
                <text x="12" y="32" fill="#64748B" fontSize="8">
                  {node.category.toUpperCase()}
                </text>

                {/* Port / Interface preview */}
                <text x="12" y="42" fill="#94A3B8" fontSize="7.5">
                  {node.ports[0]?.split(' ')[0] || ''}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Node Details & Threat Analysis */}
      {selectedNode && (
        <div className="p-4 rounded-[6px] border border-[#1E293B] bg-[#0c1420] grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column 1: Node Identity & Ports */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {getNodeIcon(selectedNode.category)}
              <h4 className="font-mono text-xs font-bold text-[#E6EDF3]">
                {selectedNode.name}
              </h4>
            </div>
            <p className="text-[11px] text-[#9BA8B7] leading-relaxed">
              {selectedNode.description}
            </p>
            <div className="pt-2 text-[11px] font-mono space-y-1">
              <div>
                <span className="text-[#64748B]">Protocols: </span>
                <span className="text-cyan-400">{selectedNode.protocols.join(', ')}</span>
              </div>
              <div>
                <span className="text-[#64748B]">Active Interfaces: </span>
                <span className="text-[#E6EDF3]">{selectedNode.ports.join(', ')}</span>
              </div>
              <div>
                <span className="text-[#64748B]">Trust Zone: </span>
                <span className="px-1.5 py-0.2 rounded-[3px] bg-[#1E293B] text-[10px] text-amber-300 font-medium">
                  {selectedNode.trustLevel}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Threat Vectors */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-rose-400">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Potential Attack Vectors</span>
            </div>
            <ul className="space-y-1 text-[11px] text-[#CBD5E1]">
              {selectedNode.threatVectors.map((threat, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-rose-500 font-bold shrink-0">•</span>
                  <span>{threat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Hardened Defenses */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Hardened Defenses</span>
            </div>
            <ul className="space-y-1 text-[11px] text-[#CBD5E1]">
              {selectedNode.defenses.map((defense, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span>{defense}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
