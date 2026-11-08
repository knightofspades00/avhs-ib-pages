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
