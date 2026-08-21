"use client";

import { useEffect, useMemo, useState } from "react";

type Mode = "student" | "teacher";
type DomainId = "explore" | "create" | "make" | "connect" | "lead" | "notice";
type SignalKind = "interest" | "strength";

type Domain = {
  id: DomainId;
  icon: string;
  title: string;
  description: string;
  experiments: string[];
};

type Prompt = {
  domain: DomainId;
  kind: SignalKind;
  student: string;
  teacher: string;
};

const STORAGE_KEY = "learnerlens-interest-potential";

const domains: Domain[] = [
  { id: "explore", icon: "⌕", title: "สำรวจและแก้ปัญหา", description: "ชอบตั้งคำถาม หาเหตุผล ทดลอง และมองหาวิธีใหม่", experiments: ["ทดลองวิทยาศาสตร์สั้น ๆ", "เกมแก้ปัญหาหรือถอดรหัส", "ตั้งคำถามแล้วค้นหาคำตอบ"] },
  { id: "create", icon: "✦", title: "สร้างสรรค์และสื่อสาร", description: "ชอบเล่าเรื่อง ออกแบบ แสดงความคิด และสร้างสิ่งที่มีความหมาย", experiments: ["ทำโปสเตอร์หรือคลิปสั้น", "แต่งเรื่อง วาดภาพ หรือแสดงบทบาท", "อธิบายบทเรียนด้วยวิธีของตนเอง"] },
  { id: "make", icon: "▧", title: "ลงมือทำและประดิษฐ์", description: "เรียนรู้ได้ดีเมื่อได้จับ ทำ ประกอบ ซ่อม หรือทดลองกับของจริง", experiments: ["สร้างต้นแบบจากวัสดุเหลือใช้", "ทำอาหาร ปลูกพืช หรือซ่อมของง่าย ๆ", "แปลงบทเรียนเป็นชิ้นงาน"] },
  { id: "connect", icon: "∞", title: "ร่วมมือและดูแลผู้อื่น", description: "รับฟัง เข้าใจความรู้สึก ช่วยเหลือ และทำให้กลุ่มทำงานร่วมกันได้", experiments: ["เป็นเพื่อนช่วยเพื่อน", "ทำโครงงานบริการชุมชน", "รับบทผู้ฟังหรือผู้ประสานงานกลุ่ม"] },
  { id: "lead", icon: "↗", title: "นำทางและจัดการ", description: "ชอบริเริ่ม วางแผน ชวนคนลงมือ และพางานไปถึงเป้าหมาย", experiments: ["วางแผนงานเล็ก ๆ ของห้อง", "จัดลำดับขั้นตอนและแบ่งบทบาท", "นำเสนอข้อเสนอเพื่อแก้ปัญหา"] },
  { id: "notice", icon: "◎", title: "สังเกตธรรมชาติและรูปแบบ", description: "มองเห็นรายละเอียด ความเปลี่ยนแปลง การจัดหมวดหมู่ และความสัมพันธ์รอบตัว", experiments: ["สำรวจธรรมชาติหรือสิ่งแวดล้อม", "เก็บและจัดหมวดหมู่ข้อมูล", "ทำสมุดบันทึกรูปแบบที่พบ"] },
];

const prompts: Prompt[] = [
  { domain: "explore", kind: "interest", student: "ฉันสนุกกับการถามว่า “ทำไม” และค้นหาคำตอบ", teacher: "ผู้เรียนตั้งคำถามและอยากค้นหาคำตอบด้วยตนเอง" },
  { domain: "explore", kind: "interest", student: "เมื่อเจอโจทย์ยาก ฉันอยากลองหลายวิธีก่อนขอเฉลย", teacher: "ผู้เรียนลองหลายวิธีเมื่อพบโจทย์ที่ท้าทาย" },
  { domain: "explore", kind: "strength", student: "ฉันมักมองเห็นเหตุผลหรือข้อผิดพลาดที่คนอื่นยังไม่ทันเห็น", teacher: "ผู้เรียนอธิบายเหตุผลหรือพบข้อผิดพลาดจากหลักฐานได้" },
  { domain: "create", kind: "interest", student: "ฉันชอบวาด เขียน เล่า แสดง หรือออกแบบสิ่งใหม่", teacher: "ผู้เรียนเลือกกิจกรรมวาด เขียน เล่า แสดง หรือออกแบบเมื่อมีโอกาส" },
  { domain: "create", kind: "interest", student: "ฉันชอบคิดวิธีนำเสนอที่ไม่เหมือนเดิม", teacher: "ผู้เรียนสนุกกับการคิดวิธีนำเสนอที่หลากหลาย" },
  { domain: "create", kind: "strength", student: "ฉันถ่ายทอดความคิดให้คนอื่นเข้าใจได้ด้วยวิธีของฉัน", teacher: "ผู้เรียนถ่ายทอดความคิดผ่านคำพูด ภาพ เสียง การเคลื่อนไหว หรือชิ้นงานได้ชัดเจน" },
  { domain: "make", kind: "interest", student: "ฉันชอบจับของจริง ทดลอง ประกอบ หรือสร้างชิ้นงาน", teacher: "ผู้เรียนมีพลังและจดจ่อเมื่อได้ลงมือทำกับของจริง" },
  { domain: "make", kind: "interest", student: "ฉันอยากรู้ว่าสิ่งของทำงานอย่างไร", teacher: "ผู้เรียนสนใจกลไก ขั้นตอน หรือวิธีที่สิ่งของทำงาน" },
  { domain: "make", kind: "strength", student: "ฉันทำตามขั้นตอนและปรับชิ้นงานให้ดีขึ้นได้", teacher: "ผู้เรียนใช้เครื่องมือ ทำตามขั้นตอน และปรับชิ้นงานจากผลที่เห็นได้" },
  { domain: "connect", kind: "interest", student: "ฉันชอบทำสิ่งที่ช่วยให้คนอื่นรู้สึกดีขึ้นหรือทำได้ดีขึ้น", teacher: "ผู้เรียนเต็มใจช่วยเหลือและสนใจความเป็นอยู่ของผู้อื่น" },
  { domain: "connect", kind: "interest", student: "ฉันชอบเรียนหรือทำงานร่วมกับคนอื่น", teacher: "ผู้เรียนมีส่วนร่วมและมีพลังเมื่อได้ทำงานกับผู้อื่น" },
  { domain: "connect", kind: "strength", student: "ฉันฟังและช่วยให้เพื่อนในกลุ่มทำงานร่วมกันได้", teacher: "ผู้เรียนรับฟัง มองเห็นความรู้สึก และช่วยให้กลุ่มร่วมมือกันได้" },
  { domain: "lead", kind: "interest", student: "ฉันชอบเริ่มต้นกิจกรรมหรือชวนคนอื่นลงมือ", teacher: "ผู้เรียนมักริเริ่มกิจกรรมหรือชวนเพื่อนลงมืออย่างสร้างสรรค์" },
  { domain: "lead", kind: "interest", student: "ฉันชอบวางแผนว่าใครจะทำอะไรและทำเมื่อไร", teacher: "ผู้เรียนสนใจการวางแผน แบ่งบทบาท และกำหนดเป้าหมาย" },
  { domain: "lead", kind: "strength", student: "ฉันช่วยให้งานเดินหน้าต่อเมื่อกลุ่มติดขัดได้", teacher: "ผู้เรียนช่วยจัดลำดับ ตัดสินใจ และพางานเดินหน้าต่อได้" },
  { domain: "notice", kind: "interest", student: "ฉันชอบสังเกตสิ่งรอบตัว ธรรมชาติ ตัวเลข หรือรูปแบบ", teacher: "ผู้เรียนสนใจสังเกตธรรมชาติ รายละเอียด ตัวเลข หรือรูปแบบรอบตัว" },
  { domain: "notice", kind: "interest", student: "ฉันชอบเก็บ จัดกลุ่ม หรือเปรียบเทียบสิ่งต่าง ๆ", teacher: "ผู้เรียนชอบจัดหมวดหมู่ เปรียบเทียบ หรือบันทึกความเปลี่ยนแปลง" },
  { domain: "notice", kind: "strength", student: "ฉันมักเห็นรายละเอียดหรือความเปลี่ยนแปลงเล็ก ๆ", teacher: "ผู้เรียนสังเกตรายละเอียด ความเหมือน ความต่าง หรือความเปลี่ยนแปลงได้ดี" },
];

const optionLabels: Record<Mode, string[]> = {
  student: ["ยังไม่แน่ใจ", "บางครั้ง", "ใช่เลย"],
  teacher: ["ยังไม่พบ", "พบบางครั้ง", "พบสม่ำเสมอ"],
};

export default function InterestPotentialExplorer() {
  const [mode, setMode] = useState<Mode>("student");
  const [answers, setAnswers] = useState<number[]>(() => Array(prompts.length).fill(-1));
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reportView, setReportView] = useState<Mode>("student");

  useEffect(() => {
    queueMicrotask(() => {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      try {
        const saved = JSON.parse(raw);
        if ((saved.mode === "student" || saved.mode === "teacher") && Array.isArray(saved.answers) && saved.answers.length === prompts.length) {
          setMode(saved.mode);
          setReportView(saved.mode);
          setAnswers(saved.answers.map((value: unknown) => typeof value === "number" && value >= 0 && value <= 2 ? value : -1));
          setShowResult(true);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    });
  }, []);

  const scores = useMemo(() => domains.map((domain) => {
    let interest = 0;
    let strength = 0;
    prompts.forEach((prompt, index) => {
      if (prompt.domain !== domain.id || answers[index] < 0) return;
      if (prompt.kind === "interest") interest += answers[index];
      else strength += answers[index];
    });
    return { ...domain, interest, strength, percent: Math.round(((interest + strength) / 6) * 100) };
  }), [answers]);

  const completed = answers.filter((answer) => answer >= 0).length;
  const topSignals = [...scores].sort((a, b) => b.percent - a.percent).slice(0, 3);

  const changeMode = (nextMode: Mode) => {
    if (nextMode === mode) return;
    setMode(nextMode);
    setAnswers(Array(prompts.length).fill(-1));
    setShowResult(false);
    setCopied(false);
    setReportView(nextMode);
  };

  const choose = (index: number, value: number) => {
    setAnswers((current) => current.map((answer, answerIndex) => answerIndex === index ? value : answer));
    setShowResult(false);
    setCopied(false);
  };

  const reveal = () => {
    if (completed !== prompts.length) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode, answers, topSignals: topSignals.map(signal=>({id:signal.id,title:signal.title,percent:signal.percent,experiment:signal.experiments[0]})), savedAt: new Date().toISOString() }));
    setShowResult(true);
    requestAnimationFrame(() => document.querySelector("#interest-potential-result")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const reset = () => {
    setAnswers(Array(prompts.length).fill(-1));
    setShowResult(false);
    setCopied(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const copySummary = async () => {
    const summary = [
      "สัญญาณความสนใจและศักยภาพที่กำลังเติบโต",
      ...topSignals.map((signal, index) => `${index + 1}. ${signal.title} — ${signal.percent}%`),
      "ก้าวถัดไป: เลือกกิจกรรมทดลองหนึ่งอย่าง แล้วสังเกตความสนใจ ความพยายาม วิธีเรียนรู้ และพัฒนาการในหลายโอกาส",
      "หมายเหตุ: ผลนี้เป็นสมมติฐานเพื่อสำรวจต่อ ไม่ใช่การวินิจฉัยหรือข้อสรุปถาวร",
    ].join("\n");
    await navigator.clipboard.writeText(summary);
    setCopied(true);
  };

  const printReport = () => {
    document.body.classList.add("print-interest-report");
    window.addEventListener("afterprint",()=>document.body.classList.remove("print-interest-report"),{once:true});
    window.print();
  };

  return (
    <section className="interest-explorer" id="interest-potential" aria-labelledby="interest-potential-title">
      <header className="interest-explorer-head">
        <div><span className="section-kicker left">INTEREST &amp; POTENTIAL EXPLORER</span><h2 id="interest-potential-title">ค้นหาสิ่งที่สนใจ และศักยภาพที่กำลังเติบโต</h2><p>ใช้เวลาประมาณ 5–8 นาที ไม่มีคำตอบถูกผิด และไม่ใช้จัดอันดับเด็ก ผลลัพธ์มีทั้งฉบับเด็กและฉบับครู พร้อมนำไปสร้างแผนทดลอง 2–4 สัปดาห์</p></div>
        <div className="explorer-mode" aria-label="เลือกผู้ตอบ"><button type="button" className={mode === "student" ? "active" : ""} aria-pressed={mode === "student"} onClick={() => changeMode("student")}>ฉันเป็นนักเรียน</button><button type="button" className={mode === "teacher" ? "active" : ""} aria-pressed={mode === "teacher"} onClick={() => changeMode("teacher")}>ฉันเป็นครู</button></div>
      </header>

      <aside className="explorer-guidance">
        <strong>{mode === "student" ? "สำหรับเด็ก" : "สำหรับครู"}</strong>
        <p>{mode === "student" ? "ตอบจากสิ่งที่เป็นตัวเราในช่วงนี้ หากยังไม่เคยลองให้เลือก “ยังไม่แน่ใจ” และกลับมาทำใหม่หลังได้ลองกิจกรรม" : "ตอบจากสิ่งที่สังเกตได้หลายครั้ง หลายบริบท และควรชวนเด็กสะท้อนมุมมองของตนเองก่อนวางแผนต่อ"}</p>
      </aside>

      <div className="explorer-progress"><div><strong>{completed}/{prompts.length}</strong><span>ข้อที่ตอบแล้ว</span></div><div className="explorer-progress-track" aria-hidden="true"><i style={{ width: `${(completed / prompts.length) * 100}%` }} /></div></div>

      <form className="explorer-questions" onSubmit={(event) => { event.preventDefault(); reveal(); }}>
        {prompts.map((prompt, index) => (
          <fieldset key={`${prompt.domain}-${index}`}>
            <legend><span>{String(index + 1).padStart(2, "0")}</span><strong>{prompt[mode]}</strong><small>{prompt.kind === "interest" ? "สัญญาณความสนใจ" : "หลักฐานศักยภาพ"}</small></legend>
            <div>{optionLabels[mode].map((label, value) => <label className={answers[index] === value ? "selected" : ""} key={label}><input type="radio" name={`signal-${index}`} value={value} checked={answers[index] === value} onChange={() => choose(index, value)} /><span>{label}</span></label>)}</div>
          </fieldset>
        ))}
        <div className="explorer-actions"><button className="primary-button" type="submit" disabled={completed !== prompts.length}>ดูแผนที่ความสนใจและศักยภาพ</button><button className="quiet-action" type="button" onClick={reset}>เริ่มใหม่</button>{completed !== prompts.length && <span role="status">เหลืออีก {prompts.length - completed} ข้อ</span>}</div>
      </form>

      {showResult && completed === prompts.length && (
        <section className="explorer-result" id="interest-potential-result" aria-live="polite">
          <header><div><span className="section-kicker left">YOUR SIGNAL MAP</span><h2>แผนที่สัญญาณ—not a label</h2></div><p>คะแนนสูงหมายถึง “ควรเปิดโอกาสให้สำรวจต่อ” ไม่ได้แปลว่าเก่งกว่าด้านอื่น หรือกำหนดอาชีพในอนาคต</p></header>
          <div className="signal-bars">{scores.map((score) => <article key={score.id}><span>{score.icon}</span><div><strong>{score.title}</strong><small>ความสนใจ {score.interest}/4 · หลักฐานศักยภาพ {score.strength}/2</small><div className="signal-meter"><i style={{ width: `${score.percent}%` }} /></div></div><b>{score.percent}%</b></article>)}</div>
          <div className="top-signals"><h3>3 พื้นที่ที่ควรชวนลองต่อ</h3><div>{topSignals.map((signal, index) => <article key={signal.id}><span>#{index + 1} {signal.icon}</span><h4>{signal.title}</h4><p>{signal.description}</p><strong>กิจกรรมทดลอง</strong><ul>{signal.experiments.map((experiment) => <li key={experiment}>{experiment}</li>)}</ul></article>)}</div></div>
          <section className="audience-report" aria-labelledby="audience-report-title"><header><div><span className="section-kicker left">SHAREABLE REPORT</span><h3 id="audience-report-title">เลือกภาษาที่เหมาะกับผู้อ่าน</h3></div><div role="group" aria-label="เลือกรูปแบบรายงาน"><button type="button" className={reportView==="student"?"active":""} aria-pressed={reportView==="student"} onClick={()=>setReportView("student")}>ฉบับเด็ก</button><button type="button" className={reportView==="teacher"?"active":""} aria-pressed={reportView==="teacher"} onClick={()=>setReportView("teacher")}>ฉบับครู</button></div></header>{reportView==="student"?<div className="student-report"><span>นี่คือแผนที่สำหรับ “ลองต่อ” ไม่ใช่ป้ายบอกว่าเราเป็นใคร</span><h3>ช่วงนี้ เราน่าจะสนุกกับการลอง…</h3><ol>{topSignals.map(signal=><li key={signal.id}><strong>{signal.icon} {signal.title}</strong><p>{signal.experiments[0]}</p></li>)}</ol><p>หลังลองแล้ว ลองถามตัวเองว่า “ฉันอยากทำต่อไหม?”, “ฉันพัฒนาอะไรขึ้น?” และ “ฉันอยากลองแบบไหนอีก?”</p></div>:<div className="teacher-report"><h3>สมมติฐานเพื่อออกแบบโอกาสเรียนรู้</h3><p>สัญญาณเด่นควรตรวจสอบร่วมกับเสียงผู้เรียน ผลงาน และการสังเกตหลายบริบท ไม่ใช้จัดกลุ่มถาวรหรือทำนายอาชีพ</p><ol>{topSignals.map(signal=><li key={signal.id}><div><strong>{signal.title}</strong><small>สัญญาณรวม {signal.percent}%</small></div><span>ทดลอง: {signal.experiments[0]}</span></li>)}</ol><p><strong>หลักฐานติดตาม:</strong> การเลือกกลับมาทำ ความจดจ่อ ความพยายาม การตอบสนองต่อคำแนะนำ และการเกิดซ้ำในหลายสถานการณ์</p></div>}</section>
          <aside className="explorer-reflection"><div><strong>หลังทดลองกิจกรรม ให้สังเกต 4 อย่าง</strong><ol><li>เด็กเลือกหรือกลับมาทำเองหรือไม่</li><li>จดจ่อและพยายามนานขึ้นหรือไม่</li><li>เรียนรู้หรือพัฒนาจากคำแนะนำอย่างไร</li><li>เกิดขึ้นซ้ำในหลายสถานการณ์หรือไม่</li></ol></div><p><strong>ข้อสำคัญ</strong> ศักยภาพเปลี่ยนแปลงและพัฒนาได้ ผลครั้งเดียวอาจสะท้อนโอกาสที่เคยได้รับ ภาษา ความมั่นใจ หรือสภาพแวดล้อม จึงควรใช้ร่วมกับเสียงของเด็ก ผลงาน และการสังเกตต่อเนื่อง</p></aside>
          <div className="explorer-actions no-print"><button className="outline-action" type="button" onClick={copySummary}>{copied ? "คัดลอกแล้ว ✓" : "คัดลอกสรุป"}</button><button className="outline-action" type="button" onClick={printReport}>พิมพ์ / บันทึก PDF</button><a className="primary-button" href="/toolkit#profile-builder">นำไปใส่ Learner Profile</a><a className="primary-button teal-action" href="/follow-up?from=interest">สร้างแผนทดลอง 2–4 สัปดาห์</a><span>บันทึกผลใน Browser นี้แล้ว ✓</span></div>
        </section>
      )}
    </section>
  );
}
