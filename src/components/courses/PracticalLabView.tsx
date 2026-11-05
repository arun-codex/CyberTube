'use client';

import React, { useState } from 'react';
import { PracticalLab } from '../../types/course';
import {
  FlaskConical,
  Clock,
  CheckCircle2,
  HardDrive,
  Download,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { CopyableFilter } from './LessonContentRenderer';

interface PracticalLabViewProps {
  lab: PracticalLab;
}

export const PracticalLabView: React.FC<PracticalLabViewProps> = ({ lab }) => {
  const [worksheetValues, setWorksheetValues] = useState<Record<string, string>>({});
  const [expandedHints, setExpandedHints] = useState<Record<string, boolean>>({});

  const handleInputChange = (field: string, val: string) => {
    setWorksheetValues((prev) => ({ ...prev, [field]: val }));
  };

  const toggleHint = (taskId: string) => {
    setExpandedHints((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  return (
    <div className="p-5 sm:p-6 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e4e4ed] dark:border-[#243044] pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] bg-[#0E7490]/10 dark:bg-[#22D3EE]/10 text-[#0E7490] dark:text-[#22D3EE] border border-[#0E7490]/20 dark:border-[#22D3EE]/20 text-xs font-mono">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Assessed Module Lab</span>
          </div>
          <h3 className="font-rajdhani font-bold text-xl text-[#0F172A] dark:text-[#E6EDF3]">
            {lab.title}
          </h3>
          <p className="text-xs text-[#475569] dark:text-[#9BA8B7]">
            {lab.objective}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto font-mono text-xs">
          <span className="flex items-center gap-1 text-[#64748B] dark:text-[#9BA8B7]">
            <Clock className="w-3.5 h-3.5" />
            {lab.estimatedMinutes} mins
          </span>
          <span className="px-2 py-0.5 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] text-[#475569] dark:text-[#9BA8B7] capitalize">
            {lab.difficulty}
          </span>
        </div>
      </div>

      {/* Target PCAP Card */}
      <div className="p-4 rounded-[6px] bg-[#fbfbfe] dark:bg-[#1A2433]/50 border border-[#e4e4ed] dark:border-[#243044] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <HardDrive className="w-5 h-5 text-[#0E7490] dark:text-[#22D3EE] shrink-0" />
          <div>
            <div className="font-bold text-xs text-[#0F172A] dark:text-[#E6EDF3]">
              Target Capture: {lab.pcapSource.fileName}
            </div>
            {lab.pcapSource.sha256 && (
              <div className="font-mono text-[10px] text-[#64748B] dark:text-[#9BA8B7] truncate max-w-sm">
                SHA256: {lab.pcapSource.sha256}
              </div>
            )}
          </div>
        </div>
        <a
          href={lab.pcapSource.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#0E7490] hover:bg-[#0891B2] text-white font-mono text-xs font-medium transition-colors self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Lab PCAP</span>
        </a>
      </div>

      {/* Lab Tasks */}
      <div className="space-y-3">
        <h4 className="font-mono text-xs font-semibold text-[#0F172A] dark:text-[#E6EDF3] uppercase tracking-wider">
          Lab Investigation Tasks
        </h4>
        <div className="space-y-2.5">
          {lab.tasks.map((task, idx) => {
            const hasHint = Boolean(task.hint || task.filterSuggestion);
            const isHintOpen = expandedHints[task.id];

            return (
              <div
                key={task.id}
                className="p-3.5 rounded-[6px] border border-[#e4e4ed] dark:border-[#243044] bg-[#fbfbfe] dark:bg-[#121A26] space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <span className="font-mono font-bold text-xs text-[#0E7490] dark:text-[#22D3EE] shrink-0 mt-0.5">
                      Task {idx + 1}:
                    </span>
                    <span className="text-xs sm:text-sm text-[#0F172A] dark:text-[#E6EDF3] leading-snug">
                      {task.description}
                    </span>
                  </div>
                  {hasHint && (
                    <button
                      type="button"
                      onClick={() => toggleHint(task.id)}
                      className="text-[11px] font-mono text-[#0E7490] dark:text-[#22D3EE] hover:underline flex items-center gap-0.5 shrink-0 cursor-pointer"
                    >
                      <span>Hint</span>
                      {isHintOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  )}
                </div>

                {hasHint && isHintOpen && (
                  <div className="p-3 rounded-[4px] bg-white dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] text-xs space-y-2">
                    {task.hint && (
                      <p className="text-[#475569] dark:text-[#9BA8B7]">{task.hint}</p>
                    )}
                    {task.filterSuggestion && (
                      <CopyableFilter filter={task.filterSuggestion} />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Evidence Worksheet */}
      {lab.evidenceWorksheet && lab.evidenceWorksheet.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-mono text-xs font-semibold text-[#0F172A] dark:text-[#E6EDF3] uppercase tracking-wider">
            Evidence Documentation Worksheet
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lab.evidenceWorksheet.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-[6px] border border-[#e4e4ed] dark:border-[#243044] bg-[#fbfbfe] dark:bg-[#121A26] space-y-1.5"
              >
                <label className="block text-xs font-semibold text-[#0F172A] dark:text-[#E6EDF3]">
                  {item.field}
                </label>
                <p className="text-[11px] text-[#64748B] dark:text-[#9BA8B7]">
                  {item.prompt}
                </p>
                <input
                  type="text"
                  placeholder={`e.g. ${item.expectedEvidenceType}`}
                  value={worksheetValues[item.field] || ''}
                  onChange={(e) => handleInputChange(item.field, e.target.value)}
                  className="w-full px-3 py-1.5 rounded-[4px] bg-white dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] text-xs text-[#0F172A] dark:text-[#E6EDF3] font-mono focus:outline-hidden focus:border-[#0E7490] dark:focus:border-[#22D3EE]"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completion Criteria */}
      {lab.completionCriteria && lab.completionCriteria.length > 0 && (
        <div className="p-4 rounded-[6px] bg-[#fbfbfe] dark:bg-[#121A26] border border-[#e4e4ed] dark:border-[#243044] space-y-2">
          <h4 className="font-mono text-xs font-semibold text-[#065F46] dark:text-[#34D399] uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            Lab Completion Verification Criteria
          </h4>
          <ul className="space-y-1 text-xs text-[#475569] dark:text-[#9BA8B7]">
            {lab.completionCriteria.map((crit, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-[#10B981] font-bold">•</span>
                <span>{crit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

