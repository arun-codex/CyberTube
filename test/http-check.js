const { spawn } = require('node:child_process');
const net = require('node:net');
const assert = require('node:assert/strict');
const { setTimeout: delay } = require('node:timers/promises');

async function main() {
  // Reserve a free local port so concurrent verification does not conflict.
  const reservation = net.createServer();
  await new Promise(resolve => reservation.listen(0, '127.0.0.1', resolve));
  const port = reservation.address().port;
  await new Promise(resolve => reservation.close(resolve));
  const child = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'start', '-H', '127.0.0.1', '-p', String(port)], { stdio: ['ignore', 'pipe', 'pipe'] });
  let output = '';
  child.stdout.on('data', data => { output += data; });
  child.stderr.on('data', data => { output += data; });
  const base = `http://127.0.0.1:${port}`;
  try {
    let ready = false;
    for (let attempt = 0; attempt < 100; attempt++) {
      if (child.exitCode !== null) throw new Error(output);
      try { await fetch(base, { signal: AbortSignal.timeout(1000) }); ready = true; break; } catch {}
      await delay(100);
    }
    if (!ready) throw new Error('Production server startup timed out: ' + output);
    const routes = ['/', '/library', '/discover', '/domains', '/resources/portswigger-sql-injection-lab', '/resources/blackhat-hardware-backdoors-x86', '/saved', '/support'];
    for (const route of routes) {
      const response = await fetch(base + route, { signal: AbortSignal.timeout(10000) });
      assert.equal(response.status, 200, route);
      assert.ok((await response.text()).length > 0);
      console.log('Verified route', route, response.status);
    }
    const missing = await fetch(base + '/resources/non-existent-slug-xyz', { signal: AbortSignal.timeout(10000) });
    assert.equal(missing.status, 404);
    console.log('PASS: 7 production HTTP checks');
  } finally {
    if (child.exitCode === null) {
      const exited = new Promise(resolve => child.once('exit', resolve));
      child.kill('SIGTERM');
      await exited;
    }
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
