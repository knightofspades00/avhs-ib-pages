import assert from 'node:assert/strict';
import {readFileSync,readdirSync,statSync} from 'node:fs';
import {pdArchive,filterArchive} from '../src/pdArchiveData.js';
import {recruitmentActivity} from '../src/recruitmentData.js';
const walk=p=>readdirSync(p).flatMap(n=>{const q=`${p}/${n}`;return statSync(q).isDirectory()?walk(q):[q]});
for(const f of [...walk('src'),'index.html']){const s=readFileSync(f,'utf8');const publicText=s.replaceAll('https://docs.google.com/forms/d/e/1FAIpQLSfmgxGVopiFc4bV-rcK57VSlPB9Tg-vZKVpr9B1Qhej8T5I6A/viewform','').replaceAll('https://docs.google.com/forms/d/e/1FAIpQLSeApPyfCrK3gAb0JSWNi-nSuJnlcBR8npN_oPXoi5_UmN1S7A/viewform?usp=send_form','');assert(!/(?:docs|drive|mail)\.google\.com|appgprj_|sourceMappingURL|Bearer /.test(publicText),`Private reference: ${f}`);assert(!/localStorage|sessionStorage|fetch\(|XMLHttpRequest|sendBeacon/.test(s),`Unexpected storage/network: ${f}`)}
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
assert(readFileSync('src/main.jsx','utf8').includes('Global Leadership'));
console.log('PASS GLA theme and motion safeguards.');

assert(readFileSync('src/SessionHub.jsx','utf8').includes('not the official staff agenda'));assert(readFileSync('src/main.jsx','utf8').includes("route==='sessions'?<SessionHub/>"));console.log('PASS presentation hub routes.');

import {teachingMaps,tokLenses,mapText} from '../src/teachingMapsData.js';
assert.deepEqual(Object.keys(teachingMaps),['atl','tok','design']);
assert.equal(teachingMaps.atl.nodes.length,5);assert.equal(teachingMaps.atl.nodes.flatMap(n=>n.clusters).length,10);
assert.deepEqual(teachingMaps.atl.nodes.find(n=>n.id==='social').clusters,['Collaboration']);
assert.equal(teachingMaps.tok.nodes.length,5);assert.equal(tokLenses.length,4);assert(teachingMaps.tok.nodes.every(n=>tokLenses.every(([id])=>n.lenses[id])));
assert.deepEqual(teachingMaps.design.nodes.map(n=>n.code),['A','B','C','D']);assert(teachingMaps.design.note.includes('A Planning, B Applying skills and C Reflecting'));
for(const kind of Object.keys(teachingMaps)){const txt=mapText(kind);assert(!txt.includes('undefined'));assert(teachingMaps[kind].nodes.every(n=>txt.includes(n.label)));assert(txt.includes('Public IB sources'));}
const maps=readFileSync('src/TeachingMaps.jsx','utf8');assert(maps.includes('aria-pressed'));assert(maps.includes('Read the complete text version'));assert(!readFileSync('src/StudioHero.jsx','utf8').includes('liquid'));assert(readFileSync('src/main.jsx','utf8').includes("route==='maps'?"));
console.log('PASS ATL 5/10 mapping, TOK 5/4, Design A–D, PP distinction, exports and semantic controls.');

const tactile=readFileSync('src/TactileSurface.jsx','utf8'),depthStyle=readFileSync('src/tactile.css','utf8');
assert(tactile.includes('requestAnimationFrame'));assert(tactile.includes('cancelAnimationFrame'));assert(tactile.includes("e.pointerType!=='mouse'"));assert(tactile.includes('prefers-reduced-motion'));assert(tactile.includes("attributeFilter:['data-motion']"));assert(depthStyle.includes('translateZ(26px)'));assert(depthStyle.includes('@media(hover:none)'));assert(depthStyle.includes('html[data-motion=off]'));
console.log('PASS tactile depth, pointer gating, frame cancellation and reduced-motion controls.');

import {calendarEntries,calendarNotes,calendarReferences,filterCalendar,calendarText} from '../src/ibCalendarData.js';
assert.equal(calendarEntries.length,42);assert.equal(new Set(calendarEntries.map(r=>r.id)).size,42);assert(calendarEntries.every(r=>r.url.startsWith('https://')&&/^202[67]-\d\d-\d\d$/.test(r.date)));assert.equal(filterCalendar(calendarEntries,{programme:'MYP'}).length,1);assert.equal(filterCalendar(calendarEntries,{programme:'Schoolwide'}).length,14);assert.equal(filterCalendar(calendarEntries,{programme:'IB'}).length,28);assert.equal(filterCalendar(calendarEntries,{programme:'DP',search:'Extended essay'})[0].date,'2027-03-15');assert.equal(calendarNotes.length,2);assert.equal(calendarReferences.length,9);assert(!calendarText(calendarEntries).includes('undefined'));
import {aiSources,aiTeacherMoves,teacherPrompt} from '../src/aiAndIBData.js';
assert.equal(aiTeacherMoves.length,4);assert(aiTeacherMoves.every(m=>teacherPrompt(m,'DP').includes('Diploma Programme')&&teacherPrompt(m).includes('Do not upload IB copyrighted materials')));assert(aiSources.policy.includes('ibo.org'));assert(readFileSync('src/AIAndIB.jsx','utf8').includes('Citation')===false);assert(readFileSync('src/AIAndIB.jsx','utf8').includes('A citation does not make'));
console.log('PASS 42 public calendar records, date filters/exports and safe teacher prompts.');

import {plcMeetings,meetingNorms,meetingStandards,staffSignIn,filterMeetings,blankAgendaText} from '../src/plcMeetingData.js';
assert.equal(new Set(plcMeetings.map(m=>m.id)).size,plcMeetings.length);assert.equal(plcMeetings.length,8);assert.equal(meetingStandards.focusAreas.length,5);assert.equal(meetingStandards.roles.length,4);assert.equal(meetingNorms.length,6);assert.equal(meetingStandards.values.length,9);assert.equal(staffSignIn.links.length,2);assert(staffSignIn.links.every(l=>l.url.includes('/forms/d/e/')&&l.url.includes('/viewform')));assert.equal(filterMeetings(plcMeetings,{type:'IB PLC'}).length,3);assert.equal(filterMeetings(plcMeetings,{search:'NotebookLM'})[0].date,'2026-07');assert(!blankAgendaText().includes('undefined'));assert(blankAgendaText().includes('Equity'));assert(readFileSync('src/main.jsx','utf8').includes("route==='pd'?<PDArchive part={part}/>"));console.log('PASS dated meeting archive, norms, values, agenda export and verified responder-only forms.');
