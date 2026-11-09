import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync,rmSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';
import {newcomerSources,newcomerProgrammes,newcomerSteps,newcomerQuestions,newcomerTerms,newcomerText} from '../src/newTeacherData.js';
import {breadcrumbsFor} from '../src/navigationData.js';
assert.deepEqual(Object.keys(newcomerProgrammes),['MYP','DP']);assert.equal(newcomerSteps.length,3);assert.equal(newcomerQuestions.length,5);assert.equal(newcomerTerms.length,10);assert.equal(breadcrumbsFor('new').at(-1).label,'New to IB');
for(const s of Object.values(newcomerSources))assert(/^https:\/\/(?:www\.)?ibo\.org\//.test(s.url));
for(const id of Object.keys(newcomerProgrammes)){const p=newcomerProgrammes[id];assert.equal(p.points.length,3);assert(p.sources.every(x=>newcomerSources[x]));const t=newcomerText(id);assert(t.includes(p.name.toUpperCase()));assert(t.includes('not a school compliance checklist'));assert(t.includes('2027'));assert(!t.includes('undefined'));}
const source=readFileSync('src/NewTeacher.jsx','utf8');assert(source.includes('aria-pressed={programme===id}'));assert(source.includes('original')||source.includes('Original teacher orientation'));assert(source.includes('not a training or completion record'));assert(source.includes('IB terms, in plain language'));
const legacy=readFileSync('src/legacy.js','utf8');assert(legacy.includes('steps.slice(0,6)'));assert(legacy.includes('steps.slice(6)'));assert(legacy.includes('of 6 core activities'));assert(legacy.includes('of 2 optional extensions'));assert(legacy.includes('aria-valuemax="6"'));assert(!legacy.includes('state.done.size/8'));
const lessons=readFileSync('src/LessonExamples.jsx','utf8'),meeting=readFileSync('src/PDArchive.jsx','utf8'),style=readFileSync('src/naturalUX.css','utf8');assert(lessons.includes('lesson-draft-notice'));assert(lessons.includes('Download to keep your changes.'));assert(style.includes('.lesson-draft-notice{font-size:14px'));assert(lessons.includes('setPickerOpen(true)'));assert(lessons.includes('setPickerOpen(false)'));assert(meeting.includes('Choose another meeting'));assert(meeting.includes('setPickerOpen(false)'));
const temp=mkdtempSync(join(tmpdir(),'new-teacher-ssr-'));
try{const outfile=join(temp,'render.cjs');await build({stdin:{contents:"import React from'react';import{renderToStaticMarkup}from'react-dom/server';import NewTeacher from'./src/NewTeacher.jsx';export const render=()=>renderToStaticMarkup(React.createElement(NewTeacher));",resolveDir:fileURLToPath(new URL('..',import.meta.url))},bundle:true,platform:'node',format:'cjs',loader:{'.css':'empty'},outfile,logLevel:'silent'});const html=createRequire(import.meta.url)(outfile).render();assert.equal((html.match(/<h1>/g)||[]).length,1);assert.equal((html.match(/aria-pressed=/g)||[]).length,2);assert(html.includes('Middle Years Programme'));assert(html.includes('required independent project'));assert(html.includes('Download this MYP orientation'));assert(html.includes('IB terms, in plain language'));assert(!html.includes('undefined'));}finally{rmSync(temp,{recursive:true,force:true})}
console.log('PASS source-grounded new-teacher orientation, glossary, downloads, detail-first chooser controls, readable draft notice and separate core/optional progress.');
assert(style.includes('.software-review,.new-glossary,.new-programme details,.agenda-full-outline){background:#11110f'));
console.log('PASS explicit dark disclosure surfaces for new orientation, agenda and software tools.');
