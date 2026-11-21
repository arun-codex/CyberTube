import 'server-only';
import { COURSES } from '@/data/courses';
import type { FeedItem } from './discovery-types';
import {
  classifyItem,
  type ClassifiedItem,
  type MediaFormat,
  type EditorialKind,
  type Subject,
} from './content-taxonomy';

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

export type { ClassifiedItem, MediaFormat, EditorialKind, Subject };

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

const ID = /^[A-Za-z0-9_-]{11}$/;

const categoryName: Record<Category, string> = {
  cybersecurity: 'Cybersecurity',
  technology: 'Technology & AI',
  career: 'Careers & Internships',
  growth: 'Growth & Communication',
  networking: 'Networking',
  cloud: 'Cloud & DevOps',
  research: 'Research',
};

const channels: Array<{ name: string; id: string; category: Category }> = [
  { name: 'John Hammond', id: 'UCVeW9qkBjo3zosnqUbG7CFw', category: 'cybersecurity' },
  { name: 'NetworkChuck', id: 'UC9x0AN7BWHpCDHSm9NiJFJQ', category: 'cybersecurity' },
  { name: 'Simply Cyber', id: 'UCG-48ki-b6W_siaUKuKJO5w', category: 'career' },
  { name: 'freeCodeCamp.org', id: 'UC8butISFwT-Wl7EV0hUK0BQ', category: 'technology' },
  { name: 'Fireship', id: 'UCsBjURrPoezykLs9EqgamOA', category: 'technology' },
];

const newsSources: Array<{ name: string; url: string; category: Category }> = [
  { name: 'The Hacker News', url: 'https://thehackernews.com/feeds/posts/default?alt=rss', category: 'cybersecurity' },
  { name: 'CISA Advisories', url: 'https://www.cisa.gov/cybersecurity-advisories/all.xml', category: 'cybersecurity' },
  { name: 'GitHub Blog', url: 'https://github.blog/feed/', category: 'technology' },
  { name: 'freeCodeCamp News', url: 'https://www.freecodecamp.org/news/rss/', category: 'technology' },
];

const featuredVideos: DiscoverItem[] = [
  {
    id: 'youtube:8UEAjsHh92E',
    video_id: '8UEAjsHh92E',
    title: 'Could You Pass This SOC Analyst Interview? Junior vs Senior',
    description: 'See how candidates at different levels respond to a real SOC incident scenario and communicate decisions to a hiring manager.',
    url: 'https://www.youtube.com/watch?v=8UEAjsHh92E',
    thumbnail_url: 'https://i.ytimg.com/vi/8UEAjsHh92E/hqdefault.jpg',
    published_at: '2026-06-08T00:00:00.000Z',
    content_type: 'video',
    category_slug: 'career',
    category_name: 'Careers & Internships',
    source_name: 'Simply Cyber',
    source_mode: 'resource',
    tags: ['career', 'soc analyst', 'interview', 'incident response'],
  },
  {
    id: 'youtube:AAksD0ebyHU',
    video_id: 'AAksD0ebyHU',
    title: 'How to Get Cybersecurity Internships in 2026',
    description: 'Practical guidance for students and beginners: applications, career portfolios, networking and interviews.',
    url: 'https://www.youtube.com/watch?v=AAksD0ebyHU',
    thumbnail_url: 'https://i.ytimg.com/vi/AAksD0ebyHU/hqdefault.jpg',
    published_at: '2026-01-29T00:00:00.000Z',
    content_type: 'video',
    category_slug: 'career',
    category_name: 'Careers & Internships',
    source_name: 'Meera Tamboli',
    source_mode: 'resource',
    tags: ['internship', 'jobs', 'entry level', 'resume'],
  },
  {
    id: 'youtube:HlY0Awdpf9U',
    video_id: 'HlY0Awdpf9U',
    title: 'The Only Video You Need to Fix Your Communication Skills',
    description: 'A practical collection of communication, speaking, interviews, confidence and presentation lessons.',
    url: 'https://www.youtube.com/watch?v=HlY0Awdpf9U',
    thumbnail_url: 'https://i.ytimg.com/vi/HlY0Awdpf9U/hqdefault.jpg',
    published_at: '2026-02-06T00:00:00.000Z',
    content_type: 'video',
    category_slug: 'growth',
    category_name: 'Growth & Communication',
    source_name: 'Vinh Giang',
    source_mode: 'resource',
    tags: ['communication', 'public speaking', 'confidence', 'interviews'],
  },
  {
    id: 'youtube:nxgF9NfYjRc',
    video_id: 'nxgF9NfYjRc',
    title: 'How to Speak More Clearly at Work (Even if You Are Introverted)',
    description: 'Four actionable strategies for clarity, stronger presentation delivery, and professional confidence.',
    url: 'https://www.youtube.com/watch?v=nxgF9NfYjRc',
    thumbnail_url: 'https://i.ytimg.com/vi/nxgF9NfYjRc/hqdefault.jpg',
    published_at: '2026-06-30T00:00:00.000Z',
    content_type: 'video',
    category_slug: 'growth',
    category_name: 'Growth & Communication',
    source_name: 'Jessica Chen',
    source_mode: 'resource',
    tags: ['communication', 'presentation', 'confidence', 'career growth'],
  },
];

const careerResources: DiscoverItem[] = [
  {
    id: 'resource:cisa-news',
    title: 'Current CISA Cybersecurity Advisories',
    description: 'Open the official advisories directory for current alerts and vulnerability guidance.',
    url: 'https://www.cisa.gov/news-events/cybersecurity-advisories',
    published_at: '',
    content_type: 'article',
    category_slug: 'cybersecurity',
    category_name: 'Cybersecurity',
    source_name: 'CISA',
    source_mode: 'resource',
    tags: ['security alerts', 'vulnerabilities', 'news'],
  },
  {
    id: 'resource:ghsa',
    title: 'GitHub Advisory Database',
    description: 'Security advisories and affected packages, updated by their maintainers.',
    url: 'https://github.com/advisories',
    published_at: '',
    content_type: 'article',
    category_slug: 'cybersecurity',
    category_name: 'Cybersecurity',
    source_name: 'GitHub Security',
    source_mode: 'resource',
    tags: ['security news', 'open source', 'vulnerabilities'],
  },
  {
    id: 'resource:nice',
    title: 'NICE Cybersecurity Workforce Framework',
    description: 'Explore security job roles, knowledge, skills and career pathways from NIST.',
    url: 'https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center',
    published_at: '',
    content_type: 'article',
    category_slug: 'career',
    category_name: 'Careers & Internships',
    source_name: 'NIST NICE',
    source_mode: 'resource',
    tags: ['career', 'interview', 'cybersecurity', 'soc analyst'],
  },
  {
    id: 'resource:cyberseek',
    title: 'CyberSeek Cybersecurity Career Pathway',
    description: 'Explore cybersecurity roles and pathways to support your job search.',
    url: 'https://www.cyberseek.org/pathway.html',
    published_at: '',
    content_type: 'article',
    category_slug: 'career',
    category_name: 'Careers & Internships',
    source_name: 'CyberSeek',
    source_mode: 'resource',
    tags: ['career', 'jobs', 'internship', 'entry level'],
  },
  {
    id: 'resource:internships',
    title: 'Find current internship opportunities',
    description: 'Browse internship postings on an external jobs portal. Check each employer, location and eligibility.',
    url: 'https://internshala.com/internships/',
    published_at: '',
    content_type: 'article',
    category_slug: 'career',
    category_name: 'Careers & Internships',
    source_name: 'Internshala',
    source_mode: 'resource',
    tags: ['internship', 'jobs', 'interview', 'students'],
  },
  {
    id: 'resource:communication',
    title: 'Communication and career development courses',
    description: 'Free learning articles and courses for communication, professional development and interview preparation.',
    url: 'https://www.freecodecamp.org/news/',
    published_at: '',
    content_type: 'article',
    category_slug: 'growth',
    category_name: 'Growth & Communication',
    source_name: 'freeCodeCamp',
    source_mode: 'resource',
    tags: ['communication', 'interview', 'personal growth', 'soft skills'],
  },
];

function decodeXml(value: string): string {
  const raw = value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/<[^>]*>/g, ' ');
  return raw
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(parseInt(n, 10)))
    .replace(/&(?:amp|lt|gt|quot|apos|nbsp);/g, (match) =>
      ({
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&apos;': "'",
        '&nbsp;': ' ',
      }[match] || match)
    )
    .replace(/\s+/g, ' ')
    .trim();
}

function xmlTag(block: string, tag: string): string {
  const match = block.match(new RegExp('<' + tag + '(?:\\s[^>]*)?>([\\s\\S]*?)<\\/' + tag + '>', 'i'));
  return match ? decodeXml(match[1]) : '';
}

function published(date: string): string {
  const time = Date.parse(date);
  return Number.isFinite(time) && time <= Date.now() + 86400000 ? new Date(time).toISOString() : '';
}

function categorize(text: string, fallback: Category): Category {
  const s = text.toLowerCase();
  if (/\b(interview|internship|job hunt|hiring|recruitment|resume|cv tips|career|entry.level|certification|portfolio|job offer|salary)\b/.test(s)) return 'career';
  if (/\b(communication|confidence|public speaking|presentation|productivity|habits|leadership|self improvement|soft skills|storytelling)\b/.test(s)) return 'growth';
  if (/\b(cloud|aws|azure|kubernetes|docker|devops|terraform)\b/.test(s)) return 'cloud';
  if (/\b(wireshark|network|packet|tcp\/ip|routing|firewall|subnet)\b/.test(s)) return 'networking';
  if (/\b(llm|artificial intelligence|ai agents|machine learning|openai|model|typescript|javascript|python|software engineering)\b/.test(s)) return 'technology';
  if (/\b(research|paper|proof of concept|cve|vulnerability|security advisory)\b/.test(s)) return fallback === 'technology' ? 'research' : 'cybersecurity';
  return fallback;
}

async function fetchXml(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: { Accept: 'application/rss+xml,application/atom+xml,application/xml,text/xml' },
    next: { revalidate: 1200 },
    signal: AbortSignal.timeout(4500),
  });
  if (!response.ok) throw Error('Feed ' + response.status);
  const type = response.headers.get('content-type') || '';
  if (!/xml|text|rss|atom/.test(type)) throw Error('Unexpected feed type');
  const body = await response.text();
  return body.slice(0, 750000);
}

async function youtubeChannel(source: typeof channels[number]): Promise<DiscoverItem[]> {
  const xml = await fetchXml('https://www.youtube.com/feeds/videos.xml?channel_id=' + source.id);
  return [...xml.matchAll(/<entry\b[^>]*>([\s\S]*?)<\/entry>/gi)].slice(0, 15).flatMap((match) => {
    const entry = match[1];
    const id = xmlTag(entry, 'yt:videoId');
    if (!ID.test(id)) return [];
    const title = xmlTag(entry, 'title');
    if (!title) return [];
    const category = categorize(title, source.category);
    const description = xmlTag(entry, 'media:description').slice(0, 320);
    const date = published(xmlTag(entry, 'published'));
    return [{
      id: 'youtube:' + id,
      title,
      description,
      video_id: id,
      url: 'https://www.youtube.com/watch?v=' + id,
      thumbnail_url: 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg',
      published_at: date,
      content_type: 'video' as const,
      source_name: source.name,
      category_slug: category,
      category_name: categoryName[category],
      source_mode: 'live' as const,
      tags: [source.name, 'YouTube', category],
    }];
  });
}

async function rssArticles(source: typeof newsSources[number]): Promise<DiscoverItem[]> {
  const xml = await fetchXml(source.url);
  return [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)].slice(0, 20).flatMap((match) => {
    const item = match[1];
    const title = xmlTag(item, 'title');
    const url = xmlTag(item, 'link') || xmlTag(item, 'guid');
    if (!title || !url) return [];
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return [];
      const configured = new URL(source.url).hostname.replace(/^www\./, '');
      if (parsed.hostname.replace(/^www\./, '') !== configured) return [];
      const category = categorize(title, source.category);
      return [{
        id: 'article:' + url,
        title,
        url,
        description: xmlTag(item, 'description').slice(0, 350),
        published_at: published(xmlTag(item, 'pubDate') || xmlTag(item, 'published') || xmlTag(item, 'dc:date')),
        content_type: 'article' as const,
        source_name: source.name,
        source_mode: 'live' as const,
        category_slug: category,
        category_name: categoryName[category],
        tags: [source.name, category],
      }];
    } catch {
      return [];
    }
  });
}

async function githubAdvisories(): Promise<DiscoverItem[]> {
  const response = await fetch('https://api.github.com/advisories?per_page=20', {
    headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'CyberTube-Discover' },
    next: { revalidate: 1200 },
    signal: AbortSignal.timeout(4500),
  });
  if (!response.ok) throw Error('GitHub advisories ' + response.status);
  const rows: unknown = await response.json();
  if (!Array.isArray(rows)) return [];
  return rows.flatMap((a: any) => {
    if (typeof a.html_url !== 'string' || !/^https:\/\/github\.com\/advisories\/GHSA-/.test(a.html_url)) return [];
    const ghsaId = String(a.ghsa_id || '');
    const cveId = String(a.cve_id || '');
    return [{
      id: 'article:' + a.html_url,
      title: String(a.summary || a.ghsa_id).slice(0, 240),
      description: String(a.description || 'Published software security advisory').slice(0, 320),
      url: a.html_url,
      published_at: published(a.published_at || a.updated_at || ''),
      content_type: 'article' as const,
      category_slug: 'cybersecurity' as const,
      category_name: 'Cybersecurity',
      source_name: 'GitHub Security Advisories',
      source_mode: 'live' as const,
      tags: ['vulnerability', 'security advisory', ghsaId, cveId].filter(Boolean),
    }];
  });
}

function curriculumVideos(): DiscoverItem[] {
  const seen = new Set<string>();
  const entries: DiscoverItem[] = [];
  for (const course of COURSES) {
    if (course.isComingSoon) continue;
    for (const courseModule of course.modules) {
      for (const lesson of courseModule.lessons) {
        const id = lesson.youtubeVideoId;
        if (!id || !ID.test(id) || seen.has(id)) continue;
        seen.add(id);
        const title = lesson.title;
        const category = categorize(
          title + ' ' + course.title + ' ' + (lesson.tags || []).join(' '),
          course.track === 'cybersecurity' ? 'cybersecurity' : 'technology'
        );
        entries.push({
          id: 'youtube:' + id,
          video_id: id,
          title,
          description: (lesson.description || course.shortDescription || '').slice(0, 340),
          url: 'https://www.youtube.com/watch?v=' + id,
          thumbnail_url: 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg',
          published_at: '',
          content_type: 'video',
          source_name: lesson.videoAttribution?.creator || course.instructor.name || 'YouTube',
          category_slug: category,
          category_name: categoryName[category],
          source_mode: 'course',
          tags: [...new Set([category, course.title, ...(lesson.tags || [])])],
        });
        if (entries.length >= 130) return entries;
      }
    }
  }
  return entries;
}

const library = curriculumVideos();

// In-memory cache to prevent spamming RSS & YouTube endpoints during tab changes
let cachedSources: { items: ClassifiedItem[]; liveCount: number; sourceCount: number; cachedAt: number } | null = null;
const CACHE_TTL_MS = 4 * 60 * 1000; // 4 minutes

export async function loadDiscoverSources(): Promise<{ items: ClassifiedItem[]; liveCount: number; sourceCount: number }> {
  const now = Date.now();
  if (cachedSources && (now - cachedSources.cachedAt) < CACHE_TTL_MS) {
    return {
      items: cachedSources.items,
      liveCount: cachedSources.liveCount,
      sourceCount: cachedSources.sourceCount,
    };
  }

  const results = await Promise.allSettled([
    ...channels.map(youtubeChannel),
    ...newsSources.map(rssArticles),
    githubAdvisories(),
  ]);

  const live: DiscoverItem[] = [];
  let sourceCount = 0;
  for (const result of results) {
    if (result.status === 'fulfilled' && result.value.length) {
      sourceCount++;
      live.push(...result.value);
    }
  }

  const keyed = new Map<string, DiscoverItem>();
  for (const item of [...live, ...featuredVideos, ...library, ...careerResources]) {
    if (!keyed.has(item.id)) keyed.set(item.id, item);
  }

  // Classify all items according to the V3 3-dimensional taxonomy
  const classifiedItems = [...keyed.values()].map(classifyItem);

  cachedSources = {
    items: classifiedItems,
    liveCount: live.length,
    sourceCount,
    cachedAt: now,
  };

  return { items: classifiedItems, liveCount: live.length, sourceCount };
}

export { personalizeFeed } from './content-taxonomy';
