'use client';

import React, { useState, useEffect } from 'react';
import { HARDWARE_CATALOG, HardwarePart } from '../../../data/iot/hardware-catalog';
import { CheckSquare, Square, Wrench, ShieldAlert, Cpu, Laptop, ExternalLink, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface LessonKitPanelProps {
  lessonSlug: string;
  moduleOrder?: number;
}

export const LessonKitPanel: React.FC<LessonKitPanelProps> = ({ lessonSlug, moduleOrder = 1 }) => {
  const [ownedPartIds, setOwnedPartIds] = useState<string[]>([]);

  // Load owned items from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem('cybertube-owned-hardware');
      if (saved) {
        setOwnedPartIds(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to read owned hardware state from localStorage', e);
    }
  }, []);

  const toggleOwnedPart = (partId: string) => {
    setOwnedPartIds((prev) => {
      const next = prev.includes(partId) ? prev.filter((id) => id !== partId) : [...prev, partId];
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('cybertube-owned-hardware', JSON.stringify(next));
        } catch (e) {}
      }
      return next;
    });
  };

  // Determine parts for this lesson
  const lessonParts = HARDWARE_CATALOG.filter((p) => p.relatedLessonSlugs.includes(lessonSlug));
  // If no parts specifically tagged with slug, show baseline basic kit parts relevant to module phase
  const displayParts: HardwarePart[] =
    lessonParts.length > 0
      ? lessonParts
      : moduleOrder <= 6
      ? HARDWARE_CATALOG.filter((p) => p.kitTier === 'basic').slice(0, 5)
      : moduleOrder <= 20
      ? HARDWARE_CATALOG.filter((p) => p.kitTier === 'basic' || p.kitTier === 'intermediate').slice(0, 6)
      : HARDWARE_CATALOG.filter((p) => p.kitTier === 'advanced' || p.partId === 'esp32-devkit-v1').slice(0, 4);

  const ownedCount = displayParts.filter((p) => ownedPartIds.includes(p.partId)).length;
  const isKitReady = ownedCount === displayParts.length && displayParts.length > 0;

  return (
    <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#0c121c] p-4 sm:p-5 text-[#E6EDF3] space-y-4 font-mono text-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1E293B]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-[4px] bg-[#0E7490]/20 text-[#22D3EE] font-bold">
              <Wrench className="w-4 h-4" />
            </span>
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#E6EDF3]">
              Lesson Hardware & Tools Bill of Materials (BOM)
            </h3>
          </div>
          <p className="text-[11px] text-[#9BA8B7] mt-0.5">
            Verified component requirements, pinout connections, safety rules, and zero-cost simulation fallbacks.
          </p>
        </div>

        {/* Readiness Badge */}
        <span
          className={`px-2.5 py-1 rounded-[4px] text-[11px] font-semibold flex items-center gap-1.5 border ${
            isKitReady
              ? 'bg-emerald-950/50 text-emerald-300 border-emerald-700/60'
              : 'bg-[#162234] text-[#9BA8B7] border-[#243044]'
          }`}
        >
          {isKitReady ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Lab Hardware Ready ({ownedCount}/{displayParts.length})</span>
            </>
          ) : (
            <span>Lab Kit Progress: {ownedCount}/{displayParts.length} Owned</span>
          )}
        </span>
      </div>

      {/* Hardware BOM Table */}
      <div className="overflow-x-auto rounded-[6px] border border-[#1E293B]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#121A26] border-b border-[#1E293B] text-[10px] text-[#64748B] uppercase">
              <th className="p-2.5 w-10 text-center">Have</th>
              <th className="p-2.5">Component & Specification</th>
              <th className="p-2.5 w-24">Category</th>
              <th className="p-2.5 w-24">Qty</th>
              <th className="p-2.5 w-28">Voltage Limit</th>
              <th className="p-2.5">Safety & Wiring Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E293B] bg-[#0c1420] text-[11px]">
            {displayParts.map((part) => {
              const isOwned = ownedPartIds.includes(part.partId);
              return (
                <tr key={part.partId} className="hover:bg-[#121A26]/80 transition-colors">
                  {/* Checkbox */}
                  <td className="p-2.5 text-center">
                    <button
                      type="button"
                      onClick={() => toggleOwnedPart(part.partId)}
                      className="text-[#9BA8B7] hover:text-[#22D3EE] transition-colors cursor-pointer"
                      title={isOwned ? 'Mark unowned' : 'Mark as owned'}
                    >
                      {isOwned ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Square className="w-4 h-4 text-[#64748B]" />
                      )}
                    </button>
                  </td>

                  {/* Component Details */}
                  <td className="p-2.5">
                    <div className="font-bold text-[#E6EDF3]">{part.name}</div>
                    <div className="text-[10px] text-[#64748B]">{part.packageType}</div>
                  </td>

                  {/* Category */}
                  <td className="p-2.5">
                    <span className="px-1.5 py-0.2 rounded-[3px] bg-[#162234] text-cyan-400 text-[10px] uppercase font-semibold">
                      {part.category}
                    </span>
                  </td>

                  {/* Quantity */}
                  <td className="p-2.5 font-bold text-[#CBD5E1]">
                    {part.quantityInKit}x
                  </td>

                  {/* Voltage */}
                  <td className="p-2.5">
                    <span className="text-amber-400 font-semibold">{part.logicLevelLimit}</span>
                    <span className="text-[10px] text-[#64748B] block">({part.voltageMin}-{part.voltageMax}V)</span>
                  </td>

                  {/* Safety & Wiring */}
                  <td className="p-2.5 text-[#CBD5E1] text-[10.5px] leading-relaxed">
                    {part.safetyNotes}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Software & Simulation Alternative Banner */}
      <div className="p-3 rounded-[6px] bg-[#121A26] border border-[#1E293B] space-y-1.5 text-[11px]">
        <div className="flex items-center gap-2 text-cyan-400 font-bold">
          <Laptop className="w-4 h-4" />
          <span>Zero-Cost Simulation Fallback Available</span>
        </div>
        <p className="text-[#9BA8B7] leading-relaxed">
          Physical hardware is recommended for hands-on pinout and multimeter measurement, but every lesson in this course can be fully simulated in Wokwi (ESP32, Wi-Fi, sensors, actuators, serial logging) or an isolated Linux VM without purchasing components.
        </p>
      </div>
    </div>
  );
};
