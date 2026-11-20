const test = require('node:test');
const assert = require('node:assert/strict');
const roadmap = require('../src/data/tryhackme-roadmap.json');

test('TryHackMe roadmap includes all source sections and entries', () => {
  const sections = roadmap.sections;
  const entries = sections.flatMap((section) => section.rooms);
  assert.equal(sections.length, 28);
  assert.equal(entries.length, 502);
  assert.equal(new Set(entries.map((room) => room.id)).size, 482);
  assert.equal(sections[0].title, 'Intro Rooms');
  assert.equal(sections.at(-1).title, 'Special Events');
  assert.equal(roadmap.source.repository, 'https://github.com/Hunterdii/TryHackMe-Roadmap');
  assert.equal(roadmap.source.license, 'CC0-1.0');
});

test('Every room is an original TryHackMe room URL with a stable identifier', () => {
  const sectionIds = new Set();
  for (const section of roadmap.sections) {
    assert.ok(!sectionIds.has(section.id), 'Duplicate section: ' + section.id);
    sectionIds.add(section.id);
    assert.ok(section.suggestedLevel);
    assert.ok(section.rooms.length > 0);
    for (const room of section.rooms) {
      assert.ok(room.title.trim().length > 0, 'Room has empty title');
      const url = new URL(room.url);
      assert.equal(url.protocol, 'https:');
      assert.equal(url.hostname, 'tryhackme.com');
      assert.equal(url.pathname, '/room/' + room.id);
    }
  }
});

test('Original overlaps are kept while access warnings are disclosed', () => {
  const entries = roadmap.sections.flatMap((section) => section.rooms);
  assert.equal(entries.filter((room) => room.accessNote).length, 3);
  const repeated = entries.filter((room, index) => entries.findIndex((item) => item.id === room.id) !== index);
  assert.equal(repeated.length, 20);
  assert.ok(entries.some((room) => room.id === 'linuxfundamentalspart2' && room.accessNote));
  assert.ok(entries.some((room) => room.id === 'linuxfundamentalspart3' && room.accessNote));
});
