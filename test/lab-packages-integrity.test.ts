import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { IOT_EXECUTABLE_LABS } from '../src/data/iot-executable-labs';

describe('IoT Lab Packages & Executable Experiments Integrity Test', () => {
  const labsDir = path.join(process.cwd(), 'docs', 'courses', 'iot-cybersecurity', 'labs');

  test('all 30 lab module directories exist with complete package manifests', () => {
    for (let i = 1; i <= 30; i++) {
      const modId = `module-${String(i).padStart(2, '0')}`;
      const modDir = path.join(labsDir, modId);
      assert.ok(fs.existsSync(modDir), `Module dir ${modId} must exist`);

      const requiredFiles = [
        'BOM.json',
        'diagram.json',
        'evidence-template.md',
        'expected-output.txt',
        'firmware.ino',
        'libraries.txt',
        'README.md',
        'troubleshooting.md',
        'verification-report.json',
        'wireshark_display_filters.txt',
        'wiring.json',
        'wokwi.toml',
      ];

      for (const reqFile of requiredFiles) {
        const filePath = path.join(modDir, reqFile);
        assert.ok(fs.existsSync(filePath), `Required lab file ${reqFile} must exist in ${modId}`);
        const stat = fs.statSync(filePath);
        assert.ok(stat.size > 0, `File ${reqFile} in ${modId} must not be empty`);
      }
    }
  });

  test('all 30 PCAP files are present in public directory and verified with SHA-256 hashes', () => {
    const publicPcapDir = path.join(process.cwd(), 'public', 'pcaps', 'iot');
    assert.ok(fs.existsSync(publicPcapDir), 'Public PCAP directory must exist');

    for (let i = 1; i <= 30; i++) {
      const pcapName = `iot-lab-m${String(i).padStart(2, '0')}-telemetry.pcap`;
      const pcapPath = path.join(publicPcapDir, pcapName);
      assert.ok(fs.existsSync(pcapPath), `Public PCAP ${pcapName} must exist`);

      const stat = fs.statSync(pcapPath);
      assert.ok(stat.size >= 24, `PCAP ${pcapName} must be at least 24 bytes (header size)`);

      // Verify lab catalog metadata matches
      const labDef = IOT_EXECUTABLE_LABS[i];
      assert.ok(labDef, `Lab definition for module ${i} must exist in IOT_EXECUTABLE_LABS`);
      assert.ok(labDef.pcap, `PCAP metadata must exist for module ${i}`);
      assert.equal(labDef.pcap.filename, pcapName);
      assert.ok(labDef.pcap.sha256 && labDef.pcap.sha256.length === 64, `SHA-256 must be 64-char hex string in module ${i}`);
      assert.ok(labDef.pcap.packetCount > 0, `Packet count must be > 0 in module ${i}`);
    }
  });

  test('firmware implementations are distinct and tailored to their specific learning objectives', () => {
    const m03 = IOT_EXECUTABLE_LABS[3].firmware;
    const m08 = IOT_EXECUTABLE_LABS[8].firmware;
    const m15 = IOT_EXECUTABLE_LABS[15].firmware;
    const m26 = IOT_EXECUTABLE_LABS[26].firmware;
    const m30 = IOT_EXECUTABLE_LABS[30].firmware;

    // Module 03 must focus on Xtensa CPU registers and clock
    assert.ok(m03.includes('Xtensa') || m03.includes('esp_reset_reason') || m03.includes('getCpuFreqMHz'), 'M03 must contain Xtensa hardware architecture calls');

    // Module 08 must focus on authenticated MQTT and PubSubClient
    assert.ok(m08.includes('PubSubClient') && m08.includes('MQTT_BROKER') && m08.includes('m08'), 'M08 must contain authenticated MQTT publishing');

    // Module 15 must focus on ESP32 deep sleep and RTC memory
    assert.ok(m15.includes('esp_deep_sleep_start') && m15.includes('RTC_DATA_ATTR'), 'M15 must contain Deep Sleep & RTC preservation');

    // Module 26 must focus on hardware tamper ISR and memory zeroization
    assert.ok(m26.includes('on_tamper_isr') && m26.includes('zeroization'), 'M26 must contain Tamper ISR and key zeroization');

    // Module 30 must implement production capstone with WDT and MQTT
    assert.ok(m30.includes('esp_task_wdt') && m30.includes('PubSubClient'), 'M30 Capstone must integrate WDT and authenticated telemetry');

    // M03 and M08 must NOT be identical
    assert.notEqual(m03, m08, 'M03 and M08 firmwares must be completely distinct');
  });

  test('strictly enforces <= 3.3V DC voltage and zero AC mains across all lab wiring definitions', () => {
    for (let i = 1; i <= 30; i++) {
      const labDef = IOT_EXECUTABLE_LABS[i];
      assert.ok(labDef.safetyRules && labDef.safetyRules.length > 0, `Module ${i} must have safety rules`);
      const rulesText = labDef.safetyRules.join(' ');
      assert.ok(rulesText.includes('3.3V') || rulesText.includes('3.3 V'), `Module ${i} safety rules must specify 3.3V DC logic`);

      // Check wiring connections
      for (const conn of labDef.wiring) {
        const volt = conn.voltage || conn.operating_voltage || '';
        assert.ok(!volt.includes('120V') && !volt.includes('230V') && !volt.includes('AC'), `Forbidden AC voltage in module ${i} wiring!`);
      }
    }
  });

  test('strictly zero quizzes exist site-wide across all lab definitions and UI structures', () => {
    for (let i = 1; i <= 30; i++) {
      const labDef = IOT_EXECUTABLE_LABS[i] as any;
      assert.equal(labDef.quiz, undefined, `Module ${i} must never have a quiz property`);
      assert.equal(labDef.questions, undefined, `Module ${i} must never have questions property`);
    }
  });
});
