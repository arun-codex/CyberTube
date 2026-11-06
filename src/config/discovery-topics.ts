// src/config/discovery-topics.ts
// Centralized taxonomy for the Discover platform.
// Each category and its topics are defined with stable identifiers.

export interface DiscoveryCategory {
  id: string; // stable UUID or slug
  name: string;
  slug: string;
  description: string;
  icon: string; // optional icon name or SVG path reference
  enabled: boolean;
  createdAt: string;
}

export interface DiscoveryTopic {
  id: string; // stable UUID or slug
  categoryId: string; // reference to DiscoveryCategory.id
  name: string;
  slug: string;
  keywords: string[]; // lower‑cased keywords for deterministic classification
  description: string;
  sourceConfiguration?: Record<string, any>; // optional source config hints
  priority: number; // lower number = higher refresh priority
  enabled: boolean;
  createdAt: string;
}

// ---- Categories -----------------------------------------------------------
export const DISCOVERY_CATEGORIES: DiscoveryCategory[] = [
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    slug: "cybersecurity",
    description: "Security research, advisories, tools and techniques.",
    icon: "shield", // placeholder, replace with actual icon name
    enabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "artificial-intelligence",
    name: "Artificial Intelligence",
    slug: "artificial-intelligence",
    description: "AI breakthroughs, agents, large language models, research.",
    icon: "brain",
    enabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "machine-learning",
    name: "Machine Learning",
    slug: "machine-learning",
    description: "ML algorithms, frameworks, datasets, tooling.",
    icon: "cpu",
    enabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "programming",
    name: "Programming",
    slug: "programming",
    description: "Languages, libraries, best practices, tutorials.",
    icon: "code",
    enabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "web-development",
    name: "Web Development",
    slug: "web-development",
    description: "Frontend, backend, frameworks, standards.",
    icon: "globe",
    enabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "networking",
    name: "Networking",
    slug: "networking",
    description: "Protocols, routing, switching, analysis tools.",
    icon: "wifi",
    enabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "cloud-computing",
    name: "Cloud Computing",
    slug: "cloud-computing",
    description: "Public clouds, services, serverless, SaaS.",
    icon: "cloud",
    enabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "devops",
    name: "DevOps",
    slug: "devops",
    description: "CI/CD, infrastructure as code, automation.",
    icon: "gear",
    enabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "linux",
    name: "Linux",
    slug: "linux",
    description: "Distributions, kernel, tooling, administration.",
    icon: "linux",
    enabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "open-source",
    name: "Open Source",
    slug: "open-source",
    description: "Community projects, libraries, frameworks.",
    icon: "git-pull-request",
    enabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "hardware",
    name: "Hardware",
    slug: "hardware",
    description: "Devices, components, schematics.",
    icon: "cpu",
    enabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "iot",
    name: "IoT",
    slug: "iot",
    description: "Embedded devices, sensors, edge computing.",
    icon: "anchor",
    enabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "embedded-systems",
    name: "Embedded Systems",
    slug: "embedded-systems",
    description: "Microcontrollers, firmware, real‑time OS.",
    icon: "chip",
    enabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "robotics",
    name: "Robotics",
    slug: "robotics",
    description: "Robotic platforms, control, perception.",
    icon: "robot",
    enabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "technology-research",
    name: "Technology Research",
    slug: "technology-research",
    description: "Academic papers, whitepapers, cutting‑edge tech.",
    icon: "book-open",
    enabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "software-releases",
    name: "Software Releases",
    slug: "software-releases",
    description: "Versioned releases of major software projects.",
    icon: "tag",
    enabled: true,
    createdAt: new Date().toISOString(),
  },
];

// ---- Topics ---------------------------------------------------------------
export const DISCOVERY_TOPICS: DiscoveryTopic[] = [
  // Cybersecurity topics
  {
    id: "soc-analyst",
    categoryId: "cybersecurity",
    name: "SOC Analyst",
    slug: "soc-analyst",
    keywords: ["soc", "security operations", "analyst"],
    description: "Security Operations Center analyst workflows.",
    priority: 1,
    enabled: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "blue-team",
    categoryId: "cybersecurity",
    name: "Blue Team",
    slug: "blue-team",
    keywords: ["defense", "blue team", "incident response"],
    description: "Defensive security practices and tooling.",
    priority: 1,
    enabled: true,
    createdAt: new Date().toISOString(),
  },
  // ... additional topics truncated for brevity – you can extend as needed.
];

// Export helpers
export const getCategoryById = (id: string) =>
  DISCOVERY_CATEGORIES.find((c) => c.id === id);
export const getTopicById = (id: string) =>
  DISCOVERY_TOPICS.find((t) => t.id === id);
export const getTopicsByCategory = (categoryId: string) =>
  DISCOVERY_TOPICS.filter((t) => t.categoryId === categoryId);
