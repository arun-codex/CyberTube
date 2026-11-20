import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  getRoleSkills, normalizeLevel, roleGaps, skillSummary, SKILL_CATEGORIES,
  SKILL_LEVELS, SKILL_ROLES, parseLegacyCompletedIds,
} from '../src/lib/skills/framework';
import type { SkillItem } from '../src/types/catalog';

const root=process.cwd();
const read=(path:string)=>readFileSync(join(root,path),'utf8');
const skills=JSON.parse(read('data/skills.json')) as SkillItem[];
const resourceIds=new Set((JSON.parse(read('data/resources.json')) as {id:string}[]).map(r=>r.id));
const api=read('app/api/skills/progress/route.ts');
const page=read('src/components/skills/SkillsClientView.tsx');

test('skills catalog is expanded without renaming legacy identifiers',()=>{
  assert.equal(skills.length,29);
  assert.equal(new Set(skills.map(s=>s.id)).size,skills.length);
  assert.equal(skills.filter(s=>!s.id.match(/^skill-/)).length,0);
  assert.equal(skills.filter(s=>s.whatGoodLooksLike.length<3).length,0);
  for(const s of skills){
    assert.ok(SKILL_CATEGORIES.includes(s.category as any),s.id);
    assert.ok(s.beginnerExplanation.length>35,s.id);
    assert.ok(s.linkedResourceIds.length>0,s.id);
    for(const id of s.linkedResourceIds)assert.ok(resourceIds.has(id),s.id+' has missing resource '+id);
  }
  for(const id of [
    'skill-found-01','skill-found-02','skill-found-03','skill-sec-01','skill-def-01',
    'skill-def-02','skill-off-01','skill-cloud-01','skill-soft-02',
  ]) assert.ok(skills.some(s=>s.id===id),'missing original '+id);
});
test('career profile mapping includes only existing skills and highlights role-relevant gaps',()=>{
  for(const role of SKILL_ROLES){
    const active=getRoleSkills(skills,role.id);
    assert.ok(active.length>=9,role.id);
    for(const id of role.skills)assert.ok(skills.some(s=>s.id===id),role.id+' missing '+id);
  }
  const role=getRoleSkills(skills,'soc');
  const progress={
    [role[0].id]:{level:3 as const,evidence:'',updatedAt:''},
    [role[1].id]:{level:2 as const,evidence:'',updatedAt:''},
  };
  assert.equal(skillSummary(role,progress).confident,1);
  assert.equal(skillSummary(role,progress).practiced,1);
  assert.equal(skillSummary(role,progress).reviewed,2);
  assert.ok(roleGaps(role,progress,5).some(skill=>skill.id===role[1].id));
});
test('levels have four valid self-report states and weighted coverage never exceeds 100',()=>{
  assert.deepEqual(SKILL_LEVELS.map(x=>x.value),[0,1,2,3]);
  assert.equal(normalizeLevel(9),0);
  assert.equal(normalizeLevel(-1),0);
  const first=skills[0];
  assert.equal(skillSummary([first],{[first.id]:{level:1,evidence:'',updatedAt:''}}).coverage,33);
  assert.equal(skillSummary([first],{[first.id]:{level:2,evidence:'',updatedAt:''}}).coverage,67);
  assert.equal(skillSummary([first],{[first.id]:{level:3,evidence:'',updatedAt:''}}).coverage,100);
});
test('legacy completed lists are sanitized and duplicate-safe',()=>{
  const allowed=new Set(skills.map(s=>s.id));
  assert.deepEqual(parseLegacyCompletedIds([skills[0].id,skills[0].id,'nope',null],allowed),[skills[0].id]);
  assert.deepEqual(parseLegacyCompletedIds({value:skills[0].id},allowed),[]);
});
test('server route enforces authenticated user, known ids and does not overwrite cloud imports',()=>{
  assert.match(api,/getAuthenticatedUser/);
  assert.match(api,/user_generic_progress/);
  assert.match(api,/allowedSkills\.has\(payload\.skillId\)/);
  assert.match(api,/payload\.evidence\.length>400/);
  assert.match(api,/ignoreDuplicates:true/);
  assert.match(api,/onConflict:'user_id,entity_type,entity_id'/);
  assert.doesNotMatch(api,/service_role|SUPABASE_SECRET_KEY|SUPABASE_SERVICE_ROLE_KEY/);
});
test('skills UI offers filters, evidence, role selection, cloud errors and CSV download',()=>{
  for(const str of ['SKILL_CATEGORIES','SKILL_ROLES','Save note','Role','Export progress CSV','/api/skills/progress','cloud','login?redirect=/skills']){
    assert.ok(page.toLowerCase().includes(str.toLowerCase()),'missing '+str);
  }
  assert.ok(!page.includes('Progress saved locally.'));
});
