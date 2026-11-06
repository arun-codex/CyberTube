// src/lib/discovery/source-registry.ts
// Central registry of legitimate, verified public content sources for CyberTube Discover.
// Compliance Rules:
// - ALLOW_PAID_SERVICES=false: No paid APIs or services
// - ENABLE_AUTOMATED_YOUTUBE_DISCOVERY=false: No automated YouTube scraping or ingestion
// - Only verified public RSS / official feeds and developer registries

export interface DiscoverySourceDefinition {
  id: string; // stable slug
  name: string;
  type: "rss" | "atom" | "cisa" | "github" | "official";
  url: string;
  categorySlug: string;
  enabled: boolean;
  description: string;
}

export const VERIFIED_DISCOVERY_SOURCES: DiscoverySourceDefinition[] = [
  {
    id: "cisa-known-exploited-vulnerabilities",
    name: "CISA Known Exploited Vulnerabilities",
    type: "cisa",
    url: "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json",
    categorySlug: "cybersecurity",
    enabled: true,
    description: "Official United States Cybersecurity and Infrastructure Security Agency alert catalog.",
  },
  {
    id: "nist-nvd-cve-feed",
    name: "NIST National Vulnerability Database",
    type: "rss",
    url: "https://nvd.nist.gov/feeds/xml/cve/misc/nvd-rss.xml",
    categorySlug: "cybersecurity",
    enabled: true,
    description: "National Institute of Standards and Technology vulnerability bulletin.",
  },
  {
    id: "kernel-org-releases",
    name: "Kernel.org Linux Releases",
    type: "official",
    url: "https://www.kernel.org/releases.json",
    categorySlug: "linux",
    enabled: true,
    description: "Official Linux kernel release tracking and changelogs.",
  },
  {
    id: "arxiv-cs-ai-papers",
    name: "arXiv Artificial Intelligence Papers",
    type: "rss",
    url: "https://rss.arxiv.org/rss/cs.AI",
    categorySlug: "artificial-intelligence",
    enabled: true,
    description: "Cornell University open research repository for Artificial Intelligence.",
  },
  {
    id: "github-trending-developer-tools",
    name: "GitHub Open Source Trending Releases",
    type: "github",
    url: "https://github.com/trending",
    categorySlug: "open-source",
    enabled: false, // Disabled until ingestion pipeline is activated in later phase
    description: "Top public open-source software releases and repositories.",
  },
];

export const getVerifiedSourcesByCategory = (categorySlug: string) =>
  VERIFIED_DISCOVERY_SOURCES.filter((s) => s.categorySlug === categorySlug);
