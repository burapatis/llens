"use client";

import { useEffect, useState } from "react";

const levels = [
  { level:"BEGINNER", title:"เปิดเลนส์ เข้าใจความแตกต่าง", time:"4 บทเรียน · 45 นาที", modules:["มองผู้เรียนทั้งคน","พัฒนาการและบริบท","จากความเชื่อสู่หลักฐาน","Reflection แรก"] },
  { level:"INTERMEDIATE", title:"อ่านร่องรอยการเรียนรู้", time:"5 บทเรียน · 75 นาที", modules:["สังเกตอย่างไม่ตัดสิน","ฟังเสียงผู้เรียน","แรงจูงใจและ Self-efficacy","Executive Functions","สร้าง Learner Profile"] },
  { level:"ADVANCED", title:"ออกแบบห้องเรียนที่ยืดหยุ่น", time:"5 บทเรียน · 2 ชั่วโมง", modules:["เป้าหมายที่ชัด","UDL 3.0","Differentiation","Assessment for Learning","ทดลองและปรับ"] },
  { level:"EXPERT", title:"นำการเปลี่ยนแปลงด้วยข้อมูล", time:"4 ภารกิจ · Project-based", modules:["โจทย์พัฒนาห้องเรียน","วงจรหลักฐาน","ชุมชนวิชาชีพ","Portfolio และการแบ่งปัน"] },
];

export default function PathsClient() {
  const total = levels.reduce((sum,level)=>sum+level.modules.length,0);
  const [done,setDone] = useState<string[]>([]);
  useEffect(()=>{queueMicrotask(()=>{const raw=localStorage.getItem("learnerlens-path-modules");if(raw)try{setDone(JSON.parse(raw));}catch{localStorage.removeItem("learnerlens-path-modules");}})},[]);
  const toggle=(id:string)=>{const next=done.includes(id)?done.filter(item=>item!==id):[...done,id];setDone(next);localStorage.setItem("learnerlens-path-modules",JSON.stringify(next));};
  const percent=Math.round(done.length/total*100);
  return <section className="subpage-section path-page" id="top"><div className="overall-progress"><div><span className="section-kicker left">YOUR PROGRESS</span><strong>{percent}%</strong><p>{done.length} จาก {total} บทเรียน</p></div><div className="big-meter"><i style={{width:`${percent}%`}}/></div></div><div className="level-stack">{levels.map((level,levelIndex)=>{const levelDone=level.modules.filter((_,index)=>done.includes(`${levelIndex}-${index}`)).length;return <article key={level.level} className="level-card"><header><span>{String(levelIndex+1).padStart(2,"0")}</span><div><small>{level.level}</small><h2>{level.title}</h2><p>{level.time}</p></div><strong>{levelDone}/{level.modules.length}</strong></header><div className="module-list">{level.modules.map((module,index)=>{const id=`${levelIndex}-${index}`;return <label key={id} className={done.includes(id)?"done":""}><input type="checkbox" checked={done.includes(id)} onChange={()=>toggle(id)}/><span>{done.includes(id)?"✓":index+1}</span><div><strong>{module}</strong><small>{done.includes(id)?"เรียนจบแล้ว":"ใช้เวลาประมาณ 10–20 นาที"}</small></div></label>})}</div></article>})}</div><div className="next-links"><a href="/knowledge">เปิดคลังความรู้ประกอบบทเรียน →</a><a href="/assessment">ประเมินความพร้อมของตนเอง →</a></div></section>;
}
