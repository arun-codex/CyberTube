import type { SkillItem } from '@/types/catalog';

export const SKILL_LEVELS = [
  { value: 0, label: 'Not started', short: 'Not started', description: 'Not yet studied or practiced' },
  { value: 1, label: 'Learning', short: 'Learning', description: 'Can explain key concepts with guidance' },
  { value: 2, label: 'Practiced', short: 'Practiced', description: 'Completed an authorized exercise or lab' },
  { value: 3, label: 'Confident', short: 'Confident', description: 'Can repeat and explain the task independently' },
] as const;
export type SkillLevel = 0 | 1 | 2 | 3;
export type SkillProgress = { level: SkillLevel; evidence: string; updatedAt: string };
export type SkillProgressMap = Record<string, SkillProgress>;

export const SKILL_ROLES = [
  {id:'all',name:'All-round Security',description:'Broad cybersecurity foundations across every domain',skills:[]},
  {id:'soc',name:'SOC Analyst',description:'Alert triage, logging, analysis, investigation and reporting',skills:[
    'skill-found-01','skill-found-02','skill-found-04','skill-found-05',
    'skill-sec-01','skill-sec-02','skill-sec-05','skill-script-02',
    'skill-def-01','skill-def-02','skill-def-03','skill-def-04','skill-def-05','skill-soft-01','skill-soft-03',
  ]},
  {id:'pentest',name:'Ethical Hacker',description:'Authorized testing, networking, recon and remediation',skills:[
    'skill-found-01','skill-found-02','skill-found-03','skill-found-05',
    'skill-sec-02','skill-sec-03','skill-script-01','skill-script-02',
    'skill-off-01','skill-off-02','skill-off-03','skill-off-04','skill-soft-01','skill-soft-02',
  ]},
  {id:'dfir',name:'DFIR Analyst',description:'Evidence handling, host forensics, telemetry and response',skills:[
    'skill-found-01','skill-found-02','skill-found-04','skill-found-05','skill-sec-02',
    'skill-script-02','skill-def-01','skill-def-02','skill-def-03','skill-def-04',
    'skill-def-05','skill-def-06','skill-soft-01','skill-soft-03',
  ]},
  {id:'cloud',name:'Cloud Security Engineer',description:'Cloud IAM, monitoring, scripting and infrastructure defense',skills:[
    'skill-found-01','skill-found-02','skill-found-03','skill-found-05',
    'skill-sec-01','skill-sec-02','skill-sec-03','skill-sec-04',
    'skill-script-02','skill-script-03','skill-cloud-01','skill-cloud-02',
    'skill-cloud-03','skill-soft-01',
  ]},
  {id:'appsec',name:'AppSec Engineer',description:'Secure code, authorization, threat modeling and web testing',skills:[
    'skill-found-02','skill-found-05','skill-sec-01','skill-sec-02',
    'skill-sec-03','skill-sec-04','skill-script-02','skill-script-03',
    'skill-off-02','skill-off-03','skill-cloud-01','skill-cloud-02',
    'skill-soft-01','skill-soft-02',
  ]},
  {id:'grc',name:'GRC Analyst',description:'Risk, governance, identity controls and stakeholder communication',skills:[
    'skill-found-01','skill-sec-01','skill-sec-02','skill-sec-04','skill-sec-05',
    'skill-def-03','skill-soft-01','skill-soft-02','skill-soft-03',
  ]},
] as const;

export type RoleId = (typeof SKILL_ROLES)[number]['id'];

export const PROFICIENCY_PERCENT: Record<SkillLevel,number> = {0:0,1:33,2:67,3:100};
export function normalizeLevel(value: unknown): SkillLevel {
  return value===1||value===2||value===3 ? value : 0;
}
export function getRoleSkills(skills:SkillItem[],roleId:string): SkillItem[] {
  const role=SKILL_ROLES.find(item=>item.id===roleId) || SKILL_ROLES[0];
  if(role.id==='all')return skills;
  const selected=new Set<string>(role.skills);
  return skills.filter(skill=>selected.has(skill.id));
}
export function skillSummary(skills:SkillItem[],state:SkillProgressMap){
  const total=skills.length;
  const counts=[0,0,0,0];
  let score=0;
  for(const skill of skills){
    const level=normalizeLevel(state[skill.id]?.level);
    counts[level]++;
    score+=PROFICIENCY_PERCENT[level];
  }
  return {
    total,counts,
    confident:counts[3],practiced:counts[2],learning:counts[1],
    reviewed:total-counts[0],
    // Self-assessment coverage, not a verified employment readiness score.
    coverage:total?Math.round(score/total):0,
    mastery:total?Math.round(counts[3]/total*100):0,
  };
}
export function roleGaps(skills:SkillItem[],state:SkillProgressMap,limit=5){
  return [...skills].filter(skill=>normalizeLevel(state[skill.id]?.level)<3)
    .sort((a,b)=>{
      const al=normalizeLevel(state[a.id]?.level),bl=normalizeLevel(state[b.id]?.level);
      // Practice before moving on to completely unfamiliar specializations.
      const priority=(level:number)=> level===2?0:level===1?1:2;
      return priority(al)-priority(bl) || a.title.localeCompare(b.title);
    }).slice(0,limit);
}
export const SKILL_CATEGORIES = [
 'Foundations','Security basics','Scripting','Defensive','Offensive',
 'Cloud & AI security','Soft skills',
] as const;
export function parseLegacyCompletedIds(value: unknown, allowedIds:Set<string>):string[]{
  if(!Array.isArray(value))return [];
  return [...new Set(value.filter((id):id is string=>typeof id==='string'&&allowedIds.has(id)))];
}
