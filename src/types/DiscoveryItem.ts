// src/types/DiscoveryItem.ts
// Represents a single piece of curated content displayed on the Discover page.

export interface DiscoveryItem {
  id: string; // UUID or generated identifier
  source_id: string; // Reference to discovery_sources table
  external_id: string; // Identifier from the original source (e.g., RSS guid)
  title: string;
  description?: string;
  url: string; // Canonical URL to the content
  thumbnail_url?: string;
  published_at: string; // ISO‑8601 timestamp
  category_id: string; // FK to discovery_categories
  topic_id?: string; // FK to discovery_topics (optional, derived by classifier)
  // Additional optional metadata
  author?: string;
  content_type?: "article" | "video" | "podcast" | "event";
}

