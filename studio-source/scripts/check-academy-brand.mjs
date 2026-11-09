import assert from 'node:assert/strict';
import{readFileSync,mkdtempSync,rmSync}from'node:fs';
import{join}from'node:path';
import{tmpdir}from'node:os';
import{createHash}from'node:crypto';
import{createRequire}from'node:module';
import{fileURLToPath}from'node:url';
import{build}from'esbuild';
const main=readFileSync('src/main.jsx','utf8'),css=readFileSync('src/academyBrand.css','utf8'),source=readFileSync('src/GlobeConnections.jsx','utf8');
assert(main.includes('<GlobeConnections/>'));
assert(main.includes('Join a PD or PLC session')&&main.includes('Plan a lesson')&&main.includes('Get a planning form'));
assert(source.includes('aria-pressed={selected===x.id}')&&source.includes('aria-live="polite"')&&source.includes('aria-hidden="true"'));
assert(css.includes('.content[data-page] .globe-lenses button{min-height:46px}'));
assert(css.includes('prefers-reduced-motion:reduce')&&css.includes('html[data-motion=off]'));
assert(!/setInterval|requestAnimationFrame|fetch\(|localStorage/.test(source));
assert.equal(createHash('sha256').update(readFileSync('public/brand/gla-academy-logo.png')).digest('hex'),'bce131a935ec6728761b8c59d168fb51eb9df102a60cb178648a09fb6d0e0e60');
const temp=mkdtempSync(join(tmpdir(),'gla-brand-'));
try{const outfile=join(temp,'render.cjs');await build({stdin:{contents:"import React from'react';import{renderToStaticMarkup}from'react-dom/server';import GlobeConnections,{ConnectionGlobe,globeConnections}from'./src/GlobeConnections.jsx';export const records=globeConnections;export const html=renderToStaticMarkup(React.createElement(GlobeConnections));export const globes=globeConnections.map(x=>renderToStaticMarkup(React.createElement(ConnectionGlobe,{selected:x.id})));",resolveDir:fileURLToPath(new URL('..',import.meta.url))},bundle:true,platform:'node',format:'cjs',loader:{'.css':'empty'},outfile,logLevel:'silent'});const m=createRequire(import.meta.url)(outfile);assert.deepEqual(m.records.map(x=>x.id),['atl','tok','design']);assert(m.records.every(x=>x.link===`#maps/${x.id}`&&x.question&&x.practice));assert(m.records[2].practice.includes('distinct from Personal Project'));assert(m.records[1].practice.includes('DP TOK'));assert.equal((m.html.match(/aria-pressed=/g)||[]).length,3);assert(m.html.includes('Open the ATL diagram'));assert.equal(new Set(m.globes).size,3);assert(!m.html.includes('undefined'));}finally{rmSync(temp,{recursive:true,force:true})}
console.log('PASS original logo hash, retained Home paths, three teaching connections, React render, semantic controls and motion limits.');
