import React, { useEffect, useId, useState } from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, Check, ClipboardCheck, Download, Info, Layers, MessageSquare, ShieldCheck, Target } from 'lucide-react';
import { fictionalEvidence, evidenceCounts, evidenceClaims, supportMoves, supportProtocol, supportSources, supportPlanFields, supportPlanText } from './studentSupportsData.js';
import './studentSupports.css';

function SourceLink({ source }) {
  return <article><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}<ArrowUpRight size={16} aria-hidden="true"/><span className="sr-only"> (opens a new tab)</span></a><p>{source.note}</p></article>;
}

export default function StudentSupports({ notes, setNotes }) {
  const prefix = useId();
  const [localNotes, setLocalNotes] = useState({});
  const [evidenceId, setEvidenceId] = useState('reasoning');
  const [claimId, setClaimId] = useState(null);
  const [moveId, setMoveId] = useState('reasoning');
  const [downloadStatus, setDownloadStatus] = useState('');
  const controlled = notes != null && typeof setNotes === 'function';
  const plan = controlled ? notes : localNotes;
  const updatePlan = controlled ? setNotes : setLocalNotes;
  const evidence = fictionalEvidence.checks.find(x => x.id === evidenceId);
  const counts = evidenceCounts(evidence);
  const claims = evidenceClaims(evidence);
  const selectedClaim = claims.find(x => x.id === claimId);
  const move = supportMoves.find(x => x.id === moveId);
  const hasNotes = supportPlanFields.some(field => String(plan[field.id] || '').trim());

  useEffect(() => {
    if (!hasNotes) return;
    const warn = event => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [hasNotes]);

  function jump(id) {
    const target = document.getElementById(`${prefix}-${id}`);
    target?.scrollIntoView({ block: 'start', behavior: 'instant' });
    target?.focus({ preventScroll: true });
  }
  function edit(id, value) {
    updatePlan({ ...plan, [id]: value });
    setDownloadStatus('');
  }
  function chooseMove(id) {
    setMoveId(id);
    setDownloadStatus('');
  }
  function download() {
    let url;
    try {
      url = URL.createObjectURL(new Blob([supportPlanText(plan, moveId, evidenceId)], { type: 'text/plain;charset=utf-8' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'student-supports-lesson-plan.txt';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setDownloadStatus('Plan download requested. Check your browser downloads.');
    } catch {
      setDownloadStatus('The download could not start. Copy your general preparation notes before leaving this tab.');
    } finally {
      if (url) setTimeout(() => URL.revokeObjectURL(url), 5000);
    }
  }

  return <div className="supports-page">
    <header className="supports-heading">
      <div><p className="eyebrow">STUDENT SUPPORTS & DATA</p><h1>Keep the challenge.<br/><em>Widen the way in.</em></h1><p>Read evidence carefully. Remove a task barrier. Plan support and enrichment toward the same meaningful goal.</p></div>
      <div className="supports-heading-mark" aria-hidden="true"><Layers size={48} strokeWidth={1}/><span>NOTICE<br/>DESIGN<br/>REVISIT</span></div>
    </header>

    <aside className="supports-boundary" aria-label="Data and privacy boundaries">
      <ShieldCheck size={24} aria-hidden="true"/>
      <div><h2>Teaching tools, not student records.</h2><div className="supports-status"><span>Fictional examples only</span><span>No live connection</span><span>No AVHS records</span></div><p>These counts do not describe AVHS students or outcomes. This public page does not connect to a student information system, ingest files, or use AI to analyze learners. Use school-approved systems for any real student-level review. It does not diagnose, assign grades, or determine services or eligibility.</p></div>
    </aside>

    <nav className="supports-route" aria-label="On this page">
      {[['evidence', '01', 'Read the evidence'], ['moves', '02', 'Design the response'], ['plan', '03', 'Plan the next check']].map(([id, number, label]) => <button key={id} onClick={() => jump(id)}><span>{number}</span>{label}<ArrowRight size={16} aria-hidden="true"/></button>)}
    </nav>

    <section className="supports-section" aria-labelledby={`${prefix}-evidence`}>
      <div className="supports-section-title"><div><p className="eyebrow">01 · EVIDENCE BEFORE INFERENCE</p><h2 id={`${prefix}-evidence`} tabIndex={-1}>What does this check actually show?</h2></div><span className="supports-badge">FICTIONAL DATA</span></div>
      <p className="supports-lead">{fictionalEvidence.context} Choose a feature, then test a claim about the evidence.</p>
      <div className="supports-select" role="group" aria-label="Choose a fictional evidence check">{fictionalEvidence.checks.map(check => <button key={check.id} aria-pressed={evidenceId === check.id} onClick={() => { setEvidenceId(check.id); setClaimId(null); setDownloadStatus(''); }}><Target size={16} aria-hidden="true"/>{check.label}</button>)}</div>

      <div className="supports-evidence-layout">
        <article className="supports-evidence-card">
          <div className="supports-card-overline"><span>ONE PRACTICE CHECKPOINT</span><span>30 fictional learners</span></div>
          <h3>{evidence.label}</h3><p className="supports-criterion"><strong>Feature:</strong> {evidence.criterion}</p>
          <dl className="supports-counts">
            <div><dt>Feature visible</dt><dd>{counts.meets}<span> / {counts.observed}</span><small>{counts.observedPercent}% of observed responses</small></dd></div>
            <div><dt>Not yet visible</dt><dd>{counts.notYet}<span> / {counts.observed}</span><small>Observed responses without the feature</small></dd></div>
            <div className="supports-missing"><dt>Missing evidence</dt><dd>{counts.missing}<span> / {counts.total}</span><small>Of all expected checks; not scored as zero</small></dd></div>
          </dl>
          <div className="supports-coverage"><ClipboardCheck size={18} aria-hidden="true"/><p><strong>Coverage: {counts.observed}/{counts.total} ({counts.coveragePercent}%).</strong> The feature rate uses only observed responses. Missing checks are excluded from that denominator.</p></div>
          <details className="supports-details"><summary>How could missing evidence change the picture?</summary><p>Of the whole fictional class, {counts.meets}/{counts.total} are known to show this feature. If none of the missing checks showed it, the class-wide rate would be {counts.lowerPercent}%. If all did, it would be {counts.upperPercent}%. This is a possible range under those assumptions, not an estimate of what the missing responses would show.</p><p>All percentages are rounded to the nearest whole number. Keep the counts and denominators when discussing results.</p></details>
        </article>

        <article className="supports-claim-card">
          <p className="eyebrow">TRY AN INTERPRETATION</p><h3>Which claims can the evidence support?</h3><p>Select a statement to inspect its reasoning. This is a practice check, not a test score.</p>
          <div className="supports-claim-options" role="group" aria-label="Inspect an evidence claim">{claims.map((claim, index) => <button key={claim.id} aria-pressed={claimId === claim.id} aria-describedby={claimId === claim.id ? `${prefix}-claim-feedback` : undefined} onClick={() => setClaimId(claim.id)}><span aria-hidden="true">{String.fromCharCode(65 + index)}</span>{claim.text}</button>)}</div>
          <div className="supports-feedback" id={`${prefix}-claim-feedback`} role="status">{selectedClaim ? <><strong>{selectedClaim.verdict}</strong><p>{selectedClaim.explanation}</p></> : <p><Info size={16} aria-hidden="true"/> Choose a statement above to see what it can, and cannot, establish.</p>}</div>
        </article>
      </div>
      <div className="supports-next"><div><p className="eyebrow">A BETTER NEXT QUESTION</p><p>{evidence.next}</p></div><button className="btn secondary" onClick={() => { chooseMove(evidence.focus); jump('moves'); }}>Explore a teaching response<ArrowRight size={16} aria-hidden="true"/></button></div>
      <details className="supports-assumptions"><summary>Read all fictional counts and assumptions</summary><div className="supports-table-wrap"><table><caption>Invented counts for one class of 30. Rows overlap and must not be added.</caption><thead><tr><th scope="col">Practice feature</th><th scope="col">Feature visible / observed</th><th scope="col">Not yet visible / observed</th><th scope="col">Missing / expected</th></tr></thead><tbody>{fictionalEvidence.checks.map(check => { const c = evidenceCounts(check); return <tr key={check.id}><th scope="row">{check.label}</th><td>{c.meets} / {c.observed}</td><td>{c.notYet} / {c.observed}</td><td>{c.missing} / {c.total}</td></tr>; })}</tbody></table></div><ul>{fictionalEvidence.assumptions.map(assumption => <li key={assumption}>{assumption}</li>)}</ul></details>
    </section>

    <section className="supports-section" aria-labelledby={`${prefix}-moves`}>
      <div className="supports-section-title"><div><p className="eyebrow">02 · DESIGN FOR LEARNER VARIABILITY</p><h2 id={`${prefix}-moves`} tabIndex={-1}>One goal. More than one route.</h2></div></div>
      <p className="supports-lead">Start with a possible barrier in the task, not a label for a learner. These original examples draw on CAST’s UDL Guidelines. They are options to try and review, not a prescription from a score.</p>
      <div className="supports-select" role="group" aria-label="Choose a teaching focus">{supportMoves.map(option => <button key={option.id} aria-pressed={moveId === option.id} onClick={() => chooseMove(option.id)}>{option.label}</button>)}</div>
      <div className="supports-design-context"><div><span className="supports-badge">{move.principle}</span><h3>{move.question}</h3><p><strong>Keep the goal:</strong> {move.goal}</p></div><div><p className="eyebrow">A BARRIER TO INVESTIGATE</p><p>{move.barrier}</p></div></div>
      <div className="supports-move-grid">{[['scaffold', 'SCAFFOLD · MAKE ACCESS EASIER', Layers], ['extension', 'EXTEND · DEEPEN THE THINKING', ArrowUpRight]].map(([kind, label, Icon]) => <article key={kind} className={`supports-move-card supports-${kind}`}><div className="supports-move-label"><Icon size={21} aria-hidden="true"/><span>{label}</span></div><h3>{move[kind].title}</h3><ol>{move[kind].steps.map(step => <li key={step}>{step}</li>)}</ol><div className="supports-agenda"><strong>IN THE DAILY AGENDA</strong><p>{move[kind].agenda}</p></div></article>)}</div>
      <div className="supports-check"><ClipboardCheck size={21} aria-hidden="true"/><div><strong>Look again, with a comparable task.</strong><p>{move.check}</p></div></div>
      <p className="supports-caution">Choice of response format must still reveal the intended learning. If writing, speaking, or another mode is itself the assessed goal, preserve that demand and use authorized accommodations. Offer supports flexibly; do not turn one check into permanent groups.</p>
    </section>

    <section className="supports-section" aria-labelledby={`${prefix}-plan`}>
      <div className="supports-section-title"><div><p className="eyebrow">03 · FROM NOTICE TO NEXT STEP</p><h2 id={`${prefix}-plan`} tabIndex={-1}>Plan a response. Set a review point.</h2></div><span className="supports-badge">15-MINUTE TEAM PROTOCOL</span></div>
      <p className="supports-lead">Use this original protocol to plan classroom support or enrichment. It is not an official school intervention process. Individual intervention, formal accommodations, and service decisions belong with the appropriate school team and approved systems.</p>
      <ol className="supports-protocol">{supportProtocol.map((step, index) => <li key={step.title}><span className="supports-step-number">0{index + 1}</span><div><div className="supports-step-title"><h3>{step.title}</h3><span>{step.time}</span></div><p>{step.prompt}</p></div></li>)}</ol>

      <div className="supports-notes">
        <div className="supports-notes-header"><div><p className="eyebrow">OPTIONAL · GENERAL LESSON PREPARATION</p><h3>Take a small plan into tomorrow.</h3></div><button className="btn gold" onClick={download}><Download size={16} aria-hidden="true"/>Download plan (.txt)</button></div>
        <p className="supports-note-boundary" id={`${prefix}-privacy`}><ShieldCheck size={18} aria-hidden="true"/><span><strong>Do not enter names, grades, disability details, individual cases, student work, or private links.</strong> Write only generic lesson-design notes. Notes are held in this tab’s memory, with no saving service, and clear on reload. Download a copy if you want to keep them.</span></p>
        {supportPlanFields.map(field => <label className="supports-field" key={field.id} htmlFor={`${prefix}-${field.id}`}><span>{field.label}</span><small id={`${prefix}-${field.id}-hint`}>{field.hint}</small><textarea id={`${prefix}-${field.id}`} aria-describedby={`${prefix}-privacy ${prefix}-${field.id}-hint`} rows={3} maxLength={1200} autoComplete="off" value={plan[field.id] || ''} onChange={event => edit(field.id, event.target.value)} placeholder={field.placeholder}/></label>)}
        <p className="supports-download-note">The text download includes your selected teaching focus, scaffold and extension, general notes, the team protocol, fictional example, and public sources. It is not submitted or shared.</p>
        <p className="supports-download-status" role="status">{downloadStatus && <><Check size={16} aria-hidden="true"/>{downloadStatus}</>}</p>
      </div>
    </section>

    <section className="supports-sources" aria-labelledby={`${prefix}-sources`}><div><p className="eyebrow">READ THE ORIGINAL GUIDANCE</p><h2 id={`${prefix}-sources`}>Sources, scope, and safeguards.</h2><p>The examples and protocol are original editorial teaching aids, not institutional approvals. A classroom check is not a diagnosis, and an apparent improvement does not establish that a strategy caused it.</p></div><div className="supports-source-grid">{supportSources.map(source => <SourceLink key={source.url} source={source}/>)}</div><div className="supports-release-note"><ShieldCheck size={18} aria-hidden="true"/><p><strong>For real aggregate data:</strong> removing names is not enough. Small groups or linked details can reveal identities. Do not copy real counts or cases into this public tool. Use your school’s approved review and disclosure process; this page supplies no universal “safe group size.”</p></div></section>
    <div className="supports-related"><a href="#maps/atl"><BookOpen size={18} aria-hidden="true"/>Connect to ATL teaching<ArrowRight size={16} aria-hidden="true"/></a><a href="#pd"><MessageSquare size={18} aria-hidden="true"/>Bring a question to your PLC<ArrowRight size={16} aria-hidden="true"/></a></div>
  </div>;
}
