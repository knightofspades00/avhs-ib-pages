import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createRequire} from 'node:module';
import {build} from 'esbuild';
import {historyCourses,historySections,historyDraftText} from '../src/historyGuideData.js';
import {breadcrumbsFor} from '../src/navigationData.js';
import {findTools} from '../src/facultyToolsData.js';
assert.equal(historySections.length,5);
assert.equal(historyCourses['2027'].assessment[2][1],'Regional-option essays · 2 hours 30 minutes');
assert.equal(historyCourses['2028'].assessment[2][1],'Regional study · 2 hours');
for(const year of ['2027','2028']){const text=historyDraftText(year,'Keep this exact draft: <&>');assert(text.includes('Keep this exact draft: <&>'));assert(text.includes(year+' · HL'));assert(text.includes(historyCourses[year].source));}
assert.deepEqual(breadcrumbsFor('history/notes').map(x=>x.label),['Home','History guide','My next step']);
assert(findTools('history').some(x=>x[0]==='#history'));
const css=readFileSync('src/commonsCleanup.css','utf8');assert(css.includes('.sidebar details.commons-nav-group{background:#151b18'));
const main=readFileSync('src/main.jsx','utf8');assert(main.includes('historyNotes,...Object.values(notes)'));assert(main.includes('summary'));assert(main.includes('notes={historyNotes}'));assert(!/localStorage|sessionStorage|fetch\(/.test(readFileSync('src/HistoryGuide.jsx','utf8')));
const temp=mkdtempSync(join(tmpdir(),'commons-cleanup-'));
try{
 const outfile=join(temp,'render.cjs');await build({stdin:{contents:`import React from 'react';import{renderToStaticMarkup}from'react-dom/server';import Home from './src/CommonsHome.jsx';import History from './src/HistoryGuide.jsx';import Forms from './src/PlanningDownloads.jsx';export const home=renderToStaticMarkup(React.createElement(Home,{path:'all',setPath:()=>{}}));export const forms=renderToStaticMarkup(React.createElement(Forms));export const guides=['2027','2028'].flatMap(year=>['teach','assess','prepare','resources','notes'].map(part=>({year,part,html:renderToStaticMarkup(React.createElement(History,{year,part,notes:'A <script> note',setYear:()=>{},setNotes:()=>{}}))})));`,resolveDir:process.cwd()},bundle:true,platform:'node',format:'cjs',outfile,loader:{'.css':'empty'},logLevel:'silent'});
 const rendered=createRequire(import.meta.url)(outfile);
 for(const href of ['#history','#examples','#dates','#pd/nov10-pd','#pd/nov09-mou','#downloads','#new'])assert(rendered.home.includes('href="'+href+'"'),href);
 assert(!rendered.home.includes('Today’s'));assert(rendered.home.includes('Past session'));assert(rendered.home.includes('Explore teaching connections'));
 assert(rendered.forms.includes('Download blank template (PDF)'));assert(rendered.forms.includes('Drafts are not copied into the blank PDFs'));
 for(const {year,part,html} of rendered.guides){assert(!html.includes('undefined'));assert(html.includes('HL ONLY'));assert(html.includes('No student')||part!=='notes');assert(html.includes('aria-current="page"'));if(part==='notes'){assert(html.includes('A &lt;script&gt; note'));assert(html.includes('disappear on reload'));}if(part==='assess')assert(html.includes(year==='2027'?'2 hours 30 minutes':'1 hour 45 minutes'));}
}finally{rmSync(temp,{recursive:true,force:true})}
console.log('PASS everyday Home, retained routes, 10 History cohort/section states, truthful draft exports, source links, escaping and no added storage.');
