import React,{useEffect,useState} from 'react';
import {ChevronRight} from 'lucide-react';
import {breadcrumbsFor} from './navigationData.js';
export default function Breadcrumbs({hash}){
 const [current,setCurrent]=useState(hash);
 useEffect(()=>{setCurrent(hash)},[hash]);
 useEffect(()=>{const update=()=>setCurrent(location.hash.slice(1)||'home');window.addEventListener('studio-detail',update);return()=>window.removeEventListener('studio-detail',update)},[]);
 const crumbs=breadcrumbsFor(current);
 useEffect(()=>{document.title=crumbs[crumbs.length-1].label+' | AVHS IB'},[current]);
 return <nav className="breadcrumb" aria-label="Breadcrumb"><ol>{crumbs.map((c,i)=><li key={c.href}>{i>0&&<ChevronRight size={13} aria-hidden="true"/>}{i===crumbs.length-1?<span aria-current="page">{c.label}</span>:<a href={c.href}>{c.label}</a>}</li>)}</ol></nav>
}
