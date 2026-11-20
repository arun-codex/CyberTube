'use client';

import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowRight, BookOpen, BriefcaseBusiness, Check, ChevronDown, Clock3,
  Compass, ExternalLink, FileText, Filter, GraduationCap, History,
  Loader2, Play, Search, ShieldCheck, Sparkles, TrendingUp, Video, X,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { getAllResources, filterResources, getFacetCounts } from '@/lib/catalog';
import { FilterSidebar } from '@/components/FilterSidebar';
import { ResourceCard } from '@/components/ResourceCard';
import InterestSelector from '@/components/discovery/InterestSelector';
import { DiscoverVideoPlayer, type PlayingVideo, type VideoWatchProgress } from '@/components/discovery/DiscoverVideoPlayer';
import type { ResourceFilterOptions } from '@/types/resource';

type FeedItem = {
  id:string;title:string;description?:string;url:string;thumbnail_url?:string;
  published_at?:string;category_slug?:string;category_name?:string;
  source_name?:string;content_type:'video'|'article';
  video_id?:string;source_mode?:'live'|'course'|'resource';
};
type FeedData = {
  items:FeedItem[];total:number;page:number;pageSize:number;
  hasMore:boolean;personalized:boolean;liveSources:number;liveItemCount:number;
  progress:Record<string,{percent:number;updatedAt:string}>;
};
type HistoryData = {items:VideoWatchProgress[];userId:string;count:number};
type Tab = 'for-you'|'latest'|'videos'|'news'|'tech-updates'|'career'|'growth'|'history'|'catalog';
const tabs: Array<{id:Tab;title:string;icon:React.ComponentType<{className?:string}>}> = [
  {id:'for-you',title:'For You',icon:Sparkles},
  {id:'latest',title:'Latest',icon:Clock3},
  {id:'videos',title:'Videos',icon:Video},
  {id:'news',title:'Cyber News',icon:ShieldCheck},
  {id:'tech-updates',title:'Tech & AI',icon:TrendingUp},
  {id:'career',title:'Careers & Internships',icon:BriefcaseBusiness},
  {id:'growth',title:'Growth & Communication',icon:GraduationCap},
  {id:'history',title:'Watch History',icon:History},
  {id:'catalog',title:'Resource Directory',icon:BookOpen},
];
const categories = [
  {id:'',label:'All topics'},
  {id:'cybersecurity',label:'Cybersecurity'},
  {id:'technology',label:'AI & Technology'},
  {id:'career',label:'Career & Jobs'},
  {id:'growth',label:'Communication'},
  {id:'networking',label:'Networking'},
  {id:'cloud',label:'Cloud / DevOps'},
  {id:'research',label:'Research'},
];
const emptyFilters:ResourceFilterOptions = {
  query:'',types:[],domains:[],difficulty:[],pricing:[],durationRanges:[],sortBy:'relevance',
};
function validTab(value:string|null):Tab{
  return (tabs.find(t=>t.id===value)?.id||(value==='popular'?'for-you':value==='security-alerts'?'news':value==='research'?'tech-updates':value==='open-source'?'tech-updates':'for-you')) as Tab;
}
function labelDate(item:FeedItem){
  if(!item.published_at||!Number.isFinite(Date.parse(item.published_at))){
    return item.source_mode==='course'?'From courses':'Reference resource';
  }
  return new Date(item.published_at).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'});
}
function FeedCard({item,progress,onPlay}:{
  item:FeedItem; progress?:VideoWatchProgress; onPlay:(item:FeedItem)=>void;
}){
  const isVideo=item.content_type==='video'&&Boolean(item.video_id);
  const percent=progress?.progress_percent||0;
  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] flex flex-col hover:border-[var(--accent-cyan)]/60 hover:shadow-md transition-all group">
      {isVideo ? (
        <button type="button" onClick={()=>onPlay(item)}
          aria-label={'Play '+item.title}
          className="relative text-left aspect-video w-full overflow-hidden bg-[#0b1018]">
          <img src={item.thumbnail_url||'https://i.ytimg.com/vi/'+item.video_id+'/hqdefault.jpg'}
            alt="" loading="lazy"
            className="w-full h-full object-cover opacity-90 group-hover:scale-[1.025] transition-transform duration-200"
            referrerPolicy="no-referrer" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-12 h-12 rounded-full flex items-center justify-center bg-[#111827]/80 border border-white/50 text-white shadow-lg group-hover:bg-[#0E7490]">
              <Play className="w-5 h-5 fill-current ml-0.5"/>
            </span>
          </span>
          <span className="absolute top-2 left-2 bg-[#0b1018]/85 text-white text-[10px] font-semibold rounded-md px-2 py-1">
            YouTube
          </span>
          {percent>0&&<span className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/60">
            <span className="block h-full bg-[#22D3EE]" style={{width:percent+'%'}}/>
          </span>}
        </button>
      ):(
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--surface-subtle)]">
          <span className="inline-flex gap-1.5 items-center text-xs text-[var(--accent-cyan)]"><FileText className="w-4 h-4"/> Article / Resource</span>
          <span className="text-[11px] text-[var(--text-muted)]">{labelDate(item)}</span>
        </div>
      )}
      <div className="flex-1 p-4 sm:p-5 space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--text-muted)]">
          <span className="font-medium text-[var(--accent-cyan)]">{item.category_name||'Learning'}</span>
          <span aria-hidden="true">·</span>
          <span>{labelDate(item)}</span>
        </div>
        <h3 className="font-semibold leading-snug text-[var(--text-primary)] line-clamp-2">
          {isVideo?(
            <button type="button" onClick={()=>onPlay(item)} className="text-left hover:text-[var(--accent-cyan)]">
              {item.title}
            </button>
          ):(
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-cyan)] hover:underline">{item.title}</a>
          )}
        </h3>
        {item.description&&<p className="text-xs leading-relaxed text-[var(--text-secondary)] line-clamp-3">{item.description}</p>}
      </div>
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-t border-[var(--border)] text-xs text-[var(--text-secondary)]">
        <span className="truncate">{item.source_name||'Source'}</span>
        {isVideo?(
          <button type="button" onClick={()=>onPlay(item)} className="shrink-0 inline-flex gap-1.5 items-center font-semibold text-[var(--accent-cyan)]">
            {percent>0&&!progress?.is_completed?'Resume':progress?.is_completed?'Watch again':'Play'} <ArrowRight className="w-4 h-4"/>
          </button>
        ):(
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="shrink-0 inline-flex gap-1 items-center text-[var(--accent-cyan)] font-semibold">
            Open source <ExternalLink className="w-3.5 h-3.5"/>
          </a>
        )}
      </div>
      {isVideo&&percent>0&&<div className="px-4 sm:px-5 pb-3 text-[11px] text-[var(--text-muted)]">
        {progress?.is_completed?'Watched':'Watched '+percent+'%'}
      </div>}
    </article>
  );
}
function DiscoverContent() {
  const searchParams=useSearchParams();
  const router=useRouter();
  const {userId,isAuthLoading}=useAuth();
  const activeTab=validTab(searchParams.get('tab'));
  const selectedCategory=searchParams.get('category')||'';
  const initialQuery=searchParams.get('q')||'';
  const [query,setQuery]=useState(initialQuery);
  const [debouncedQuery,setDebouncedQuery]=useState(initialQuery);
  const [items,setItems]=useState<FeedItem[]>([]);
  const [feedData,setFeedData]=useState<FeedData|null>(null);
  const [history,setHistory]=useState<VideoWatchProgress[]>([]);
  const [historyError,setHistoryError]=useState('');
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  const [page,setPage]=useState(1);
  const [loadMore,setLoadMore]=useState(false);
  const [preferencesVersion,setPreferencesVersion]=useState(0);
  const [selectedVideo,setSelectedVideo]=useState<PlayingVideo|null>(null);
  const [mobileFilters,setMobileFilters]=useState(false);
  const [catalogFilters,setCatalogFilters]=useState<ResourceFilterOptions>(emptyFilters);
  const playRef=useRef<HTMLDivElement|null>(null);
  const onInterestsChange=useCallback(()=>setPreferencesVersion(version=>version+1),[]);
  const catalog=useMemo(()=>getAllResources(),[]);
  const catalogMatches=useMemo(()=>filterResources(catalog,catalogFilters),[catalog,catalogFilters]);
  const facets=useMemo(()=>getFacetCounts(catalog),[catalog]);

  useEffect(()=>{setQuery(initialQuery);setDebouncedQuery(initialQuery);},[initialQuery]);
  useEffect(()=>{
    const timer=window.setTimeout(()=>setDebouncedQuery(query.trim()),350);
    return ()=>window.clearTimeout(timer);
  },[query]);
  useEffect(()=>{setPage(1);setItems([]);},[activeTab,selectedCategory,debouncedQuery,preferencesVersion,userId]);

  const refreshHistory=useCallback(async(signal?:AbortSignal)=>{
    if(!userId){setHistory([]);setHistoryError('');return;}
    try{
      const response=await fetch('/api/discover/history',{signal,cache:'no-store',credentials:'same-origin'});
      if(!response.ok)throw Error('Watch history could not be loaded');
      const data:HistoryData=await response.json();
      if(signal?.aborted)return;
      if(data.userId===userId){setHistory(data.items||[]);setHistoryError('');}
    }catch{
      if(!signal?.aborted)setHistoryError('Watch history is temporarily unavailable.');
    }
  },[userId]);
  useEffect(()=>{
    if(isAuthLoading)return;
    const controller=new AbortController();
    void refreshHistory(controller.signal);
    return ()=>controller.abort();
  },[refreshHistory,isAuthLoading]);

  useEffect(()=>{
    if(activeTab==='catalog'||activeTab==='history')return;
    const controller=new AbortController();
    const currentPage=page;
    if(currentPage===1){setLoading(true);setError('');}
    else setLoadMore(true);
    const params=new URLSearchParams({
      tab:activeTab,page:String(page),pageSize:'24',
    });
    if(selectedCategory)params.set('category',selectedCategory);
    if(debouncedQuery.length>=2)params.set('q',debouncedQuery);
    fetch('/api/discover/feed?'+params.toString(),{
      signal:controller.signal,credentials:'same-origin',cache:'no-store',
    })
      .then(res=>{if(!res.ok)throw Error('Discover is currently unavailable.');return res.json() as Promise<FeedData>;})
      .then(result=>{
        if(controller.signal.aborted)return;
        setItems(previous=>currentPage===1?result.items:[
          ...previous,...result.items.filter(item=>!previous.some(old=>old.id===item.id)),
        ]);
        setFeedData(result);
        setError('');
      })
      .catch(e=>{if(!controller.signal.aborted)setError(e instanceof Error?e.message:'Could not load feed');})
      .finally(()=>{if(!controller.signal.aborted){setLoading(false);setLoadMore(false);}});
    return ()=>controller.abort();
  },[activeTab,selectedCategory,debouncedQuery,preferencesVersion,userId,page]);

  useEffect(()=>{
    const id=searchParams.get('video');
    if(!id||!/^[A-Za-z0-9_-]{11}$/.test(id))return;
    const feedMatch=items.find(item=>item.video_id===id);
    const historyMatch=history.find(item=>item.video_id===id);
    if(feedMatch){
      setSelectedVideo({
        video_id:id,title:feedMatch.title,
        source_name:feedMatch.source_name||'YouTube',
        category_slug:feedMatch.category_slug||'cybersecurity',
      });
    }else if(historyMatch){
      setSelectedVideo({
        video_id:id,title:historyMatch.title,
        source_name:historyMatch.channel_name,
        category_slug:historyMatch.category,
      });
    }
  },[searchParams,items,history]);

  function navigate(nextTab:Tab,category=selectedCategory) {
    const params=new URLSearchParams(searchParams.toString());
    params.set('tab',nextTab);
    if(category)params.set('category',category);else params.delete('category');
    params.delete('video');
    if(query.trim())params.set('q',query.trim());else params.delete('q');
    router.replace('/discover?'+params.toString(),{scroll:false});
    setPage(1);
  }
  function chooseCategory(category:string){
    navigate(activeTab,selectedCategory===category?'':category);
  }
  function playVideo(item:FeedItem|VideoWatchProgress){
    const isHistory='video_id' in item&&!('content_type' in item);
    const id=item.video_id;
    if(!id)return;
    const meta:PlayingVideo=isHistory?{
      video_id:id,title:item.title,source_name:(item as VideoWatchProgress).channel_name,
      category_slug:(item as VideoWatchProgress).category,
    }:{
      video_id:id,title:item.title,source_name:(item as FeedItem).source_name||'YouTube',
      category_slug:(item as FeedItem).category_slug||'cybersecurity',
    };
    setSelectedVideo(meta);
    const params=new URLSearchParams(searchParams.toString());
    params.set('video',id);
    router.replace('/discover?'+params.toString(),{scroll:false});
    window.requestAnimationFrame(()=>playRef.current?.scrollIntoView({behavior:'smooth',block:'start'}));
  }
  function onWatchSaved(row:VideoWatchProgress){
    setHistory(previous=>[
      {...row,origin:'discover'},...previous.filter(old=>old.video_id!==row.video_id)
    ].sort((a,b)=>Date.parse(b.last_watched_at)-Date.parse(a.last_watched_at)));
  }
  async function forgetVideo(videoId:string){
    if(!window.confirm('Remove this video from your Discover watch history?'))return;
    const response=await fetch('/api/discover/history',{
      method:'DELETE',headers:{'Content-Type':'application/json'},
      credentials:'same-origin',body:JSON.stringify({videoId}),
    });
    if(response.ok){
      setHistory(previous=>previous.filter(row=>row.video_id!==videoId));
      if(selectedVideo?.video_id===videoId)setSelectedVideo(null);
    }else setHistoryError('Could not remove the video. Please retry.');
  }
  const progressById=useMemo(()=>new Map(history.map(row=>[row.video_id,row])),[history]);
  const playerSaved=selectedVideo?progressById.get(selectedVideo.video_id):undefined;
  return (
    <div className="container-max py-7 sm:py-10 space-y-7">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 sm:p-7 space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--accent-cyan)]">
              <Compass className="w-4 h-4"/> CyberTube Discovery
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">Discover what moves you forward</h1>
            <p className="max-w-3xl text-sm leading-relaxed text-[var(--text-secondary)]">
              Cybersecurity videos, fresh security news, AI and technology, interview skills, internships, communication and career growth — in one personalized feed.
            </p>
          </div>
          {userId?(
            <span className="text-xs inline-flex items-center gap-1.5 text-[var(--accent-emerald)] rounded-full border border-[var(--border)] px-3 py-2">
              <Check className="w-4 h-4"/> Cloud watch history enabled
            </span>
          ):(
            <Link href="/login?redirect=/discover" className="text-xs font-semibold text-[var(--accent-cyan)] underline">
              Sign in for your personal feed
            </Link>
          )}
        </div>
        <form role="search" onSubmit={e=>{e.preventDefault();navigate(activeTab);}} className="relative">
          <label htmlFor="discover-search" className="sr-only">Search articles and videos</label>
          <Search className="absolute left-3 top-3.5 w-4 h-4 text-[var(--text-muted)]"/>
          <input id="discover-search" type="search" value={query} onChange={e=>setQuery(e.target.value)}
            placeholder="Try SOC jobs, Linux, interview tips, AI tools, internships..."
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] pl-10 pr-24 py-3 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)]"/>
          <button type="submit" className="absolute right-1.5 top-1.5 px-4 py-2 rounded-lg bg-[var(--accent-cyan)] text-[#090D14] text-xs font-semibold">Search</button>
        </form>
        <nav aria-label="Discover content sections" className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map(tab=>{
            const Icon=tab.icon;
            return <button key={tab.id} type="button" aria-pressed={activeTab===tab.id}
              onClick={()=>navigate(tab.id,'')}
              className={'inline-flex items-center gap-2 px-3.5 py-2.5 shrink-0 whitespace-nowrap text-xs font-semibold rounded-lg border transition-colors '+
                (activeTab===tab.id
                  ?'bg-[var(--accent-cyan)] text-[#090D14] border-[var(--accent-cyan)]'
                  :'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent-cyan)]')}>
              <Icon className="w-4 h-4"/>{tab.title}
            </button>;
          })}
        </nav>
      </div>
      {activeTab!=='catalog'&&activeTab!=='history'&&(
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter feed by interest">
            {categories.map(cat=>(
              <button key={cat.id} type="button" aria-pressed={selectedCategory===cat.id}
                onClick={()=>chooseCategory(cat.id)}
                className={'rounded-full border px-3 py-2 text-xs transition-colors '+
                  (selectedCategory===cat.id
                    ?'bg-[var(--accent-cyan-subtle)] text-[var(--accent-cyan)] border-[var(--accent-cyan)]'
                    :'text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--accent-cyan)]')}>
                {cat.label}
              </button>
            ))}
          </div>
          <details className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)]">
            <summary className="cursor-pointer select-none px-4 py-3 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]">
              <span className="inline-flex gap-2 items-center"><Filter className="w-4 h-4"/> Customize interests for better recommendations <ChevronDown className="w-4 h-4"/></span>
            </summary>
            <div className="px-4 pb-4">
              <InterestSelector onInterestsChange={onInterestsChange}/>
            </div>
          </details>
        </div>
      )}
      {selectedVideo&&activeTab!=='catalog'&&(
        <div ref={playRef} className="scroll-mt-24 space-y-2">
          <div className="flex justify-end">
            <button type="button" onClick={()=>{
              setSelectedVideo(null);
              const params=new URLSearchParams(searchParams.toString());
              params.delete('video');
              router.replace('/discover?'+params.toString(),{scroll:false});
            }} className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]">
              <X className="w-4 h-4"/> Close player
            </button>
          </div>
          <DiscoverVideoPlayer key={selectedVideo.video_id}
            video={selectedVideo} saved={playerSaved} signedIn={Boolean(userId)}
            onSaved={onWatchSaved}/>
        </div>
      )}
      {activeTab==='history' ? (
        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Your watch history</h2>
              <p className="text-sm text-[var(--text-secondary)]">Synced to your CyberTube account, including recorded course video activity.</p>
            </div>
            <Link href="/profile" className="inline-flex gap-2 items-center text-sm text-[var(--accent-cyan)] hover:underline">
              View in profile <ArrowRight className="w-4 h-4"/>
            </Link>
          </div>
          {isAuthLoading? <div className="py-16 text-center text-sm text-[var(--text-secondary)]">Loading your account…</div>
            :!userId? <div className="p-8 rounded-xl border border-[var(--border)] text-sm text-[var(--text-secondary)]">
              Sign in to see your cloud-based watch history. <Link href="/login?redirect=/discover?tab=history" className="text-[var(--accent-cyan)] underline">Sign in</Link>
            </div>
            :historyError?<p role="alert" className="text-sm text-amber-600">{historyError}</p>
            :history.length===0?<div className="p-12 rounded-xl border border-[var(--border)] text-center">
              <History className="w-8 h-8 mx-auto text-[var(--text-muted)] mb-3"/>
              <p className="text-[var(--text-primary)] font-semibold">No watched videos yet</p>
              <p className="text-sm text-[var(--text-secondary)]">Play a video in Discover to start your history.</p>
            </div>
            :<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {history.map(row=><article key={row.video_id} className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] overflow-hidden">
                <button type="button" className="w-full aspect-video relative bg-[#0B1018]" onClick={()=>playVideo(row)}>
                  <img src={'https://i.ytimg.com/vi/'+row.video_id+'/hqdefault.jpg'} loading="lazy" alt="" className="h-full w-full object-cover"/>
                  <span className="absolute bottom-0 left-0 w-full h-1.5 bg-black/70"><span className="block h-full bg-[var(--accent-cyan)]" style={{width:row.progress_percent+'%'}}/></span>
                </button>
                <div className="p-4 space-y-3">
                  <h3 className="text-sm font-semibold line-clamp-2 text-[var(--text-primary)]">{row.title}</h3>
                  <div className="text-xs text-[var(--text-secondary)]">
                    {row.is_completed?'Watched':row.progress_percent+'% watched'} · {row.channel_name}
                  </div>
                  <div className="flex justify-between gap-2">
                    <button type="button" onClick={()=>playVideo(row)} className="text-xs font-semibold text-[var(--accent-cyan)]">
                      {row.is_completed?'Watch again':'Continue watching'}
                    </button>
                    {row.origin!=='course'&&<button type="button" onClick={()=>void forgetVideo(row.video_id)} className="text-xs text-[var(--text-muted)] hover:text-red-500">Remove</button>}
                  </div>
                </div>
              </article>)}
            </div>}
        </section>
      ) : activeTab==='catalog' ? (
        <div className="space-y-4">
          <button type="button" className="lg:hidden rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-secondary)]"
            onClick={()=>setMobileFilters(v=>!v)}><Filter className="w-4 h-4 inline mr-2"/>Filters</button>
          <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-5 items-start">
            <aside className={(mobileFilters?'':'hidden lg:block')+' rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-4'}>
              <FilterSidebar filters={catalogFilters} onFilterChange={setCatalogFilters} onReset={()=>setCatalogFilters(emptyFilters)} facetCounts={facets}/>
            </aside>
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Resource directory</h2>
              {catalogMatches.length===0?<p className="rounded-xl border border-[var(--border)] p-10 text-sm text-[var(--text-secondary)]">No matching resources. Clear the filters to see the directory.</p>
                :<div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {catalogMatches.map(resource=><ResourceCard key={resource.id} resource={resource}/>)}
                </div>}
            </div>
          </div>
        </div>
      ) : (
        <section className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                {tabs.find(t=>t.id===activeTab)?.title||'Discover'}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                {activeTab==='for-you'
                  ? userId?'Ranked using your selected interests and CyberTube watch activity.':'Explore a balanced feed. Sign in for personalized recommendations.'
                  : 'Fresh source posts plus relevant videos and learning resources.'}
              </p>
            </div>
            {feedData&&!loading&&(
              <span className="text-xs text-[var(--text-muted)]">
                {feedData.liveSources>0?feedData.liveSources+' live sources refreshed regularly':'Live sources unavailable · showing curated library'}
              </span>
            )}
          </div>
          {history.some(row=>!row.is_completed&&row.progress_percent>=3)&&activeTab==='for-you'&&(
            <div className="rounded-xl border border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan-subtle)] p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-3 items-center">
                <Play className="w-5 h-5 text-[var(--accent-cyan)]"/>
                <div>
                  <p className="text-xs font-semibold text-[var(--text-primary)]">Continue where you left off</p>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-1">{history.find(row=>!row.is_completed&&row.progress_percent>=3)?.title}</p>
                </div>
              </div>
              <button type="button" className="px-4 py-2 rounded-lg text-xs font-semibold bg-[var(--accent-cyan)] text-[#090D14]"
                onClick={()=>{const row=history.find(r=>!r.is_completed&&r.progress_percent>=3);if(row)playVideo(row);}}>
                Resume video
              </button>
            </div>
          )}
          {loading&&items.length===0?<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" aria-label="Loading discovery feed">
            {[0,1,2,3,4,5].map(index=><div key={index} className="h-72 rounded-xl border border-[var(--border)] bg-[var(--surface-subtle)] animate-pulse"/>)}
          </div>:error?<div role="alert" className="rounded-xl border border-amber-600/30 p-7 space-y-2">
            <p className="font-semibold text-[var(--text-primary)]">Unable to load the Discover feed</p>
            <p className="text-sm text-[var(--text-secondary)]">{error}</p>
            <button type="button" className="text-sm text-[var(--accent-cyan)] underline" onClick={()=>setPreferencesVersion(v=>v+1)}>Retry</button>
          </div>:items.length===0?<div className="rounded-xl border border-[var(--border)] p-12 text-center space-y-3">
            <Compass className="w-9 h-9 mx-auto text-[var(--text-muted)]"/>
            <h3 className="font-semibold text-[var(--text-primary)]">No items match these filters</h3>
            <p className="text-sm text-[var(--text-secondary)]">Try another category, tab or search term.</p>
            <button type="button" className="text-sm text-[var(--accent-cyan)] underline" onClick={()=>{setQuery('');setDebouncedQuery('');navigate('for-you','');}}>Reset Discover</button>
          </div>:(
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {items.map(item=><FeedCard key={item.id} item={item}
                  progress={item.video_id?progressById.get(item.video_id):undefined}
                  onPlay={playVideo}/>)}
              </div>
              {feedData?.hasMore&&<div className="pt-4 flex justify-center">
                <button type="button" disabled={loadMore} onClick={()=>setPage(n=>n+1)}
                  className="rounded-xl border border-[var(--border)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--accent-cyan)] disabled:opacity-50">
                  {loadMore?<><Loader2 className="inline w-4 h-4 mr-2 animate-spin"/>Loading…</>:'Load more'}
                </button>
              </div>}
            </>
          )}
        </section>
      )}
      <div className="border-t border-[var(--border)] pt-5 text-xs text-[var(--text-secondary)] space-y-1">
        <p>Discover combines public source feeds with the CyberTube course catalog. Live posts are dated by their original publishers; course videos are not labeled as newly published.</p>
        <p>Videos use the official YouTube player. Viewer history is saved only for signed-in CyberTube accounts; it does not change your YouTube watch history.</p>
      </div>
    </div>
  );
}
export default function DiscoverPage(){
  return <Suspense fallback={<div className="container-max py-16 text-sm text-[var(--text-secondary)]">Loading Discover…</div>}>
    <DiscoverContent/>
  </Suspense>;
}
