'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, History, PlayCircle } from 'lucide-react';
import type { VideoWatchProgress } from '@/components/discovery/DiscoverVideoPlayer';

export function ProfileWatchHistory() {
  const [items,setItems]=useState<VideoWatchProgress[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  useEffect(()=>{
    const controller=new AbortController();
    fetch('/api/discover/history',{cache:'no-store',credentials:'same-origin',signal:controller.signal})
      .then(res=>{if(!res.ok)throw Error('Watch history unavailable');return res.json();})
      .then(data=>{if(!controller.signal.aborted)setItems(data.items||[]);})
      .catch(()=>{if(!controller.signal.aborted)setError('Watch history is temporarily unavailable.');})
      .finally(()=>{if(!controller.signal.aborted)setLoading(false);});
    return ()=>controller.abort();
  },[]);
  return (
    <section className="space-y-4" aria-label="Cloud video watch history">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="inline-flex items-center gap-2 text-lg font-semibold text-[var(--text-primary)]">
            <History className="w-5 h-5 text-[var(--accent-cyan)]"/> Video watch history
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Your CyberTube video and course viewing activity, saved to your account.
          </p>
        </div>
        <Link href="/discover?tab=history" className="inline-flex gap-2 items-center text-xs text-[var(--accent-cyan)] hover:underline">
          All history <ArrowRight className="w-4 h-4"/>
        </Link>
      </div>
      {loading?<div className="rounded-xl border border-[var(--border)] p-8 text-xs text-[var(--text-secondary)]">Loading synced watch history…</div>
        :error?<div role="alert" className="rounded-xl border border-[var(--border)] p-6 text-xs text-[var(--text-secondary)]">{error}</div>
        :items.length===0?<div className="rounded-xl border border-[var(--border)] p-8 text-sm text-[var(--text-secondary)]">
          No video history yet. Start watching in <Link href="/discover" className="text-[var(--accent-cyan)] underline">Discover</Link>.
        </div>
        :<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.slice(0,6).map(item=>(
            <Link key={item.video_id} href={'/discover?video='+encodeURIComponent(item.video_id)}
              className="rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--card-bg)] hover:border-[var(--accent-cyan)] transition-colors">
              <div className="aspect-video relative bg-[#0B1018]">
                <img src={'https://i.ytimg.com/vi/'+item.video_id+'/hqdefault.jpg'} loading="lazy"
                  alt="" className="object-cover w-full h-full"/>
                <PlayCircle className="w-9 h-9 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-lg"/>
                <div className="absolute bottom-0 w-full h-1.5 bg-[#0B1018]/70">
                  <div className="h-full bg-[var(--accent-cyan)]" style={{width:item.progress_percent+'%'}}/>
                </div>
              </div>
              <div className="p-3 space-y-1">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] line-clamp-2">{item.title}</h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  {item.is_completed?'Watched':item.progress_percent+'% watched'} · {item.channel_name}
                </p>
                <p className="text-xs text-[var(--accent-cyan)]">{item.is_completed?'Watch again':'Continue watching'}</p>
              </div>
            </Link>
          ))}
        </div>}
    </section>
  );
}
