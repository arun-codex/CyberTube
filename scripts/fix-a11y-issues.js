const fs = require('fs');

// 1. Update app/discover/page.tsx
const discoverPath = 'app/discover/page.tsx';
let discover = fs.readFileSync(discoverPath, 'utf8');
discover = discover.replace(
  '<select\r\n              value={filters.sortBy}',
  '<select\r\n              aria-label="Sort resources"\r\n              value={filters.sortBy}'
).replace(
  '<select\n              value={filters.sortBy}',
  '<select\n              aria-label="Sort resources"\n              value={filters.sortBy}'
);
fs.writeFileSync(discoverPath, discover, 'utf8');
console.log('Fixed discover select label');

// 2. Update ModuleAccordion.tsx active lesson duration text color
const accordionPath = 'src/components/courses/ModuleAccordion.tsx';
let accordion = fs.readFileSync(accordionPath, 'utf8');
accordion = accordion.replace(
  '<div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-[#6b6b7b]">',
  '<div className={`flex items-center gap-2 mt-1 text-[11px] font-mono ${isActive ? "text-[#403f53]" : "text-[#6b6b7b]"}`}>\r\n'
);
fs.writeFileSync(accordionPath, accordion, 'utf8');
console.log('Fixed active lesson duration contrast in ModuleAccordion');

