import { NextRequest, NextResponse } from 'next/server';
import { createClient, getAuthenticatedUser } from '@/lib/supabase/server';
import skills from '@/../data/skills.json';
import { SKILL_ROLES, normalizeLevel } from '@/lib/skills/framework';

export const dynamic = 'force-dynamic';

const allowedSkills = new Set(skills.map(skill=>skill.id));
const allowedRoles = new Set(SKILL_ROLES.map(role=>role.id));
const SKILL_TYPE = 'skill';
const GOAL_TYPE = 'skill-goal';
const ROLE_KEY = 'target-role';

function response(body:Record<string,unknown>,status=200){
  return NextResponse.json(body,{status,headers:{'Cache-Control':'private, no-store'}});
}
async function authenticated(){
  const user=await getAuthenticatedUser();
  if(!user)return null;
  const db=await createClient();
  if(!db)return null;
  return {user,db};
}
function formatProgress(rows:any[]){
  const progress:Record<string,{level:number;evidence:string;updatedAt:string}>={};
  for(const row of rows||[]){
    if(!allowedSkills.has(row.entity_id))continue;
    const data=row.state_data&&typeof row.state_data==='object'?row.state_data:{};
    const level=normalizeLevel(data.level ?? (row.is_completed?3:row.progress_percent>=67?2:row.progress_percent>=33?1:0));
    progress[row.entity_id]={
      level,
      evidence:typeof data.evidence==='string'?data.evidence.slice(0,400):'',
      updatedAt:row.updated_at||'',
    };
  }
  return progress;
}
async function load(db:NonNullable<Awaited<ReturnType<typeof createClient>>>,userId:string){
  const [skillsResponse,goalResponse]=await Promise.all([
    (db.from('user_generic_progress') as any).select('entity_id,progress_percent,is_completed,state_data,updated_at')
      .eq('user_id',userId).eq('entity_type',SKILL_TYPE).limit(100),
    (db.from('user_generic_progress') as any).select('state_data')
      .eq('user_id',userId).eq('entity_type',GOAL_TYPE).eq('entity_id',ROLE_KEY).maybeSingle(),
  ]);
  if(skillsResponse.error||goalResponse.error)throw Error('Unable to read saved progress');
  const id=goalResponse.data?.state_data?.roleId;
  return {
    userId,
    progress:formatProgress(skillsResponse.data||[]),
    roleId:allowedRoles.has(id)?id:'all',
  };
}
export async function GET(){
  const session=await authenticated();
  if(!session)return response({error:'Sign in to sync your Skills Map.'},401);
  try{return response(await load(session.db,session.user.id));}
  catch{return response({error:'Could not load cloud skill progress. Please retry.'},503);}
}

export async function POST(req:NextRequest){
  const session=await authenticated();
  if(!session)return response({error:'Sign in to save your Skills Map.'},401);
  const payload=await req.json().catch(()=>null);
  if(!payload||typeof payload!=='object')return response({error:'Invalid request.'},400);
  const now=new Date().toISOString();
  if(payload.action==='role'){
    if(typeof payload.roleId!=='string'||!allowedRoles.has(payload.roleId)){
      return response({error:'Unknown career track.'},400);
    }
    try{
      const {error}=await (session.db.from('user_generic_progress') as any).upsert({
        user_id:session.user.id,entity_type:GOAL_TYPE,entity_id:ROLE_KEY,
        progress_percent:0,is_completed:false,updated_at:now,completed_at:null,
        state_data:{roleId:payload.roleId},
      },{onConflict:'user_id,entity_type,entity_id'});
      if(error)throw error;
      return response({saved:true,userId:session.user.id,roleId:payload.roleId});
    }catch{return response({error:'Career track could not be saved.'},503);}
  }
  if(payload.action!=='skill'||typeof payload.skillId!=='string'||!allowedSkills.has(payload.skillId)||
     !Number.isInteger(payload.level)||payload.level<0||payload.level>3||
     typeof payload.evidence!=='string'||payload.evidence.length>400){
    return response({error:'Invalid skill level or evidence note.'},400);
  }
  const evidence=payload.evidence.trim();
  const level=normalizeLevel(payload.level);
  try{
    const {data,error}=await (session.db.from('user_generic_progress') as any).upsert({
      user_id:session.user.id,entity_type:SKILL_TYPE,entity_id:payload.skillId,
      progress_percent:[0,33,67,100][level],is_completed:level===3,
      updated_at:now,completed_at:level===3?now:null,
      state_data:{level,evidence,selfReported:true},
    },{onConflict:'user_id,entity_type,entity_id'})
      .select('entity_id,progress_percent,is_completed,state_data,updated_at').single();
    if(error||!data)throw error||new Error('No saved row returned');
    return response({saved:true,userId:session.user.id,skillId:payload.skillId,
      progress:formatProgress([data])[payload.skillId]});
  }catch{return response({error:'Cloud save failed. Your earlier progress was preserved.'},503);}
}

/** Legacy browser checkmarks are imported only on explicit user action.
 * ignoreDuplicates prevents old browser values overwriting any cloud row,
 * including an intentionally incomplete record.
 */
export async function PUT(req:NextRequest){
  const session=await authenticated();
  if(!session)return response({error:'Sign in to import browser progress.'},401);
  const body=await req.json().catch(()=>null);
  const ids:unknown=body?.completedIds;
  if(!Array.isArray(ids)||ids.length>100||
     ids.some(id=>typeof id!=='string'||!allowedSkills.has(id))){
    return response({error:'Invalid completed skill import list.'},400);
  }
  try{
    const unique=[...new Set(ids as string[])];
    if(unique.length){
      const now=new Date().toISOString();
      const {error}=await (session.db.from('user_generic_progress') as any)
        .upsert(unique.map(skillId=>({
          user_id:session.user.id,entity_type:SKILL_TYPE,entity_id:skillId,
          progress_percent:100,is_completed:true,updated_at:now,completed_at:now,
          state_data:{level:3,evidence:'',selfReported:true,importedFromBrowser:true},
        })),{onConflict:'user_id,entity_type,entity_id',ignoreDuplicates:true});
      if(error)throw error;
    }
    return response({imported:true,...await load(session.db,session.user.id)});
  }catch{return response({error:'Import failed. Browser progress is unchanged.'},503);}
}
