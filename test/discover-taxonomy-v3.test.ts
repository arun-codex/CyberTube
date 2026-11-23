import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  classifyItem,
  detectSubject,
  extractAdvisoryIdentifiers,
  mapTabToTaxonomy,
  personalizeFeed,
  type ClassifiedItem,
  type DiscoverItem,
  type FeedPreferences,
} from '../src/lib/discovery/content-taxonomy';

test('1. Advisory identifier extraction detects CVE and GHSA IDs correctly', () => {
  const text1 = 'Critical vulnerability in package GHSA-1234-5678-9abc affecting auth';
  const res1 = extractAdvisoryIdentifiers(text1);
  assert.equal(res1.ghsa, 'GHSA-1234-5678-9ABC');

  const text2 = 'Remote Code Execution discovered in OpenSSH (CVE-2026-3841)';
  const res2 = extractAdvisoryIdentifiers(text2);
  assert.equal(res2.cve, 'CVE-2026-3841');

  const text3 = 'Routine technology blog post without any vulnerability identifiers';
  const res3 = extractAdvisoryIdentifiers(text3);
  assert.equal(res3.cve, undefined);
  assert.equal(res3.ghsa, undefined);
});

test('2. Subject detection correctly maps keywords across domains', () => {
  assert.equal(detectSubject('Junior vs Senior SOC Analyst Interview incident triage'), 'soc_blue_team');
  assert.equal(detectSubject('Practical Wireshark Packet Analysis and TCP Handshake'), 'networking');
  assert.equal(detectSubject('Malware Reverse Engineering and Ghidra Tutorial'), 'malware_analysis');
  assert.equal(detectSubject('Memory Forensics and Volatility 3 DFIR Guide'), 'digital_forensics');
  assert.equal(detectSubject('Burp Suite Ethical Hacking and Privilege Escalation'), 'ethical_hacking');
  assert.equal(detectSubject('Active Threat Intelligence and CVE Vulnerability Advisories'), 'threat_intelligence');
  assert.equal(detectSubject('Linux Bash Shell Scripting and Kernel Internals'), 'linux');
  assert.equal(detectSubject('Building AI Agents with LLMs and Transformers'), 'ai_ml');
  assert.equal(detectSubject('Kubernetes and Docker Cloud DevOps Pipelines'), 'cloud_devops');
  assert.equal(detectSubject('How to Speak Clearly at Work and Communication Skills'), 'communication_growth');
  assert.equal(detectSubject('How to Get Cybersecurity Internships and Resume Tips'), 'career_development');
  assert.equal(detectSubject('CompTIA Security+ Exam Prep Guide'), 'certifications');
});

test('3. Classification engine separates media format and editorial kind truthfully', () => {
  // A. YouTube video
  const videoItem: DiscoverItem = {
    id: 'youtube:test1234567',
    video_id: 'test1234567',
    title: 'How to Analyze PCAP Files in Wireshark',
    description: 'A complete step by step tutorial on Wireshark network packet inspection.',
    url: 'https://www.youtube.com/watch?v=test1234567',
    content_type: 'video',
    category_slug: 'networking',
    category_name: 'Networking',
    source_name: 'NetworkChuck',
    source_mode: 'live',
    published_at: '2026-06-01T00:00:00.000Z',
    tags: ['networking', 'wireshark'],
  };
  const classifiedVideo = classifyItem(videoItem);
  assert.equal(classifiedVideo.media_format, 'video');
  assert.equal(classifiedVideo.editorial_kind, 'tutorial');
  assert.equal(classifiedVideo.subject, 'networking');

  // B. Hacker News article
  const newsItem: DiscoverItem = {
    id: 'article:thehackernews:1',
    title: 'New Ransomware Variant Exploiting Zero-Day in Firewalls',
    description: 'Attackers deploy new payload targeting unpatched perimeter devices.',
    url: 'https://thehackernews.com/2026/06/ransomware-zero-day.html',
    content_type: 'article',
    category_slug: 'cybersecurity',
    category_name: 'Cybersecurity',
    source_name: 'The Hacker News',
    source_mode: 'live',
    published_at: '2026-06-02T00:00:00.000Z',
    tags: ['The Hacker News', 'cybersecurity'],
  };
  const classifiedNews = classifyItem(newsItem);
  assert.equal(classifiedNews.media_format, 'article');
  assert.equal(classifiedNews.editorial_kind, 'news');
  assert.equal(classifiedNews.subject, 'malware_analysis'); // Ransomware detected

  // C. GitHub Security Advisory
  const advisoryItem: DiscoverItem = {
    id: 'article:github:GHSA-test-1234-abcd',
    title: 'GHSA-test-1234-abcd: Remote Code Execution in Example Library',
    description: 'Vulnerability advisory affecting versions prior to 2.0.0',
    url: 'https://github.com/advisories/GHSA-test-1234-abcd',
    content_type: 'article',
    category_slug: 'cybersecurity',
    category_name: 'Cybersecurity',
    source_name: 'GitHub Security Advisories',
    source_mode: 'live',
    published_at: '2026-06-03T00:00:00.000Z',
    tags: ['vulnerability', 'GHSA-test-1234-abcd'],
  };
  const classifiedAdvisory = classifyItem(advisoryItem);
  assert.equal(classifiedAdvisory.media_format, 'article');
  assert.equal(classifiedAdvisory.editorial_kind, 'security_advisory');
  assert.equal(classifiedAdvisory.ghsa_id, 'GHSA-TEST-1234-ABCD');

  // D. Career portal link is NOT classified as an active job vacancy
  const portalItem: DiscoverItem = {
    id: 'resource:internships',
    title: 'Find current internship opportunities',
    description: 'Browse internship postings on an external jobs portal.',
    url: 'https://internshala.com/internships/',
    content_type: 'article',
    category_slug: 'career',
    category_name: 'Careers & Internships',
    source_name: 'Internshala',
    source_mode: 'resource',
    published_at: '',
    tags: ['internship', 'jobs'],
  };
  const classifiedPortal = classifyItem(portalItem);
  assert.equal(classifiedPortal.media_format, 'resource');
  assert.equal(classifiedPortal.editorial_kind, 'career_guide'); // Career guide, not active job vacancy!
  assert.equal(classifiedPortal.subject, 'career_development');
});

test('4. personalizeFeed handles three-dimensional taxonomy and combined filters', () => {
  const dummyItems: ClassifiedItem[] = [
    classifyItem({
      id: 'youtube:vid1',
      video_id: 'vid11111111',
      title: 'SOC Analyst Incident Triage Tutorial',
      url: 'https://www.youtube.com/watch?v=vid11111111',
      content_type: 'video',
      category_slug: 'cybersecurity',
      category_name: 'Cybersecurity',
      source_name: 'Simply Cyber',
      source_mode: 'live',
      published_at: '2026-06-01T00:00:00.000Z',
    }),
    classifyItem({
      id: 'youtube:vid2',
      video_id: 'vid22222222',
      title: 'Wireshark Packet Analysis Fundamentals',
      url: 'https://www.youtube.com/watch?v=vid22222222',
      content_type: 'video',
      category_slug: 'networking',
      category_name: 'Networking',
      source_name: 'NetworkChuck',
      source_mode: 'live',
      published_at: '2026-06-02T00:00:00.000Z',
    }),
    classifyItem({
      id: 'article:art1',
      title: 'Deep Dive into BGP Routing Security',
      url: 'https://thehackernews.com/bgp-security',
      content_type: 'article',
      category_slug: 'networking',
      category_name: 'Networking',
      source_name: 'The Hacker News',
      source_mode: 'live',
      published_at: '2026-06-03T00:00:00.000Z',
    }),
    classifyItem({
      id: 'article:advisory1',
      title: 'CISA Advisory: Critical Vulnerability in Perimeter Gateway CVE-2026-9999',
      url: 'https://www.cisa.gov/advisory-cve-2026-9999',
      content_type: 'article',
      category_slug: 'cybersecurity',
      category_name: 'Cybersecurity',
      source_name: 'CISA Advisories',
      source_mode: 'live',
      published_at: '2026-06-04T00:00:00.000Z',
    }),
  ];

  const prefs: FeedPreferences = { interests: [], watchHistory: [] };

  // Filter 1: Videos only
  const videosOnly = personalizeFeed(dummyItems, { type: 'video' }, prefs);
  assert.equal(videosOnly.total, 2);
  assert.ok(videosOnly.items.every((it) => it.media_format === 'video'));

  // Filter 2: Articles only
  const articlesOnly = personalizeFeed(dummyItems, { type: 'article' }, prefs);
  assert.equal(articlesOnly.total, 2);
  assert.ok(articlesOnly.items.every((it) => it.media_format === 'article'));

  // Filter 3: Combined Videos + SOC / Blue Team
  const socVideos = personalizeFeed(dummyItems, { type: 'video', subject: 'soc_blue_team' }, prefs);
  assert.equal(socVideos.total, 1);
  assert.equal(socVideos.items[0].id, 'youtube:vid1');

  // Filter 4: Combined Articles + Networking
  const networkingArticles = personalizeFeed(dummyItems, { type: 'article', subject: 'networking' }, prefs);
  assert.equal(networkingArticles.total, 1);
  assert.equal(networkingArticles.items[0].id, 'article:art1');

  // Filter 5: Security Advisories (Editorial Kind)
  const advisories = personalizeFeed(dummyItems, { kind: 'security_advisory' }, prefs);
  assert.equal(advisories.total, 1);
  assert.equal(advisories.items[0].id, 'article:advisory1');

  // Filter 6: Search query
  const searchResults = personalizeFeed(dummyItems, { query: 'CVE-2026-9999' }, prefs);
  assert.equal(searchResults.total, 1);
  assert.equal(searchResults.items[0].id, 'article:advisory1');
});

test('5. Backward compatibility with legacy tab mappings', () => {
  const mapVideos = mapTabToTaxonomy('videos');
  assert.equal(mapVideos.type, 'video');

  const mapArticles = mapTabToTaxonomy('articles');
  assert.equal(mapArticles.type, 'article');

  const mapNews = mapTabToTaxonomy('news');
  assert.equal(mapNews.kind, 'news');
  assert.equal(mapNews.subject, 'cybersecurity');

  const mapAdvisories = mapTabToTaxonomy('security-alerts');
  assert.equal(mapAdvisories.kind, 'security_advisory');

  const mapCareer = mapTabToTaxonomy('career');
  assert.equal(mapCareer.subject, 'career_development');
});
