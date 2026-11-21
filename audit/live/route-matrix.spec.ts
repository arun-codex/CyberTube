import {test,expect} from '@playwright/test';

type Case={template:string;url:string;scope:'public'|'signed-out-gate'|'redirect'};
const routes:Case[]=[
 {template:'/',url:'/',scope:'public'},
 {template:'/about',url:'/about',scope:'public'},
 {template:'/account',url:'/account',scope:'signed-out-gate'},
 {template:'/admin',url:'/admin',scope:'signed-out-gate'},
 {template:'/admin/study-materials',url:'/admin/study-materials',scope:'signed-out-gate'},
 {template:'/careers',url:'/careers',scope:'public'},
 {template:'/certifications',url:'/certifications',scope:'public'},
 {template:'/cheat-sheets',url:'/cheat-sheets',scope:'public'},
 {template:'/courses/[slug]',url:'/courses/linux-zero-to-advanced',scope:'public'},
 {template:'/courses',url:'/courses',scope:'public'},
 {template:'/discover',url:'/discover',scope:'public'},
 {template:'/domains',url:'/domains',scope:'public'},
 {template:'/ethics',url:'/ethics',scope:'public'},
 {template:'/forgot-password',url:'/forgot-password',scope:'public'},
 {template:'/glossary',url:'/glossary',scope:'public'},
 {template:'/labs',url:'/labs',scope:'public'},
 {template:'/learning-paths/[slug]',url:'/learning-paths/foundations',scope:'public'},
 {template:'/learning-paths',url:'/learning-paths',scope:'public'},
 {template:'/library/[id]',url:'/library/net-01',scope:'public'},
 {template:'/library',url:'/library',scope:'public'},
 {template:'/login',url:'/login',scope:'public'},
 {template:'/privacy',url:'/privacy',scope:'public'},
 {template:'/profile',url:'/profile',scope:'signed-out-gate'},
 {template:'/register',url:'/register',scope:'public'},
 {template:'/reset-password',url:'/reset-password',scope:'public'},
 {template:'/resources/[slug]',url:'/resources/portswigger-sql-injection-lab',scope:'public'},
 {template:'/saved',url:'/saved',scope:'public'},
 {template:'/search',url:'/search?q=linux',scope:'public'},
 {template:'/skills',url:'/skills',scope:'public'},
 // The document detail requires a valid authenticated test account. An
 // invalid representative URL can verify redirect protection only.
 {template:'/study-materials/bug-bounty/[documentId]',url:'/study-materials/bug-bounty/unlisted-document',scope:'signed-out-gate'},
 {template:'/study-materials/bug-bounty',url:'/study-materials/bug-bounty',scope:'redirect'},
 {template:'/study-materials',url:'/study-materials',scope:'signed-out-gate'},
 {template:'/support',url:'/support',scope:'public'},
 {template:'/terms',url:'/terms',scope:'public'},
 {template:'/tryhackme-roadmap',url:'/tryhackme-roadmap',scope:'redirect'},
 {template:'/typography-preview',url:'/typography-preview',scope:'public'},
];
const scenarios=[
 {width:1440,height:900,theme:'dark'},
 {width:1440,height:900,theme:'light'},
 {width:375,height:812,theme:'dark'},
 {width:375,height:812,theme:'light'},
] as const;

for(const route of routes) {
  test('Live read-only route: '+route.template,async({page},testInfo)=>{
    const issues:string[]=[];
    page.on('pageerror',e=>issues.push('JS: '+e.message.slice(0,300)));
    page.on('console',m=>{if(m.type()==='error')issues.push('CONSOLE: '+m.text().slice(0,220));});
    page.on('requestfailed',r=>{if(issues.length<100)issues.push('NETWORK: '+r.url().slice(0,240)+' - '+(r.failure()?.errorText||''));});
    const observations:object[]=[];
    for(const scenario of scenarios){
      await page.setViewportSize({width:scenario.width,height:scenario.height});
      await page.addInitScript(theme=>{
        try{localStorage.setItem('theme',theme);}catch{}
      },scenario.theme);
      let responseStatus:number|null=null,loadingError:string|null=null;
      try{
        const response=await page.goto(route.url,{waitUntil:'domcontentloaded',timeout:30000});
        responseStatus=response?.status()||null;
        await page.waitForTimeout(400);
      }catch(e){
        loadingError=e instanceof Error?e.message.slice(0,220):String(e);
      }
      const finalUrl=page.url();
      const docTitle=await page.title().catch(()=>null);
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth+3).catch(()=>null);
      observations.push({template:route.template,requested:route.url,scope:route.scope,scenario,status:responseStatus,finalUrl,title:docTitle,horizontalOverflow:overflow,loadingError});
      const name=route.template.replace(/[^a-z0-9]/gi,'_').replace(/^_+|_+$/g,'')||'home';
      const snap=await page.screenshot({path:testInfo.outputPath(name+'_'+scenario.width+'_'+scenario.theme+'.png'),fullPage:false}).catch(()=>null);
      if(snap)await testInfo.attach('Screenshot '+scenario.width+'/'+scenario.theme,{body:snap,contentType:'image/png'});
    }
    await testInfo.attach('route evidence',{body:Buffer.from(JSON.stringify({observations,issues},null,2)),contentType:'application/json'});
    // Authentication redirects and legacy redirects are an expected test
    // outcome, not proof that the protected view was actually opened.
    const httpErrors=observations.filter((o:any)=>o.loadingError||o.status===null||o.status>=500);
    expect(httpErrors,'Route has unexpected load errors. See attached evidence.').toEqual([]);
  });
}
