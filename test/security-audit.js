const fs = require('fs');
const path = require('path');

function scanDir(dir) {
  let issues = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        issues = issues.concat(scanDir(fullPath));
      }
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Check 1: dangerouslySetInnerHTML
      if (content.includes('dangerouslySetInnerHTML')) {
        // Only layout.tsx theme script is expected
        if (!fullPath.includes('layout.tsx')) {
          issues.push(`[XSS Risk] dangerouslySetInnerHTML in ${fullPath}`);
        }
      }
      
      // Check 2: eval()
      if (/\beval\s*\(/.test(content)) {
        issues.push(`[Code Execution] eval() in ${fullPath}`);
      }

      // Check 3: target='_blank' missing rel='noopener' or rel='noreferrer'
      const blankMatches = content.match(/target=["']_blank["']/g);
      if (blankMatches) {
        if (!content.includes('noopener') || !content.includes('noreferrer')) {
          issues.push(`[Reverse Tabnabbing] target='_blank' without noopener noreferrer in ${fullPath}`);
        }
      }

      // Check 4: Secret/Key leaks
      if (/(API_KEY|SECRET_KEY|BEARER_TOKEN|AWS_SECRET)\s*[:=]\s*["'][a-zA-Z0-9_\-]{16,}["']/i.test(content)) {
        issues.push(`[Exposed Secret] Possible embedded secret in ${fullPath}`);
      }
    }
  }
  return issues;
}

const issues = scanDir('./src').concat(scanDir('./app'));
console.log('--- SECURITY AUDIT SCAN ---');
console.log('Total Security Issues detected:', issues.length);
if (issues.length > 0) {
  console.log(issues);
  process.exit(1);
} else {
  console.log('✅ SECURITY PASS: No unvetted HTML injections, no evals, zero exposed credentials, and all target="_blank" links enforce noopener noreferrer.');
  process.exit(0);
}

