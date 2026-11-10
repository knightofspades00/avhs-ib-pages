import React from 'react';
import {sourceLinks} from './data.js';

// All URLs reuse published Studio routes or the site's existing public IB references.
export const tuesdayStepResources={
 start:[['#myp/unit','MYP unit organizer','Start from the unit’s inquiry and intended learning.'],['#examples','Classroom lesson examples','Compare a model task in your subject.'],[sourceLinks.myp,'IB: MYP curriculum','Public programme overview, not a replacement for your current subject guide.']],
 evidence:[['#supports','Evidence-to-action practice','Use fictional data to check claims and limits.'],['#maps/tok','TOK thinking map','Connect claims with the way knowledge is justified.'],[sourceLinks.tok,'IB: What is TOK?','Public introduction to questions about knowledge.']],
 responsibilities:[['#myp','MYP planning guidance','Find the unit organizer and programme distinctions.'],['#core','DP core overview','Review TOK, the extended essay and CAS.'],['#checklists','Programme submission checklists','Check public requirements and school-confirmation items.'],[sourceLinks.myp,'IB: MYP curriculum','Public MYP programme reference.'],[sourceLinks.dp,'IB: DP curriculum','Public DP programme reference.']],
 studio:[['#maps/atl','ATL teaching map','Choose an observable practice to model and teach.'],['#downloads/lesson','Lesson planning PDF','Keep a fillable planning copy.'],['#examples','Lesson examples','Adapt a subject-specific sequence.'],[sourceLinks.atl,'IB: What is an IB education?','Public reference for the shared IB approach.']],
 challenge:[['#maps/tok','TOK thinking map','Use a knowledge question to challenge the reasoning.'],['#examples','Lesson examples','Compare success criteria and reflection prompts.'],[sourceLinks.tok,'IB: What is TOK?','Explore knowledge questions and perspectives.']],
 commit:[['#downloads/lesson','Lesson planning PDF','Record the classroom trial and evidence to revisit.'],['#downloads/plc','PLC meeting agenda','Record the next action, owner and review point.'],['#research','Education research','Check research that could inform the next iteration.']]
};
export const mondayBlockResources=[
 {note:'The Academy Interest Survey link has not been verified here. Use the survey supplied by the facilitator.',links:[['#downloads/plc','Meeting agenda template','Keep decisions and follow-through in one place.']]},
 {links:[['#projects','CTE and project planning','Review authentic audiences, products and learning evidence.'],['#subjects','Subject connections','Connect classroom learning with college, career and life.']]},
 {links:[['#projects','Project planning prompts','Develop a second-semester idea and next action.'],['#downloads/plc','Meeting agenda template','Capture the owner and follow-through.']]},
 {note:'Use approved school systems for actual grades and attendance. The practice resource contains fictional data only.',links:[['#supports','Fictional evidence-to-action practice','Separate observations from explanations.']]},
 {links:[['#examples','Lesson examples','Choose a practical instructional adjustment.'],['#research','Education research','Check evidence relevant to the adjustment.']]},
 {links:[['#recruitment','Subject recruitment activity','Run the discussion, drafting and report-out.'],['#subjects','Subject groups','Use concrete classroom examples in your message.']]},
 {links:[['#myp','MYP planning','Review unit and programme needs.'],['#core','DP core','Review TOK, EE and CAS.'],['#pp','Personal-project support','Find supervisor and student preparation tools.'],[sourceLinks.myp,'IB: MYP curriculum','Public MYP reference.'],[sourceLinks.dp,'IB: DP curriculum','Public DP reference.']]},
 {links:[['#ai','AI + IB guidance','Review teacher checks, permitted use and alternatives.'],['#workshop/technology','Technology practice lab','Choose a tool for an instructional purpose.']]},
 {links:[['#downloads/plc','Meeting agenda template','Record next action, owner and review date.'],['#pd/nov10-pd','Tuesday collaboration','Open the next day’s outline and workshop.']]}
];
export function PresenterResources({title,resources=[],note}){return <details className="presenter-inline-resources"><summary>Explore resources for {title} <span>{resources.length} resources</span></summary><div className="presenter-inline-content"><p>Studio resources open in a separate reusable resource tab; public references and private sign-in links open in a new tab. Your presentation stays here. Switch back to this presentation tab to continue.</p>{note&&<p className="presenter-resource-note">{note}</p>}<div className="presenter-inline-grid">{resources.map(([href,label,description,type])=><a href={href} key={href} target={href.startsWith('#')?'avhs-presenter-resource':'_blank'} rel={href.startsWith('#')?undefined:'noopener noreferrer'}><small>{type==='private'?'PRIVATE · SCHOOL SIGN-IN':href.startsWith('#')?'COMMONS TOOL':'PUBLIC REFERENCE'}</small><strong>{label}</strong><span>{description}</span><em>Open resource ↗ · separate tab</em></a>)}</div></div></details>}
export function MondayPresenterResources({index,title}){const item=mondayBlockResources[index];return item?<PresenterResources key={index} title={title} resources={item.links} note={item.note}/>:null}

export const tuesdayDayResources={
 '8:30–11:00':[['#subjects','Subject curriculum references','Connect one idea from the morning to your current lesson.'],['#examples','Classroom lesson examples','Find a practical example for that learning need.']],
 '11:00–noon':[['#workshop/start','Current-unit workshop','Develop one stronger task through inquiry, evidence, ATL, TOK and revision.'],['#workshop/evidence','Fictional water-sample model','Separate observation from inference before planning a response.'],['#maps/atl','ATL teaching map','Choose one observable student practice to model.'],[sourceLinks.tok,'IB: What is TOK?','Explore the knowledge question behind the task.']],
 '1:00–2:00':[['https://docs.google.com/spreadsheets/d/1Xdj3PM1HciPYg6yQOjOQo5GqwDMUjAXteeR_3t4k52Q/edit?usp=drivesdk','Sam’s private dashboard','Historical October 28 snapshot. Sam’s school sign-in required; teachers are not automatically granted access. Keep confidential content off the projector.','private'],['#supports','Fictional evidence-to-action practice','Notice a strength, name one question, choose a provisional response and set a review. Actual school data stays in approved systems.'],['#downloads/plc','Meeting agenda template','Record the challenge, evidence, response, owner and review point.']],
 '2:00–2:10':[['#pd/nov10-pd','Afternoon outline','Return at 2:10 for the proposed technology practice.']],
 '2:10–2:40':[['#workshop/technology','Technology practice lab','5 minutes choose and check; 10 build; 10 partner review; 5 record a classroom trial.'],['#ai','AI + IB safeguards','Check accuracy, privacy, permissions and a no-AI route.'],['https://www.cde.ca.gov/ci/pl/documents/aiguidance.pdf','CDE: Learning With AI, Learning About AI','State guidance, not a district-approved tools list.']],
 '2:40–3:10':[['#subjects','Subject curriculum references','Check the IB curriculum behind the task and identify any guidance to verify.'],['#myp','MYP planning','Connect the learning need to the current unit.'],['#core','DP core','Connect the task to TOK, EE or CAS where relevant.'],[sourceLinks.myp,'IB: MYP curriculum','Public programme reference; check current subject guides.'],[sourceLinks.dp,'IB: DP curriculum','Public programme reference; check current subject guides.']],
 '3:10–3:30':[['#downloads/plc','Capture actions and review evidence','Name the challenge, evidence, provisional response, owner and review point.'],['#downloads/lesson','Keep the classroom trial','Record what you will try and what student learning evidence you will revisit.']]
};
export const tuesdayDayOutputs={
 '8:30–11:00':'Take away one idea you can use in a current lesson.',
 '11:00–noon':'Revise one task using the fictional water model to practise evidence and reasoning.',
 '1:00–2:00':'Name a strength, one question to investigate and a provisional response with an owner and review point.',
 '2:10–2:40':'Keep one teacher-reviewed classroom trial, with a no-AI alternative if needed.',
 '2:40–3:10':'Check the subject curriculum and identify one concrete planning adjustment.',
 '3:10–3:30':'Share the action, owner, classroom trial, evidence to revisit and next checkpoint.'
};
