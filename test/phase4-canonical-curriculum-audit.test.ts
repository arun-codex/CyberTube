import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { IOT_CYBERSECURITY_ZERO_TO_ADVANCED_COURSE as course } from '../src/data/iot-cybersecurity-course';
import { IOT_VIDEO_MANIFEST } from '../src/data/iot/video-manifest';
import { IOT_PROJECTS } from '../src/data/iot/projects';
import { HARDWARE_CATALOG } from '../src/data/iot/hardware-catalog';
import { IOT_DIAGRAMS } from '../src/data/iot/diagrams';
import fs from 'node:fs';
import path from 'node:path';

describe('Phase 4 — Canonical Curriculum Reconciliation & Learning Integrity Audit', () => {
  const auditPath = path.resolve(process.cwd(), 'scripts/IOT-120-LESSON-SEMANTIC-AUDIT.json');
  const auditJson = JSON.parse(fs.readFileSync(auditPath, 'utf-8'));

  it('verifies exact 30-module canonical titles and sequential order', () => {
    assert.equal(course.modules.length, 30);
    assert.equal(IOT_PROJECTS.length, 30);

    const canonicalTitles = [
      'Introduction to IoT & Cybersecurity',
      'Electronic Components & Circuit Fundamentals',
      'ESP32 Programming & Hardware Architecture',
      'GPIO, LEDs, Buttons & Local Controls',
      'IoT Sensors & Data Integrity',
      'Transistors, MOSFETs, Actuators & Safety',
      'IoT Networking Fundamentals',
      'MQTT & Secure IoT Messaging',
      'IoT HTTP, CoAP & API Security',
      'Secure Smart-Room Monitoring Project',
      'UART, I2C & SPI Security',
      'Credentials, Device Identity & Secret Storage',
      'TLS, Certificates & Secure Messaging',
      'Firmware Updates, Secure Boot & OTA',
      'Wireshark for IoT Security',
      'IoT Threat Modeling',
      'Wireless IoT Security',
      'IoT Web & API Vulnerabilities',
      'Raspberry Pi & Embedded Linux Security',
      'Firmware Extraction & Analysis',
      'Firmware Reverse Engineering',
      'Firmware Emulation',
      'OWASP IoTGoat Security Testing',
      'Hardware Debugging & Interface Security',
      'IoT Malware & Botnet Investigation',
      'IoT SOC Monitoring & SIEM',
      'IoT Digital Forensics',
      'Industrial IoT Cybersecurity',
      'Secure IoT Product Engineering',
      'Final IoT Cybersecurity Capstone',
    ];

    course.modules.forEach((mod, idx) => {
      assert.equal(mod.order, idx + 1);
      assert.equal(mod.title, `Module ${String(idx + 1).padStart(2, '0')}: ${canonicalTitles[idx]}`);
    });
  });

  it('verifies 120 canonical lessons with exact title and video manifest agreement', () => {
    const allLessons = course.modules.flatMap((m) => m.lessons);
    assert.equal(allLessons.length, 120);
    assert.equal(IOT_VIDEO_MANIFEST.length, 120);
    assert.equal(auditJson.auditRecords.length, 120);

    // Assert 100% DIRECT_MATCH in semantic audit
    assert.equal(auditJson.directMatchCount, 120);
    assert.equal(auditJson.partialMatchCount, 0);
    assert.equal(auditJson.mismatchCount, 0);
    assert.equal(auditJson.unavailableCount, 0);

    allLessons.forEach((lesson, idx) => {
      const v = IOT_VIDEO_MANIFEST[idx];
      const a = auditJson.auditRecords[idx];

      assert.equal(lesson.order, (idx % 4) + 1);
      assert.equal(lesson.youtubeVideoId, v.videoId);
      assert.equal(lesson.title, v.topic);
      assert.equal(lesson.title, a.lessonTitle);
      assert.equal(v.videoId, a.videoId);
      assert.equal(a.classification, 'DIRECT_MATCH');
      assert.ok(lesson.durationMinutes > 0);
      assert.equal(lesson.durationMinutes, v.durationMinutes);
      assert.ok(lesson.description.length > 20);
      assert.ok(lesson.objectives.length >= 3);
      assert.ok(lesson.skillsTaught.length >= 3);
      assert.ok(lesson.richContent?.stepByStepProcedures?.length === 3);
      assert.ok(lesson.richContent?.theorySections?.length === 2);
    });
  });

  it('verifies the five critical curriculum mismatch upgrades', () => {
    // Lesson 10: ESP32 compile, flash and observe Serial output
    const l10 = course.modules[2].lessons[1];
    assert.equal(l10.youtubeVideoId, 'wia2sUjNpwI');
    assert.match(l10.title, /Compile, Flash & Serial Monitor Output/i);

    // Lesson 30: Publish ESP32 sensor telemetry to Mosquitto broker
    const l30 = course.modules[7].lessons[1];
    assert.equal(l30.youtubeVideoId, 'x5A5S0hoyJ0');
    assert.match(l30.title, /Publishing ESP32 Sensor Telemetry to Local Mosquitto Broker/i);

    // Lesson 34: Local ESP32 HTTP web server / REST API
    const l34 = course.modules[8].lessons[1];
    assert.equal(l34.youtubeVideoId, 'ZnaUBq_B3E4');
    assert.match(l34.title, /Controlled Read-Only Local HTTP Endpoints on ESP32/i);

    // Lesson 78: SHA-256 hashing and chain of custody
    const l78 = course.modules[19].lessons[1];
    assert.equal(l78.youtubeVideoId, '8lA3NaCNdN8');
    assert.match(l78.title, /Cryptographic Hashing, Verification & Chain of Custody/i);

    // Lesson 81: CPU architectures, strings and ELF basics
    const l81 = course.modules[20].lessons[0];
    assert.equal(l81.youtubeVideoId, 'OFAxXXcLXbc');
    assert.match(l81.title, /CPU Architectures: ARM, MIPS, RISC-V & ELF Binary Fundamentals/i);
  });

  it('verifies complete absence of quizzes across all modules, lessons, and course objects', () => {
    assert.ok(!('quiz' in course));
    for (const m of course.modules) {
      assert.ok(!m.quiz);
      assert.deepEqual(m.practicalLab?.questions, []);
      for (const l of m.lessons) {
        assert.ok(!l.quiz);
        assert.ok(!l.richContent?.knowledgeCheck);
      }
    }
  });

  it('verifies 30 practical labs, 6 portfolio milestones, and 100-mark Capstone rubric', () => {
    const portfolioProjects = IOT_PROJECTS.filter((p) => p.isPortfolioProject);
    assert.equal(portfolioProjects.length, 6);

    const capstone = course.modules[29].capstoneAssessment!;
    assert.ok(capstone);
    assert.equal(capstone.totalMarks, 100);
    assert.equal(capstone.passingScore, 75);
    assert.equal(capstone.rubric.length, 7);
    assert.equal(capstone.rubric.reduce((s, r) => s + r.marks, 0), 100);
  });

  it('verifies 20 SVG diagrams and 6 Three.js 3D viewer model options', () => {
    assert.ok(IOT_DIAGRAMS.length >= 20);
    assert.ok(HARDWARE_CATALOG.length >= 15);
  });
});
