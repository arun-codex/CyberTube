import test from 'node:test';
import assert from 'node:assert/strict';
import { searchCatalogPage, searchGlobalCatalog } from '../src/lib/search';

test('global search finds TryHackMe roadmap instead of no matches', () => {
  const response = searchCatalogPage('tryhackme', { pageSize: 20 });
  assert.ok(response.total > 0);
  assert.equal(response.results[0]?.url, '/tryhackme-roadmap');
  assert.ok(response.results.some(result => result.type === 'page' && result.title.includes('TryHackMe')));
});

test('search covers all core public website destinations', () => {
  const cases = [
    ['courses', '/courses'],
    ['study library', '/library'],
    ['skills map', '/skills'],
    ['certifications', '/certifications'],
    ['glossary', '/glossary'],
    ['privacy', '/privacy'],
    ['learning paths', '/learning-paths'],
    ['practice labs', '/labs'],
    ['careers', '/careers'],
    ['cheat sheets', '/cheat-sheets'],
  ];
  for (const [query, route] of cases) {
    const response = searchCatalogPage(query, { pageSize: 50 });
    assert.ok(response.results.some(result => result.url === route), query + ' must find ' + route);
  }
});

test('TryHackMe room search uses internal deep link and unique IDs', () => {
  const hits = searchCatalogPage('overpass', { type: 'tryhackme-room', pageSize: 50 });
  assert.ok(hits.total >= 1);
  assert.ok(hits.results.every(result => result.url.startsWith('/tryhackme-roadmap?q=')));
  const ids = hits.results.map(result => result.id);
  assert.equal(ids.length, new Set(ids).size);
});

test('TryHackMe section search links to the correct source section', () => {
  const hits = searchCatalogPage('linux fundamentals', { type: 'tryhackme-section', pageSize: 25 });
  assert.ok(hits.results.some(result => result.url === '/tryhackme-roadmap?section=linux-fundamentals'));
});

test('specific cybersecurity terms find lessons, skills, and reference information', () => {
  const linux = searchCatalogPage('linux', { pageSize: 50 });
  assert.ok(linux.typeCounts.lesson > 0 || linux.typeCounts['cheat-sheet'] > 0);
  const soc = searchCatalogPage('soc', { pageSize: 50 });
  assert.ok(soc.total > 0);
});

test('results page paginates, filters, and ranks exact page names', () => {
  const first = searchCatalogPage('linux', { pageSize: 5 });
  const second = searchCatalogPage('linux', { pageSize: 5, page: 2 });
  assert.equal(first.results.length, 5);
  assert.ok(second.results.length > 0);
  assert.notEqual(first.results[0]?.id, second.results[0]?.id);
  const roomOnly = searchCatalogPage('linux', { type: 'tryhackme-room', pageSize: 50 });
  assert.ok(roomOnly.results.length > 0);
  assert.ok(roomOnly.results.every(item => item.type === 'tryhackme-room'));
  assert.deepEqual(searchGlobalCatalog(''), []);
});

test('public search never lists admin pages or user-specific content', () => {
  const hits = ['admin', 'dashboard', 'auth'].flatMap(q => searchCatalogPage(q, { pageSize: 50 }).results);
  assert.ok(hits.every(result => !result.url.startsWith('/admin')));
  assert.ok(hits.every(result => !result.url.includes('/api/')));
});
