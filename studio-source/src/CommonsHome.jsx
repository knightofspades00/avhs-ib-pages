import React from 'react';
import {ArrowRight,ArrowUpRight} from 'lucide-react';
import GlobeConnections from './GlobeConnections.jsx';
import {TeachingPath} from './FacultyTools.jsx';

export default function CommonsHome({path,setPath}){
 return <div className="commons-home">
  <header className="commons-hero"><div><p className="eyebrow">GLOBAL LEADERSHIP ACADEMY / YOUR TEACHING DESK</p><h1>Less searching.<br/><em>More teaching.</em></h1><p>Start with your subject, shape the next lesson, or check the next milestone. The tools you need, in the order you need them.</p></div><img src="./brand/gla-academy-logo.png" width="130" height="130" alt="Global Leadership Academy seal: creativity, knowledge, service"/></header>
  <nav className="commons-primary" aria-label="Start your work">
   <a className="featured" href="#history"><span>01 / KNOW YOUR COURSE</span><h2>My subject guide</h2><p>What to teach, assess and prepare. Explore the History pilot.</p><ArrowUpRight size={24}/></a>
   <a href="#examples"><span>02 / MAKE IT TEACHABLE</span><h2>Plan the next lesson</h2><p>A useful starting point, a clear learning question, a plan you can adapt.</p><ArrowUpRight size={24}/></a>
   <a href="#dates"><span>03 / LOOK AHEAD</span><h2>Dates &amp; submissions</h2><p>See published IB dates. Confirm your school’s hand-in milestones.</p><ArrowUpRight size={24}/></a>
  </nav>
  <div className="commons-secondary"><section aria-labelledby="continue-work"><div className="commons-section-head"><h2 id="continue-work">Keep the good work going.</h2><a href="#pd/archive">All sessions <ArrowRight size={15}/></a></div>
   <a className="commons-resource-row" href="#pd/nov10-pd"><span className="date-stamp">10<small>NOV</small></span><span><strong>Academy collaboration</strong><small>Past session · Agenda, activities and resources</small></span><ArrowUpRight size={19}/></a>
   <a className="commons-resource-row" href="#pd/nov09-mou"><span className="date-stamp">09<small>NOV</small></span><span><strong>Academy MOU meeting</strong><small>Past session · Revisit the working outline</small></span><ArrowUpRight size={19}/></a>
   <a className="commons-resource-row" href="#new"><span className="date-stamp">→</span><span><strong>New to IB?</strong><small>Programme basics and your first teaching moves</small></span><ArrowUpRight size={19}/></a>
  </section><aside className="commons-download-note"><p className="eyebrow">A SMALL DISTINCTION. A USEFUL ONE.</p><h2>Your draft or a fresh start?</h2><p><strong>Download my draft</strong> keeps the notes you entered. <strong>Download blank template</strong> gives you an empty form to fill in.</p><p>Work stays in this tab until you download it. Nothing is submitted to the school.</p><a href="#downloads">See how downloads work <ArrowRight size={15}/></a></aside></div>
  <TeachingPath path={path} setPath={setPath}/>
  <details className="commons-connections"><summary>Explore teaching connections</summary><GlobeConnections/></details>
 </div>
}
