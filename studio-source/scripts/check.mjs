import assert from 'node:assert/strict';
import {readFileSync,readdirSync,statSync} from 'node:fs';
import {pdArchive,filterArchive} from '../src/pdArchiveData.js';
import {recruitmentActivity} from '../src/recruitmentData.js';
const walk=p=>readdirSync(p).flatMap(n=>{const q=`${p}/${n}`;return statSync(q).isDirectory()?walk(q):[q]});
for(const f of [...walk('src'),'index.html']){const s=readFileSync(f,'utf8');assert(!/(?:docs|drive|mail)\.google\.com|appgprj_|sourceMappingURL|Bearer /.test(s),`Private reference: ${f}`);assert(!/localStorage|sessionStorage|fetch\(|XMLHttpRequest|sendBeacon/.test(s),`Unexpected storage/network: ${f}`)}
assert.equal(pdArchive.length,6);assert(pdArchive.every(x=>x.url===null));assert.equal(filterArchive(pdArchive,{topic:'Technology'}).length,1);assert.equal(recruitmentActivity.documentUrl,null);assert.equal(recruitmentActivity.steps.length,3);assert.equal(recruitmentActivity.subjectSections.length,8);
console.log('PASS public source privacy, archive, recruitment and no app storage/network.');

import {researchBriefs} from '../src/researchData.js';
assert.equal(researchBriefs.length,30);
assert(readFileSync('src/main.jsx','utf8').includes('function Legacy('));
assert(readFileSync('src/main.jsx','utf8').includes('createRoot(document'));

import {ppCriteria,ppRoles,ppSources,ppPlanText} from '../src/personalProjectData.js';
assert.deepEqual(ppCriteria.map(c=>c.id),['A','B','C']);assert.deepEqual(ppCriteria.map(c=>c.strands.length),[3,2,2]);
assert(ppSources.every(s=>s.url.startsWith('https://')));assert.equal(ppRoles.supervisor.checks.length,6);assert.equal(ppRoles.lead.checks.length,6);
const test=ppPlanText({'supervisor-purpose':'Prepare a general coaching question',checks:{'supervisor-guide':true}});assert(test.includes('[x] Locate'));assert(test.includes('Prepare a general coaching question'));assert(!test.includes('undefined'));assert(test.includes('No verified local deadlines'));
console.log('PASS personal-project role tools, A/B/C mapping and export.');
const theme=readFileSync('src/glaTheme.css','utf8');assert(theme.includes('prefers-reduced-motion:reduce'));assert(theme.includes('background:#090909'));assert(theme.includes('backdrop-filter:none'));
const hero=readFileSync('src/StudioHero.jsx','utf8');assert(hero.includes('requestAnimationFrame'));assert(hero.includes('IntersectionObserver'));assert(hero.includes("e.pointerType==='touch'"));
assert(readFileSync('src/main.jsx','utf8').includes('Global Leadership'));
console.log('PASS GLA theme and motion safeguards.');

assert(readFileSync('src/SessionHub.jsx','utf8').includes('not the official staff agenda'));assert(readFileSync('src/main.jsx','utf8').includes("route==='sessions'?<SessionHub/>"));console.log('PASS presentation hub routes.');
