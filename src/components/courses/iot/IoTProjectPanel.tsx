'use client';

import React, { useState } from 'react';
import { FolderGit2, CheckCircle2, Circle, AlertTriangle, FileCode2, Award, ExternalLink } from 'lucide-react';

interface ProjectMilestone {
  id: string;
  title: string;
  deliverable: string;
  points: number;
  completed: boolean;
  verificationEvidence: string;
}

interface IoTProjectPanelProps {
  moduleNumber: number;
  projectTitle?: string;
  projectObjective?: string;
}

export const IoTProjectPanel: React.FC<IoTProjectPanelProps> = ({
  moduleNumber,
  projectTitle = 'Module Practical Project',
  projectObjective = 'Assemble, flash, verify, and document an authorized IoT security artifact with reproducible evidence.',
}) => {
  // 6 Portfolio Projects are at M10, M13, M16, M20, M26, M30
  const isPortfolioProject = [10, 13, 16, 20, 26, 30].includes(moduleNumber);
  const isCapstone = moduleNumber === 30;

  const milestones: ProjectMilestone[] = isCapstone
    ? [
        { id: 'm1', title: 'Functional Smart-Device Hardware Build', deliverable: 'ESP32 wired with DHT22, LED, button, buzzer, and verified 3.3V power rails', points: 20, completed: false, verificationEvidence: 'Measured DC multimeter photo and 2D/3D circuit netlist' },
        { id: 'm2', title: 'Hardened Firmware & Cryptographic Identity', deliverable: 'Secure Boot enabled, NVS encrypted credentials, non-default keys', points: 20, completed: false, verificationEvidence: 'Serial bootloader log showing flash encryption & secure boot active' },
        { id: 'm3', title: 'Encrypted Telemetry & Protocol Inspection', deliverable: 'Mutual TLS (mTLS) MQTT publishing on port 8883 with topic ACLs', points: 15, completed: false, verificationEvidence: 'Wireshark PCAP verifying zero cleartext credentials and TLS 1.3 handshake' },
        { id: 'm4', title: 'Hardware Safety & Wiring Documentation', deliverable: 'Flyback diode protection, current-limiting resistors, common ground verified', points: 10, completed: false, verificationEvidence: 'Full wiring diagram with component part numbers and datasheet links' },
        { id: 'm5', title: 'Incident Simulation & SOC Detections', deliverable: 'Simulate unauthorized topic injection and generate automated SIEM alert', points: 15, completed: false, verificationEvidence: 'Mosquitto ACL denial log correlated with Suricata / Zeek alert' },
        { id: 'm6', title: 'Executive Report & Remediation Backlog', deliverable: 'Formal vulnerability assessment report with CVSS scores and fix prioritization', points: 15, completed: false, verificationEvidence: 'PDF/Markdown security assessment report and Git repository' },
        { id: 'm7', title: 'Reproducibility & Demo Video', deliverable: 'Step-by-step instructions and short video demonstration of working system', points: 5, completed: false, verificationEvidence: 'Repository README with reproducible build commands' },
      ]
    : [
        { id: 'm1', title: 'Hardware / Simulation Lab Setup', deliverable: 'Connect reference ESP32 or configure isolated Wokwi / Linux test environment', points: 25, completed: false, verificationEvidence: 'Serial console capture showing device initialization' },
        { id: 'm2', title: 'Implementation & Firmware Code', deliverable: 'Write and flash modular, defensive C++ / Python firmware routine', points: 30, completed: false, verificationEvidence: 'Clean code compile with zero warnings and documented function headers' },
        { id: 'm3', title: 'Defensive Verification & Security Inspection', deliverable: 'Inspect communication traffic, check error handling, verify fail-safe behavior', points: 25, completed: false, verificationEvidence: 'Network PCAP, serial telemetry log, or multimeter voltage reading' },
        { id: 'm4', title: 'Artifact Submission & Evidence Handoff', deliverable: 'Save sanitized logs, architecture diagram, and mitigation observations', points: 20, completed: false, verificationEvidence: 'One-page markdown lab report with labeled evidence items (E1, E2)' },
      ];

  const [milestoneStates, setMilestoneStates] = useState<Record<string, boolean>>({});

  const toggleMilestone = (id: string) => {
    setMilestoneStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalPoints = milestones.reduce((sum, m) => sum + m.points, 0);
  const earnedPoints = milestones
    .filter((m) => milestoneStates[m.id])
    .reduce((sum, m) => sum + m.points, 0);

  return (
    <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#0c121c] p-4 sm:p-5 text-[#E6EDF3] space-y-4 font-mono text-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1E293B]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-[4px] bg-indigo-500/20 text-indigo-400">
              {isCapstone ? <Award className="w-4 h-4" /> : <FolderGit2 className="w-4 h-4" />}
            </span>
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#E6EDF3]">
              {isCapstone
                ? 'Portfolio Project 6: Final 100-Mark IoT Cybersecurity Capstone'
                : isPortfolioProject
                ? `Portfolio Project: Module ${String(moduleNumber).padStart(2, '0')}`
                : `Practical Lab Project: Module ${String(moduleNumber).padStart(2, '0')}`}
            </h3>
          </div>
          <p className="text-[11px] text-[#9BA8B7] mt-0.5">
            {projectObjective}
          </p>
        </div>

        {/* Score Badge */}
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-[4px] bg-[#162234] border border-[#243044] text-[11px] font-bold text-cyan-400">
            Progress Score: {earnedPoints} / {totalPoints} pts
          </span>
          {earnedPoints >= (isCapstone ? 75 : 60) && (
            <span className="px-2 py-0.5 rounded-[4px] bg-emerald-950/60 border border-emerald-700 text-emerald-300 text-[10px] font-bold uppercase">
              Passed
            </span>
          )}
        </div>
      </div>

      {/* Milestones List */}
      <div className="space-y-2">
        <h4 className="text-[11px] text-[#64748B] uppercase font-bold">
          Deliverable Milestones & Evaluation Rubric:
        </h4>
        <div className="space-y-2">
          {milestones.map((m) => {
            const isDone = !!milestoneStates[m.id];
            return (
              <div
                key={m.id}
                onClick={() => toggleMilestone(m.id)}
                className={`p-3 rounded-[6px] border transition-colors cursor-pointer flex items-start justify-between gap-3 ${
                  isDone
                    ? 'bg-[#121f2d] border-emerald-600/60'
                    : 'bg-[#101724] border-[#1E293B] hover:bg-[#162234]'
                }`}
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <button type="button" className="mt-0.5 shrink-0">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#64748B]" />
                    )}
                  </button>
                  <div>
                    <div className="font-bold text-[#E6EDF3] flex items-center gap-2">
                      <span>{m.title}</span>
                      <span className="text-[10px] text-cyan-400 font-normal">({m.points} pts)</span>
                    </div>
                    <p className="text-[11px] text-[#9BA8B7] mt-0.5 leading-relaxed">{m.deliverable}</p>
                    <div className="mt-1 text-[10px] text-[#64748B]">
                      <strong>Evidence Required: </strong>
                      <span className="text-[#CBD5E1]">{m.verificationEvidence}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Safety & Anti-Cheating Policy */}
      <div className="p-3 rounded-[6px] bg-[#121A26] border border-[#1E293B] space-y-1 text-[11px]">
        <div className="flex items-center gap-2 text-amber-300 font-bold uppercase">
          <AlertTriangle className="w-4 h-4" />
          <span>Strict Scope & Lab Authorization Rule</span>
        </div>
        <p className="text-[#9BA8B7] leading-relaxed">
          All practical exercises must target solely learner-owned hardware, local emulators, or authorized isolated training VLANs. Never scan, probe, or transmit payloads to devices, networks, or cloud endpoints without explicit written authorization.
        </p>
      </div>
    </div>
  );
};
