/**
 * CyberTube Evidence Type Definitions
 *
 * These types mirror REA's canonical Evidence envelope structure,
 * verified against live rea-agents@6.8.0 output.
 */

export type ConfidenceLevel = 'observed' | 'inferred' | 'hypothesis' | 'unknown';
export type AuthorityType = 'shipped-artifact' | 'runtime-observation' | 'documentation';

export interface SubjectDigest {
  sha256: string;
  md5?: string;
}

export type ArtifactFormat =
  | 'pe'
  | 'elf'
  | 'macho'
  | 'dotnet'
  | 'electron-asar'
  | 'web-bundle'
  | 'apk';

export type Architecture =
  | 'x86'
  | 'x86_64'
  | 'arm64'
  | 'cil'
  | 'javascript';

export interface SubjectIdentity {
  name: string;
  digest: SubjectDigest;
  format: ArtifactFormat;
  architecture?: Architecture;
}

export interface ProviderMetadata {
  id: string;
  name: string;
  version: string | null;
}

export interface EvidenceCoverage {
  status: 'complete' | 'partial' | 'truncated';
  examined_items?: number;
  total_detected?: number;
}

export interface EvidenceLocation {
  kind: 'artifact-path' | 'file-offset-range';
  path?: string;
  start?: number;
  end?: number;
}

export interface CyberTubeEvidence<T = Record<string, unknown>> {
  evidence_id: string;
  case_id: string;
  subject: SubjectIdentity;
  provider: ProviderMetadata;
  rea_version?: string;
  operation: string;
  parameters: Record<string, unknown>;
  normalized_result: T;
  confidence: ConfidenceLevel;
  authority: AuthorityType;
  coverage?: EvidenceCoverage;
  limitations: string[];
  residual_unknowns: string[];
  evidence_links: string[];
  locations?: EvidenceLocation[];
  created_at: string;
}
