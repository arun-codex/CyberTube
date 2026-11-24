'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCcw, Layers, ZoomIn, ZoomOut, AlertCircle, Cpu, CheckCircle2 } from 'lucide-react';

type ModelViewMode = 'esp32-board' | 'breadboard-assembly' | 'industrial-node';

export const Device3DViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeModel, setActiveModel] = useState<ModelViewMode>('esp32-board');
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [selectedPart, setSelectedPart] = useState<string | null>('ESP-WROOM-32 Module');
  const [useFallback2D, setUseFallback2D] = useState<boolean>(false);

  // References to Three.js objects for animation/cleanup
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Rotation and zoom state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    if (useFallback2D) return;

    const canvas = canvasRef.current;
    const container = mountRef.current;
    if (!canvas || !container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a0f18);

    // 2. Camera setup
    const width = container.clientWidth || 700;
    const height = 380;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 18, 28);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer setup
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: 'default',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      rendererRef.current = renderer;
    } catch (e) {
      console.warn('WebGL initialization failed, falling back to 2D view', e);
      setWebglSupported(false);
      setUseFallback2D(true);
      return;
    }

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight1.position.set(15, 25, 20);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x22d3ee, 0.4);
    dirLight2.position.set(-20, -10, -15);
    scene.add(dirLight2);

    // 5. Build geometry group based on activeModel
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    modelGroupRef.current = rootGroup;

    buildModelGeometry(rootGroup, activeModel, isExploded);

    // 6. Animation loop
    const animate = () => {
      if (!isDraggingRef.current && rootGroup) {
        rootGroup.rotation.y += 0.003; // Gentle ambient rotation
      }
      renderer.render(scene, camera);
      animFrameIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    // 7. Mouse/Touch interaction listeners
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !rootGroup) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      rootGroup.rotation.y += deltaX * 0.008;
      rootGroup.rotation.x += deltaY * 0.008;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      const zoomFactor = e.deltaY * 0.02;
      cameraRef.current.position.z = Math.max(12, Math.min(50, cameraRef.current.position.z + zoomFactor));
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    // 8. Resize listener
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newWidth = container.clientWidth;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js resources cleanly
      scene.clear();
      renderer.dispose();
    };
  }, [activeModel, isExploded, useFallback2D]);

  // Helper to construct procedural 3D meshes without external GLTF assets
  const buildModelGeometry = (group: THREE.Group, mode: ModelViewMode, exploded: boolean) => {
    // Clear previous children
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    const explodeOffset = exploded ? 4.5 : 0;

    if (mode === 'esp32-board') {
      // PCB Board (Dark Matte Fiber)
      const pcbGeo = new THREE.BoxGeometry(10, 0.4, 18);
      const pcbMat = new THREE.MeshStandardMaterial({ color: 0x111c24, roughness: 0.8 });
      const pcb = new THREE.Mesh(pcbGeo, pcbMat);
      pcb.position.y = 0;
      group.add(pcb);

      // ESP-WROOM-32 Metal RF Can
      const canGeo = new THREE.BoxGeometry(7.5, 0.8, 8);
      const canMat = new THREE.MeshStandardMaterial({ color: 0x8a99a8, metalness: 0.85, roughness: 0.25 });
      const can = new THREE.Mesh(canGeo, canMat);
      can.position.set(0, 0.6 + explodeOffset, -3.5);
      group.add(can);

      // Micro-USB Port
      const usbGeo = new THREE.BoxGeometry(3, 1, 2.5);
      const usbMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9, roughness: 0.2 });
      const usb = new THREE.Mesh(usbGeo, usbMat);
      usb.position.set(0, 0.6 + (exploded ? explodeOffset * 0.4 : 0), 8.5);
      group.add(usb);

      // Dual Pin Headers (15 pins on left, 15 pins on right)
      const pinMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.7, roughness: 0.3 });
      for (let i = -7; i <= 7; i++) {
        const leftPin = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.5, 8), pinMat);
        leftPin.position.set(-4.5, -1 - (exploded ? explodeOffset * 0.5 : 0), i * 1.05);
        group.add(leftPin);

        const rightPin = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.5, 8), pinMat);
        rightPin.position.set(4.5, -1 - (exploded ? explodeOffset * 0.5 : 0), i * 1.05);
        group.add(rightPin);
      }

      // Status LEDs (Power Red, GPIO 2 Blue)
      const pwrLed = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.5), new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 0.8 }));
      pwrLed.position.set(-2.5, 0.35 + explodeOffset * 0.3, 3);
      group.add(pwrLed);

      const ioLed = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.5), new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 0.8 }));
      ioLed.position.set(2.5, 0.35 + explodeOffset * 0.3, 3);
      group.add(ioLed);

      // Reset & Boot Buttons
      const btnMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.4 });
      const rstBtn = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 1), btnMat);
      rstBtn.position.set(-3.5, 0.4 + explodeOffset * 0.3, 7.5);
      group.add(rstBtn);

      const bootBtn = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 1), btnMat);
      bootBtn.position.set(3.5, 0.4 + explodeOffset * 0.3, 7.5);
      group.add(bootBtn);
    } else if (mode === 'breadboard-assembly') {
      // Breadboard Base
      const bbGeo = new THREE.BoxGeometry(16, 0.8, 24);
      const bbMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 });
      const bb = new THREE.Mesh(bbGeo, bbMat);
      bb.position.y = -1;
      group.add(bb);

      // ESP32 mounted on breadboard
      const espPcb = new THREE.Mesh(new THREE.BoxGeometry(8, 0.4, 14), new THREE.MeshStandardMaterial({ color: 0x111c24 }));
      espPcb.position.set(-2, 0.4 + (exploded ? explodeOffset : 0), -2);
      group.add(espPcb);

      // Metal Shield
      const can = new THREE.Mesh(new THREE.BoxGeometry(6, 0.6, 6), new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8 }));
      can.position.set(-2, 0.9 + (exploded ? explodeOffset * 1.5 : 0), -4);
      group.add(can);

      // DHT22 Sensor module
      const dht = new THREE.Mesh(new THREE.BoxGeometry(2.5, 4, 1.8), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 }));
      dht.position.set(5, 1.5 + (exploded ? explodeOffset * 0.8 : 0), -4);
      group.add(dht);

      // 5mm LED
      const led = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 1.5, 16), new THREE.MeshStandardMaterial({ color: 0xdc2626, emissive: 0xdc2626, emissiveIntensity: 0.6 }));
      led.position.set(5, 0.8 + (exploded ? explodeOffset * 0.6 : 0), 2);
      group.add(led);

      // Tactile Button
      const btn = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.8, 1.6), new THREE.MeshStandardMaterial({ color: 0x0284c7 }));
      btn.position.set(5, 0.4 + (exploded ? explodeOffset * 0.4 : 0), 6);
      group.add(btn);

      // Wire jumpers
      const wireMatRed = new THREE.MeshStandardMaterial({ color: 0xef4444 });
      const wireMatBlue = new THREE.MeshStandardMaterial({ color: 0x38bdf8 });
      const wire1 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 6, 8), wireMatRed);
      wire1.rotation.z = Math.PI / 3;
      wire1.position.set(2, 0.2, -1);
      group.add(wire1);

      const wire2 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 7, 8), wireMatBlue);
      wire2.rotation.z = -Math.PI / 4;
      wire2.position.set(1.5, 0.2, 3);
      group.add(wire2);
    } else {
      // Industrial DIN-Rail Edge Node
      const encGeo = new THREE.BoxGeometry(12, 10, 8);
      const encMat = new THREE.MeshStandardMaterial({ color: 0x263238, roughness: 0.7 });
      const enc = new THREE.Mesh(encGeo, encMat);
      enc.position.y = 0;
      group.add(enc);

      // Terminal Block top
      const termMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.5 });
      const termTop = new THREE.Mesh(new THREE.BoxGeometry(10, 1.5, 2.5), termMat);
      termTop.position.set(0, 5.2 + (exploded ? explodeOffset : 0), 2);
      group.add(termTop);

      // Status Beacon
      const beacon = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 2.5, 16), new THREE.MeshStandardMaterial({ color: 0x22d3ee, emissive: 0x0e7490, emissiveIntensity: 0.7 }));
      beacon.position.set(0, 6 + (exploded ? explodeOffset * 1.5 : 0), -2);
      group.add(beacon);

      // DIN Rail Clip at back
      const railGeo = new THREE.BoxGeometry(14, 2, 1);
      const railMat = new THREE.MeshStandardMaterial({ color: 0x78909c, metalness: 0.8 });
      const rail = new THREE.Mesh(railGeo, railMat);
      rail.position.set(0, 0, -4.5);
      group.add(rail);
    }
  };

  const handleResetCamera = () => {
    if (!cameraRef.current || !modelGroupRef.current) return;
    cameraRef.current.position.set(0, 18, 28);
    cameraRef.current.lookAt(0, 0, 0);
    modelGroupRef.current.rotation.set(0, 0, 0);
  };

  return (
    <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#0c121c] p-4 sm:p-5 text-[#E6EDF3] space-y-4">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1E293B]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-[4px] bg-cyan-500/20 text-cyan-400 font-mono text-xs font-bold">
              3D CAD
            </span>
            <h3 className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#E6EDF3]">
              Rotatable 3D Hardware Model & PCB Inspection
            </h3>
          </div>
          <p className="text-[11px] text-[#9BA8B7] mt-0.5">
            Real WebGL 3D geometry rendered in-browser. Drag with mouse to orbit 360°, scroll to zoom, inspect pin headers.
          </p>
        </div>

        {/* Model Switcher & Fallback Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveModel('esp32-board')}
            className={`px-2.5 py-1 rounded-[4px] text-xs font-mono transition-colors cursor-pointer ${
              activeModel === 'esp32-board'
                ? 'bg-[#0E7490] text-white font-semibold'
                : 'bg-[#162234] text-[#9BA8B7] hover:bg-[#1f2f47]'
            }`}
          >
            ESP32 DevKit
          </button>
          <button
            type="button"
            onClick={() => setActiveModel('breadboard-assembly')}
            className={`px-2.5 py-1 rounded-[4px] text-xs font-mono transition-colors cursor-pointer ${
              activeModel === 'breadboard-assembly'
                ? 'bg-[#0E7490] text-white font-semibold'
                : 'bg-[#162234] text-[#9BA8B7] hover:bg-[#1f2f47]'
            }`}
          >
            Smart-Room Assembly
          </button>
          <button
            type="button"
            onClick={() => setActiveModel('industrial-node')}
            className={`px-2.5 py-1 rounded-[4px] text-xs font-mono transition-colors cursor-pointer ${
              activeModel === 'industrial-node'
                ? 'bg-[#0E7490] text-white font-semibold'
                : 'bg-[#162234] text-[#9BA8B7] hover:bg-[#1f2f47]'
            }`}
          >
            Industrial Node
          </button>

          <button
            type="button"
            onClick={() => setUseFallback2D(!useFallback2D)}
            className="px-2 py-1 rounded-[4px] border border-[#243044] bg-[#162234] hover:bg-[#1f2f47] text-xs font-mono text-[#9BA8B7] cursor-pointer"
            title="Switch between 3D WebGL and accessible 2D Schematic"
          >
            {useFallback2D ? 'Switch to 3D' : '2D Fallback'}
          </button>
        </div>
      </div>

      {/* 3D Canvas / 2D Fallback */}
      {useFallback2D ? (
        /* Accessible 2D Fallback Netlist & Schematic */
        <div className="p-4 rounded-[6px] border border-[#1E293B] bg-[#070b12] space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Accessible 2D Schematic & Pinout Netlist (Reduced Motion / Low-Spec Mode)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 rounded-[4px] bg-[#121A26] border border-[#243044] space-y-2">
              <h5 className="font-bold text-[#E6EDF3] uppercase">ESP32 Pin Header Netlist (Left Side)</h5>
              <ul className="space-y-1 text-[#9BA8B7] text-[11px]">
                <li><strong className="text-rose-400">3V3:</strong> Regulated 3.3V power output (max 500mA from LDO)</li>
                <li><strong className="text-cyan-400">GND:</strong> Ground reference common return</li>
                <li><strong className="text-[#E6EDF3]">GPIO 15:</strong> Strapping pin / PWM / Transistor Base control</li>
                <li><strong className="text-[#E6EDF3]">GPIO 2:</strong> Strapping pin / Onboard Blue LED / Status output</li>
                <li><strong className="text-[#E6EDF3]">GPIO 4:</strong> Pushbutton digital input (with 10k pull-down)</li>
                <li><strong className="text-[#E6EDF3]">RX2 / GPIO 16:</strong> UART2 Serial Receive (3.3V logic)</li>
                <li><strong className="text-[#E6EDF3]">TX2 / GPIO 17:</strong> UART2 Serial Transmit (3.3V logic)</li>
              </ul>
            </div>

            <div className="p-3 rounded-[4px] bg-[#121A26] border border-[#243044] space-y-2">
              <h5 className="font-bold text-[#E6EDF3] uppercase">ESP32 Pin Header Netlist (Right Side)</h5>
              <ul className="space-y-1 text-[#9BA8B7] text-[11px]">
                <li><strong className="text-[#E6EDF3]">GPIO 5:</strong> Strapping pin / DHT22 single-wire data bus</li>
                <li><strong className="text-[#E6EDF3]">GPIO 18:</strong> VSPI SCK / SPI Clock</li>
                <li><strong className="text-[#E6EDF3]">GPIO 19:</strong> VSPI MISO / SPI Input</li>
                <li><strong className="text-[#E6EDF3]">GPIO 21:</strong> I2C SDA (OLED Display / BME280 Data)</li>
                <li><strong className="text-[#E6EDF3]">GPIO 22:</strong> I2C SCL (OLED Display / BME280 Clock)</li>
                <li><strong className="text-[#E6EDF3]">GPIO 23:</strong> VSPI MOSI / SPI Output</li>
                <li><strong className="text-rose-400">VIN (5V):</strong> Unregulated 5V input from USB port</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* WebGL 3D Canvas */
        <div ref={mountRef} className="relative w-full rounded-[6px] overflow-hidden border border-[#1E293B] bg-[#0a0f18]">
          <canvas
            ref={canvasRef}
            className="w-full cursor-grab active:cursor-grabbing block"
            style={{ height: '380px' }}
          />

          {/* Canvas Floating Overlay Controls */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setIsExploded(!isExploded)}
              className={`p-2 rounded-[4px] border text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                isExploded
                  ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300'
                  : 'bg-[#121A26]/80 border-[#243044] text-[#9BA8B7] hover:bg-[#1a2638]'
              }`}
              title="Toggle exploded 3D component view"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isExploded ? 'Collapse' : 'Explode View'}</span>
            </button>

            <button
              type="button"
              onClick={handleResetCamera}
              className="p-2 rounded-[4px] border border-[#243044] bg-[#121A26]/80 text-[#9BA8B7] hover:bg-[#1a2638] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset 3D Camera"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset View</span>
            </button>
          </div>

          <div className="absolute bottom-2 left-3 text-[10px] font-mono text-[#64748B] pointer-events-none">
            Click & drag to rotate • Scroll to zoom
          </div>
        </div>
      )}

      {/* Part Specifications & Safety Callout */}
      <div className="p-3 rounded-[6px] border border-[#1E293B] bg-[#121A26] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span className="text-[#9BA8B7]">Inspecting: </span>
          <span className="text-[#E6EDF3] font-bold">
            {activeModel === 'esp32-board'
              ? 'ESP32 DevKit V1 (Xtensa Dual-Core 240MHz, 520KB SRAM, 4MB Flash)'
              : activeModel === 'breadboard-assembly'
              ? 'Complete Smart-Room Monitoring Prototype Assembly'
              : 'Industrial DIN-Rail Edge Telemetry Gateway Node'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-amber-300 text-[11px]">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Strict 3.3V GPIO Logic Limit — Never apply 5V logic signals.</span>
        </div>
      </div>
    </div>
  );
};
