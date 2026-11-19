import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('CyberTube Title Bar & Brand Logo Assets', () => {
  const root = path.resolve(__dirname, '..');

  it('1. app/icon.svg exists and contains valid SVG logo markup', () => {
    const file = path.join(root, 'app', 'icon.svg');
    assert.ok(fs.existsSync(file), 'app/icon.svg must exist for Next.js tab bar / title bar icon');
    const content = fs.readFileSync(file, 'utf8');
    assert.ok(content.includes('<svg'), 'must contain svg tag');
    assert.ok(content.includes('#00F5FF') || content.includes('#22D3EE'), 'must include CyberTube brand cyan');
  });

  it('2. public/favicon.ico exists and has valid non-zero byte size', () => {
    const file = path.join(root, 'public', 'favicon.ico');
    assert.ok(fs.existsSync(file), 'public/favicon.ico must exist for standard browser requests');
    const stat = fs.statSync(file);
    assert.ok(stat.size > 100, `favicon.ico size must be valid (was ${stat.size} bytes)`);
  });

  it('3. app/favicon.ico exists for Next.js App Router root favicon handler', () => {
    const file = path.join(root, 'app', 'favicon.ico');
    assert.ok(fs.existsSync(file), 'app/favicon.ico must exist');
  });

  it('4. public/apple-touch-icon.png exists for mobile & Safari title bar / home screens', () => {
    const file = path.join(root, 'public', 'apple-touch-icon.png');
    assert.ok(fs.existsSync(file), 'public/apple-touch-icon.png must exist');
    const stat = fs.statSync(file);
    assert.ok(stat.size > 500, `apple-touch-icon.png must be non-empty (was ${stat.size} bytes)`);
  });

  it('5. public/site.webmanifest exists and declares CyberTube icons', () => {
    const file = path.join(root, 'public', 'site.webmanifest');
    assert.ok(fs.existsSync(file), 'public/site.webmanifest must exist');
    const manifest = JSON.parse(fs.readFileSync(file, 'utf8'));
    assert.equal(manifest.short_name, 'CyberTube');
    assert.ok(Array.isArray(manifest.icons) && manifest.icons.length > 0, 'manifest must specify icons');
  });

  it('6. app/layout.tsx explicitly configures metadata.icons and manifest', () => {
    const layout = fs.readFileSync(path.join(root, 'app', 'layout.tsx'), 'utf8');
    assert.ok(layout.includes("icons:"), 'metadata must include icons definition');
    assert.ok(layout.includes("manifest: '/site.webmanifest'"), 'metadata must include manifest');
    assert.ok(layout.includes("url: '/icon.svg'"), 'metadata must reference /icon.svg');
    assert.ok(layout.includes("url: '/favicon.ico'"), 'metadata must reference /favicon.ico');
  });

  it('7. src/components/ui/CyberTubeLogo.tsx exists and is used in Header & Footer', () => {
    const logoFile = path.join(root, 'src', 'components', 'ui', 'CyberTubeLogo.tsx');
    assert.ok(fs.existsSync(logoFile), 'CyberTubeLogo.tsx must exist');
    const header = fs.readFileSync(path.join(root, 'src', 'components', 'Header.tsx'), 'utf8');
    assert.ok(header.includes('<CyberTubeLogo'), 'Header.tsx must render CyberTubeLogo');
    const footer = fs.readFileSync(path.join(root, 'src', 'components', 'Footer.tsx'), 'utf8');
    assert.ok(footer.includes('<CyberTubeLogo'), 'Footer.tsx must render CyberTubeLogo');
  });
});
