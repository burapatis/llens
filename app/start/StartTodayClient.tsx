"use client";

import { useEffect, useState } from "react";

type Snapshot = { profile: boolean; interest: boolean; observations: number; plan: boolean; followUp: boolean };
const emptySnapshot: Snapshot = { profile: false, interest: false, observations: 0, plan: false, followUp: false };

const questions = [
  { icon: "⌕", title: "อยากเข้าใจสิ่งที่กำลังเกิดขึ้น", text: "เริ่มจากกรณีใกล้เคียง แล้วแยกสิ่งที่สังเกตได้ออกจากสมมติฐาน", href: "/cases", action: "ค้นหากรณีศึกษา" },
  { icon: "✦", title: "อยากค้นหาความสนใจและจุดแข็ง", text: "ให้เด็กสะท้อนตนเองหรือใช้หลักฐานจากครู แล้วเปิดโอกาสให้ทดลองต่อ", href: "/toolkit#interest-potential", action: "เปิดเครื่องมือสำรวจ" },
  { icon: "▤", title: "อยากเปลี่ยนข้อมูลเป็นแผน", text: "รวบรวม Profile เลือกการเปลี่ยนแปลงหนึ่งอย่าง และกำหนดหลักฐานติดตาม", href: "/coach", action: "สร้างแผนกับ Coach" },
  { icon: "↗", title: "อยากรู้ว่าวิธีที่ลองช่วยหรือไม่", text: "ตั้งเป้าหมายสั้น บันทึกผล 2–4 สัปดาห์ และปรับจากหลักฐาน", href: "/follow-up", action: "เปิดแผนติดตามผล" },
];

const cycleSteps = [
  {
    number: "01",
    title: "ตั้งคำถาม",
    action: "เปลี่ยนความกังวลหรือคำตัดสินให้เป็นคำถามที่สังเกตและค้นหาคำตอบได้",
    outcome: "คำถามหนึ่งประโยคที่ระบุผู้เรียน พฤติกรรมหรือการเรียนรู้ และบริบท",
    href: "#choose-question",
    link: "เลือกคำถามเริ่มต้น",
  },
  {
    number: "02",
    title: "สังเกตและฟัง",
    action: "เก็บสิ่งที่เห็น–ได้ยิน พร้อมเสียงผู้เรียน หลายครั้งและมากกว่าหนึ่งบริบท",
    outcome: "บันทึกข้อเท็จจริงที่ช่วยเห็นรูปแบบ จุดแข็ง อุปสรรค และข้อยกเว้น",
    href: "/toolkit#observation-log",
    link: "เปิดแบบบันทึกการสังเกต",
  },
  {
    number: "03",
    title: "เลือกหนึ่งก้าว",
    action: "ตั้งสมมติฐานหลายทาง แล้วเลือกการเปลี่ยนแปลงเล็กที่ปลอดภัยและไม่ลดเป้าหมาย",
    outcome: "แผนหนึ่งก้าวที่บอกว่าจะปรับอะไร เพื่ออะไร และจะดูหลักฐานใด",
    href: "/coach",
    link: "สร้างแผนกับ AI Coach",
  },
  {
    number: "04",
    title: "ทดลองและติดตาม",
    action: "ทดลองอย่างสม่ำเสมอ 2–4 สัปดาห์ และบันทึกทั้งสิ่งที่ดีขึ้น ยังยาก และเสียงของเด็ก",
    outcome: "ข้อมูลก่อน–ระหว่าง–หลัง ที่เพียงพอสำหรับเปรียบเทียบโดยไม่พึ่งความรู้สึก",
    href: "/follow-up#follow-up-report",
    link: "สร้างแผนทดลอง 2–4 สัปดาห์",
  },
  {
    number: "05",
    title: "ทบทวนและตัดสินใจ",
    action: "กลับมาดูหลักฐานร่วมกับผู้เรียน แล้วตัดสินใจว่าจะคงไว้ ปรับใหม่ หรือประสานความช่วยเหลือ",
    outcome: "การตัดสินใจที่มีเหตุผล พร้อมก้าวถัดไปและวันทบทวนครั้งใหม่",
    href: "/follow-up#review-decision",
    link: "เปิดแนวทางทบทวนผล",
  },
];

export default function StartTodayClient() {
  const [snapshot, setSnapshot] = useState<Snapshot>(emptySnapshot);

  useEffect(() => {
    queueMicrotask(() => {
      const observationRaw = localStorage.getItem("learnerlens-observation-notes");
      let observations = 0;
      if (observationRaw) try { const parsed = JSON.parse(observationRaw); observations = Array.isArray(parsed) ? parsed.length : 0; } catch { observations = 0; }
      setSnapshot({
        profile: localStorage.getItem("learnerlens-profile") !== null,
        interest: localStorage.getItem("learnerlens-interest-potential") !== null,
        observations,
        plan: localStorage.getItem("learnerlens-coach-session") !== null,
        followUp: localStorage.getItem("learnerlens-follow-up") !== null,
      });
    });
  }, []);

  const completed = [snapshot.profile, snapshot.interest, snapshot.observations > 0, snapshot.plan, snapshot.followUp].filter(Boolean).length;

  return <section className="subpage-section start-today" id="top">
    <section className="today-snapshot" aria-label="ภาพรวมข้อมูลในอุปกรณ์">
      <div><span className="section-kicker left">YOUR DEVICE</span><strong>{completed}<small>/5</small></strong><p>ขั้นที่มีข้อมูลในอุปกรณ์นี้</p></div>
      <div className="snapshot-items">
        <span className={snapshot.interest ? "ready" : ""}>✦ สำรวจความสนใจ</span>
        <span className={snapshot.profile ? "ready" : ""}>◇ Learner Profile</span>
        <span className={snapshot.observations > 0 ? "ready" : ""}>▤ หลักฐาน {snapshot.observations} รายการ</span>
        <span className={snapshot.plan ? "ready" : ""}>◫ แผนจาก Coach</span>
        <span className={snapshot.followUp ? "ready" : ""}>↗ แผนติดตามผล</span>
      </div>
      <a href="/data">สำรองหรือจัดการข้อมูล →</a>
    </section>

    <header className="start-question-head" id="choose-question"><span className="section-kicker left">CHOOSE ONE QUESTION</span><h2>วันนี้ครูอยากตอบคำถามใด?</h2><p>เลือกเพียงหนึ่งข้อ ระบบจะพาไปยังเครื่องมือที่สั้นและตรงกับงานที่สุด</p></header>
    <div className="start-question-grid">{questions.map(item => <article key={item.title}><span>{item.icon}</span><h2>{item.title}</h2><p>{item.text}</p><a href={item.href}>{item.action} →</a></article>)}</div>

    <section className="classroom-cycle" aria-labelledby="cycle-title">
      <header><span className="section-kicker left">CLASSROOM CYCLE</span><h2 id="cycle-title">วงจร 5 ก้าวที่ใช้ซ้ำได้</h2><p>ไม่ต้องรอข้อมูลสมบูรณ์ เริ่มจากหลักฐานเล็ก ๆ ทดลองอย่างปลอดภัย แล้วกลับมาทบทวน แต่ละก้าวด้านล่างบอกทั้งสิ่งที่ต้องทำ ผลลัพธ์ที่ควรได้ และทางลัดไปยังเครื่องมือปฏิบัติ</p></header>
      <ol>{cycleSteps.map(step => <li key={step.number}><div className="cycle-step-head"><span>{step.number}</span><strong>{step.title}</strong></div><p>{step.action}</p><div className="cycle-outcome"><small>ผลที่ได้</small><strong>{step.outcome}</strong></div><a href={step.href}>{step.link} <span aria-hidden="true">→</span></a></li>)}</ol>
      <p className="cycle-repeat-note"><strong>เมื่อจบก้าว 05</strong> ใช้สิ่งที่เรียนรู้ตั้งคำถามรอบใหม่ วงจรจึงเป็นการพัฒนาอย่างต่อเนื่อง ไม่ใช่ขั้นตอนที่ทำเพียงครั้งเดียว</p>
    </section>
    <aside className="start-safety"><strong>จำไว้เสมอ</strong><p>ใช้รหัสแทนชื่อจริง เก็บเท่าที่จำเป็น ผลจากเครื่องมือเป็นสมมติฐานเพื่อสำรวจต่อ ไม่ใช่การวินิจฉัยหรือข้อสรุปถาวร</p><a href="/principles#privacy">อ่านหลักการความเป็นส่วนตัว →</a></aside>
  </section>;
}
