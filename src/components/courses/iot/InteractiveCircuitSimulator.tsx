'use client';

import React, { useState } from 'react';
import {
  Zap,
  Power,
  Sliders,
  Calculator,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Info,
} from 'lucide-react';

interface SimulatorProps {
  moduleNumber?: number;
}

export const InteractiveCircuitSimulator: React.FC<SimulatorProps> = ({ moduleNumber = 2 }) => {
  // 1. Circuit power state
  const [powerOn, setPowerOn] = useState<boolean>(true);

  // 2. Button and LED states
  const [buttonPressed, setButtonPressed] = useState<boolean>(false);
  const [selectedLedResistor, setSelectedLedResistor] = useState<number>(220); // 220, 330, 1000, 0 (dangerous)

  // 3. Environmental Sensor Simulation
  const [simTemperature, setSimTemperature] = useState<number>(24.5);
  const [simHumidity, setSimHumidity] = useState<number>(48.0);

  // 4. Transistor Actuator State
  const [transistorBaseHigh, setTransistorBaseHigh] = useState<boolean>(false);
  const [hasFlybackDiode, setHasFlybackDiode] = useState<boolean>(true);

  // 5. Ohm's Law Calculator State
  const [calcVoltage, setCalcVoltage] = useState<number>(3.3);
  const [calcResistance, setCalcResistance] = useState<number>(220);

  // Calculations
  const vSupply = powerOn ? 3.3 : 0.0;
  const vLedDrop = powerOn && (buttonPressed || transistorBaseHigh) ? 2.0 : 0.0;
  const ledCurrentMa =
    powerOn && selectedLedResistor > 0 && (buttonPressed || transistorBaseHigh)
      ? Math.round(((vSupply - vLedDrop) / selectedLedResistor) * 1000 * 100) / 100
      : selectedLedResistor === 0 && powerOn
      ? 150 // Extreme overcurrent short circuit
      : 0;

  // Transistor States
  const transistorState = !powerOn
    ? 'UNPOWERED'
    : transistorBaseHigh
    ? 'SATURATION (SWITCH CLOSED)'
    : 'CUTOFF (SWITCH OPEN)';
  const vCe = !powerOn ? 0.0 : transistorBaseHigh ? 0.18 : 3.3;

  // Ohm's law calculated current & power
  const calculatedCurrentA = calcResistance > 0 ? calcVoltage / calcResistance : 0;
  const calculatedCurrentMa = Math.round(calculatedCurrentA * 1000 * 10) / 10;
  const calculatedPowerMw = Math.round(calcVoltage * calculatedCurrentMa * 10) / 10;

  // Wokwi Project Links based on module
  const wokwiProjects = [
    {
      title: 'ESP32 Push-Button Debounce & Status LED',
      description: 'GPIO 4 input with 10kΩ pull-down resistor driving GPIO 2 status LED with software debouncing.',
      url: 'https://wokwi.com/projects/new/esp32',
      tags: ['GPIO', 'Debounce', 'LED', '3.3V Logic'],
    },
    {
      title: 'DHT22 Environmental Telemetry on ESP32',
      description: 'Single-bus digital temperature and humidity sensor reading with CRC8 parity validation.',
      url: 'https://wokwi.com/projects/new/esp32',
      tags: ['DHT22', 'Single-Wire', 'CRC8', 'Sensors'],
    },
    {
      title: '2N2222 Transistor Driver with Flyback Diode',
      description: 'Low-side NPN BJT driver circuit safely switching an inductive 3.3V buzzer coil.',
      url: 'https://wokwi.com/projects/new/esp32',
      tags: ['BJT', 'Flyback Diode', 'Actuator', 'Protection'],
    },
    {
      title: 'ESP32 Mosquitto MQTT Telemetry Publisher',
      description: 'Secure Wi-Fi client publishing JSON sensor packets to an authenticated MQTT broker.',
      url: 'https://wokwi.com/projects/new/esp32',
      tags: ['MQTT', 'Wi-Fi', 'Telemetry', 'Network'],
    },
  ];

  return (
    <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#0c121c] p-4 sm:p-5 text-[#E6EDF3] space-y-6">
      {/* Simulator Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1E293B]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-[4px] bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">
              CIRCUIT SIMULATOR
            </span>
            <h3 className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#E6EDF3]">
              Interactive Electronic Circuit & Sensor Behavior Lab
            </h3>
          </div>
          <p className="text-[11px] text-[#9BA8B7] mt-0.5">
            Explore live circuit states, test pushbuttons, calculate Ohm&apos;s law current limits, and inspect BJT switching.
          </p>
        </div>

        {/* Global DC Power Switch */}
        <button
          type="button"
          onClick={() => setPowerOn(!powerOn)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-[4px] font-mono text-xs font-bold transition-colors cursor-pointer ${
            powerOn
              ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.35)]'
              : 'bg-rose-950/80 border border-rose-500 text-rose-300'
          }`}
        >
          <Power className="w-3.5 h-3.5" />
          <span>{powerOn ? '3.3V DC POWER: ON' : 'POWER: OFF (0V)'}</span>
        </button>
      </div>

      {/* Simulator Educational Notice */}
      <div className="p-3 rounded-[6px] bg-[#121A26] border border-[#243044] flex items-start gap-2.5 text-xs font-mono text-[#9BA8B7]">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#E6EDF3]">Educational Simulation Notice: </strong>
          This interactive tool models fundamental circuit logic, Ohm&apos;s law calculations, and digital sensor states for hands-on learning.
          Always verify real-world circuits using physical bench multimeters and oscilloscope probes.
        </div>
      </div>

      {/* Grid of Interactive Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* MODULE A: Push-Button & LED Circuit */}
        <div className="p-4 rounded-[6px] border border-[#1E293B] bg-[#070b12] space-y-4">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
            <h4 className="font-mono text-xs font-bold text-[#E6EDF3] flex items-center gap-1.5 uppercase">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span>1. GPIO Button & LED Circuit</span>
            </h4>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-[3px] border border-cyan-800/50">
              Module 02 & 04
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            {/* Push Button Trigger */}
            <div className="p-3 rounded-[4px] bg-[#121A26] border border-[#243044] space-y-2 text-center">
              <span className="text-[11px] text-[#9BA8B7] block">Push-Button (GPIO 4)</span>
              <button
                type="button"
                onMouseDown={() => setButtonPressed(true)}
                onMouseUp={() => setButtonPressed(false)}
                onTouchStart={() => setButtonPressed(true)}
                onTouchEnd={() => setButtonPressed(false)}
                className={`w-full py-3 rounded-[6px] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  buttonPressed
                    ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.6)] translate-y-0.5'
                    : 'bg-[#1E293B] text-[#E6EDF3] hover:bg-[#2A3B52] border border-[#334155]'
                }`}
              >
                {buttonPressed ? 'PRESSED (3.3V)' : 'HOLD TO PRESS'}
              </button>
              <span className="text-[10px] text-[#64748B] block">
                {buttonPressed ? 'Logic State: HIGH (1)' : 'Logic State: LOW (0)'}
              </span>
            </div>

            {/* LED Actuator State */}
            <div className="p-3 rounded-[4px] bg-[#121A26] border border-[#243044] space-y-2 text-center flex flex-col items-center justify-center">
              <span className="text-[11px] text-[#9BA8B7]">Status LED (GPIO 2)</span>
              <div
                className={`w-10 h-10 rounded-full border-2 transition-all duration-150 flex items-center justify-center ${
                  powerOn && (buttonPressed || transistorBaseHigh) && selectedLedResistor > 0
                    ? 'bg-emerald-400 border-white shadow-[0_0_20px_#34d399]'
                    : selectedLedResistor === 0 && powerOn
                    ? 'bg-rose-500 border-yellow-300 shadow-[0_0_25px_#f43f5e] animate-ping'
                    : 'bg-[#1e293b] border-[#475569]'
                }`}
              >
                <Zap
                  className={`w-4 h-4 ${
                    powerOn && (buttonPressed || transistorBaseHigh) ? 'text-black' : 'text-[#475569]'
                  }`}
                />
              </div>
              <span className="text-[10px] font-mono text-[#CBD5E1]">
                {powerOn && (buttonPressed || transistorBaseHigh)
                  ? selectedLedResistor === 0
                    ? 'OVERCURRENT BURNOUT'
                    : `LIT (${ledCurrentMa} mA)`
                  : 'OFF (0 mA)'}
              </span>
            </div>
          </div>

          {/* Resistor Selection */}
          <div className="space-y-1.5 text-xs font-mono">
            <span className="text-[11px] text-[#9BA8B7]">Series Resistor Value (Current Limiter):</span>
            <div className="grid grid-cols-4 gap-1.5">
              {[220, 330, 1000, 0].map((rVal) => (
                <button
                  key={rVal}
                  type="button"
                  onClick={() => setSelectedLedResistor(rVal)}
                  className={`py-1 rounded-[4px] text-center text-xs transition-colors cursor-pointer ${
                    selectedLedResistor === rVal
                      ? rVal === 0
                        ? 'bg-rose-600 text-white font-bold'
                        : 'bg-emerald-600 text-white font-bold'
                      : 'bg-[#121A26] border border-[#243044] text-[#9BA8B7] hover:bg-[#1A2638]'
                  }`}
                >
                  {rVal === 0 ? '0 Ω (Short)' : `${rVal} Ω`}
                </button>
              ))}
            </div>
            {selectedLedResistor === 0 && (
              <div className="p-2 rounded-[4px] bg-rose-950/60 border border-rose-500/50 text-rose-300 text-[11px] flex items-center gap-1.5 mt-2">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Danger: 0 Ω short circuit! Current exceeds 100mA, destroying the ESP32 GPIO pad.</span>
              </div>
            )}
          </div>
        </div>

        {/* MODULE B: 2N2222 Transistor Switching */}
        <div className="p-4 rounded-[6px] border border-[#1E293B] bg-[#070b12] space-y-4">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
            <h4 className="font-mono text-xs font-bold text-[#E6EDF3] flex items-center gap-1.5 uppercase">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>2. Transistor Low-Side Switching</span>
            </h4>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-[3px] border border-cyan-800/50">
              Module 06
            </span>
          </div>

          <div className="p-3 rounded-[4px] bg-[#121A26] border border-[#243044] space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-[#9BA8B7]">Base Drive Pin (GPIO 15 via 1kΩ):</span>
              <button
                type="button"
                onClick={() => setTransistorBaseHigh(!transistorBaseHigh)}
                className={`px-3 py-1 rounded-[4px] text-xs font-bold cursor-pointer transition-colors ${
                  transistorBaseHigh ? 'bg-cyan-500 text-black' : 'bg-[#1E293B] text-[#9BA8B7] border border-[#334155]'
                }`}
              >
                {transistorBaseHigh ? 'BASE: HIGH (3.3V)' : 'BASE: LOW (0V)'}
              </button>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[#9BA8B7]">1N4007 Flyback Diode:</span>
              <button
                type="button"
                onClick={() => setHasFlybackDiode(!hasFlybackDiode)}
                className={`px-3 py-1 rounded-[4px] text-xs font-bold cursor-pointer transition-colors ${
                  hasFlybackDiode
                    ? 'bg-emerald-600 text-white'
                    : 'bg-rose-950 border border-rose-500 text-rose-300'
                }`}
              >
                {hasFlybackDiode ? 'INSTALLED (SAFE)' : 'MISSING (RISK)'}
              </button>
            </div>
          </div>

          {/* Transistor Operating Point Readings */}
          <div className="p-3 rounded-[4px] bg-[#121A26] border border-[#243044] space-y-1.5 text-xs font-mono">
            <div className="flex justify-between text-[11px]">
              <span className="text-[#9BA8B7]">BJT Operating Region:</span>
              <strong className={transistorBaseHigh ? 'text-emerald-400' : 'text-slate-400'}>
                {transistorState}
              </strong>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-[#9BA8B7]">Collector-Emitter Voltage (Vce):</span>
              <span className="text-[#E6EDF3] font-bold">{vCe} V</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-[#9BA8B7]">Actuator Load (Buzzer / Relay):</span>
              <span className={transistorBaseHigh && powerOn ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                {transistorBaseHigh && powerOn ? 'ENERGIZED (3.3V across coil)' : 'DE-ENERGIZED (0V)'}
              </span>
            </div>
            {!hasFlybackDiode && transistorBaseHigh && (
              <div className="text-[10px] text-amber-300 pt-1">
                Warning: Without flyback clamping diode, switching off the coil will generate a reverse voltage spike (&gt;50V).
              </div>
            )}
          </div>
        </div>

        {/* MODULE C: Environmental Telemetry Generator */}
        <div className="p-4 rounded-[6px] border border-[#1E293B] bg-[#070b12] space-y-4">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
            <h4 className="font-mono text-xs font-bold text-[#E6EDF3] flex items-center gap-1.5 uppercase">
              <Sliders className="w-3.5 h-3.5 text-purple-400" />
              <span>3. DHT22 & BME280 Sensor Telemetry</span>
            </h4>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-[3px] border border-cyan-800/50">
              Module 05 & 08
            </span>
          </div>

          {/* Temperature Slider */}
          <div className="space-y-1 text-xs font-mono">
            <div className="flex justify-between text-[11px]">
              <span className="text-[#9BA8B7]">Ambient Temperature:</span>
              <strong className="text-cyan-300">{simTemperature}°C</strong>
            </div>
            <input
              type="range"
              min="-10"
              max="60"
              step="0.5"
              value={simTemperature}
              onChange={(e) => setSimTemperature(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Humidity Slider */}
          <div className="space-y-1 text-xs font-mono">
            <div className="flex justify-between text-[11px]">
              <span className="text-[#9BA8B7]">Relative Humidity:</span>
              <strong className="text-purple-300">{simHumidity}% RH</strong>
            </div>
            <input
              type="range"
              min="10"
              max="95"
              step="1"
              value={simHumidity}
              onChange={(e) => setSimHumidity(parseFloat(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer"
            />
          </div>

          {/* Simulated MQTT Payload */}
          <div className="p-2.5 rounded-[4px] bg-[#121A26] border border-[#243044] space-y-1 text-[11px] font-mono">
            <div className="text-[#64748B]">Simulated Outbound MQTT Payload:</div>
            <pre className="text-emerald-400 bg-[#070b12] p-2 rounded overflow-x-auto">
{`topic: "devices/esp32-room01/telemetry"
payload: {
  "device_id": "esp32-wroom-9f82",
  "temperature_c": ${simTemperature.toFixed(1)},
  "humidity_pct": ${simHumidity.toFixed(1)},
  "crc_valid": true,
  "vcc_rail": 3.30
}`}
            </pre>
          </div>
        </div>

        {/* MODULE D: Ohm's Law Calculator */}
        <div className="p-4 rounded-[6px] border border-[#1E293B] bg-[#070b12] space-y-4">
          <div className="flex items-center justify-between border-b border-[#1E293B] pb-2">
            <h4 className="font-mono text-xs font-bold text-[#E6EDF3] flex items-center gap-1.5 uppercase">
              <Calculator className="w-3.5 h-3.5 text-rose-400" />
              <span>4. Ohm&apos;s Law & Power Calculator</span>
            </h4>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-[3px] border border-cyan-800/50">
              Module 02
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="space-y-1">
              <label className="text-[11px] text-[#9BA8B7]">DC Voltage (V):</label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={calcVoltage}
                onChange={(e) => setCalcVoltage(parseFloat(e.target.value) || 0)}
                className="w-full p-1.5 rounded-[4px] bg-[#121A26] border border-[#243044] text-[#E6EDF3] font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-[#9BA8B7]">Resistance (Ω):</label>
              <input
                type="number"
                min="1"
                max="10000"
                step="10"
                value={calcResistance}
                onChange={(e) => setCalcResistance(parseInt(e.target.value, 10) || 1)}
                className="w-full p-1.5 rounded-[4px] bg-[#121A26] border border-[#243044] text-[#E6EDF3] font-bold"
              />
            </div>
          </div>

          <div className="p-3 rounded-[4px] bg-[#121A26] border border-[#243044] space-y-1.5 text-xs font-mono">
            <div className="flex justify-between text-[11px]">
              <span className="text-[#9BA8B7]">Calculated Current (I = V / R):</span>
              <strong className="text-cyan-300">{calculatedCurrentMa} mA</strong>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-[#9BA8B7]">Power Dissipated (P = V × I):</span>
              <strong className="text-yellow-300">{calculatedPowerMw} mW</strong>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-[#9BA8B7]">Resistor Rating Recommended:</span>
              <span className="text-[#CBD5E1]">1/4 Watt (250 mW) carbon film</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: Wokwi Online Cloud Simulator Links */}
      <div className="p-4 rounded-[6px] border border-[#1E293B] bg-[#121A26] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E293B] pb-2">
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-cyan-400" />
            <h4 className="font-mono text-xs font-bold text-[#E6EDF3] uppercase">
              Wokwi Browser Simulator Projects
            </h4>
          </div>
          <span className="text-[11px] font-mono text-[#9BA8B7]">
            Full Cycle ESP32 C++ / MicroPython Code Simulation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
          {wokwiProjects.map((p, idx) => (
            <a
              key={idx}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-[4px] bg-[#0c121c] border border-[#243044] hover:border-cyan-500/60 transition-colors block group cursor-pointer"
            >
              <div className="flex items-center justify-between text-[#E6EDF3] group-hover:text-cyan-400 font-bold">
                <span>{p.title}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </div>
              <p className="text-[11px] text-[#9BA8B7] mt-1 leading-relaxed">{p.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {p.tags.map((t, tid) => (
                  <span
                    key={tid}
                    className="px-1.5 py-0.5 rounded-[2px] bg-[#162234] text-[10px] text-cyan-300 border border-[#243044]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
