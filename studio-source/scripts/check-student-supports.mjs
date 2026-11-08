import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { fictionalEvidence, evidenceCounts, evidenceClaims, supportMoves, supportProtocol, supportSources, supportPlanFields, supportPlanText } from '../src/studentSupportsData.js';

assert.equal(fictionalEvidence.expected, 30);
assert.equal(fictionalEvidence.checks.length, 3);
assert.equal(new Set(fictionalEvidence.checks.map(x => x.id)).size, 3);
for (const check of fictionalEvidence.checks) {
  const c = evidenceCounts(check);
  assert(c.meets >= 0 && c.meets <= c.observed);
  assert(c.observed <= c.total);
  assert.equal(c.meets + c.notYet, c.observed);
  assert.equal(c.observed + c.missing, c.total);
  assert(c.lowerPercent <= c.observedPercent && c.observedPercent <= c.upperPercent);
  assert(supportMoves.some(x => x.id === check.focus));
  assert.equal(evidenceClaims(check).length, 3);
  assert(evidenceClaims(check)[0].text.includes(`${c.meets} of ${c.observed}`));
}
assert.deepEqual(evidenceCounts(fictionalEvidence.checks[1]), { meets: 14, observed: 24, notYet: 10, missing: 6, total: 30, observedPercent: 58, coveragePercent: 80, lowerPercent: 47, upperPercent: 67 });
assert.equal(supportMoves.length, 3);
assert(supportMoves.every(x => x.scaffold.steps.length === 3 && x.extension.steps.length === 3));
assert(supportMoves.every(x => x.scaffold.agenda && x.extension.agenda && x.goal && x.check));
assert.equal(supportProtocol.length, 5);
assert.equal(supportProtocol.reduce((sum, x) => sum + parseInt(x.time, 10), 0), 15);
assert.equal(supportPlanFields.length, 3);
assert.deepEqual(supportSources.map(x => x.url), ['https://udlguidelines.cast.org/', 'https://intensiveintervention.org/data-based-individualization/progress-monitoring', 'https://studentprivacy.ed.gov/content/disclosure-avoidance']);
for (const move of supportMoves) for (const evidence of fictionalEvidence.checks) {
  const exported = supportPlanText({ goal: 'Plan a comparable task.', move: 'Model the connection.', review: 'Check during the next lesson.' }, move.id, evidence.id);
  assert(exported.includes('Plan a comparable task.'));
  assert(exported.includes(move.scaffold.title) && exported.includes(move.extension.title));
  assert(exported.includes(evidence.criterion));
  assert(!exported.includes('undefined'));
  assert(supportSources.every(x => exported.includes(x.url)));
  assert(exported.includes('not AVHS records') && exported.includes('not before-and-after results'));
}
assert(!supportPlanText({}, 'unknown', 'unknown').includes('undefined'));
console.log('PASS fictional counts, denominators, missingness, claims, support options, protocol and all export selections.');

const component = readFileSync(new URL('../src/StudentSupports.jsx', import.meta.url), 'utf8');
assert(component.includes('aria-pressed') && component.includes('role="status"'));
assert(component.includes('aria-describedby') && component.includes('scope="col"'));
assert(component.includes('Do not enter names, grades, disability details, individual cases, student work, or private links.'));
assert(component.includes('beforeunload') && component.includes('URL.revokeObjectURL'));
for (const file of ['StudentSupports.jsx', 'studentSupportsData.js']) {
  const source = readFileSync(new URL(`../src/${file}`, import.meta.url), 'utf8');
  assert(!/localStorage|sessionStorage|fetch\(|XMLHttpRequest|sendBeacon|indexedDB|WebSocket/.test(source));
  assert(!/(?:docs|drive|mail)\.google\.com|Bearer /.test(source));
}
console.log('PASS semantic controls, privacy boundaries, temporary notes and no application storage/network.');

const temporary = mkdtempSync(join(tmpdir(), 'supports-ssr-'));
try {
  const output = join(temporary, 'render.cjs');
  const root = fileURLToPath(new URL('..', import.meta.url));
  await build({
    stdin: { contents: "import React from 'react'; import {renderToStaticMarkup} from 'react-dom/server'; import StudentSupports from './src/StudentSupports.jsx'; export const render = () => renderToStaticMarkup(React.createElement(StudentSupports));", resolveDir: root },
    bundle: true, platform: 'node', format: 'cjs', loader: { '.css': 'empty' }, outfile: output, logLevel: 'silent',
  });
  const html = createRequire(import.meta.url)(output).render();
  assert(html.includes('No AVHS records'));
  assert(html.includes('14') && html.includes('58% of observed responses') && html.includes('24/30 (80%)'));
  assert.equal((html.match(/<textarea /g) || []).length, 3);
  assert.equal((html.match(/<h1>/g) || []).length, 1);
  assert.equal((html.match(/<caption>/g) || []).length, 1);
  assert(html.includes('Scaffold, extension, and place in the agenda'));
  assert(html.includes('Download plan (.txt)'));
  console.log('PASS bundled React server render, initial evidence, table, notes, source links and download control.');
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
