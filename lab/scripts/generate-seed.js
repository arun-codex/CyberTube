const fs = require('fs');
const { CYBERSECURITY_DOMAINS } = require('../../src/data/metadata');
const { INITIAL_RESOURCES } = require('../../src/data/resources');

let sql = '-- =============================================================================\n';
sql += '-- CYBERTUBE SEED DATA: 11 DOMAINS & 22 VERIFIED RESOURCES\n';
sql += '-- =============================================================================\n\n';

sql += '-- 1. Insert 11 Domains\n';
sql += 'INSERT INTO public.domains (id, name, slug, description, icon) VALUES\n';
const domainRows = CYBERSECURITY_DOMAINS.map(d => {
  const name = d.name.replace(/'/g, "''");
  const desc = d.shortDescription.replace(/'/g, "''");
  return `  ('${d.id}', '${name}', '${d.id}', '${desc}', '${d.iconName}')`;
});
sql += domainRows.join(',\n') + '\nON CONFLICT (id) DO UPDATE SET\n  name = EXCLUDED.name,\n  description = EXCLUDED.description,\n  icon = EXCLUDED.icon;\n\n';

sql += '-- 2. Insert 22 Resources\n';
sql += 'INSERT INTO public.resources (\n  id, slug, title, description, resource_type, provider, creator, canonical_url,\n  thumbnail_url, difficulty, language, pricing_model, estimated_duration_minutes,\n  estimated_duration_label, prerequisites, skills, learning_outcomes, featured,\n  publication_status, last_verified_at\n) VALUES\n';

const escapeArr = (arr) => arr && arr.length > 0 ? "ARRAY[" + arr.map(s => "'" + s.replace(/'/g, "''") + "'").join(', ') + "]" : "ARRAY[]::TEXT[]";

const resRows = INITIAL_RESOURCES.map(r => {
  const title = r.title.replace(/'/g, "''");
  const desc = r.description.replace(/'/g, "''");
  const provider = r.provider.replace(/'/g, "''");
  const creator = r.creator ? "'" + r.creator.replace(/'/g, "''") + "'" : 'NULL';
  const thumb = r.thumbnailUrl ? "'" + r.thumbnailUrl.replace(/'/g, "''") + "'" : 'NULL';
  const durMin = r.durationMinutes || 'NULL';
  const durLabel = r.estimatedDuration ? "'" + r.estimatedDuration.replace(/'/g, "''") + "'" : 'NULL';
  const prereqs = escapeArr(r.prerequisites || []);
  const skills = escapeArr(r.skills || []);
  const outcomes = escapeArr(r.learningOutcomes || []);
  const featured = r.featured ? 'TRUE' : 'FALSE';

  return `  ('${r.id}', '${r.slug}', '${title}', '${desc}', '${r.resourceType}', '${provider}', ${creator}, '${r.canonicalUrl}', ${thumb}, '${r.difficulty}', '${r.language}', '${r.pricingModel}', ${durMin}, ${durLabel}, ${prereqs}, ${skills}, ${outcomes}, ${featured}, 'published', '${r.lastVerifiedAt}')`;
});
sql += resRows.join(',\n') + '\nON CONFLICT (id) DO UPDATE SET\n  title = EXCLUDED.title,\n  description = EXCLUDED.description,\n  canonical_url = EXCLUDED.canonical_url;\n\n';

sql += '-- 3. Insert Resource Domains\n';
sql += 'INSERT INTO public.resource_domains (resource_id, domain_id) VALUES\n';
const relRows = [];
INITIAL_RESOURCES.forEach(r => {
  r.domains.forEach(d => {
    relRows.push(`  ('${r.id}', '${d}')`);
  });
});
sql += relRows.join(',\n') + '\nON CONFLICT (resource_id, domain_id) DO NOTHING;\n';

fs.writeFileSync('supabase/seed.sql', sql, 'utf8');
console.log('Successfully generated supabase/seed.sql with', INITIAL_RESOURCES.length, 'resources.');
