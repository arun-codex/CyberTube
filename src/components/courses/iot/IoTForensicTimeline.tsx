'use client';

import React, { useState } from 'react';
import { Clock, Search, Filter, ShieldAlert, CheckCircle2, HelpCircle, FileText, Wifi, Terminal, Server } from 'lucide-react';

export interface ForensicEvent {
  id: string;
  timestamp: string; // UTC ISO
  source: 'serial' | 'pcap' | 'mqtt' | 'gateway';
  severity: 'critical' | 'warning' | 'info';
  certainty: 'verified-fact' | 'inferred-hypothesis';
  summary: string;
  rawEvidence: string;
  impactAnalysis: string;
  recommendedAction: string;
}

const FORENSIC_EVENTS: ForensicEvent[] = [
  {
    id: 'evt-001',
    timestamp: '2026-11-24T14:02:11.120Z',
    source: 'serial',
    severity: 'info',
    certainty: 'verified-fact',
    summary: 'ESP32 Cold Boot from Power-On Reset (POR)',
    rawEvidence: 'rst:0x1 (POWERON_RESET),boot:0x13 (SPI_FAST_FLASH_BOOT)\nconfigsip: 0, SPIWP:0xee\nclk_drv:0x00,q_drv:0x00,d_drv:0x00\nmode:DIO, clock div:2',
    impactAnalysis: 'Normal clean bootloader initialization. Confirms hardware power cycle occurred.',
    recommendedAction: 'Log boot reason to persistent flash storage to detect unauthorized physical tampering.',
  },
  {
    id: 'evt-002',
    timestamp: '2026-11-24T14:02:14.340Z',
    source: 'pcap',
    severity: 'info',
    certainty: 'verified-fact',
    summary: 'DHCP Request & IP Lease Assigned (192.168.10.145)',
    rawEvidence: 'Frame 14: 342 bytes on wire. DHCP Request from 24:6f:28:1a:3b:02 (Espressif). Assigned IP 192.168.10.145 by Gateway 192.168.10.1.',
    impactAnalysis: 'Device successfully authenticated to WPA2-PSK and joined authorized IoT VLAN.',
    recommendedAction: 'Bind MAC address 24:6f:28:1a:3b:02 to static DHCP reservation to prevent IP churn.',
  },
  {
    id: 'evt-003',
    timestamp: '2026-11-24T14:03:02.890Z',
    source: 'mqtt',
    severity: 'info',
    certainty: 'verified-fact',
    summary: 'MQTT Client Connected with TLS Client Certificate',
    rawEvidence: '1764002582: New client connected from 192.168.10.145:49152 as esp32-room-01 (p2, c1, k60, u\'device_agent\'). mTLS cipher TLS_AES_256_GCM_SHA384.',
    impactAnalysis: 'Encrypted mutual TLS handshake established on port 8883. Authenticated client identity matches certificate CN.',
    recommendedAction: 'Ensure client certificate validity period is monitored before expiration.',
  },
  {
    id: 'evt-004',
    timestamp: '2026-11-24T14:05:41.200Z',
    source: 'pcap',
    severity: 'warning',
    certainty: 'verified-fact',
    summary: 'Rapid SYN Port Scan Detected against Device IP',
    rawEvidence: 'Frame 890..945: 55 TCP SYN packets to ports 21, 22, 23, 80, 8080 from unauthenticated host 192.168.10.99 within 800ms.',
    impactAnalysis: 'Active reconnaissance scan attempting to discover open management services or Telnet backdoors on ESP32.',
    recommendedAction: 'Block scanning host IP 192.168.10.99 at gateway router level. Verify ESP32 has zero listening TCP ports.',
  },
  {
    id: 'evt-005',
    timestamp: '2026-11-24T14:06:12.450Z',
    source: 'mqtt',
    severity: 'critical',
    certainty: 'verified-fact',
    summary: 'ACL Denial: Unauthorized Attempt to Publish to System Topic',
    rawEvidence: '1764002772: Denied PUBLISH from esp32-room-01 to \'admin/firmware/override\' (ACL denied; write access restricted to \'sensors/smart-room/#\').',
    impactAnalysis: 'Attempted privilege escalation or compromised client trying to broadcast firmware configuration overrides.',
    recommendedAction: 'Trigger immediate automated quarantine of client esp32-room-01. Generate high-priority SOC alert.',
  },
  {
    id: 'evt-006',
    timestamp: '2026-11-24T14:06:15.010Z',
    source: 'serial',
    severity: 'warning',
    certainty: 'inferred-hypothesis',
    summary: 'Hardware Watchdog Timer Reset Triggered',
    rawEvidence: 'Guru Meditation Error: Core 0 panic\'ed (Interrupt wdt timeout on CPU0)\nRegister dump:\nPC : 0x40081234 PS : 0x00060034 A0 : 0x80081abc\nBacktrace: 0x40081234:0x3ffb1240 0x400d3410:0x3ffb1260',
    impactAnalysis: 'Firmware execution halted in an infinite loop or deadlock, triggering the hardware task watchdog timer (TWDT).',
    recommendedAction: 'Analyze PC 0x40081234 in Ghidra / addr2line to pinpoint blocking function. Verify watchdog timeout is 5 seconds.',
  },
  {
    id: 'evt-007',
    timestamp: '2026-11-24T14:07:00.000Z',
    source: 'gateway',
    severity: 'critical',
    certainty: 'verified-fact',
    summary: 'Automated Port Isolation & Quarantine Applied to Device',
    rawEvidence: 'iptables -A FORWARD -s 192.168.10.145 -j DROP\nlogger[soc]: Isolated rogue client 192.168.10.145 following repeated ACL violations.',
    impactAnalysis: 'Compromised node successfully contained before horizontal lateral movement into adjacent OT networks.',
    recommendedAction: 'Retrieve device for physical memory acquisition and flash extraction via esptool.py.',
  },
];

export const IoTForensicTimeline: React.FC = () => {
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [certaintyFilter, setCertaintyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<ForensicEvent>(FORENSIC_EVENTS[4]); // default to ACL denial

  const filteredEvents = FORENSIC_EVENTS.filter((evt) => {
    if (sourceFilter !== 'all' && evt.source !== sourceFilter) return false;
    if (severityFilter !== 'all' && evt.severity !== severityFilter) return false;
    if (certaintyFilter !== 'all' && evt.certainty !== certaintyFilter) return false;
    if (
      searchQuery &&
      !evt.summary.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !evt.rawEvidence.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const getSourceIcon = (source: ForensicEvent['source']) => {
    switch (source) {
      case 'serial':
        return <Terminal className="w-3.5 h-3.5 text-amber-400" />;
      case 'pcap':
        return <Wifi className="w-3.5 h-3.5 text-cyan-400" />;
      case 'mqtt':
        return <Server className="w-3.5 h-3.5 text-purple-400" />;
      case 'gateway':
        return <FileText className="w-3.5 h-3.5 text-rose-400" />;
    }
  };

  const getSeverityBadge = (severity: ForensicEvent['severity']) => {
    switch (severity) {
      case 'critical':
        return <span className="px-1.5 py-0.2 rounded-[3px] bg-rose-950/80 text-rose-300 border border-rose-800 text-[10px] font-bold">CRITICAL</span>;
      case 'warning':
        return <span className="px-1.5 py-0.2 rounded-[3px] bg-amber-950/80 text-amber-300 border border-amber-800 text-[10px] font-bold">WARNING</span>;
      case 'info':
        return <span className="px-1.5 py-0.2 rounded-[3px] bg-slate-800 text-slate-300 text-[10px]">INFO</span>;
    }
  };

  return (
    <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#0c121c] p-4 sm:p-5 text-[#E6EDF3] space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1E293B]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-[4px] bg-amber-500/20 text-amber-400 font-mono text-xs font-bold">
              DFIR
            </span>
            <h3 className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#E6EDF3]">
              IoT Multi-Source Forensic Incident Correlation Timeline
            </h3>
          </div>
          <p className="text-[11px] text-[#9BA8B7] mt-0.5">
            Correlate serial logs, PCAP frames, MQTT broker messages, and gateway SIEM events across a synchronized UTC timeline.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-3 rounded-[6px] bg-[#121A26] border border-[#1E293B] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter timeline evidence..."
              className="pl-8 pr-3 py-1.5 rounded-[4px] bg-[#1A2638] border border-[#243044] text-xs text-[#E6EDF3] focus:outline-none focus:border-cyan-500 w-48 sm:w-56"
            />
          </div>

          {/* Source Filter */}
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-[4px] bg-[#1A2638] border border-[#243044] text-[#E6EDF3] focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="all">All Sources</option>
            <option value="serial">Serial UART</option>
            <option value="pcap">Wireshark PCAP</option>
            <option value="mqtt">Mosquitto MQTT</option>
            <option value="gateway">Gateway SIEM</option>
          </select>

          {/* Severity Filter */}
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-[4px] bg-[#1A2638] border border-[#243044] text-[#E6EDF3] focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical Only</option>
            <option value="warning">Warning Only</option>
            <option value="info">Info Only</option>
          </select>

          {/* Certainty Filter */}
          <select
            value={certaintyFilter}
            onChange={(e) => setCertaintyFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-[4px] bg-[#1A2638] border border-[#243044] text-[#E6EDF3] focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="all">Facts & Hypotheses</option>
            <option value="verified-fact">Verified Facts Only</option>
            <option value="inferred-hypothesis">Inferred Hypotheses</option>
          </select>
        </div>

        <span className="text-[11px] text-[#64748B]">
          Showing {filteredEvents.length} of {FORENSIC_EVENTS.length} events
        </span>
      </div>

      {/* Timeline List & Detail Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Timeline Events Column (5 cols) */}
        <div className="lg:col-span-6 space-y-2 max-h-[380px] overflow-y-auto pr-1">
          {filteredEvents.map((evt) => {
            const isSelected = selectedEvent.id === evt.id;
            return (
              <div
                key={evt.id}
                onClick={() => setSelectedEvent(evt)}
                className={`p-3 rounded-[6px] border transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#1E293B] border-cyan-500'
                    : 'bg-[#101724] border-[#1E293B] hover:bg-[#162234]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-[11px] font-mono mb-1">
                  <div className="flex items-center gap-1.5 text-[#9BA8B7]">
                    {getSourceIcon(evt.source)}
                    <span className="uppercase text-[10px] font-semibold">{evt.source}</span>
                    <span>•</span>
                    <span className="text-cyan-400">{evt.timestamp.split('T')[1].replace('Z', '')}</span>
                  </div>
                  {getSeverityBadge(evt.severity)}
                </div>

                <div className="text-xs font-semibold text-[#E6EDF3] leading-snug">
                  {evt.summary}
                </div>

                <div className="mt-1.5 flex items-center gap-2">
                  {evt.certainty === 'verified-fact' ? (
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Fact</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                      <HelpCircle className="w-3 h-3" />
                      <span>Inferred Hypothesis</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Event Evidence & Root Cause Analysis (6 cols) */}
        <div className="lg:col-span-6 p-4 rounded-[6px] border border-[#1E293B] bg-[#0c1420] space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
            <div>
              <span className="text-[10px] text-[#64748B] uppercase">Incident Evidence Record</span>
              <h4 className="font-bold text-[#E6EDF3] text-sm">{selectedEvent.summary}</h4>
            </div>
            {getSeverityBadge(selectedEvent.severity)}
          </div>

          <div>
            <span className="text-[11px] text-[#64748B] uppercase font-bold block mb-1">
              Raw Log / PCAP Payload:
            </span>
            <pre className="p-2.5 rounded-[4px] bg-[#070b12] border border-[#1E293B] text-[11px] text-cyan-300 font-mono whitespace-pre-wrap overflow-x-auto leading-relaxed">
              {selectedEvent.rawEvidence}
            </pre>
          </div>

          <div>
            <span className="text-[11px] text-[#64748B] uppercase font-bold block mb-1">
              Impact & Threat Analysis:
            </span>
            <p className="text-[#CBD5E1] text-[11px] leading-relaxed">
              {selectedEvent.impactAnalysis}
            </p>
          </div>

          <div className="p-2.5 rounded-[4px] bg-[#162234] border border-[#243044]">
            <span className="text-[11px] text-emerald-400 uppercase font-bold block mb-1">
              Recommended Remediation & Defense:
            </span>
            <p className="text-[#E6EDF3] text-[11px] leading-relaxed">
              {selectedEvent.recommendedAction}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
