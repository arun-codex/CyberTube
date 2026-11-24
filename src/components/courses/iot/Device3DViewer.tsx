'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, Layers, Cpu, CheckCircle2, AlertCircle, Info, ShieldAlert } from 'lucide-react';

export type ModelViewMode =
  | 'esp32-devkit'
  | 'breadboard-assembly'
  | 'dht22-bme280'
  | 'transistor-actuator'
  | 'raspberry-pi-gateway'
  | 'secure-smart-room';

interface ComponentSpec {
  name: string;
  pins: string;
  voltage: string;
  role: string;
  securityNotice: string;
}

const MODEL_SPECS: Record<ModelViewMode, { title: string; subtitle: string; parts: ComponentSpec[] }> = {
  'esp32-devkit': {
    title: 'ESP32 DevKit V1 (30-Pin Microcontroller)',
    subtitle: 'Xtensa Dual-Core 240MHz, 520KB SRAM, 4MB SPI Flash, 3.3V Logic Level',
    parts: [
      {
        name: 'ESP-WROOM-32 Metal RF Shield Can',
        pins: 'Internal RF & SoC',
        voltage: '3.0V – 3.6V (Nominal 3.3V)',
        role: 'Shields RF Wi-Fi/BLE transceiver and Dual-Core Xtensa LX6 CPU from EMI.',
        securityNotice: 'Subject to EM fault injection and physical side-channel power probing if unshielded.',
      },
      {
        name: 'CP2102 / CH340 USB-to-UART Bridge',
        pins: 'GPIO 1 (TX0), GPIO 3 (RX0), DTR, RTS',
        voltage: '5V USB in / 3.3V Logic out',
        role: 'Facilitates firmware flashing via esptool.py and serial debugging console.',
        securityNotice: 'Serial console leaks bootloader logs and interactive root shell if not disabled in production eFuses.',
      },
      {
        name: 'Dual 15-Pin GPIO Pin Headers (2.54mm pitch)',
        pins: 'GPIO 0-39, 3V3, GND, VIN, EN',
        voltage: 'Strictly 3.3V max (non 5V tolerant)',
        role: 'Hardware interface for digital sensors, PWM actuators, I2C, SPI, and UART.',
        securityNotice: 'Applying 5V logic signals destroys the internal protection clamping diodes and input buffers.',
      },
      {
        name: 'Hardware EN (Reset) & BOOT (GPIO 0) Buttons',
        pins: 'EN (Reset active LOW), GPIO 0 (Bootloader trap)',
        voltage: '3.3V logic pull-up',
        role: 'Pulls GPIO 0 LOW during power-on reset to enter ROM serial download mode.',
        securityNotice: 'Physical access allows forced bootloader entry and flash memory readout unless eFuse FLASH_CRYPT_CNT is burned.',
      },
    ],
  },
  'breadboard-assembly': {
    title: '400-Point Solderless Breadboard & Prototyping Assembly',
    subtitle: 'Tie-Point Breadboard with ESP32, 220Ω Resistor, 5mm LED, Push-Button & DHT22',
    parts: [
      {
        name: '400-Point Solderless Breadboard Rails',
        pins: 'Dual Power Distribution Buses (+ & -)',
        voltage: 'Up to 3.3V DC (Recommended <= 5V)',
        role: 'Provides standard 0.1" pitch spring-clip sockets for rapid circuit assembly without soldering.',
        securityNotice: 'High stray capacitance (2-5pF between columns) can distort high-speed SPI bus signals (>10MHz).',
      },
      {
        name: 'Tactile 4-Pin Momentary Push Button',
        pins: 'Pin A-B, Pin C-D (Normally Open)',
        voltage: '3.3V with 10kΩ pull-down to GND',
        role: 'Generates user trigger input. Pressing connects 3.3V to GPIO 4.',
        securityNotice: 'Mechanical contacts bounce for 5-20ms; requires software debouncing or hardware RC low-pass filter.',
      },
      {
        name: '5mm Diffused Status LED & 220Ω Resistor',
        pins: 'Anode (Long lead -> GPIO 2), Cathode (Flat edge -> GND)',
        voltage: 'Vf = 2.0V, If = 5.9mA @ 3.3V rail',
        role: 'Visual actuator for heartbeat, network connection status, and tamper alarms.',
        securityNotice: 'Never omit the current-limiting resistor; shorting GPIO directly to GND damages output driver pads.',
      },
    ],
  },
  'dht22-bme280': {
    title: 'DHT22 (AM2302) & BME280 Environmental Sensor Breakouts',
    subtitle: 'Capacitive Humidity, Thermistor Temperature, and Bosch MEMS Barometric Pressure',
    parts: [
      {
        name: 'DHT22 Digital Humidity & Temperature Sensor',
        pins: 'Pin 1: VCC (3.3V), Pin 2: DATA (GPIO 5), Pin 3: NC, Pin 4: GND',
        voltage: '3.3V – 5.5V DC (Use 3.3V on ESP32)',
        role: 'Single-bus proprietary digital protocol with 40-bit frame and 8-bit checksum.',
        securityNotice: 'Unauthenticated single-wire bus; an attacker with physical probe access can spoof fake environmental readings.',
      },
      {
        name: 'BME280 Combined Pressure, Humidity & Temperature Sensor',
        pins: 'VCC (3.3V), GND, SCL (GPIO 22), SDA (GPIO 21), CSB, SDO',
        voltage: '1.71V – 3.6V DC',
        role: 'High-precision I2C/SPI environmental monitoring with digital factory calibration registers.',
        securityNotice: 'I2C address 0x76/0x77 can be jammed or spoofed by bus rogue devices on shared SDA/SCL lines.',
      },
    ],
  },
  'transistor-actuator': {
    title: 'Transistor-Controlled Low-Voltage Actuator Driver',
    subtitle: '2N2222 NPN BJT, 1kΩ Base Resistor, 1N4007 Flyback Diode & Piezo/Buzzer Load',
    parts: [
      {
        name: '2N2222 TO-92 NPN Bipolar Junction Transistor',
        pins: 'Pin 1: Emitter (GND), Pin 2: Base (GPIO 15 via 1kΩ), Pin 3: Collector (Load -)',
        voltage: 'Vceo = 40V, Ic max = 800mA, Vbe(sat) = 0.7V',
        role: 'Low-side electronic switch allowing ESP32 GPIO (max 12mA) to drive higher-current actuators.',
        securityNotice: 'Ensure base resistor limits base current to ~2.6mA to prevent microcontroller GPIO pin overheating.',
      },
      {
        name: '1N4007 Rectifier Diode (Flyback Clamping)',
        pins: 'Cathode (Silver band -> +3.3V), Anode (Collector / Load -)',
        voltage: 'Vr = 1000V, If = 1A',
        role: 'Clamps inductive back-EMF voltage spikes generated when inductive coils (relays, motors) are de-energized.',
        securityNotice: 'Omission of flyback diode produces >50V reverse transients that instantly puncture the switching transistor.',
      },
      {
        name: 'Piezoelectric Buzzer / Low-Voltage Solenoid',
        pins: 'Positive (+) to 3.3V, Negative (-) to Collector',
        voltage: '3.3V DC operation',
        role: 'Acoustic alarm annunciator triggered during physical intrusion or network tamper events.',
        securityNotice: 'Can be muted or bypassed if wires are clipped; wire as normally-energized supervisory loop in high-security roles.',
      },
    ],
  },
  'raspberry-pi-gateway': {
    title: 'Raspberry Pi 4 IoT Edge Gateway',
    subtitle: 'Quad-Core Broadcom BCM2711, 40-Pin GPIO, Gigabit Ethernet & Local Mosquitto Broker',
    parts: [
      {
        name: 'Broadcom BCM2711 SoC with Aluminum Heatsink',
        pins: 'Quad-Core Cortex-A72 @ 1.5GHz, 4GB LPDDR4',
        voltage: '5V/3A via USB-C input',
        role: 'Runs hardened Linux OS, Mosquitto MQTT broker, Zeek packet analyzer, and local forensic collector.',
        securityNotice: 'Unauthenticated SSH or default credentials (pi:raspberry) allow full root takeover of the local IoT network.',
      },
      {
        name: 'RJ-45 Gigabit Ethernet & Dual-Band 802.11ac Wi-Fi',
        pins: 'Integrated 10/100/1000BASE-T Magnetics',
        voltage: 'Isolated Ethernet PHY',
        role: 'Connects isolated IoT device VLAN to central SOC monitoring and logging infrastructure.',
        securityNotice: 'Gateway must enforce strict iptables firewall rules preventing IoT nodes from traversing into corporate subnets.',
      },
      {
        name: '40-Pin Extended GPIO Expansion Header',
        pins: 'Pin 1-40 (3.3V Logic, I2C, SPI, UART, PWM)',
        voltage: 'Strictly 3.3V Logic Level',
        role: 'Hardware debug interface and logic analyzer connection tap for snooping bus packets.',
        securityNotice: 'Hardware UART console (Pin 8/10) gives serial terminal access if physically exposed to adversaries.',
      },
    ],
  },
  'secure-smart-room': {
    title: 'Complete Secure Smart-Room Monitoring System',
    subtitle: 'Integrated IoT Node: Dual Environmental Sensors, Cryptographic Firmware, Tamper Loop & OLED',
    parts: [
      {
        name: 'Laser-Cut Acrylic Enclosure & Standoffs',
        pins: 'Mechanical mounting platform',
        voltage: 'Non-conductive insulating chassis',
        role: 'Protects delicate breadboard and jumper assemblies while providing physical inspection visibility.',
        securityNotice: 'Equipped with micro-switch tamper loop that zeroes volatile crypto keys if enclosure cover is lifted.',
      },
      {
        name: '0.96" I2C Monochrome OLED Display (SSD1306)',
        pins: 'VCC (3.3V), GND, SCL (GPIO 22), SDA (GPIO 21)',
        voltage: '3.3V DC',
        role: 'Displays live telemetry, TLS connection state, active MQTT topic, and intrusion alert codes.',
        securityNotice: 'Displays sensitive device IP and status codes; screen blanking prevents visual shoulder-surfing in public rooms.',
      },
      {
        name: 'Hardware Test Point Header (TP1-TP4)',
        pins: 'TP1 (3V3), TP2 (GND), TP3 (UART TX), TP4 (UART RX)',
        voltage: '3.3V Test Probes',
        role: 'Allows students to attach multimeters, Saleae logic analyzers, and oscilloscopes for packet verification.',
        securityNotice: 'Production commercial designs must remove test pads or ground them to impede adversary reverse engineering.',
      },
    ],
  },
};

export const Device3DViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeModel, setActiveModel] = useState<ModelViewMode>('esp32-devkit');
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [selectedPartIndex, setSelectedPartIndex] = useState<number>(0);
  const [useFallback2D, setUseFallback2D] = useState<boolean>(false);

  // References to Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Mouse interaction state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  const currentSpecs = MODEL_SPECS[activeModel];

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
    const height = 400;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 18, 30);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. WebGL Renderer
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
      console.warn('WebGL init failed, using accessible 2D fallback', e);
      setWebglSupported(false);
      setUseFallback2D(true);
      return;
    }

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.95);
    dirLight1.position.set(20, 30, 25);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x06b6d4, 0.45);
    dirLight2.position.set(-25, -15, -20);
    scene.add(dirLight2);

    // 5. Build procedural 3D model geometry
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    modelGroupRef.current = rootGroup;

    buildProgrammaticModel(rootGroup, activeModel, isExploded);

    // 6. Animation loop
    const animate = () => {
      if (!isDraggingRef.current && rootGroup) {
        rootGroup.rotation.y += 0.0035; // Gentle continuous orbit
      }
      renderer.render(scene, camera);
      animFrameIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    // 7. Mouse and touch interaction
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
      const zoomDelta = e.deltaY * 0.025;
      cameraRef.current.position.z = Math.max(12, Math.min(55, cameraRef.current.position.z + zoomDelta));
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    // 8. Responsive resize
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

      // Clean disposal of Three.js objects
      scene.clear();
      renderer.dispose();
    };
  }, [activeModel, isExploded, useFallback2D]);

  // Procedural geometry constructor for all 6 models
  const buildProgrammaticModel = (group: THREE.Group, mode: ModelViewMode, exploded: boolean) => {
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    const exOffset = exploded ? 4.5 : 0;

    if (mode === 'esp32-devkit') {
      // 1. ESP32 DevKit V1 Board
      // PCB
      const pcb = new THREE.Mesh(
        new THREE.BoxGeometry(10, 0.4, 18),
        new THREE.MeshStandardMaterial({ color: 0x111c24, roughness: 0.85 })
      );
      group.add(pcb);

      // Metal RF Can
      const can = new THREE.Mesh(
        new THREE.BoxGeometry(7.5, 0.8, 8),
        new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 })
      );
      can.position.set(0, 0.6 + exOffset, -3.5);
      group.add(can);

      // Micro-USB Port
      const usb = new THREE.Mesh(
        new THREE.BoxGeometry(3, 1, 2.5),
        new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.95, roughness: 0.15 })
      );
      usb.position.set(0, 0.6 + (exploded ? exOffset * 0.4 : 0), 8.5);
      group.add(usb);

      // CP2102 Bridge IC
      const bridge = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 0.4, 2.5),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 })
      );
      bridge.position.set(0, 0.35 + (exploded ? exOffset * 0.3 : 0), 4);
      group.add(bridge);

      // 3.3V LDO Voltage Regulator (AMS1117-3.3)
      const ldo = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 0.6, 1.4),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 })
      );
      ldo.position.set(-2.5, 0.4 + (exploded ? exOffset * 0.3 : 0), 6);
      group.add(ldo);

      // Dual Pin Headers (15 pins on left, 15 pins on right)
      const pinMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.25 });
      for (let i = -7; i <= 7; i++) {
        const lp = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.5, 8), pinMat);
        lp.position.set(-4.5, -1 - (exploded ? exOffset * 0.5 : 0), i * 1.05);
        group.add(lp);

        const rp = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.5, 8), pinMat);
        rp.position.set(4.5, -1 - (exploded ? exOffset * 0.5 : 0), i * 1.05);
        group.add(rp);
      }

      // Status LEDs (Red Power, Blue GPIO 2)
      const pwr = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.3, 0.5),
        new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 0.85 })
      );
      pwr.position.set(-2.5, 0.35 + exOffset * 0.25, 2);
      group.add(pwr);

      const ioLed = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.3, 0.5),
        new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 0.85 })
      );
      ioLed.position.set(2.5, 0.35 + exOffset * 0.25, 2);
      group.add(ioLed);

      // Tactile Buttons (EN & BOOT)
      const btnMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.4 });
      const rstBtn = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 1), btnMat);
      rstBtn.position.set(-3.5, 0.4 + exOffset * 0.25, 7.5);
      group.add(rstBtn);

      const bootBtn = new THREE.Mesh(new THREE.BoxGeometry(1, 0.6, 1), btnMat);
      bootBtn.position.set(3.5, 0.4 + exOffset * 0.25, 7.5);
      group.add(bootBtn);
    } else if (mode === 'breadboard-assembly') {
      // 2. Breadboard with ESP32 & Discrete Components
      const bb = new THREE.Mesh(
        new THREE.BoxGeometry(18, 0.8, 26),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 })
      );
      bb.position.y = -1;
      group.add(bb);

      // Power Rails (+ Red, - Blue)
      const railRed = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.1, 24),
        new THREE.MeshStandardMaterial({ color: 0xef4444 })
      );
      railRed.position.set(-8.2, -0.55, 0);
      group.add(railRed);

      const railBlue = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.1, 24),
        new THREE.MeshStandardMaterial({ color: 0x38bdf8 })
      );
      railBlue.position.set(-7.5, -0.55, 0);
      group.add(railBlue);

      // ESP32 mounted
      const esp = new THREE.Mesh(
        new THREE.BoxGeometry(8, 0.4, 15),
        new THREE.MeshStandardMaterial({ color: 0x111c24 })
      );
      esp.position.set(-2, 0.4 + (exploded ? exOffset : 0), -3);
      group.add(esp);

      // DHT22 Sensor
      const dht = new THREE.Mesh(
        new THREE.BoxGeometry(2.8, 4.2, 1.8),
        new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 })
      );
      dht.position.set(5.5, 1.6 + (exploded ? exOffset * 0.9 : 0), -4);
      group.add(dht);

      // 5mm LED
      const led = new THREE.Mesh(
        new THREE.CylinderGeometry(0.6, 0.6, 1.5, 16),
        new THREE.MeshStandardMaterial({ color: 0xdc2626, emissive: 0xdc2626, emissiveIntensity: 0.7 })
      );
      led.position.set(5.5, 0.8 + (exploded ? exOffset * 0.6 : 0), 2);
      group.add(led);

      // Push button
      const btn = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 0.8, 1.8),
        new THREE.MeshStandardMaterial({ color: 0x0284c7 })
      );
      btn.position.set(5.5, 0.4 + (exploded ? exOffset * 0.4 : 0), 7);
      group.add(btn);

      // Jumpers
      const j1 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 7, 8),
        new THREE.MeshStandardMaterial({ color: 0xef4444 })
      );
      j1.rotation.z = Math.PI / 3.2;
      j1.position.set(2, 0.2, -1);
      group.add(j1);

      const j2 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 8, 8),
        new THREE.MeshStandardMaterial({ color: 0x10b981 })
      );
      j2.rotation.z = -Math.PI / 3.8;
      j2.position.set(2, 0.2, 4);
      group.add(j2);
    } else if (mode === 'dht22-bme280') {
      // 3. Environmental Sensor Modules (DHT22 & BME280)
      // DHT22 (White slotted plastic casing with 4 pins)
      const dhtBody = new THREE.Mesh(
        new THREE.BoxGeometry(6, 9, 3.5),
        new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.35 })
      );
      dhtBody.position.set(-5, 3 + (exploded ? exOffset * 0.6 : 0), 0);
      group.add(dhtBody);

      // DHT22 Vents
      for (let y = 1; y <= 5; y++) {
        const vent = new THREE.Mesh(
          new THREE.BoxGeometry(4.5, 0.4, 0.3),
          new THREE.MeshStandardMaterial({ color: 0x64748b })
        );
        vent.position.set(-5, y + (exploded ? exOffset * 0.6 : 0), 1.8);
        group.add(vent);
      }

      // 4 Pins for DHT22
      const pinMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.8 });
      for (let p = 0; p < 4; p++) {
        const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 3, 8), pinMat);
        pin.position.set(-6.5 + p * 1, -2.5 - (exploded ? exOffset * 0.4 : 0), 0);
        group.add(pin);
      }

      // BME280 Breakout (Purple PCB with LGA chip and 6 pins)
      const bmePcb = new THREE.Mesh(
        new THREE.BoxGeometry(5.5, 0.4, 7),
        new THREE.MeshStandardMaterial({ color: 0x581c87, roughness: 0.6 })
      );
      bmePcb.position.set(5.5, 1 + (exploded ? exOffset * 0.6 : 0), 0);
      group.add(bmePcb);

      // Bosch LGA MEMS sensor can
      const bmeCan = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 0.6, 1.8),
        new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.95, roughness: 0.15 })
      );
      bmeCan.position.set(5.5, 1.5 + (exploded ? exOffset : 0), -1);
      group.add(bmeCan);

      // 6-Pin Header for BME280
      const goldPin = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.85 });
      for (let p = 0; p < 6; p++) {
        const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.5, 8), goldPin);
        pin.position.set(3.5 + p * 0.8, -0.6 - (exploded ? exOffset * 0.4 : 0), 3);
        group.add(pin);
      }
    } else if (mode === 'transistor-actuator') {
      // 4. Transistor-Controlled Actuator Circuit
      // Base substrate board
      const sub = new THREE.Mesh(
        new THREE.BoxGeometry(16, 0.4, 14),
        new THREE.MeshStandardMaterial({ color: 0x0f172a })
      );
      sub.position.y = -1;
      group.add(sub);

      // 2N2222 TO-92 Transistor (Semi-cylinder black epoxy)
      const to92 = new THREE.Mesh(
        new THREE.CylinderGeometry(1.2, 1.2, 2.2, 16, 1, false, 0, Math.PI),
        new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.4 })
      );
      to92.position.set(-3, 1 + (exploded ? exOffset * 0.7 : 0), 0);
      to92.rotation.y = Math.PI / 2;
      group.add(to92);

      // 3 Leads (Emitter, Base, Collector)
      const leadMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.7 });
      for (let l = -1; l <= 1; l++) {
        const lead = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2, 8), leadMat);
        lead.position.set(-3 + l * 0.8, -0.4 - (exploded ? exOffset * 0.3 : 0), 0);
        group.add(lead);
      }

      // 1kΩ Resistor (Base Drive)
      const res = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.4, 2.5, 12),
        new THREE.MeshStandardMaterial({ color: 0xd97706 })
      );
      res.rotation.z = Math.PI / 2;
      res.position.set(-6, 0.3 + (exploded ? exOffset * 0.5 : 0), 0);
      group.add(res);

      // 1N4007 Flyback Diode (Black cylinder with silver cathode band)
      const diode = new THREE.Mesh(
        new THREE.CylinderGeometry(0.6, 0.6, 3, 16),
        new THREE.MeshStandardMaterial({ color: 0x111827 })
      );
      diode.rotation.x = Math.PI / 2;
      diode.position.set(2, 0.5 + (exploded ? exOffset * 0.6 : 0), 0);
      group.add(diode);

      const cathodeBand = new THREE.Mesh(
        new THREE.CylinderGeometry(0.62, 0.62, 0.6, 16),
        new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9 })
      );
      cathodeBand.rotation.x = Math.PI / 2;
      cathodeBand.position.set(2, 0.5 + (exploded ? exOffset * 0.6 : 0), -1);
      group.add(cathodeBand);

      // Piezo Buzzer / Relay Cylindrical Actuator
      const buzzer = new THREE.Mesh(
        new THREE.CylinderGeometry(2.5, 2.5, 2.8, 24),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 })
      );
      buzzer.position.set(5.5, 1.2 + (exploded ? exOffset * 0.9 : 0), 0);
      group.add(buzzer);

      // Hole in buzzer top
      const hole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.6, 0.6, 0.2, 16),
        new THREE.MeshStandardMaterial({ color: 0x020617 })
      );
      hole.position.set(5.5, 2.7 + (exploded ? exOffset * 0.9 : 0), 0);
      group.add(hole);
    } else if (mode === 'raspberry-pi-gateway') {
      // 5. Raspberry Pi 4 Edge Gateway
      const rpiPcb = new THREE.Mesh(
        new THREE.BoxGeometry(18, 0.5, 13),
        new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 })
      );
      group.add(rpiPcb);

      // Broadcom SoC + Aluminum Heatsink
      const heatsink = new THREE.Mesh(
        new THREE.BoxGeometry(4, 2, 4),
        new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.25 })
      );
      heatsink.position.set(-2, 1.2 + (exploded ? exOffset * 0.8 : 0), 0);
      group.add(heatsink);

      // RJ-45 Gigabit Ethernet Jack
      const eth = new THREE.Mesh(
        new THREE.BoxGeometry(3.5, 3, 4.5),
        new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8 })
      );
      eth.position.set(7.5, 1.6 + (exploded ? exOffset * 0.5 : 0), 3.5);
      group.add(eth);

      // 4x USB Ports (2 Blue USB 3.0, 2 Grey USB 2.0)
      const usb3 = new THREE.Mesh(
        new THREE.BoxGeometry(3.2, 3, 3.8),
        new THREE.MeshStandardMaterial({ color: 0x0284c7 })
      );
      usb3.position.set(7.5, 1.6 + (exploded ? exOffset * 0.5 : 0), -1);
      group.add(usb3);

      const usb2 = new THREE.Mesh(
        new THREE.BoxGeometry(3.2, 3, 3.8),
        new THREE.MeshStandardMaterial({ color: 0x475569 })
      );
      usb2.position.set(7.5, 1.6 + (exploded ? exOffset * 0.5 : 0), -4.5);
      group.add(usb2);

      // 40-Pin GPIO Header (2x20 pins)
      const pinMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.85 });
      for (let r = 0; r < 2; r++) {
        for (let c = 0; c < 20; c++) {
          const p = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2, 8), pinMat);
          p.position.set(-7 + c * 0.6, 1.2 + (exploded ? exOffset * 0.4 : 0), -5 + r * 0.6);
          group.add(p);
        }
      }

      // Dual Micro-HDMI Ports
      const hdmi1 = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 0.8, 1.4),
        new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9 })
      );
      hdmi1.position.set(-2, 0.6 + (exploded ? exOffset * 0.3 : 0), 6);
      group.add(hdmi1);

      const hdmi2 = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 0.8, 1.4),
        new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9 })
      );
      hdmi2.position.set(1.5, 0.6 + (exploded ? exOffset * 0.3 : 0), 6);
      group.add(hdmi2);
    } else {
      // 6. Complete Secure Smart-Room Prototype
      // Laser-cut transparent acrylic baseplate
      const acrylic = new THREE.Mesh(
        new THREE.BoxGeometry(22, 0.4, 20),
        new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.25,
          roughness: 0.1,
          metalness: 0.2,
        })
      );
      acrylic.position.y = -1;
      group.add(acrylic);

      // Brass Standoffs (4 corners)
      const standoffMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.85 });
      [
        [-9, -8],
        [-9, 8],
        [9, -8],
        [9, 8],
      ].forEach(([x, z]) => {
        const so = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 2, 12), standoffMat);
        so.position.set(x, 0, z);
        group.add(so);
      });

      // ESP32 Node
      const esp = new THREE.Mesh(
        new THREE.BoxGeometry(8, 0.4, 14),
        new THREE.MeshStandardMaterial({ color: 0x111c24 })
      );
      esp.position.set(-4, 0.5 + (exploded ? exOffset * 0.6 : 0), 0);
      group.add(esp);

      // DHT22 Sensor
      const dht = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 4, 2),
        new THREE.MeshStandardMaterial({ color: 0xf8fafc })
      );
      dht.position.set(5, 1.8 + (exploded ? exOffset * 0.8 : 0), -5);
      group.add(dht);

      // 0.96" OLED Screen (Glass surface with cyan glowing display)
      const oled = new THREE.Mesh(
        new THREE.BoxGeometry(4.5, 0.3, 4.5),
        new THREE.MeshStandardMaterial({ color: 0x0284c7, emissive: 0x0284c7, emissiveIntensity: 0.6 })
      );
      oled.position.set(5, 0.5 + (exploded ? exOffset * 0.7 : 0), 2);
      group.add(oled);

      // Tamper Trip Switch
      const tamper = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 1.2, 1.5),
        new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 })
      );
      tamper.position.set(5, 0.8 + (exploded ? exOffset * 0.5 : 0), 7);
      group.add(tamper);
    }
  };

  const handleResetCamera = () => {
    if (!cameraRef.current || !modelGroupRef.current) return;
    cameraRef.current.position.set(0, 18, 30);
    cameraRef.current.lookAt(0, 0, 0);
    modelGroupRef.current.rotation.set(0, 0, 0);
  };

  return (
    <div className="rounded-[8px] border border-[#e4e4ed] dark:border-[#243044] bg-[#0c121c] p-4 sm:p-5 text-[#E6EDF3] space-y-4">
      {/* Top Header & Model Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1E293B]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-[4px] bg-cyan-500/20 text-cyan-400 font-mono text-xs font-bold">
              3D CAD LAB
            </span>
            <h3 className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#E6EDF3]">
              Rotatable 3D Hardware CAD & Interactive PCB Inspection
            </h3>
          </div>
          <p className="text-[11px] text-[#9BA8B7] mt-0.5">
            Full Three.js WebGL procedural geometry. Drag to orbit 360°, scroll to zoom, inspect pinouts, and review low-voltage safety.
          </p>
        </div>

        {/* 2D Fallback Switcher */}
        <button
          type="button"
          onClick={() => setUseFallback2D(!useFallback2D)}
          className="px-2.5 py-1 rounded-[4px] border border-[#243044] bg-[#162234] hover:bg-[#1f2f47] text-xs font-mono text-cyan-400 cursor-pointer"
          title="Switch between 3D WebGL and accessible 2D Schematic"
        >
          {useFallback2D ? 'Switch to 3D WebGL' : 'Accessible 2D Mode'}
        </button>
      </div>

      {/* 6 Model Selector Buttons */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-[6px] bg-[#070b12] border border-[#1E293B]">
        {(
          [
            ['esp32-devkit', 'ESP32 DevKit'],
            ['breadboard-assembly', 'Breadboard Lab'],
            ['dht22-bme280', 'Sensor Modules'],
            ['transistor-actuator', 'Transistor Driver'],
            ['raspberry-pi-gateway', 'Raspberry Pi Gateway'],
            ['secure-smart-room', 'Complete Smart-Room'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setActiveModel(id);
              setSelectedPartIndex(0);
            }}
            className={`px-3 py-1.5 rounded-[4px] text-xs font-mono transition-colors cursor-pointer ${
              activeModel === id
                ? 'bg-[#0E7490] text-white font-semibold shadow-sm'
                : 'bg-[#121A26] text-[#9BA8B7] hover:bg-[#1A2638] hover:text-[#E6EDF3]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Main 3D Canvas / 2D Accessible Fallback */}
      {useFallback2D ? (
        /* Accessible 2D Fallback */
        <div className="p-4 rounded-[6px] border border-[#1E293B] bg-[#070b12] space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Accessible 2D Schematic & Pinout Netlist (Reduced Motion / Low-Spec Mode)</span>
          </div>

          <div className="p-3 rounded-[4px] bg-[#121A26] border border-[#243044] space-y-2">
            <h4 className="font-mono text-xs font-bold text-[#E6EDF3] uppercase">{currentSpecs.title}</h4>
            <p className="text-[11px] font-mono text-[#9BA8B7]">{currentSpecs.subtitle}</p>

            <div className="divide-y divide-[#1E293B] pt-2">
              {currentSpecs.parts.map((p, idx) => (
                <div key={idx} className="py-2 space-y-1 text-xs font-mono">
                  <div className="flex items-center justify-between text-[#E6EDF3]">
                    <strong className="text-cyan-300">{p.name}</strong>
                    <span className="text-rose-400 text-[11px]">{p.voltage}</span>
                  </div>
                  <div className="text-[11px] text-[#9BA8B7]">
                    <strong>Pins / Bus:</strong> {p.pins}
                  </div>
                  <div className="text-[11px] text-[#CBD5E1]">
                    <strong>Role:</strong> {p.role}
                  </div>
                  <div className="text-[11px] text-amber-300">
                    <strong>Security Notice:</strong> {p.securityNotice}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* WebGL 3D Interactive Canvas */
        <div ref={mountRef} className="relative w-full rounded-[6px] overflow-hidden border border-[#1E293B] bg-[#0a0f18]">
          <canvas
            ref={canvasRef}
            className="w-full cursor-grab active:cursor-grabbing block"
            style={{ height: '400px' }}
          />

          {/* Floating Controls Overlay */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setIsExploded(!isExploded)}
              className={`p-2 rounded-[4px] border text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                isExploded
                  ? 'bg-cyan-950/90 border-cyan-500 text-cyan-300 shadow-lg'
                  : 'bg-[#121A26]/80 border-[#243044] text-[#9BA8B7] hover:bg-[#1a2638]'
              }`}
              title="Toggle exploded 3D component view"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isExploded ? 'Collapse View' : 'Explode View'}</span>
            </button>

            <button
              type="button"
              onClick={handleResetCamera}
              className="p-2 rounded-[4px] border border-[#243044] bg-[#121A26]/80 text-[#9BA8B7] hover:bg-[#1a2638] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset 3D Camera"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Camera</span>
            </button>
          </div>

          <div className="absolute bottom-2 left-3 text-[10px] font-mono text-[#64748B] pointer-events-none">
            Click & drag to orbit • Scroll to zoom • WebGL Accelerated
          </div>
        </div>
      )}

      {/* Component Inspector & Specs Panel */}
      <div className="p-4 rounded-[6px] border border-[#1E293B] bg-[#121A26] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E293B] pb-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <h4 className="font-mono text-xs font-bold text-[#E6EDF3] uppercase">{currentSpecs.title}</h4>
          </div>
          <div className="flex items-center gap-1.5 text-amber-300 text-[11px] font-mono">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>Strict Low-Voltage DC Safety Boundary: &lt;= 3.3V Logic Level</span>
          </div>
        </div>

        {/* Part Selection Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-[#9BA8B7]">Inspect Part:</span>
          {currentSpecs.parts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedPartIndex(idx)}
              className={`px-2 py-0.5 rounded-[4px] text-[11px] font-mono transition-colors cursor-pointer ${
                selectedPartIndex === idx
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'bg-[#0c121c] text-[#9BA8B7] border border-[#243044] hover:bg-[#1a2638]'
              }`}
            >
              {p.name.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Active Part Details */}
        {currentSpecs.parts[selectedPartIndex] && (
          <div className="p-3 rounded-[4px] bg-[#0c121c] border border-[#1E293B] space-y-1.5 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#E6EDF3]">{currentSpecs.parts[selectedPartIndex].name}</span>
              <span className="text-rose-400 text-[11px] font-semibold">
                Rating: {currentSpecs.parts[selectedPartIndex].voltage}
              </span>
            </div>
            <p className="text-[11px] text-[#9BA8B7]">
              <strong>Pinout / Signal Net:</strong> {currentSpecs.parts[selectedPartIndex].pins}
            </p>
            <p className="text-[11px] text-[#CBD5E1]">
              <strong>Function in IoT System:</strong> {currentSpecs.parts[selectedPartIndex].role}
            </p>
            <p className="text-[11px] text-amber-300">
              <strong>Cybersecurity Vulnerability:</strong> {currentSpecs.parts[selectedPartIndex].securityNotice}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
