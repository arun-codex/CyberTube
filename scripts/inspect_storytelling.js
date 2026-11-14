const fs = require('fs');

const content = fs.readFileSync('src/data/storytelling-masterclass-course.ts', 'utf8');

const moduleMatches = content.match(/"id":\s*"mod-storytelling-[^"]+"/g) || [];
console.log('Module IDs found in file (' + moduleMatches.length + '):');
moduleMatches.forEach(m => console.log('  ' + m));

const lessonMatches = content.match(/"id":\s*"les-storytelling-[^"]+"/g) || [];
console.log('Total Lesson IDs found:', lessonMatches.length);

const quizMatches = content.match(/"quiz":/g) || [];
console.log('Total "quiz": keys found:', quizMatches.length);

const videoMatches = content.match(/"youtubeVideoId":/g) || [];
console.log('Total "youtubeVideoId": keys found:', videoMatches.length);
