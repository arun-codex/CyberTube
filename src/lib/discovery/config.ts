// src/lib/discovery/config.ts
// Configuration constants and feature flags for the Discover platform.

export const ENABLE_AUTOMATED_YOUTUBE_DISCOVERY =
  process.env.ENABLE_AUTOMATED_YOUTUBE_DISCOVERY === "true";

export const MAX_ITEMS_PER_SOURCE = parseInt(
  process.env.MAX_ITEMS_PER_SOURCE ?? "200",
  10
);

export const DISCOVERY_REFRESH_SECRET =
  process.env.DISCOVERY_REFRESH_SECRET ?? ""; // must be set in Edge Function env

/**
 * Full discovery configuration used by API routes.
 * Includes feature flags and pagination defaults.
 */
export const DISCOVERY_CONFIG = {
  // Core enable flag – set to true to activate the whole platform.
  enabled: true,
  // Whether automated scheduled refreshes are enabled.
  automatedRefreshEnabled:
    process.env.ENABLE_AUTOMATED_REFRESH === "true",
  // YouTube specific discovery automation flag.
  automatedYouTubeDiscoveryEnabled: ENABLE_AUTOMATED_YOUTUBE_DISCOVERY,
  // Allow paid services (e.g., premium content) – default false.
  allowPaidServices:
    process.env.ALLOW_PAID_SERVICES === "true",
  // Pagination defaults.
  defaultPageSize: Number(process.env.DEFAULT_PAGE_SIZE) || 20,
  maxPageSize: Number(process.env.MAX_PAGE_SIZE) || 50,
} as const;
