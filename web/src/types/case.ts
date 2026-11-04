/**
 * CyberTube Case Study Type Definitions
 */

export type CaseDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type CaseStatus = 'draft' | 'published' | 'archived';

export type CaseDomain =
  | 'pe-static'
  | 'dotnet'
  | 'electron'
  | 'web-bundle'
  | 'android'
  | 'native-decompilation'
  | 'firmware';

export interface CaseLearningObjective {
  id: string;
  description: string;
  rea_tools: string[];
}

export interface CaseQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string;
  evidence_ref?: string;
}

export interface CaseMetadata {
  id: string;
  title: string;
  slug: string;
  description: string;
  domain: CaseDomain;
  difficulty: CaseDifficulty;
  status: CaseStatus;
  version: string;
  created_at: string;
  updated_at: string;
  author: string;
  tags: string[];
  learning_objectives: CaseLearningObjective[];
  evidence_files: string[];
  quiz: CaseQuizQuestion[];
  prerequisites: string[];
}
