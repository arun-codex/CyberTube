// src/lib/discovery/discovery-types.ts

export type ContentType = 'article' | 'video' | 'podcast' | 'event' | 'paper' | 'release';

export interface CategorySummary {
  id: string; // UUID in database, or fallback slug
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  enabled: boolean;
  item_count?: number;
}

export interface TopicSummary {
  id: string; // UUID in database, or fallback slug
  category_id: string; // category UUID or slug
  category_slug?: string;
  slug: string;
  name: string;
  description: string | null;
  keywords: string[];
  priority: number;
  enabled: boolean;
}

export interface FeedItem {
  id: string;
  title: string;
  description: string | null;
  url: string;
  thumbnail_url: string | null;
  published_at: string;
  category_slug: string | null;
  category_name?: string | null;
  topic_slug: string | null;
  topic_name?: string | null;
  author: string | null;
  content_type: ContentType;
  source_name: string | null;
}

export interface FeedResponse {
  items: FeedItem[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface DiscoveryStatus {
  enabled: boolean;
  automatedRefreshEnabled: boolean;
  automatedYouTubeDiscoveryEnabled: boolean;
  allowPaidServices: boolean;
  lastRefreshAt: string | null;
  totalCategories: number;
  totalTopics: number;
  totalItems: number;
}
