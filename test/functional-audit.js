const { INITIAL_RESOURCES } = require('../src/data/resources');
const { filterResources, getRelatedResources, getFacetCounts } = require('../src/lib/catalog');

console.log('--- FUNCTIONAL VERIFICATION AUDIT ---');

// 1. Search Verification
const search1 = filterResources(INITIAL_RESOURCES, { query: 'Wireshark' });
console.log('1. Search "Wireshark":', search1.length, 'matches (Expect > 0)');
if (search1.length === 0 || !search1[0].title.toLowerCase().includes('wireshark')) {
  throw new Error('Search failed to locate Wireshark');
}

// 2. Conjunction Filtering (Network Security + Video + Intermediate + Free)
const filter1 = filterResources(INITIAL_RESOURCES, {
  domains: ['network-security'],
  types: ['video'],
  difficulty: ['intermediate'],
  pricing: ['free']
});
console.log('2. Conjunction Filter (network-security & video & intermediate & free):', filter1.length, 'matches');
if (filter1.length === 0) {
  throw new Error('Conjunction filtering failed to return matches');
}
filter1.forEach(r => {
  if (!r.domains.includes('network-security')) throw new Error('Domain filter mismatch');
  if (r.resourceType !== 'video') throw new Error('Resource type filter mismatch');
  if (r.difficulty !== 'intermediate') throw new Error('Difficulty filter mismatch');
  if (r.pricingModel !== 'free') throw new Error('Pricing filter mismatch');
});

// 3. Sorting Verification
const sortedRecent = filterResources(INITIAL_RESOURCES, { sortBy: 'recently-added' });
console.log('3. Sort "recently-added": Top resource date =', sortedRecent[0].publishedAt);
const sortedAlpha = filterResources(INITIAL_RESOURCES, { sortBy: 'title' });
console.log('3. Sort "title": First =', sortedAlpha[0].title, '| Last =', sortedAlpha[sortedAlpha.length - 1].title);
if (sortedAlpha[0].title.localeCompare(sortedAlpha[1].title) > 0) {
  throw new Error('Alphabetical sorting failed');
}

// 4. Related Resources & Deduplication
const target = INITIAL_RESOURCES[0];
const related = getRelatedResources(target, 3);
console.log('4. Related resources for', target.slug, ':', related.map(r => r.slug));
if (related.some(r => r.id === target.id)) {
  throw new Error('Related resources includes the target itself');
}

// 5. Facet Counts Dimension Check
const counts = getFacetCounts(INITIAL_RESOURCES);
console.log('5. Facet Counts:');
console.log('   - Resource Types tracked:', Object.keys(counts.typeCounts).length);
console.log('   - Cybersecurity Domains tracked:', Object.keys(counts.domainCounts).length);
console.log('   - Difficulties tracked:', Object.keys(counts.difficultyCounts).length);
console.log('   - Pricing models tracked:', Object.keys(counts.pricingCounts).length);

if (Object.keys(counts.typeCounts).length !== 11 || Object.keys(counts.domainCounts).length !== 11) {
  throw new Error('Facet count dimensions do not cover 11 domains and 11 types');
}

console.log('✅ ALL FUNCTIONAL ASSERTIONS VERIFIED SUCCESSFULLY!');
