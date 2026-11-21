import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { NextRequest } from 'next/server';
import { COURSES } from '../src/data/courses';
import { POST } from '../app/api/courses/quiz/submit/route';
import { setAuthenticatedUserForTesting } from '../src/lib/supabase/server';

const repo=(p:string)=>readFileSync(join(process.cwd(),p),'utf-8');
const linux=COURSES.find(c=>c.slug==='linux-zero-to-advanced')!;
const mern=COURSES.find(c=>c.slug==='mern-full-stack-course-with-ai')!;
function submit(course:any,module:any,answerIndexes:number[],courseId=course.id){
 return POST(new NextRequest('http://localhost:3000/api/courses/quiz/submit',{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    courseSlug:course.slug,courseId,moduleId:module.id,
    selectedAnswers:Object.fromEntries(answerIndexes.map((value,index)=>[String(index),value])),
  }),
 }));
}

test('MERN playlist retains three source-video IDs and adds guided exercises and quizzes',()=>{
 assert.equal(mern.sourcePlaylistId,'PLQl7ZDyS2qk8');
 assert.equal(mern.modules.length,3);
 assert.equal(mern.modules.flatMap(m=>m.lessons).length,6);
 assert.deepEqual(mern.modules.flatMap(m=>m.lessons).map(l=>l.youtubeVideoId).filter(Boolean),
   ['fFVZ9xbyBlc','aqtA2zHURbg','PNQiabb5ZjY']);
 assert.ok(mern.modules[2].lessons.every(l=>!l.youtubeVideoId));
 for(const module of mern.modules){
   assert.ok(module.quiz);
   assert.equal(module.quiz?.questions.length,3);
   assert.ok(module.quiz?.questions.every(q=>Number.isInteger(q.correctAnswerIndex)));
 }
});

test('generic Linux quiz is graded by the correct endpoint, not Storytelling API',async()=>{
 setAuthenticatedUserForTesting(null);
 const module=linux.modules.find(m=>m.quiz&&m.quiz.questions.length>0)!;
 const answers=module.quiz!.questions.map(q=>q.correctAnswerIndex!);
 const res=await submit(linux,module,answers);
 const body=await res.json();
 assert.equal(res.status,200,JSON.stringify(body));
 assert.equal(body.success,true);
 assert.equal(body.score,100);
 assert.equal(body.passed,true);
 assert.equal(body.correctCount,answers.length);
 assert.equal(body.savedToCloud,false);
 assert.equal(body.gradedBy,'cybertube-server');
});

test('MERN module quiz handles good and wrong answers without a fake pass',async()=>{
 setAuthenticatedUserForTesting(null);
 const module=mern.modules[0];
 const correct=module.quiz!.questions.map(q=>q.correctAnswerIndex!);
 const good=await submit(mern,module,correct);
 assert.equal(good.status,200,JSON.stringify(await good.json()));
 const wrong=module.quiz!.questions.map(q=>(q.correctAnswerIndex!+1)%q.options.length);
 const res=await submit(mern,module,wrong);
 const body=await res.json();
 assert.equal(res.status,200);
 assert.equal(body.score,0);
 assert.equal(body.passed,false);
});

test('malformed/partial answers and cross-course submissions are rejected',async()=>{
 const module=linux.modules.find(m=>m.quiz&&m.quiz.questions.length>0)!;
 const good=module.quiz!.questions.map(q=>q.correctAnswerIndex!);
 assert.equal((await submit(linux,module,[],linux.id)).status,400);
 assert.equal((await submit(linux,module,good,'another-course')).status,400);
 const wrongIndex=[...good];wrongIndex[0]=999;
 assert.equal((await submit(linux,module,wrongIndex)).status,400);
});

test('protected Storytelling grading cannot be routed through generic endpoint',async()=>{
 const course=COURSES.find(c=>c.slug==='free-storytelling-masterclass')!;
 const module=course.modules[0];
 const res=await submit(course,module,[]);
 assert.equal(res.status,400);
 const result=await res.json();
 assert.match(result.error,/Invalid course/);
});

test('all course assessment buttons route to the right endpoint and focus the quiz directly',()=>{
 const moduleUI=repo('src/components/courses/ModuleQuizView.tsx');
 const panels=repo('src/components/courses/learning/LessonContentSections.tsx');
 const layout=repo('src/components/courses/learning/UniversalCourseLearningLayout.tsx');
 const sidebar=repo('src/components/courses/learning/CurriculumModule.tsx');
 assert.match(moduleUI,/isStorytellingCourse\s*\?\s*'\/api\/courses\/storytelling\/quiz\/submit'/);
 assert.match(moduleUI,/'\/api\/courses\/quiz\/submit'/);
 assert.doesNotMatch(moduleUI,/calculateFallbackScore/);
 assert.match(panels,/id="course-quiz-focus"/);
 assert.match(panels,/scrollIntoView/);
 assert.match(panels,/courseSlug=\{courseSlug\}/);
 assert.match(layout,/activeTabOverride !== 'quiz'/);
 assert.match(sidebar,/aria-label=\{\`Start quiz:/);
 assert.match(sidebar,/<button[\s\S]*module-quiz-sidebar-row-/);
});
