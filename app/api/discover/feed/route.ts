import { NextRequest, NextResponse } from 'next/server';
import { createClient, getAuthenticatedUser } from '@/lib/supabase/server';
import { loadDiscoverSources, personalizeFeed, type FeedPreferences, type WatchSignal } from '@/lib/discovery/live-feed';

export const dynamic = 'force-dynamic';
const tabs = new Set([
  'for-you','latest','videos','news','tech-updates','career','growth',
  'research','security-alerts','open-source','popular',
]);
const categories = new Set(['','all','cybersecurity','technology','career','growth','networking','cloud','research']);

function safeNumber(value: string | null, fallback: number, maximum: number): number {
  const number=Number(value);
  return Number.isFinite(number)&&number>0?Math.min(maximum,Math.floor(number)):fallback;
}

export async function GET(request: NextRequest) {
  const params=request.nextUrl.searchParams;
  const tab=params.get('tab')||'for-you';
  const category=params.get('category')||'';
  const query=(params.get('q')||'').trim().slice(0,100);
  const page=safeNumber(params.get('page'),1,100);
  const pageSize=safeNumber(params.get('pageSize'),24,36);
  if(!tabs.has(tab)||!categories.has(category)){
    return NextResponse.json({error:'Invalid discovery filter'}, {status:400});
  }

  const prefs:FeedPreferences={interests:[],watchHistory:[]};
  const user=await getAuthenticatedUser();
  if(user){
    const db=await createClient();
    if(db){
      const [interests,history]=await Promise.all([
        (db.from('user_interests') as any).select('topic_id,discovery_topics(name,slug,keywords)').eq('user_id',user.id).limit(80),
        (db.from('user_discover_video_progress') as any)
          .select('video_id,category,progress_percent,last_watched_at')
          .eq('user_id',user.id).order('last_watched_at',{ascending:false}).limit(250),
      ]);
      if(!interests.error){
        prefs.interests=(interests.data||[]).flatMap((row:any)=>{
          const t=row.discovery_topics;
          return t?[t.slug,...(t.keywords||[])]:[];
        });
      }
      if(!history.error){
        prefs.watchHistory=(history.data||[]) as WatchSignal[];
      }
    }
  }
  try {
    const source=await loadDiscoverSources();
    const ranked=personalizeFeed(source.items,{
      tab:tab==='popular'?'for-you':tab,category,query,page,pageSize,
    },prefs);
    return NextResponse.json({
      ...ranked,
      tab,
      personalized:Boolean(user)&&tab==='for-you',
      liveSources:source.sourceCount,
      liveItemCount:source.liveCount,
      progress:Object.fromEntries(prefs.watchHistory.map(entry=>[entry.video_id,{
        percent:entry.progress_percent,updatedAt:entry.last_watched_at,
      }])),
    },{
      headers:{'Cache-Control':'private, no-store','Vary':'Cookie'},
    });
  }catch{
    return NextResponse.json({error:'Discover feed temporarily unavailable',items:[]},{status:503});
  }
}
