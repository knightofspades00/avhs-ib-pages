export function meetingLaunchLabel(now=new Date(),meetingId='nov09-mou'){
 const day=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Los_Angeles',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
 if(meetingId==='nov10-pd')return day==='2026-11-10'?"Today's collaboration":'November 10 collaboration';
 return day==='2026-11-09'?"Today's meeting":"November 9 meeting";
}
