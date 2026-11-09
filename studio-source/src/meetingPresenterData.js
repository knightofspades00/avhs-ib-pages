export function meetingLaunchLabel(now=new Date()){
 const day=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Los_Angeles',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
 return day==='2026-11-09'?"Today's meeting":"November 9 meeting";
}
