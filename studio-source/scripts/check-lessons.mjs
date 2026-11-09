import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {lessonExamples} from '../src/lessonExamplesData.js';
import {filterLessons,minuteTotal,lessonText} from '../src/lessonExamplesUtils.js';
assert.equal(lessonExamples.length,14);assert.equal(new Set(lessonExamples.map(x=>x.id)).size,14);
assert.equal(filterLessons(lessonExamples,{programme:'MYP'}).length,8);assert.equal(filterLessons(lessonExamples,{programme:'DP'}).length,6);
for(const category of ['Communication','Social','Self-management','Research','Thinking'])assert(filterLessons(lessonExamples,{atl:category}).length>0,category);
for(const area of ['history','human-sciences','natural-sciences','arts','mathematics'])assert(filterLessons(lessonExamples,{area,programme:'DP'}).length>0,area);
assert.equal(filterLessons(lessonExamples,{subject:'Design'}).length,1);
for(const e of lessonExamples){assert(e.id&&e.title&&e.subject&&e.goal&&e.question);assert.equal(e.agenda.length,6);assert.equal(minuteTotal(e),50);assert(e.prepare.length>=2);assert(e.followUps.length>=2);assert(e.supports.length>=2);assert(e.sources.length>=1);assert(e.sources.every(s=>s.label&&s.url.startsWith('https://')));assert(e.atl.every(s=>s.category&&s.action));assert(e.agenda.every(p=>p.minutes>0&&p.title&&p.teacher&&p.students&&p.question&&p.evidence));assert(['title','brief','task','audience','revision','evidence'].every(k=>e.project[k]));const text=lessonText(e,{goal:'Synthetic teacher goal',context:'Synthetic unit context',minutes0:10});assert(text.includes('Synthetic teacher goal'));assert(text.includes('Synthetic unit context'));assert(text.includes(e.project.revision));assert(text.includes(e.followUps[0]));assert(!text.includes('undefined'));assert.equal(minuteTotal(e,{minutes0:10}),50-e.agenda[0].minutes+10);}
assert.equal(filterLessons(lessonExamples,{search:'zzzz-no-match'}).length,0);
const app=readFileSync('src/main.jsx','utf8');for(const route of ['examples','projects','supports'])assert(app.includes(`route==='${route}'`));
assert(readFileSync('src/TeachingMaps.jsx','utf8').includes('Open a lesson using this idea'));
console.log('PASS 14 unique lessons, 8 MYP/6 DP, six phases/50 minutes each, ATL/TOK/Design deep-link coverage, full exports and routes.');
