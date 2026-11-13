// src/lib/discovery/discovery-types.ts
// Core types used by the Discover platform backend.

export interface FeedItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnail_url?: string;
  published_at: string;
  category_slug?: string;
  category_name?: string;
  topic_slug?: string;
  topic_name?: string;
  author?: string;
  content_type?: 'article' | 'video' | 'podcast' | 'event';
  source_name?: string;
}

export interface FeedResponse {
  items: FeedItem[];
  total: number;
  page: number;
  pageSize: number;
  hasMore?: boolean;
}

export type ContentType = 'article' | 'video' | 'podcast' | 'event';

export interface DiscoveryStatus {
  enabled: boolean;
  automatedRefreshEnabled: boolean;
  automatedYouTubeDiscoveryEnabled: boolean;
  allowPaidServices: boolean;
  lastRefreshAt?: string;
  totalCategories: number;
  totalTopics: number;
  totalItems: number;
}

export interface TopicSummary {
  id: string;
  category_id: string;
  category_slug: string;
  slug: string;
  name: string;
  description?: string;
  keywords: string[];
  priority?: number;
  enabled: boolean;
}

export interface CategorySummary {
  id: string;
  slug: string;
  name: string;
}

// Existing core discovery types retained for backward compatibility
export interface DiscoveryCategory {
  id: string; // UUID
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  enabled: boolean;
  created_at: string;
  updated_at?: string;
}

export interface DiscoveryTopic {
  id: string;
  category_id: string;
  slug: string;
  name: string;
  description?: string;
  keywords: string[];
  enabled: boolean;
  created_at: string;
  updated_at?: string;
}

export interface DiscoverySource {
  id: string;
  name: string;
  type: string; // e.g., 'rss', 'github', 'cisa', 'youtube'
  url: string;
  enabled: boolean;
  fetch_interval_minutes: number;
  last_fetched_at?: string;
  created_at: string;
}

export interface DiscoveryItem {
  id: string;
  source_id: string;
  external_id: string;
  title: string;
  description?: string;
  url: string;
  thumbnail_url?: string;
  published_at: string;
  category_id?: string;
  topic_id?: string;
  author?: string;
  content_type?: 'article' | 'video' | 'podcast' | 'event';
  created_at: string;
  updated_at?: string;
}

export interface DiscoveryFeedResponse {
  items: DiscoveryItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface DiscoveryRefreshStatus {
  sourceId: string;
  lastFetchedAt?: string;
  status: 'idle' | 'running' | 'failed';
  errorMessage?: string;
}
