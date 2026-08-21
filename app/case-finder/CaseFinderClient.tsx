"use client";

import { useMemo, useState } from "react";
import { searchItems } from "../_data/search-index";

const caseItems = searchItems.filter(item => item.category === "กรณีศึกษา" && item.href.startsWith("/cases#"));
const ids = (items: string[]) => new Set(items);
const family = ids(["family-instability","violence-disclosure","grief-caregiver"]);
const bullying = ids(["repeated-bullying","cyberbullying"]);
const learning = ids(["reading-difficulty","cognitive-access","language-not-ability","twice-exceptional"]);
const teaching = ids(["voice-choice","meaningful-goals","scaffolding","external-supports","responsive-assessment","inclusive-dialogue"]);
const primary = ids(["voice-choice","external-supports","family-instability","repeated-bullying","reading-difficulty","cognitive-access"]);
const secondary = ids(["meaningful-goals","scaffolding","responsive-assessment","cyberbullying","peer-conflict","language-not-ability","twice-exceptional","withdrawal-distress"]);
const labels: Record<string,string> = { teaching:"การออกแบบการสอน",family:"ครอบครัวและความปลอดภัย",bullying:"การบูลลี่",friends:"เพื่อนและความสัมพันธ์",learning:"การเรียนรู้และการเข้าถึง",wellbeing:"สุขภาวะและอารมณ์" };
const getId = (href:string) => href.split("#")[1] || "";
const getTheme = (id:string) => family.has(id)?"family":bullying.has(id)?"bullying":id==="peer-conflict"?"friends":learning.has(id)?"learning":id==="withdrawal-distress"?"wellbeing":teaching.has(id)?"teaching":"learning";
const getAge = (id:string) => primary.has(id)?"primary":secondary.has(id)?"secondary":"all";

export default function CaseFinderClient() {
  const [query,setQuery] = useState("");
  const [theme,setTheme] = useState("all");
  const [age,setAge] = useState("all");
  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("th");
    return caseItems.filter(item => {
      const id = getId(item.href); const itemTheme = getTheme(id); const itemAge = getAge(id);
      const haystack = [item.title,item.description,...item.keywords].join(" ").toLocaleLowerCase("th");
      return (theme==="all"||itemTheme===theme) && (age==="all"||itemAge===age||itemAge==="all") && (!normalized||haystack.includes(normalized));
    });
  },[query,theme,age]);
  const reset=()=>{setQuery("");setTheme("all");setAge("all")};

  return <section className="subpage-section case-finder" id="top">
    <div className="case-filter-panel"><header><div><span className="section-kicker left">FILTER &amp; SEARCH</span><h2>เริ่มจากสิ่งที่ครูสังเกตเห็น</h2></div><strong>{results.length}<small>/{caseItems.length} กรณี</small></strong></header>
      <label className="case-search"><span aria-hidden="true">⌕</span><span className="sr-only">ค้นหากรณีศึกษา</span><input type="search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="เช่น ไม่เริ่มงาน บูลลี่ ครอบครัว อ่านช้า..."/></label>
      <div className="case-filter-row"><fieldset><legend>ประเภทสถานการณ์</legend><div>{[["all","ทั้งหมด"],...Object.entries(labels)].map(([value,label])=><button type="button" className={theme===value?"active":""} aria-pressed={theme===value} onClick={()=>setTheme(value)} key={value}>{label}</button>)}</div></fieldset><fieldset><legend>ช่วงวัย</legend><div>{[["all","ทุกช่วงวัย"],["primary","ประถมศึกษา"],["secondary","มัธยมศึกษา"]].map(([value,label])=><button type="button" className={age===value?"active":""} aria-pressed={age===value} onClick={()=>setAge(value)} key={value}>{label}</button>)}</div></fieldset></div>
    </div>
    <div className="case-result-grid">{results.map(item=>{const id=getId(item.href);return <article key={item.href}><div><span className="case-tag">{labels[getTheme(id)]}</span><small>{getAge(id)==="primary"?"ประถมศึกษา":getAge(id)==="secondary"?"มัธยมศึกษา":"ทุกช่วงวัย"}</small></div><h2>{item.title}</h2><p>{item.description}</p><div className="case-keywords">{item.keywords.slice(0,4).map(keyword=><span key={keyword}>{keyword}</span>)}</div><a href={item.href}>เปิดกรณีศึกษาฉบับเต็ม →</a></article>})}</div>
    {results.length===0&&<div className="case-filter-empty" role="status"><strong>ยังไม่พบกรณีที่ตรงกัน</strong><p>ลองใช้คำสั้นลง หรือกลับไปแสดงทุกประเภท</p><button type="button" onClick={reset}>ล้างตัวกรอง</button></div>}
    <aside className="case-finder-note"><strong>ตัวกรองช่วยค้นหา—not diagnose</strong><p>กรณีที่คล้ายกันอาจมีสาเหตุต่างกัน ใช้กรณีศึกษาเพื่อสร้างคำถามและเลือกหลักฐาน ไม่ใช้ยืนยันการวินิจฉัยหรือสรุปเจตนาของผู้เรียน</p><a href="/toolkit#observation-log">เริ่มบันทึกหลักฐาน →</a></aside>
  </section>;
}
