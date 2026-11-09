import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {breadcrumbsFor,lessonNames,routeNames} from '../src/navigationData.js';
import {lessonExamples} from '../src/lessonExamplesData.js';
import {plcMeetings} from '../src/plcMeetingData.js';
const expected=(hash,labels)=>assert.deepEqual(breadcrumbsFor(hash).map(x=>x.label),labels);
expected('home',['Home']);expected('no-such-page',['Home']);
expected('maps/tok',['Home','Teaching diagrams','TOK areas of knowledge']);
expected('myp/unit',['Home','MYP unit planning','Unit organizer']);
expected('downloads/plc',['Home','Resource library','Planning forms','Meeting agenda']);
expected('recruitment',['Home','PD & PLC','November 9 · Academy MOU','Subject recruitment']);
expected('workshop/studio',['Home','PD & PLC','November 10 · Academy PD','Revise the task']);
for(const lesson of lessonExamples){assert.equal(lessonNames[lesson.id],lesson.title);assert.equal(breadcrumbsFor('examples/'+lesson.id).at(-1).label,lesson.title)}
for(const meeting of plcMeetings)assert.equal(breadcrumbsFor('pd/'+meeting.id).length,3);
for(const r of Object.keys(routeNames)){assert(breadcrumbsFor(r).every(x=>x.href.startsWith('#')))}
const main=readFileSync('src/main.jsx','utf8'),pageLinks=readFileSync('src/PageLinks.jsx','utf8'),crumbs=readFileSync('src/Breadcrumbs.jsx','utf8');
assert(main.includes('<Breadcrumbs hash={hash}'));assert(crumbs.includes('aria-label="Breadcrumb"'));assert(crumbs.includes('aria-current="page"'));assert(pageLinks.includes('e.preventDefault()'));assert(pageLinks.includes('node.focus({preventScroll:true})'));
assert(main.includes("id={'unit-'+title.toLowerCase()}"));
const meetings=readFileSync('src/PDArchive.jsx','utf8');for(const id of ['meeting-outcomes','meeting-agenda','meeting-activities','meeting-resources'])assert(meetings.includes('id="'+id+'"'));
assert(meetings.indexOf('className="plc-meetings"')<meetings.indexOf('className="plc-routine"'));
assert(readFileSync('src/LessonExamples.jsx','utf8').includes('Choose another lesson'));
assert(!readFileSync('src/legacy.js','utf8').includes('Still to organize.'));
console.log('PASS linked breadcrumbs, all dated/lesson detail paths, in-page jumps, workflow destinations and plain resource navigation.');
