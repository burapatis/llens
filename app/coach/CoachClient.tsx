"use client";

import { useState } from "react";

const tasks = ["วิเคราะห์ผู้เรียน","เสนอวิธีสอน","ออกแบบกิจกรรม","สร้างแผนประเมิน"];
const starters: Record<string,string> = {
  "วิเคราะห์ผู้เรียน":"ผู้เรียนใช้รหัส P5-07 ในคาบวิทยาศาสตร์อธิบายด้วยปากเปล่าได้ แต่เริ่มเขียนช้าและส่งงานไม่ครบ เมื่อใช้แผนภาพจะมีส่วนร่วมมากขึ้น",
  "เสนอวิธีสอน":"เป้าหมายคือให้ผู้เรียนอธิบายเหตุและผล ห้องเรียนมีความพร้อมต่างกันและบางคนอ่านโจทย์ยาวได้ช้า",
  "ออกแบบกิจกรรม":"ช่วยออกแบบกิจกรรม 30 นาที เรื่องระบบนิเวศ ที่มีทางเลือกในการรับข้อมูลและแสดงความเข้าใจ",
  "สร้างแผนประเมิน":"ช่วยสร้าง Exit Ticket เพื่อดูความเข้าใจและเลือกก้าวถัดไป โดยไม่เน้นความจำเพียงอย่างเดียว",
};

export default function CoachClient(){
  const [task,setTask]=useState(tasks[0]); const [input,setInput]=useState(""); const [answer,setAnswer]=useState(false);
  const generate=()=>{if(input.trim().length<12)return;setAnswer(true)};
  return <section className="subpage-section coach-page" id="top"><div className="coach-workspace"><aside><span className="section-kicker left">CHOOSE A TASK</span><h2>วันนี้อยากคิดเรื่องใด?</h2>{tasks.map(item=><button className={task===item?"active":""} onClick={()=>{setTask(item);setInput(starters[item]);setAnswer(false)}} key={item}><span>✦</span>{item}</button>)}<div className="privacy-card"><strong>ก่อนพิมพ์</strong><p>ใช้รหัสแทนชื่อจริง ลบข้อมูลสุขภาพ ที่อยู่ ครอบครัว และข้อมูลระบุตัวตนที่ไม่จำเป็น</p><a href="/principles#responsible-ai">อ่านหลักการใช้ AI →</a></div></aside><div className="coach-console"><header><div><span>✦</span><strong>LearnerLens Coach</strong></div><small>โหมดสาธิต · ประมวลผลใน Browser</small></header><div className="task-label">{task}</div><label>อธิบายสถานการณ์ เป้าหมาย และหลักฐานที่มี<textarea value={input} onChange={e=>{setInput(e.target.value);setAnswer(false)}} placeholder="เขียนเฉพาะข้อมูลที่จำเป็น โดยไม่ใช้ชื่อจริง..." /></label><div className="console-actions"><button className="outline-action" onClick={()=>setInput(starters[task])}>ใช้ตัวอย่าง</button><button className="primary-button" disabled={input.trim().length<12} onClick={generate}>วิเคราะห์และเสนอแนวทาง →</button></div>{answer&&<div className="generated-answer" role="status"><span className="case-tag">แนวทางเบื้องต้น</span><h2>เริ่มจากสิ่งที่รู้ แยกจากสิ่งที่ต้องตรวจสอบ</h2><div className="answer-grid"><div><h3>จุดแข็ง/โอกาส</h3><p>ข้อมูลแสดงว่าผู้เรียนมีช่องทางหรือบริบทที่ช่วยให้แสดงความเข้าใจได้ ควรรักษาเป้าหมายเดิมและเปิดทางเลือกที่สอดคล้องกับงาน</p></div><div><h3>สมมติฐานที่ต้องตรวจสอบ</h3><p>อย่าเพิ่งสรุปว่าเป็นความสามารถถาวร ลองตรวจคำสั่ง เวลา ความซับซ้อนของงาน ความรู้เดิม และมุมมองของผู้เรียน</p></div><div><h3>ทดลองในคาบถัดไป</h3><ol><li>ทำเป้าหมายและเกณฑ์ให้เห็นชัด</li><li>ให้ทางเลือก 2 วิธีในการเข้าถึงหรือแสดงความเข้าใจ</li><li>เก็บหลักฐานสั้น ๆ แล้วถามผู้เรียนว่าอะไรช่วย</li></ol></div><div><h3>เกณฑ์ติดตามผล</h3><p>บันทึกการเริ่มงาน การมีส่วนร่วม คุณภาพของเหตุผล และการพึ่งพาการช่วยเหลือ เปรียบเทียบ 2–3 ครั้งก่อนสรุป</p></div></div><p className="ai-caution">ตรวจสอบคำแนะนำกับบริบทจริง หากเกี่ยวข้องกับสุขภาวะหรือความต้องการเฉพาะ ควรปรึกษาผู้เชี่ยวชาญที่เหมาะสม</p></div>}</div></div><div className="next-links"><a href="/prompts">เลือก Prompt ฉบับเต็ม →</a><a href="/toolkit">สร้าง Learner Profile →</a></div></section>;
}
