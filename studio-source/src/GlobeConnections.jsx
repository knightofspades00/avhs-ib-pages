import React,{useId,useState} from 'react';
import {ArrowRight} from 'lucide-react';
import './academyBrand.css';

export const globeConnections=[
 {id:'atl',short:'ATL',title:'Skills for learning',question:'What will students do when the answer is not obvious?',practice:'Choose a skill, model it, then look for students using it in their own work.',link:'#maps/atl',action:'Open the ATL diagram',angle:0},
 {id:'tok',short:'TOK',title:'Questions about knowledge',question:'What would count as convincing evidence here?',practice:'Compare how two subjects would test the same claim. Use this as a DP TOK connection.',link:'#maps/tok',action:'Open the TOK diagram',angle:26},
 {id:'design',short:'Design',title:'Ideas into action',question:'Whose needs should shape what we make?',practice:'Identify a need, test an idea and use feedback to improve it. MYP Design is distinct from Personal Project assessment.',link:'#maps/design',action:'Open the design cycle',angle:-24}
];
export function ConnectionGlobe({selected='atl'}){
 const uid=useId().replace(/:/g,''), item=globeConnections.find(x=>x.id===selected)||globeConnections[0];
 return <svg className="connection-globe" viewBox="0 0 160 160" aria-hidden="true" focusable="false">
  <defs><radialGradient id={`${uid}-sphere`} cx="32%" cy="25%"><stop offset="0" stopColor="#c5b358" stopOpacity=".13"/><stop offset="1" stopColor="#c5b358" stopOpacity=".015"/></radialGradient></defs>
  <circle cx="80" cy="80" r="61" fill={`url(#${uid}-sphere)`} stroke="#bda660" strokeWidth="1.2"/>
  <g className="globe-meridians" style={{transform:`rotate(${item.angle}deg)`}} fill="none" stroke="#bda660" strokeOpacity=".42" strokeWidth=".8"><ellipse cx="80" cy="80" rx="27" ry="61"/><ellipse cx="80" cy="80" rx="49" ry="61"/><ellipse cx="80" cy="80" rx="61" ry="22"/><path d="M25 54 Q80 84 135 54 M25 106 Q80 76 135 106 M19 80H141 M80 19V141"/></g>
  <path className="globe-connection-path" d={selected==='atl'?'M38 42Q71 125 130 74':selected==='tok'?'M130 74Q44 31 62 134':'M62 134Q120 60 38 42'} fill="none" stroke="#94b9df" strokeWidth="2.5"/>
  {[[38,42,'atl'],[130,74,'tok'],[62,134,'design']].map(([x,y,id])=><g key={id}><circle cx={x} cy={y} r={id===selected?7:4} fill={id===selected?'#b7d2ee':'#c5b358'} stroke="#11110f" strokeWidth="2"/>{id===selected&&<circle cx={x} cy={y} r="11" fill="none" stroke="#94b9df" strokeOpacity=".6"/>}</g>)}
 </svg>
}
export default function GlobeConnections(){
 const [selected,setSelected]=useState('atl');const item=globeConnections.find(x=>x.id===selected);const uid=useId();
 return <aside className="home-frameworks globe-connections" aria-labelledby={`${uid}-heading`}>
  <div className="globe-connections-heading"><h2 id={`${uid}-heading`}>Bring a question<br/>to class</h2><ConnectionGlobe selected={selected}/></div>
  <div className="globe-lenses" role="group" aria-label="Choose a teaching connection">{globeConnections.map(x=><button key={x.id} type="button" aria-pressed={selected===x.id} aria-controls={`${uid}-prompt`} onClick={()=>setSelected(x.id)}>{x.short}</button>)}</div>
  <div className="globe-prompt" id={`${uid}-prompt`} aria-live="polite" aria-atomic="true"><p className="globe-prompt-label">{item.title}</p><p className="globe-question">{item.question}</p><p className="globe-practice">{item.practice}</p><a href={item.link}>{item.action}<ArrowRight size={16}/></a></div>
  <small className="globe-caption">Original classroom prompts. Explore each diagram for more.</small>
 </aside>
}
