// src/lib/discovery/source-registry.ts
// Central registry of content sources for the Discover platform.
// In a real deployment this would be populated from the database (discovery_sources table).
// For now we define a static list of enabled sources as examples.

export interface Source {
  id: string; // UUID in DB – placeholder string for static entries
  name: string;
  type: "rss" | "github" | "cisa" | "youtube";
  url: string;
  enabled: boolean;
}

export const DISCOVERY_SOURCES: Source[] = [
  {
    id: "placeholder-rss-1",
    name: "Cybersecurity News RSS",
    type: "rss",
    url: "https://example.com/cybersecurity.rss",
    enabled: true,
  },
  {
    id: "placeholder-github-1",
    name: "Awesome Cybersecurity GitHub",
    type: "github",
    url: "https://api.github.com/repos/awesome-cybersecurity/awesome-list",
    enabled: true,
  },
  // Additional sources can be added via admin UI later.
];

