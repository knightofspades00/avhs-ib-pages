import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createRequire} from 'node:module';
import {build} from 'esbuild';
import {collaborationDayBlocks,subjectAIExamples,programmeAnchors,exampleCurriculumUrl,designNoteFields} from '../src/collaborationDayData.js';
import {plcMeetings} from '../src/plcMeetingData.js';
const meeting=plcMeetings.find(x=>x.id==='nov10-pd');
assert.deepEqual(collaborationDayBlocks.map(x=>x.time),meeting.agenda.map(x=>x[0]));
assert.equal(collaborationDayBlocks.length,17);assert.equal(collaborationDayBlocks.reduce((n,x)=>n+x.minutes,0),420);
assert.equal(collaborationDayBlocks.filter(x=>x.phase==='plc').reduce((n,x)=>n+x.minutes,0),60);
assert.equal(subjectAIExamples.length,9);assert.equal(designNoteFields.length,11);
for(const example of subjectAIExamples){for(const key of ['use','check','thinking','noAI','knowledge'])assert(example[key]?.length>30);for(const p of ['MYP','DP','CTE']){const href=exampleCurriculumUrl(example,p);assert(href===null||href.startsWith('https://www.ibo.org/'))}}
assert.equal(exampleCurriculumUrl(subjectAIExamples.at(-1),'DP'),null);assert(programmeAnchors.CTE.text.includes('Career-related Programme'));
const component=readFileSync('src/CollaborationDay.jsx','utf8'),css=readFileSync('src/collaborationDay.css','utf8');
assert(component.includes('Curiosity is a compass.'));assert(component.includes('A starting perspective from Sam for discussion, not a measured finding'));assert(component.includes('Offer choice within the curriculum.'));assert(component.includes('no extra task or time block'));assert(component.includes('Deliberately flawed, fictional response'));assert(component.includes('Do not upload protected IB guides'));assert(component.includes('URL.revokeObjectURL'));assert(component.includes('beforeunload'));
assert(!/localStorage|sessionStorage|fetch\(/.test(component));assert(!/Sosa|evaluat(?:es|ing) Sam|REVIEW DRAFT|NOT PUBLISHED/.test(component));
assert(css.includes('prefers-reduced-motion'));assert(css.includes('html[data-motion=off]'));assert(css.includes('focus-visible'));
const temp=mkdtempSync(join(tmpdir(),'collaboration-day-'));
try{const outfile=join(temp,'render.cjs');await build({stdin:{contents:"import React from 'react';import{renderToStaticMarkup}from'react-dom/server';import Day from './src/CollaborationDay.jsx';export default Array.from({length:17},(_,initialBlock)=>renderToStaticMarkup(React.createElement(Day,{initialBlock})));",resolveDir:process.cwd()},bundle:true,platform:'node',format:'cjs',outfile,loader:{'.css':'empty'},logLevel:'silent'});const html=createRequire(import.meta.url)(outfile).default;
for(let i=0;i<17;i++){assert(html[i].includes(collaborationDayBlocks[i].title.replaceAll('&','&amp;')));assert(html[i].includes('Download my design notes'));assert(!html[i].includes('<iframe'));const resources=(html[i].match(/class="presenter-inline-resources"/g)||[]).length;assert.equal(resources,[3,11,13].includes(i)?0:1,'Resources for '+collaborationDayBlocks[i].time);assert.equal(html[i].includes('Sam’s private dashboard'),i===12,'Private dashboard only in deep dive');}
assert(html[1].includes('A difference does not by itself establish a cause'));assert(html[0].includes('Comparison is the thief of joy'));assert(html[12].includes('PRIVATE · SCHOOL SIGN-IN'));assert(html[12].includes('Historical October 28 snapshot'));assert(html[12].includes('teachers are not automatically granted access'));
}finally{rmSync(temp,{recursive:true,force:true})}
console.log('PASS 17-block full day, visible PLC hour, afternoon data link, nine subject AI choices, curriculum boundaries, privacy and all rendered resource states.');
