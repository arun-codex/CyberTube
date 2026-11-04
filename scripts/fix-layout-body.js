const fs = require('fs');
let code = fs.readFileSync('app/layout.tsx', 'utf8');
code = code.replace(
  'className="bg-canvas text-text-secondary min-h-screen flex flex-col font-sans selection:bg-[#e8e8f2] dark:selection:bg-[#1e1e30] selection:text-[#303055] dark:selection:text-[#f0f0f8] transition-colors duration-150"',
  'className="bg-white dark:bg-[#0e0e17] text-[#403f53] dark:text-[#c0c0d4] min-h-screen flex flex-col font-sans selection:bg-[#e8e8f2] dark:selection:bg-[#1e1e30] selection:text-[#303055] dark:selection:text-[#f0f0f8] transition-colors duration-150"'
);
fs.writeFileSync('app/layout.tsx', code, 'utf8');
console.log('Updated layout body classes.');

