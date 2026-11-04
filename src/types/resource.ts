/**
 * CyberTube — Core Resource Type Definitions
 */

export type ResourceType =
  | 'video'
  | 'course'
  | 'article'
  | 'documentation'
  | 'github'
  | 'lab'
  | 'ctf'
  | 'podcast'
  | 'research'
  | 'certification'
  | 'exam-prep';

export type CybersecurityDomain =
  | 'fundamentals'
  | 'network-security'
  | 'soc-blue-team'
  | 'red-team-pentest'
  | 'web-app-security'
  | 'dfir'
  | 'malware-reverse-engineering'
  | 'cloud-security'
  | 'osint-threat-intel'
  | 'iot-embedded-security'
  | 'cryptography';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type PricingModel = 'free' | 'freemium' | 'paid';
export type DurationRange = 'under-20' | '20-60' | 'over-60' | 'unknown';
export type SortOption = 'relevance' | 'recently-added' | 'title' | 'duration-asc';

export interface Resource {
  id: string;
  slug: string;
  title: string;
  description: string;
  resourceType: ResourceType;
  provider: string;               // e.g. \"PortSwigger\", \"NIST\", \"OWASP\"
  creator?: string;               // e.g. \"Gordon Lyon\", \"Dave Aitel\"
  canonicalUrl: string;           // Direct verified external link
  thumbnailUrl?: string;          // Optional preview thumbnail
  // --- New optional YouTube metadata (for video resources) ---
  youtubeVideoId?: string;        // 11‑character YouTube video identifier
  isVideo?: boolean;              // Convenience flag for video resources
  youtubeChannelName?: string;    // Optional channel/creator name from YouTube
  domains: CybersecurityDomain[]; // Multiple domains supported
  tags: string[];                 // Granular keywords
  skills: string[];               // Actionable competencies taught
  difficulty: DifficultyLevel;
  language: string;               // \"English\", \"Hindi\", etc.
  pricingModel: PricingModel;
  estimatedDuration?: string;     // Display label, e.g. \"45 mins\", \"12 hours\"
  durationMinutes?: number;       // Numeric duration in minutes for sorting/filtering
  prerequisites?: string[];
  learningOutcomes: string[];
  publishedAt?: string;           // ISO 8601 date
  lastVerifiedAt: string;         // ISO 8601 date
  featured?: boolean;
  status: 'active' | 'archived';
}

export interface ResourceFilterOptions {
  query?: string;
  types?: ResourceType[];
  domains?: CybersecurityDomain[];
  difficulty?: DifficultyLevel[];
  pricing?: PricingModel[];
  languages?: string[];
  durationRanges?: DurationRange[];
  sortBy?: SortOption;
}

export interface DomainMetadata {
  id: CybersecurityDomain;
  name: string;
  shortDescription: string;
  longDescription: string;
  iconName: string;
  colorClass: string;
}

export interface ResourceTypeMetadata {
  id: ResourceType;
  label: string;
  pluralLabel: string;
  description: string;
  badgeClass: string;
  iconName: string;
}

