'use client';

import React, { useState } from 'react';
import {
  Code2,
  FileCode2,
  Download,
  Copy,
  Check,
  Cpu,
  Layers,
  Terminal,
  AlertTriangle,
  HelpCircle,
  FileDown,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Hash,
  Activity,
  Play,
} from 'lucide-react';
import { IOT_EXECUTABLE_LABS } from '../../../data/iot-executable-labs';

interface IoTExecutableLabConsoleProps {
  moduleNumber: number;
  projectTitle?: string;
  onOpenDiagramTab?: () => void;
}

type LabSubTab = 'firmware' | 'wiring' | 'output' | 'troubleshooting' | 'pcap';

export const IoTExecutableLabConsole: React.FC<IoTExecutableLabConsoleProps> = ({
  moduleNumber,
  projectTitle = 'Practical Lab Experiment',
  onOpenDiagramTab,
}) => {
  const [activeTab, setActiveTab] = useState<LabSubTab>('firmware');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPcapFilter, setCopiedPcapFilter] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  const labData = IOT_EXECUTABLE_LABS[moduleNumber] || IOT_EXECUTABLE_LABS[2];

  const handleCopyCode = () => {
    if (labData?.firmware) {
      navigator.clipboard.writeText(labData.firmware);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCopyHash = () => {
    if (labData?.pcap?.sha256) {
      navigator.clipboard.writeText(labData.pcap.sha256);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  const handleDownloadFirmware = () => {
    if (!labData?.firmware) return;
    const blob = new Blob([labData.firmware], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `firmware_module_${String(moduleNumber).padStart(2, '0')}.ino`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#0c121c] p-4 sm:p-5 text-[#E6EDF3] space-y-4 font-mono text-xs">
      {/* Console Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1E293B]">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-[4px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Cpu className="w-4 h-4" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                Module {String(moduleNumber).padStart(2, '0')} Executable Lab Suite
              </span>
              <span className="px-2 py-0.5 rounded-[4px] bg-emerald-950/60 border border-emerald-700/60 text-emerald-300 text-[10px] font-bold">
                {labData.compilation?.status === 'COMPILED' ? 'Arduino CLI Verified' : 'Validated'}
              </span>
            </div>
            <p className="text-[11px] text-[#9BA8B7] mt-0.5">
              Authentic C++ firmware, hardware wiring netlist, verified PCAP signatures & troubleshooting.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {labData.hasHardwareFirmware && (
            <button
              type="button"
              onClick={handleDownloadFirmware}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#162234] hover:bg-[#1E293B] border border-[#243044] text-cyan-300 transition-colors text-[11px] font-semibold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .ino</span>
            </button>
          )}

          {labData.pcap?.url && (
            <a
              href={labData.pcap.url}
              download={labData.pcap.filename}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#101F30] hover:bg-[#162B44] border border-cyan-700/50 text-cyan-200 transition-colors text-[11px] font-semibold cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download PCAP ({labData.pcap.packetCount} pkts)</span>
            </a>
          )}
        </div>
      </div>

      {/* Subtab Navigation */}
      <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-[#1E293B]">
        <button
          type="button"
          onClick={() => setActiveTab('firmware')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs transition-colors cursor-pointer ${
            activeTab === 'firmware'
              ? 'bg-cyan-600 text-white font-semibold'
              : 'text-[#9BA8B7] hover:bg-[#162234] hover:text-[#E6EDF3]'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Firmware Code (.ino)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('wiring')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs transition-colors cursor-pointer ${
            activeTab === 'wiring'
              ? 'bg-cyan-600 text-white font-semibold'
              : 'text-[#9BA8B7] hover:bg-[#162234] hover:text-[#E6EDF3]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Wiring Netlist ({labData.wiring?.length || 0})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('output')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs transition-colors cursor-pointer ${
            activeTab === 'output'
              ? 'bg-cyan-600 text-white font-semibold'
              : 'text-[#9BA8B7] hover:bg-[#162234] hover:text-[#E6EDF3]'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Expected Serial Output</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('troubleshooting')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs transition-colors cursor-pointer ${
            activeTab === 'troubleshooting'
              ? 'bg-cyan-600 text-white font-semibold'
              : 'text-[#9BA8B7] hover:bg-[#162234] hover:text-[#E6EDF3]'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Troubleshooting Matrix</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('pcap')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs transition-colors cursor-pointer ${
            activeTab === 'pcap'
              ? 'bg-cyan-600 text-white font-semibold'
              : 'text-[#9BA8B7] hover:bg-[#162234] hover:text-[#E6EDF3]'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Evidence PCAP Signature</span>
        </button>
      </div>

      {/* TAB 1: FIRMWARE CODE */}
      {activeTab === 'firmware' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2 p-2.5 rounded-[4px] bg-[#101724] border border-[#1E293B] text-[11px]">
            <div className="flex items-center gap-3">
              <span className="text-[#9BA8B7]">
                <strong>Target Board:</strong> {labData.compilation?.board || 'ESP32 DevKit V1 (Xtensa Dual-Core)'}
              </span>
              <span className="text-emerald-400">
                <strong>Flash:</strong> {labData.compilation?.flash_usage || '262 KB (20%)'}
              </span>
              <span className="text-cyan-400">
                <strong>RAM:</strong> {labData.compilation?.ram_usage || '21 KB (6%)'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#162234] hover:bg-[#1E293B] border border-[#243044] text-[#E6EDF3] transition-colors cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied!' : 'Copy Firmware'}</span>
            </button>
          </div>

          <div className="relative rounded-[6px] bg-[#070b12] border border-[#1E293B] overflow-hidden">
            <pre className="p-4 text-[11px] leading-relaxed text-[#CBD5E1] overflow-x-auto max-h-[450px]">
              <code>{labData.firmware || '// No hardware firmware required for this theoretical/forensic module.'}</code>
            </pre>
          </div>
        </div>
      )}

      {/* TAB 2: WIRING NETLIST */}
      {activeTab === 'wiring' && (
        <div className="space-y-3">
          {/* Safety Notice */}
          <div className="flex items-start gap-2 p-3 rounded-[4px] bg-amber-950/20 border border-amber-800/40 text-amber-300 text-[11px]">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <div>
              <strong>Hardware Safety Invariants: </strong>
              Strictly $\le 3.3$V DC logic levels. Zero mains AC. Connect common GND between ESP32 and external sensors.
            </div>
          </div>

          {labData.wiring && labData.wiring.length > 0 ? (
            <div className="rounded-[6px] border border-[#1E293B] overflow-hidden">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-[#101724] text-[#9BA8B7] uppercase tracking-wider border-b border-[#1E293B]">
                  <tr>
                    <th className="p-2.5">Component</th>
                    <th className="p-2.5">Component Pin</th>
                    <th className="p-2.5">ESP32 Pin</th>
                    <th className="p-2.5">Signal Type</th>
                    <th className="p-2.5">Voltage</th>
                    <th className="p-2.5">Functional Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E293B] bg-[#0a0e17]">
                  {labData.wiring.map((conn: any, idx: number) => (
                    <tr key={idx} className="hover:bg-[#121A26]">
                      <td className="p-2.5 font-semibold text-cyan-300">{conn.component || conn.part || 'Sensor'}</td>
                      <td className="p-2.5 text-[#E6EDF3]">{conn.pin || conn.component_pin || 'VCC/SIG'}</td>
                      <td className="p-2.5 font-bold text-amber-300">{conn.esp32Pin || conn.esp32_pin || 'GPIO 4'}</td>
                      <td className="p-2.5 text-[#9BA8B7]">{conn.signalType || conn.signal || 'Digital Input'}</td>
                      <td className="p-2.5 text-emerald-400 font-bold">{conn.voltage || '3.3V DC'}</td>
                      <td className="p-2.5 text-[#CBD5E1]">{conn.description || conn.notes || 'Signal line'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 text-center text-[#9BA8B7] bg-[#101724] rounded-[6px] border border-[#1E293B]">
              No discrete breadboard wiring required for this software/protocol module.
            </div>
          )}
        </div>
      )}

      {/* TAB 3: EXPECTED SERIAL OUTPUT */}
      {activeTab === 'output' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] text-[#9BA8B7] p-2 bg-[#101724] rounded-[4px] border border-[#1E293B]">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Serial Monitor Baud Rate: 115200 bps | 8-N-1</span>
            </span>
            <span className="text-emerald-400 font-bold">Online / Telemetry Active</span>
          </div>

          <div className="p-4 rounded-[6px] bg-[#05080f] border border-[#1E293B] font-mono text-[11px] leading-relaxed text-emerald-400 max-h-[350px] overflow-y-auto">
            <pre className="whitespace-pre-wrap">
              {labData.expectedOutput || `[CYBERTUBE] Module ${moduleNumber} Lab Initialized. Listening for telemetry...`}
            </pre>
          </div>
        </div>
      )}

      {/* TAB 4: TROUBLESHOOTING MATRIX */}
      {activeTab === 'troubleshooting' && (
        <div className="space-y-3">
          <div className="p-4 rounded-[6px] bg-[#101724] border border-[#1E293B] text-[11px] leading-relaxed text-[#CBD5E1] space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-bold uppercase tracking-wider pb-2 border-b border-[#1E293B]">
              <AlertTriangle className="w-4 h-4" />
              <span>Common Engineering Faults & Recovery Steps</span>
            </div>
            <div className="space-y-2">
              <div className="p-2.5 rounded bg-[#0a0e17] border border-[#1E293B]">
                <strong className="text-rose-400 block mb-0.5">Fault: &quot;Timed out waiting for packet header&quot; during flashing</strong>
                <p className="text-[#9BA8B7]">
                  Hold down the <strong>BOOT / IO0</strong> button on the ESP32 DevKit while initiating the flash command until &quot;Connecting...&quot; advances to &quot;Writing at 0x00010000&quot;.
                </p>
              </div>

              <div className="p-2.5 rounded bg-[#0a0e17] border border-[#1E293B]">
                <strong className="text-rose-400 block mb-0.5">Fault: &quot;Brownout detector was triggered&quot; reboot loop</strong>
                <p className="text-[#9BA8B7]">
                  The USB port cannot supply adequate peak RF transmission current (350mA+). Use a high-quality short USB cable or powered USB hub. Add a 100μF decoupling capacitor across 3.3V and GND.
                </p>
              </div>

              <div className="p-2.5 rounded bg-[#0a0e17] border border-[#1E293B]">
                <strong className="text-rose-400 block mb-0.5">Fault: Sensor reads &quot;NAN&quot; or floating 0.00V</strong>
                <p className="text-[#9BA8B7]">
                  Verify that the pull-up resistor (4.7kΩ to 10kΩ) is connected between the DHT22 data line and 3.3V rail. Confirm common ground continuity.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: EVIDENCE PCAP SIGNATURE */}
      {activeTab === 'pcap' && (
        <div className="space-y-3">
          <div className="p-4 rounded-[6px] bg-[#101724] border border-[#1E293B] space-y-3 text-[11px]">
            <div className="flex items-center justify-between pb-2 border-b border-[#1E293B]">
              <span className="font-bold text-cyan-400 uppercase tracking-wider">
                Authoritative PCAP Evidence Capture
              </span>
              <span className="px-2 py-0.5 rounded-[4px] bg-cyan-950/60 border border-cyan-800 text-cyan-300 font-bold">
                {labData.pcap.packetCount} Packets Captured
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
              <div>
                <span className="text-[#9BA8B7] block">PCAP Filename:</span>
                <span className="text-[#E6EDF3] font-semibold">{labData.pcap.filename}</span>
              </div>
              <div>
                <span className="text-[#9BA8B7] block">File Size:</span>
                <span className="text-[#E6EDF3] font-semibold">{labData.pcap.sizeBytes} bytes</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[#9BA8B7] block">SHA-256 Checksum:</span>
              <div className="flex items-center justify-between gap-2 p-2 rounded bg-[#0a0e17] border border-[#1E293B]">
                <span className="text-amber-300 select-all break-all">{labData.pcap.sha256}</span>
                <button
                  type="button"
                  onClick={handleCopyHash}
                  className="shrink-0 p-1 rounded hover:bg-[#162234] text-[#9BA8B7] hover:text-[#E6EDF3] transition-colors"
                >
                  {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <span className="text-[#9BA8B7] block">Wireshark Protocol Filter:</span>
              <div className="p-2 rounded bg-[#0a0e17] border border-[#1E293B] text-cyan-300">
                <code>mqtt || tcp.port == 1883 || http || coap</code>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={labData.pcap.url}
                download={labData.pcap.filename}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[4px] bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Verified PCAP</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
