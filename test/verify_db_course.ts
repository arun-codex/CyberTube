import { getCourseBySlugWithDb, getAllCoursesWithDb } from '../src/lib/courses';

async function test() {
  console.log('--- Testing getAllCoursesWithDb ---');
  const allCourses = await getAllCoursesWithDb();
  console.log('Total courses returned:', allCourses.length);
  const iotCourseInAll = allCourses.find((c) => c.slug === 'iot-cybersecurity-zero-to-advanced');
  console.log('IoT course found in all courses:', iotCourseInAll ? 'YES' : 'NO');

  console.log('--- Testing getCourseBySlugWithDb ---');
  const course = await getCourseBySlugWithDb('iot-cybersecurity-zero-to-advanced');
  if (!course) {
    console.error('FAILED: Course not found by slug');
    process.exit(1);
  }

  console.log('Course ID:', course.id);
  console.log('Course Title:', course.title);
  console.log('Course Difficulty:', course.difficulty);
  console.log('Total Modules:', course.modules.length);
  const totalLessons = course.modules.flatMap((m) => m.lessons).length;
  console.log('Total Lessons:', totalLessons);
  console.log('Module 1 Title:', course.modules[0]?.title);
  console.log('Module 1 Lesson 1:', course.modules[0]?.lessons[0]?.title);
  console.log('Module 30 Title:', course.modules[29]?.title);
  console.log('Module 30 Lesson 4:', course.modules[29]?.lessons[3]?.title);
  console.log('Module 30 Capstone:', course.modules[29]?.capstoneAssessment?.title || 'None');

  if (course.modules.length === 30 && totalLessons === 120) {
    console.log('SUCCESS: All 30 modules and 120 lessons correctly resolved from database!');
  } else {
    console.error('MISMATCH in modules or lessons count');
    process.exit(1);
  }
}

test().catch((err) => {
  console.error(err);
  process.exit(1);
});
