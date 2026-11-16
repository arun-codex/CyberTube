import { spawnSync } from 'node:child_process';
const r = spawnSync(process.execPath, ['scripts/study-replace.mjs', '--mode', 'inventory', ...process.argv.slice(2)], { stdio: 'inherit' });
process.exitCode = r.status ?? 1;
