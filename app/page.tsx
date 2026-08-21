"use client";

/* Static anchors intentionally keep the GitHub Pages export dependency-free. */
/* eslint-disable @next/next/no-html-link-for-pages */

import { useEffect, useState } from "react";
import { SiteFooter } from "./_components/SiteChrome";
import { GlobalSearch } from "./_components/GlobalSearch";

const Arrow = () => <span aria-hidden="true">→</span>;

const knowledgeTopics = [
  ["◉", "จิตวิทยาการเรียนรู้", "เข้าใจความจำ ความสนใจ และการสร้างความหมาย", "Piaget · Vygotsky · Bruner", "learning-psychology"],
  ["↗", "พัฒนาการเด็ก", "มองเห็นพัฒนาการด้านกาย อารมณ์ สังคม และสติปัญญา", "Development", "child-development"],
  ["◇", "ความแตกต่างระหว่างบุคคล", "สำรวจจุดแข็ง ความพร้อม ความสนใจ และบริบท", "Learner Diversity", "individual-differences"],
  ["✦", "แรงจูงใจและ Growth Mindset", "สร้างความเชื่อมั่นและแรงขับเคลื่อนจากภายใน", "Bandura · Dweck", "motivation"],
  ["◎", "Universal Design for Learning", "ออกแบบหลายวิธีในการมีส่วนร่วม เรียนรู้ และแสดงออก", "CAST UDL 3.0", "udl"],
  ["◒", "Differentiated Instruction", "ปรับเนื้อหา กระบวนการ ชิ้นงาน และสภาพแวดล้อม", "Tomlinson", "differentiation"],
];

const checklistItems = [
  "ฉันรู้ว่าผู้เรียนคนนี้สนใจอะไรนอกห้องเรียน",
  "ฉันสังเกตเห็นวิธีที่ผู้เรียนมีส่วนร่วมได้ดีที่สุด",
  "ฉันรู้จุดแข็งอย่างน้อย 2 ด้านของผู้เรียน",
  "ฉันมีหลักฐานจากการสังเกตมากกว่าการคาดเดา",
  "ฉันเปิดโอกาสให้ผู้เรียนเลือกวิธีเรียนหรือแสดงผลงาน",
];

const promptText = "ช่วยวิเคราะห์ผู้เรียนจากข้อมูลต่อไปนี้ โดยแยกเป็น 1) จุดแข็ง 2) ความต้องการ 3) สมมติฐานที่ต้องตรวจสอบ 4) วิธีช่วยเหลือที่ทำได้ทันที 3 วิธี และหลีกเลี่ยงการวินิจฉัยหรือติดป้ายผู้เรียน: [ใส่ข้อมูลการสังเกต]";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [checked, setChecked] = useState<number[]>([]);
  const [pathProgress, setPathProgress] = useState(25);
  const [coachInput, setCoachInput] = useState("");
  const [coachReady, setCoachReady] = useState(false);
  const [scores, setScores] = useState([3, 2, 3, 2]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const savedChecks = localStorage.getItem("learnerlens-checklist");
        const savedProgress = localStorage.getItem("learnerlens-progress");
        const savedScores = localStorage.getItem("learnerlens-scores");
        if (savedChecks) setChecked(JSON.parse(savedChecks));
        if (savedProgress) setPathProgress(Number(savedProgress));
        if (savedScores) setScores(JSON.parse(savedScores));
      } catch { localStorage.removeItem("learnerlens-checklist"); }
    });
  }, []);

  const toggleCheck = (index: number) => {
    const next = checked.includes(index) ? checked.filter((item) => item !== index) : [...checked, index];
    setChecked(next);
    localStorage.setItem("learnerlens-checklist", JSON.stringify(next));
  };

  const updateScores = (index: number, value: number) => {
    const next = scores.map((score, itemIndex) => itemIndex === index ? value : score);
    setScores(next);
    localStorage.setItem("learnerlens-scores", JSON.stringify(next));
  };

  return (
    <main id="main-content">
      <header className="site-header">
        <a className="brand" href="/" aria-label="เรียนรู้ผู้เรียน LearnerLens หน้าแรก">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>Learner<span>Lens</span></span>
        </a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="เมนูหลัก">
          <a href="/start">เริ่มใช้งาน</a>
          <a href="/knowledge">คลังความรู้</a>
          <a href="/toolkit">เครื่องมือ</a>
          <a href="/paths">เส้นทางการเรียนรู้</a>
          <a href="/case-finder">ค้นหากรณี</a>
          <a href="/about">เกี่ยวกับโครงการ</a>
        </nav>
        <div className="header-actions">
          <GlobalSearch />
          <a className="coach-button" href="/coach">ลอง AI Coach <Arrow /></a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="เปิดเมนู" aria-expanded={menuOpen}>☰</button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span>✦</span> พื้นที่เรียนรู้สำหรับครูทุกคน</div>
          <h1>เข้าใจผู้เรียน<br/><em>ให้มากกว่าที่เคย</em></h1>
          <p>เปลี่ยนความแตกต่างในห้องเรียน ให้เป็นโอกาสในการเรียนรู้ของเด็กทุกคน ด้วยความรู้ เครื่องมือ และผู้ช่วย AI ที่นำไปใช้ได้จริง</p>
          <div className="hero-actions">
            <a className="primary-button" href="/paths">เริ่มเส้นทางของคุณ <Arrow /></a>
            <a className="text-button" href="/toolkit"><span>▶</span> สำรวจเครื่องมือ</a>
          </div>
          <div className="trust-row">
            <div className="avatars" aria-hidden="true"><span>ก</span><span>ม</span><span>อ</span><span>พ</span></div>
            <p><strong>พื้นที่เรียนรู้สำหรับครูทุกคน</strong><br/>เพื่อห้องเรียนที่เด็กทุกคนเติบโตได้</p>
          </div>
        </div>

        <div className="hero-visual" aria-label="ตัวอย่างข้อมูลผู้เรียน">
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="learner-card">
            <div className="card-topline"><span className="status-dot" /> LEARNER SNAPSHOT <span>•••</span></div>
            <div className="learner-head">
              <div className="learner-avatar">ป</div>
              <div><h3>ปุณณ์</h3><p>ป.5 · นักสำรวจตัวน้อย</p></div>
              <span className="growth-pill">↗ กำลังเติบโต</span>
            </div>
            <div className="profile-label"><span>รูปแบบที่เรียนรู้ได้ดี</span><strong>มองเห็น · ลงมือทำ</strong></div>
            <div className="progress"><i /></div>
            <div className="strength-grid">
              <div><span className="mini-icon blue">◎</span><small>จุดแข็ง</small><strong>คิดเป็นภาพ</strong></div>
              <div><span className="mini-icon teal">◒</span><small>แรงจูงใจ</small><strong>ได้เลือกเอง</strong></div>
            </div>
            <div className="insight"><span>✦</span><p><strong>AI Insight</strong><br/>ลองใช้แผนภาพและให้ปุณณ์เลือกวิธีนำเสนอชิ้นงาน</p></div>
          </div>
          <div className="float-card float-top"><span>◉</span><p><strong>เข้าใจ ไม่ตัดสิน</strong><br/>เริ่มจากการมองเห็นตัวตน</p></div>
          <div className="float-card float-bottom"><span>✓</span><p><strong>+ 1 ก้าวเล็ก ๆ</strong><br/>ในการเรียนรู้วันนี้</p></div>
        </div>
      </section>

      <section className="belief-strip" aria-label="แนวคิดหลัก">
        <p>UNDERSTAND EVERY LEARNER</p><span>✦</span><p>TEACH FOR DIFFERENCES</p><span>✦</span><p>EVERY CHILD CAN LEARN</p>
      </section>

      <section className="today-entry" aria-labelledby="today-entry-title">
        <div><span className="section-kicker left">START TODAY · 10–30 นาที</span><h2 id="today-entry-title">มีโจทย์ในห้องเรียนอยู่แล้ว?<br/>เริ่มจากคำถามนั้นได้เลย</h2><p>เลือกเส้นทางสั้นที่ตรงกับสิ่งที่ครูต้องการทำวันนี้ แล้วค่อยเชื่อมข้อมูลเป็นวงจรติดตามผล</p><a className="primary-button" href="/start">เลือกจุดเริ่มต้น <Arrow /></a></div>
        <div className="today-entry-grid"><a href="/case-finder"><span>⌕</span><strong>ค้นหากรณีใกล้เคียง</strong><small>กรองตามปัญหาและช่วงวัย</small></a><a href="/toolkit#interest-potential"><span>✦</span><strong>สำรวจความสนใจ</strong><small>ฉบับเด็กและฉบับครู</small></a><a href="/follow-up"><span>↗</span><strong>ติดตามผล 2–4 สัปดาห์</strong><small>บันทึกหลักฐานและปรับแผน</small></a></div>
      </section>

      <section className="why-section" id="knowledge">
        <div className="section-kicker">เพราะความเข้าใจ คือจุดเริ่มต้น</div>
        <div className="why-head">
          <h2>ห้องเรียนเดียวกัน<br/>แต่เด็กแต่ละคน <em>ไม่เหมือนกัน</em></h2>
          <p>เมื่อครูมองเห็นความต้องการ จุดแข็ง และบริบทที่แตกต่าง การสอนก็ไม่จำเป็นต้องมีเพียงคำตอบเดียว</p>
        </div>
        <div className="feature-grid">
          <article><span className="feature-number">01</span><div className="feature-icon blue">◉</div><h3>มองเห็นผู้เรียนทั้งคน</h3><p>เข้าใจมากกว่าคะแนน ผ่านพัฒนาการ แรงจูงใจ อารมณ์ และบริบทชีวิต</p><a href="/toolkit">เรียนรู้การวิเคราะห์ <Arrow /></a></article>
          <article><span className="feature-number">02</span><div className="feature-icon teal">↗</div><h3>ออกแบบเพื่อความแตกต่าง</h3><p>ปรับเนื้อหา กระบวนการ และชิ้นงาน ให้ทุกคนเข้าถึงและท้าทายในระดับที่เหมาะสม</p><a href="/articles/udl">สำรวจแนวทาง UDL <Arrow /></a></article>
          <article><span className="feature-number">03</span><div className="feature-icon violet">✦</div><h3>เปลี่ยนข้อมูลเป็นการช่วยเหลือ</h3><p>ใช้หลักฐานเล็ก ๆ จากห้องเรียน วางแผน ลงมือ และติดตามการเติบโตอย่างต่อเนื่อง</p><a href="/coach">ลองวางแผนกับ AI <Arrow /></a></article>
        </div>
      </section>

      <section className="impact-band">
        <div><strong>หลายทาง</strong><span>ให้ผู้เรียนเข้าถึงสาระสำคัญ<br/>และแสดงความเข้าใจได้ยืดหยุ่น</span></div>
        <div><strong>ต่อเนื่อง</strong><span>ใช้หลักฐานระหว่างเรียน<br/>เพื่อเลือกก้าวถัดไปที่เหมาะสม</span></div>
        <div><strong>มีเสียง</strong><span>ชวนผู้เรียนร่วมตั้งเป้าหมาย<br/>สะท้อนผล และออกแบบทางเลือก</span></div>
      </section>

      <section className="knowledge-hub" aria-labelledby="hub-title">
        <div className="section-heading split-heading">
          <div><span className="section-kicker left">KNOWLEDGE HUB</span><h2 id="hub-title">ความรู้ที่เปลี่ยน<br/>วิธีมองผู้เรียน</h2></div>
          <p>ทุกหัวข้อเชื่อมโยงทฤษฎี งานวิจัย และตัวอย่างในห้องเรียน พร้อม Checklist และคำถามสะท้อนคิด</p>
        </div>
        <div className="topic-grid">
          {knowledgeTopics.map((topic, index) => (
            <article className="topic-card" key={topic[1]}>
              <div className={`topic-symbol c${index}`}>{topic[0]}</div><span className="topic-tag">{topic[3]}</span>
              <h3>{topic[1]}</h3><p>{topic[2]}</p>
              <a className="topic-link" href={`/articles/${topic[4]}`}>เปิดบทเรียน <Arrow /></a>
            </article>
          ))}
        </div>
        <a className="outline-button" href="/articles">ดูบทความทั้งหมด <Arrow /></a>
      </section>

      <section className="toolkit-section" id="tools">
        <div className="toolkit-copy">
          <span className="section-kicker left light">LEARNER ANALYSIS TOOLKIT</span>
          <h2>จาก “ความรู้สึก”<br/>สู่ <em>ข้อมูลที่เข้าใจได้</em></h2>
          <p>ใช้เครื่องมือสั้น ๆ เพื่อสังเกต ตั้งคำถาม และสร้างภาพผู้เรียนอย่างรอบด้าน ข้อมูลจะถูกเก็บเฉพาะในอุปกรณ์ของคุณ</p>
          <ul><li><span>✓</span> ไม่ติดป้ายหรือวินิจฉัยผู้เรียน</li><li><span>✓</span> เน้นหลักฐาน จุดแข็ง และสิ่งที่เปลี่ยนแปลงได้</li><li><span>✓</span> ใช้ได้ทันทีโดยไม่ต้องสมัครสมาชิก</li></ul>
        </div>
        <div className="checklist-panel">
          <div className="panel-head"><div><small>QUICK CHECK · 3 นาที</small><h3>ฉันรู้จักผู้เรียนคนนี้แค่ไหน?</h3></div><span>{checked.length}/{checklistItems.length}</span></div>
          <div className="check-progress"><i style={{width:`${checked.length / checklistItems.length * 100}%`}} /></div>
          <div className="check-items">
            {checklistItems.map((item, index) => <label key={item} className={checked.includes(index) ? "checked" : ""}><input type="checkbox" checked={checked.includes(index)} onChange={() => toggleCheck(index)} /><span>{checked.includes(index) ? "✓" : ""}</span>{item}</label>)}
          </div>
          <div className="privacy-note">⌁ บันทึกอัตโนมัติใน Browser ของคุณเท่านั้น</div>
        </div>
      </section>

      <section className="paths-section" id="paths">
        <div className="section-heading center-heading"><span className="section-kicker">LEARNING PATH</span><h2>เติบโตทีละก้าว ในจังหวะของคุณ</h2><p>เส้นทางที่จัดลำดับจากเข้าใจแนวคิด สู่การออกแบบและนำไปใช้จริง</p></div>
        <div className="path-layout">
          <div className="path-rail" aria-hidden="true"><span className="done">✓</span><i/><span className="active">2</span><i/><span>3</span><i/><span>4</span></div>
          <div className="path-cards">
            <article className="path-card done"><div className="level">LEVEL 01 <span>BEGINNER</span></div><h3>เปิดเลนส์ เข้าใจความแตกต่าง</h3><p>4 บทเรียน · 45 นาที</p><strong>เรียนจบแล้ว ✓</strong></article>
            <article className="path-card active"><div className="level">LEVEL 02 <span>INTERMEDIATE</span></div><h3>อ่านร่องรอยการเรียนรู้</h3><p>6 บทเรียน · 1.5 ชั่วโมง</p><div className="path-meter"><i style={{width:`${pathProgress}%`}} /></div><button onClick={() => { const next = Math.min(100, pathProgress + 25); setPathProgress(next); localStorage.setItem("learnerlens-progress", String(next)); }}>{pathProgress === 100 ? "เรียนจบแล้ว" : "ทำบทเรียนถัดไป"} <Arrow /></button></article>
            <article className="path-card"><div className="level">LEVEL 03 <span>ADVANCED</span></div><h3>ออกแบบห้องเรียนที่ยืดหยุ่น</h3><p>8 บทเรียน · 2.5 ชั่วโมง</p><strong>ปลดล็อกเมื่อจบ Level 02</strong></article>
            <article className="path-card"><div className="level">LEVEL 04 <span>EXPERT</span></div><h3>นำการเปลี่ยนแปลงด้วยข้อมูล</h3><p>5 ภารกิจ · Project-based</p><strong>สร้าง Portfolio ของคุณ</strong></article>
          </div>
        </div>
      </section>

      <section className="coach-section" id="coach">
        <div className="coach-shell">
          <div className="coach-intro"><span className="spark">✦</span><span className="section-kicker left light">AI TEACHER COACH</span><h2>คิดไปด้วยกัน<br/>เพื่อผู้เรียนของคุณ</h2><p>เล่าสถานการณ์โดยไม่ใส่ชื่อหรือข้อมูลระบุตัวตน แล้วรับแนวทางที่มีเหตุผล อ้างอิงหลักการ และนำไปปรับใช้ได้</p><div className="safety-pill">◉ AI จะถามกลับก่อนสรุป และไม่วินิจฉัยผู้เรียน</div></div>
          <div className="coach-chat">
            <div className="chat-top"><div><span>✦</span><strong>ครูคู่คิด</strong><small>พร้อมช่วยวางแผน</small></div><span className="online">● ONLINE</span></div>
            <div className="suggestion-row"><button onClick={() => setCoachInput("ช่วยวิเคราะห์นักเรียนที่ไม่ยอมเริ่มงาน แต่ตอบคำถามปากเปล่าได้ดี")}>วิเคราะห์ผู้เรียน</button><button onClick={() => setCoachInput("ช่วยออกแบบกิจกรรมที่มีทางเลือกสำหรับผู้เรียนหลากหลาย")}>ออกแบบกิจกรรม</button></div>
            <textarea value={coachInput} onChange={(event) => {setCoachInput(event.target.value);setCoachReady(false);}} placeholder="เล่าสถานการณ์ที่คุณอยากคิดไปด้วยกัน..." aria-label="ข้อความถึง AI Teacher Coach" />
            <button className="send-button" disabled={!coachInput.trim()} onClick={() => setCoachReady(true)}>ขอแนวทาง <Arrow /></button>
            {coachReady && <div className="coach-answer"><strong>มุมมองเบื้องต้น</strong><p>พฤติกรรมนี้อาจเกี่ยวกับความชัดเจนของงาน ความมั่นใจ หรือรูปแบบการตอบสนองที่ถนัด ลองตรวจสอบด้วยคำถามสั้น ๆ ก่อนสรุป</p><ol><li>ให้ผู้เรียนอธิบายสิ่งที่เข้าใจด้วยปากเปล่า</li><li>แบ่งงานเป็นก้าวแรกที่ใช้เวลาไม่เกิน 3 นาที</li><li>เสนอทางเลือกในการเริ่ม: เขียน วาด หรือเล่าให้เพื่อนฟัง</li></ol><small>ตัวอย่างนี้เป็นคำแนะนำเพื่อการสอน ไม่ใช่การวินิจฉัย</small></div>}
          </div>
        </div>
      </section>

      <section className="cases-section" id="cases">
        <div className="section-heading split-heading"><div><span className="section-kicker left">BEST PRACTICE LIBRARY</span><h2>เรื่องจริงจากห้องเรียน</h2></div><p>กรณีศึกษาที่เล่าทั้งโจทย์ กระบวนการ หลักฐาน และสิ่งที่ครูเรียนรู้—ไม่ใช่สูตรสำเร็จ</p></div>
        <div className="case-grid">
          <article className="case-feature"><div className="case-art"><span>ก่อน</span><i/><span>หลัง</span><div className="mini-class"><b>◯ ◯ ◯</b><b>△ ◯ △</b><b>◯ △ ◯</b></div></div><div className="case-body"><span className="case-tag">UDL · ชั้นประถมศึกษา</span><h3>เมื่อ “เลือกวิธีตอบได้” เด็กที่เงียบที่สุดก็เริ่มมีเสียง</h3><p>ครูวิทยาศาสตร์ปรับการสรุปบทเรียนจากใบงานแบบเดียว เป็น 3 ทางเลือก และพบหลักฐานการเรียนรู้ที่ไม่เคยเห็นมาก่อน</p><div><span>อ่าน 8 นาที</span><a href="/cases#voice-choice">อ่านกรณีศึกษา <Arrow /></a></div></div></article>
          <article className="case-small"><span className="case-tag teal-tag">MOTIVATION · มัธยมศึกษา</span><h3>จาก “ไม่ส่งงาน” สู่การเห็นเป้าหมายที่มีความหมาย</h3><p>บทสนทนา 10 นาทีที่ช่วยครูค้นพบอุปสรรคจริง และออกแบบก้าวแรกไปกับผู้เรียน</p><a href="/cases#meaningful-goals">อ่านเรื่องนี้ <Arrow /></a></article>
          <article className="case-small"><span className="case-tag violet-tag">DIFFERENTIATION</span><h3>หนึ่งเป้าหมาย สามระดับการพยุง</h3><p>ออกแบบ Scaffolding ให้ผู้เรียนทุกคนไปถึงเป้าหมายเดียวกัน โดยไม่ลดความคาดหวัง</p><a href="/cases#scaffolding">อ่านเรื่องนี้ <Arrow /></a></article>
        </div>
      </section>

      <section className="assessment-section">
        <div className="assessment-card">
          <div className="assessment-copy"><span className="section-kicker left">SELF-ASSESSMENT</span><h2>ห้องเรียนของคุณ<br/>เปิดพื้นที่ให้ความแตกต่างแค่ไหน?</h2><p>เลื่อนระดับตามสิ่งที่เกิดขึ้นจริงในช่วง 2 สัปดาห์ที่ผ่านมา ผลลัพธ์เก็บในอุปกรณ์นี้เท่านั้น</p>{["เข้าใจผู้เรียน", "ทางเลือกในการเรียน", "การมีส่วนร่วม", "การประเมินเพื่อพัฒนา"].map((label,index)=><label className="score-control" key={label}><span>{label}</span><input type="range" min="1" max="5" value={scores[index]} onChange={(event)=>updateScores(index,Number(event.target.value))}/><strong>{scores[index]}/5</strong></label>)}</div>
          <div className="radar-wrap" aria-label={`คะแนนเฉลี่ย ${(scores.reduce((a,b)=>a+b,0)/4).toFixed(1)} จาก 5`}><div className="radar"><i style={{clipPath:`polygon(50% ${50-scores[0]*8}%, ${50+scores[1]*8}% 50%, 50% ${50+scores[2]*8}%, ${50-scores[3]*8}% 50%)`}}/><span className="r-top">เข้าใจ</span><span className="r-right">ทางเลือก</span><span className="r-bottom">ประเมิน</span><span className="r-left">มีส่วนร่วม</span></div><strong>{(scores.reduce((a,b)=>a+b,0)/4).toFixed(1)}</strong><small>ภาพรวมจาก 5</small></div>
        </div>
      </section>

      <section className="resource-section">
        <div className="resource-column"><span className="section-kicker left">PROMPT LIBRARY</span><h2>เริ่มคุยกับ AI อย่างมีคุณภาพ</h2><div className="prompt-card"><small>วิเคราะห์ผู้เรียน · ปลอดภัยและไม่ติดป้าย</small><p>{promptText}</p><button onClick={async()=>{await navigator.clipboard.writeText(promptText);setCopied(true);setTimeout(()=>setCopied(false),1800);}}>{copied ? "คัดลอกแล้ว ✓" : "คัดลอก Prompt"}</button></div></div>
        <div className="resource-column" id="resources"><span className="section-kicker left">DOWNLOAD CENTER</span><h2>หยิบไปใช้ได้เลย</h2><div className="download-list"><a href="/downloads/learner-observation.xlsx" download><span>▤</span><div><strong>แบบสังเกตผู้เรียนรายบุคคล</strong><small>XLSX · แก้ไขได้ · 2 แผ่นงาน</small></div><b>↓</b></a><a href="/downloads/learner-profile-template.docx" download><span>▧</span><div><strong>Learner Profile Template</strong><small>DOCX · พร้อมช่องกรอกและคำแนะนำ</small></div><b>↓</b></a><a href="/downloads/intervention-plan.pdf" download><span>◎</span><div><strong>แผนช่วยเหลือรายบุคคล</strong><small>PDF · พร้อมพิมพ์ · 1 หน้า</small></div><b>↓</b></a></div></div>
      </section>

      <section className="home-about" id="about"><div><span className="section-kicker left">ABOUT LEARNERLENS</span><h2>สร้างขึ้นเพื่อช่วยครูเข้าใจ และตอบสนองความแตกต่างของผู้เรียน</h2><p>เว็บไซต์นี้รวบรวมความรู้ เครื่องมือ และตัวช่วยสำหรับเปลี่ยนการสังเกตในห้องเรียนให้เป็นการออกแบบการเรียนรู้ที่ยืดหยุ่น เห็นคุณค่า และนำไปใช้ได้จริง</p><a className="text-link" href="/about">อ่านจุดประสงค์และที่มา <Arrow /></a></div><aside><small>ผู้จัดทำ</small><strong>Boorapatis Ploysuwan</strong><span>ผู้วิจัยอิสระ</span><a href="mailto:burapatis@gmail.com">burapatis@gmail.com</a></aside></section>

      <section className="final-cta"><span className="cta-orbit o1"/><span className="cta-orbit o2"/><div><span className="section-kicker light">EVERY CHILD CAN LEARN</span><h2>เมื่อครูเข้าใจ<br/>เด็กทุกคนมีโอกาสเติบโต</h2><p>เริ่มจากผู้เรียนหนึ่งคน บทเรียนหนึ่งคาบ และการเปลี่ยนแปลงเล็ก ๆ วันนี้</p><a className="primary-button white" href="/toolkit">เริ่มทำความเข้าใจผู้เรียน <Arrow /></a></div></section>

      <SiteFooter />

    </main>
  );
}
