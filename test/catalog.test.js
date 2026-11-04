const test = require('node:test');
const assert = require('node:assert');

// Require the typescript compiled output or execute with ts-node/esbuild or plain js module
// Since resources.ts and catalog.ts are in TypeScript, let's write an automated test script that tests the catalog logic directly!

const { INITIAL_RESOURCES } = require('../src/data/resources');
const {
  getAllResources,
  getResourceBySlug,
  getFeaturedResources,
  getResourcesByDomain,
  getResourcesByType,
  filterResources,
  getFacetCounts,
} = require('../src/lib/catalog');

test('Resource Catalog — Data Model Integrity', () => {
  const resources = getAllResources();
  assert.ok(resources.length >= 15, `Expected at least 15 resources, got ${resources.length}`);

  for (const r of resources) {
    assert.ok(r.id, 'Resource must have an id');
    assert.ok(r.slug, `Resource ${r.id} must have a slug`);
    assert.ok(r.title, `Resource ${r.id} must have a title`);
    assert.ok(r.description, `Resource ${r.id} must have a description`);
    assert.ok(r.canonicalUrl.startsWith('http'), `Resource ${r.id} must have a valid canonicalUrl`);
    assert.ok(r.domains.length >= 1, `Resource ${r.id} must belong to at least 1 domain`);
    assert.ok(r.skills.length >= 1, `Resource ${r.id} must teach at least 1 skill`);
    assert.ok(['beginner', 'intermediate', 'advanced'].includes(r.difficulty), `Invalid difficulty: ${r.difficulty}`);
    assert.ok(['free', 'freemium', 'paid'].includes(r.pricingModel), `Invalid pricing: ${r.pricingModel}`);
    assert.ok(r.learningOutcomes.length >= 1, `Resource ${r.id} must have learning outcomes`);
  }
});

test('Taxonomy Coverage — All 11 Resource Types Represented', () => {
  const expectedTypes = [
    'video', 'course', 'article', 'documentation', 'github',
    'lab', 'ctf', 'podcast', 'research', 'certification', 'exam-prep'
  ];
  const resources = getAllResources();
  const presentTypes = new Set(resources.map((r) => r.resourceType));

  for (const t of expectedTypes) {
    assert.ok(presentTypes.has(t), `Resource type "${t}" must be represented in catalog`);
  }
});

test('Taxonomy Coverage — All 11 Cybersecurity Domains Represented', () => {
  const expectedDomains = [
    'fundamentals', 'network-security', 'soc-blue-team', 'red-team-pentest',
    'web-app-security', 'dfir', 'malware-reverse-engineering', 'cloud-security',
    'osint-threat-intel', 'iot-embedded-security', 'cryptography'
  ];
  const resources = getAllResources();
  const presentDomains = new Set();
  resources.forEach((r) => r.domains.forEach((d) => presentDomains.add(d)));

  for (const d of expectedDomains) {
    assert.ok(presentDomains.has(d), `Domain "${d}" must be represented in catalog`);
  }
});

test('Search Functionality — Keyword Matching Across Fields', () => {
  const resources = getAllResources();

  // Search by title
  const sqlResults = filterResources(resources, { query: 'SQL' });
  assert.ok(sqlResults.some((r) => r.slug.includes('sql')));

  // Search by tool
  const nmapResults = filterResources(resources, { query: 'nmap' });
  assert.ok(nmapResults.length > 0);
  assert.ok(nmapResults.some((r) => r.title.includes('Nmap') || r.tags.includes('port-scanning')));

  // Search by author/creator
  const fyodorResults = filterResources(resources, { query: 'Gordon Lyon' });
  assert.ok(fyodorResults.length > 0);

  // Search by tag
  const pcapResults = filterResources(resources, { query: 'pcap' });
  assert.ok(pcapResults.length > 0);

  // Empty query returns all
  const allResults = filterResources(resources, { query: '' });
  assert.strictEqual(allResults.length, resources.length);
});

test('Multi-Facet Filtering Conjunction (AND Across Facets, OR Within Facet)', () => {
  const resources = getAllResources();

  // Filter: Type = lab AND Pricing = free
  const freeLabs = filterResources(resources, {
    types: ['lab'],
    pricing: ['free'],
  });
  assert.ok(freeLabs.length > 0);
  for (const r of freeLabs) {
    assert.strictEqual(r.resourceType, 'lab');
    assert.strictEqual(r.pricingModel, 'free');
  }

  // Filter: Domain = web-app-security AND Difficulty = beginner
  const beginnerWeb = filterResources(resources, {
    domains: ['web-app-security'],
    difficulty: ['beginner'],
  });
  assert.ok(beginnerWeb.length > 0);
  for (const r of beginnerWeb) {
    assert.ok(r.domains.includes('web-app-security'));
    assert.strictEqual(r.difficulty, 'beginner');
  }
});

test('Sorting Determinism', () => {
  const resources = getAllResources();

  // Sort by title A-Z
  const titleSorted = filterResources(resources, { sortBy: 'title' });
  for (let i = 0; i < titleSorted.length - 1; i++) {
    assert.ok(
      titleSorted[i].title.localeCompare(titleSorted[i + 1].title) <= 0,
      `Order violation between "${titleSorted[i].title}" and "${titleSorted[i + 1].title}"`
    );
  }

  // Sort by duration ascending
  const durationSorted = filterResources(resources, { sortBy: 'duration-asc' });
  const numericDurations = durationSorted
    .map((r) => r.durationMinutes)
    .filter((d) => d !== undefined);
  for (let i = 0; i < numericDurations.length - 1; i++) {
    assert.ok(numericDurations[i] <= numericDurations[i + 1]);
  }
});

test('Resource Lookup & Unknown Slug Handling', () => {
  const valid = getResourceBySlug('portswigger-sql-injection-lab');
  assert.ok(valid);
  assert.strictEqual(valid.slug, 'portswigger-sql-injection-lab');

  const unknown = getResourceBySlug('non-existent-security-tool-slug-xyz');
  assert.strictEqual(unknown, undefined);
});

test('Live Facet Counts Calculation', () => {
  const resources = getAllResources();
  const counts = getFacetCounts(resources);

  assert.strictEqual(counts.totalCount, resources.length);
  assert.ok(counts.typeCounts.lab >= 1);
  assert.ok(counts.domainCounts['web-app-security'] >= 1);
  assert.ok(counts.pricingCounts.free >= 1);
});

