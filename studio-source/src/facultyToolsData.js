// Original teaching pathways. No personal profile, analytics or account integration.
export const toolDirectory=[
 ['#history','History of the Americas guide','Plan DP History HL for the 2027 or 2028 assessment cohort.','subject course guide teach assess prepare investigation'],
 ['#present/nov10-pd','Tuesday collaboration day','Present the November 10 agenda and teaching activities.','past meeting h104 8:30 november 10'],
 ['#new','New to IB','Plain-language programme introductions and first teaching moves.','beginner glossary start induction'],
 ['#maps/atl','ATL skills map','Choose a skill and make its practice visible.','approaches learning communication research thinking social self management'],
 ['#maps/tok','TOK connections','Compare how disciplines build and test knowledge.','theory knowledge perspectives evidence'],
 ['#maps/design','MYP design cycle','Move between investigating, developing, creating and evaluating.','design cycle prototype'],
 ['#examples','Lesson examples','Adapt an original MYP or DP lesson and its daily agenda.','subject lesson daily planning'],
 ['#projects','CTE & project learning','Build a project around a useful question and visible evidence.','cte pbl milestones authentic'],
 ['#supports','Student supports & data','Rehearse interpretation with fictional data and plan a support.','scaffold differentiation intervention enrichment data'],
 ['#subjects','Subject connections','Open official MYP and DP subject curriculum links and public briefs.','math science arts language history physical education curriculum guide'],
 ['#core','DP core','Connect subject teaching with TOK, EE and CAS.','diploma extended essay creativity activity service'],
 ['#myp','MYP unit organizer','Work through inquiry, action and reflection.','unit statement inquiry global context'],
 ['#pp','Personal project','Prepare supervisor questions and review evidence.','myp pp supervisor criteria reflection'],
 ['#dates','Dates & checkpoints','Compare public IB dates with district dates and local checks.','calendar deadlines exams 2027'],
 ['#checklists','Submission checklists','Review public-source requirements and school confirmations.','assessment submissions ee ia coursework requirements'],
 ['#pd','PD & PLC meetings','Browse dated agendas, activities and available meeting resources.','archive professional development meetings sign in'],
 ['#ai','AI + IB','Check integrity guidance and adapt a teacher planning prompt.','artificial intelligence prompts authorship integrity'],
 ['#research','Education research','Read evidence, its limits and a possible classroom application.','reading evidence literature research'],
 ['#resources','Resource library','Find official guidance and educator tool collections.','tools resources library teaching'],
 ['#downloads','Fillable planning forms','Download a blank PDF for a lesson, unit or meeting.','pdf print forms download agenda']
];
export function findTools(query){const words=query.toLowerCase().trim().split(/\s+/).filter(Boolean);return toolDirectory.filter(row=>words.every(word=>row.join(' ').toLowerCase().includes(word)));}
export const teachingPaths={
 all:{label:'Across IB',prompt:'Help learners ask better questions, consider another perspective, and show how their thinking changes.',links:[['#maps/atl','Make one skill visible','Choose an ATL skill to model explicitly.'],['#examples','Try a classroom example','Adapt a question, activity and evidence check.'],['#downloads','Keep a usable plan','Download a blank lesson or unit organizer.']]},
 myp:{label:'MYP',prompt:'Start with a meaningful question. Plan the concepts, context and skills learners will use to investigate it.',links:[['#myp','Shape your unit','Connect inquiry, action and reflection.'],['#maps/atl','Teach the skill','Turn an ATL category into a visible routine.'],['#pp','Coach independent inquiry','Prepare a personal-project conversation.']]},
 dp:{label:'DP',prompt:'Make disciplinary thinking visible. Help learners test claims, weigh evidence and take responsibility for their work.',links:[['#subjects','Start with your subject','Find a teaching connection worth exploring.'],['#maps/tok','Open another perspective','Connect subject knowledge to a TOK question.'],['#checklists/requirements','Check the requirements','Separate public guidance from local confirmations.']]}
};
export const pageContinuations={
 new:['One small teaching move is enough to begin.',['#examples','See a worked lesson'],['#maps/atl','Explore ATL skills']],
 maps:['Turn the selected connection into a classroom task.',['#examples','Find a lesson example'],['#myp','Build a unit']],
 examples:['Keep your adapted agenda, then decide what learning evidence to collect.',['#downloads/lesson','Get a fillable lesson plan'],['#supports','Plan a support']],
 projects:['Keep the question, milestones and evidence connected.',['#maps/design','Explore the design cycle'],['#examples/design','See design examples']],
 supports:['Use the practice to ask better questions, not label a learner.',['#examples','Adapt a teaching task'],['#pd','Bring a question to your PLC']],
 subjects:['Move from a subject connection to something you can teach.',['#examples','Choose a lesson example'],['#core','Connect to the DP core']],
 core:['Make one connection explicit without turning every activity into an assessed requirement.',['#maps/tok','Explore TOK lenses'],['#checklists/requirements','Review core requirements']],
 myp:['Keep a copy of your draft before leaving or reloading the tab.',['#downloads/myp','Get the fillable unit PDF'],['#maps/atl','Choose an ATL practice']],
 pp:['Use questions and evidence to support the learner’s own decisions.',['#maps/atl','Review ATL connections'],['#checklists/myp-upload','Check submission guidance']],
 dates:['Confirm the school hand-in date before using an IB deadline in a student plan.',['#checklists','Open preparation checklists'],['#pd','Review meeting materials']],
 checklists:['Your ticks are a personal review, not a submission record.',['#dates','Check public dates'],['#downloads','Get planning forms']],
 ai:['Keep the teacher’s judgement and the learner’s authorship visible.',['#resources','Browse teaching tools'],['#workshop/technology','Try the technology lab']],
 research:['Choose one finding to test, and one sign that would change your mind.',['#examples','Adapt a classroom task'],['#pd','Plan a PLC discussion']],
 resources:['Choose a resource for a learning purpose, then check access and current guidance.',['#downloads','Get fillable planning forms'],['#ai','Review AI + IB guidance']],
 downloads:['Save and reopen the downloaded file to check that your entries remain.',['#myp','Use the online unit organizer'],['#examples','Find a lesson starting point']],
 pd:['Leave with a next step, an owner and a way to see what changed.',['#workshop/start','Open the teaching workshop'],['#downloads/plc','Get a meeting organizer']],
 recruitment:['Keep the group’s draft and check the accuracy of each programme claim.',['#subjects','Review subject connections'],['#new','Review programme basics']],
 history:['Choose a useful next step and keep a copy of your planning note.',['#history/notes','Keep a planning note'],['#subjects','Browse subject groups']],
 about:['Start with the work you need to do today.',['#history','Open the History guide'],['#examples','Plan a lesson']]
};
