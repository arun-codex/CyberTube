const fs = require('fs');
const filePath = 'app/discover/page.tsx';
let code = fs.readFileSync(filePath, 'utf8');

const target = `<Suspense fallback={<div className="container-max py-12 font-mono text-xs text-[#6b6b7b]">Loading directory...</div>}>`;
const replacement = `<Suspense fallback={
      <div className="container-max py-8 space-y-6">
        <div className="rounded-[8px] border border-[#e4e4ed] bg-[#f4f4f9] p-5 sm:p-6 h-36" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="hidden lg:block lg:col-span-3 h-96 rounded-[8px] border border-[#e4e4ed] bg-white" />
          <div className="lg:col-span-9 h-96 rounded-[8px] border border-[#e4e4ed] bg-white" />
        </div>
      </div>
    }>`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync(filePath, code, 'utf8');
  console.log('Successfully updated Discover fallback skeleton.');
} else {
  console.error('Target not found in', filePath);
}

