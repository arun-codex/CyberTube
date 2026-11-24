'use client';

import React, { useState } from 'react';
import { IOT_2D_DIAGRAMS, Diagram2DSpec, DiagramCategory } from '../../../data/iot/diagrams';
import {
  ZoomIn, ZoomOut, RotateCcw, Shield, ShieldAlert, Cpu, Radio,
  Server, Layers, CheckCircle2, AlertTriangle, Info, Terminal, Activity, ArrowRight
} from 'lucide-react';

interface DiagramViewer2DProps {
  initialDiagramId?: string;
  moduleOrder?: number;
}

const CATEGORY_LABELS: Record<DiagramCategory, { label: string; color: string }> = {
  'architecture': { label: 'System Architecture', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  'circuits': { label: 'Discrete Circuits & CAD', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  'hardware-pinouts': { label: 'Hardware Pinouts', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  'protocols-networking': { label: 'Protocols & Busses', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
  'firmware-security': { label: 'Firmware & Crypto', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
};

export function DiagramViewer2D({ initialDiagramId, moduleOrder }: DiagramViewer2DProps) {
  // Determine initial diagram based on moduleOrder or initialDiagramId
  const defaultDiagram = initialDiagramId
    ? IOT_2D_DIAGRAMS.find((d) => d.id === initialDiagramId) || IOT_2D_DIAGRAMS[0]
    : moduleOrder
    ? IOT_2D_DIAGRAMS.find((d) => d.relatedModuleOrders.includes(moduleOrder)) || IOT_2D_DIAGRAMS[0]
    : IOT_2D_DIAGRAMS[0];

  const [selectedDiagramId, setSelectedDiagramId] = useState<string>(defaultDiagram.id);
  const [selectedCategory, setSelectedCategory] = useState<DiagramCategory | 'all'>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeMode, setActiveMode] = useState<string>('normal');
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

  const diagram = IOT_2D_DIAGRAMS.find((d) => d.id === selectedDiagramId) || IOT_2D_DIAGRAMS[0];

  const filteredDiagrams = selectedCategory === 'all'
    ? IOT_2D_DIAGRAMS
    : IOT_2D_DIAGRAMS.filter((d) => d.category === selectedCategory);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 2.0));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.6));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
      {/* Top Header & Filter Controls */}
      <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-white tracking-wide">{diagram.title}</h3>
              <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border ${CATEGORY_LABELS[diagram.category].color}`}>
                {CATEGORY_LABELS[diagram.category].label}
              </span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-1">{diagram.shortDescription}</p>
          </div>
        </div>

        {/* Diagram Selector & Zoom Controls */}
        <div className="flex items-center gap-2">
          <select
            value={selectedDiagramId}
            onChange={(e) => {
              setSelectedDiagramId(e.target.value);
              setSelectedComponentId(null);
            }}
            aria-label="Select interactive diagram"
            className="text-xs bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500 max-w-[240px] sm:max-w-[320px] truncate"
          >
            {IOT_2D_DIAGRAMS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title}
              </option>
            ))}
          </select>

          <div className="flex items-center bg-slate-800/80 border border-slate-700/80 rounded-lg p-0.5">
            <button
              onClick={handleZoomIn}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-700 transition"
              title="Zoom In"
              aria-label="Zoom in diagram"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-700 transition"
              title="Zoom Out"
              aria-label="Zoom out diagram"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-700 transition"
              title="Reset Zoom"
              aria-label="Reset zoom level"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="px-4 py-2 bg-slate-950/40 border-b border-slate-800/60 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-slate-500 text-[11px] font-mono mr-1">Filter ({IOT_2D_DIAGRAMS.length} Diagrams):</span>
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition ${
            selectedCategory === 'all'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          All (20)
        </button>
        {(Object.keys(CATEGORY_LABELS) as DiagramCategory[]).map((cat) => {
          const count = IOT_2D_DIAGRAMS.filter((d) => d.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>{CATEGORY_LABELS[cat].label}</span>
              <span className="text-[10px] opacity-60 font-mono">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area: Diagram Canvas + Inspector Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        {/* Vector SVG Interactive Canvas */}
        <div className="lg:col-span-8 bg-slate-950 relative overflow-hidden flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
          {/* Interactive Mode Banner (if available) */}
          {diagram.interactiveModes && (
            <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 rounded-lg p-1 shadow-lg backdrop-blur">
              {diagram.interactiveModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  className={`text-[11px] font-medium px-3 py-1 rounded transition flex items-center gap-1.5 ${
                    activeMode === mode.id
                      ? mode.id === 'attack'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {mode.id === 'attack' ? <ShieldAlert className="w-3 h-3 text-rose-400" /> : <Shield className="w-3 h-3 text-emerald-400" />}
                  <span>{mode.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* SVG Canvas Container */}
          <div
            className="w-full h-full flex items-center justify-center p-6 select-none transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
          >
            <svg
              viewBox="0 0 840 500"
              className="w-full max-w-[800px] h-auto drop-shadow-md"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                </pattern>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
                </marker>
                <marker id="arrow-active" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
                </marker>
              </defs>

              <rect width="840" height="500" fill="url(#grid)" rx="8" />

              {/* Render Diagram Components Box Grid */}
              {diagram.components.map((comp, idx) => {
                const total = diagram.components.length;
                // Distribute components horizontally across the canvas
                const colWidth = 720 / Math.max(total, 1);
                const cx = 60 + idx * colWidth + colWidth / 2;
                const cy = idx % 2 === 0 ? 150 : 330;
                const isSelected = selectedComponentId === comp.id;

                return (
                  <g
                    key={comp.id}
                    className="cursor-pointer group"
                    onClick={() => setSelectedComponentId(comp.id)}
                  >
                    {/* Component Card Box */}
                    <rect
                      x={cx - 75}
                      y={cy - 45}
                      width="150"
                      height="90"
                      rx="8"
                      className={`transition duration-200 ${
                        isSelected
                          ? 'fill-cyan-950/80 stroke-cyan-400 stroke-2'
                          : 'fill-slate-900/90 stroke-slate-700/80 hover:stroke-slate-500'
                      }`}
                    />

                    {/* Designator Badge */}
                    <rect
                      x={cx - 70}
                      y={cy - 40}
                      width="36"
                      height="16"
                      rx="3"
                      className="fill-slate-800 stroke-slate-700/60"
                    />
                    <text
                      x={cx - 52}
                      y={cy - 28}
                      textAnchor="middle"
                      className="fill-cyan-400 text-[10px] font-mono font-bold"
                    >
                      {comp.designator}
                    </text>

                    {/* Voltage Rating Badge */}
                    {comp.voltageRating && (
                      <text
                        x={cx + 65}
                        y={cy - 28}
                        textAnchor="end"
                        className="fill-amber-400 text-[9px] font-mono"
                      >
                        {comp.voltageRating}
                      </text>
                    )}

                    {/* Component Name */}
                    <text
                      x={cx}
                      y={cy - 2}
                      textAnchor="middle"
                      className="fill-white text-[11px] font-semibold tracking-tight"
                    >
                      {comp.name.length > 20 ? comp.name.slice(0, 18) + '...' : comp.name}
                    </text>

                    {/* Part Number / Key Function */}
                    <text
                      x={cx}
                      y={cy + 16}
                      textAnchor="middle"
                      className="fill-slate-400 text-[9.5px] font-mono"
                    >
                      {comp.partNumber || comp.keyFunction.slice(0, 20)}
                    </text>

                    {/* Pin Dots */}
                    <circle cx={cx - 60} cy={cy + 35} r="3" className="fill-slate-600 group-hover:fill-cyan-400" />
                    <circle cx={cx} cy={cy + 35} r="3" className="fill-slate-600 group-hover:fill-cyan-400" />
                    <circle cx={cx + 60} cy={cy + 35} r="3" className="fill-slate-600 group-hover:fill-cyan-400" />
                  </g>
                );
              })}

              {/* Render Connections Between Components */}
              {diagram.connections.map((conn, idx) => {
                const total = diagram.components.length;
                const colWidth = 720 / Math.max(total, 1);
                const fromIdx = idx % total;
                const toIdx = (idx + 1) % total;

                const x1 = 60 + fromIdx * colWidth + colWidth / 2;
                const y1 = fromIdx % 2 === 0 ? 195 : 375;
                const x2 = 60 + toIdx * colWidth + colWidth / 2;
                const y2 = toIdx % 2 === 0 ? 105 : 285;

                const isAttack = activeMode === 'attack';
                const strokeColor = isAttack && idx === 1 ? '#f43f5e' : conn.wireColor;

                return (
                  <g key={idx}>
                    <path
                      d={`M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={isAttack && idx === 1 ? "3" : "2"}
                      strokeDasharray={isAttack && idx === 1 ? "4,4" : undefined}
                      markerEnd="url(#arrow)"
                    />
                    {/* Connection Signal Label */}
                    <rect
                      x={(x1 + x2) / 2 - 40}
                      y={(y1 + y2) / 2 - 10}
                      width="80"
                      height="18"
                      rx="3"
                      className="fill-slate-950/90 stroke-slate-800"
                    />
                    <text
                      x={(x1 + x2) / 2}
                      y={(y1 + y2) / 2 + 2}
                      textAnchor="middle"
                      className="fill-slate-300 text-[8.5px] font-mono"
                    >
                      {conn.voltageRating}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom Canvas Status Bar */}
          <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Canvas Status: Synchronized (2D CAD Vector)</span>
            </div>
            <div>
              <span>Zoom: {Math.round(zoomLevel * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Technical Inspector Side Panel */}
        <div className="lg:col-span-4 p-5 bg-slate-900 flex flex-col justify-between space-y-4 overflow-y-auto max-h-[580px]">
          <div className="space-y-4">
            {/* Electrical Safety Alert */}
            <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-1">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Electrical Safety & Voltage Rules</span>
              </div>
              <p className="text-[11px] text-amber-200/80 leading-relaxed font-sans">
                {diagram.safetyGuidance}
              </p>
            </div>

            {/* Technical Overview */}
            <div>
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>Technical Circuit Specification</span>
              </h4>
              <p className="text-xs text-slate-300/90 leading-relaxed">
                {diagram.technicalDescription}
              </p>
            </div>

            {/* Component Netlist BOM */}
            <div>
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>Components & Netlist ({diagram.components.length})</span>
              </h4>
              <div className="space-y-1.5">
                {diagram.components.map((comp) => (
                  <div
                    key={comp.id}
                    onClick={() => setSelectedComponentId(comp.id)}
                    className={`p-2.5 rounded-lg border text-xs cursor-pointer transition ${
                      selectedComponentId === comp.id
                        ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono mb-0.5">
                      <span className="font-bold text-cyan-400">{comp.designator}: {comp.name}</span>
                      {comp.voltageRating && (
                        <span className="text-[10px] text-amber-400/90">{comp.voltageRating}</span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 leading-snug">{comp.keyFunction}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Multimeter Test Probes */}
            {diagram.probes && diagram.probes.length > 0 && (
              <div>
                <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Multimeter Test Points & Expected Values</span>
                </h4>
                <div className="space-y-1.5">
                  {diagram.probes.map((probe, i) => (
                    <div key={i} className="p-2 bg-slate-950/60 border border-slate-800/80 rounded-lg text-xs">
                      <div className="flex justify-between font-mono text-[11px] text-slate-400 mb-0.5">
                        <span className="text-slate-300">{probe.probePoint}</span>
                        <span className="text-emerald-400 font-bold">{probe.expectedMeasurement}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">Tolerance: {probe.tolerance}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Module Mapping Footer */}
          <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono flex items-center justify-between">
            <span>Associated Modules:</span>
            <span className="text-cyan-400 font-bold">
              {diagram.relatedModuleOrders.map((m) => `Mod ${m}`).join(', ')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
