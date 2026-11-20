'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ExternalLink, Maximize2, Minimize2, PlayCircle, RotateCcw, Settings2, Volume2 } from 'lucide-react';

export type PlayingVideo = {
  video_id: string;
  title: string;
  source_name: string;
  category_slug: string;
};
export type VideoWatchProgress = {
  video_id: string;
  title: string;
  channel_name: string;
  category: string;
  last_position_seconds: number;
  duration_seconds: number;
  progress_percent: number;
  is_completed: boolean;
  last_watched_at: string;
  origin?: string;
};
type PlayerProps = {
  video: PlayingVideo;
  saved?: VideoWatchProgress;
  signedIn: boolean;
  onSaved: (value: VideoWatchProgress) => void;
};

type PlayerLike = {
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlaybackRate?: () => number;
  getAvailablePlaybackRates?: () => number[];
  setPlaybackRate?: (rate: number) => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  playVideo: () => void;
  destroy: () => void;
};
type YT = {
  Player: new (elementId: string, options: object) => PlayerLike;
};
let youtubeScript: Promise<YT> | null = null;
function loadYouTube(): Promise<YT> {
  if (typeof window === 'undefined') return Promise.reject(new Error('Browser required'));
  const global=window as typeof window & {YT?: YT;onYouTubeIframeAPIReady?: () => void};
  if (global.YT?.Player) return Promise.resolve(global.YT);
  if (youtubeScript) return youtubeScript;
  youtubeScript=new Promise<YT>((resolve,reject)=>{
    const previous=global.onYouTubeIframeAPIReady;
    const timeout=window.setTimeout(()=>{
      if(global.YT?.Player) resolve(global.YT);
      else { youtubeScript=null; reject(new Error('YouTube player could not load. Open on YouTube instead.')); }
    },13000);
    global.onYouTubeIframeAPIReady=()=>{
      previous?.();
      window.clearTimeout(timeout);
      if(global.YT?.Player) resolve(global.YT);
      else reject(new Error('YouTube player not available'));
    };
    if(!document.getElementById('cybertube-discover-yt-api')){
      const script=document.createElement('script');
      script.id='cybertube-discover-yt-api';
      script.src='https://www.youtube.com/iframe_api';
      script.async=true;
      script.onerror=()=>{
        window.clearTimeout(timeout);
        youtubeScript=null;
        reject(new Error('Could not connect to YouTube.'));
      };
      document.head.appendChild(script);
    }
  });
  return youtubeScript;
}

function displayTime(value:number){
  const seconds=Math.max(0,Math.floor(value));
  const mins=Math.floor(seconds/60);
  return mins+':'+String(seconds%60).padStart(2,'0');
}

export function DiscoverVideoPlayer({video,saved,signedIn,onSaved}:PlayerProps){
  const elementRef=useRef<HTMLDivElement>(null);
  const playerRef=useRef<PlayerLike|null>(null);
  const position=useRef(0);
  const duration=useRef(0);
  const isCompleted=useRef(false);
  const lastSent=useRef(0);
  const saveInProgress=useRef(false);
  const savedHandler=useRef(onSaved);
  const videoRef=useRef(video);
  const signedInRef=useRef(signedIn);
  const [ready,setReady]=useState(false);
  const [error,setError]=useState('');
  const [current,setCurrent]=useState(0);
  const [total,setTotal]=useState(0);
  const [speed,setSpeed]=useState(1);
  const [rates,setRates]=useState<number[]>([1]);
  const [settings,setSettings]=useState(false);
  const [theater,setTheater]=useState(false);
  const [saving,setSaving]=useState(false);

  useEffect(()=>{savedHandler.current=onSaved;videoRef.current=video;signedInRef.current=signedIn;},
    [onSaved,video,signedIn]);

  const flush=useCallback(async(force=false,completed=false)=>{
    const player=playerRef.current;
    let pos=position.current, dur=duration.current;
    try {
      if(player){
        const pt=player.getCurrentTime(),dt=player.getDuration();
        if(Number.isFinite(pt)&&pt>=0)pos=pt;
        if(Number.isFinite(dt)&&dt>0)dur=dt;
      }
    }catch{}
    position.current=pos;
    duration.current=dur;
    if(!signedInRef.current||dur<1||pos<2)return;
    const now=Date.now();
    if(!force&&(saveInProgress.current||now-lastSent.current<10000))return;
    lastSent.current=now;
    saveInProgress.current=true;
    setSaving(true);
    try {
      const response=await fetch('/api/discover/history',{
        method:'POST',headers:{'Content-Type':'application/json'},
        credentials:'same-origin',keepalive:true,
        body:JSON.stringify({
          videoId:videoRef.current.video_id,
          title:videoRef.current.title,
          channel:videoRef.current.source_name,
          category:videoRef.current.category_slug,
          positionSeconds:Math.max(0,Math.floor(pos)),
          durationSeconds:Math.max(1,Math.round(dur)),
          completed,
        }),
      });
      if(!response.ok)throw Error('Failed to save progress');
      const json=await response.json();
      if(json.progress?.video_id===videoRef.current.video_id){
        savedHandler.current(json.progress);
      }
    }catch{
      // Never display a false synced state. On reconnect the last player state is retried.
      lastSent.current=0;
      setError('Could not sync viewing progress. Check connection, then resume playback.');
    }finally{
      saveInProgress.current=false;
      setSaving(false);
    }
  },[]);

  useEffect(()=>{
    let alive=true;
    let timer:number|undefined;
    const wrapper=elementRef.current;
    if(!wrapper)return;
    wrapper.replaceChildren();
    const node=document.createElement('div');
    const id='discover-youtube-'+Math.random().toString(36).slice(2);
    node.id=id;
    wrapper.appendChild(node);
    position.current=saved?.last_position_seconds||0;
    duration.current=saved?.duration_seconds||0;
    isCompleted.current=false;
    lastSent.current=0;
    setCurrent(position.current);
    setTotal(duration.current);
    setError('');
    setReady(false);

    loadYouTube().then(YT=>{
      if(!alive)return;
      playerRef.current=new YT.Player(id,{
        videoId:video.video_id,
        playerVars:{
          enablejsapi:1,origin:window.location.origin,playsinline:1,
          controls:1,rel:0,cc_load_policy:0,
        },
        events:{
          onReady:(event:{target:PlayerLike})=>{
            if(!alive)return;
            playerRef.current=event.target;
            setReady(true);
            try{
              const d=event.target.getDuration();
              if(d>0){duration.current=d;setTotal(d);}
              if(saved?.last_position_seconds&&saved.last_position_seconds>8&&!saved.is_completed){
                event.target.seekTo(saved.last_position_seconds,true);
              }
              const allowed=event.target.getAvailablePlaybackRates?.()||[1];
              setRates(allowed.length?allowed:[1]);
            }catch{}
          },
          onStateChange:(event:{data:number;target:PlayerLike})=>{
            if(!alive)return;
            if(timer!==undefined){window.clearInterval(timer);timer=undefined;}
            if(event.data===1){
              setError('');
              timer=window.setInterval(()=>{
                try{
                  const p=event.target.getCurrentTime(),d=event.target.getDuration();
                  if(Number.isFinite(p)){position.current=p;setCurrent(p);}
                  if(d>0){duration.current=d;setTotal(d);}
                  void flush();
                }catch{}
              },3000);
            }else if(event.data===2||event.data===0){
              if(event.data===0)isCompleted.current=true;
              void flush(true,event.data===0);
            }
          },
          onError:()=>{
            if(alive)setError('This video cannot play here. Use Watch on YouTube.');
          },
        },
      });
    }).catch(e=>{if(alive)setError(e instanceof Error?e.message:'YouTube unavailable');});

    const onVisibility=()=>{
      if(document.visibilityState==='hidden')void flush(true,isCompleted.current);
    };
    const onPageHide=()=>{void flush(true,isCompleted.current);};
    window.addEventListener('pagehide',onPageHide);
    document.addEventListener('visibilitychange',onVisibility);
    return ()=>{
      alive=false;
      if(timer!==undefined)window.clearInterval(timer);
      void flush(true,isCompleted.current);
      window.removeEventListener('pagehide',onPageHide);
      document.removeEventListener('visibilitychange',onVisibility);
      try{playerRef.current?.destroy();}catch{}
      playerRef.current=null;
      wrapper.replaceChildren();
    };
    // Video ID is the component key: the player is only recreated when selecting a new video.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[video.video_id,flush]);

  const changeSpeed=(next:number)=>{
    try{
      if(playerRef.current?.setPlaybackRate){
        playerRef.current.setPlaybackRate(next);
        setSpeed(playerRef.current.getPlaybackRate?.()||next);
      }
    }catch{}
  };
  const restart=()=>{
    try{playerRef.current?.seekTo(0,true);playerRef.current?.playVideo();}catch{}
  };
  const ratio=total>0?Math.min(100,Math.round(current/total*100)):0;
  return (
    <section aria-label="CyberTube video player" className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] overflow-hidden shadow-lg">
      <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-widest font-mono text-[var(--accent-cyan)]">Now playing · YouTube</div>
          <h2 className="mt-1 font-semibold text-base sm:text-xl text-[var(--text-primary)] break-words">{video.title}</h2>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">{video.source_name}</p>
        </div>
        <a href={'https://www.youtube.com/watch?v='+video.video_id} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1 shrink-0 text-xs text-[var(--accent-cyan)] hover:underline">
          YouTube <ExternalLink className="w-3.5 h-3.5"/>
        </a>
      </div>
      <div className={'bg-black mx-auto w-full '+(theater?'max-w-none':'max-w-5xl')}>
        <div ref={elementRef} className="w-full aspect-video" aria-label={video.title}/>
      </div>
      {error&&<div role="alert" className="px-4 py-2 text-xs text-amber-600 dark:text-amber-400">
        {error} <a href={'https://www.youtube.com/watch?v='+video.video_id} target="_blank" rel="noopener noreferrer" className="underline">Open video</a>
      </div>}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between gap-2 text-xs text-[var(--text-secondary)]">
          <span>{ready?displayTime(current)+' / '+displayTime(total):'Loading YouTube player…'}</span>
          <span>{signedIn?(saving?'Saving to cloud…':'Progress sync enabled'):'Sign in to save cloud progress'}</span>
          <span>{ratio}%</span>
        </div>
        <div role="progressbar" aria-label="Playback position" aria-valuenow={ratio} aria-valuemin={0} aria-valuemax={100}
          className="h-1.5 rounded-full bg-[var(--surface-elevated)] overflow-hidden">
          <div className="h-full bg-[var(--accent-cyan)] transition-[width]" style={{width:ratio+'%'}}/>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={restart} disabled={!ready} className="inline-flex gap-1.5 items-center rounded-lg border border-[var(--border)] px-3 py-2 text-xs text-[var(--text-secondary)] disabled:opacity-40 hover:text-[var(--accent-cyan)]">
              <RotateCcw className="w-3.5 h-3.5"/> Restart
            </button>
            <button type="button" onClick={()=>setTheater(x=>!x)} className="inline-flex gap-1.5 items-center rounded-lg border border-[var(--border)] px-3 py-2 text-xs text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]">
              {theater?<Minimize2 className="w-3.5 h-3.5"/>:<Maximize2 className="w-3.5 h-3.5"/>} {theater?'Normal':'Theater'}
            </button>
            <button type="button" aria-expanded={settings} onClick={()=>setSettings(x=>!x)}
              className="inline-flex gap-1.5 items-center rounded-lg border border-[var(--border)] px-3 py-2 text-xs text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]">
              <Settings2 className="w-3.5 h-3.5"/> Settings
            </button>
          </div>
          <span className="text-[11px] text-[var(--text-muted)] inline-flex items-center gap-1.5">
            <PlayCircle className="w-3.5 h-3.5"/> Native YouTube playback controls
          </span>
        </div>
        {settings&&<div className="rounded-xl bg-[var(--surface-subtle)] border border-[var(--border)] p-4 flex flex-wrap items-center gap-4">
          <label className="text-xs text-[var(--text-secondary)] inline-flex items-center gap-2">
            <Volume2 className="w-3.5 h-3.5"/> Playback speed
            <select aria-label="Playback speed" value={speed} onChange={e=>changeSpeed(Number(e.target.value))}
              className="rounded-md bg-[var(--card-bg)] border border-[var(--border)] px-3 py-2 text-[var(--text-primary)]">
              {[...new Set([1,...rates])].sort((a,b)=>a-b).map(rate=>(
                <option key={rate} value={rate}>{rate}×</option>
              ))}
            </select>
          </label>
          <p className="text-xs text-[var(--text-secondary)]">
            Video quality, subtitles, volume and fullscreen: use the YouTube player controls.
            YouTube selects available quality levels; external apps cannot force resolution.
          </p>
        </div>}
      </div>
    </section>
  );
}
