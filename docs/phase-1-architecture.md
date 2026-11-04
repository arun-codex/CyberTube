# CyberTube — Phase 1 Architecture Specification

**Product**: CyberTube  
**Tagline**: *Discover. Learn. Practice. Secure.*  
**Phase**: Phase 1 — Product Foundation + Resource Discovery Engine  
**Date**: 2026-11-04  

---

## 1. System Overview

CyberTube is designed as a centralized, high-trust discovery and learning platform for cybersecurity students, practitioners, and researchers. Phase 1 delivers the complete **Resource Discovery Engine**, providing multi-dimensional search, domain mapping, type filtering, canonical source navigation, and device-local bookmarking across 11 resource categories and 11 cybersecurity domains.

```
+---------------------------------------------------------------------------------------+
|                                    CYBERTUBE WEB                                      |
|                                (Next.js App Router)                                   |
|                                                                                       |
|   /                  /discover               /domains         /resources/[slug]       |
|   (Curated Home)     (Multi-Facet Engine)    (11 Domains)     (Detail & Canonical)    |
|                                                                                       |
|                                      /saved                                           |
|                             (Local Bookmark Manager)                                  |
+---------------------------------------------------------------------------------------+
                                           |
+---------------------------------------------------------------------------------------+
|                                DATA & SERVICE LAYER                                   |
|                                                                                       |
|   Resource Catalog Service                   Saved Resources Service                  |
|   - Strongly typed in-memory store           - Browser Storage Interface              |
|   - Multi-field search matcher               - Device-local persistence fallback      |
|   - Multi-facet conjunction filter           - Extensible for future cloud sync       |
|   - Deterministic sorting engine                                                      |
+---------------------------------------------------------------------------------------+
                                           |
+---------------------------------------------------------------------------------------+
|                         CURATED CYBERSECURITY SEED DATASET                            |
|                                                                                       |
|   NIST, CISA, MITRE ATT&CK, OWASP, PortSwigger, OverTheWire, Wireshark, etc.          |
|   20+ verified records across 11 Resource Types & 11 Core Domains                     |
+---------------------------------------------------------------------------------------+
```

---

## 2. Technology Stack Selection

In accordance with project guidelines:

| Layer | Selection | Justification |
| :--- | :--- | :--- |
| **Framework** | **Next.js 14+ (App Router)** | Best-in-class React framework for fast server-side rendering, SEO, clean directory routing (`app/`), and static optimization. |
| **Language** | **TypeScript 5+** | Strict end-to-end typing for resources, filters, facets, and component props. |
| **Styling** | **Tailwind CSS 3+** | Predictable design tokens, responsive breakpoints, and dark/light theme switching. |
| **Icons** | **Lucide React** | Cohesive, accessible, lightweight SVG iconography without bundle bloat. |
| **State Management** | **React Hooks + URL SearchParams** | URL is the single source of truth for search and filters; `localStorage` for device bookmarks. |
| **Testing** | **Node.js Test Runner / Custom Suites** | Fast, zero-overhead automated verification of search, filtering, and data contracts. |

---

## 3. Data Architecture & Strongly Typed Resource Model

### 3.1 Taxonomy Definitions

#### 11 Resource Types:
1. `video`: Talks, lectures, demonstrations, and walkthroughs.
2. `course`: Structured multi-module curricula and academic programs.
3. `article`: In-depth writeups, research blog posts, and architectural analyses.
4. `documentation`: Official standards, API specs, and tool manuals (e.g., NIST, Nmap).
5. `github`: Open-source repositories, security tooling, and curated scripts.
6. `lab`: Hands-on interactive sandbox environments (e.g., PortSwigger, TryHackMe).
7. `ctf`: Capture The Flag challenges, past competition archives, and writeups.
8. `podcast`: Audio discussions, industry threat briefings, and interview series.
9. `research`: Peer-reviewed papers, vulnerability advisories, and technical whitepapers.
10. `certification`: Recognized credential roadmaps, blueprints, and vendor requirements.
11. `exam-prep`: Practice exams, flashcard sets, study guides, and review materials.

#### 11 Cybersecurity Domains:
1. `fundamentals`: Core concepts, CIA triad, security models, security governance.
2. `network-security`: Protocols, firewalls, traffic inspection, Wireshark, Nmap.
3. `soc-blue-team`: SIEM correlation, log analysis, threat detection, incident triage.
4. `red-team-pentest`: Exploitation techniques, privilege escalation, evasion, adversary emulation.
5. `web-app-security`: OWASP Top 10, injection, CSRF, broken access control, API security.
6. `dfir`: Digital forensics, memory analysis, disk artifacts, incident response handling.
7. `malware-reverse-engineering`: Static/dynamic analysis, PE headers, disassemblers, decompilation.
8. `cloud-security`: AWS/Azure/GCP IAM, container escape, Kubernetes hardening.
9. `osint-threat-intel`: Open-source intelligence collection, MITRE ATT&CK mapping, IOC tracking.
10. `iot-embedded-security`: Firmware extraction, hardware debugging, automotive/SCADA systems.
11. `cryptography`: Ciphers, PKI, hashing, TLS/SSL protocols, post-quantum crypto.

### 3.2 Canonical Resource Interface

```typescript
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

export interface Resource {
  id: string;
  slug: string;
  title: string;
  description: string;
  resourceType: ResourceType;
  provider: string;               // e.g., "PortSwigger", "NIST", "OverTheWire"
  creator?: string;               // e.g., "Dave Aitel", "Gordon Lyon"
  canonicalUrl: string;           // Direct verified link to original resource
  thumbnailUrl?: string;          // Verified preview image or SVG fallback
  domains: CybersecurityDomain[]; // Minimum 1, supports multiple
  tags: string[];                 // Freeform tags for granular search
  skills: string[];               // Actionable skills acquired
  difficulty: DifficultyLevel;
  language: string;               // e.g., "English", "Hindi"
  pricingModel: PricingModel;
  estimatedDuration?: string;     // Formatted text e.g. "45 mins", "Self-paced"
  durationMinutes?: number;       // For numeric filtering
  prerequisites?: string[];
  learningOutcomes: string[];
  publishedAt?: string;           // ISO 8601 date
  lastVerifiedAt: string;         // ISO 8601 date
  featured?: boolean;
  status: 'active' | 'archived';
}
```

---

## 4. UI/UX Design System & Tokens

### 4.1 Theme & Color Palette
- **Primary Background**: Graphite `#0b0f17` (Dark default) / `#f8fafc` (Light mode).
- **Surface Elevation**: `#111827` (Card surface) / `#ffffff` (Light surface).
- **Border Tokens**: `#1f2937` (Subtle boundary) / `#e2e8f0` (Light boundary).
- **Accents**:
  - **Teal / Cyan** (`#06b6d4` / `#14b8a6`): Tech indicators, active filters, primary links.
  - **Emerald** (`#10b981`): Success indicators, verified badges, free pricing badge.
  - **Indigo / Purple** (`#6366f1` / `#a855f7`): Research & course type badges.
  - **Amber / Orange** (`#f59e0b`): Advanced difficulty badge, certifications.
- **Typography**: Inter / system sans-serif for UI, JetBrains Mono / Consolas for metadata tags and code tokens.

---

## 5. Security & Boundary Architecture

1. **Air-Gap Separation**: The public web app does not invoke shell commands, spawn processes, or access local REA MCP endpoints.
2. **Safe Outbound Links**: All canonical external links render with `rel="noopener noreferrer" target="_blank"`.
3. **No Unsafe HTML**: Resource descriptions and markdown notes are rendered through sanitized React nodes; no `dangerouslySetInnerHTML` is used for untrusted content.
4. **Device-Specific Storage**: Saved resources use `localStorage` key `cybertube_saved_v1`, explicitly noting that data is local to the device.
5. **No Database or Auth in Phase 1**: Prepares interface `SavedResourcesService` for Phase 2 backend synchronization.

