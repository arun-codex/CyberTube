'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Cloud, Download, ExternalLink, Target, BookOpen, RotateCcw, Sparkles, ChevronDown } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import type { Resource, SkillItem } from '@/types/catalog';
import {
  getRoleSkills, normalizeLevel, roleGaps, parseLegacyCompletedIds, skillSummary,
  SKILL_CATEGORIES, SKILL_LEVELS, SKILL_ROLES,
  type SkillLevel, type SkillProgress, type SkillProgressMap,
} from '@/lib/skills/framework';

interface Props { skills: SkillItem[]; resources: Resource[] }
const GUEST_KEY='cybertube_skills_v2_guest';
const GUEST_ROLE='cybertube_skills_v2_guest_role';
const LEGACY='cybertube_skills_completed';
const surface='rounded-2xl border border-[var(--border)] bg-[var(--card-bg)]';
const field='w-full min-h-[42px] rounded-xl border border-[var(--border-strong)] bg-[var(--surface-subtle)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] disabled:opacity-50';
const blank:SkillProgress={level:0,evidence:'',updatedAt:''};

function legacyIds(allowed:Set<string>){
  try{return parseLegacyCompletedIds(JSON.parse(localStorage.getItem(LEGACY)||'[]'),allowed);}
  catch{return [];}
}
function guestState(allowed:Set<string>):SkillProgressMap{
  const result:SkillProgressMap={};
  try{
    const saved=JSON.parse(localStorage.getItem(GUEST_KEY)||'{}');
    if(saved&&typeof saved==='object'&&!Array.isArray(saved)){
      for(const [id,row] of Object.entries(saved)){
        if(!allowed.has(id))continue;
        const data=row as Partial<SkillProgress>;
        result[id]={
          level:normalizeLevel(data?.level),
          evidence:typeof data?.evidence==='string'?data.evidence.slice(0,400):'',
          updatedAt:typeof data?.updatedAt==='string'?data.updatedAt:'',
        };
      }
    }
  }catch{}
  for(const id of legacyIds(allowed)){
    if(!result[id])result[id]={level:3,evidence:'',updatedAt:''};
  }
  return result;
}
function saveGuest(progress:SkillProgressMap){
  try{localStorage.setItem(GUEST_KEY,JSON.stringify(progress));}catch{}
}

export default function SkillsClientView({skills,resources}:Props){
  const {userId,isAuthLoading}=useAuth();
  const allowed=useMemo(()=>new Set(skills.map(s=>s.id)),[skills]);
  const [progress,setProgress]=useState<SkillProgressMap>({});
  const [drafts,setDrafts]=useState<Record<string,string>>({});
  const [roleId,setRoleId]=useState('all');
  const [sync,setSync]=useState<'loading'|'cloud'|'guest'|'error'>('loading');
  const [notice,setNotice]=useState('');
  const [legacy,setLegacy]=useState<string[]>([]);
  const [pending,setPending]=useState<string[]>([]);
  const [importing,setImporting]=useState(false);
  const [reload,setReload]=useState(0);
  const [category,setCategory]=useState('all');
  const [query,setQuery]=useState('');
  const [levelFilter,setLevelFilter]=useState('all');
  const [roleOnly,setRoleOnly]=useState(false);
  const [expanded,setExpanded]=useState<string[]>([]);
  const owner=useRef<string|null>(null);

  useEffect(()=>{
    if(isAuthLoading)return;
    const current=userId;
    owner.current=current;
    let disposed=false;
    setProgress({});setDrafts({});setPending([]);setRoleId('all');setNotice('');
    setLegacy([
      ...new Set([
        ...legacyIds(allowed),
        ...Object.entries(guestState(allowed)).filter(([,item])=>item.level===3).map(([id])=>id),
      ]),
    ]);
    if(!current){
      const local=guestState(allowed);
      setProgress(local);
      setDrafts(Object.fromEntries(Object.entries(local).map(([id,row])=>[id,row.evidence])));
      try{
        const localRole=localStorage.getItem(GUEST_ROLE)||'all';
        setRoleId(SKILL_ROLES.some(r=>r.id===localRole)?localRole:'all');
      }catch{}
      setSync('guest');
      return;
    }
    setSync('loading');
    const controller=new AbortController();
    fetch('/api/skills/progress',{credentials:'same-origin',cache:'no-store',signal:controller.signal})
      .then(async res=>{if(!res.ok)throw Error('Unable to load progress');return res.json();})
      .then(data=>{
        if(disposed||owner.current!==current||data.userId!==current)return;
        const state:SkillProgressMap=data.progress||{};
        setProgress(state);
        setDrafts(Object.fromEntries(Object.entries(state).map(([id,row])=>[id,row.evidence])));
        setRoleId(SKILL_ROLES.some(r=>r.id===data.roleId)?data.roleId:'all');
        setSync('cloud');
      })
      .catch(()=>{
        if(!disposed&&owner.current===current){
          setNotice('Cloud loading failed. Editing is paused to avoid losing your saved progress.');
          setSync('error');
        }
      });
    return ()=>{disposed=true;controller.abort();};
  },[allowed,userId,isAuthLoading,reload]);

  const canEdit=!isAuthLoading&&(sync==='guest'||sync==='cloud');
  const saveSkill=async(id:string,level:SkillLevel,evidence:string)=>{
    if(!canEdit||pending.includes(id)||!allowed.has(id))return;
    const cleaned=evidence.trim().slice(0,400);
    const next:SkillProgress={level,evidence:cleaned,updatedAt:new Date().toISOString()};
    const account=userId;
    if(!account){
      const updated={...progress,[id]:next};
      setProgress(updated);setDrafts(old=>({...old,[id]:cleaned}));saveGuest(updated);
      try{localStorage.removeItem(LEGACY);}catch{}
      return;
    }
    setNotice('');setPending(old=>[...old,id]);
    try{
      const res=await fetch('/api/skills/progress',{
        method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({action:'skill',skillId:id,level,evidence:cleaned}),
      });
      if(!res.ok)throw Error('Save failed');
      const data=await res.json();
      if(owner.current!==account||data.userId!==account||data.skillId!==id)return;
      setProgress(old=>({...old,[id]:data.progress||next}));
      setDrafts(old=>({...old,[id]:cleaned}));
    }catch{
      if(owner.current===account)setNotice('Cloud save failed. Your previous level is unchanged; please retry.');
    }finally{
      if(owner.current===account)setPending(old=>old.filter(key=>key!==id));
    }
  };

  const chooseRole=async(next:string)=>{
    if(!SKILL_ROLES.some(r=>r.id===next)||!canEdit||pending.includes('role'))return;
    if(!userId){
      setRoleId(next);setRoleOnly(next!=='all');
      try{localStorage.setItem(GUEST_ROLE,next);}catch{}
      return;
    }
    const account=userId;
    setPending(old=>[...old,'role']);setNotice('');
    try{
      const res=await fetch('/api/skills/progress',{
        method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({action:'role',roleId:next}),
      });
      if(!res.ok)throw Error('Save failed');
      const data=await res.json();
      if(owner.current===account&&data.userId===account){setRoleId(next);setRoleOnly(next!=='all');}
    }catch{if(owner.current===account)setNotice('Could not save career focus. Please retry.');}
    finally{if(owner.current===account)setPending(old=>old.filter(key=>key!=='role'));}
  };

  const importOld=async()=>{
    if(!userId||sync!=='cloud'||importing||!legacy.length)return;
    const account=userId;
    setImporting(true);setNotice('');
    try{
      const old=[...new Set([...legacy,...Object.entries(guestState(allowed)).filter(([id,p])=>allowed.has(id)&&p.level===3).map(([id])=>id)])];
      const res=await fetch('/api/skills/progress',{method:'PUT',credentials:'same-origin',
        headers:{'Content-Type':'application/json'},body:JSON.stringify({completedIds:old})});
      if(!res.ok)throw Error('Import failed');
      const data=await res.json();
      if(owner.current!==account||data.userId!==account)return;
      setProgress(data.progress||{});
      setDrafts(Object.fromEntries(Object.entries(data.progress||{}).map(([id,row])=>[id,(row as SkillProgress).evidence])));
      setLegacy([]);
      try{localStorage.removeItem(LEGACY);localStorage.removeItem(GUEST_KEY);}catch{}
    }catch{if(owner.current===account)setNotice('Import failed. Your browser progress was not deleted.');}
    finally{if(owner.current===account)setImporting(false);}
  };

  const role=SKILL_ROLES.find(r=>r.id===roleId)||SKILL_ROLES[0];
  const roleSkills=useMemo(()=>getRoleSkills(skills,roleId),[skills,roleId]);
  const overview=useMemo(()=>skillSummary(skills,progress),[skills,progress]);
  const focused=useMemo(()=>skillSummary(roleSkills,progress),[roleSkills,progress]);
  const gaps=useMemo(()=>roleGaps(roleSkills,progress,5),[roleSkills,progress]);
  const categories=useMemo(()=>SKILL_CATEGORIES.map(cat=>({
    category:cat,...skillSummary(skills.filter(s=>s.category===cat),progress),
  })),[skills,progress]);
  const filtered=useMemo(()=>{
    const selected=new Set(roleSkills.map(s=>s.id));
    const q=query.trim().toLowerCase();
    return skills.filter(s=>
      (!roleOnly||selected.has(s.id))&&
      (category==='all'||s.category===category)&&
      (levelFilter==='all'||String(normalizeLevel(progress[s.id]?.level))===levelFilter)&&
      (!q||(s.title+' '+s.category+' '+s.beginnerExplanation+' '+s.whatGoodLooksLike.join(' ')).toLowerCase().includes(q))
    ).sort((a,b)=>{
      const first=selected.has(a.id)?0:1,second=selected.has(b.id)?0:1;
      const priority=(level:number)=>level===2?0:level===1?1:level===0?2:3;
      return first-second||priority(normalizeLevel(progress[a.id]?.level))-
        priority(normalizeLevel(progress[b.id]?.level))||a.title.localeCompare(b.title);
    });
  },[skills,roleSkills,roleOnly,category,levelFilter,query,progress]);

  const exportCsv=()=>{
    const escape=(s:string)=>'"'+s.replace(/"/g,'""')+'"';
    const data=['Skill,Category,Level,Evidence,Updated',
      ...skills.map(s=>{
        const p=progress[s.id]||blank;
        return [s.title,s.category,SKILL_LEVELS[normalizeLevel(p.level)].label,p.evidence,p.updatedAt].map(escape).join(',');
      })].join('\r\n');
    const url=URL.createObjectURL(new Blob(['\uFEFF'+data],{type:'text/csv;charset=utf-8'}));
    const a=document.createElement('a');a.href=url;a.download='cybertube-skills.csv';a.click();
    URL.revokeObjectURL(url);
  };

  return <div className="space-y-8">
    <section aria-label="Your skills dashboard" className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Your practical skills dashboard</h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">Track what you are learning, have practiced, and can demonstrate independently.</p>
        </div>
        <button type="button" onClick={exportCsv} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--card-bg)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--accent-cyan)]">
          <Download className="h-4 w-4"/> Export progress CSV
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2 text-xs" role="status" aria-live="polite">
        {sync==='cloud'?<span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 font-semibold text-emerald-600 dark:text-emerald-400"><Cloud className="h-4 w-4"/> Saved to CyberTube account</span>:
         sync==='guest'?<span className="rounded-full border border-[var(--border)] px-3 py-1.5 text-[var(--text-secondary)]">Guest mode · saved on this device</span>:
         <span className="rounded-full border border-[var(--border)] px-3 py-1.5 text-[var(--text-secondary)]">{sync==='error'?'Cloud unavailable':'Loading progress…'}</span>}
        {!userId&&!isAuthLoading&&<Link href="/login?redirect=/skills" className="font-semibold text-[var(--accent-cyan)] hover:underline">Sign in for cross-device sync</Link>}
        {sync==='error'&&<button type="button" onClick={()=>setReload(n=>n+1)} className="inline-flex gap-1 font-semibold text-[var(--accent-cyan)]"><RotateCcw className="h-4 w-4"/> Retry</button>}
      </div>
      {notice&&<p role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-3 text-xs text-rose-700 dark:text-rose-300">{notice}</p>}
      {Boolean(userId&&legacy.length&&sync==='cloud')&&<div className={surface+' flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between'}>
        <p className="text-sm text-[var(--text-secondary)]">Found {legacy.length} previously completed browser skills. Import them without overwriting cloud progress.</p>
        <button type="button" disabled={importing} onClick={()=>void importOld()}
          className="rounded-xl bg-[var(--accent-cyan)] px-4 py-2 text-sm font-bold text-[#07131A] disabled:opacity-40">{importing?'Importing…':'Import old progress'}</button>
      </div>}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          {label:'Skills explored',value:overview.reviewed+'/'+overview.total,sub:'Learning or beyond',Icon:BookOpen},
          {label:'Hands-on practiced',value:String(overview.practiced+overview.confident),sub:'Practiced or confident',Icon:ShieldCheck},
          {label:'Confident',value:String(overview.confident),sub:'Self-reported ability',Icon:CheckCircle2},
          {label:'Skill coverage',value:overview.coverage+'%',sub:'Weighted assessment',Icon:Target},
        ].map(metric=><div key={metric.label} className={surface+' p-4 sm:p-5'}>
          <div className="flex justify-between gap-2 text-xs text-[var(--text-secondary)]">{metric.label}<metric.Icon className="h-4 w-4 text-[var(--accent-cyan)]"/></div>
          <p className="mt-3 text-2xl font-extrabold tabular-nums text-[var(--text-primary)]">{metric.value}</p>
          <p className="mt-1 text-[11px] text-[var(--text-muted)]">{metric.sub}</p>
        </div>)}
      </div>
      <div className={surface+' p-5'}>
        <div className="flex items-center justify-between gap-3">
          <div><h3 className="font-bold text-[var(--text-primary)]">Overall competency coverage</h3>
            <p className="text-xs text-[var(--text-secondary)]">Learning = 33% · Practiced = 67% · Confident = 100% per skill</p></div>
          <span className="font-bold text-[var(--accent-cyan)]">{overview.coverage}%</span>
        </div>
        <div role="progressbar" aria-label="Overall self-assessed coverage" aria-valuemin={0} aria-valuemax={100} aria-valuenow={overview.coverage}
          className="mt-3 h-2.5 overflow-hidden rounded-full bg-[var(--surface-subtle)]">
          <div className="h-full rounded-full bg-[var(--accent-cyan)] transition-all" style={{width:overview.coverage+'%'}}/>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(cat=><div key={cat.category}>
            <div className="flex justify-between gap-2 text-xs text-[var(--text-secondary)]"><span>{cat.category}</span><span className="font-bold text-[var(--text-primary)]">{cat.coverage}%</span></div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[var(--surface-subtle)]">
              <div className="h-full rounded-full bg-[var(--accent-cyan)]" style={{width:cat.coverage+'%'}}/>
            </div>
            <p className="mt-1 text-[11px] text-[var(--text-muted)]">{cat.confident}/{cat.total} confident</p>
          </div>)}
        </div>
      </div>
    </section>

    <section aria-labelledby="role-skills-heading" className={surface+' space-y-5 p-5 sm:p-6'}>
      <div>
        <h2 id="role-skills-heading" className="text-xl font-bold text-[var(--text-primary)]">Career focus & skill gap analysis</h2>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">Choose the work you want to do. The map highlights important competencies without claiming you are job-ready.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label htmlFor="role-choice" className="text-xs font-semibold text-[var(--text-secondary)]">Target cybersecurity role</label>
          <select id="role-choice" value={roleId} disabled={!canEdit||pending.includes('role')}
            onChange={e=>void chooseRole(e.target.value)} className={field+' mt-2'}>
            {SKILL_ROLES.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          <p className="mt-2 text-xs text-[var(--text-secondary)]">{role.description}</p>
          <label className="mt-4 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <input type="checkbox" checked={roleOnly} onChange={e=>setRoleOnly(e.target.checked)}
              className="h-4 w-4 accent-cyan-600"/> Show only career-relevant skills
          </label>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-4">
          <div className="flex justify-between gap-3">
            <p className="text-sm font-semibold text-[var(--text-primary)]">{role.name} · coverage</p>
            <span className="text-xl font-bold text-[var(--accent-cyan)]">{focused.coverage}%</span>
          </div>
          <div role="progressbar" aria-label="Target role skills coverage" aria-valuenow={focused.coverage} aria-valuemin={0} aria-valuemax={100}
            className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--card-bg)]">
            <div className="h-full bg-[var(--accent-cyan)]" style={{width:focused.coverage+'%'}}/>
          </div>
          <p className="mt-2 text-xs text-[var(--text-secondary)]">
            {focused.confident} confident · {focused.practiced} practiced · {focused.learning} learning · {focused.total} skills
          </p>
          <p className="mt-2 text-[11px] text-[var(--text-muted)]">Self-assessment only; not a verified professional score.</p>
        </div>
      </div>
      <div className="border-t border-[var(--border)] pt-4">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]"><Sparkles className="h-4 w-4 text-[var(--accent-cyan)]"/> Your next five steps</h3>
        {gaps.length===0?<p className="text-sm text-[var(--text-secondary)]">All selected skills are marked confident. Consider documenting a project and rechecking your evidence.</p>:
        <div className="grid gap-2 md:grid-cols-2">
          {gaps.map((skill,index)=><button key={skill.id} type="button"
            onClick={()=>{
              setRoleOnly(false);setCategory('all');setLevelFilter('all');setQuery('');
              setExpanded(old=>old.includes(skill.id)?old:[...old,skill.id]);
              window.setTimeout(()=>document.getElementById('skill-'+skill.id)?.scrollIntoView({behavior:'smooth',block:'center'}),60);
            }}
            className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] p-3 text-left hover:border-[var(--accent-cyan)]">
            <span className="rounded-lg bg-[var(--accent-cyan-subtle)] px-2.5 py-1.5 text-xs font-bold text-[var(--accent-cyan)]">{index+1}</span>
            <span className="flex-1"><span className="block text-xs font-semibold text-[var(--text-primary)]">{skill.title}</span>
              <span className="text-[11px] text-[var(--text-muted)]">{SKILL_LEVELS[normalizeLevel(progress[skill.id]?.level)].label}</span>
            </span>
          </button>)}
        </div>}
      </div>
      <div className="flex flex-wrap gap-4 border-t border-[var(--border)] pt-4 text-sm font-semibold text-[var(--accent-cyan)]">
        <Link href="/courses" className="hover:underline">Courses</Link>
        <Link href="/labs" className="hover:underline">Practical Labs</Link>
        <Link href="/learning-paths" className="hover:underline">Learning Paths</Link>
      </div>
    </section>

    <section aria-labelledby="skills-directory" className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h2 id="skills-directory" className="text-2xl font-bold text-[var(--text-primary)]">Explore the skills</h2>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">Showing {filtered.length} of {skills.length} · Set proficiency, open checklists and save practice evidence.</p></div>
        <button type="button" onClick={()=>{setCategory('all');setQuery('');setLevelFilter('all');setRoleOnly(false);}}
          className="flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-cyan)] hover:underline">
          <RotateCcw className="h-4 w-4"/> Reset filters
        </button>
      </div>
      <div className={surface+' space-y-3 p-4'}>
        <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
          <label><span className="sr-only">Search skills</span>
            <input value={query} onChange={e=>setQuery(e.target.value)} type="search" placeholder="Search a skill, tool or topic…" className={field}/>
          </label>
          <label><span className="sr-only">Filter proficiency</span>
            <select value={levelFilter} onChange={e=>setLevelFilter(e.target.value)} className={field}>
              <option value="all">All skill levels</option>
              {SKILL_LEVELS.map(level=><option value={level.value} key={level.value}>{level.label}</option>)}
            </select>
          </label>
        </div>
        <div role="group" aria-label="Skill category" className="flex flex-wrap gap-2">
          {['all',...SKILL_CATEGORIES].map(cat=><button key={cat} type="button"
            aria-pressed={cat===category} onClick={()=>setCategory(cat)}
            className={'rounded-lg border px-3 py-2 text-xs font-semibold transition-colors '+(cat===category
              ?'border-[var(--accent-cyan)] bg-[var(--accent-cyan)] text-[#08131B]'
              :'border-[var(--border)] bg-[var(--surface-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent-cyan)]')}>
              {cat==='all'?'All categories':cat}
            </button>)}
        </div>
      </div>
      {filtered.length===0?<div className={surface+' p-10 text-center'}>
        <p className="font-semibold text-[var(--text-primary)]">No matching skills</p>
        <p className="text-xs text-[var(--text-secondary)]">Clear your filters or try another keyword.</p>
      </div>:
      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map(skill=>{
          const item=progress[skill.id]||blank;
          const level=normalizeLevel(item.level);
          const open=expanded.includes(skill.id);
          const busy=pending.includes(skill.id);
          const note=drafts[skill.id]??item.evidence;
          const linked=resources.filter(r=>skill.linkedResourceIds.includes(r.id)&&r.verificationStatus!=='inactive').slice(0,3);
          return <article key={skill.id} id={'skill-'+skill.id} className={surface+' scroll-mt-28 overflow-hidden'}>
            <div className="space-y-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="rounded-lg bg-[var(--surface-subtle)] px-2 py-1 text-[11px] font-medium text-[var(--text-secondary)]">{skill.category}</span>
                  <h3 className="mt-3 text-lg font-bold leading-snug text-[var(--text-primary)]">{skill.title}</h3>
                </div>
                {level===3&&<CheckCircle2 className="h-6 w-6 shrink-0 text-[var(--accent-emerald)]"/>}
              </div>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{skill.beginnerExplanation}</p>
              <label htmlFor={'level-'+skill.id} className="block text-xs font-semibold text-[var(--text-primary)]">My current ability</label>
              <select id={'level-'+skill.id} value={level} disabled={!canEdit||busy}
                onChange={e=>void saveSkill(skill.id,normalizeLevel(Number(e.target.value)),drafts[skill.id]??item.evidence)}
                className={field}>
                {SKILL_LEVELS.map(row=><option key={row.value} value={row.value}>{row.label} — {row.description}</option>)}
              </select>
              <p className="text-[11px] text-[var(--text-muted)]">{busy?'Saving…':SKILL_LEVELS[level].description}</p>
              <button type="button" aria-expanded={open} aria-controls={'skill-details-'+skill.id}
                onClick={()=>setExpanded(old=>open?old.filter(id=>id!==skill.id):[...old,skill.id])}
                className="flex w-full items-center justify-between gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-3 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--accent-cyan)]">
                {open?'Hide checklist and learning resources':'Competency checklist & learning resources'}
                <ChevronDown className={'h-4 w-4 transition-transform '+(open?'rotate-180':'')}/>
              </button>
            </div>
            {open&&<div id={'skill-details-'+skill.id} className="space-y-5 border-t border-[var(--border)] bg-[var(--surface-subtle)] p-5">
              <div>
                <h4 className="text-xs font-bold uppercase text-[var(--text-primary)]">What good looks like</h4>
                <ul className="mt-2 space-y-2">
                  {skill.whatGoodLooksLike.map((point,index)=><li key={index} className="flex items-start gap-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-cyan)]"/>{point}
                  </li>)}
                </ul>
              </div>
              <div>
                <label htmlFor={'evidence-'+skill.id} className="text-xs font-semibold text-[var(--text-primary)]">Practice evidence (optional)</label>
                <textarea id={'evidence-'+skill.id} rows={3} maxLength={400} disabled={!canEdit||busy}
                  value={note} onChange={e=>setDrafts(old=>({...old,[skill.id]:e.target.value}))}
                  placeholder="E.g. analyzed a sample PCAP and documented DNS findings in a legal lab."
                  className={field+' mt-2 resize-y'}/>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-[var(--text-muted)]">{note.length}/400 · No secrets or private evidence</span>
                  <button type="button" disabled={!canEdit||busy||note.trim()===item.evidence}
                    onClick={()=>void saveSkill(skill.id,level,note)}
                    className="rounded-lg bg-[var(--accent-cyan)] px-4 py-2 text-xs font-bold text-[#08131B] disabled:opacity-40">
                    Save note
                  </button>
                </div>
              </div>
              {linked.length>0&&<div>
                <h4 className="mb-2 text-xs font-bold uppercase text-[var(--text-primary)]">Suggested study resources</h4>
                <div className="space-y-2">
                  {linked.map(resource=><a key={resource.id} href={resource.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-3 hover:border-[var(--accent-cyan)]">
                    <span><span className="block text-xs font-semibold text-[var(--text-primary)]">{resource.title}</span>
                      <span className="text-[11px] text-[var(--text-secondary)]">{resource.creator} · {resource.type}</span>
                    </span>
                    <ExternalLink className="h-4 w-4 shrink-0 text-[var(--accent-cyan)]"/>
                  </a>)}
                </div>
              </div>}
              <p className="text-[11px] text-[var(--text-muted)]">Only practice on systems you own or are explicitly authorized to assess.</p>
            </div>}
          </article>;
        })}
      </div>}
    </section>
    <p className="text-center text-xs text-[var(--text-muted)]">Self-reported progress is a study aid, not a certification, verified job-readiness assessment, or hiring guarantee.</p>
  </div>;
}
