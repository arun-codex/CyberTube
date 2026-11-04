const { spawn } = require('child_process');
const http = require('http');

console.log('Starting Next.js production server on port 3001...');
const child = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['next', 'start', '-p', '3001'], {
  stdio: 'pipe',
  shell: true,
});

let serverReady = false;

child.stdout.on('data', (d) => {
  const msg = d.toString();
  console.log('Next log:', msg.trim());
  if (!serverReady && (msg.includes('Ready in') || msg.includes('started server') || msg.includes('http://localhost:3001') || msg.includes('Ready'))) {
    serverReady = true;
    setTimeout(runChecks, 1000);
  }
});

child.stderr.on('data', (d) => {
  console.error('Next err:', d.toString().trim());
});

async function checkUrl(path) {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:3001' + path, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve({ status: res.statusCode, length: data.length }));
    }).on('error', reject);
  });
}

async function runChecks() {
  try {
    const routes = [
      '/',
      '/discover',
      '/domains',
      '/resources/portswigger-sql-injection-lab',
      '/resources/blackhat-hardware-backdoors-x86',
      '/saved',
    ];
    for (const r of routes) {
      const res = await checkUrl(r);
      console.log('Verified route ' + r + ' -> Status: ' + res.status + ', Size: ' + res.length + ' bytes');
      if (res.status !== 200) {
        throw new Error('Failed route: ' + r);
      }
    }

    // Verify 404 for unknown slug
    const notFoundRes = await checkUrl('/resources/non-existent-slug-xyz');
    console.log('Verified 404 route -> Status: ' + notFoundRes.status);
    if (notFoundRes.status !== 404) {
      throw new Error('Expected 404 for invalid slug, got ' + notFoundRes.status);
    }

    console.log('>>> ALL NEXT.JS ROUTES SUCCESSFULLY VERIFIED! <<<');
    cleanup();
    process.exit(0);
  } catch (err) {
    console.error('Check failed:', err);
    cleanup();
    process.exit(1);
  }
}

function cleanup() {
  if (child) {
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', child.pid, '/f', '/t']);
    } else {
      child.kill('SIGTERM');
    }
  }
}

setTimeout(() => {
  if (!serverReady) {
    console.error('Timeout waiting for Next.js to start');
    cleanup();
    process.exit(1);
  }
}, 15000);

