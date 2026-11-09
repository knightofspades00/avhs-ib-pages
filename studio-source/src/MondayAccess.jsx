import React from 'react';
import {ArrowUpRight, ClipboardCheck, Presentation} from 'lucide-react';
import {staffSignIn} from './plcMeetingData.js';

export default function MondayAccess(){return <section className="monday-access" id="meeting-access" tabIndex={-1} aria-labelledby="meeting-access-title">
 <h3 id="meeting-access-title">Start here · Monday’s meeting</h3>
 <div className="monday-access-grid">
  <div className="monday-signin"><ClipboardCheck size={21} aria-hidden="true"/><div><h4>Academy MOU sign-in</h4><p>Scan to sign in directly, or use the button below. A school account may be required.</p><img className="monday-signin-qr" src="./meeting/academy-mou-signin-qr.png" width="260" height="260" alt="QR code for Academy MOU sign-in"/><a className="monday-signin-short" href="https://bit.ly/academyplcmou" target="_blank" rel="noopener noreferrer">bit.ly/academyplcmou<span className="sr-only"> (sign-in, opens a new tab)</span></a><a className="btn gold" href={staffSignIn.links[0].url} target="_blank" rel="noopener noreferrer">Open sign-in form <ArrowUpRight size={16} aria-hidden="true"/><span className="sr-only"> (Google Forms, opens a new tab)</span></a></div></div>
  <div className="monday-presentation"><Presentation size={21} aria-hidden="true"/><div><h4>Chronopoulos’s presentation</h4><p className="monday-presentation-theme">Many Hands Make Light Work</p><p className="monday-presentation-title">ACADEMY MOU PRESENTATION 11/9</p><p>Presented during the meeting. Public viewing link pending.</p></div></div>
 </div>
 </section>}
