import { CybersecurityDomain, DifficultyLevel } from './resource';

export interface PracticalExercise {
  id: string;
  title: string;
  description: string;
  targetEnvironment: string; // e.g., 'Home Lab / Wireshark' | 'PortSwigger Academy' | 'TryHackMe'
  externalLabUrl?: string;
  instructions: string[];
  verificationCriteria: string;
}

export interface LearningStage {
  id: string;
  stageNumber: number;
  title: string;
  description: string;
  estimatedHours: number;
  difficulty: DifficultyLevel;
  topics: string[];
  exercises: PracticalExercise[];
  recommendedPlaylists: {
    title: string;
    playlistId?: string;
    videoId?: string;
    channelName: string;
    url: string;
    verified: boolean;
  }[];
}

export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  domain: CybersecurityDomain;
  targetAudience: string;
  prerequisites: string[];
  estimatedTotalHours: number;
  difficulty: DifficultyLevel;
  stages: LearningStage[];
  certificationTarget?: {
    name: string;
    examCode: string;
    officialUrl: string;
    lastVerifiedDate: string;
    status: 'active' | 'retired' | 'planned';
  };
}

