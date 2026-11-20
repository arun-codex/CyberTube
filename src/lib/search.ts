import { getAllResources } from './catalog';
import { COURSES } from '../data/courses';
import { CYBERSECURITY_DOMAINS } from '../data/metadata';
import roadmap from '../data/tryhackme-roadmap.json';
import rawResources from '../../data/resources.json';
import rawPaths from '../../data/paths.json';
import rawSkills from '../../data/skills.json';
import rawCertifications from '../../data/certifications.json';
import rawCareers from '../../data/careers.json';
import rawGlossary from '../../data/glossary.json';
import rawCheatSheets from '../../data/cheat-sheets.json';

export type SearchResultType =
  | 'page' | 'course' | 'lesson' | 'learning-path' | 'resource' | 'domain'
  | 'tryhackme-section' | 'tryhackme-room' | 'skill' | 'certification'
  | 'career' | 'glossary' | 'cheat-sheet' | 'study-document';

export interface SearchResultItem {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  url: string;
  badge: string;
  category?: string;
  tags?: string[];
}

export interface SearchPage {
  results: SearchResultItem[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
  typeCounts: Record<string, number>;
}

const websitePages: Array<[string, string, string, string]> = [
  ['/', 'Home', 'CyberTube cybersecurity learning platform, all courses, paths and resources', 'start dashboard'],
  ['/library', 'Study Library', 'Cybersecurity study documents, bug bounty guides, videos, and lab resources', 'pdf study materials bug bounty'],
  ['/courses', 'Video Courses', 'All available cybersecurity and technology courses and lessons', 'training playlists modules'],
  ['/discover', 'Discover', 'Browse cybersecurity resource catalog, security news and learning topics', 'explore resources feed'],
  ['/tryhackme-roadmap', 'TryHackMe Roadmap', '502 TryHackMe room entries, 28 sections, zero to advanced practical CTF labs', 'try hack me THM challenge rooms'],
  ['/learning-paths', 'Learning Paths', 'Follow structured paths from beginner foundations to advanced security topics', 'roadmaps milestones'],
  ['/labs', 'Practice Labs', 'Legal cybersecurity hands-on labs and war games', 'TryHackMe CTF practice'],
  ['/domains', 'Cybersecurity Domains', 'Explore cybersecurity specializations, technologies and topics', 'security fields'],
  ['/skills', 'Skills Map', 'Practical cybersecurity skill checklists and professional competencies', 'SOC scripting offensive defensive'],
  ['/certifications', 'Certifications', 'Cybersecurity certification guide including Security+, Network+, CCNA and OSCP', 'cert exams'],
  ['/careers', 'Career Paths', 'Cybersecurity jobs, SOC analyst and penetration testing career paths', 'jobs roles employment'],
  ['/cheat-sheets', 'Cheat Sheets', 'Linux commands, common network ports and security quick reference', 'terminal command reference'],
  ['/glossary', 'Glossary', 'Definitions of cybersecurity terms and techniques', 'dictionary vocabulary'],
  ['/ethics', 'Ethics & Rules', 'Rules for authorized cybersecurity practice, legal hacking and ethical research', 'responsible hacking'],
  ['/about', 'About CyberTube', 'About our cybersecurity learning project and platform', 'information'],
  ['/privacy', 'Privacy Policy', 'How CyberTube protects personal information and privacy', 'policy'],
  ['/terms', 'Terms of Service', 'CyberTube user terms and conditions', 'conditions'],
  ['/login', 'Sign In', 'Login to your CyberTube account', 'authentication account'],
  ['/register', 'Create Account', 'Register to save your study progress', 'signup'],
  ['/forgot-password', 'Reset Password', 'Recover your CyberTube account password', 'password recovery'],
  ['/saved', 'Saved Resources', 'Find the learning resources you bookmarked', 'bookmarks'],
  ['/profile', 'My Profile', 'Your course progress and learning activity', 'account progress'],
  ['/account', 'Account Settings', 'Manage your CyberTube account preferences', 'settings'],
  ['/study-materials', 'Study Materials', 'Cybersecurity PDF reading and bug bounty learning documents', 'pdf library'],
  ['/search', 'Site Search', 'Search all public CyberTube pages, courses, lessons, labs and resources', 'global search'],
];

function buildStaticSearchIndex(): SearchResultItem[] {
  const entries: SearchResultItem[] = websitePages.map(([url, title, description, keywords]) => ({
    id: 'page:' + url,
    type: 'page',
    title,
    description,
    url,
    badge: 'PAGE',
    tags: keywords.split(/\s+/),
  }));

  // These are the current real routes. Do not index legacy learning-path slugs
  // that are not served by /learning-paths/[slug].
  for (const path of rawPaths) {
    entries.push({
      id: 'learning-path:' + path.slug,
      type: 'learning-path',
      title: path.title,
      description: path.description,
      url: '/learning-paths/' + path.slug,
      badge: 'LEARNING PATH',
      tags: [path.subtitle, path.level, ...(path.steps || []).map(step => step.title)],
    });
  }

  for (const course of COURSES) {
    entries.push({
      id: 'course:' + course.slug,
      type: 'course',
      title: course.title,
      description: course.shortDescription || course.description,
      url: '/courses/' + course.slug,
      badge: 'COURSE',
      category: course.difficulty,
      tags: [...(course.tags || []), ...(course.domains || []), course.track || ''],
    });

    for (const courseModule of course.modules || []) {
      for (const lesson of courseModule.lessons || []) {
        entries.push({
          id: 'lesson:' + course.slug + ':' + lesson.slug,
          type: 'lesson',
          title: lesson.title,
          description: (lesson.description || courseModule.title) + ' · ' + course.title,
          url: '/courses/' + course.slug + '?lesson=' + encodeURIComponent(lesson.slug),
          badge: 'LESSON',
          category: course.title,
          tags: [courseModule.title, course.title, ...(lesson.tags || [])],
        });
      }
    }
  }

  // New unified Library Hub resources are served by /library/[id].
  for (const res of rawResources) {
    if (res.verificationStatus === 'inactive') continue;
    entries.push({
      id: 'library:' + res.id,
      type: 'resource',
      title: res.title,
      description: res.notes,
      url: '/library/' + res.id,
      badge: res.type.toUpperCase(),
      category: res.track,
      tags: [res.creator, res.track, res.level],
    });
  }

  // Legacy resource-detail pages remain published under /resources/[slug].
  for (const res of getAllResources()) {
    entries.push({
      id: 'resource:' + res.slug,
      type: 'resource',
      title: res.title,
      description: res.description,
      url: '/resources/' + res.slug,
      badge: res.resourceType.toUpperCase(),
      category: res.domains[0],
      tags: [res.provider, res.creator || '', ...res.tags, ...res.skills],
    });
  }

  for (const domain of CYBERSECURITY_DOMAINS) {
    entries.push({
      id: 'domain:' + domain.id,
      type: 'domain',
      title: domain.name,
      description: domain.shortDescription,
      url: '/domains',
      badge: 'DOMAIN',
      tags: [domain.id, domain.longDescription],
    });
  }

  for (const skill of rawSkills) {
    entries.push({
      id: 'skill:' + skill.id,
      type: 'skill',
      title: skill.title,
      description: skill.beginnerExplanation,
      url: '/skills',
      badge: 'SKILL',
      category: skill.category,
      tags: [skill.category, ...skill.whatGoodLooksLike],
    });
  }

  for (const cert of rawCertifications) {
    entries.push({
      id: 'certification:' + cert.id,
      type: 'certification',
      title: cert.title,
      description: cert.overview,
      url: '/certifications#' + cert.id,
      badge: 'CERTIFICATION',
      tags: [cert.code, cert.issuer, ...cert.domains.map(domain => domain.name)],
    });
  }

  for (const career of rawCareers) {
    entries.push({
      id: 'career:' + career.id,
      type: 'career',
      title: career.title,
      description: career.summary,
      url: '/careers',
      badge: 'CAREER',
      tags: [career.category, ...career.keySkills, ...career.dailyResponsibilities],
    });
  }

  for (const term of rawGlossary) {
    entries.push({
      id: 'glossary:' + term.id,
      type: 'glossary',
      title: term.term,
      description: term.definition,
      url: '/glossary',
      badge: 'GLOSSARY',
      category: term.category,
      tags: [term.plainEnglishExplanation, ...(term.relatedTerms || [])],
    });
  }

  for (const category of rawCheatSheets.linux) {
    for (const command of category.commands) {
      entries.push({
        id: 'cheat:linux:' + command.command,
        type: 'cheat-sheet',
        title: command.command,
        description: command.description,
        url: '/cheat-sheets',
        badge: 'COMMAND',
        category: category.category,
        tags: [category.category, command.example || ''],
      });
    }
  }
  for (const port of rawCheatSheets.ports) {
    entries.push({
      id: 'cheat:port:' + port.port + ':' + port.protocol,
      type: 'cheat-sheet',
      title: port.port + ' · ' + port.service,
      description: port.description,
      url: '/cheat-sheets',
      badge: 'PORT',
      tags: [port.protocol, port.securityImplication],
    });
  }

  const roomById = new Map<string, SearchResultItem>();
  for (const section of roadmap.sections) {
    entries.push({
      id: 'tryhackme-section:' + section.id,
      type: 'tryhackme-section',
      title: section.title,
      description: section.rooms.length + ' rooms · ' + section.suggestedLevel + ' · TryHackMe Roadmap section',
      url: '/tryhackme-roadmap?section=' + section.id,
      badge: 'THM SECTION',
      category: section.suggestedLevel,
      tags: ['TryHackMe', 'roadmap', section.title],
    });
    for (const room of section.rooms) {
      const old = roomById.get(room.id);
      if (old) {
        old.tags?.push(section.title);
        continue;
      }
      roomById.set(room.id, {
        id: 'tryhackme-room:' + room.id,
        type: 'tryhackme-room',
        title: room.title,
        description: 'TryHackMe room · ' + section.title + ' · ' + section.suggestedLevel,
        url: '/tryhackme-roadmap?q=' + encodeURIComponent(room.title),
        badge: 'THM ROOM',
        category: section.title,
        tags: [room.id, section.title, section.suggestedLevel],
      });
    }
  }
  entries.push(...roomById.values());

  return entries;
}

const staticSearchIndex = buildStaticSearchIndex();

function rank(item: SearchResultItem, query: string, words: string[]): number {
  const title = item.title.toLowerCase();
  const description = item.description.toLowerCase();
  const tags = (item.tags || []).join(' ').toLowerCase();
  const url = item.url.toLowerCase();
  const combined = title + ' ' + description + ' ' + tags + ' ' + url;

  if (!words.every(word => combined.includes(word))) return 0;

  let score = 2;
  if (title === query) score += 170;
  else if (title.startsWith(query)) score += 125;
  else if (title.includes(query)) score += 95;
  if (tags.includes(query)) score += 32;
  if (description.includes(query)) score += 20;
  if (url.includes(query)) score += 12;
  for (const word of words) {
    if (title.split(/[^a-z0-9+#.-]+/).some(part => part.startsWith(word))) score += 11;
  }
  if (item.type === 'page') score += 16;
  else if (item.type === 'course' || item.type === 'learning-path') score += 5;
  return score;
}

export function searchCatalogPage(
  query: string,
  options: { page?: number; pageSize?: number; type?: string; extra?: SearchResultItem[] } = {},
): SearchPage {
  const q = query.trim().toLowerCase().slice(0, 100);
  const page = Math.max(1, Math.min(500, Math.floor(options.page || 1)));
  const pageSize = Math.max(1, Math.min(50, Math.floor(options.pageSize || 20)));
  const type = options.type || 'all';
  if (q.length < 2) return { results: [], total: 0, page, pageSize, pageCount: 0, typeCounts: {} };

  const words = q.split(/\s+/).filter(Boolean);
  const merged = new Map<string, SearchResultItem>();
  for (const entry of [...staticSearchIndex, ...(options.extra || [])]) {
    merged.set(entry.id, entry);
  }

  const matches = [...merged.values()]
    .map(item => ({ item, score: rank(item, q, words) }))
    .filter(hit => hit.score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title));

  const typeCounts: Record<string, number> = {};
  for (const hit of matches) {
    typeCounts[hit.item.type] = (typeCounts[hit.item.type] || 0) + 1;
  }
  const filtered = type === 'all' ? matches : matches.filter(hit => hit.item.type === type);
  return {
    results: filtered.slice((page - 1) * pageSize, page * pageSize).map(hit => hit.item),
    total: filtered.length,
    page, pageSize,
    pageCount: Math.ceil(filtered.length / pageSize),
    typeCounts,
  };
}

// Backward-compatible entry point for callers that do not use server search.
export function searchGlobalCatalog(query: string): SearchResultItem[] {
  return searchCatalogPage(query, { pageSize: 10 }).results;
}
