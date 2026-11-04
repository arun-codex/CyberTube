const fs = require('fs');

let code = fs.readFileSync('app/profile/EnrolledCoursesList.tsx', 'utf8');
code = code.replace('{course.estimatedHours}h estimated', '{course.estimatedDuration}');
fs.writeFileSync('app/profile/EnrolledCoursesList.tsx', code, 'utf8');

console.log('Fixed estimatedDuration in EnrolledCoursesList.tsx');

