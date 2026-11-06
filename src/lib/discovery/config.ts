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

