const fs = require('fs');
const path = require('path');

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      if (item !== 'node_modules' && item !== '.next' && item !== '.git') {
        walk(full);
      }
    } else if (full.endsWith('.tsx') || full.endsWith('.ts')) {
      const content = fs.readFileSync(full, 'utf8');
      if (content.includes('#767682')) {
        fs.writeFileSync(full, content.split('#767682').join('#6b6b7b'), 'utf8');
        console.log('Updated', full);
      }
    }
  }
}

walk('src');
walk('app');
console.log('Finished updating color contrast token.');

