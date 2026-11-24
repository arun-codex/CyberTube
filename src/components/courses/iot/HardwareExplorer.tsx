'use client';

import React, { useState } from 'react';
import { HARDWARE_CATALOG, HardwarePart } from '../../../data/iot/hardware-catalog';
import { Search, Filter, ShieldAlert, Cpu, ExternalLink, AlertCircle, CheckCircle2 } from 'lucide-react';

export const HardwareExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePart, setActivePart] = useState<HardwarePart>(HARDWARE_CATALOG[0]);

  const filteredParts = HARDWARE_CATALOG.filter((part) => {
    if (selectedCategory !== 'all' && part.category !== selectedCategory) return false;
    if (selectedTier !== 'all' && part.kitTier !== selectedTier) return false;
    if (
      searchQuery &&
      !part.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !part.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const renderSchematicSymbol = (partId: string) => {
    switch (partId) {
      case 'resistor-220-ohm':
      case 'resistor-10k-ohm':
        return (
          <svg viewBox="0 0 100 40" className="w-20 h-8 stroke-current text-amber-400">
            <path d="M 10 20 L 25 20 L 30 10 L 40 30 L 50 10 L 60 30 L 70 10 L 75 20 L 90 20" fill="none" strokeWidth="2" />
          </svg>
        );
      case 'led-5mm-assorted':
        return (
          <svg viewBox="0 0 100 40" className="w-20 h-8 stroke-current text-rose-400">
            <line x1="10" y1="20" x2="35" y2="20" strokeWidth="2" />
            <polygon points="35,10 35,30 55,20" fill="currentColor" fillOpacity="0.2" strokeWidth="2" />
            <line x1="55" y1="10" x2="55" y2="30" strokeWidth="2" />
            <line x1="55" y1="20" x2="90" y2="20" strokeWidth="2" />
            {/* Emission Arrows */}
            <line x1="45" y1="8" x2="55" y2="2" strokeWidth="1.5" />
            <line x1="52" y1="12" x2="62" y2="6" strokeWidth="1.5" />
          </svg>
        );
      case 'transistor-2n2222':
        return (
          <svg viewBox="0 0 100 50" className="w-20 h-10 stroke-current text-cyan-400">
            <line x1="10" y1="25" x2="35" y2="25" strokeWidth="2" />
            <line x1="35" y1="10" x2="35" y2="40" strokeWidth="3" />
            {/* Collector */}
            <line x1="35" y1="18" x2="65" y2="8" strokeWidth="2" />
            <line x1="65" y1="8" x2="85" y2="8" strokeWidth="2" />
            {/* Emitter with arrow */}
            <line x1="35" y1="32" x2="65" y2="42" strokeWidth="2" />
            <polygon points="58,35 68,43 54,43" fill="currentColor" />
            <line x1="65" y1="42" x2="85" y2="42" strokeWidth="2" />
          </svg>
        );
      case 'diode-1n4007':
        return (
          <svg viewBox="0 0 100 40" className="w-20 h-8 stroke-current text-emerald-400">
            <line x1="10" y1="20" x2="40" y2="20" strokeWidth="2" />
            <polygon points="40,10 40,30 60,20" fill="currentColor" fillOpacity="0.2" strokeWidth="2" />
            <line x1="60" y1="10" x2="60" y2="30" strokeWidth="2" />
            <line x1="60" y1="20" x2="90" y2="20" strokeWidth="2" />
          </svg>
        );
      case 'pushbutton-tactile':
        return (
          <svg viewBox="0 0 100 40" className="w-20 h-8 stroke-current text-blue-400">
            <line x1="10" y1="25" x2="35" y2="25" strokeWidth="2" />
            <line x1="65" y1="25" x2="90" y2="25" strokeWidth="2" />
            <circle cx="35" cy="25" r="3" fill="currentColor" />
            <circle cx="65" cy="25" r="3" fill="currentColor" />
            <line x1="30" y1="15" x2="70" y2="15" strokeWidth="2" />
            <line x1="50" y1="15" x2="50" y2="5" strokeWidth="2" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 100 40" className="w-20 h-8 stroke-current text-purple-400">
            <rect x="20" y="8" width="60" height="24" rx="3" fill="currentColor" fillOpacity="0.1" strokeWidth="2" />
            <line x1="5" y1="20" x2="20" y2="20" strokeWidth="2" />
            <line x1="80" y1="20" x2="95" y2="20" strokeWidth="2" />
            <text x="32" y="24" fill="currentColor" fontSize="9" fontWeight="bold">IC</text>
          </svg>
        );
    }
  };

  return (
    <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#0c121c] p-4 sm:p-5 text-[#E6EDF3] space-y-4 font-mono">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1E293B]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-[4px] bg-cyan-500/20 text-cyan-400 text-xs font-bold">
              BOM EXPLORER
            </span>
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#E6EDF3]">
              Curated IoT Hardware & Electronics Component Catalog
            </h3>
          </div>
          <p className="text-[11px] text-[#9BA8B7] mt-0.5">
            Datasheet-backed specifications, 3.3V logic boundaries, pinouts, and safe substitutions.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-3 rounded-[6px] bg-[#121A26] border border-[#1E293B] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search components, pins, specs..."
              className="pl-8 pr-3 py-1.5 rounded-[4px] bg-[#1A2638] border border-[#243044] text-xs text-[#E6EDF3] focus:outline-none focus:border-cyan-500 w-48 sm:w-56"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1.5 rounded-[4px] bg-[#1A2638] border border-[#243044] text-[#E6EDF3] focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="controller">Controllers & DevKits</option>
            <option value="discrete">Discretes (R, LED, Transistor)</option>
            <option value="sensor">Sensors</option>
            <option value="actuator">Actuators</option>
            <option value="tool">Tools & Multimeters</option>
            <option value="interface">Displays & Buses</option>
            <option value="gateway">Gateway & Hosts</option>
          </select>

          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="px-2.5 py-1.5 rounded-[4px] bg-[#1A2638] border border-[#243044] text-[#E6EDF3] focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="all">All Kit Tiers</option>
            <option value="basic">Basic Starter Kit</option>
            <option value="intermediate">Intermediate Kit</option>
            <option value="advanced">Advanced Security Kit</option>
          </select>
        </div>

        <span className="text-[11px] text-[#64748B]">
          {filteredParts.length} Components Available
        </span>
      </div>

      {/* Master/Detail Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Parts Grid (5 cols) */}
        <div className="lg:col-span-5 space-y-2 max-h-[460px] overflow-y-auto pr-1">
          {filteredParts.map((part) => {
            const isSelected = activePart.partId === part.partId;
            return (
              <div
                key={part.partId}
                onClick={() => setActivePart(part)}
                className={`p-3 rounded-[6px] border transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#1E293B] border-cyan-500'
                    : 'bg-[#101724] border-[#1E293B] hover:bg-[#162234]'
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded-[3px] bg-[#162234] text-cyan-400">
                      {part.category}
                    </span>
                    <span className="text-[10px] text-[#64748B] uppercase">{part.kitTier}</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#E6EDF3] truncate">{part.name}</h4>
                  <div className="text-[11px] text-[#64748B] mt-0.5">
                    Operating: {part.voltageMin}V – {part.voltageMax}V DC • {part.logicLevelLimit}
                  </div>
                </div>

                <div className="shrink-0">
                  {renderSchematicSymbol(part.partId)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Part Detail Drawer (7 cols) */}
        <div className="lg:col-span-7 p-4 rounded-[6px] border border-[#1E293B] bg-[#0c1420] space-y-4 text-xs">
          {/* Title & Symbol */}
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#1E293B] pb-3">
            <div>
              <span className="text-[10px] text-cyan-400 uppercase font-semibold">
                Part ID: {activePart.partId}
              </span>
              <h3 className="font-bold text-sm sm:text-base text-[#E6EDF3]">{activePart.name}</h3>
              <p className="text-[11px] text-[#9BA8B7] mt-1 leading-relaxed">
                {activePart.description}
              </p>
            </div>
            <div className="p-2 rounded-[6px] bg-[#121A26] border border-[#243044]">
              {renderSchematicSymbol(activePart.partId)}
            </div>
          </div>

          {/* Electrical Specs Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            <div className="p-2 rounded-[4px] bg-[#121A26] border border-[#1E293B]">
              <span className="text-[#64748B] block text-[10px]">Voltage Range:</span>
              <span className="font-bold text-[#E6EDF3]">{activePart.voltageMin}V – {activePart.voltageMax}V</span>
            </div>
            <div className="p-2 rounded-[4px] bg-[#121A26] border border-[#1E293B]">
              <span className="text-[#64748B] block text-[10px]">Logic Level:</span>
              <span className="font-bold text-cyan-400">{activePart.logicLevelLimit}</span>
            </div>
            <div className="p-2 rounded-[4px] bg-[#121A26] border border-[#1E293B]">
              <span className="text-[#64748B] block text-[10px]">Typical Current:</span>
              <span className="font-bold text-[#E6EDF3]">{activePart.typicalCurrentMa} mA</span>
            </div>
            <div className="p-2 rounded-[4px] bg-[#121A26] border border-[#1E293B]">
              <span className="text-[#64748B] block text-[10px]">Package Form:</span>
              <span className="font-bold text-[#E6EDF3] truncate block">{activePart.packageType.split(' ')[0]}</span>
            </div>
          </div>

          {/* Pinout Mapping */}
          {activePart.pinout.length > 0 && (
            <div>
              <span className="text-[11px] text-[#64748B] uppercase font-bold block mb-1">
                Pinout & Interface Mapping:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] max-h-36 overflow-y-auto pr-1">
                {activePart.pinout.map((p, idx) => (
                  <div key={idx} className="p-1.5 rounded-[4px] bg-[#101724] border border-[#1E293B] flex items-start gap-2">
                    <span className="font-bold text-amber-300 shrink-0">{p.pin}:</span>
                    <span className="text-[#CBD5E1] truncate">{p.function}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Safety Warning */}
          <div className="p-2.5 rounded-[4px] bg-rose-950/40 border border-rose-800/60 text-[11px] text-rose-300 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold uppercase text-rose-200">Electrical Safety Rule: </strong>
              <span>{activePart.safetyNotes}</span>
            </div>
          </div>

          {/* Simulation Alternative & Substitutions */}
          <div className="space-y-1.5 text-[11px] border-t border-[#1E293B] pt-3">
            <div>
              <span className="text-[#64748B]">Zero-Cost Simulation Alternative: </span>
              <span className="text-emerald-400">{activePart.simulationAlternative}</span>
            </div>
            <div>
              <span className="text-[#64748B]">Compatible Substitutions: </span>
              <span className="text-[#CBD5E1]">{activePart.substitutions.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
