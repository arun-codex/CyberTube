const fs = require('fs');

// 1. Update src/lib/search.ts
let search = fs.readFileSync('src/lib/search.ts', 'utf8');
search = search.replace("import { courses } from '../data/courses';", "import { COURSES as courses } from '../data/courses';");
fs.writeFileSync('src/lib/search.ts', search, 'utf8');
console.log('Fixed search.ts course import');

// 2. Update app/profile/EnrolledCoursesList.tsx
let enrolled = fs.readFileSync('app/profile/EnrolledCoursesList.tsx', 'utf8');
enrolled = enrolled.replace("import { courses } from '@/data/courses';", "import { COURSES as courses } from '@/data/courses';");
fs.writeFileSync('app/profile/EnrolledCoursesList.tsx', enrolled, 'utf8');
console.log('Fixed EnrolledCoursesList.tsx course import');

