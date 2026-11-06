'use client';

import React, { useState, useEffect } from 'react';
import { CapstoneAssessment, CapstoneSubmissionState } from '../../types/course';
import {
  ShieldAlert,
  Award,
  CheckCircle2,
  HardDrive,
  Download,
  FileCheck2,
  Check,
  RotateCcw,
  AlertCircle,
  FileText,
  HelpCircle,
} from 'lucide-react';
import { cloudCourseProgressService } from '../../lib/cloud-course-progress';

interface CapstoneAssessmentViewProps {
  capstone: CapstoneAssessment;
  courseId: string;
}

const TECHNICAL_KEYWORDS = [
  'packet', 'pcap', 'ip', 'tcp', 'udp', 'dns', 'http', 'tls',
  'port', '10.', '192.', 'c2', 'beacon', 'filter', 'payload',
  'handshake', 'wireshark', 'stream', 'exfiltration', 'arp', 'icmp',
  'sni', 'frame', 'ack', 'syn', 'fin', 'tshark', 'hash'
];

export const CapstoneAssessmentView: React.FC<CapstoneAssessmentViewProps> = ({
  capstone,
  courseId,
}) => {
  const [submissions, setSubmissions] = useState<Record<string, string>>({});
  const [selfScores, setSelfScores] = useState<Record<string, number>>({});
  const [completenessPassed, setCompletenessPassed] = useState(false);
  const [completenessFeedback, setCompletenessFeedback] = useState<string[]>([]);
  const [hasEvaluatedCompleteness, setHasEvaluatedCompleteness] = useState(false);
  const [selfAssessedPassed, setSelfAssessedPassed] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  // Restore saved state on mount or course change
  useEffect(() => {
    const progress = cloudCourseProgressService.getProgress(courseId);
    const saved = progress.capstoneSubmission;
    if (saved && saved.capstoneId === capstone.id) {
      setSubmissions(saved.submissionSections || {});
      setSelfScores(saved.selfAssessmentScores || {});
      setCompletenessPassed(!!saved.completenessCheckPassed);
      setSelfAssessedPassed(!!saved.isSelfAssessedPassed);
      if (saved.completenessCheckPassed) {
        setHasEvaluatedCompleteness(true);
        setIsEditing(false);
      }
    }
  }, [courseId, capstone.id]);

  const handleTextChange = (id: string, text: string) => {
    setSubmissions((prev) => {
      const next = { ...prev, [id]: text };
      saveCurrentState(next, selfScores, completenessPassed, selfAssessedPassed);
      return next;
    });
  };

  const handleScoreChange = (sectionId: string, val: number, maxMarks: number) => {
    const clamped = Math.max(0, Math.min(maxMarks, isNaN(val) ? 0 : val));
    const nextScores = { ...selfScores, [sectionId]: clamped };
    setSelfScores(nextScores);

    const total = calculateTotalSelfScore(nextScores);
    const passed = completenessPassed && total >= capstone.passingScore;
    setSelfAssessedPassed(passed);
    saveCurrentState(submissions, nextScores, completenessPassed, passed);

    if (cloudCourseProgressService.recordCapstoneScore) {
      cloudCourseProgressService.recordCapstoneScore(courseId, total);
    }
  };

  const calculateTotalSelfScore = (scores = selfScores): number => {
    return capstone.submissionSections.reduce((acc, sec) => acc + (scores[sec.id] || 0), 0);
  };

  const saveCurrentState = (
    subMap: Record<string, string>,
    scoreMap: Record<string, number>,
    isComplete: boolean,
    isPassed: boolean
  ) => {
    const total = calculateTotalSelfScore(scoreMap);
    const submissionState: CapstoneSubmissionState = {
      capstoneId: capstone.id,
      submissionSections: subMap,
      selfAssessmentScores: scoreMap,
      selfAssessmentTotal: total,
      completenessCheckPassed: isComplete,
      isSelfAssessedPassed: isPassed,
      submittedAt: isComplete ? new Date().toISOString() : undefined,
    };
    if (cloudCourseProgressService.recordCapstoneSubmission) {
      cloudCourseProgressService.recordCapstoneSubmission(courseId, submissionState);
    }
  };

  const runCompletenessCheck = () => {
    const issues: string[] = [];
    let allValid = true;

    capstone.submissionSections.forEach((sec) => {
      const text = (submissions[sec.id] || '').trim();
      const words = text.split(/\s+/).filter(Boolean);

      // Must have at least 25 words (100+ chars)
      if (text.length < 100 || words.length < 20) {
        allValid = false;
        issues.push(`"${sec.title}": Requires comprehensive technical findings (minimum 20 words / 100 characters). Currently ${words.length} words.`);
        return;
      }

      // Check for presence of real technical forensic indicators (reject repetitive non-technical junk)
      const lower = text.toLowerCase();
      const technicalMatches = TECHNICAL_KEYWORDS.filter((kw) => lower.includes(kw));
      if (technicalMatches.length < 2) {
        allValid = false;
        issues.push(`"${sec.title}": Must cite technical packet evidence, IP addresses, protocols, or Wireshark display filter references.`);
      }
    });

    setCompletenessFeedback(issues);
    setHasEvaluatedCompleteness(true);
    setCompletenessPassed(allValid);

    const total = calculateTotalSelfScore();
    const passed = allValid && total >= capstone.passingScore;
    setSelfAssessedPassed(passed);
    saveCurrentState(submissions, selfScores, allValid, passed);

    if (allValid) {
      setIsEditing(false);
    }
  };

  const totalSelfScore = calculateTotalSelfScore();
  const passingScore = capstone.passingScore || 75;

  return (
    <div className="p-5 sm:p-8 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] space-y-8">
      {/* Banner */}
      <div className="space-y-3 border-b border-[#e4e4ed] dark:border-[#243044] pb-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] bg-[#0E7490]/10 dark:bg-[#22D3EE]/10 text-[#0E7490] dark:text-[#22D3EE] border border-[#0E7490]/20 dark:border-[#22D3EE]/20 text-xs font-mono">
            <Award className="w-3.5 h-3.5" />
            <span>Assessed Masterclass Capstone</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-2 py-0.5 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] text-[#475569] dark:text-[#9BA8B7]">
              Total: {capstone.totalMarks} Marks
            </span>
            <span className="px-2 py-0.5 rounded-[4px] bg-[#10B981]/10 text-[#065F46] dark:text-[#34D399] border border-[#10B981]/20">
              Pass: {passingScore}/100
            </span>
          </div>
        </div>

        <h3 className="font-rajdhani font-bold text-2xl sm:text-3xl text-[#0F172A] dark:text-[#E6EDF3] tracking-tight">
          {capstone.title}
        </h3>

        <div className="p-4 rounded-[6px] bg-[#fbfbfe] dark:bg-[#1A2433]/50 border border-[#e4e4ed] dark:border-[#243044] space-y-2">
          <div className="font-mono text-xs font-bold text-[#0E7490] dark:text-[#22D3EE] uppercase tracking-wider">
            Operational Incident Scenario
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            {capstone.scenario}
          </p>
        </div>
      </div>

      {/* Target Evidence Capture */}
      <div className="p-4 rounded-[6px] bg-[#fbfbfe] dark:bg-[#121A26] border border-[#e4e4ed] dark:border-[#243044] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <HardDrive className="w-5 h-5 text-[#0E7490] dark:text-[#22D3EE] shrink-0" />
          <div>
            <div className="font-bold text-sm text-[#0F172A] dark:text-[#E6EDF3]">
              Evidence File: {capstone.pcapSource.fileName}
            </div>
            {capstone.pcapSource.sha256 && (
              <div className="font-mono text-[11px] text-[#64748B] dark:text-[#9BA8B7] truncate max-w-sm">
                SHA-256: {capstone.pcapSource.sha256}
              </div>
            )}
          </div>
        </div>
        <a
          href={capstone.pcapSource.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] bg-[#0E7490] hover:bg-[#0891B2] text-white font-mono text-xs font-medium transition-colors self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Capstone PCAP</span>
        </a>
      </div>

      {/* 6-Part Assessment Rubric */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#e4e4ed] dark:border-[#243044] pb-2">
          <h4 className="font-mono text-xs font-semibold text-[#0F172A] dark:text-[#E6EDF3] uppercase tracking-wider">
            Assessment Rubric & Grading Criteria (100 Marks)
          </h4>
          <span className="text-xs font-mono text-[#64748B] dark:text-[#9BA8B7]">
            Pass Threshold: {passingScore} / 100 Marks
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {capstone.rubric.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-[6px] border border-[#e4e4ed] dark:border-[#243044] bg-[#fbfbfe] dark:bg-[#121A26] space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#0F172A] dark:text-[#E6EDF3]">
                    {item.category}
                  </span>
                  <span className="px-1.5 py-0.5 rounded-[3px] bg-[#0E7490]/10 text-[#0E7490] dark:text-[#22D3EE] font-mono text-[10px] font-bold">
                    {item.marks} pts
                  </span>
                </div>
                <ul className="space-y-1 text-[11px] text-[#64748B] dark:text-[#9BA8B7]">
                  {item.criteria.map((crit, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-1">
                      <span className="text-[#0E7490] dark:text-[#22D3EE]">•</span>
                      <span>{crit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Structured Student Incident Report Form */}
      <div className="space-y-6 pt-4 border-t border-[#e4e4ed] dark:border-[#243044]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="font-rajdhani font-bold text-xl text-[#0F172A] dark:text-[#E6EDF3]">
              Structured Forensic Incident Report
            </h4>
            <p className="text-xs text-[#64748B] dark:text-[#9BA8B7]">
              Document your investigation across all 6 required sections with specific display filter citations, IP addresses, and timestamps.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing && completenessPassed && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1A2433] hover:bg-[#e4e4ed] dark:hover:bg-[#243044] border border-[#e4e4ed] dark:border-[#243044] text-xs font-mono text-[#0F172A] dark:text-[#E6EDF3] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Revise Report</span>
              </button>
            )}
          </div>
        </div>

        <div className="space-y-5">
          {capstone.submissionSections.map((sec, idx) => (
            <div
              key={sec.id}
              className="p-5 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#fbfbfe] dark:bg-[#121A26] space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h5 className="font-bold text-sm text-[#0F172A] dark:text-[#E6EDF3]">
                    {idx + 1}. {sec.title}
                  </h5>
                  <p className="text-xs text-[#64748B] dark:text-[#9BA8B7] mt-0.5">
                    {sec.prompt}
                  </p>
                </div>
                <span className="font-mono text-xs px-2 py-0.5 rounded-[4px] bg-[#0E7490]/10 text-[#0E7490] dark:text-[#22D3EE] font-medium shrink-0">
                  Max: {sec.maxMarks} Marks
                </span>
              </div>

              <textarea
                rows={4}
                disabled={!isEditing && completenessPassed}
                placeholder="Document your forensic evidence, display filter chains, packet offsets, and analysis..."
                value={submissions[sec.id] || ''}
                onChange={(e) => handleTextChange(sec.id, e.target.value)}
                className="w-full p-3 rounded-[6px] bg-white dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] text-xs sm:text-sm text-[#0F172A] dark:text-[#E6EDF3] focus:outline-hidden focus:border-[#0E7490] dark:focus:border-[#22D3EE] font-mono leading-relaxed disabled:opacity-75"
              />

              <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] dark:text-[#9BA8B7]">
                <span>
                  Words: {(submissions[sec.id] || '').trim().split(/\s+/).filter(Boolean).length}
                </span>
                <span>
                  Characters: {(submissions[sec.id] || '').length}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Validation & Feedback Box */}
        {hasEvaluatedCompleteness && (
          <div
            className={`p-4 rounded-[6px] border text-xs leading-relaxed space-y-2 ${
              completenessPassed
                ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#065F46] dark:text-[#34D399]'
                : 'bg-[#EF4444]/10 border-[#EF4444]/30 text-[#991B1B] dark:text-[#F87171]'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              {completenessPassed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Structural Completeness Verification Passed</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-[#EF4444]" />
                  <span>Structural Verification Incomplete</span>
                </>
              )}
            </div>

            {completenessPassed ? (
              <p className="text-xs">
                All 6 report sections meet structural depth requirements and cite specific technical packet indicators. Please complete your rubric self-assessment below.
              </p>
            ) : (
              <div className="space-y-1 pt-1">
                <p className="font-semibold text-xs">Required Corrections:</p>
                <ul className="list-disc list-inside space-y-0.5 text-xs">
                  {completenessFeedback.map((issue, i) => (
                    <li key={i}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Action Button: Run Completeness Check */}
        {isEditing && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={runCompletenessCheck}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[6px] bg-[#0E7490] hover:bg-[#0891B2] text-white font-mono text-xs font-semibold transition-colors cursor-pointer shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>Submit Capstone for Evaluation</span>
            </button>
          </div>
        )}
      </div>

      {/* Learner Rubric Self-Assessment Section */}
      <div className="space-y-5 pt-6 border-t border-[#e4e4ed] dark:border-[#243044]">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-rajdhani font-bold text-xl text-[#0F172A] dark:text-[#E6EDF3]">
              Learner Rubric Self-Assessment
            </h4>
            <p className="text-xs text-[#64748B] dark:text-[#9BA8B7] leading-relaxed max-w-2xl">
              Evaluate your completed incident report against the masterclass rubric criteria below. Assign scores honestly according to evidence completeness. Passing requires a self-assessed total score of at least {passingScore}/100.
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xs font-mono text-[#64748B] dark:text-[#9BA8B7]">Self-Assessed Score</div>
            <div className="font-mono font-bold text-2xl text-[#0F172A] dark:text-[#E6EDF3]">
              {totalSelfScore} <span className="text-sm font-normal text-[#64748B]">/ 100</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capstone.submissionSections.map((sec, idx) => (
            <div
              key={sec.id}
              className="p-4 rounded-[6px] border border-[#e4e4ed] dark:border-[#243044] bg-[#fbfbfe] dark:bg-[#1A2433]/30 space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#0F172A] dark:text-[#E6EDF3]">
                  {idx + 1}. {sec.title}
                </span>
                <span className="font-mono text-xs text-[#64748B] dark:text-[#9BA8B7]">
                  Max: {sec.maxMarks}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[11px] font-mono text-[#64748B] dark:text-[#9BA8B7]">
                  Assessed Score:
                </label>
                <input
                  type="number"
                  min={0}
                  max={sec.maxMarks}
                  value={selfScores[sec.id] ?? ''}
                  placeholder={`0-${sec.maxMarks}`}
                  onChange={(e) => handleScoreChange(sec.id, parseInt(e.target.value, 10), sec.maxMarks)}
                  className="w-20 px-2 py-1 rounded-[4px] bg-white dark:bg-[#1A2433] border border-[#e4e4ed] dark:border-[#243044] text-xs font-mono text-center focus:outline-hidden focus:border-[#0E7490] dark:focus:border-[#22D3EE]"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Final Status Card */}
        <div
          className={`p-5 rounded-[8px] border space-y-2 ${
            selfAssessedPassed
              ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#065F46] dark:text-[#34D399]'
              : 'bg-[#f4f4f9] dark:bg-[#1A2433] border-[#e4e4ed] dark:border-[#243044] text-[#475569] dark:text-[#9BA8B7]'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm">
              <FileCheck2 className="w-5 h-5 text-[#10B981]" />
              <span>
                {selfAssessedPassed
                  ? 'Capstone Assessment Passed!'
                  : completenessPassed
                  ? 'Completeness Verified — Pending Passing Self-Assessment Score'
                  : 'Assessment Incomplete'}
              </span>
            </div>
            <span className="font-mono font-bold text-base">
              {totalSelfScore} / 100 Marks
            </span>
          </div>
          <p className="text-xs leading-relaxed">
            {selfAssessedPassed
              ? `Your submission has passed the structural completeness verification and meets the ${passingScore}/100 self-assessed rubric threshold. Your capstone completion is recorded in your profile.`
              : completenessPassed
              ? `Your report structure is verified. Enter rubric self-assessment scores totaling at least ${passingScore}/100 to record your capstone completion.`
              : 'Complete and submit all 6 required sections with technical evidence references to begin assessment.'}
          </p>
        </div>
      </div>
    </div>
  );
};
