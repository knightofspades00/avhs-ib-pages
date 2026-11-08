// Original fictional teaching examples. No school or student records are used.
export const supportSources = [
  { title: 'CAST · UDL Guidelines', url: 'https://udlguidelines.cast.org/', note: 'Design for learner variability through engagement, representation, and action and expression. The classroom moves here are original examples, not CAST-prescribed interventions.' },
  { title: 'NCII · Progress monitoring', url: 'https://intensiveintervention.org/data-based-individualization/progress-monitoring', note: 'Plan the measure, goal, collection frequency, and review process before intervention. Progress monitoring is part of data-based individualization; use appropriate measures and qualified school teams. This page is not a diagnostic tool.' },
  { title: 'U.S. Department of Education · Disclosure avoidance', url: 'https://studentprivacy.ed.gov/content/disclosure-avoidance', note: 'Removing names alone does not make data safe to release. Small groups, linked information, and combinations of details can expose identities. Follow approved local disclosure procedures.' },
];

export const fictionalEvidence = {
  label: 'Fictional classroom · one practice checkpoint',
  expected: 30,
  context: 'A made-up class of 30 learners is investigating a proposed community design. Each check asks whether one feature appears in a short practice response. These counts were invented for this demonstration.',
  assumptions: [
    'All three checks refer to the same fictional class of 30 at one checkpoint. They are not before-and-after results.',
    'Each observed response is counted once per check. A response is observed only when that feature can be judged.',
    'Missing means no usable evidence for this check. It is not a zero, an absence, or evidence of low ability.',
    'The overlap between checks is unknown. Do not add the rows or infer which learners need support.',
    'The counts describe a practice feature, not a grade, diagnosis, intervention tier, or eligibility decision.',
  ],
  checks: [
    { id: 'claim', label: 'State a claim', criterion: 'States a clear recommendation that responds to the design question.', meets: 18, observed: 27, focus: 'start', next: 'Offer a fresh, short prompt and ask for a recommendation before adding supporting detail. Check access to the prompt and the meaning of its key terms.' },
    { id: 'reasoning', label: 'Explain the evidence', criterion: 'Connects one relevant piece of evidence to the recommendation with an explanation.', meets: 14, observed: 24, focus: 'reasoning', next: 'Use an unfamiliar example with the same reasoning demand. Ask for the evidence-to-claim link in a brief explanation, with an accessible way to respond.' },
    { id: 'transfer', label: 'Test a new condition', criterion: 'Explains how one changed constraint could affect the recommendation.', meets: 8, observed: 20, focus: 'transfer', next: 'Change one constraint in a comparable task. Look for a justified revision or a justified decision to keep the recommendation.' },
  ],
};

export function evidenceCounts(check) {
  const total = fictionalEvidence.expected;
  return {
    meets: check.meets,
    observed: check.observed,
    notYet: check.observed - check.meets,
    missing: total - check.observed,
    total,
    observedPercent: Math.round(check.meets / check.observed * 100),
    coveragePercent: Math.round(check.observed / total * 100),
    lowerPercent: Math.round(check.meets / total * 100),
    upperPercent: Math.round((check.meets + total - check.observed) / total * 100),
  };
}

export function evidenceClaims(check) {
  const c = evidenceCounts(check);
  return [
    { id: 'description', text: `${c.meets} of ${c.observed} observed responses show this feature.`, verdict: 'Supported as a description.', explanation: `That is ${c.observedPercent}% of observed responses. The ${c.missing} missing checks remain unknown; this does not describe every learner in the class.` },
    { id: 'missing', text: `The ${c.missing} missing checks show that those learners cannot do this.`, verdict: 'Not supported.', explanation: 'Missing evidence cannot distinguish a learning need from task access, unclear directions, timing, or another reason. Create a fair opportunity to show the skill before drawing conclusions.' },
    { id: 'cause', text: 'These results prove that a particular teaching strategy works.', verdict: 'Not supported.', explanation: 'One invented checkpoint cannot show change or cause. Even a real before-and-after difference would need scrutiny of comparable tasks, coverage, other changes, and the design of the study.' },
  ];
}

export const supportMoves = [
  {
    id: 'start', label: 'Enter the task', principle: 'Engagement + representation',
    question: 'Is the task goal clear, and can learners get into the content?',
    goal: 'Make a defensible recommendation in response to the same design question.',
    barrier: 'The prompt, unfamiliar vocabulary, or a crowded set of directions may hide the thinking the task is intended to elicit. Check this with learners rather than assuming motivation or ability.',
    scaffold: { title: 'Make the first decision visible.', steps: ['Show the goal and a short example/non-example. Explain two essential terms with a visual or concrete example.', 'Chunk the brief into “What is the problem?” and “What do you recommend?” Offer quiet thinking time before paired rehearsal.', 'Provide an optional starting frame: “I recommend ___ because the design needs to ___.” Fade the frame when it no longer helps.'], agenda: 'First 4 minutes: clarify the goal (1), inspect an example (1), rehearse and make a first decision (2).' },
    extension: { title: 'Add a competing priority.', steps: ['Keep the core question and add a second stakeholder priority.', 'Ask for two plausible recommendations, then justify the trade-off that makes one preferable.', 'Require learners to name what new information could change their choice.'], agenda: 'During application: add one constraint and ask for a reasoned trade-off, rather than a longer version of the same task.' },
    check: 'Use a new, similarly demanding prompt. Look for a clear recommendation, not completion speed or confidence alone.',
  },
  {
    id: 'reasoning', label: 'Make reasoning visible', principle: 'Representation + action and expression',
    question: 'Can learners connect evidence to a claim, and can the task reveal that thinking?',
    goal: 'Explain why one relevant piece of evidence supports a recommendation.',
    barrier: 'A learner may identify relevant evidence but leave the connection unstated. Language, a response format, or an unclear model may also obscure reasoning. Do not infer the cause from a count alone.',
    scaffold: { title: 'Model the missing connection.', steps: ['Think aloud through one claim → evidence → explanation example. Contrast it with a response that only quotes evidence.', 'Offer an optional organizer or frame: “This evidence supports the recommendation because ___.”', 'Let learners rehearse through a sketch, spoken explanation, or text when the learning goal permits. Then check the explanation itself, not the format.'], agenda: 'Middle 8 minutes: model one link (2), rehearse with a partner (2), apply to a fresh example independently (4).' },
    extension: { title: 'Stress-test the explanation.', steps: ['Introduce a plausible counterexample or a source that disagrees.', 'Ask which part of the claim must be narrowed and which evidence is strongest for that narrower claim.', 'Require an explanation of one remaining limitation.'], agenda: 'During independent application: swap “add another paragraph” for a counterexample that requires revising the reasoning.' },
    check: 'Use a comparable fresh example and the same evidence-to-claim criterion. Note whether the link is explained and what support the task offered.',
  },
  {
    id: 'transfer', label: 'Extend and transfer', principle: 'Engagement + action and expression',
    question: 'Can learners use the idea when a relevant condition changes?',
    goal: 'Justify whether a changed constraint should change the recommendation.',
    barrier: 'A new context may demand background knowledge that was not taught, or several changed conditions may overload the comparison. Separate those access demands from the transfer goal.',
    scaffold: { title: 'Change one thing at a time.', steps: ['Place the original and new situation side by side. Make the changed condition explicit.', 'Use an optional “stays the same / changes / matters because” organizer.', 'Ask for an independent decision after rehearsal, then gradually remove the comparison prompts.'], agenda: 'Final 6 minutes: compare one changed condition (2), explain a decision (3), identify one uncertainty (1).' },
    extension: { title: 'Design a tougher test.', steps: ['Ask learners to propose a new constraint that would meaningfully test their recommendation.', 'Have them predict the result and justify what evidence would support or challenge the prediction.', 'Invite revision after critique, preserving the original learning goal.'], agenda: 'For early evidence of understanding: add complexity, choice, and critique rather than extra repetitive work.' },
    check: 'Try another unfamiliar but accessible context. Look for a justified keep-or-change decision, not novelty or polish.',
  },
];

export const supportProtocol = [
  { title: 'Name the evidence', time: '3 min', prompt: 'Specify the goal, task, criterion, numerator, denominator, and missing evidence. Ask whether learners had a fair opportunity to show the skill.' },
  { title: 'Test a barrier hypothesis', time: '3 min', prompt: 'Separate what you observed from possible explanations. Seek learner input and inspect task access. Choose one plausible barrier to investigate, not a label for a learner.' },
  { title: 'Choose a teaching move', time: '4 min', prompt: 'Plan one scaffold and one extension toward the same goal. Agree who will prepare the materials, when to use them, and how to check that the planned support was actually offered.' },
  { title: 'Plan the next check', time: '3 min', prompt: 'Choose a comparable task, the same criterion, an accessible response opportunity, and a review point. Before targeted intervention, agree the measure, goal, and collection and review frequency. For intensive intervention, follow the school team’s validated monitoring plan.' },
  { title: 'Review and decide', time: '2 min', prompt: 'If evidence is unclear, improve the opportunity to observe. If a pattern repeats, examine the task and implementation before adapting support. Deepen challenge when understanding is secure; seek approved team processes when more help is needed.' },
];

export const supportPlanFields = [
  { id: 'goal', label: 'Learning goal and possible task barrier', hint: 'Describe the lesson, not a learner or group.', placeholder: 'Explain an evidence-to-claim link. The sample prompt may make that link too implicit.' },
  { id: 'move', label: 'Scaffold, extension, and place in the agenda', hint: 'Keep the intellectual goal. Change access or deepen the challenge.', placeholder: 'Model one explanation, offer an optional organizer, and add a counterexample for deeper application.' },
  { id: 'review', label: 'Next evidence check and review plan', hint: 'Name the task feature, preparation role, and review point. Do not enter results.', placeholder: 'The lesson designer will prepare a comparable exit prompt. Review whether the explanation is visible before the next lesson.' },
];

export function supportPlanText(notes = {}, moveId = 'reasoning', evidenceId = 'reasoning') {
  const move = supportMoves.find(x => x.id === moveId) || supportMoves[1];
  const evidence = fictionalEvidence.checks.find(x => x.id === evidenceId) || fictionalEvidence.checks[1];
  const c = evidenceCounts(evidence);
  return [
    'STUDENT SUPPORTS & DATA · GENERAL LESSON PLAN',
    'Original teaching organizer. Not an official IB or school template, a student record, or an intervention eligibility decision.',
    'No live data connection. The demonstration uses invented counts, not AVHS records.',
    'Keep only non-identifying lesson design notes. Do not include names, grades, disability details, cases, student work, or private links.',
    '', 'SELECTED TEACHING FOCUS', move.label, `Goal: ${move.goal}`, `Possible task barrier: ${move.barrier}`,
    '', 'SCAFFOLD', move.scaffold.title, ...move.scaffold.steps.map(x => `- ${x}`), move.scaffold.agenda,
    '', 'EXTENSION', move.extension.title, ...move.extension.steps.map(x => `- ${x}`), move.extension.agenda,
    '', 'NEXT CHECK', move.check,
    '', 'YOUR GENERAL PREPARATION', ...supportPlanFields.flatMap(field => [field.label.toUpperCase(), String(notes[field.id] || '[To plan]'), '']),
    '15-MINUTE TEAM PROTOCOL', ...supportProtocol.map((step, i) => `${i + 1}. ${step.title} (${step.time})\n${step.prompt}`),
    '', 'FICTIONAL EVIDENCE EXAMPLE', fictionalEvidence.context, evidence.criterion,
    `${c.meets}/${c.observed} observed responses show the feature (${c.observedPercent}%). ${c.notYet}/${c.observed} observed responses do not yet show it. ${c.missing}/${c.total} checks are missing. Coverage: ${c.observed}/${c.total} (${c.coveragePercent}%).`,
    ...fictionalEvidence.assumptions.map(x => `- ${x}`),
    '', 'PUBLIC SOURCES', ...supportSources.map(source => `${source.title}\n${source.url}\n${source.note}`),
  ].join('\n');
}
