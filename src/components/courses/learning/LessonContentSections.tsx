'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  BookOpen,
  FlaskConical,
  FileCheck2,
  HardDrive,
  Wrench,
  Layers,
  Cpu,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { NormalizedLesson } from '../../../types/learning-view-model';
import { LessonObjectives } from './LessonObjectives';
import { LessonSkillsSection } from './LessonSkillsSection';
import { LessonNavigation } from './LessonNavigation';
import dynamic from 'next/dynamic';
import { LessonContentRenderer } from '../LessonContentRenderer';
import { PracticalLabView } from '../PracticalLabView';
import { CapstoneAssessmentView } from '../CapstoneAssessmentView';
import { PCAPResourceList } from '../PCAPResourceList';

// IoT Interactive Components
import { IotArchitectureDiagram } from '../iot/IotArchitectureDiagram';
import { InteractiveCircuitDiagram } from '../iot/InteractiveCircuitDiagram';
import { ProtocolSequenceDiagram } from '../iot/ProtocolSequenceDiagram';
import { IoTForensicTimeline } from '../iot/IoTForensicTimeline';
import { HardwareExplorer } from '../iot/HardwareExplorer';
import { LessonKitPanel } from '../iot/LessonKitPanel';
import { IoTProjectPanel } from '../iot/IoTProjectPanel';

// Dynamically imported heavy IoT components with ssr: false for optimal bundle performance
const Device3DViewer = dynamic(
  () => import('../iot/Device3DViewer').then((mod) => mod.Device3DViewer),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] flex items-center justify-center bg-[#0a0f18] rounded-[6px] border border-[#1E293B] text-cyan-400 font-mono text-xs">
        Loading 3D Hardware CAD Engine (Three.js WebGL)...
      </div>
    ),
  }
);

const DiagramViewer2D = dynamic(
  () => import('../iot/DiagramViewer2D').then((mod) => mod.DiagramViewer2D),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] flex items-center justify-center bg-[#0a0f18] rounded-[6px] border border-[#1E293B] text-emerald-400 font-mono text-xs">
        Loading 2D Vector CAD Schematics (20 Configurations)...
      </div>
    ),
  }
);

const InteractiveCircuitSimulator = dynamic(
  () => import('../iot/InteractiveCircuitSimulator').then((mod) => mod.InteractiveCircuitSimulator),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] flex items-center justify-center bg-[#0a0f18] rounded-[6px] border border-[#1E293B] text-emerald-400 font-mono text-xs">
        Loading Interactive Circuit Simulator...
      </div>
    ),
  }
);

type TabType = 'content' | 'lab' | 'capstone' | 'pcaps' | 'hardware' | 'diagram' | 'evidence';
type DiagramSubTab =
  | 'schematics-2d'
  | 'circuit-sim'
  | '3d-viewer'
  | 'circuit'
  | 'architecture'
  | 'protocol'
  | 'forensics'
  | 'hardware-explorer';

interface LessonContentSectionsProps {
  courseId: string;
  courseSlug: string;
  domains: string[];
  activeLesson: NormalizedLesson;
  prevLesson?: NormalizedLesson;
  nextLesson?: NormalizedLesson;
  isLessonCompleted: boolean;
  onToggleComplete: () => void;
  onSelectLesson: (slug: string, tab?: any) => void;
  activeTabOverride?: any;
  onTabChange?: (tab: any) => void;
  completedLessonIds?: string[];
  currentModuleLessons?: NormalizedLesson[];
  capstone?: any;
  pcapResources?: any[];
  prerequisites?: string[];
}

export const LessonContentSections: React.FC<LessonContentSectionsProps> = ({
  courseId,
  courseSlug,
  domains,
  activeLesson,
  prevLesson,
  nextLesson,
  isLessonCompleted,
  onToggleComplete,
  onSelectLesson,
  activeTabOverride,
  onTabChange,
  completedLessonIds = [],
  currentModuleLessons = [],
  capstone,
  pcapResources,
  prerequisites,
}) => {
  const isIotCourse =
    courseSlug === 'iot-cybersecurity-zero-to-advanced' ||
    domains.includes('iot-embedded-security');

  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [activeDiagramSubTab, setActiveDiagramSubTab] = useState<DiagramSubTab>('circuit');

  const hasRichContent = !!activeLesson.richContent;
  const hasModuleLab = !!activeLesson.practicalLab;
  const isCapstoneLesson =
    activeLesson.id === 'les-08-1-capstone-investigation' ||
    activeLesson.slug === 'operation-blackout-beacon-capstone' ||
    activeLesson.slug?.startsWith('m30-l04') ||
    activeLesson.slug?.startsWith('m30-l4') ||
    activeLesson.id === 'e0000000-001e-4000-8000-000000000004' ||
    activeLesson.slug === 'm30-l4-communication-and-defense';
  const hasCapstone = !!capstone && isCapstoneLesson;
  const hasPcaps = !!pcapResources && pcapResources.length > 0;

  // Extract module number from slug e.g. "m02-l01-..." -> 2
  const moduleNumber = parseInt(activeLesson.slug?.match(/^m(\d+)/)?.[1] || '1', 10);

  useEffect(() => {
    if (activeTabOverride) {
      setActiveTab(activeTabOverride);
    } else if (isCapstoneLesson) {
      setActiveTab(isIotCourse ? 'evidence' : 'capstone');
    } else {
      setActiveTab('content');
    }
  }, [activeLesson.id, isCapstoneLesson, activeTabOverride, isIotCourse]);

  // Adapt default diagram subtab based on module phase
  useEffect(() => {
    if (moduleNumber === 1 || moduleNumber === 7 || moduleNumber === 16) {
      setActiveDiagramSubTab('architecture');
    } else if (moduleNumber === 3 || moduleNumber === 14 || moduleNumber === 20) {
      setActiveDiagramSubTab('3d-viewer');
    } else if (moduleNumber === 2 || moduleNumber === 4 || moduleNumber === 6) {
      setActiveDiagramSubTab('circuit-sim');
    } else if (moduleNumber === 8 || moduleNumber === 9 || moduleNumber === 13) {
      setActiveDiagramSubTab('protocol');
    } else if (moduleNumber >= 25 && moduleNumber <= 27) {
      setActiveDiagramSubTab('forensics');
    } else {
      setActiveDiagramSubTab('schematics-2d');
    }
  }, [moduleNumber]);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  const showEthicalNotice =
    isIotCourse ||
    courseSlug === 'wireshark-zero-to-advanced' ||
    courseSlug === 'wireshark-and-ethical-hacking' ||
    domains.includes('network-security') ||
    domains.includes('malware-reverse-engineering');

  const hasInteractiveTabs =
    isIotCourse || hasRichContent || hasModuleLab || hasCapstone || hasPcaps;

  return (
    <div className="space-y-6">
      {/* Lesson Header Banner */}
      <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] p-5 sm:p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-[#64748B] dark:text-[#9BA8B7]">
          <span className="px-2 py-0.5 rounded-[4px] bg-[#f4f4f9] dark:bg-[#1A2638] border border-[#e4e4ed] dark:border-[#243044] text-[#0F172A] dark:text-[#E6EDF3] font-medium">
            Lesson #{activeLesson.order}
          </span>
          {activeLesson.moduleTitle && (
            <span className="truncate max-w-sm">{activeLesson.moduleTitle}</span>
          )}
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold text-[#0F172A] dark:text-[#E6EDF3]">
          {activeLesson.title}
        </h2>

        {activeLesson.description && (
          <p className="text-sm text-[#475569] dark:text-[#9BA8B7] leading-relaxed">
            {activeLesson.description}
          </p>
        )}
      </div>

      {/* Ethical and Safety Lab Notice */}
      {showEthicalNotice && (
        <div
          data-testid="ethical-use-notice"
          className="flex items-start gap-2.5 p-3.5 rounded-[6px] bg-[#fffbeb] dark:bg-[#78350f]/20 border border-[#fde68a] dark:border-[#b45309]/30 text-[#92400e] dark:text-[#fbbf24] text-xs leading-relaxed font-mono"
        >
          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-[#b45309] dark:text-[#f59e0b]" />
          <div>
            <span className="font-semibold text-[#78350f] dark:text-[#fde68a]">
              {isIotCourse ? 'Hardware Safety & Scope Boundary Rule:' : 'Ethical Lab Environment Notice:'}{' '}
            </span>
            {isIotCourse
              ? 'ESP32 GPIO pads operate strictly on 3.3V logic. Never connect 5V signals or AC mains electricity to breadboards. All wireless and network tests must remain scoped to learner-owned devices or isolated training VLANs.'
              : 'Practice only on systems, networks, and devices you own or have explicit permission to test. Use isolated lab environments for traffic capture, credential analysis, and security demonstrations.'}
          </div>
        </div>
      )}

      {/* Lesson Learning Objectives & Acquired Skills */}
      {(activeLesson.objectives.length > 0 || activeLesson.skillsTaught.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LessonObjectives objectives={activeLesson.objectives} />
          <LessonSkillsSection skills={activeLesson.skillsTaught} />
        </div>
      )}

      {/* Interactive Tabs */}
      {hasInteractiveTabs && (
        <div className="space-y-4">
          {/* Tab Selector Bar */}
          <div className="flex items-center gap-2 border-b border-[#e4e4ed] dark:border-[#243044] pb-2 overflow-x-auto">
            {isIotCourse ? (
              /* IoT Specific 5 Tabs: Learn, Build / Lab, Hardware & Tools, Interactive Diagram, Evidence / Notes */
              <>
                <button
                  type="button"
                  onClick={() => handleTabClick('content')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-mono font-medium transition-colors cursor-pointer shrink-0 ${
                    activeTab === 'content'
                      ? 'bg-[#0E7490] text-white shadow-sm'
                      : 'text-[#64748B] dark:text-[#9BA8B7] hover:bg-[#f4f4f9] dark:hover:bg-[#1A2638]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Learn</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTabClick('lab')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-mono font-medium transition-colors cursor-pointer shrink-0 ${
                    activeTab === 'lab'
                      ? 'bg-[#0E7490] text-white shadow-sm'
                      : 'text-[#64748B] dark:text-[#9BA8B7] hover:bg-[#f4f4f9] dark:hover:bg-[#1A2638]'
                  }`}
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>Build / Lab</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTabClick('hardware')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-mono font-medium transition-colors cursor-pointer shrink-0 ${
                    activeTab === 'hardware'
                      ? 'bg-[#0E7490] text-white shadow-sm'
                      : 'text-[#64748B] dark:text-[#9BA8B7] hover:bg-[#f4f4f9] dark:hover:bg-[#1A2638]'
                  }`}
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Hardware & Tools</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTabClick('diagram')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-mono font-medium transition-colors cursor-pointer shrink-0 ${
                    activeTab === 'diagram'
                      ? 'bg-[#0E7490] text-white shadow-sm'
                      : 'text-[#64748B] dark:text-[#9BA8B7] hover:bg-[#f4f4f9] dark:hover:bg-[#1A2638]'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Interactive Diagram</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTabClick('evidence')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-mono font-medium transition-colors cursor-pointer shrink-0 ${
                    activeTab === 'evidence' || activeTab === 'capstone'
                      ? 'bg-[#0E7490] text-white shadow-sm'
                      : 'text-[#64748B] dark:text-[#9BA8B7] hover:bg-[#f4f4f9] dark:hover:bg-[#1A2638]'
                  }`}
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>{isCapstoneLesson ? 'Capstone (100 pts)' : 'Evidence & Notes'}</span>
                </button>
              </>
            ) : (
              /* Standard Tabs for Other CyberTube Courses */
              <>
                {hasRichContent && (
                  <button
                    type="button"
                    onClick={() => handleTabClick('content')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-mono font-medium transition-colors cursor-pointer ${
                      activeTab === 'content'
                        ? 'bg-[#0E7490] text-white shadow-sm'
                        : 'text-[#64748B] dark:text-[#9BA8B7] hover:bg-[#f4f4f9] dark:hover:bg-[#1A2638]'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Lesson Guide</span>
                  </button>
                )}

                {hasModuleLab && activeLesson.practicalLab && (
                  <button
                    type="button"
                    onClick={() => handleTabClick('lab')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-mono font-medium transition-colors cursor-pointer ${
                      activeTab === 'lab'
                        ? 'bg-[#0E7490] text-white shadow-sm'
                        : 'text-[#64748B] dark:text-[#9BA8B7] hover:bg-[#f4f4f9] dark:hover:bg-[#1A2638]'
                    }`}
                  >
                    <FlaskConical className="w-3.5 h-3.5" />
                    <span>Module Lab ({activeLesson.practicalLab.tasks?.length || 0} tasks)</span>
                  </button>
                )}

                {hasCapstone && capstone && (
                  <button
                    type="button"
                    onClick={() => handleTabClick('capstone')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-mono font-medium transition-colors cursor-pointer ${
                      activeTab === 'capstone'
                        ? 'bg-[#0E7490] text-white shadow-sm'
                        : 'text-[#64748B] dark:text-[#9BA8B7] hover:bg-[#f4f4f9] dark:hover:bg-[#1A2638]'
                    }`}
                  >
                    <FileCheck2 className="w-3.5 h-3.5" />
                    <span>SOC Capstone (100 Marks)</span>
                  </button>
                )}

                {hasPcaps && pcapResources && (
                  <button
                    type="button"
                    onClick={() => handleTabClick('pcaps')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-mono font-medium transition-colors cursor-pointer ${
                      activeTab === 'pcaps'
                        ? 'bg-[#0E7490] text-white shadow-sm'
                        : 'text-[#64748B] dark:text-[#9BA8B7] hover:bg-[#f4f4f9] dark:hover:bg-[#1A2638]'
                    }`}
                  >
                    <HardDrive className="w-3.5 h-3.5" />
                    <span>PCAP Library ({pcapResources.length})</span>
                  </button>
                )}
              </>
            )}
          </div>

          {/* TAB 1: Learn / Content */}
          {activeTab === 'content' && activeLesson.richContent && (
            <LessonContentRenderer
              content={activeLesson.richContent}
              pcapResources={pcapResources}
            />
          )}

          {/* TAB 2: Build / Practical Lab */}
          {activeTab === 'lab' && (
            <div className="space-y-6">
              {isIotCourse && (
                <IoTProjectPanel
                  moduleNumber={moduleNumber}
                  projectTitle={activeLesson.moduleTitle}
                />
              )}
              {activeLesson.practicalLab && (
                <PracticalLabView lab={activeLesson.practicalLab} courseId={courseId} />
              )}
            </div>
          )}

          {/* TAB 3: Hardware & Tools (IoT Exclusive) */}
          {activeTab === 'hardware' && (
            <div className="space-y-6">
              <LessonKitPanel
                lessonSlug={activeLesson.slug}
                moduleOrder={moduleNumber}
              />
              <HardwareExplorer />
            </div>
          )}

          {/* TAB 4: Interactive Diagram (IoT Exclusive) */}
          {activeTab === 'diagram' && (
            <div className="space-y-4">
              {/* Diagram Sub-navigation Pills */}
              <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-[#e4e4ed] dark:border-[#243044]">
                <button
                  type="button"
                  onClick={() => setActiveDiagramSubTab('schematics-2d')}
                  className={`px-2.5 py-1 rounded-[4px] text-xs font-mono transition-colors cursor-pointer ${
                    activeDiagramSubTab === 'schematics-2d'
                      ? 'bg-emerald-600 text-white font-semibold'
                      : 'bg-[#121A26] text-[#9BA8B7] border border-[#243044] hover:bg-[#1A2638]'
                  }`}
                >
                  2D Vector CAD (20 Diagrams)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDiagramSubTab('circuit-sim')}
                  className={`px-2.5 py-1 rounded-[4px] text-xs font-mono transition-colors cursor-pointer ${
                    activeDiagramSubTab === 'circuit-sim'
                      ? 'bg-emerald-700 text-white font-semibold'
                      : 'bg-[#121A26] text-[#9BA8B7] border border-[#243044] hover:bg-[#1A2638]'
                  }`}
                >
                  Circuit Simulator &amp; Ohm&apos;s Law
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDiagramSubTab('3d-viewer')}
                  className={`px-2.5 py-1 rounded-[4px] text-xs font-mono transition-colors cursor-pointer ${
                    activeDiagramSubTab === '3d-viewer'
                      ? 'bg-cyan-600 text-white font-semibold'
                      : 'bg-[#121A26] text-[#9BA8B7] border border-[#243044] hover:bg-[#1A2638]'
                  }`}
                >
                  Rotatable 3D Hardware CAD (6 Models)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDiagramSubTab('circuit')}
                  className={`px-2.5 py-1 rounded-[4px] text-xs font-mono transition-colors cursor-pointer ${
                    activeDiagramSubTab === 'circuit'
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-[#121A26] text-[#9BA8B7] border border-[#243044] hover:bg-[#1A2638]'
                  }`}
                >
                  Breadboard Wiring Guide
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDiagramSubTab('architecture')}
                  className={`px-2.5 py-1 rounded-[4px] text-xs font-mono transition-colors cursor-pointer ${
                    activeDiagramSubTab === 'architecture'
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'bg-[#121A26] text-[#9BA8B7] border border-[#243044] hover:bg-[#1A2638]'
                  }`}
                >
                  System & Threat Boundaries
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDiagramSubTab('protocol')}
                  className={`px-2.5 py-1 rounded-[4px] text-xs font-mono transition-colors cursor-pointer ${
                    activeDiagramSubTab === 'protocol'
                      ? 'bg-purple-600 text-white font-semibold'
                      : 'bg-[#121A26] text-[#9BA8B7] border border-[#243044] hover:bg-[#1A2638]'
                  }`}
                >
                  Protocol Sequence Flow
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDiagramSubTab('forensics')}
                  className={`px-2.5 py-1 rounded-[4px] text-xs font-mono transition-colors cursor-pointer ${
                    activeDiagramSubTab === 'forensics'
                      ? 'bg-amber-600 text-white font-semibold'
                      : 'bg-[#121A26] text-[#9BA8B7] border border-[#243044] hover:bg-[#1A2638]'
                  }`}
                >
                  Forensic Incident Timeline
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDiagramSubTab('hardware-explorer')}
                  className={`px-2.5 py-1 rounded-[4px] text-xs font-mono transition-colors cursor-pointer ${
                    activeDiagramSubTab === 'hardware-explorer'
                      ? 'bg-rose-600 text-white font-semibold'
                      : 'bg-[#121A26] text-[#9BA8B7] border border-[#243044] hover:bg-[#1A2638]'
                  }`}
                >
                  Component Symbol Grid
                </button>
              </div>

              {/* Render Active Diagram */}
              {activeDiagramSubTab === 'schematics-2d' && <DiagramViewer2D />}
              {activeDiagramSubTab === 'circuit-sim' && (
                <InteractiveCircuitSimulator moduleNumber={moduleNumber} />
              )}
              {activeDiagramSubTab === '3d-viewer' && <Device3DViewer />}
              {activeDiagramSubTab === 'circuit' && <InteractiveCircuitDiagram />}
              {activeDiagramSubTab === 'architecture' && <IotArchitectureDiagram />}
              {activeDiagramSubTab === 'protocol' && <ProtocolSequenceDiagram />}
              {activeDiagramSubTab === 'forensics' && <IoTForensicTimeline />}
              {activeDiagramSubTab === 'hardware-explorer' && <HardwareExplorer />}
            </div>
          )}

          {/* TAB 5: Evidence & Notes / Capstone */}
          {(activeTab === 'evidence' || activeTab === 'capstone') && (
            <div className="space-y-6">
              {isCapstoneLesson && capstone ? (
                <CapstoneAssessmentView capstone={capstone} courseId={courseId} />
              ) : activeLesson.practicalLab ? (
                <PracticalLabView lab={activeLesson.practicalLab} courseId={courseId} />
              ) : (
                <div className="p-6 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#0c121c] text-xs font-mono text-[#9BA8B7]">
                  No formal evidence submission required for this introductory session. Proceed to the next lesson or build the hardware circuit in the Build tab.
                </div>
              )}
            </div>
          )}

          {/* PCAPs Tab (Standard) */}
          {activeTab === 'pcaps' && pcapResources && (
            <PCAPResourceList resources={pcapResources} />
          )}
        </div>
      )}

      {/* Course Prerequisites */}
      {prerequisites && prerequisites.length > 0 && (
        <div className="p-5 rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-white dark:bg-[#121A26] space-y-3">
          <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-[#64748B] dark:text-[#9BA8B7] flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#0E7490] dark:text-[#22D3EE]" />
            <span>Prerequisites</span>
          </h3>
          <ul className="space-y-1.5 text-xs text-[#334155] dark:text-[#CBD5E1]">
            {prerequisites.map((prereq, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#0E7490] dark:text-[#22D3EE]">•</span>
                <span>{prereq}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Lesson Navigation Controls */}
      <LessonNavigation
        courseSlug={courseSlug}
        currentLesson={activeLesson}
        prevLesson={prevLesson}
        nextLesson={nextLesson}
        isCompleted={isLessonCompleted}
        onToggleComplete={onToggleComplete}
        onSelectLesson={onSelectLesson}
        isLastLessonInModule={
          currentModuleLessons.length > 0 &&
          currentModuleLessons[currentModuleLessons.length - 1].id === activeLesson.id
        }
      />
    </div>
  );
};
