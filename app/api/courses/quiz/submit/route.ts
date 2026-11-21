import { NextRequest, NextResponse } from 'next/server';
import { getCourseBySlugWithDb } from '@/lib/courses';
import { createClient, getAuthenticatedUser } from '@/lib/supabase/server';
import type { KnowledgeCheckQuestion } from '@/types/course';

export const dynamic = 'force-dynamic';

function reply(body: Record<string, unknown>, status=200) {
  return NextResponse.json(body,{status,headers:{'Cache-Control':'private, no-store'}});
}

interface QuizSubmission {
  courseSlug?:unknown;
  courseId?:unknown;
  moduleId?:unknown;
  selectedAnswers?:unknown;
}

function validAnswers(raw:unknown,questions:KnowledgeCheckQuestion[]):raw is Record<string,number>{
  if(!raw||typeof raw!=='object'||Array.isArray(raw))return false;
  const selected=raw as Record<string,unknown>;
  if(Object.keys(selected).length!==questions.length)return false;
  return questions.every((question,index)=>{
    const answer=selected[String(index)];
    return Number.isInteger(answer)&&Number(answer)>=0&&Number(answer)<question.options.length;
  });
}

/**
 * General CyberTube quiz submission.
 *
 * Only public, editor-curated course question keys are used for grading.
 * Never trust client-provided scores, passing flags or answer keys.
 * Storytelling uses its separate, prerequisite-protected trusted evaluator.
 */
export async function POST(request:NextRequest){
  const body:QuizSubmission=await request.json().catch(()=>null) as QuizSubmission;
  if(!body||typeof body.courseSlug!=='string'||body.courseSlug.length>160||
      typeof body.courseId!=='string'||body.courseId.length>150||
      typeof body.moduleId!=='string'||body.moduleId.length>180||
      body.courseSlug==='free-storytelling-masterclass'){
    return reply({error:'Invalid course or module for general quiz submission.'},400);
  }

  const course=await getCourseBySlugWithDb(body.courseSlug);
  if(!course||course.slug==='free-storytelling-masterclass'){
    return reply({error:'Course not found or not published.'},404);
  }
  if(body.courseId!==course.id){
    return reply({error:'Course ID does not match the selected course.'},400);
  }
  const courseModule=course.modules.find(entry=>entry.id===body.moduleId);
  if(!courseModule)return reply({error:'Quiz module not found in this course.'},404);
  const quiz=courseModule.quiz||courseModule.lessons.find(lesson=>lesson.quiz)?.quiz;
  if(!quiz||!Array.isArray(quiz.questions)||quiz.questions.length<1||quiz.questions.length>100){
    return reply({error:'This module does not contain an active assessment.'},404);
  }
  const questions=quiz.questions;
  if(!questions.every(q=>
    Array.isArray(q.options)&&q.options.length>=2&&q.options.length<=8&&
    Number.isInteger(q.correctAnswerIndex)&&
    (q.correctAnswerIndex as number)>=0&&
    (q.correctAnswerIndex as number)<q.options.length
  )){
    return reply({error:'Assessment answer key is incomplete. Please contact support.'},422);
  }
  if(!validAnswers(body.selectedAnswers,questions)){
    return reply({error:'Answer every question with one valid option before submitting.'},400);
  }

  const answers=body.selectedAnswers as Record<string,number>;
  const questionResults=questions.map((question,index)=>({
    index,
    userChoice:answers[String(index)],
    correctAnswerIndex:question.correctAnswerIndex as number,
    isCorrect:answers[String(index)]===question.correctAnswerIndex,
    explanation:question.explanation||'Review the lesson notes for the relevant concept.',
  }));
  const correctCount=questionResults.filter(row=>row.isCorrect).length;
  const totalQuestions=questions.length;
  const passingScorePercent=quiz.passingScorePercent??70;
  const score=Math.round(correctCount/totalQuestions*100);
  const passed=score>=passingScorePercent;
  const submittedAt=new Date().toISOString();
  let savedToCloud=false;

  const user=await getAuthenticatedUser();
  if(user){
    const db=await createClient();
    if(!db)return reply({error:'Cloud progress is temporarily unavailable. Please retry.'},503);
    const entityId=course.slug+'::'+courseModule.id;
    // The owner-scoped row is a self-contained best score; never decrease
    // the learner's best achievement after a retake.
    const {data:existing,error:readError}=await (db.from('user_generic_progress') as any)
      .select('progress_percent,state_data,completed_at')
      .eq('user_id',user.id).eq('entity_type','course-quiz')
      .eq('entity_id',entityId).maybeSingle();
    if(readError)return reply({error:'Unable to verify your existing quiz score. Please retry.'},503);
    const previousScore=Number(existing?.state_data?.bestScore??existing?.progress_percent??0);
    const bestScore=Math.max(Number.isFinite(previousScore)?previousScore:0,score);
    const nowPassed=bestScore>=passingScorePercent;
    const {error:writeError}=await (db.from('user_generic_progress') as any).upsert({
      user_id:user.id,
      entity_type:'course-quiz',
      entity_id:entityId,
      progress_percent:bestScore,
      is_completed:nowPassed,
      state_data:{
        courseSlug:course.slug,moduleId:courseModule.id,bestScore,passingScorePercent,
        lastScore:score,attemptedAt:submittedAt,
        grading:'server-curated-quiz-v1',
      },
      completed_at:nowPassed?existing?.completed_at||submittedAt:null,
      updated_at:submittedAt,
    },{onConflict:'user_id,entity_type,entity_id'});
    if(writeError){
      console.error('[course-quiz] progress write failed',writeError.message);
      return reply({error:'Quiz was graded, but cloud progress could not be saved. Please retry.'},503);
    }
    savedToCloud=true;
  }

  return reply({
    success:true,
    courseId:course.id,moduleId:module.id,
    score,passed,correctCount,totalQuestions,
    passingScorePercent,questionResults,
    submittedAt,savedToCloud,gradedBy:'cybertube-server',
  });
}

/** Fetch signed-in learner's existing general-course best scores. */
export async function GET(request:NextRequest){
  const slug=request.nextUrl.searchParams.get('courseSlug')||'';
  if(!/^[a-z0-9-]{1,160}$/.test(slug)||slug==='free-storytelling-masterclass'){
    return reply({error:'Invalid course slug.'},400);
  }
  const user=await getAuthenticatedUser();
  if(!user)return reply({error:'Authentication required.'},401);
  const course=await getCourseBySlugWithDb(slug);
  if(!course)return reply({error:'Course not found or unpublished.'},404);
  const db=await createClient();
  if(!db)return reply({error:'Cloud progress unavailable.'},503);
  const {data,error}=await (db.from('user_generic_progress') as any)
    .select('entity_id,progress_percent,state_data')
    .eq('user_id',user.id)
    .eq('entity_type','course-quiz')
    .like('entity_id',slug+'::%')
    .limit(250);
  if(error)return reply({error:'Could not load cloud quiz results.'},503);
  const validIds=new Set(course.modules.map(item=>item.id));
  const scores:Record<string,number>={};
  for(const row of data||[]){
    const id=String(row.entity_id||'').slice(slug.length+2);
    if(!validIds.has(id))continue;
    const score=Number(row.state_data?.bestScore??row.progress_percent);
    if(Number.isFinite(score)&&score>=0&&score<=100)scores[id]=Math.max(scores[id]||0,score);
  }
  return reply({courseId:course.id,courseSlug:slug,scores});
}
