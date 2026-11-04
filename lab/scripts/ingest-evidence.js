#!/usr/bin/env node
/**
 * CyberTube Evidence Ingestion Pipeline
 *
 * Reads raw REA evidence JSON files from a source directory,
 * sanitizes local filesystem paths, assigns a case ID,
 * and writes normalized evidence to the target case's evidence/ directory.
 *
 * Usage:
 *   node lab/scripts/ingest-evidence.js <source-file> <case-id>
 *
 * Example:
 *   node lab/scripts/ingest-evidence.js "C:\Users\dutch\REA-Lab\reports\pe-imports.json" case-001-pe-security
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function sanitizePaths(obj) {
  if (typeof obj === 'string') {
    // Replace Windows absolute paths with sanitized relative references
    return obj.replace(/[A-Z]:\\\\[^"\\]*\\\\/gi, '<system>\\')
              .replace(/[A-Z]:\\[^"]*\\/gi, '<system>/');
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitizePaths);
  }
  if (obj && typeof obj === 'object') {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      if (key === 'local_path') {
        // Completely remove local_path from published evidence
        continue;
      }
      result[key] = sanitizePaths(value);
    }
    return result;
  }
  return obj;
}

function ingestEvidence(sourceFile, caseId) {
  // Validate arguments
  if (!sourceFile || !caseId) {
    console.error('Usage: node ingest-evidence.js <source-file> <case-id>');
    process.exit(1);
  }

  // Read raw evidence
  const rawContent = fs.readFileSync(sourceFile, 'utf-8').trim();
  const rawEvidence = JSON.parse(rawContent);

  // Sanitize paths
  const sanitized = sanitizePaths(rawEvidence);

  // Add CyberTube metadata
  sanitized.case_id = caseId;
  sanitized.created_at = sanitized.created_at || new Date().toISOString();

  // Ensure residual_unknowns field exists
  if (!sanitized.residual_unknowns) {
    sanitized.residual_unknowns = [];
  }

  // Determine output path
  const casesDir = path.resolve(__dirname, '..', '..', 'cases', caseId, 'evidence');
  fs.mkdirSync(casesDir, { recursive: true });

  const outputName = `${sanitized.operation}.json`;
  const outputPath = path.join(casesDir, outputName);

  // Write sanitized evidence
  fs.writeFileSync(outputPath, JSON.stringify(sanitized, null, 2), 'utf-8');

  console.log(`✓ Ingested: ${path.basename(sourceFile)}`);
  console.log(`  Evidence ID: ${sanitized.evidence_id}`);
  console.log(`  Operation:   ${sanitized.operation}`);
  console.log(`  Subject:     ${sanitized.subject?.name}`);
  console.log(`  Confidence:  ${sanitized.confidence}`);
  console.log(`  Output:      ${outputPath}`);
}

// Run
const [,, sourceFile, caseId] = process.argv;
ingestEvidence(sourceFile, caseId);
