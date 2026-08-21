"use client";

import { useEffect, useState } from "react";

type Profile = { code: string; strengths: string; interests: string; evidence: string; barriers: string; nextStep: string };
const emptyProfile: Profile = { code: "", strengths: "", interests: "", evidence: "", barriers: "", nextStep: "" };
const tools = [
  ["✓", "Checklist", "ทบทวนว่าข้อมูลด้านใดยังขาด ก่อนสรุปความต้องการ"],
  ["▤", "Observation Form", "บันทึกพฤติกรรม บริบท และสิ่งที่เกิดก่อน–หลังอย่างเป็นกลาง"],
  ["◇", "Interview Guide", "ฟังเสียงผู้เรียนผ่านคำถามปลายเปิดที่ไม่ชี้นำ"],
  ["◎", "Rubric", "มองความก้าวหน้าตามเกณฑ์เดียวกันและระบุก้าวถัดไป"],
];
const checklist = ["มีหลักฐานจากมากกว่าหนึ่งสถานการณ์", "บันทึกสิ่งที่สังเกตได้ แยกจากการตีความ", "ระบุจุดแข็งและความสนใจ", "ถามมุมมองของผู้เรียน", "กำหนดก้าวถัดไปที่เล็กและติดตามได้"];

export default function ToolkitClient() {
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [checks, setChecks] = useState<number[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const raw = localStorage.getItem("learnerlens-profile");
      const rawChecks = localStorage.getItem("learnerlens-toolkit-checks");
      if (raw) try { setProfile(JSON.parse(raw)); } catch { localStorage.removeItem("learnerlens-profile"); }
      if (rawChecks) try { setChecks(JSON.parse(rawChecks)); } catch { localStorage.removeItem("learnerlens-toolkit-checks"); }
    });
  }, []);

  const update = (key: keyof Profile, value: string) => { const next = { ...profile, [key]: value }; setProfile(next); setSaved(false); };
  const save = () => { localStorage.setItem("learnerlens-profile", JSON.stringify(profile)); localStorage.setItem("learnerlens-toolkit-checks", JSON.stringify(checks)); setSaved(true); };
  const toggle = (index: number) => { const next = checks.includes(index) ? checks.filter(item => item !== index) : [...checks, index]; setChecks(next); localStorage.setItem("learnerlens-toolkit-checks", JSON.stringify(next)); };
  const download = () => {
    const blob = new Blob([JSON.stringify({ learnerProfile: profile, checklistCompleted: checks, exportedAt: new Date().toISOString() }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = `learner-profile-${profile.code || "draft"}.json`; anchor.click(); URL.revokeObjectURL(url);
  };

  return <section className="subpage-section toolkit-page" id="top">
    <div className="tool-card-grid">{tools.map(tool => <article key={tool[1]}><span>{tool[0]}</span><h2>{tool[1]}</h2><p>{tool[2]}</p></article>)}</div>
    <div className="builder-layout">
      <aside className="builder-checklist"><span className="section-kicker left">QUALITY CHECK</span><h2>ก่อนสรุป Profile</h2><p>{checks.length}/{checklist.length} รายการพร้อม</p>{checklist.map((item,index)=><label className={checks.includes(index)?"checked":""} key={item}><input type="checkbox" checked={checks.includes(index)} onChange={()=>toggle(index)}/><span>{checks.includes(index)?"✓":""}</span>{item}</label>)}</aside>
      <form className="profile-builder" onSubmit={event=>{event.preventDefault();save();}}><div className="builder-head"><div><span className="section-kicker left">LEARNER PROFILE BUILDER</span><h2>ภาพผู้เรียนฉบับใช้งาน</h2></div><span>บันทึกใน Browser เท่านั้น</span></div>
        <label>รหัสผู้เรียน (ไม่ใช้ชื่อจริง)<input value={profile.code} onChange={e=>update("code",e.target.value)} placeholder="เช่น P5-07" /></label>
        <div className="form-grid"><label>จุดแข็ง<textarea value={profile.strengths} onChange={e=>update("strengths",e.target.value)} placeholder="ผู้เรียนทำอะไรได้ดี ในบริบทใด" /></label><label>ความสนใจและแรงจูงใจ<textarea value={profile.interests} onChange={e=>update("interests",e.target.value)} placeholder="อะไรทำให้ผู้เรียนอยากมีส่วนร่วม" /></label><label>หลักฐานจากการสังเกต<textarea value={profile.evidence} onChange={e=>update("evidence",e.target.value)} placeholder="บันทึกสิ่งที่เห็น/ได้ยิน ไม่ตีความเจตนา" /></label><label>อุปสรรคที่ควรตรวจสอบ<textarea value={profile.barriers} onChange={e=>update("barriers",e.target.value)} placeholder="อุปสรรคจากงาน สื่อ เวลา หรือสภาพแวดล้อม" /></label></div>
        <label>ก้าวถัดไปที่ครูจะทดลอง<textarea value={profile.nextStep} onChange={e=>update("nextStep",e.target.value)} placeholder="เล็ก ชัด ทดลองได้ และมีหลักฐานติดตาม" /></label>
        <div className="builder-actions"><button className="primary-button" type="submit">บันทึก Profile</button><button className="outline-action" type="button" onClick={download}>ดาวน์โหลด JSON</button><button className="quiet-action" type="button" onClick={()=>{setProfile(emptyProfile);setChecks([]);localStorage.removeItem("learnerlens-profile");localStorage.removeItem("learnerlens-toolkit-checks");}}>ล้างข้อมูล</button>{saved&&<strong role="status">บันทึกแล้ว ✓</strong>}</div>
      </form>
    </div>
    <div className="next-links"><a href="/coach">นำ Profile ไปคิดต่อกับ AI Coach →</a><a href="/downloads">ดาวน์โหลดแบบฟอร์มฉบับพิมพ์ →</a></div>
  </section>;
}
