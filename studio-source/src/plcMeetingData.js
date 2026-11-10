import {pdArchive} from './pdArchiveData.js';

export const meetingNorms=[
 'Stay present; use devices for the work.',
 'Share airtime and listen to understand.',
 'Discuss evidence and practices with curiosity and respect.',
 'Protect student confidentiality; use anonymized examples.',
 'Honor time limits and park separate conversations.',
 'Pair concerns with a support request or a practical next step.'
];
export const meetingStandards={
 normsSource:'Working norms from the September 24, 2026 IB PLC agenda, lightly edited for readability.',
 values:['Human Potential','Equity','Safety','Collaboration','Professionalism','Resilience','Innovation','Diversity','Pride'].map(title=>({title})),
 valuesSource:{label:'SBCUSD Core Operating Values. These are district values; the working norms above are from the IB PLC.',url:'https://www.sbcusd.com/about-us/superintendent/core-operating-values'},
 formatStatus:'Working adaptation of the SBCUSD PLC feedback rubric (adopted September 10, 2021; redistributed at AVHS in September 2026) and established AVHS IB PLC agendas. It is not the official district template.',
 roles:['Facilitator','Recorder','Reporter','Timekeeper'],
 focusAreas:[['Meeting norms and team roles','Revisit the norms at each meeting and rotate volunteer roles. Share the agenda early so the team can contribute.'],['Learning intentions and Tier 1 instruction','Agree on the learning intention, success criteria, classroom instruction and assessment.'],['Evidence of student understanding','Review appropriate evidence together and compare interpretations or scoring. Keep student records in approved systems.'],['Intervention and enrichment','Plan support and extension, with an implementation timeline and a date to review the work.'],['Team reporting and feedback','Record decisions and action plans, share relevant feedback with leadership, and return to the results.']],
 structure:['Confirm the date, time, place, audience and sign-in.','State the purpose, intended outcome and what to bring.','Review the working norms.','Use timed blocks for progress, evidence, planning and programme needs.','Close with commitments, owners, review dates and needed support.']
};
// A sign-in destination must be a verified, current participant link, not an attendance roster.
export const staffSignIn={note:'Choose the form for your meeting. Google Forms may require your school account; the Learning Studio itself has no sign-in. Nothing is submitted from this page.',links:[{label:'Academy MOU sign-in',url:'https://docs.google.com/forms/d/e/1FAIpQLSfmgxGVopiFc4bV-rcK57VSlPB9Tg-vZKVpr9B1Qhej8T5I6A/viewform'},{label:'IB PLC sign-in',url:'https://docs.google.com/forms/d/e/1FAIpQLSeApPyfCrK3gAb0JSWNi-nSuJnlcBR8npN_oPXoi5_UmN1S7A/viewform?usp=send_form'}]};

export const plcMeetings=[
 {
  "id": "nov10-pd",
  "date": "2026-11-10",
  "type": "PD",
  "title": "Academy PD and unit design day",
  "status": "Whole-day learning agenda",
  "time": "8:30 a.m.–3:30 p.m.",
  "location": "H104",
  "summary": "Build on a teaching strength and develop one current unit or new topic across the day. Model inquiry, critique AI, design and rehearse a first lesson, then use evidence to refine support and extension.",
  "outcomes": [
    "A teachable unit draft with visible learning goals, success criteria and a first-lesson feedback checkpoint.",
    "A before-and-after revision with a rationale, an evidence-informed support and extension plan, and an owner and review measure."
  ],
  "resourceIds": [],
  "agenda": [
    [
      "8:30–8:45",
      "Build on strengths; choose a unit or new topic"
    ],
    [
      "8:45–9:10",
      "Inquiry model and AI critique"
    ],
    [
      "9:10–9:35",
      "MYP / DP anchors and CTE / PBL / WBL connections"
    ],
    [
      "9:35–9:45",
      "Break"
    ],
    [
      "9:45–10:15",
      "Subject-specific AI / technology lab on the chosen unit"
    ],
    [
      "10:15–10:45",
      "Unit design studio"
    ],
    [
      "10:45–11:00",
      "Prepare a teachable draft and evidence question"
    ],
    [
      "11:00–11:10",
      "Make learning goals and success criteria visible"
    ],
    [
      "11:10–11:30",
      "Plan and rehearse the first lesson and feedback checkpoint"
    ],
    [
      "11:30–11:45",
      "Structured peer critique"
    ],
    [
      "11:45–noon",
      "Revise and share the before-and-after rationale"
    ],
    [
      "Noon–1:00",
      "Lunch"
    ],
    [
      "1:00–2:00",
      "Data deep dive linked to the same unit"
    ],
    [
      "2:00–2:10",
      "Break"
    ],
    [
      "2:10–2:40",
      "Adapt support, extension and a resource using evidence"
    ],
    [
      "2:40–3:10",
      "Programme and implementation checks"
    ],
    [
      "3:10–3:30",
      "Commitments and review measures"
    ]
  ],
  "activities": [
    [
      "#workshop/start",
      "Optional reusable task workshop",
      "A separate six-step tool for revising one task, with suggested timings. It does not replace the whole-day agenda."
    ],
    [
      "#workshop/technology",
      "Technology practice cards",
      "Use a teacher-reviewed example, an approved tool or an equivalent paper route in the 9:45–10:15 lab."
    ],
    [
      "#workshop/support",
      "Support and reflection tool",
      "Use evidence to plan classroom support without entering student information."
    ]
  ],
  "supportingTools": [
    [
      "#downloads",
      "Fillable planning PDFs"
    ],
    [
      "#checklists",
      "Programme submission checklists"
    ],
    [
      "#examples",
      "Daily lesson examples"
    ],
    [
      "#projects",
      "CTE and project planning"
    ],
    [
      "#supports",
      "Student supports and data practice"
    ],
    [
      "#maps/atl",
      "ATL, TOK and design diagrams"
    ],
    [
      "#myp/unit",
      "MYP unit organizer"
    ],
    [
      "#ai",
      "AI + IB guidance"
    ],
    [
      "#research",
      "Education research"
    ]
  ],
  "note": "Begin at 8:30 a.m. in H104. Keep the same chosen unit or new topic through the morning design work and afternoon evidence review. Lunch is noon–1:00; collaboration closes at 3:30. Keep student records in approved school systems and confidential content off the projector. Live AI is optional; teacher review and an equivalent no-AI route remain essential."
},
 {id:'nov09-mou',date:'2026-11-09',type:'Academy MOU',title:'Academy collaboration MOU',status:'Updated working agenda',time:'8:00–9:00 a.m. academy breakout',location:'H103',summary:'Review academy work, confirm programme priorities and draft a clear subject message for prospective students.',outcomes:['Academy and programme next steps.','Two or three concrete subject benefits and one student-facing sentence.'],resourceIds:[],activities:[['#recruitment','Run the 7-minute recruitment activity','Discuss for three minutes, draft for two, then give a brief report-out.'],['#subjects','Find your subject group','Use examples from actual classroom learning.'],['#pp','Review personal-project support','Open supervisor and lead-teacher preparation tools as needed.']],supportingTools:[['#myp','MYP planning'],['#core','DP core'],['#dates','IB planning dates'],['#supports','Student supports and data practice']],agenda:[['8:00–8:15','Academy Interest Survey'],['8:15–8:25','First-semester work-based learning review'],['8:25–8:30','Second-semester ideas'],['8:30–8:38','Data review'],['8:38–8:40','Teaching follow-through'],['8:40–8:47','Subject-group recruitment activity'],['8:47–8:52','Academy business: MYP, DP, AniVation and staff forms'],['8:52–8:55','Review software resources and next steps'],['8:55–9:00','Close and next steps']],note:'The academy breakout is 8:00–9:00 in H103, within the broader 7:40–9:10 schoolwide MOU window. The first 30 minutes and the 8:55 close are retained. This updated working outline combines MYP, DP and AniVation updates with staff forms at 8:47, then makes space for a three-minute software review. The 15/10/5/30-minute allocation was a meeting recommendation, not a standing PLC rule. Confirm operational details with the facilitator.'},
 {id:'oct29-plc',date:'2026-10-29',type:'IB PLC',title:'Task revision and follow-through',status:'Past session summary',time:'3:50–4:50 p.m.',location:'F107',summary:'Clarify a task, build in feedback and revision, and decide what evidence to bring back.',outcomes:['A clearer task and success criterion.','A classroom trial and a follow-up question.'],resourceIds:['oct29-task'],activities:[],note:'Teaching content only. The original agenda, attendance, student data and administrative records are not reproduced.'},
 {id:'oct26-pd',date:'2026-10-26',type:'Academy MOU',title:'CER, ATL and TOK in classroom tasks',status:'Past session summary',time:'7:40–9:10 a.m. MOU window',location:'Cafeteria and breakout rooms; TOK/ATL session in N101',summary:'Use a worked example and subject-specific planning prompts to connect evidence, reasoning and an observable ATL skill.',outcomes:['A distinction between observation and interpretation.','One practical change to an existing lesson.'],resourceIds:['oct26-arts','oct26-toolkit'],activities:[],note:'The public summaries below describe the teaching resources. The original staff documents remain in the school workspace.'},
 {id:'sep24-plc',date:'2026-09-24',type:'IB PLC',title:'Data and first units',status:'Past session summary',time:'3:50–4:50 p.m.',location:'F107',summary:'Separate observations from explanations, choose an instructional response, and plan the next review.',outcomes:['An instructional adjustment supported by evidence.','An owner, review point and evidence to bring back.'],resourceIds:['sep24-units'],activities:[],agenda:[['01','Reconnect and check progress'],['02','Data: patterns to response'],['03','First units: plan, evidence and adjustment'],['04','Follow through on programme needs'],['05','Commitments and next check']],note:'No student-level information, operational links or private records are included.'},
 {id:'sep14-mou',date:'2026-09-14',type:'Academy MOU',title:'GLA and AniVation collaboration',status:'Past session summary',time:'7:40–9:10 a.m. schoolwide MOU window',location:'Cafeteria opening; academy breakout in the AVHS Library',summary:'Review academy priorities and academic support, then plan field studies, partnerships and next steps.',outcomes:['Shared priorities for academy support and programme planning.','Follow-through on field studies, credentials, college credit and partners.'],resourceIds:[],activities:[],agenda:[['01','Academic support and M1 review'],['02','Academy and IB programme priorities'],['03','Field-study planning'],['04','Credentials, college credit and partners'],['05','Next steps']],note:'Public topic summary only. The private packet, Classroom access code, attendance and student details are excluded.'},
 {id:'sep03-plc',date:'2026-09-03',type:'IB PLC',title:'IB PLC launch',status:'Past session summary',time:'3:50–4:50 p.m.',location:'F107',summary:'Identify shared needs across MYP and DP, gather resource requests, and agree on next steps.',outcomes:['A shared planning priority.','A clear request or next action.'],resourceIds:['sep03-launch'],activities:[],note:'Historical teaching summary. Reconfirm current responsibilities and deadlines rather than reusing old plans.'},
 {id:'jul-pd',date:'2026-07-28',type:'PD',title:'Summer AI PD: NotebookLM for CTE educators',status:'Past session · original resources',time:null,location:null,summary:'Start with a teaching need, work from approved sources, and review AI output before adapting it.',outcomes:['A source-based teaching workflow.','A plan for checking accuracy and usefulness.'],resourceIds:['july-notebook','july-ai-design','july-prompt-playbook'],activities:[],note:'July 28 Summer CTE/College & Career professional learning. The session resource collection is titled NotebookLM: The Digital Blueprint for Smart Learning. Original public-view resources are linked below; current school tool approval and permitted data use must still be checked.'}
];
export const meetingDate=(date,short=false)=>date.length===7?new Intl.DateTimeFormat('en-US',{month:short?'short':'long',year:'numeric'}).format(new Date(date+'-01T12:00:00')):new Intl.DateTimeFormat('en-US',{weekday:short?undefined:'long',month:short?'short':'long',day:'numeric',year:'numeric'}).format(new Date(date+'T12:00:00'));
export function resourcesForMeeting(meeting){return pdArchive.filter(r=>meeting.resourceIds.includes(r.id))}
export function filterMeetings(records,{type='All',search='',pastOnly=false}={}){const q=search.trim().toLowerCase();return records.filter(r=>(type==='All'||r.type===type)&&(!pastOnly||r.date<'2026-11-08')&&(!q||[r.title,r.type,r.date,meetingDate(r.date),r.summary,...resourcesForMeeting(r).map(x=>x.title+' '+x.topic)].join(' ').toLowerCase().includes(q)))}
export function blankAgendaText(){return `AVHS GLA · PD / PLC AGENDA\nBased on established AVHS IB PLC agendas, not a verified district-mandated template. Confirm current meeting directions before use.\nKeep student records and confidential discussion in approved school systems.\n\nDATE / TIME / LOCATION\n[Confirm]\nMEETING TYPE / AUDIENCE\n[Add]\nROTATING VOLUNTEER ROLES\nFacilitator: [Add] | Recorder: [Add] | Reporter: [Add] | Timekeeper: [Add]\nATTENDANCE EXPECTATIONS / PARTICIPANT SIGN-IN\n[Confirm]\nPURPOSE\n[What will we work on?]\nEXPECTED OUTCOMES\n[What should we leave with?]\nPREPARATION / BRING\n[What do participants need?]\n\nWORKING NORMS — REVISIT EACH MEETING\n${meetingNorms.map(x=>'- '+x).join('\n')}\n${meetingStandards.normsSource}\n\nDISTRICT CORE OPERATING VALUES\n${meetingStandards.values.map(v=>v.title).join(' · ')}\n${meetingStandards.valuesSource.url}\n\nAGENDA\nTime | Topic / task | Lead | Outcome / evidence\n[Norms, roles and progress]\n[Learning intention, success criteria, Tier 1 instruction and assessment]\n[Evidence of understanding and collaborative scoring / calibration]\n[Intervention AND enrichment plan, implementation timeline, review date]\n[Team reporting, leadership feedback and commitments]\n\nSOURCE NOTE\nWorking adaptation of the SBCUSD PLC feedback rubric and established AVHS agendas; not the official district template.\n\nFOLLOW-THROUGH\nDecision / next action | Owner | Due / review date | Evidence to bring back\n[Add]\n\nREFLECTION\nWhat helped? What should change next time?\n\nSIGN-IN\nUse the current participant link supplied by the facilitator. Do not circulate an attendance roster publicly.\n`}
