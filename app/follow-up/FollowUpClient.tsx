"use client";

import { useEffect, useMemo, useState } from "react";

type Plan = { learnerCode: string; goal: string; action: string; evidence: string; startDate: string; reviewWeeks: number };
type CheckIn = { id: string; date: string; evidence: string; response: "better" | "same" | "adjust"; nextStep: string };
type FollowUpData = { plan: Plan; checkIns: CheckIn[]; updatedAt: string };

const STORAGE_KEY = "learnerlens-follow-up";
const emptyPlan: Plan = { learnerCode: "", goal: "", action: "", evidence: "", startDate: "", reviewWeeks: 2 };
const responseLabels = { better: "มีสัญญาณดีขึ้น", same: "ยังไม่เห็นการเปลี่ยน", adjust: "ควรปรับวิธีหรือขอคำปรึกษา" };

export default function FollowUpClient() {
  const [plan, setPlan] = useState<Plan>(emptyPlan);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [draft, setDraft] = useState<Omit<CheckIn,"id">>({ date: "", evidence: "", response: "better", nextStep: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    queueMicrotask(() => {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) try { const saved = JSON.parse(raw) as FollowUpData; if (saved?.plan) { setPlan(saved.plan); setCheckIns(Array.isArray(saved.checkIns) ? saved.checkIns : []); return; } } catch { localStorage.removeItem(STORAGE_KEY); }
      const profileRaw = localStorage.getItem("learnerlens-profile");
      if (profileRaw) try { const profile = JSON.parse(profileRaw); setPlan(current => ({ ...current, learnerCode: profile.code || "", goal: profile.nextStep || "", evidence: profile.evidence || "" })); } catch { /* keep an empty plan */ }
      const interestRaw = localStorage.getItem("learnerlens-interest-potential");
      if (interestRaw && new URLSearchParams(window.location.search).get("from") === "interest") try {
        const interest = JSON.parse(interestRaw);
        const top = Array.isArray(interest.topSignals) ? interest.topSignals[0] : null;
        if (top) setPlan(current => ({ ...current, goal: current.goal || `เปิดโอกาสให้สำรวจด้าน ${top.title}`, action: current.action || top.experiment || "เลือกกิจกรรมทดลองหนึ่งอย่างและให้ผู้เรียนมีทางเลือก" }));
      } catch { /* backward-compatible with older saved results */ }
    });
  }, []);

  const save = (nextPlan = plan, nextCheckIns = checkIns) => {
    const data: FollowUpData = { plan: nextPlan, checkIns: nextCheckIns, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setMessage("บันทึกใน Browser แล้ว ✓");
  };

  const addCheckIn = () => {
    if (!draft.date || !draft.evidence.trim()) { setMessage("กรุณาระบุวันที่และหลักฐานที่สังเกตได้"); return; }
    const next = [{ ...draft, id: crypto.randomUUID() }, ...checkIns];
    setCheckIns(next); save(plan, next); setDraft({ date: "", evidence: "", response: "better", nextStep: "" });
  };

  const reviewDate = useMemo(() => {
    if (!plan.startDate) return "ยังไม่กำหนด";
    const date = new Date(`${plan.startDate}T00:00:00`); date.setDate(date.getDate() + plan.reviewWeeks * 7);
    return new Intl.DateTimeFormat("th-TH", { dateStyle: "long" }).format(date);
  }, [plan.startDate, plan.reviewWeeks]);

  const download = () => {
    const blob = new Blob([JSON.stringify({ product:"LearnerLens", plan, checkIns, exportedAt:new Date().toISOString() }, null, 2)], { type:"application/json" });
    const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = `learnerlens-follow-up-${plan.learnerCode || "draft"}.json`; anchor.click(); URL.revokeObjectURL(url);
  };

  const print = () => { document.body.classList.add("print-follow-up"); window.addEventListener("afterprint",()=>document.body.classList.remove("print-follow-up"),{once:true}); window.print(); };

  return <section className="subpage-section follow-up-page" id="top">
    <div className="follow-up-layout">
      <form className="follow-up-plan" id="follow-up-report" onSubmit={event => { event.preventDefault(); save(); }}>
        <header><div><span className="section-kicker left">2–4 WEEK PLAN</span><h2>แผนทดลองหนึ่งก้าว</h2></div><span>วันทบทวน: <strong>{reviewDate}</strong></span></header>
        <div className="form-grid"><label>รหัสผู้เรียน<input value={plan.learnerCode} onChange={e=>setPlan({...plan,learnerCode:e.target.value})} placeholder="เช่น P5-07" /></label><label>วันที่เริ่ม<input type="date" value={plan.startDate} onChange={e=>setPlan({...plan,startDate:e.target.value})} /></label></div>
        <label>เป้าหมายที่สังเกตได้<textarea value={plan.goal} onChange={e=>setPlan({...plan,goal:e.target.value})} placeholder="เช่น เริ่มงานภายใน 5 นาทีโดยใช้ Checklist ที่เลือกเอง" /></label>
        <label>สิ่งที่ครูจะทดลอง<textarea value={plan.action} onChange={e=>setPlan({...plan,action:e.target.value})} placeholder="เปลี่ยนเพียงหนึ่งหรือสององค์ประกอบเพื่อดูผลได้ชัด" /></label>
        <label>หลักฐานที่จะใช้ติดตาม<textarea value={plan.evidence} onChange={e=>setPlan({...plan,evidence:e.target.value})} placeholder="เช่น เวลาเริ่มงาน จำนวนครั้งที่ขอความช่วยเหลือ และเสียงสะท้อนของเด็ก" /></label>
        <fieldset className="review-week"><legend>ทบทวนหลัง</legend>{[2,3,4].map(week=><label className={plan.reviewWeeks===week?"selected":""} key={week}><input type="radio" name="review-week" checked={plan.reviewWeeks===week} onChange={()=>setPlan({...plan,reviewWeeks:week})}/>{week} สัปดาห์</label>)}</fieldset>
        <div className="follow-up-actions no-print"><button className="primary-button" type="submit">บันทึกแผน</button><button className="outline-action" type="button" onClick={print}>พิมพ์ / บันทึก PDF</button><button className="quiet-action" type="button" onClick={download}>ดาวน์โหลด JSON</button></div>
      </form>

      <aside className="decision-guide"><span className="section-kicker left">DECISION GUIDE</span><h2>เมื่อถึงวันทบทวน</h2><ol><li><strong>คงไว้</strong><span>หากมีสัญญาณดีขึ้นซ้ำและเด็กเห็นว่าช่วย</span></li><li><strong>ปรับ</strong><span>หากหลักฐานยังไม่ชัด ลองเปลี่ยนทีละอย่าง</span></li><li><strong>ประสาน</strong><span>หากปัญหาต่อเนื่อง รุนแรง หรือเกินขอบเขตครู</span></li></ol><p>ความปลอดภัยมาก่อน หากสงสัยการทำร้าย ความรุนแรง หรืออันตรายทันที ให้ใช้ระบบคุ้มครองเด็กของสถานศึกษาและผู้เชี่ยวชาญในพื้นที่</p></aside>
    </div>

    <section className="check-in-section no-print"><header><div><span className="section-kicker left">CHECK-IN LOG</span><h2>บันทึกหลักฐานระหว่างทาง</h2></div><strong>{checkIns.length} ครั้ง</strong></header>
      <div className="check-in-form"><label>วันที่<input type="date" value={draft.date} onChange={e=>setDraft({...draft,date:e.target.value})}/></label><label>สิ่งที่สังเกตได้<textarea value={draft.evidence} onChange={e=>setDraft({...draft,evidence:e.target.value})} placeholder="เขียนพฤติกรรมและบริบท ไม่สรุปเจตนา"/></label><label>ภาพรวม<select value={draft.response} onChange={e=>setDraft({...draft,response:e.target.value as CheckIn["response"]})}>{Object.entries(responseLabels).map(([value,label])=><option value={value} key={value}>{label}</option>)}</select></label><label>ก้าวถัดไป<input value={draft.nextStep} onChange={e=>setDraft({...draft,nextStep:e.target.value})} placeholder="คงไว้ ปรับอะไร หรือปรึกษาใคร"/></label><button className="primary-button" type="button" onClick={addCheckIn}>เพิ่มบันทึก</button></div>
      <div className="check-in-list">{checkIns.map(item=><article key={item.id}><header><strong>{new Intl.DateTimeFormat("th-TH",{dateStyle:"medium"}).format(new Date(`${item.date}T00:00:00`))}</strong><span>{responseLabels[item.response]}</span><button type="button" onClick={()=>{const next=checkIns.filter(entry=>entry.id!==item.id);setCheckIns(next);save(plan,next);}}>ลบ</button></header><p>{item.evidence}</p>{item.nextStep&&<small>ก้าวถัดไป: {item.nextStep}</small>}</article>)}{checkIns.length===0&&<p className="empty-state">ยังไม่มีบันทึก เริ่มหลังทดลองในคาบแรก แล้วเก็บหลักฐานอย่างน้อยสัปดาห์ละหนึ่งครั้ง</p>}</div>
    </section>
    <p className="follow-up-message" role="status">{message}</p>
  </section>;
}
