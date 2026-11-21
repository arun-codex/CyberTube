import { expect, test, type Page } from '@playwright/test';

const VIDEO_ID = 'abcDE123456';
async function mockPlayer(page:Page) {
  await page.route('**/api/discover/feed?*', async route=>{
    await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({
      items:[{id:'player-layout-test',title:'Discover player layout test',
        url:'https://www.youtube.com/watch?v='+VIDEO_ID,video_id:VIDEO_ID,
        content_type:'video',category_slug:'cybersecurity',source_name:'Test channel',source_mode:'live'}],
      total:1,page:1,pageSize:24,hasMore:false,personalized:false,
      liveSources:1,liveItemCount:1,progress:{},
    })});
  });
  // The IFrame API normally replaces a div with an iframe; recreate that
  // behavior without opening a YouTube stream or making a payment.
  const script = '(function(){function Player(id,opts){var old=document.getElementById(id);var frame=document.createElement("iframe");frame.title="Mock YouTube Video";frame.src="about:blank";frame.setAttribute("width",String(opts.width||"640"));frame.setAttribute("height",String(opts.height||"390"));old.replaceWith(frame);this.getCurrentTime=function(){return 0};this.getDuration=function(){return 335};this.getPlaybackRate=function(){return 1};this.getAvailablePlaybackRates=function(){return [1]};this.setPlaybackRate=function(){};this.seekTo=function(){};this.playVideo=function(){};this.destroy=function(){frame.remove()};Promise.resolve().then(function(){opts.events.onReady({target:this})}.bind(this))};window.YT={Player:Player};window.onYouTubeIframeAPIReady&&window.onYouTubeIframeAPIReady()})()';
  await page.route('https://www.youtube.com/iframe_api',async route=>{
    await route.fulfill({status:200,contentType:'application/javascript',body:script});
  });
}
async function check(page:Page) {
  const host=page.getByTestId('discover-player-viewport');
  const iframe=host.locator(':scope > iframe');
  await expect(iframe).toBeVisible();
  const box=await host.boundingBox();
  const inner=await iframe.boundingBox();
  expect(box).not.toBeNull();
  expect(inner).not.toBeNull();
  expect(Math.abs(box!.width-inner!.width)).toBeLessThanOrEqual(2);
  expect(Math.abs(box!.height-inner!.height)).toBeLessThanOrEqual(2);
  expect(Math.abs(box!.x-inner!.x)).toBeLessThanOrEqual(2);
  expect(Math.abs(box!.y-inner!.y)).toBeLessThanOrEqual(2);
  expect(Math.abs(box!.width/box!.height-16/9)).toBeLessThan(0.04);
}
test('Discover video fills responsive 16:9 area in all viewing modes',async({page})=>{
  await mockPlayer(page);
  await page.goto('/discover?tab=videos&video='+VIDEO_ID);
  await expect(page.getByRole('heading',{name:'Discover player layout test',level:2})).toBeVisible();
  for(const width of [1365,768,390]){
    await page.setViewportSize({width,height:900});
    await check(page);
  }
  await page.setViewportSize({width:1365,height:900});
  await page.getByRole('button',{name:'Theater',exact:true}).click();
  await check(page);
  await page.getByRole('button',{name:'Normal',exact:true}).click();
  await check(page);
  await expect(page.getByRole('progressbar',{name:'Playback position'})).toBeVisible();
  await expect(page.getByRole('button',{name:'Settings'})).toBeVisible();
});
