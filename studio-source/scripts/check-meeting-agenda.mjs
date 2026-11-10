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
const archivedPublicResources=pdArchive.filter(x=>x.url);assert.equal(archivedPublicResources.length,3);assert(archivedPublicResources.every(x=>summer.resourceIds.includes(x.id)));assert(archivedPublicResources.every(x=>new URL(x.url).protocol==='https:'));
const source=readFileSync('src/MeetingAgenda.jsx','utf8');assert(source.includes('aria-pressed={active===i}'));assert(source.includes('aria-controls="agenda-active-block"'));assert(source.includes('Read the full timed outline'));assert(source.includes('fictional data'));assert(source.includes('not new programme requirements'));assert(!/canva\.com|canva\.link|docs\.google|drive\.google/.test(source));
const temp=mkdtempSync(join(tmpdir(),'meeting-agenda-ssr-'));
try{const outfile=join(temp,'render.cjs');await build({stdin:{contents:"import React from'react';import{renderToStaticMarkup}from'react-dom/server';import MeetingAgenda,{mondayGuides}from'./src/MeetingAgenda.jsx';import{plcMeetings}from'./src/plcMeetingData.js';export const guides=mondayGuides;export const render=()=>renderToStaticMarkup(React.createElement(MeetingAgenda,{items:plcMeetings.find(x=>x.id==='nov09-mou').agenda}));",resolveDir:fileURLToPath(new URL('..',import.meta.url))},bundle:true,platform:'node',format:'cjs',loader:{'.css':'empty'},outfile,logLevel:'silent'});const m=createRequire(import.meta.url)(outfile);assert.equal(m.guides.length,9);for(const g of m.guides){assert(g.prompt&&g.takeaway);assert(g.links.every(([href])=>href.startsWith('#')))}const html=m.render();assert.equal((html.match(/aria-controls="agenda-active-block"/g)||[]).length,9);assert(html.includes('Academy Interest Survey'));assert(html.includes('BLOCK 1 OF 9'));assert(html.includes('aria-pressed="false"'));assert(!html.includes('undefined'));}finally{rmSync(temp,{recursive:true,force:true})}
console.log('PASS interactive Monday outline, preserved times, optional facilitation prompts, no private data links and public Summer PD resource IDs.');
const {academyBusinessLinks}=await import('../src/academyBusinessData.js');
assert.equal(academyBusinessLinks.length,4);assert(academyBusinessLinks.every(x=>x.url.includes('docs.google.com/forms/d/e/')&&x.url.includes('/viewform')));assert(academyBusinessLinks.every(x=>!/[?&](?:entry\.|edit2|token=)/.test(x.url)));assert.equal(academyBusinessLinks.find(x=>x.id==='exam').audience,'Students');assert(academyBusinessLinks.find(x=>x.id==='exam').note.includes('October 30'));assert.equal(monday.agenda[7][1],'Review software resources and next steps');assert(monday.agenda[6][1].includes('MYP, DP, AniVation'));assert.equal(monday.agenda.at(-1)[0],'8:55–9:00');
console.log('PASS exact responder-only Academy Business links, student-registration warning, neutral software discussion and balanced agenda close.');

const businessData=await import('../src/academyBusinessData.js');
assert.deepEqual(Object.keys(businessData),['academyBusinessLinks']);
const businessSource=readFileSync('src/AcademyBusiness.jsx','utf8');
assert(businessSource.includes('Review software resources and next steps'));
assert(!businessSource.includes('<dl>'));
console.log('PASS Academy Business includes forms and a neutral discussion prompt only.');

// The whole-day Tuesday plan keeps one unit thread and resource shelves only for working blocks.
const tuesday=plcMeetings.find(x=>x.id==='nov10-pd');
const canonicalTimes=['8:30–8:45','8:45–9:10','9:10–9:35','9:35–9:45','9:45–10:15','10:15–10:45','10:45–11:00','11:00–11:10','11:10–11:30','11:30–11:45','11:45–noon','Noon–1:00','1:00–2:00','2:00–2:10','2:10–2:40','2:40–3:10','3:10–3:30'];
assert.deepEqual(tuesday.agenda.map(([time])=>time),canonicalTimes);
assert.equal(tuesday.location,'H104');
assert(!/proposed/i.test(JSON.stringify(tuesday)));
const resourceTemp=mkdtempSync(join(tmpdir(),'tuesday-resource-check-'));
try {
 const outfile=join(resourceTemp,'resources.cjs');
 await build({entryPoints:['src/TuesdayResources.jsx'],bundle:true,platform:'node',format:'cjs',outfile,logLevel:'silent'});
 const {tuesdayDayResources,tuesdayDayOutputs}=createRequire(import.meta.url)(outfile);
 const workingTimes=tuesday.agenda.filter(([,title])=>!['Lunch','Break'].includes(title)).map(([time])=>time);
 assert.deepEqual(Object.keys(tuesdayDayResources),workingTimes);
 assert.deepEqual(Object.keys(tuesdayDayOutputs),workingTimes);
 const privateLinks=Object.entries(tuesdayDayResources).flatMap(([time,links])=>links.filter(link=>link[3]==='private').map(link=>[time,link]));
 assert.equal(privateLinks.length,1);const [privateTime,privateResource]=privateLinks[0];assert.equal(privateTime,'1:00–2:00');assert.equal(new URL(privateResource[0]).hostname,'docs.google.com');assert(new URL(privateResource[0]).pathname.startsWith('/spreadsheets/d/'));assert.equal(privateResource[1],'Sam’s private dashboard');assert.equal(privateResource[2],'Historical October 28 snapshot. Sam’s school sign-in required; teachers are not automatically granted access. Keep confidential content off the projector.');assert.equal(privateResource[3],'private');
 const legacy=readFileSync('src/legacy.js','utf8');
 assert(legacy.includes('November 10 lab · 9:45–10:15 a.m.'));
 assert(!legacy.includes('2:10–2:40 p.m.'));
 assert(legacy.includes('This separate six-activity tool is not the timed whole-day agenda.'));
} finally {rmSync(resourceTemp,{recursive:true,force:true})}
console.log('PASS Tuesday canonical 17-block agenda, 14 matching output/resource shelves, break/lunch exclusions and unchanged private dashboard access.');
