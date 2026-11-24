'use client';

import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, AlertTriangle, CheckCircle2, ChevronRight, ChevronLeft, Info } from 'lucide-react';

interface WiringStep {
  stepNumber: number;
  title: string;
  instruction: string;
  wireIndices: number[];
  warning?: string;
  expectedMultimeterReading: string;
}

const WIRING_STEPS: WiringStep[] = [
  {
    stepNumber: 1,
    title: 'Establish 3.3V & Ground Power Rails',
    instruction: 'Connect ESP32 3V3 pin to the breadboard Red (+) power rail. Connect ESP32 GND pin to the Blue (-) ground rail. Never connect VIN (5V) to the 3.3V rail.',
    wireIndices: [0, 1],
    warning: 'ESP32 GPIO pads are rated for 3.3V maximum. Verify with multimeter that red rail is 3.3V before powering any sensor pins.',
    expectedMultimeterReading: 'DC Volts across Red (+) and Blue (-): 3.28V – 3.32V DC.',
  },
  {
    stepNumber: 2,
    title: 'Wire Button Input with 10 kΩ Pull-Down',
    instruction: 'Mount 4-pin tactile switch across the center divider. Connect one side to 3.3V rail. Connect the other side to ESP32 GPIO 4 and through a 10 kΩ resistor to GND rail.',
    wireIndices: [2, 3, 4],
    expectedMultimeterReading: 'Unpressed: 0.00V at GPIO 4. Pressed: 3.30V at GPIO 4. Solid deterministic states.',
  },
  {
    stepNumber: 3,
    title: 'Wire Status LED with 220 Ω Current-Limiter',
    instruction: 'Place 5mm LED. Connect Anode (long lead) to ESP32 GPIO 2 through a 220 Ω resistor (Red-Red-Brown). Connect Cathode (flat edge) directly to GND rail.',
    wireIndices: [5, 6],
    warning: 'Never connect an LED directly between GPIO and GND without a resistor. Excess current will destroy the ESP32 output driver pad.',
    expectedMultimeterReading: 'When GPIO 2 is HIGH: ~2.0V across LED, ~1.3V across 220Ω resistor (~6mA forward current).',
  },
  {
    stepNumber: 4,
    title: 'Wire 2N2222 Transistor Driver for Buzzer Load',
    instruction: 'Place 2N2222 transistor (flat face facing right: E-B-C). Connect Emitter to GND. Connect Base through 1 kΩ resistor to GPIO 15. Connect Collector to buzzer negative lead; buzzer positive connects to 3.3V.',
    wireIndices: [7, 8, 9, 10],
    warning: 'Inductive loads require a 1N4007 flyback diode in antiparallel across the buzzer terminals to clamp back-EMF voltage spikes.',
    expectedMultimeterReading: 'Vce(sat) across collector-emitter when triggered: ~0.15V - 0.25V in full saturation.',
  },
  {
    stepNumber: 5,
    title: 'Connect DHT22 Sensor with 10 kΩ Pull-Up',
    instruction: 'Connect DHT22 Pin 1 (VCC) to 3.3V rail. Connect Pin 4 (GND) to GND rail. Connect Pin 2 (DATA) to ESP32 GPIO 5. Place a 10 kΩ pull-up resistor between Pin 1 (VCC) and Pin 2 (DATA).',
    wireIndices: [11, 12, 13, 14],
    expectedMultimeterReading: 'Idle DATA line voltage: 3.30V. Rapid square wave pulses during readout query.',
  },
];

interface WireSpec {
  id: string;
  from: string;
  to: string;
  color: string;
  pathD: string;
  label: string;
}

const WIRES: WireSpec[] = [
  // Step 1: Power Rails
  { id: 'w-pwr-3v3', from: 'ESP32 3V3', to: 'Breadboard + Rail', color: '#EF4444', pathD: 'M 180 180 C 180 80, 220 50, 260 50', label: '3.3V Supply' },
  { id: 'w-pwr-gnd', from: 'ESP32 GND', to: 'Breadboard - Rail', color: '#38BDF8', pathD: 'M 180 200 C 180 70, 220 30, 260 30', label: 'GND Return' },
  // Step 2: Button
  { id: 'w-btn-pwr', from: 'Breadboard + Rail', to: 'Button Pin 1', color: '#EF4444', pathD: 'M 320 50 L 320 130', label: 'Button 3.3V' },
  { id: 'w-btn-sig', from: 'Button Pin 2', to: 'ESP32 GPIO 4', color: '#F59E0B', pathD: 'M 320 170 C 320 220, 240 220, 180 220', label: 'Button GPIO 4' },
  { id: 'w-btn-pulldown', from: 'Button Pin 2', to: '10k Resistor to GND', color: '#38BDF8', pathD: 'M 320 170 L 320 30', label: '10k Pull-down' },
  // Step 3: LED
  { id: 'w-led-sig', from: 'ESP32 GPIO 2', to: '220R Resistor', color: '#10B981', pathD: 'M 180 240 C 220 240, 420 180, 440 180', label: 'GPIO 2 Output' },
  { id: 'w-led-gnd', from: 'LED Cathode', to: 'Breadboard - Rail', color: '#38BDF8', pathD: 'M 480 180 C 480 80, 400 30, 360 30', label: 'LED GND' },
  // Step 4: Transistor & Buzzer
  { id: 'w-tr-base', from: 'ESP32 GPIO 15', to: '1k Resistor -> Base', color: '#A855F7', pathD: 'M 180 260 C 240 260, 520 200, 560 200', label: 'Base Drive' },
  { id: 'w-tr-emit', from: '2N2222 Emitter', to: 'GND Rail', color: '#38BDF8', pathD: 'M 580 230 C 580 80, 520 30, 460 30', label: 'Emitter GND' },
  { id: 'w-tr-coll', from: '2N2222 Collector', to: 'Buzzer (-)', color: '#F43F5E', pathD: 'M 580 170 L 630 170', label: 'Low-Side Switched' },
  { id: 'w-buz-pwr', from: 'Buzzer (+)', to: 'Breadboard + Rail', color: '#EF4444', pathD: 'M 650 150 C 650 80, 560 50, 460 50', label: 'Buzzer +3.3V' },
  // Step 5: DHT22
  { id: 'w-dht-pwr', from: 'Breadboard + Rail', to: 'DHT22 VCC', color: '#EF4444', pathD: 'M 720 50 L 720 120', label: 'DHT22 VCC' },
  { id: 'w-dht-gnd', from: 'Breadboard - Rail', to: 'DHT22 GND', color: '#38BDF8', pathD: 'M 750 30 L 750 120', label: 'DHT22 GND' },
  { id: 'w-dht-sig', from: 'DHT22 DATA', to: 'ESP32 GPIO 5', color: '#F59E0B', pathD: 'M 730 120 C 730 320, 240 320, 180 280', label: 'DHT22 DATA GPIO 5' },
  { id: 'w-dht-pullup', from: 'DHT22 DATA', to: '10k Pullup to VCC', color: '#EF4444', pathD: 'M 730 120 L 720 120', label: '10k Bus Pullup' },
];

export const InteractiveCircuitDiagram: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);

  const step = WIRING_STEPS[currentStepIndex];

  return (
    <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#0c121c] p-4 sm:p-5 text-[#E6EDF3] space-y-4">
      {/* Top Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1E293B]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-[4px] bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
              SVG CAD
            </span>
            <h3 className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#E6EDF3]">
              Interactive Breadboard & Circuit Wiring Guide
            </h3>
          </div>
          <p className="text-[11px] text-[#9BA8B7] mt-0.5">
            Step-by-step verified wiring for ESP32, discrete components, sensors, and actuators with electrical safety rules.
          </p>
        </div>

        {/* Zoom & Reset Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
            className="p-1.5 rounded-[4px] border border-[#243044] bg-[#162234] hover:bg-[#1f2f47] text-[#9BA8B7] transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-[#64748B] w-12 text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
            className="p-1.5 rounded-[4px] border border-[#243044] bg-[#162234] hover:bg-[#1f2f47] text-[#9BA8B7] transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel(1)}
            className="p-1.5 rounded-[4px] border border-[#243044] bg-[#162234] hover:bg-[#1f2f47] text-[#9BA8B7] transition-colors cursor-pointer"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stepper Navigation */}
      <div className="flex items-center justify-between gap-2 p-3 rounded-[6px] bg-[#121A26] border border-[#1E293B]">
        <button
          type="button"
          disabled={currentStepIndex === 0}
          onClick={() => setCurrentStepIndex((i) => Math.max(0, i - 1))}
          className="px-2.5 py-1 rounded-[4px] border border-[#243044] bg-[#1A2638] text-xs font-mono disabled:opacity-40 hover:bg-[#223249] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Previous Step</span>
        </button>

        <div className="text-center">
          <span className="text-xs font-mono font-bold text-[#22D3EE]">
            Step {step.stepNumber} of {WIRING_STEPS.length}:
          </span>{' '}
          <span className="text-xs font-semibold text-[#E6EDF3]">{step.title}</span>
        </div>

        <button
          type="button"
          disabled={currentStepIndex === WIRING_STEPS.length - 1}
          onClick={() => setCurrentStepIndex((i) => Math.min(WIRING_STEPS.length - 1, i + 1))}
          className="px-2.5 py-1 rounded-[4px] border border-[#243044] bg-[#1A2638] text-xs font-mono disabled:opacity-40 hover:bg-[#223249] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>Next Step</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Breadboard & Circuit SVG Canvas */}
      <div className="relative w-full overflow-hidden rounded-[6px] border border-[#1E293B] bg-[#070b12] p-2 flex justify-center">
        <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center', transition: 'transform 0.2s ease-out' }}>
          <svg viewBox="0 0 860 380" width="860" height="380" className="select-none font-mono">
            <defs>
              {/* Drop Shadow Filter */}
              <filter id="circuit-shadow" x="-5%" y="-5%" width="110%" height="110%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.5" />
              </filter>
            </defs>

            {/* BREADBOARD BASE CHASSIS */}
            <rect x="220" y="15" width="620" height="340" rx="10" fill="#1b2332" stroke="#2e3b52" strokeWidth="2" filter="url(#circuit-shadow)" />

            {/* Top Power Rails */}
            {/* Ground Rail (Blue, Negative) */}
            <line x1="240" y1="30" x2="820" y2="30" stroke="#0284C7" strokeWidth="3" />
            <text x="228" y="34" fill="#38BDF8" fontSize="12" fontWeight="bold">-</text>
            <text x="826" y="34" fill="#38BDF8" fontSize="12" fontWeight="bold">-</text>

            {/* Power Rail (Red, Positive 3.3V) */}
            <line x1="240" y1="50" x2="820" y2="50" stroke="#DC2626" strokeWidth="3" />
            <text x="228" y="54" fill="#EF4444" fontSize="12" fontWeight="bold">+</text>
            <text x="826" y="54" fill="#EF4444" fontSize="12" fontWeight="bold">+</text>

            {/* Bottom Power Rails */}
            <line x1="240" y1="320" x2="820" y2="320" stroke="#0284C7" strokeWidth="3" />
            <text x="228" y="324" fill="#38BDF8" fontSize="12" fontWeight="bold">-</text>
            <line x1="240" y1="340" x2="820" y2="340" stroke="#DC2626" strokeWidth="3" />
            <text x="228" y="344" fill="#EF4444" fontSize="12" fontWeight="bold">+</text>

            {/* Central IC Isolation Channel */}
            <rect x="235" y="185" width="590" height="12" fill="#0c121c" />

            {/* Breadboard Tie Point Matrix (Subtle code-generated pin holes) */}
            {Array.from({ length: 28 }).map((_, col) => {
              const xPos = 255 + col * 20;
              return (
                <g key={col} opacity="0.35">
                  <circle cx={xPos} cy="75" r="2" fill="#64748B" />
                  <circle cx={xPos} cy="95" r="2" fill="#64748B" />
                  <circle cx={xPos} cy="115" r="2" fill="#64748B" />
                  <circle cx={xPos} cy="135" r="2" fill="#64748B" />
                  <circle cx={xPos} cy="155" r="2" fill="#64748B" />
                  <circle cx={xPos} cy="225" r="2" fill="#64748B" />
                  <circle cx={xPos} cy="245" r="2" fill="#64748B" />
                  <circle cx={xPos} cy="265" r="2" fill="#64748B" />
                  <circle cx={xPos} cy="285" r="2" fill="#64748B" />
                  <circle cx={xPos} cy="305" r="2" fill="#64748B" />
                </g>
              );
            })}

            {/* COMPONENT: ESP32 DEVKIT MODULE */}
            <g
              transform="translate(40, 100)"
              onMouseEnter={() => setHoveredComponent('ESP32 DevKit V1 (30-pin)')}
              onMouseLeave={() => setHoveredComponent(null)}
              className="cursor-pointer"
            >
              {/* PCB Body */}
              <rect width="140" height="230" rx="6" fill="#141E28" stroke="#0E7490" strokeWidth="1.5" />
              {/* RF Shield Can */}
              <rect x="15" y="25" width="110" height="85" rx="3" fill="#2d3748" stroke="#4a5568" strokeWidth="1" />
              <text x="35" y="60" fill="#E2E8F0" fontSize="10" fontWeight="bold">ESP-WROOM-32</text>
              <text x="45" y="75" fill="#94A3B8" fontSize="8">Wi-Fi + BLE</text>
              <rect x="50" y="82" width="40" height="18" fill="#1A202C" rx="2" />
              <text x="56" y="94" fill="#CBD5E0" fontSize="8">CE / FCC</text>

              {/* Micro-USB Port */}
              <rect x="52" y="222" width="36" height="12" fill="#718096" rx="2" />
              <text x="58" y="229" fill="#1A202C" fontSize="7" fontWeight="bold">USB</text>

              {/* Status LEDs & Buttons */}
              <circle cx="28" cy="125" r="3" fill="#EF4444" />
              <text x="35" y="128" fill="#A0AEC0" fontSize="7">PWR</text>
              <circle cx="112" cy="125" r="3" fill="#3B82F6" />
              <text x="96" y="128" fill="#A0AEC0" fontSize="7">IO2</text>

              {/* Pin Headers Left (Power & Strapping) */}
              <g fontSize="7" fill="#CBD5E1">
                <rect x="5" y="138" width="10" height="8" fill="#334155" />
                <text x="18" y="145">3V3</text>
                <rect x="5" y="158" width="10" height="8" fill="#334155" />
                <text x="18" y="165">GND</text>
                <rect x="5" y="178" width="10" height="8" fill="#334155" />
                <text x="18" y="185">GPIO 15</text>
                <rect x="5" y="198" width="10" height="8" fill="#334155" />
                <text x="18" y="205">GPIO 2</text>
                <rect x="5" y="218" width="10" height="8" fill="#334155" />
                <text x="18" y="225">GPIO 4</text>
              </g>

              {/* Pin Headers Right (Bus Lines) */}
              <g fontSize="7" fill="#CBD5E1">
                <rect x="125" y="138" width="10" height="8" fill="#334155" />
                <text x="100" y="145">GPIO 5</text>
                <rect x="125" y="158" width="10" height="8" fill="#334155" />
                <text x="100" y="165">GPIO 18</text>
                <rect x="125" y="178" width="10" height="8" fill="#334155" />
                <text x="100" y="185">GPIO 21</text>
                <rect x="125" y="198" width="10" height="8" fill="#334155" />
                <text x="100" y="205">GPIO 22</text>
              </g>
            </g>

            {/* COMPONENT: TACTILE PUSHBUTTON (Step 2) */}
            <g
              transform="translate(300, 130)"
              onMouseEnter={() => setHoveredComponent('Tactile Pushbutton (4-pin momentary with 10k pull-down)')}
              onMouseLeave={() => setHoveredComponent(null)}
              className="cursor-pointer"
            >
              <rect width="40" height="40" rx="4" fill="#334155" stroke="#64748B" strokeWidth="1" />
              <circle cx="20" cy="20" r="12" fill="#0F172A" stroke="#475569" strokeWidth="1" />
              <circle cx="20" cy="20" r="7" fill="#0284C7" />
              <text x="4" y="52" fill="#CBD5E1" fontSize="8">Button (IO4)</text>
            </g>

            {/* COMPONENT: 220 OHM RESISTOR (Step 3) */}
            <g
              transform="translate(420, 165)"
              onMouseEnter={() => setHoveredComponent('220 Ω Current-Limiting Resistor (Red-Red-Brown-Gold, 0.25W)')}
              onMouseLeave={() => setHoveredComponent(null)}
              className="cursor-pointer"
            >
              <line x1="0" y1="15" x2="10" y2="15" stroke="#94A3B8" strokeWidth="2" />
              <rect x="10" y="5" width="30" height="20" rx="3" fill="#D97706" />
              {/* Resistor Color Bands: Red, Red, Brown, Gold */}
              <rect x="14" y="5" width="3" height="20" fill="#DC2626" />
              <rect x="20" y="5" width="3" height="20" fill="#DC2626" />
              <rect x="26" y="5" width="3" height="20" fill="#78350F" />
              <rect x="33" y="5" width="3" height="20" fill="#F59E0B" />
              <line x1="40" y1="15" x2="50" y2="15" stroke="#94A3B8" strokeWidth="2" />
              <text x="6" y="38" fill="#CBD5E1" fontSize="8">220 Ω</text>
            </g>

            {/* COMPONENT: 5mm RED LED (Step 3) */}
            <g
              transform="translate(470, 160)"
              onMouseEnter={() => setHoveredComponent('5mm Red LED (Anode long lead -> 220R, Cathode flat rim -> GND)')}
              onMouseLeave={() => setHoveredComponent(null)}
              className="cursor-pointer"
            >
              <circle cx="15" cy="15" r="14" fill="#DC2626" fillOpacity="0.85" stroke="#EF4444" strokeWidth="1.5" />
              <circle cx="15" cy="15" r="8" fill="#F87171" />
              {/* Flat Cathode Indication */}
              <line x1="26" y1="5" x2="26" y2="25" stroke="#991B1B" strokeWidth="2" />
              <text x="2" y="42" fill="#FCA5A5" fontSize="8">LED (IO2)</text>
            </g>

            {/* COMPONENT: 2N2222 NPN TRANSISTOR (Step 4) */}
            <g
              transform="translate(560, 160)"
              onMouseEnter={() => setHoveredComponent('2N2222 NPN Transistor (TO-92: Emitter=GND, Base=GPIO15 via 1k, Collector=Load)')}
              onMouseLeave={() => setHoveredComponent(null)}
              className="cursor-pointer"
            >
              <path d="M 5 5 C 5 25, 35 25, 35 5 Z" fill="#1E293B" stroke="#475569" strokeWidth="1" />
              <line x1="5" y1="5" x2="35" y2="5" stroke="#94A3B8" strokeWidth="2" />
              <text x="8" y="20" fill="#94A3B8" fontSize="7">2N2222</text>
              <text x="2" y="38" fill="#CBD5E1" fontSize="8">E B C</text>
            </g>

            {/* COMPONENT: ACTIVE BUZZER (Step 4) */}
            <g
              transform="translate(620, 140)"
              onMouseEnter={() => setHoveredComponent('3.3V Active Piezo Buzzer (Audible alarm transducer)')}
              onMouseLeave={() => setHoveredComponent(null)}
              className="cursor-pointer"
            >
              <circle cx="25" cy="25" r="22" fill="#0F172A" stroke="#334155" strokeWidth="2" />
              <circle cx="25" cy="25" r="8" fill="#38BDF8" fillOpacity="0.2" stroke="#38BDF8" strokeWidth="1" />
              <text x="14" y="28" fill="#38BDF8" fontSize="8" fontWeight="bold">BUZZ</text>
              <text x="8" y="60" fill="#CBD5E1" fontSize="8">Alarm Buzzer</text>
            </g>

            {/* COMPONENT: DHT22 SENSOR (Step 5) */}
            <g
              transform="translate(710, 110)"
              onMouseEnter={() => setHoveredComponent('DHT22 / AM2302 Sensor (VCC=3.3V, DATA=GPIO5 + 10k pullup, GND=Ground)')}
              onMouseLeave={() => setHoveredComponent(null)}
              className="cursor-pointer"
            >
              <rect width="50" height="70" rx="4" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />
              {/* Grille Slots */}
              <line x1="10" y1="20" x2="40" y2="20" stroke="#CBD5E1" strokeWidth="2" />
              <line x1="10" y1="30" x2="40" y2="30" stroke="#CBD5E1" strokeWidth="2" />
              <line x1="10" y1="40" x2="40" y2="40" stroke="#CBD5E1" strokeWidth="2" />
              <text x="8" y="60" fill="#0F172A" fontSize="8" fontWeight="bold">DHT22</text>
              <text x="2" y="88" fill="#E2E8F0" fontSize="8">Temp/Humidity</text>
            </g>

            {/* WIRES RENDERING (Highlights active step wires) */}
            {WIRES.map((wire, idx) => {
              const isIncludedInCurrentStep = step.wireIndices.includes(idx);
              const isPastStep = WIRING_STEPS.slice(0, currentStepIndex).some((s) => s.wireIndices.includes(idx));
              const isVisible = isIncludedInCurrentStep || isPastStep;

              if (!isVisible) return null;

              return (
                <g key={wire.id}>
                  <path
                    d={wire.pathD}
                    fill="none"
                    stroke={wire.color}
                    strokeWidth={isIncludedInCurrentStep ? '3.5' : '2'}
                    strokeDasharray={isIncludedInCurrentStep ? '6 3' : 'none'}
                    strokeOpacity={isIncludedInCurrentStep ? 1 : 0.65}
                    className="transition-all"
                  />
                  {isIncludedInCurrentStep && (
                    <circle cx={wire.pathD.split(' ')[1]} cy={wire.pathD.split(' ')[2]} r="3" fill={wire.color} />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Component Hover Tooltip Indicator */}
      <div className="p-2.5 rounded-[6px] bg-[#121A26] border border-[#1E293B] text-xs font-mono flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-[#22D3EE]" />
          <span className="text-[#9BA8B7]">Component Details: </span>
          <span className="font-semibold text-[#E6EDF3]">
            {hoveredComponent || 'Hover over any component on the board to view electrical specifications'}
          </span>
        </div>
      </div>

      {/* Step Wiring Instructions & Multimeter Verification */}
      <div className="p-4 rounded-[6px] border border-[#1E293B] bg-[#0c1420] grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Instruction & Safety */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono font-bold uppercase text-[#22D3EE] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Step {step.stepNumber} Wiring Procedure</span>
          </h4>
          <p className="text-xs text-[#CBD5E1] leading-relaxed">
            {step.instruction}
          </p>

          {step.warning && (
            <div className="mt-2 p-2 rounded-[4px] bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{step.warning}</span>
            </div>
          )}
        </div>

        {/* Multimeter Verification */}
        <div className="space-y-2 border-t md:border-t-0 md:border-l border-[#1E293B] md:pl-4">
          <h4 className="text-xs font-mono font-bold uppercase text-amber-400 flex items-center gap-1.5">
            <span>⚡ Multimeter Verification Check</span>
          </h4>
          <div className="p-2.5 rounded-[4px] bg-[#162234] border border-[#243044] text-xs font-mono text-[#E6EDF3]">
            {step.expectedMultimeterReading}
          </div>
          <p className="text-[11px] text-[#9BA8B7] leading-relaxed">
            Measure these exact test points before executing firmware. Safe electrical validation prevents accidental short circuits and damaged silicon.
          </p>
        </div>
      </div>
    </div>
  );
};
