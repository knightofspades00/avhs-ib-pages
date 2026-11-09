import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync,rmSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';
import {plcMeetings} from '../src/plcMeetingData.js';
import {pdArchive} from '../src/pdArchiveData.js';
const monday=plcMeetings.find(x=>x.id==='nov09-mou'),summer=plcMeetings.find(x=>x.id==='jul-pd');
assert.equal(monday.agenda.length,9);assert.equal(monday.agenda[3][0],'8:30–8:38');assert.equal(monday.agenda[5][0],'8:40–8:47');assert.equal(summer.date,'2026-07-28');assert.equal(summer.resourceIds.length,3);
const allowed=new Set(['https://drive.google.com/file/d/1ta_KQE9-a8_MTgTMlQScO9BgpziPzJ2M/view?usp=drivesdk','https://drive.google.com/file/d/1-SqJEXjnlthH7QBQN-e3wWdzYWTP-juC/view?usp=drivesdk','https://drive.google.com/file/d/1JnzGP1sKXTWAjzD34XvCFvE3NmKvLRrR/view?usp=drivesdk']);
assert(pdArchive.filter(x=>x.url).every(x=>allowed.has(x.url)));assert.equal(pdArchive.filter(x=>x.url).length,3);
const source=readFileSync('src/MeetingAgenda.jsx','utf8');assert(source.includes('aria-pressed={active===i}'));assert(source.includes('aria-controls="agenda-active-block"'));assert(source.includes('Read the full timed outline'));assert(source.includes('fictional data'));assert(source.includes('not new programme requirements'));assert(!/canva\.com|canva\.link|docs\.google|drive\.google/.test(source));
const temp=mkdtempSync(join(tmpdir(),'meeting-agenda-ssr-'));
try{const outfile=join(temp,'render.cjs');await build({stdin:{contents:"import React from'react';import{renderToStaticMarkup}from'react-dom/server';import MeetingAgenda,{mondayGuides}from'./src/MeetingAgenda.jsx';import{plcMeetings}from'./src/plcMeetingData.js';export const guides=mondayGuides;export const render=()=>renderToStaticMarkup(React.createElement(MeetingAgenda,{items:plcMeetings.find(x=>x.id==='nov09-mou').agenda}));",resolveDir:fileURLToPath(new URL('..',import.meta.url))},bundle:true,platform:'node',format:'cjs',loader:{'.css':'empty'},outfile,logLevel:'silent'});const m=createRequire(import.meta.url)(outfile);assert.equal(m.guides.length,9);for(const g of m.guides){assert(g.prompt&&g.takeaway);assert(g.links.every(([href])=>href.startsWith('#')))}const html=m.render();assert.equal((html.match(/aria-controls="agenda-active-block"/g)||[]).length,9);assert(html.includes('Academy Interest Survey'));assert(html.includes('BLOCK 1 OF 9'));assert(html.includes('aria-pressed="false"'));assert(!html.includes('undefined'));}finally{rmSync(temp,{recursive:true,force:true})}
console.log('PASS interactive Monday outline, preserved times, optional facilitation prompts, no private data links and exact public Summer PD references.');
const {academyBusinessLinks}=await import('../src/academyBusinessData.js');
assert.equal(academyBusinessLinks.length,4);assert(academyBusinessLinks.every(x=>x.url.includes('docs.google.com/forms/d/e/')&&x.url.includes('/viewform')));assert(academyBusinessLinks.every(x=>!/[?&](?:entry\.|edit2|token=)/.test(x.url)));assert.equal(academyBusinessLinks.find(x=>x.id==='exam').audience,'Students');assert(academyBusinessLinks.find(x=>x.id==='exam').note.includes('October 30'));assert.equal(monday.agenda[7][1],'Review software resources and next steps');assert(monday.agenda[6][1].includes('MYP, DP, AniVation'));assert.equal(monday.agenda.at(-1)[0],'8:55–9:00');
console.log('PASS exact responder-only Academy Business links, student-registration warning, neutral software discussion and balanced agenda close.');

const businessData=await import('../src/academyBusinessData.js');
assert.deepEqual(Object.keys(businessData),['academyBusinessLinks']);
const businessSource=readFileSync('src/AcademyBusiness.jsx','utf8');
assert(businessSource.includes('Review software resources and next steps'));
assert(!businessSource.includes('<dl>'));
console.log('PASS Academy Business includes forms and a neutral discussion prompt only.');
