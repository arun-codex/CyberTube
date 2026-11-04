const fs = require('fs');

let code = fs.readFileSync('app/profile/EnrolledCoursesList.tsx', 'utf8');
code = code.replace('{course.domain.toUpperCase()}', '{course.domains[0]?.toUpperCase() || "TRACK"}');
fs.writeFileSync('app/profile/EnrolledCoursesList.tsx', code, 'utf8');

let search = fs.readFileSync('src/lib/search.ts', 'utf8');
search = search.replace('const domainMatch = course.domain.toLowerCase().includes(cleanQuery);', 'const domainMatch = course.domains.some(d => d.toLowerCase().includes(cleanQuery));');
search = search.replace('category: course.domain,', 'category: course.domains[0],');
fs.writeFileSync('src/lib/search.ts', search, 'utf8');

console.log('Fixed Course domains type usage in EnrolledCoursesList & search.ts');

