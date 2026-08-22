"use client";

import { useEffect, useState } from "react";

const levels = [
  { level:"BEGINNER", title:"เปิดเลนส์ เข้าใจความแตกต่าง", time:"4 บทเรียน · 45 นาที", modules:[
    { title:"มองผู้เรียนทั้งคน", href:"/whole-learner", action:"ศึกษาแผนที่ 8 มิติ แล้วเลือกเด็กหนึ่งคนเพื่อทดลองสังเกต" },
    { title:"พัฒนาการและบริบท", href:"/articles/child-development", action:"อ่านสรุปและตัวอย่าง แล้วตอบคำถามสะท้อนคิดท้ายบท" },
    { title:"จากความเชื่อสู่หลักฐาน", href:"/articles/learning-preferences", action:"ทบทวนความเชื่อเดิม และแยกข้อสรุปที่มีหรือยังไม่มีหลักฐาน" },
    { title:"Reflection แรก", href:"/assessment", action:"ประเมินตนเองเพื่อเลือกด้านที่จะพัฒนาก่อนหนึ่งด้าน" },
  ] },
  { level:"INTERMEDIATE", title:"อ่านร่องรอยการเรียนรู้", time:"5 บทเรียน · 75 นาที", modules:[
    { title:"สังเกตอย่างไม่ตัดสิน", href:"/toolkit#observation-log", action:"ทดลองบันทึกสิ่งที่เห็นตามจริงอย่างน้อยหนึ่งเหตุการณ์" },
    { title:"ฟังเสียงผู้เรียน", href:"/toolkit#interview-guide", action:"เลือกคำถาม 2–3 ข้อไปสนทนากับผู้เรียนโดยไม่ซักนำ" },
    { title:"แรงจูงใจและ Self-efficacy", href:"/articles/motivation", action:"อ่านหลักการ แล้วค้นหาเงื่อนไขที่ผู้เรียนรู้สึกว่าตนเองทำได้" },
    { title:"Executive Functions", href:"/articles/executive-functions", action:"แยกความยากด้านเริ่มงาน วางแผน จดจำ หรือเปลี่ยนวิธี" },
    { title:"สร้าง Learner Profile", href:"/toolkit#profile-builder", action:"รวมจุดแข็ง ความสนใจ อุปสรรค และตัวช่วยจากหลายหลักฐาน" },
  ] },
  { level:"ADVANCED", title:"ออกแบบห้องเรียนที่ยืดหยุ่น", time:"5 บทเรียน · 2 ชั่วโมง", modules:[
    { title:"เป้าหมายที่ชัด", href:"/articles/assessment-for-learning", action:"เขียนเป้าหมายและเกณฑ์ความสำเร็จที่ผู้เรียนเข้าใจได้" },
    { title:"UDL 3.0", href:"/articles/udl", action:"เพิ่มทางเลือกหนึ่งจุด โดยยังคงเป้าหมายการเรียนรู้เดิม" },
    { title:"Differentiation", href:"/articles/differentiation", action:"วางระดับการพยุงจากข้อมูลล่าสุด ไม่ใช่ป้ายความสามารถ" },
    { title:"Assessment for Learning", href:"/articles/assessment-for-learning", action:"ออกแบบหลักฐานระหว่างเรียนที่ใช้ตัดสินใจก้าวถัดไปได้" },
    { title:"ทดลองและปรับ", href:"/follow-up", action:"ทดลองหนึ่งการปรับเป็นเวลา 2–4 สัปดาห์ แล้วทบทวนผล" },
  ] },
  { level:"EXPERT", title:"นำการเปลี่ยนแปลงด้วยข้อมูล", time:"4 ภารกิจ · Project-based", modules:[
    { title:"โจทย์พัฒนาห้องเรียน", href:"/start", action:"ตั้งคำถามพัฒนาที่เล็ก ชัด และตอบได้จากหลักฐานในห้องเรียน" },
    { title:"วงจรหลักฐาน", href:"/follow-up", action:"กำหนดข้อมูลฐานเดิม ทดลอง ติดตาม และตัดสินใจว่าจะคงหรือปรับ" },
    { title:"ชุมชนวิชาชีพ", href:"/cases", action:"เลือกกรณีศึกษาเพื่อสนทนาเปรียบเทียบกับบริบทของทีมครู" },
    { title:"Portfolio และการแบ่งปัน", href:"/downloads", action:"รวบรวมโจทย์ หลักฐาน การตัดสินใจ และสิ่งที่เรียนรู้โดยไม่เปิดเผยตัวเด็ก" },
  ] },
];

export default function PathsClient() {
  const total = levels.reduce((sum,level)=>sum+level.modules.length,0);
  const [done,setDone] = useState<string[]>([]);
  useEffect(()=>{queueMicrotask(()=>{const raw=localStorage.getItem("learnerlens-path-modules");if(raw)try{setDone(JSON.parse(raw));}catch{localStorage.removeItem("learnerlens-path-modules");}})},[]);
  const toggle=(id:string)=>{const next=done.includes(id)?done.filter(item=>item!==id):[...done,id];setDone(next);localStorage.setItem("learnerlens-path-modules",JSON.stringify(next));};
  const percent=Math.round(done.length/total*100);
  return <section className="subpage-section path-page" id="top">
    <section className="path-guide" aria-labelledby="path-guide-title">
      <div className="path-guide-heading"><span className="section-kicker left">HOW TO USE THIS PAGE</span><h2 id="path-guide-title">หน้านี้คือแผนที่การเรียนรู้และเช็กลิสต์ส่วนตัว</h2><p>ไม่ใช่บทเรียนทั้งหมดในหน้าเดียว ให้ใช้รายการด้านล่างเพื่อเปิดเนื้อหาที่เกี่ยวข้อง ลงมือทำทีละเรื่อง แล้วกลับมาบันทึกความก้าวหน้า</p></div>
      <ol className="path-guide-steps">
        <li><span>1</span><div><strong>เลือกจุดเริ่ม</strong><p>หากเพิ่งเริ่ม แนะนำให้เรียนจาก Beginner ตามลำดับ แต่หากมีโจทย์เร่งด่วนสามารถเลือกบทที่ตรงกับงานได้ทันที</p></div></li>
        <li><span>2</span><div><strong>เปิดเนื้อหา</strong><p>กด “เปิดเนื้อหา/เครื่องมือ” ในแต่ละบท แล้วอ่านสรุป ตัวอย่าง และคำถามสะท้อนคิด</p></div></li>
        <li><span>3</span><div><strong>ลองใช้กับงานจริง</strong><p>ทำกิจกรรมสั้นที่ระบุใต้ชื่อบท เช่น ทดลองสังเกต สร้างโปรไฟล์ หรือปรับบทเรียนหนึ่งจุด</p></div></li>
        <li><span>4</span><div><strong>กลับมาติ๊กเมื่อจบ</strong><p>ติ๊กเมื่ออ่านสาระสำคัญและได้สะท้อนคิดหรือลองทำแล้ว ไม่จำเป็นต้องเรียนครบในครั้งเดียว</p></div></li>
      </ol>
      <div className="path-guide-notes"><p><strong>ควรทำอะไร?</strong> เปิดเนื้อหา → อ่าน/สำรวจ → ทดลองหรือสะท้อนคิด → ติ๊กบันทึก</p><p><strong>ต้องทำทุกบทหรือไม่?</strong> ไม่จำเป็น เลือกตามเป้าหมายได้ และกลับมาเรียนต่อภายหลังได้</p><small>ไม่มีคะแนนสอบและไม่ใช้จัดอันดับ ความก้าวหน้าบันทึกเฉพาะ Browser บนอุปกรณ์นี้ การล้างข้อมูล Browser อาจทำให้สถานะเริ่มใหม่</small></div>
      <a className="path-start-link" href="#level-1">เริ่มที่บทแรก <span aria-hidden="true">↓</span></a>
    </section>
    <div className="overall-progress"><div><span className="section-kicker left">YOUR PROGRESS</span><strong>{percent}%</strong><p>{done.length} จาก {total} บทเรียน</p></div><div><div className="big-meter" aria-label={`ความก้าวหน้า ${percent}%`}><i style={{width:`${percent}%`}}/></div><small>ติ๊กบทที่ทำเสร็จแล้วเพื่อบันทึกความก้าวหน้า</small></div></div>
    <div className="level-stack">{levels.map((level,levelIndex)=>{const levelDone=level.modules.filter((_,index)=>done.includes(`${levelIndex}-${index}`)).length;return <article key={level.level} className="level-card" id={`level-${levelIndex+1}`}><header><span>{String(levelIndex+1).padStart(2,"0")}</span><div><small>{level.level}</small><h2>{level.title}</h2><p>{level.time}</p></div><strong>{levelDone}/{level.modules.length}</strong></header><div className="module-list">{level.modules.map((module,index)=>{const id=`${levelIndex}-${index}`;const isDone=done.includes(id);return <article key={id} className={isDone?"module-item done":"module-item"}><label><input type="checkbox" checked={isDone} onChange={()=>toggle(id)}/><span>{isDone?"✓":index+1}</span><span className="sr-only">ทำเครื่องหมายบท {module.title} ว่าเรียนจบแล้ว</span></label><div><strong>{module.title}</strong><small>{isDone?"บันทึกว่าเรียนจบแล้ว":module.action}</small><a href={module.href}>{module.href.includes("toolkit")?"เปิดเครื่องมือ":"เปิดเนื้อหา"} <span aria-hidden="true">→</span></a></div></article>})}</div></article>})}</div>
    <div className="next-links"><a href="/knowledge">เปิดคลังความรู้ประกอบบทเรียน →</a><a href="/assessment">ประเมินความพร้อมของตนเอง →</a></div>
  </section>;
}
