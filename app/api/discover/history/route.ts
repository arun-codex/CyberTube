import { NextRequest, NextResponse } from 'next/server';
import { createClient, getAuthenticatedUser } from '@/lib/supabase/server';
import { COURSES } from '@/data/courses';

export const dynamic = 'force-dynamic';
const videoIdPattern = /^[A-Za-z0-9_-]{11}$/;
const response = (body: Record<string, unknown>, status=200) =>
  NextResponse.json(body,{status,headers:{'Cache-Control':'private, no-store'}});

async function session() {
  const user=await getAuthenticatedUser();
  if(!user)return null;
  const db=await createClient();
  return db?{db,user}:null;
}
function getCatalogMetadata(){
  const lookup=new Map<string,{title:string;channel:string;category:string}>();
  for(const course of COURSES){
    for(const courseModule of course.modules){
      for(const lesson of courseModule.lessons){
        if(lesson.youtubeVideoId&&videoIdPattern.test(lesson.youtubeVideoId)){
          lookup.set(lesson.youtubeVideoId,{
            title:lesson.title,
            channel:lesson.videoAttribution?.creator||course.instructor.name||'YouTube',
            category:course.domains?.[0]||'cybersecurity',
          });
        }
      }
    }
  }
  return lookup;
}
export async function GET() {
  const auth=await session();
  if(!auth)return response({error:'Sign in to view your cloud watch history'},401);
  const [discover,course]=await Promise.all([
    (auth.db.from('user_discover_video_progress') as any)
      .select('video_id,title,channel_name,category,last_position_seconds,max_position_seconds,duration_seconds,progress_percent,is_completed,last_watched_at')
      .eq('user_id',auth.user.id).order('last_watched_at',{ascending:false}).limit(250),
    (auth.db.from('user_lesson_video_progress') as any)
      .select('video_id,last_watched_seconds,duration_seconds,completion_percentage,is_completed,last_watched_at')
      .eq('user_id',auth.user.id).order('last_watched_at',{ascending:false}).limit(100),
  ]);
  if(discover.error)return response({error:'Cloud history is temporarily unavailable'},503);

  const catalog=getCatalogMetadata();
  const map=new Map<string,any>();
  for(const row of discover.data||[]){
    map.set(row.video_id,{...row,origin:'discover'});
  }
  if(!course.error){
    for(const row of course.data||[]){
      if(!videoIdPattern.test(row.video_id))continue;
      const previous=map.get(row.video_id);
      const metadata=catalog.get(row.video_id);
      const normalized={
        video_id:row.video_id,
        title:metadata?.title||'CyberTube course video',
        channel_name:metadata?.channel||'YouTube',
        category:metadata?.category||'cybersecurity',
        last_position_seconds:row.last_watched_seconds||0,
        max_position_seconds:row.last_watched_seconds||0,
        duration_seconds:row.duration_seconds||0,
        progress_percent:row.completion_percentage||0,
        is_completed:Boolean(row.is_completed),
        last_watched_at:row.last_watched_at,origin:'course',
      };
      if(!previous||Date.parse(row.last_watched_at)>Date.parse(previous.last_watched_at)){
        map.set(row.video_id,normalized);
      }
    }
  }
  return response({
    items:[...map.values()].sort((a,b)=>Date.parse(b.last_watched_at)-Date.parse(a.last_watched_at)),
    userId:auth.user.id,
    count:map.size,
  });
}
export async function POST(req:NextRequest) {
  const auth=await session();
  if(!auth)return response({error:'Sign in to sync your video history'},401);
  const payload=await req.json().catch(()=>null);
  if(!payload||typeof payload.videoId!=='string'||!videoIdPattern.test(payload.videoId)||
    typeof payload.title!=='string'||typeof payload.channel!=='string'||
    typeof payload.category!=='string'||!Number.isInteger(payload.positionSeconds)||
    !Number.isInteger(payload.durationSeconds)||payload.durationSeconds<1||
    payload.durationSeconds>172800||payload.positionSeconds<0||
    payload.positionSeconds>payload.durationSeconds+30||
    typeof payload.completed!=='boolean'){
    return response({error:'Invalid playback progress'},400);
  }
  const {data,error}=await (auth.db as any).rpc('save_discover_video_progress',{
    p_video_id:payload.videoId,
    p_title:payload.title.slice(0,220),
    p_channel:payload.channel.slice(0,110),
    p_category:payload.category.slice(0,60),
    p_position_seconds:Math.min(payload.durationSeconds,payload.positionSeconds),
    p_duration_seconds:payload.durationSeconds,
    p_completed:payload.completed,
  });
  if(error)return response({error:'Unable to save video progress'},503);
  return response({saved:true,progress:data});
}
export async function DELETE(req:NextRequest) {
  const auth=await session();
  if(!auth)return response({error:'Sign in to manage your watch history'},401);
  const body=await req.json().catch(()=>null);
  const id=body?.videoId;
  if(typeof id!=='string'||!videoIdPattern.test(id))return response({error:'Invalid video ID'},400);
  const {error}=await (auth.db.from('user_discover_video_progress') as any)
    .delete().eq('user_id',auth.user.id).eq('video_id',id);
  if(error)return response({error:'Could not remove this video from Discover history'},503);
  return response({removed:true});
}
