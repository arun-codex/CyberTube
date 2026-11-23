// src/lib/discovery/content-taxonomy.ts
/**
 * CyberTube Discover V3 — Three-Dimensional Content Taxonomy Engine
 *
 * Three independent orthogonal dimensions:
 * A. Media Format: What medium/format is this item? (video, article, resource, job, podcast, event)
 * B. Editorial Kind: What kind of information is it? (news, security_advisory, tutorial, research, opinion, career_guide, internship, documentation, tool, learning_resource)
 * C. Subject: What domain/topic is this item about?
 */

import type { FeedItem } from './discovery-types';

export type Category = 'cybersecurity' | 'technology' | 'career' | 'growth' | 'networking' | 'cloud' | 'research';

export interface DiscoverItem extends FeedItem {
  content_type: 'video' | 'article';
  category_slug: Category;
  category_name: string;
  source_name: string;
  video_id?: string;
  tags?: string[];
  source_mode: 'live' | 'course' | 'resource';
}

export type MediaFormat =
  | 'video'
  | 'article'
  | 'resource'
  | 'job'
  | 'podcast'
  | 'event';

export type EditorialKind =
  | 'news'
  | 'security_advisory'
  | 'tutorial'
  | 'research'
  | 'opinion'
  | 'career_guide'
  | 'internship'
  | 'documentation'
  | 'tool'
  | 'learning_resource';

export type Subject =
  | 'cybersecurity'
  | 'ethical_hacking'
  | 'soc_blue_team'
  | 'digital_forensics'
  | 'malware_analysis'
  | 'threat_intelligence'
  | 'networking'
  | 'linux'
  | 'ai_ml'
  | 'cloud_devops'
  | 'programming'
  | 'certifications'
  | 'career_development'
  | 'communication_growth'
  | 'technology'
  | 'research'
  | 'uncategorized';

export interface ClassifiedItem extends DiscoverItem {
  media_format: MediaFormat;
  editorial_kind: EditorialKind;
  subject: Subject;
  severity?: 'critical' | 'high' | 'medium' | 'low';
  cve_id?: string;
  ghsa_id?: string;
  employer?: string;
  location?: string;
  experience_level?: string;
}

export type WatchSignal = { video_id: string; category: string; progress_percent: number; last_watched_at: string };
export type FeedPreferences = { interests: string[]; watchHistory: WatchSignal[] };

export type DiscoverFeedFilter = {
  tab?: string;
  category?: string;
  query?: string;
  page?: number;
  pageSize?: number;
  type?: string;      // MediaFormat: 'video' | 'article' | 'resource' | 'job' | 'podcast' | 'event'
  kind?: string;      // EditorialKind: 'news' | 'security_advisory' | 'tutorial' | ...
  subject?: string;   // Subject: 'cybersecurity' | 'soc_blue_team' | 'networking' | ...
  sort?: string;      // 'latest' | 'relevant'
};

export interface TopicOption {
  id: Subject | '';
  label: string;
  description?: string;
}

export const TOPIC_NAV_ITEMS: TopicOption[] = [
  { id: '', label: 'All Topics' },
  { id: 'cybersecurity', label: 'Cybersecurity' },
  { id: 'ethical_hacking', label: 'Ethical Hacking / Pentesting' },
  { id: 'soc_blue_team', label: 'SOC / Blue Team' },
  { id: 'digital_forensics', label: 'Digital Forensics' },
  { id: 'malware_analysis', label: 'Malware Analysis' },
  { id: 'threat_intelligence', label: 'Threat Intelligence' },
  { id: 'networking', label: 'Networking / Wireshark' },
  { id: 'linux', label: 'Linux' },
  { id: 'ai_ml', label: 'AI / Machine Learning' },
  { id: 'cloud_devops', label: 'Cloud / DevOps' },
  { id: 'programming', label: 'Programming' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'career_development', label: 'Career Development' },
  { id: 'communication_growth', label: 'Communication & Growth' },
];

export const SUBJECT_DISPLAY_NAMES: Record<Subject, string> = {
  cybersecurity: 'Cybersecurity',
  ethical_hacking: 'Ethical Hacking',
  soc_blue_team: 'SOC / Blue Team',
  digital_forensics: 'Digital Forensics',
  malware_analysis: 'Malware Analysis',
  threat_intelligence: 'Threat Intelligence',
  networking: 'Networking',
  linux: 'Linux',
  ai_ml: 'AI & Machine Learning',
  cloud_devops: 'Cloud & DevOps',
  programming: 'Programming',
  certifications: 'Certifications',
  career_development: 'Career Development',
  communication_growth: 'Communication & Growth',
  technology: 'Technology',
  research: 'Security Research',
  uncategorized: 'General',
};

export const EDITORIAL_KIND_LABELS: Record<EditorialKind, string> = {
  news: 'News',
  security_advisory: 'Security Advisory',
  tutorial: 'Tutorial',
  research: 'Research',
  opinion: 'Analysis',
  career_guide: 'Career Guide',
  internship: 'Opportunity',
  documentation: 'Documentation',
  tool: 'Tool',
  learning_resource: 'Learning Resource',
};

/**
 * Extract CVE and GHSA IDs from text, url, or tags
 */
export function extractAdvisoryIdentifiers(text: string): { cve?: string; ghsa?: string } {
  const ghsaMatch = text.match(/\b(GHSA-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4})\b/i);
  const cveMatch = text.match(/\b(CVE-\d{4}-\d{4,7})\b/i);
  return {
    ghsa: ghsaMatch ? ghsaMatch[1].toUpperCase() : undefined,
    cve: cveMatch ? cveMatch[1].toUpperCase() : undefined,
  };
}

/**
 * Determine the specific Subject based on title, description, tags, and source
 */
export function detectSubject(
  text: string,
  fallbackCategory?: string
): Subject {
  const s = text.toLowerCase();

  // 1. Digital Forensics / DFIR / PCAP analysis
  if (/\b(forensics|dfir|memory analysis|volatility|autopsy|disk analysis|packet forensics)\b/.test(s)) {
    return 'digital_forensics';
  }

  // 2. Malware analysis / Reverse engineering
  if (/\b(malware|reverse engineering|ransomware|trojan|rootkit|ghidra|ida pro|disassembly|binary analysis|c2 server|infostealer|keylogger)\b/.test(s)) {
    return 'malware_analysis';
  }

  // 3. SOC / Blue Team / SIEM
  if (/\b(soc\b|blue team|siem|splunk|sentinel|edr|xdr|incident response|soc analyst|triage|intrusion detection|snort|suricata)\b/.test(s)) {
    return 'soc_blue_team';
  }

  // 4. Threat Intelligence / CVEs / Vulnerabilities
  if (/\b(threat intelligence|cve-\d|ghsa-|zero-day|0-day|vulnerability advisory|threat actor|ioc|apt\d+|advisories)\b/.test(s)) {
    return 'threat_intelligence';
  }

  // 5. Ethical Hacking / Pentesting / Red Team
  if (/\b(pentest|penetration testing|red team|ethical hack|bug bounty|burp suite|metasploit|privilege escalation|kali|exploit development|owasp)\b/.test(s)) {
    return 'ethical_hacking';
  }

  // 6. Networking / Wireshark
  if (/\b(wireshark|packet|tcp\/ip|routing|subnet|switch|firewall|bgp|dns security|network protocol|osi model|ccna)\b/.test(s)) {
    if (/\b(cert|exam|badge)\b/.test(s)) return 'certifications';
    return 'networking';
  }

  // 7. Linux
  if (/\b(linux|ubuntu|debian|kali linux|bash|shell script|kernel|ebpf|systemd|cli tool)\b/.test(s)) {
    return 'linux';
  }

  // 8. Certifications
  if (/\b(certification|comptia|security\+|ceh|oscp|cissp|cism|cisa certification|exam prep|practice exam)\b/.test(s)) {
    return 'certifications';
  }

  // 9. Career Development & Jobs
  if (/\b(interview|internship|job hunt|hiring|recruitment|resume|cv tips|career pathway|salary|career advice|job application)\b/.test(s)) {
    return 'career_development';
  }

  // 10. Communication & Personal Growth
  if (/\b(communication|public speaking|presentation|confidence|soft skills|speaking clearly|leadership|storytelling|productivity|habits)\b/.test(s)) {
    return 'communication_growth';
  }

  // 11. AI / Machine Learning
  if (/\b(ai|artificial intelligence|machine learning|llm|deep learning|gpt|transformer|neural network|openai|gemini|claude|rag|model)\b/.test(s)) {
    return 'ai_ml';
  }

  // 12. Cloud / DevOps
  if (/\b(cloud|aws|azure|gcp|kubernetes|docker|devops|terraform|ci\/cd|helm|container)\b/.test(s)) {
    return 'cloud_devops';
  }

  // 13. Programming
  if (/\b(programming|python|javascript|typescript|rust|golang|c\+\+|software engineering|algorithm|web development)\b/.test(s)) {
    return 'programming';
  }

  // 14. Research
  if (/\b(research paper|whitepaper|proof of concept|poc|cryptographic research|academic)\b/.test(s)) {
    return 'research';
  }

  // 15. Fallback mapping from legacy category slugs
  if (fallbackCategory) {
    const cat = fallbackCategory.toLowerCase();
    if (cat === 'cybersecurity') return 'cybersecurity';
    if (cat === 'networking') return 'networking';
    if (cat === 'cloud') return 'cloud_devops';
    if (cat === 'career') return 'career_development';
    if (cat === 'growth') return 'communication_growth';
    if (cat === 'technology') return 'technology';
    if (cat === 'research') return 'research';
  }

  // 16. General cybersecurity keywords check
  if (/\b(security|cyber|hacker|breach|exploit|phishing|patch|auth|crypto)\b/.test(s)) {
    return 'cybersecurity';
  }

  return 'technology';
}

/**
 * Classify any DiscoverItem into a ClassifiedItem with verified 3-dimensional taxonomy
 */
export function classifyItem(item: DiscoverItem): ClassifiedItem {
  const combinedText = `${item.title} ${item.description || ''} ${item.source_name} ${(item.tags || []).join(' ')}`;
  const urlLower = item.url.toLowerCase();

  // ----------------------------------------------------
  // Dimension 1: Media Format
  // ----------------------------------------------------
  let mediaFormat: MediaFormat = 'article';
  if (item.content_type === 'video' || Boolean(item.video_id) || urlLower.includes('youtube.com/watch')) {
    mediaFormat = 'video';
  } else if (item.source_mode === 'resource' && !item.published_at) {
    mediaFormat = 'resource';
  }

  // ----------------------------------------------------
  // Dimension 2: Editorial Kind
  // ----------------------------------------------------
  let editorialKind: EditorialKind = 'learning_resource';
  const identifiers = extractAdvisoryIdentifiers(`${item.title} ${item.url} ${(item.tags || []).join(' ')}`);

  if (item.source_name === 'GitHub Security Advisories' || urlLower.includes('github.com/advisories')) {
    mediaFormat = 'article';
    editorialKind = 'security_advisory';
  } else if (item.source_name === 'CISA Advisories' || item.source_name === 'CISA' || urlLower.includes('cisa.gov')) {
    mediaFormat = 'article';
    editorialKind = 'security_advisory';
  } else if (item.source_name === 'The Hacker News' || urlLower.includes('thehackernews.com')) {
    mediaFormat = 'article';
    editorialKind = 'news';
  } else if (item.source_name === 'freeCodeCamp News' || urlLower.includes('freecodecamp.org/news')) {
    mediaFormat = 'article';
    editorialKind = /\b(tutorial|how to|guide|learn)\b/i.test(item.title) ? 'tutorial' : 'learning_resource';
  } else if (item.source_name === 'GitHub Blog' || urlLower.includes('github.blog')) {
    mediaFormat = 'article';
    editorialKind = 'news';
  } else if (item.source_mode === 'course') {
    mediaFormat = 'video';
    editorialKind = 'learning_resource';
  } else if (item.id === 'resource:internships') {
    mediaFormat = 'resource';
    editorialKind = 'career_guide'; // Prompt requirement: portal link is NOT an active job posting!
  } else if (item.id === 'resource:nice' || item.id === 'resource:cyberseek') {
    mediaFormat = 'resource';
    editorialKind = 'career_guide';
  } else if (item.id === 'resource:communication') {
    mediaFormat = 'resource';
    editorialKind = 'learning_resource';
  } else if (item.id === 'resource:cisa-news') {
    mediaFormat = 'resource';
    editorialKind = 'security_advisory';
  } else if (item.id === 'resource:ghsa') {
    mediaFormat = 'resource';
    editorialKind = 'tool';
  } else if (mediaFormat === 'video') {
    if (/\b(interview|junior vs senior|career|how to get|resume|cv)\b/i.test(item.title)) {
      editorialKind = 'career_guide';
    } else if (/\b(how to|fix your|tutorial|crash course|guide|in \d+ (minutes|hours)|explained)\b/i.test(item.title)) {
      editorialKind = 'tutorial';
    } else if (/\b(news|breakdown|attack|hacked|alert|leak|cve)\b/i.test(item.title)) {
      editorialKind = 'news';
    } else {
      editorialKind = 'learning_resource';
    }
  } else {
    // Other articles / sources
    if (identifiers.cve || identifiers.ghsa || /\b(advisory|vulnerability alert|security bulletin)\b/i.test(item.title)) {
      editorialKind = 'security_advisory';
    } else if (/\b(research paper|whitepaper|analysis of|in-depth study)\b/i.test(item.title)) {
      editorialKind = 'research';
    } else if (/\b(tutorial|how to|walkthrough|step by step)\b/i.test(item.title)) {
      editorialKind = 'tutorial';
    } else if (item.published_at && item.published_at.length > 0) {
      editorialKind = 'news';
    } else {
      editorialKind = 'learning_resource';
    }
  }

  // ----------------------------------------------------
  // Dimension 3: Subject
  // ----------------------------------------------------
  const subject = detectSubject(combinedText, item.category_slug);

  // Return the classified item
  return {
    ...item,
    media_format: mediaFormat,
    editorial_kind: editorialKind,
    subject,
    cve_id: identifiers.cve,
    ghsa_id: identifiers.ghsa,
  };
}

/**
 * Maps legacy navigation tab IDs to taxonomy filter requirements
 */
export function mapTabToTaxonomy(tab: string): {
  type?: MediaFormat;
  kind?: EditorialKind;
  subject?: Subject;
  legacyCategory?: string;
} {
  switch (tab) {
    case 'videos':
      return { type: 'video' };
    case 'articles':
      return { type: 'article' };
    case 'news':
    case 'cyber-news':
      return { kind: 'news', subject: 'cybersecurity' };
    case 'security-alerts':
      return { kind: 'security_advisory' };
    case 'research':
      return { kind: 'research' };
    case 'tools':
      return { kind: 'tool' };
    case 'career':
      return { subject: 'career_development' };
    case 'growth':
      return { subject: 'communication_growth' };
    case 'tech-updates':
      return { subject: 'technology' };
    default:
      return {};
  }
}

/**
 * Filter and personalize the classified feed according to taxonomy and preferences
 */
export function personalizeFeed(
  items: ClassifiedItem[],
  filter: DiscoverFeedFilter,
  prefs: FeedPreferences
) {
  const category = (filter.category || '').trim().toLowerCase();
  const query = (filter.query || '').toLowerCase().trim();
  const words = query.split(/\s+/).filter(Boolean);
  const typeFilter = (filter.type || '').trim().toLowerCase();
  const kindFilter = (filter.kind || '').trim().toLowerCase();
  const subjectFilter = (filter.subject || '').trim().toLowerCase();
  const sort = (filter.sort || '').trim().toLowerCase();

  const watched = new Map(prefs.watchHistory.map((entry) => [entry.video_id, entry]));
  const interestTerms = prefs.interests
    .flatMap((value) => value.toLowerCase().split(/[^a-z0-9]+/))
    .filter((w) => w.length >= 3);

  const categoryWeights = new Map<string, number>();
  for (const row of prefs.watchHistory) {
    categoryWeights.set(
      row.category,
      (categoryWeights.get(row.category) || 0) + (row.progress_percent >= 80 ? 3 : 1)
    );
  }

  let filtered = items.filter((item) => {
    // 1. Direct Media Format filter (dimension A)
    if (typeFilter && typeFilter !== 'all') {
      if (item.media_format !== typeFilter) return false;
    }

    // 2. Direct Editorial Kind filter (dimension B)
    if (kindFilter && kindFilter !== 'all') {
      // Support comma-separated kinds e.g. "tool,documentation"
      const kinds = kindFilter.split(',').map((k) => k.trim());
      if (!kinds.includes(item.editorial_kind)) return false;
    }

    // 3. Direct Subject filter (dimension C)
    if (subjectFilter && subjectFilter !== 'all') {
      if (item.subject !== subjectFilter) {
        // Also allow matching if the subject is a subtopic of cybersecurity
        if (subjectFilter === 'cybersecurity') {
          const cyberSubjects = ['cybersecurity', 'ethical_hacking', 'soc_blue_team', 'digital_forensics', 'malware_analysis', 'threat_intelligence'];
          if (!cyberSubjects.includes(item.subject)) return false;
        } else {
          return false;
        }
      }
    }

    // 4. Legacy Category filter
    if (category && category !== 'all') {
      if (item.category_slug !== category) {
        // Map category to subject for compatibility
        if (category === 'cybersecurity') {
          const cyberSubjects = ['cybersecurity', 'ethical_hacking', 'soc_blue_team', 'digital_forensics', 'malware_analysis', 'threat_intelligence'];
          if (!cyberSubjects.includes(item.subject)) return false;
        } else if (category === 'technology') {
          const techSubjects = ['technology', 'ai_ml', 'programming', 'cloud_devops'];
          if (!techSubjects.includes(item.subject)) return false;
        } else if (category === 'career' && item.subject !== 'career_development') {
          return false;
        } else if (category === 'growth' && item.subject !== 'communication_growth') {
          return false;
        } else if (category === 'networking' && item.subject !== 'networking') {
          return false;
        } else if (category === 'cloud' && item.subject !== 'cloud_devops') {
          return false;
        } else if (category === 'research' && item.subject !== 'research' && item.editorial_kind !== 'research') {
          return false;
        }
      }
    }

    // 5. Query matching (across title, description, source, tags, and IDs)
    if (words.length) {
      const haystack = (
        item.title +
        ' ' +
        (item.description || '') +
        ' ' +
        item.source_name +
        ' ' +
        (item.tags || []).join(' ') +
        ' ' +
        (item.cve_id || '') +
        ' ' +
        (item.ghsa_id || '') +
        ' ' +
        item.subject +
        ' ' +
        item.editorial_kind
      ).toLowerCase();
      if (!words.every((w) => haystack.includes(w))) return false;
    }

    // 6. Tab-based mapping (for backward compatibility and primary navigation)
    const tab = filter.tab;
    if (tab === 'videos') {
      return item.media_format === 'video';
    }
    if (tab === 'articles') {
      return item.media_format === 'article';
    }
    if (tab === 'news' || tab === 'cyber-news') {
      return (
        item.editorial_kind === 'news' ||
        (item.media_format === 'article' && (item.category_slug === 'cybersecurity' || item.subject === 'threat_intelligence'))
      );
    }
    if (tab === 'security-alerts') {
      return item.editorial_kind === 'security_advisory';
    }
    if (tab === 'research') {
      return item.editorial_kind === 'research' || item.subject === 'research' || item.category_slug === 'research';
    }
    if (tab === 'tools') {
      return item.editorial_kind === 'tool' || item.editorial_kind === 'documentation';
    }
    if (tab === 'career') {
      return (
        item.editorial_kind === 'career_guide' ||
        item.editorial_kind === 'internship' ||
        item.subject === 'career_development' ||
        item.category_slug === 'career'
      );
    }
    if (tab === 'growth') {
      return item.subject === 'communication_growth' || item.category_slug === 'growth';
    }
    if (tab === 'tech-updates') {
      return ['technology', 'cloud', 'research'].includes(item.category_slug) ||
        ['technology', 'ai_ml', 'cloud_devops', 'programming'].includes(item.subject);
    }
    if (tab === 'open-source') {
      return /github|open.source|linux|developer/i.test(item.title + ' ' + item.source_name);
    }

    return true;
  });

  const now = Date.now();
  const scored = filtered.map((item) => {
    const age = item.published_at ? Math.max(0, (now - Date.parse(item.published_at)) / 86400000) : 9999;
    let score = 20 + Math.max(0, 35 - Math.log2(age + 1) * 7) + (item.source_mode === 'live' ? 8 : 0);
    const matched = watched.get(item.video_id || '');

    if (filter.tab === 'for-you' || sort === 'relevant') {
      score += Math.min(28, (categoryWeights.get(item.category_slug) || 0) * 3);
      const text = (item.title + ' ' + (item.description || '') + ' ' + (item.tags || []).join(' ')).toLowerCase();
      score += Math.min(30, interestTerms.filter((term) => text.includes(term)).length * 5);
      if (matched) score -= matched.progress_percent >= 95 ? 45 : 13;
      if (item.category_slug === 'career' || item.category_slug === 'growth') score += 4;
    }
    return { item, score };
  });

  scored.sort((a, b) => {
    // Explicit sort option or tab defaults
    if (sort === 'latest' || filter.tab === 'latest' || filter.tab === 'all' || filter.tab === 'news' || filter.tab === 'cyber-news' || filter.tab === 'security-alerts') {
      const rec = (item: ClassifiedItem) => (item.published_at ? Date.parse(item.published_at) : 0);
      return rec(b.item) - rec(a.item) || b.score - a.score;
    }
    if (sort === 'relevant' || filter.tab === 'for-you') {
      return b.score - a.score ||
        (b.item.published_at ? Date.parse(b.item.published_at) : 0) -
        (a.item.published_at ? Date.parse(a.item.published_at) : 0);
    }
    // Default: prioritize freshness while giving a nod to score
    return b.score - a.score ||
      (b.item.published_at ? Date.parse(b.item.published_at) : 0) -
      (a.item.published_at ? Date.parse(a.item.published_at) : 0);
  });

  if (filter.tab === 'for-you') {
    // Ensure source diversity: don't let one source dominate the top feed
    const sorted: typeof scored = [];
    const sourceUsage = new Map<string, number>();
    for (const hit of scored) {
      const count = sourceUsage.get(hit.item.source_name) || 0;
      if (count >= 5 && sorted.length < 60) continue;
      sourceUsage.set(hit.item.source_name, count + 1);
      sorted.push(hit);
    }
    filtered = sorted.map((hit) => hit.item);
    const selected = new Set(filtered.map((it) => it.id));
    filtered.push(...scored.filter((hit) => !selected.has(hit.item.id)).map((hit) => hit.item));
  } else {
    filtered = scored.map((hit) => hit.item);
  }

  const total = filtered.length;
  const page = Math.max(1, Math.min(100, filter.page || 1));
  const pageSize = Math.max(1, Math.min(50, filter.pageSize || 24));
  const start = (page - 1) * pageSize;

  return {
    items: filtered.slice(start, start + pageSize),
    total,
    page,
    pageSize,
    hasMore: start + pageSize < total,
  };
}
