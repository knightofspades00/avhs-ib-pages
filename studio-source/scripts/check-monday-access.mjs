import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync,rmSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {createRequire} from 'node:module';
import {build} from 'esbuild';
import {plcMeetings,staffSignIn} from '../src/plcMeetingData.js';
const source=readFileSync('src/PDArchive.jsx','utf8');
assert(source.indexOf('<MondayAccess/>')<source.indexOf('<PageLinks label="In this meeting"'));
assert(source.indexOf('<MondayAccess/>')<source.indexOf('id="meeting-outcomes"'));
assert(source.includes("selected.id==='nov09-mou'&&<MondayAccess/>"));
assert(source.includes("['Sign-in & presentation','#meeting-access']"));
const monday=plcMeetings.find(m=>m.id==='nov09-mou');
assert.equal(monday.agenda.length,9);assert.equal(monday.location,'H103');
const temp=mkdtempSync(join(tmpdir(),'monday-access-'));
try {
 const outfile=join(temp,'render.cjs');
 await build({stdin:{contents:"import React from 'react';import{renderToStaticMarkup}from'react-dom/server';import MondayAccess from './src/MondayAccess.jsx';export default renderToStaticMarkup(React.createElement(MondayAccess));",resolveDir:process.cwd()},bundle:true,platform:'node',format:'cjs',outfile,logLevel:'silent'});
 const html=createRequire(import.meta.url)(outfile).default;
 assert(html.includes(staffSignIn.links[0].url));
 assert(html.includes('Many Hands Make Light Work'));
 assert(html.includes('Public viewing link pending.'));
 assert(html.includes('id="meeting-access" tabindex="-1"'));
 assert.equal((html.match(/<a /g)||[]).length,2);assert(html.includes('https://bit.ly/academyplcmou'));assert(html.includes('academy-mou-signin-qr.png'));
 assert(!/canva\.com|canva\.link|<button/.test(html));
 assert(html.includes('rel="noopener noreferrer"'));
} finally {rmSync(temp,{recursive:true,force:true});}
console.log('PASS Monday entry order, exact responder link, truthful non-clickable presentation, focus target and unchanged nine-block agenda.');
const {meetingLaunchLabel}=await import('../src/meetingPresenterData.js');
assert.equal(meetingLaunchLabel(new Date('2026-11-09T16:00:00Z')),"Today's meeting");
assert.equal(meetingLaunchLabel(new Date('2026-11-10T16:00:00Z')),'November 9 meeting');
const presenterTemp=mkdtempSync(join(tmpdir(),'monday-presenter-'));
try {
 const outfile=join(presenterTemp,'render.cjs');
 await build({stdin:{contents:"import React from 'react';import{renderToStaticMarkup}from'react-dom/server';import MeetingPresenter from './src/MeetingPresenter.jsx';export default renderToStaticMarkup(React.createElement(MeetingPresenter));",resolveDir:process.cwd()},bundle:true,platform:'node',format:'cjs',loader:{'.css':'empty'},outfile,logLevel:'silent'});
 const html=createRequire(import.meta.url)(outfile).default;
 assert(html.includes('Show join QR'));assert(html.includes('id="meeting-arrival"'));assert(html.includes('Open the meeting, then sign in.'));assert(html.includes('https://knightofspades00.github.io/avhs-ib-pages/studio/#pd/nov09-mou'));assert(html.includes('Exit presenter view'));assert(html.includes('href="#pd/nov09-mou"'));
 assert(html.includes('BLOCK 1 OF 9'));assert(html.includes('Next block'));assert(html.includes('disabled=""'));
 assert(!html.includes('agenda-runner-toolbar'));assert(html.includes('agenda-focus'));
 for(const [time,title] of monday.agenda){assert(html.includes(time));assert(html.includes(title));}
 assert(html.includes('id="academy-business-links"'));assert(html.includes('id="academy-software-review"'));
 assert(!/canva\.com|canva\.link/.test(html));
}finally{rmSync(presenterTemp,{recursive:true,force:true});}
const mainSource=readFileSync('src/main.jsx','utf8');
assert(mainSource.includes("route==='present'&&['nov09-mou','nov10-pd'].includes(part)"));assert(readFileSync('src/CommonsHome.jsx','utf8').includes('#pd/nov09-mou'));
assert(readFileSync('src/CommonsHome.jsx','utf8').includes('Past session'));
assert(!mainSource.includes('requestFullscreen'));
console.log('PASS date-aware Home label, bookmarkable presenter route, original schedule reuse, sequential controls, exit and supporting form targets.');

