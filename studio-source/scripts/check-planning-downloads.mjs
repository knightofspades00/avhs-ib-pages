import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {submissionDeadlines,programmeRequirements} from '../src/submissionChecklistsData.js';
const expected={
 'avhs-daily-lesson-planner.pdf':'a88b8f1b39905f4a6ac652f105f79a4f41856398ec8ff8b558fee3bb1f7b5563',
 'avhs-myp-unit-organizer.pdf':'eb24eb060f18ed3f0b4c7ee224e438909dcb9d1faa993162c62b166b9a536a1c',
 'avhs-plc-meeting-agenda.pdf':'b58521f3dde0ac0d9fa389429d03860817e18565ec5d14f71da65a94c1b0e028'
};
assert.deepEqual(readdirSync('public/downloads').sort(),Object.keys(expected).sort());
for(const[file,hash]of Object.entries(expected)){const bytes=readFileSync('public/downloads/'+file);assert(bytes.subarray(0,5).toString()==='%PDF-');assert.equal(createHash('sha256').update(bytes).digest('hex'),hash);const raw=bytes.toString('latin1');assert(raw.includes('/AcroForm'));assert(!/\/JavaScript|\/SubmitForm|\/Launch/.test(raw));assert(readFileSync('src/PlanningDownloads.jsx','utf8').includes(file));}
for(const id of ['early-written','early-arts','arts-ia','myp-upload','late-arts'])assert(submissionDeadlines.some(x=>x.id===id));
const main=readFileSync('src/main.jsx','utf8');assert(main.includes("route==='downloads'"));assert(main.includes("route==='checklists'"));assert(main.includes('setChecklistNotes'));assert(main.includes('some(hasDraft)'));
assert(programmeRequirements.find(x=>x.id==='ee-2027').text.includes('up to 500 words'));
console.log('PASS three verified blank fillable PDFs, inert form assets, calendar checklist targets, routes and EE word-limit clarity.');
