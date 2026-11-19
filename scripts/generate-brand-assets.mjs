import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="ct-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00F5FF"/>
      <stop offset="45%" stop-color="#22D3EE"/>
      <stop offset="100%" stop-color="#0891B2"/>
    </linearGradient>
    <linearGradient id="ct-shield" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#090D14"/>
    </linearGradient>
    <linearGradient id="ct-play" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#67E8F9"/>
      <stop offset="100%" stop-color="#00F5FF"/>
    </linearGradient>
    <filter id="ct-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- High-contrast vibrant cyan badge -->
  <rect x="2" y="2" width="60" height="60" rx="15" fill="url(#ct-bg)"/>
  <rect x="2" y="2" width="60" height="60" rx="15" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>

  <!-- Cyber Defense Shield -->
  <path d="M32 9.5 L48 16.5 V29.5 C48 40.5 41.2 49 32 52.5 C22.8 49 16 40.5 16 29.5 V16.5 Z" 
        fill="url(#ct-shield)" 
        filter="url(#ct-shadow)"/>

  <!-- Subtle shield border accent -->
  <path d="M32 12 L46 18 V29.5 C46 39.2 40 46.8 32 50 C24 46.8 18 39.2 18 29.5 V18 Z" 
        fill="none" 
        stroke="#22D3EE" 
        stroke-opacity="0.4" 
        stroke-width="1"/>

  <!-- Tube Media / Play Triangle -->
  <path d="M28 23 L40.5 31.5 L28 40 Z" 
        fill="url(#ct-play)"/>
</svg>`;

async function main() {
  console.log('Generating CyberTube brand & title bar assets...');

  const publicDir = path.join(projectRoot, 'public');
  const appDir = path.join(projectRoot, 'app');

  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  if (!fs.existsSync(appDir)) fs.mkdirSync(appDir, { recursive: true });

  // 1. Write SVG icons
  const iconSvgPublic = path.join(publicDir, 'icon.svg');
  const logoSvgPublic = path.join(publicDir, 'logo.svg');
  const iconSvgApp = path.join(appDir, 'icon.svg');
  const appleIconSvgApp = path.join(appDir, 'apple-icon.svg');

  fs.writeFileSync(iconSvgPublic, svgMarkup, 'utf8');
  fs.writeFileSync(logoSvgPublic, svgMarkup, 'utf8');
  fs.writeFileSync(iconSvgApp, svgMarkup, 'utf8');
  fs.writeFileSync(appleIconSvgApp, svgMarkup, 'utf8');
  console.log('✓ SVG icons written to public/ and app/');

  // 2. Render PNG resolutions using sharp
  const svgBuffer = Buffer.from(svgMarkup);

  const pngSizes = [
    { size: 16, file: 'favicon-16x16.png' },
    { size: 32, file: 'favicon-32x32.png' },
    { size: 48, file: 'favicon-48x48.png' },
    { size: 180, file: 'apple-touch-icon.png' },
    { size: 192, file: 'icon-192.png' },
    { size: 512, file: 'icon-512.png' },
  ];

  const pngBuffers = {};
  for (const { size, file } of pngSizes) {
    const buf = await sharp(svgBuffer, { density: 300 })
      .resize(size, size)
      .png()
      .toBuffer();
    pngBuffers[size] = buf;
    fs.writeFileSync(path.join(publicDir, file), buf);
    console.log(`✓ Rendered public/${file} (${size}x${size})`);
  }

  // Also write apple-touch-icon.png to app/
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), pngBuffers[180]);

  // 3. Generate multi-resolution ICO file (16, 32, 48)
  // We can write a simple valid ICO container for standard browsers
  // An ICO header: 6 bytes (0, 0, 1 (type ICO), count=3)
  // Directory entries: 16 bytes each
  // Followed by the PNG data for each entry! (Modern ICO format supports PNG images directly)
  const icoSizes = [16, 32, 48];
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // ICO format
  header.writeUInt16LE(icoSizes.length, 4); // Number of images

  let offset = 6 + (16 * icoSizes.length);
  const dirEntries = [];
  const imageChunks = [];

  for (const size of icoSizes) {
    const png = pngBuffers[size];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size < 256 ? size : 0, 0); // Width
    entry.writeUInt8(size < 256 ? size : 0, 1); // Height
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(png.length, 8); // Image size in bytes
    entry.writeUInt32LE(offset, 12); // Offset of image data
    dirEntries.push(entry);
    imageChunks.push(png);
    offset += png.length;
  }

  const icoBuffer = Buffer.concat([header, ...dirEntries, ...imageChunks]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  console.log('✓ Multi-resolution favicon.ico written to public/ and app/');

  // 4. Write Web Manifest for PWA / title bar / bookmark compliance
  const manifest = {
    name: 'CyberTube — Cybersecurity Learning Platform',
    short_name: 'CyberTube',
    description: 'A premium, structured developer and researcher learning platform for cybersecurity.',
    start_url: '/',
    display: 'standalone',
    background_color: '#090D14',
    theme_color: '#00F5FF',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml'
      }
    ]
  };

  fs.writeFileSync(
    path.join(publicDir, 'site.webmanifest'),
    JSON.stringify(manifest, null, 2),
    'utf8'
  );
  console.log('✓ site.webmanifest generated in public/');
  console.log('Brand asset generation complete.');
}

main().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
