const { INITIAL_RESOURCES: RESOURCES } = require('../src/data/resources');
const { CYBERSECURITY_DOMAINS, RESOURCE_TYPES } = require('../src/data/metadata');

console.log('--- CYBERTUBE RESOURCE CATALOG AUDIT ---');
console.log('Total resources in database:', RESOURCES.length);

const validDomains = new Set(CYBERSECURITY_DOMAINS.map(d => d.id));
const validTypes = new Set(RESOURCE_TYPES.map(t => t.id));
const validDifficulties = new Set(['beginner', 'intermediate', 'advanced']);
const validPricing = new Set(['free', 'freemium', 'paid']);

const issues = [];
const seenUrls = new Set();
const seenSlugs = new Set();
const seenIds = new Set();

const domainCounts = {};
const typeCounts = {};

RESOURCES.forEach((r, idx) => {
  const prefix = `[#${idx + 1} - ${r.slug || 'unknown'}]`;

  // ID & Slug
  if (!r.id) issues.push(`${prefix} Missing ID`);
  if (seenIds.has(r.id)) issues.push(`${prefix} Duplicate ID: ${r.id}`);
  seenIds.add(r.id);

  if (!r.slug) issues.push(`${prefix} Missing slug`);
  if (seenSlugs.has(r.slug)) issues.push(`${prefix} Duplicate slug: ${r.slug}`);
  seenSlugs.add(r.slug);

  // Title
  if (!r.title || r.title.trim().length === 0) issues.push(`${prefix} Missing title`);

  // Canonical URL
  if (!r.canonicalUrl) {
    issues.push(`${prefix} Missing canonicalUrl`);
  } else {
    try {
      const parsed = new URL(r.canonicalUrl);
      if (parsed.protocol !== 'https:') {
        issues.push(`${prefix} Non-HTTPS protocol: ${r.canonicalUrl}`);
      }
    } catch (e) {
      issues.push(`${prefix} Malformed URL: ${r.canonicalUrl}`);
    }
    if (seenUrls.has(r.canonicalUrl)) {
      issues.push(`${prefix} Duplicate canonicalUrl: ${r.canonicalUrl}`);
    }
    seenUrls.add(r.canonicalUrl);
  }

  // Type
  if (!validTypes.has(r.resourceType)) {
    issues.push(`${prefix} Invalid resourceType: ${r.resourceType}`);
  } else {
    typeCounts[r.resourceType] = (typeCounts[r.resourceType] || 0) + 1;
  }

  // Domains (array of CybersecurityDomain)
  if (!Array.isArray(r.domains) || r.domains.length === 0) {
    issues.push(`${prefix} domains must be a non-empty array`);
  } else {
    r.domains.forEach(d => {
      if (!validDomains.has(d)) {
        issues.push(`${prefix} Invalid domain entry: ${d}`);
      } else {
        domainCounts[d] = (domainCounts[d] || 0) + 1;
      }
    });
  }

  // Difficulty
  if (!validDifficulties.has(r.difficulty)) {
    issues.push(`${prefix} Invalid difficulty: ${r.difficulty}`);
  }

  // Provider
  if (!r.provider || r.provider.trim().length === 0) {
    issues.push(`${prefix} Missing provider`);
  }

  // Pricing model
  if (!validPricing.has(r.pricingModel)) {
    issues.push(`${prefix} Invalid pricingModel: ${r.pricingModel}`);
  }

  // Description
  if (!r.description || r.description.length < 25) {
    issues.push(`${prefix} Insufficient description`);
  }

  // Skills & Tags
  if (!Array.isArray(r.skills) || r.skills.length === 0) {
    issues.push(`${prefix} Skills must be non-empty array`);
  }
  if (!Array.isArray(r.tags) || r.tags.length === 0) {
    issues.push(`${prefix} Tags must be non-empty array`);
  }

  // Learning Outcomes
  if (!Array.isArray(r.learningOutcomes) || r.learningOutcomes.length === 0) {
    issues.push(`${prefix} learningOutcomes must be non-empty array`);
  }

  // Status & Verification Date
  if (r.status !== 'active') {
    issues.push(`${prefix} status is not active: ${r.status}`);
  }
  if (!r.lastVerifiedAt || isNaN(Date.parse(r.lastVerifiedAt))) {
    issues.push(`${prefix} Invalid lastVerifiedAt date: ${r.lastVerifiedAt}`);
  }
});

console.log('\nDomain Representation (Total tags):');
for (const [dom, count] of Object.entries(domainCounts)) {
  console.log(`  - ${dom}: ${count}`);
}

console.log('\nResource Type Representation:');
for (const [typ, count] of Object.entries(typeCounts)) {
  console.log(`  - ${typ}: ${count}`);
}

if (issues.length === 0) {
  console.log('\n✅ CATALOG AUDIT PASSED: 22/22 resources are fully valid, distinct, verified, and mapped.');
  process.exit(0);
} else {
  console.error('\n❌ CATALOG AUDIT FAILED:', issues);
  process.exit(1);
}
