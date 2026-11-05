'use client';

import React, { useState } from 'react';
import {
  LessonRichContent,
  KnowledgeCheckQuestion,
  PCAPResource,
} from '../../types/course';
import {
  BookOpen,
  Copy,
  Check,
  Eye,
  AlertTriangle,
  ShieldAlert,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Terminal,
  FileCode,
  Layers,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

interface LessonContentRendererProps {
  content?: LessonRichContent;
  pcapResources?: PCAPResource[];
}

export const CopyableFilter: React.FC<{ filter: string; description?: string }> = ({
  filter,
  description,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(filter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-[6px] bg-[#141424] text-white border border-[#243044] font-mono text-xs">
      <div className="flex items-center gap-2 overflow-x-auto">
        <Terminal className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
        <span className="text-[#22D3EE] select-all font-semibold">{filter}</span>
        {description && (
          <span className="text-[#9BA8B7] text-[11px] hidden md:inline truncate">
            — {description}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-[#243044] hover:bg-[#32435f] text-white transition-colors text-[11px] shrink-0 self-end sm:self-auto cursor-pointer"
        aria-label="Copy display filter"
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 text-[#10B981]" />
            <span className="text-[#10B981]">Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3 h-3" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
};

export const InteractiveKnowledgeCheck: React.FC<{
  question: KnowledgeCheckQuestion;
}> = ({ question }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = selectedIdx === question.correctAnswerIndex;

  const handleReset = () => {
    setSelectedIdx(null);
    setSubmitted(false);
  };

  return (
    <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#fbfbfe] dark:bg-[#121A26] p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] bg-[#0E7490]/10 dark:bg-[#22D3EE]/10 text-[#0E7490] dark:text-[#22D3EE] border border-[#0E7490]/20 dark:border-[#22D3EE]/20 text-xs font-mono">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Lesson Knowledge Check</span>
        </div>
        {question.difficulty && (
          <span className="text-[11px] font-mono capitalize text-[#64748B] dark:text-[#9BA8B7]">
            {question.difficulty}
          </span>
        )}
      </div>

      <h4 className="font-semibold text-sm sm:text-base text-[#0F172A] dark:text-[#E6EDF3]">
        {question.question}
      </h4>

      <div className="space-y-2">
        {question.options.map((opt, i) => {
          let optionStyles = 'border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#1A2433] text-[#0F172A] dark:text-[#E6EDF3] hover:border-[#0E7490] dark:hover:border-[#22D3EE]';
          if (submitted) {
            if (i === question.correctAnswerIndex) {
              optionStyles = 'border-[#10B981] bg-[#10B981]/10 text-[#065F46] dark:text-[#34D399] font-medium';
            } else if (i === selectedIdx && !isCorrect) {
              optionStyles = 'border-[#EF4444] bg-[#EF4444]/10 text-[#991B1B] dark:text-[#F87171]';
            } else {
              optionStyles = 'opacity-50 border-[#e4e4ed] dark:border-[#243044]';
            }
          } else if (selectedIdx === i) {
            optionStyles = 'border-[#0E7490] dark:border-[#22D3EE] bg-[#0E7490]/10 dark:bg-[#22D3EE]/10 text-[#0E7490] dark:text-[#22D3EE] font-medium';
          }

          return (
            <label
              key={i}
              className={`flex items-start gap-3 p-3 rounded-[6px] border text-xs sm:text-sm cursor-pointer transition-colors ${optionStyles}`}
            >
              <input
                type="radio"
                name={`kc-${question.question.substring(0, 15)}`}
                checked={selectedIdx === i}
                onChange={() => !submitted && setSelectedIdx(i)}
                disabled={submitted}
                className="mt-0.5 accent-[#0E7490] dark:accent-[#22D3EE]"
              />
              <span className="leading-snug">{opt}</span>
            </label>
          );
        })}
      </div>

      {submitted ? (
        <div className="space-y-3 pt-2">
          <div
            className={`p-3.5 rounded-[6px] border text-xs sm:text-sm leading-relaxed ${
              isCorrect
                ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#065F46] dark:text-[#34D399]'
                : 'bg-[#EF4444]/10 border-[#EF4444]/30 text-[#991B1B] dark:text-[#F87171]'
            }`}
          >
            <div className="font-bold mb-1">
              {isCorrect ? '✓ Correct Answer!' : '✗ Incorrect'}
            </div>
            <p className="text-xs text-[#334155] dark:text-[#CBD5E1]">{question.explanation}</p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1A2433] hover:bg-[#e4e4ed] dark:hover:bg-[#243044] border border-[#e4e4ed] dark:border-[#243044] text-xs font-mono text-[#0F172A] dark:text-[#E6EDF3] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => selectedIdx !== null && setSubmitted(true)}
          disabled={selectedIdx === null}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] bg-[#0E7490] hover:bg-[#0891B2] disabled:opacity-50 text-white font-mono text-xs font-semibold transition-colors cursor-pointer"
        >
          <span>Submit Answer</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export const LessonContentRenderer: React.FC<LessonContentRendererProps> = ({
  content,
  pcapResources = [],
}) => {
  if (!content) return null;

  return (
    <div className="space-y-8 pt-4">
      {/* Introduction */}
      {content.introduction && (
        <div className="prose prose-sm dark:prose-invert max-w-none text-[#334155] dark:text-[#CBD5E1] leading-relaxed text-sm sm:text-base border-l-2 border-[#0E7490] dark:border-[#22D3EE] pl-4">
          <p>{content.introduction}</p>
        </div>
      )}

      {/* Key Terminology */}
      {content.keyTerminology && content.keyTerminology.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#64748B] dark:text-[#9BA8B7] flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#0E7490] dark:text-[#22D3EE]" />
            Key Terminology & Protocol Definitions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {content.keyTerminology.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-[6px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] space-y-1"
              >
                <div className="font-mono font-bold text-xs text-[#0E7490] dark:text-[#22D3EE]">
                  {item.term}
                </div>
                <div className="text-xs text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
                  {item.definition}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Theory Sections */}
      {content.theorySections && content.theorySections.length > 0 && (
        <div className="space-y-4">
          {content.theorySections.map((sec, idx) => (
            <div
              key={idx}
              className="p-5 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] space-y-3"
            >
              <h3 className="font-rajdhani font-bold text-lg text-[#0F172A] dark:text-[#E6EDF3]">
                {sec.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed whitespace-pre-line">
                {sec.content}
              </p>
              {sec.keyPoints && sec.keyPoints.length > 0 && (
                <ul className="space-y-1.5 pt-2 border-t border-[#e4e4ed] dark:border-[#243044]">
                  {sec.keyPoints.map((pt, pIdx) => (
                    <li
                      key={pIdx}
                      className="text-xs text-[#334155] dark:text-[#CBD5E1] flex items-start gap-2"
                    >
                      <span className="text-[#0E7490] dark:text-[#22D3EE] font-bold shrink-0">
                        •
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Protocol Explanations */}
      {content.protocolExplanations && content.protocolExplanations.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#64748B] dark:text-[#9BA8B7] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#0E7490] dark:text-[#22D3EE]" />
            Protocol Header & Architecture Breakdown
          </h3>
          <div className="space-y-3">
            {content.protocolExplanations.map((proto, idx) => (
              <div
                key={idx}
                className="p-4 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#fbfbfe] dark:bg-[#121A26] space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e4e4ed] dark:border-[#243044] pb-2">
                  <span className="font-bold text-sm text-[#0F172A] dark:text-[#E6EDF3]">
                    {proto.protocol}
                  </span>
                  <div className="flex items-center gap-2">
                    {proto.port && (
                      <span className="px-2 py-0.5 rounded-[4px] bg-white dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] font-mono text-[11px] text-[#0E7490] dark:text-[#22D3EE]">
                        Port {proto.port}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-[4px] bg-white dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] font-mono text-[11px] text-[#64748B] dark:text-[#9BA8B7]">
                      {proto.layer}
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
                  {proto.details}
                </p>
                {proto.headerFields && proto.headerFields.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proto.headerFields.map((field, fIdx) => (
                      <span
                        key={fIdx}
                        className="px-2 py-0.5 rounded-[3px] bg-white dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] font-mono text-[10px] text-[#334155] dark:text-[#CBD5E1]"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step-by-Step Practical Procedures */}
      {content.stepByStepProcedures && content.stepByStepProcedures.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#64748B] dark:text-[#9BA8B7] flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#0E7490] dark:text-[#22D3EE]" />
            Step-by-Step Investigation Procedures
          </h3>
          <div className="space-y-3">
            {content.stepByStepProcedures.map((proc, idx) => (
              <div
                key={idx}
                className="p-4 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] space-y-2.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0E7490] text-white font-mono text-[11px] flex items-center justify-center font-bold">
                    {proc.step}
                  </span>
                  <h4 className="font-semibold text-sm text-[#0F172A] dark:text-[#E6EDF3]">
                    {proc.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed pl-7">
                  {proc.instruction}
                </p>
                {proc.filter && (
                  <div className="pl-7">
                    <CopyableFilter filter={proc.filter} description={proc.expectedOutcome} />
                  </div>
                )}
                {proc.expectedOutcome && (
                  <div className="pl-7 text-xs text-[#065F46] dark:text-[#34D399] flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>Expected outcome: {proc.expectedOutcome}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Display Filters */}
      {content.displayFilters && content.displayFilters.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#64748B] dark:text-[#9BA8B7] flex items-center gap-1.5">
            <FileCode className="w-3.5 h-3.5 text-[#0E7490] dark:text-[#22D3EE]" />
            Recommended Wireshark Display Filters
          </h3>
          <div className="space-y-2">
            {content.displayFilters.map((df, idx) => (
              <CopyableFilter key={idx} filter={df.filter} description={df.description} />
            ))}
          </div>
        </div>
      )}

      {/* Observations and Pitfalls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {content.expectedObservations && content.expectedObservations.length > 0 && (
          <div className="p-4 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#fbfbfe] dark:bg-[#121A26] space-y-2">
            <h4 className="font-mono text-xs font-semibold text-[#0E7490] dark:text-[#22D3EE] flex items-center gap-1.5 uppercase tracking-wider">
              <Eye className="w-4 h-4" />
              Expected Observations
            </h4>
            <ul className="space-y-1.5 text-xs text-[#475569] dark:text-[#9BA8B7]">
              {content.expectedObservations.map((obs, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-[#0E7490] dark:text-[#22D3EE] font-bold">•</span>
                  <span>{obs}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {content.commonMistakes && content.commonMistakes.length > 0 && (
          <div className="p-4 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#fbfbfe] dark:bg-[#121A26] space-y-2">
            <h4 className="font-mono text-xs font-semibold text-[#B45309] dark:text-[#FBBF24] flex items-center gap-1.5 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              Common Analysis Pitfalls
            </h4>
            <ul className="space-y-1.5 text-xs text-[#475569] dark:text-[#9BA8B7]">
              {content.commonMistakes.map((mis, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-[#B45309] dark:text-[#FBBF24] font-bold">•</span>
                  <span>{mis}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Security Relevance Alert */}
      {content.securityRelevance && (
        <div className="p-4 rounded-[8px] border border-[#0E7490]/30 dark:border-[#22D3EE]/30 bg-[#0E7490]/5 dark:bg-[#22D3EE]/5 space-y-1.5">
          <div className="font-mono text-xs font-bold text-[#0E7490] dark:text-[#22D3EE] flex items-center gap-1.5 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-[#0E7490] dark:text-[#22D3EE]" />
            SOC & Threat Hunting Operational Relevance
          </div>
          <p className="text-xs sm:text-sm text-[#334155] dark:text-[#CBD5E1] leading-relaxed">
            {content.securityRelevance}
          </p>
        </div>
      )}

      {/* Practical Hands-on Exercise */}
      {content.practicalExercise && (
        <div className="p-5 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e4e4ed] dark:border-[#243044] pb-2">
            <h4 className="font-rajdhani font-bold text-base text-[#0F172A] dark:text-[#E6EDF3]">
              {content.practicalExercise.title}
            </h4>
            {content.practicalExercise.pcapReference && (
              <span className="px-2 py-0.5 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] text-[11px] font-mono text-[#0E7490] dark:text-[#22D3EE] self-start sm:self-auto">
                PCAP: {content.practicalExercise.pcapReference}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm font-semibold text-[#334155] dark:text-[#CBD5E1]">
            Objective: {content.practicalExercise.objective}
          </p>
          <ul className="space-y-1.5 text-xs text-[#475569] dark:text-[#9BA8B7]">
            {content.practicalExercise.instructions.map((ins, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#0E7490] dark:text-[#22D3EE] font-bold">
                  {idx + 1}.
                </span>
                <span>{ins}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Interactive Knowledge Check */}
      {content.knowledgeCheck && (
        <InteractiveKnowledgeCheck question={content.knowledgeCheck} />
      )}

      {/* Lesson Summary */}
      {content.summary && (
        <div className="p-4 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#fbfbfe] dark:bg-[#121A26] space-y-1.5">
          <h4 className="font-mono text-xs font-semibold text-[#0F172A] dark:text-[#E6EDF3] uppercase tracking-wider">
            Lesson Summary
          </h4>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            {content.summary}
          </p>
        </div>
      )}

      {/* Further Reading */}
      {content.furtherReading && content.furtherReading.length > 0 && (
        <div className="space-y-2 pt-2">
          <h4 className="font-mono text-xs uppercase tracking-wider text-[#64748B] dark:text-[#9BA8B7]">
            Authoritative References & RFCs
          </h4>
          <div className="flex flex-wrap gap-2">
            {content.furtherReading.map((ref, idx) => (
              <a
                key={idx}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-white dark:bg-[#121A26] hover:bg-[#f4f4f9] dark:hover:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] text-xs text-[#0F172A] dark:text-[#E6EDF3] hover:text-[#0E7490] dark:hover:text-[#22D3EE] transition-colors"
              >
                <span>{ref.title}</span>
                <ExternalLink className="w-3 h-3 text-[#64748B] dark:text-[#9BA8B7]" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

