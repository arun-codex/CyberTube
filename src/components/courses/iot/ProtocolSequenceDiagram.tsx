'use client';

import React, { useState } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Shield, ShieldAlert, Lock, CheckCircle2 } from 'lucide-react';

interface SequenceMessage {
  id: number;
  from: 'esp32' | 'ap' | 'broker' | 'soc';
  to: 'esp32' | 'ap' | 'broker' | 'soc';
  label: string;
  protocol: string;
  isEncrypted: boolean;
  securityCheck: string;
  detail: string;
}

interface ProtocolScenario {
  id: string;
  title: string;
  description: string;
  lifelines: { key: 'esp32' | 'ap' | 'broker' | 'soc'; label: string; x: number }[];
  messages: SequenceMessage[];
}

const SCENARIOS: ProtocolScenario[] = [
  {
    id: 'mqtt-tls',
    title: 'MQTT 3.1.1 over TLS 1.3 Handshake & Telemetry Flow',
    description: 'Cryptographic handshake and authenticated topic publishing with per-device ACLs on Mosquitto port 8883.',
    lifelines: [
      { key: 'esp32', label: 'ESP32 Client', x: 80 },
      { key: 'ap', label: 'Wi-Fi AP / Router', x: 280 },
      { key: 'broker', label: 'Mosquitto Broker (8883)', x: 500 },
      { key: 'soc', label: 'IoT SOC SIEM', x: 720 },
    ],
    messages: [
      { id: 1, from: 'esp32', to: 'ap', label: '802.11 4-Way WPA2 Handshake', protocol: 'EAPOL', isEncrypted: true, securityCheck: 'WPA2 PSK / PMK validated; PTK derived', detail: 'Derives pairwise transient key for 802.11 MAC-layer frame encryption.' },
      { id: 2, from: 'esp32', to: 'broker', label: 'TCP SYN (Port 8883)', protocol: 'TCP', isEncrypted: false, securityCheck: 'Firewall rules allow outbound 8883 from IoT VLAN only', detail: 'Initiates 3-way TCP handshake to broker IP address.' },
      { id: 3, from: 'broker', to: 'esp32', label: 'TCP SYN-ACK', protocol: 'TCP', isEncrypted: false, securityCheck: 'Broker listening socket healthy', detail: 'Server acknowledges and synchronizes sequence numbers.' },
      { id: 4, from: 'esp32', to: 'broker', label: 'TLS ClientHello (CipherSuites, SNI)', protocol: 'TLS 1.3', isEncrypted: false, securityCheck: 'TLS_AES_256_GCM_SHA384 advertised; TLS 1.0/1.1 rejected', detail: 'ESP32 initiates cryptographic negotiation with random bytes and supported curves.' },
      { id: 5, from: 'broker', to: 'esp32', label: 'ServerHello, Certificate, Finished', protocol: 'TLS 1.3', isEncrypted: true, securityCheck: 'ESP32 verifies broker CA certificate signature & expiration', detail: 'Broker provides X.509 certificate. ESP32 checks against embedded Root CA.' },
      { id: 6, from: 'esp32', to: 'broker', label: 'MQTT CONNECT (Client ID, Username/Pass)', protocol: 'MQTTS', isEncrypted: true, securityCheck: 'Broker validates credentials in Mosquitto password file', detail: 'Contains client identity esp32-room-01 and hashed token.' },
      { id: 7, from: 'broker', to: 'esp32', label: 'MQTT CONNACK (Return Code 0: Accepted)', protocol: 'MQTTS', isEncrypted: true, securityCheck: 'Authentication successful; session state retained', detail: 'Broker accepts connection and opens MQTT session.' },
      { id: 8, from: 'esp32', to: 'broker', label: 'MQTT PUBLISH: "sensors/smart-room/temp"', protocol: 'MQTTS', isEncrypted: true, securityCheck: 'Topic ACL verified: client authorized to write to this prefix', detail: 'Payload: {"t": 24.5, "h": 58.2, "seq": 142}. Encrypted payload prevents eavesdropping.' },
      { id: 9, from: 'broker', to: 'soc', label: 'Forward Event to Telemetry Logger', protocol: 'Syslog/TLS', isEncrypted: true, securityCheck: 'SIEM correlates message size and frequency against baseline', detail: 'Forwarded to defensive analytics pipeline for anomaly detection.' },
    ],
  },
  {
    id: 'ota-update',
    title: 'Secure OTA Firmware Update with ECDSA Signature Verification',
    description: 'Cryptographically authenticated firmware deployment with hash verification and rollback protection.',
    lifelines: [
      { key: 'esp32', label: 'ESP32 Device', x: 80 },
      { key: 'ap', label: 'Local Gateway', x: 280 },
      { key: 'broker', label: 'OTA Firmware Server', x: 500 },
      { key: 'soc', label: 'Audit Log & SOC', x: 720 },
    ],
    messages: [
      { id: 1, from: 'broker', to: 'esp32', label: 'OTA Notification: v1.4.0 Available', protocol: 'MQTT/TLS', isEncrypted: true, securityCheck: 'Signed manifest containing SHA-256 hash and version number', detail: 'Device checks that new version is strictly greater than current version to prevent rollback.' },
      { id: 2, from: 'esp32', to: 'broker', label: 'HTTPS GET /firmware/v1.4.0.bin', protocol: 'HTTPS', isEncrypted: true, securityCheck: 'TLS server certificate verified against trusted store', detail: 'ESP32 connects to update repository using verified TLS connection.' },
      { id: 3, from: 'broker', to: 'esp32', label: 'Stream Firmware Binary (Chunk 1..N)', protocol: 'HTTPS', isEncrypted: true, securityCheck: 'Streaming to passive ota_1 flash partition; running ota_0 untouched', detail: 'Binary chunks written sequentially to the secondary partition.' },
      { id: 4, from: 'esp32', to: 'esp32', label: 'Verify SHA-256 Digest & ECDSA Signature', protocol: 'Hardware Crypto', isEncrypted: true, securityCheck: 'ECDSA signature matches Espressif public key in eFuse', detail: 'If signature check fails, partition is discarded and device reboots into current safe slot.' },
      { id: 5, from: 'esp32', to: 'soc', label: 'Log OTA Success & Boot Partition Swap', protocol: 'Syslog/TLS', isEncrypted: true, securityCheck: 'Audit trail records hash, signature valid, and reboot trigger', detail: 'SOC dashboard updates device firmware inventory table.' },
    ],
  },
];

export const ProtocolSequenceDiagram: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('mqtt-tls');
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);

  const scenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];
  const activeMessage = scenario.messages[currentMessageIndex];

  return (
    <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#0c121c] p-4 sm:p-5 text-[#E6EDF3] space-y-4">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1E293B]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-[4px] bg-purple-500/20 text-purple-400 font-mono text-xs font-bold">
              SEQUENCE
            </span>
            <h3 className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#E6EDF3]">
              Interactive IoT Protocol Exchange & Security Checker
            </h3>
          </div>
          <p className="text-[11px] text-[#9BA8B7] mt-0.5">
            Step through packets in order to inspect network protocols, TLS negotiation, and security validation points.
          </p>
        </div>

        {/* Scenario Switcher */}
        <div className="flex items-center gap-2">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => {
                setActiveScenarioId(sc.id);
                setCurrentMessageIndex(0);
              }}
              className={`px-3 py-1 rounded-[4px] text-xs font-mono transition-colors cursor-pointer ${
                activeScenarioId === sc.id
                  ? 'bg-purple-600 text-white font-semibold'
                  : 'bg-[#162234] text-[#9BA8B7] hover:bg-[#1f2f47]'
              }`}
            >
              {sc.title.split(' ')[0]} {sc.title.split(' ')[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Stepper Navigation */}
      <div className="flex items-center justify-between gap-2 p-2.5 rounded-[6px] bg-[#121A26] border border-[#1E293B]">
        <button
          type="button"
          disabled={currentMessageIndex === 0}
          onClick={() => setCurrentMessageIndex((i) => Math.max(0, i - 1))}
          className="px-2.5 py-1 rounded-[4px] border border-[#243044] bg-[#1A2638] text-xs font-mono disabled:opacity-40 hover:bg-[#223249] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Previous Packet</span>
        </button>

        <div className="text-center font-mono">
          <span className="text-xs font-bold text-purple-400">
            Packet {currentMessageIndex + 1} of {scenario.messages.length}:
          </span>{' '}
          <span className="text-xs text-[#E6EDF3] font-semibold">{activeMessage.label}</span>
        </div>

        <button
          type="button"
          disabled={currentMessageIndex === scenario.messages.length - 1}
          onClick={() => setCurrentMessageIndex((i) => Math.min(scenario.messages.length - 1, i + 1))}
          className="px-2.5 py-1 rounded-[4px] border border-[#243044] bg-[#1A2638] text-xs font-mono disabled:opacity-40 hover:bg-[#223249] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>Next Packet</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Vector Sequence Diagram */}
      <div className="relative w-full overflow-x-auto rounded-[6px] border border-[#1E293B] bg-[#070b12] p-2">
        <svg viewBox="0 0 820 400" className="w-full h-auto min-w-[700px] select-none font-mono">
          {/* Lifelines */}
          {scenario.lifelines.map((line) => (
            <g key={line.key}>
              {/* Header Box */}
              <rect x={line.x - 55} y={15} width={110} height="28" rx="4" fill="#1E293B" stroke="#334155" strokeWidth="1" />
              <text x={line.x} y={32} fill="#E2E8F0" fontSize="9" fontWeight="bold" textAnchor="middle">
                {line.label}
              </text>
              {/* Vertical Dashed Lifeline */}
              <line x1={line.x} y1={45} x2={line.x} y2={380} stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
            </g>
          ))}

          {/* Messages */}
          {scenario.messages.map((msg, idx) => {
            const fromX = scenario.lifelines.find((l) => l.key === msg.from)?.x || 100;
            const toX = scenario.lifelines.find((l) => l.key === msg.to)?.x || 500;
            const yPos = 65 + idx * 34;
            const isActive = idx === currentMessageIndex;
            const isPast = idx < currentMessageIndex;

            return (
              <g
                key={msg.id}
                onClick={() => setCurrentMessageIndex(idx)}
                className="cursor-pointer group"
                opacity={isActive ? 1 : isPast ? 0.8 : 0.35}
              >
                {/* Connecting Arrow */}
                {fromX === toX ? (
                  // Self call loop
                  <path
                    d={`M ${fromX} ${yPos} C ${fromX + 40} ${yPos - 10}, ${fromX + 40} ${yPos + 15}, ${fromX} ${yPos + 15}`}
                    fill="none"
                    stroke={isActive ? '#A855F7' : '#64748B'}
                    strokeWidth={isActive ? '2.5' : '1.5'}
                  />
                ) : (
                  <line
                    x1={fromX}
                    y1={yPos}
                    x2={toX}
                    y2={yPos}
                    stroke={
                      isActive
                        ? msg.isEncrypted
                          ? '#10B981'
                          : '#F59E0B'
                        : '#475569'
                    }
                    strokeWidth={isActive ? '2.5' : '1.5'}
                    strokeDasharray={msg.isEncrypted ? 'none' : '4 3'}
                  />
                )}

                {/* Arrowhead */}
                {fromX !== toX && (
                  <polygon
                    points={
                      toX > fromX
                        ? `${toX},${yPos} ${toX - 8},${yPos - 4} ${toX - 8},${yPos + 4}`
                        : `${toX},${yPos} ${toX + 8},${yPos - 4} ${toX + 8},${yPos + 4}`
                    }
                    fill={
                      isActive
                        ? msg.isEncrypted
                          ? '#10B981'
                          : '#F59E0B'
                        : '#475569'
                    }
                  />
                )}

                {/* Message Label Badge */}
                <rect
                  x={(fromX + toX) / 2 - 110}
                  y={yPos - 12}
                  width="220"
                  height="18"
                  rx="3"
                  fill={isActive ? '#1E293B' : '#0F172A'}
                  stroke={isActive ? '#A855F7' : '#334155'}
                  strokeWidth="1"
                />
                <text
                  x={(fromX + toX) / 2}
                  y={yPos}
                  fill={isActive ? '#E2E8F0' : '#94A3B8'}
                  fontSize="8.5"
                  fontWeight={isActive ? 'bold' : 'normal'}
                  textAnchor="middle"
                >
                  {msg.id}. {msg.label.length > 32 ? msg.label.substring(0, 30) + '…' : msg.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Packet Security Details & Validation */}
      <div className="p-4 rounded-[6px] border border-[#1E293B] bg-[#0c1420] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {activeMessage.isEncrypted ? (
              <span className="p-1 rounded-[3px] bg-emerald-950 text-emerald-400 border border-emerald-800">
                <Lock className="w-3.5 h-3.5" />
              </span>
            ) : (
              <span className="p-1 rounded-[3px] bg-amber-950 text-amber-400 border border-amber-800">
                <ShieldAlert className="w-3.5 h-3.5" />
              </span>
            )}
            <h4 className="font-bold text-[#E6EDF3]">
              Packet #{activeMessage.id}: {activeMessage.label}
            </h4>
          </div>
          <p className="text-[11px] text-[#9BA8B7] leading-relaxed">
            {activeMessage.detail}
          </p>
          <div className="pt-1 text-[11px]">
            <span className="text-[#64748B]">Layer / Protocol: </span>
            <span className="text-cyan-400 font-semibold">{activeMessage.protocol}</span>
          </div>
        </div>

        <div className="space-y-2 border-t md:border-t-0 md:border-l border-[#1E293B] md:pl-4">
          <h5 className="font-bold text-emerald-400 uppercase flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Defensive Security Checkpoint</span>
          </h5>
          <div className="p-2.5 rounded-[4px] bg-[#162234] border border-[#243044] text-[11px] text-[#CBD5E1] leading-relaxed">
            {activeMessage.securityCheck}
          </div>
        </div>
      </div>
    </div>
  );
};
