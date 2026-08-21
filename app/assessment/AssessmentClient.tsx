"use client";

import { useEffect, useMemo, useState } from "react";

const dimensions = [
  { name: "ความพร้อมของครู", question: "ฉันมีเวลา เครื่องมือ และวงจรทบทวนเพื่อใช้ข้อมูลผู้เรียน" },
  { name: "ความเข้าใจผู้เรียน", question: "ฉันใช้หลักฐานหลายแหล่งและฟังเสียงผู้เรียนก่อนสรุป" },
  { name: "ห้องเรียนแบบเรียนรวม", question: "ผู้เรียนทุกคนเข้าถึง มีส่วนร่วม และรู้สึกเป็นสมาชิกของห้องเรียน" },
  { name: "การสอนที่ยืดหยุ่น", question: "ฉันปรับการพยุงและทางเลือกตามข้อมูลล่าสุด โดยคงเป้าหมายสำคัญ" },
];

export default function AssessmentClient() {
  const [scores, setScores] = useState([3, 3, 3, 3]);
  useEffect(() => {
    queueMicrotask(() => {
      const raw = localStorage.getItem("learnerlens-self-assessment");
      if (raw) try { setScores(JSON.parse(raw)); } catch { localStorage.removeItem("learnerlens-self-assessment"); }
    });
  }, []);
  const update = (index: number, value: number) => {
    const next = scores.map((score, itemIndex) => itemIndex === index ? value : score);
    setScores(next);
    localStorage.setItem("learnerlens-self-assessment", JSON.stringify(next));
  };
  const points = useMemo(() => scores.map((score, index) => {
    const angle = (-90 + index * 90) * Math.PI / 180;
    const radius = score / 5 * 82;
    return `${100 + Math.cos(angle) * radius},${100 + Math.sin(angle) * radius}`;
  }).join(" "), [scores]);
  const average = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
  const low = scores.indexOf(Math.min(...scores));

  return <section className="subpage-section assessment-page" id="top"><div className="assessment-workspace"><div className="assessment-form"><span className="section-kicker left">REFLECT · NOT RANK</span><h2>ฉันทำสิ่งนี้สม่ำเสมอเพียงใด?</h2>{dimensions.map((dimension,index)=><fieldset key={dimension.name}><legend><strong>{dimension.name}</strong><span>{dimension.question}</span></legend><div>{[1,2,3,4,5].map(value=><label className={scores[index]===value?"selected":""} key={value}><input type="radio" name={`score-${index}`} checked={scores[index]===value} onChange={()=>update(index,value)}/>{value}</label>)}</div><small><span>ยังไม่เริ่ม</span><span>ทำได้สม่ำเสมอ</span></small></fieldset>)}</div><aside className="assessment-result"><h2>ภาพรวมของคุณ</h2><svg viewBox="0 0 200 200" role="img" aria-label="Radar Chart ผลการประเมิน"><g className="radar-grid">{[20,40,60,80].map(radius=><circle cx="100" cy="100" r={radius} key={radius}/>)}<line x1="100" y1="12" x2="100" y2="188"/><line x1="12" y1="100" x2="188" y2="100"/></g><polygon points={points}/><circle cx="100" cy="100" r="3"/></svg><div className="radar-labels"><span>Readiness</span><span>Understanding</span><span>Inclusion</span><span>Differentiation</span></div><strong className="average-score">{average}<small>/5</small></strong><div className="next-step"><span className="case-tag">ก้าวถัดไป</span><h3>{dimensions[low].name}</h3><p>เลือกหนึ่งกิจกรรมจากเส้นทางการเรียนรู้ ทดลองในคาบหนึ่งครั้ง และบันทึกหลักฐานสั้น ๆ ก่อนประเมินซ้ำ</p><a href="/paths">เปิดเส้นทางการเรียนรู้ →</a></div></aside></div></section>;
}
