"use client";

import Fuse from "fuse.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { searchItems } from "../_data/search-index";

const categoryIcon: Record<string,string> = { "ความรู้":"◉", "กรณีศึกษา":"◇", "เครื่องมือ":"▤", "เส้นทาง":"↗", "ทรัพยากร":"↓" };

export function GlobalSearch() {
  const [open,setOpen] = useState(false);
  const [query,setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const fuse = useMemo(()=>new Fuse(searchItems,{keys:[{name:"title",weight:0.45},{name:"description",weight:0.25},{name:"keywords",weight:0.3}],threshold:0.34,ignoreLocation:true,includeScore:true}),[]);
  const results = useMemo(()=>query.trim()?fuse.search(query.trim()).slice(0,10).map(result=>result.item):searchItems.slice(0,8),[fuse,query]);

  const show = () => { setOpen(true); window.setTimeout(()=>inputRef.current?.focus(),0); };
  useEffect(()=>{queueMicrotask(()=>{const initial=new URLSearchParams(window.location.search).get("q");if(initial){setQuery(initial);setOpen(true);window.setTimeout(()=>inputRef.current?.focus(),0)}})},[]);
  useEffect(()=>{
    const onKeyDown=(event:KeyboardEvent)=>{
      if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==="k"){event.preventDefault();show();}
      if(event.key==="/"&&!open&&document.activeElement?.tagName!=="INPUT"&&document.activeElement?.tagName!=="TEXTAREA"){event.preventDefault();show();}
      if(event.key==="Escape")setOpen(false);
    };
    window.addEventListener("keydown",onKeyDown);
    return()=>window.removeEventListener("keydown",onKeyDown);
  },[open]);

  return <><button className="global-search-button" type="button" onClick={show} aria-haspopup="dialog"><span aria-hidden="true">⌕</span><span>ค้นหาทั้งเว็บไซต์</span><kbd>⌘ K</kbd></button>{open&&<div className="global-search-overlay" role="dialog" aria-modal="true" aria-label="ค้นหาทั้งเว็บไซต์"><div className="global-search-panel"><div className="global-search-input"><span aria-hidden="true">⌕</span><label className="sr-only" htmlFor="global-search">คำค้น</label><input id="global-search" ref={inputRef} value={query} onChange={event=>setQuery(event.target.value)} placeholder="ค้นหา UDL, แรงจูงใจ, แบบสังเกต..."/><button type="button" onClick={()=>setOpen(false)} aria-label="ปิดหน้าค้นหา">ESC</button></div><div className="search-summary"><span>{query?`ผลลัพธ์สำหรับ “${query}”`:"หัวข้อแนะนำ"}</span><small>{results.length} รายการ</small></div><nav className="global-search-results" aria-label="ผลการค้นหา">{results.map(item=><a href={item.href} key={`${item.href}-${item.title}`} onClick={()=>setOpen(false)}><span className="result-icon" aria-hidden="true">{categoryIcon[item.category]}</span><span><small>{item.category}</small><strong>{item.title}</strong><em>{item.description}</em></span><b aria-hidden="true">→</b></a>)}{results.length===0&&<div className="search-empty"><strong>ยังไม่พบหัวข้อนี้</strong><p>ลองใช้คำสั้นลง เช่น “UDL”, “แรงจูงใจ” หรือ “แบบสังเกต”</p></div>}</nav><div className="search-help"><span><kbd>ESC</kbd> ปิด</span><span>ข้อมูลค้นหาอยู่ในเว็บไซต์ ไม่ส่งคำค้นออกไปภายนอก</span></div></div></div>}</>;
}
