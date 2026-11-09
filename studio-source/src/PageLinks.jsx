import React from 'react';
export function focusSection(selector){
 const node=document.querySelector(selector);if(!node)return;
 for(let p=node.parentElement;p;p=p.parentElement)if(p.tagName==='DETAILS')p.open=true;
 if(!node.hasAttribute('tabindex'))node.setAttribute('tabindex','-1');
 node.scrollIntoView({block:'start',behavior:'auto'});node.focus({preventScroll:true});
}
export default function PageLinks({items,label='On this page'}){return <nav className="page-links" aria-label={label}><span>{label}</span><ol>{items.map(([title,target])=><li key={target}><a href={target} onClick={e=>{e.preventDefault();focusSection(target)}}>{title}</a></li>)}</ol></nav>}
