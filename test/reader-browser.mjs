/** Real PDF/component browser checks with mocked persistence, NOT a hosted login test.
 * STUDY_INVENTORY must point to the private generated inventory.json.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { chromium } from '@playwright/test';

const inventoryPath = (process.env.STUDY_INVENTORY || '').trim();
const inventory=JSON.parse(await fs.readFile(inventoryPath,'utf8'));
const output=path.dirname(inventoryPath);
const work=path.resolve('tmp/reader-browser');
await fs.mkdir(work,{recursive:true});
await fs.writeFile(path.join(work,'entry.tsx'),`import React from 'react';
import {createRoot} from 'react-dom/client';
import {PdfReader} from '../../src/components/library/PdfReader';
const id=new URL(location.href).searchParams.get('id')||'0';
createRoot(document.getElementById('root')!).render(<PdfReader documentId={id} initialTitle="Searchable Study PDF"/>);`);
await fs.writeFile(path.join(work,'link.tsx'),`import React from 'react'; export default function Link({href,children,...props}:any){return <a href={href} {...props}>{children}</a>}`);
await build({entryPoints:[path.join(work,'entry.tsx')],outfile:path.join(work,'reader.js'),bundle:true,format:'esm',platform:'browser',
  alias:{'@':path.resolve('src'),'next/link':path.join(work,'link.tsx')},define:{'process.env.NODE_ENV':'"production"'},logLevel:'silent'});
const cssFiles=(await fs.readdir('.next/static/css')).filter(f=>f.endsWith('.css'));
const css=(await Promise.all(cssFiles.map(f=>fs.readFile(path.join('.next/static/css',f),'utf8')))).join('\n');
const progress=new Map(), bookmarks=new Set();
const server=http.createServer(async(req,res)=>{
  try {
    const url=new URL(req.url,'http://localhost');
    if(url.pathname==='/reader.js'){res.setHeader('Content-Type','text/javascript');res.end(await fs.readFile(path.join(work,'reader.js')));return;}
    if(url.pathname==='/pdf.worker.min.mjs'){res.setHeader('Content-Type','text/javascript');res.end(await fs.readFile('public/pdf.worker.min.mjs'));return;}
    if(url.pathname==='/style.css'){res.setHeader('Content-Type','text/css');res.end(css);return;}
    const pdf=/^\/api\/study-materials\/(\d+)\/pdf$/.exec(url.pathname);
    if(pdf){const doc=inventory.documents[Number(pdf[1])];if(!doc)throw Error('Unknown PDF');res.setHeader('Content-Type','application/pdf');res.end(await fs.readFile(doc.file_path));return;}
    if(url.pathname==='/api/study-progress' || url.pathname==='/api/study-bookmarks'){
      let body='';for await(const chunk of req)body+=chunk;
      const data=body?JSON.parse(body):{};const id=data.documentId||url.searchParams.get('documentId');
      res.setHeader('Content-Type','application/json');
      if(url.pathname.endsWith('study-bookmarks')){
        const key=`${id}:${data.pageNumber}`;bookmarks.has(key)?bookmarks.delete(key):bookmarks.add(key);
        res.end(JSON.stringify({bookmarked:bookmarks.has(key)}));return;
      }
      if(req.method==='POST')progress.set(id,{last_page:data.page});
      res.end(JSON.stringify({progress:progress.get(id),bookmarks:[...bookmarks].filter(k=>k.startsWith(`${id}:`)).map(k=>({page_number:Number(k.split(':')[1])}))}));return;
    }
    res.setHeader('Content-Type','text/html');res.end('<meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="/style.css"><div id="root"></div><script type="module" src="/reader.js"></script>');
  }catch(error){res.statusCode=500;res.end(error.message);}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true});
const report={persistence:'mock HTTP server; no hosted authentication or Supabase verification',documents:[],desktop:false,mobile:false};
try{
  const context=await browser.newContext({viewport:{width:1280,height:900}});
  context.setDefaultTimeout(20000);
  const page=await context.newPage();
  for(const [index,doc] of inventory.documents.entries()){
    console.log('Checking PDF',index+1,doc.original_filename);
    const errors=[];const listener=error=>errors.push(error.message);page.on('pageerror',listener);
    await page.goto(`${base}/?id=${index}`);
    await page.locator('.textLayer span').first().waitFor({timeout:30000});
    await page.waitForFunction(()=>document.querySelector('#root canvas')?.width>0);
    const text=await page.locator('.textLayer').innerText();assert.ok(text.trim().length>0,doc.original_filename);
    await page.getByRole('button',{name:'Search inside document',exact:true}).click();
    await page.getByRole('textbox',{name:'Search document'}).fill(doc.pages[0].search_term);
    await page.locator('mark.pdf-search-highlight').first().waitFor();
    assert.equal(errors.length,0,errors.join('\n'));
    report.documents.push({filename:doc.original_filename,render:true,text_layer:true,search:true});
    page.off('pageerror',listener);
  }
  await page.goto(`${base}/?id=0`);await page.locator('.textLayer span').first().waitFor();
  const selection=await page.locator('.textLayer').evaluate(element=>{const range=document.createRange();range.selectNodeContents(element);const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);return selection.toString();});assert.ok(selection.trim());
  await page.getByRole('button',{name:'Search inside document',exact:true}).click();
  await page.getByRole('textbox',{name:'Search document'}).fill(inventory.documents[0].pages.at(-1).search_term);
  await page.locator('mark.pdf-search-highlight').first().waitFor();
  const targetPage=String(inventory.documents[0].page_count);
  for(let attempt=0;attempt<100 && await page.getByRole('textbox',{name:'Page number'}).inputValue()!==targetPage;attempt++) {
    await page.getByRole('button',{name:'Next match',exact:true}).click();
  }
  assert.equal(await page.getByRole('textbox',{name:'Page number'}).inputValue(),targetPage,'Search result must navigate to the last page');
  await page.getByRole('button',{name:'Close search',exact:true}).click();
  await page.getByRole('textbox',{name:'Page number'}).fill('1');
  await page.getByRole('textbox',{name:'Page number'}).press('Enter');
  report.search_navigation=true;
  await page.getByRole('button',{name:'Next Page',exact:true}).click();
  await page.getByRole('textbox',{name:'Page number'}).waitFor();
  await page.waitForFunction(()=>document.querySelector('input[aria-label="Page number"]').value==='2');
  await page.getByRole('button',{name:'Bookmark Page',exact:true}).click();
  await page.getByRole('button',{name:'Remove Bookmark',exact:true}).waitFor();
  await page.waitForResponse(r=>r.url().endsWith('/api/study-progress')&&r.request().method()==='POST');
  console.log('Checking zoom, jump, fullscreen and restore');
  const widthBefore=await page.locator('#root canvas').evaluate(c=>c.width);
  await page.getByRole('button',{name:'Zoom In',exact:true}).click();
  await page.waitForFunction(before=>document.querySelector('#root canvas').width!==before,widthBefore);
  await page.getByRole('button',{name:'Zoom Out',exact:true}).click();
  await page.getByRole('textbox',{name:'Page number'}).fill('3');
  await page.getByRole('textbox',{name:'Page number'}).press('Enter');
  await page.waitForFunction(()=>document.querySelector('input[aria-label="Page number"]').value==='3');
  await page.getByRole('button',{name:'Previous Page',exact:true}).click();
  await page.getByRole('button',{name:'Enter Fullscreen',exact:true}).click();
  await page.waitForFunction(()=>Boolean(document.fullscreenElement));
  await page.getByRole('button',{name:'Exit Fullscreen',exact:true}).click();
  await page.waitForFunction(()=>!document.fullscreenElement);
  await page.screenshot({path:path.join(output,'reader-desktop.png'),fullPage:true});
  await page.reload();await page.waitForFunction(()=>document.querySelector('input[aria-label="Page number"]')?.value==='2');
  console.log('Checking second browser session');
  const second=await browser.newContext();second.setDefaultTimeout(20000);const secondPage=await second.newPage();await secondPage.goto(`${base}/?id=0`);
  await secondPage.waitForFunction(()=>document.querySelector('input[aria-label="Page number"]')?.value==='2');await second.close();
  report.desktop=true;
  const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  console.log('Checking mobile');
  mobile.setDefaultTimeout(20000);
  const mobilePage=await mobile.newPage();await mobilePage.goto(`${base}/?id=0`);await mobilePage.locator('.textLayer span').first().waitFor();
  assert.ok(await mobilePage.getByRole('button',{name:'Zoom In',exact:true}).isVisible());
  await mobilePage.screenshot({path:path.join(output,'reader-mobile.png'),fullPage:true});
  assert.ok(await mobilePage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Mobile page overflows');
  report.mobile=true;await mobile.close();await context.close();
}finally{
  await fs.writeFile(path.join(output,'reader-browser-results.json'),JSON.stringify(report,null,2));
  await browser.close();server.close();
}
console.log(JSON.stringify(report,null,2));

