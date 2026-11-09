export const newcomerSources={
 myp:{label:'MYP curriculum',url:'https://www.ibo.org/programmes/middle-years-programme/curriculum/'},
 dp:{label:'DP curriculum',url:'https://www.ibo.org/programmes/diploma-programme/curriculum/'},
 core:{label:'DP core',url:'https://www.ibo.org/programmes/diploma-programme/curriculum/dp-core/'},
 mypAssessment:{label:'MYP assessment',url:'https://www.ibo.org/programmes/middle-years-programme/assessment-and-exams/'},
 dpAssessment:{label:'Understanding DP assessment',url:'https://www.ibo.org/programmes/diploma-programme/assessment-and-exams/understanding-ib-assessment/'},
 pp:{label:'MYP personal project',url:'https://ibo.org/programmes/middle-years-programme/assessment-and-exams/personal-project/'},
 ee:{label:'Extended essay: first assessment 2027',url:'https://www.ibo.org/university-admission/latest-curriculum-updates/dp-extended-essay-updates/'},
 arts:{label:'Visual arts: first assessment 2027',url:'https://ibo.org/university-admission/latest-curriculum-updates/visual-arts-updates/'},
 integrity:{label:'IB academic integrity',url:'https://www.ibo.org/about-the-ib/what-it-means-to-be-an-ib-student/responsibilities-of-students-and-ib-world-schools/academic-integrity/'},
 inclusion:{label:'Inclusive education in the IB',url:'https://www.ibo.org/programmes/inclusive-education-in-the-ib/'},
 workshops:{label:'IB workshop categories',url:'https://www.ibo.org/professional-development/about-our-workshops/workshop-categories/'}
};
export const newcomerProgrammes={
 MYP:{name:'Middle Years Programme',summary:'Eight subject groups connected by concepts, global contexts and approaches to learning.',points:[['Concepts','The big ideas students investigate.'],['Global contexts','Why the learning matters in the wider world.'],['ATL skills','Thinking, research, communication, social and self-management skills, taught and practised deliberately.']],assessment:'Teachers assess subject-group objectives using the relevant IB criteria. Confirm the subject and programme year before borrowing a task or assessment sheet.',project:'The MYP Year 5 personal project is a required independent project around a personal interest. Its report is assessed by the supervisor and moderated by the IB. Ask whether supervision is part of your role.',links:[['#myp','Open the MYP unit organizer'],['#maps/atl','Explore ATL skills']],sources:['myp','mypAssessment','pp']},
 DP:{name:'Diploma Programme',summary:'Six subject groups and a core: theory of knowledge, the extended essay, and creativity, activity, service.',points:[['Your subject','Use the current guide for the subject, standard or higher level, and assessment session.'],['The core','TOK explores knowledge, the EE develops independent research, and CAS brings learning through experience and reflection.'],['ATL skills','Continue to teach research, communication, self-management and other learning skills explicitly.']],assessment:'Internal assessment is marked by teachers and moderated by the IB where specified. External assessment includes examinations and some coursework. Work completed in school is not automatically internally assessed.',project:'The extended essay is independent academic research in the DP core. First assessment 2027 includes subject-focused and interdisciplinary pathways. It is distinct from a subject IA, TOK task or CAS experience.',links:[['#core','Explore the DP core'],['#checklists/requirements','Check subject and core guidance']],sources:['dp','core','dpAssessment','ee']}
};
export const newcomerSteps=[
 {title:'Confirm the guide you need.',body:'Ask for the current subject guide, your programme year or SL/HL level, assessment session, school policies and the planning process used by your team.',href:'#checklists/requirements',link:'Review what needs school confirmation'},
 {title:'Plan one manageable sequence.',body:'Start with learning students should demonstrate. Read the assessment expectations, model one ATL skill, plan accessible materials and use a formative check.',href:'#examples',link:'Choose a classroom example'},
 {title:'Talk it through with a colleague.',body:'Compare the intended learning, task and evidence you will look for. Agree what to revisit after teaching, using student work only in approved school systems.',href:'#pd',link:'Find a PD or PLC session'}
];
export const newcomerQuestions=[
 'Which guides, school policies and planning or reporting processes apply to my classes?',
 'Which deadlines and submission responsibilities belong to me, and who can help me review marking?',
 'Do I have any personal-project, EE, TOK or CAS responsibilities?',
 'What are the school routes for learning support, language support and wellbeing concerns?',
 'Which professional learning fits my subject, role and experience?'
];
export const newcomerTerms=[
 ['MYP','Middle Years Programme','An IB programme connecting eight subject groups through concepts, global contexts and learning skills.'],
 ['DP','Diploma Programme','An IB programme with six subject groups and a core of TOK, EE and CAS.'],
 ['ATL','Approaches to learning','Skills students learn, practise and transfer, including thinking, research, communication, social and self-management skills.'],
 ['TOK','Theory of knowledge','A part of the DP core that examines knowledge and how we know. MYP inquiry can use related questions, but MYP does not require the DP TOK course.'],
 ['EE','Extended essay','Independent academic research in the DP core. Check the requirements for the student’s assessment session.'],
 ['CAS','Creativity, activity, service','A DP core component involving experiences, reflection and a collaborative project.'],
 ['IA','Internal assessment','Subject-specific assessment marked by teachers and moderated by the IB where specified. Check each component’s guide.'],
 ['SL / HL','Standard level / higher level','DP course levels with different teaching and assessment requirements.'],
 ['Moderation','Checking a consistent marking standard','The IB reviews teacher marking against the applicable standard.'],
 ['Personal project','MYP Year 5 independent project','A process, product or outcome, and reflective report. It is different from a DP extended essay or subject IA.']
];
export function newcomerText(programme='MYP'){
 const p=newcomerProgrammes[programme]||newcomerProgrammes.MYP;
 return `AVHS IB STUDIO · NEW TO IB\nOriginal orientation suggestions, not a school compliance checklist. Confirm current guides and local processes.\n\n${p.name.toUpperCase()}\n${p.summary}\n${p.points.map(([t,d])=>t+': '+d).join('\n')}\n\nASSESSMENT\n${p.assessment}\n${p.project}\n\nTHREE FIRST MOVES\n${newcomerSteps.map((s,i)=>`${i+1}. ${s.title}\n${s.body}`).join('\n\n')}\n\nASK YOUR COORDINATOR\n${newcomerQuestions.map(x=>'- '+x).join('\n')}\n\nINTEGRITY AND ACCESS\nTeach attribution, ethical collaboration and permitted support. Confirm assessment access arrangements with the coordinator. Keep student information in approved school systems.\n\nFIRST ASSESSMENT 2027\nExtended essay and visual arts have revised requirements. Check the assessment session before reusing a resource.\n\nPUBLIC IB SOURCES\n${Object.values(newcomerSources).map(s=>s.label+'\n'+s.url).join('\n\n')}\n`;
}
