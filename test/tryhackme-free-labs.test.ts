import test from 'node:test';
import assert from 'node:assert/strict';
import roadmap from '../src/data/tryhackme-roadmap.json';
import { searchCatalogPage } from '../src/lib/search';

const all = roadmap.sections.flatMap(section => section.rooms);
const free = all.filter(room => !('accessNote' in room && room.accessNote));
const roomIds = new Set(free.map(room => room.id));

test('free practical lab view excludes 3 rooms flagged no longer free', () => {
  assert.equal(roadmap.sections.length, 28);
  assert.equal(all.length, 502);
  assert.equal(free.length, 499);
  assert.equal(roomIds.size, 479);
  for (const id of ['linuxfundamentalspart2', 'linuxfundamentalspart3', 'introtolan']) {
    assert.ok(!roomIds.has(id), id + ' should not be listed as free');
  }
});

test('site search locates free TryHackMe rooms directly within Practical Labs', () => {
  const result = searchCatalogPage('TryHackMe', { pageSize: 25 });
  assert.ok(result.results.some(item => item.url === '/labs#tryhackme'));
  const rooms = searchCatalogPage('overpass', { type: 'tryhackme-room', pageSize: 50 });
  assert.ok(rooms.total > 0);
  assert.ok(rooms.results.every(item => item.url.startsWith('/labs?q=')));
  const sections = searchCatalogPage('Linux Fundamentals', { type: 'tryhackme-section' });
  assert.ok(sections.results.some(item => item.url === '/labs?section=linux-fundamentals'));
});

test('all listed rooms retain real TryHackMe links and source attributions', () => {
  for (const room of free) {
    assert.ok(room.url.startsWith('https://tryhackme.com/room/'));
    assert.ok(room.id);
    assert.ok(room.title);
  }
  assert.equal(roadmap.source.repository, 'https://github.com/Hunterdii/TryHackMe-Roadmap');
});

test('no flagged paid room can be reached through the free-room search index', () => {
  for (const id of ['linuxfundamentalspart2', 'linuxfundamentalspart3', 'introtolan']) {
    const match = searchCatalogPage(id, { type: 'tryhackme-room' });
    assert.equal(match.total, 0);
  }
});
