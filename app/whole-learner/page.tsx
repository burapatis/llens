import type { Metadata } from "next";
import { SubPage } from "../_components/SiteChrome";
import PrintButton from "./PrintButton";

/* Static anchors intentionally keep the GitHub Pages export dependency-free. */
/* eslint-disable @next/next/no-html-link-for-pages */

export const metadata: Metadata = {
  title: "แผนที่เข้าใจผู้เรียนทั้งคน | LearnerLens",
  description: "ภาพรวม 8 มิติที่ครูควรสังเกตเพื่อเข้าใจผู้เรียนอย่างลึกซึ้ง รอบด้าน และไม่รีบติดป้าย",
  alternates: { canonical: "/whole-learner" },
  openGraph: { title: "แผนที่เข้าใจผู้เรียนทั้งคน | LearnerLens", description: "มองผู้เรียนผ่านพัฒนาการ การเรียนรู้ สมาธิ แรงจูงใจ อารมณ์ ความสัมพันธ์ อัตลักษณ์ และบริบท", url: "/whole-learner", images: [] },
  twitter: { title: "แผนที่เข้าใจผู้เรียนทั้งคน | LearnerLens", description: "8 มิติสำหรับเข้าใจผู้เรียนอย่างรอบด้าน", images: [] },
};

const dimensions = [
  { id:"development", number:"01", icon:"◒", title:"ร่างกายและพัฒนาการ", subtitle:"BODY & DEVELOPMENT", observe:"การนอน พลังงาน การเคลื่อนไหว การมองเห็น–ได้ยิน สุขภาพ และทักษะที่เหมาะกับช่วงวัย", ask:"ช่วงไหนของวันที่เรียนได้ดีที่สุด? มีอะไรทำให้เหนื่อยหรือไม่สบาย?", examples:["ง่วงและวางศีรษะบนโต๊ะในคาบแรก 3 วัน", "ขยับเข้าใกล้กระดานและหรี่ตาเมื่ออ่านข้อความ", "เขียนช้าลงเมื่อทำงานต่อเนื่องเกิน 15 นาที"], apply:"ลองปรับตำแหน่งนั่ง เวลา ช่วงพักเคลื่อนไหว หรือรูปแบบสื่อ แล้วติดตามว่าเข้าถึงงานดีขึ้นหรือไม่ หากกังวลเรื่องสุขภาพให้ประสานผู้ดูแลตามขอบเขต", tone:"blue" },
  { id:"learning", number:"02", icon:"◇", title:"การคิดและการเรียนรู้", subtitle:"COGNITION & LEARNING", observe:"ความรู้เดิม ความเข้าใจผิด ภาษา ความจำ จังหวะประมวลผล วิธีแก้ปัญหา และการถ่ายโอนความรู้", ask:"ทำอะไรได้เอง ทำอะไรได้เมื่อมีตัวช่วย และติดตรงขั้นตอนไหน?", examples:["อธิบายคำตอบปากเปล่าได้ครบ แต่เขียนได้เพียงหนึ่งประโยค", "ทำโจทย์ได้เมื่อมีตัวอย่างหนึ่งข้อ แล้วทำต่อเองได้", "จำขั้นตอนแรกได้ แต่หลงลำดับเมื่อคำสั่งมี 4 ขั้น"], apply:"ตรวจความรู้เดิม แยกขั้นที่เป็นคอขวด และเปิดทางให้แสดงความเข้าใจหลายแบบ ก่อนเพิ่มตัวอย่างหรือการพยุงทีละน้อย", tone:"teal" },
  { id:"executive", number:"03", icon:"↗", title:"สมาธิและการกำกับตนเอง", subtitle:"ATTENTION & EXECUTIVE FUNCTIONS", observe:"การเริ่มงาน จดจ่อ เปลี่ยนงาน วางแผน ยับยั้งชั่งใจ จัดอุปกรณ์ และติดตามเวลา", ask:"เงื่อนไขใดช่วยให้เริ่มและทำต่อได้? ตัวช่วยใดใช้ได้จริง?", examples:["นั่งรอ 7 นาทีจนครูชี้ก้าวแรกให้จึงเริ่มงาน", "ลืมส่งใบงานแม้ทำเสร็จและวางอยู่ใต้โต๊ะ", "หยุดงานเดิมยากเมื่อเปลี่ยนกิจกรรมกะทันหัน"], apply:"ทำก้าวแรกให้มองเห็น ใช้เช็กลิสต์ ตัวจับเวลา หรือสัญญาณก่อนเปลี่ยนงาน แล้วดูว่าเครื่องมือใดช่วยให้เด็กกำกับตนเองได้จริง", tone:"violet" },
  { id:"motivation", number:"04", icon:"✦", title:"ความสนใจและแรงจูงใจ", subtitle:"INTEREST & MOTIVATION", observe:"สิ่งที่ชอบ จุดแข็ง เป้าหมาย ความหมาย ความท้าทายที่พอดี ทางเลือก และความเป็นเจ้าของการเรียน", ask:"อะไรทำให้ตาเป็นประกาย? เรื่องใดที่อยากทำต่อแม้ไม่มีใครบังคับ?", examples:["ค้นข้อมูลเรื่องรถไฟต่อเองหลังหมดเวลาเรียน", "เลือกโจทย์ยากขึ้นเมื่อได้เลือกหัวข้อชิ้นงาน", "หยุดทำทันทีเมื่อคิดว่างานไม่มีประโยชน์กับเป้าหมายของตน"], apply:"เชื่อมเป้าหมายกับความสนใจ ให้ทางเลือกที่มีขอบเขต และออกแบบความสำเร็จก้าวเล็ก พร้อมผลสะท้อนกลับที่ชี้ความก้าวหน้า", tone:"amber" },
  { id:"emotion", number:"05", icon:"◎", title:"อารมณ์และความเชื่อมั่น", subtitle:"EMOTION & SELF-BELIEF", observe:"ความรู้สึกปลอดภัย ความเครียด การรับมือความผิดพลาด Self-efficacy Growth Mindset และสัญญาณทุกข์ใจ", ask:"เมื่อยากหรือผิดพลาด เด็กพูดกับตนเองอย่างไร และกลับมาได้ด้วยอะไร?", examples:["ลบคำตอบซ้ำและไม่ส่งงานเมื่อไม่มั่นใจว่าถูก", "เงียบและหลบสายตาก่อนนำเสนอหน้าชั้น", "กลับเข้าร่วมได้หลังพักเงียบ ๆ 5 นาทีและรู้ลำดับกิจกรรม"], apply:"สร้างกิจวัตรที่คาดเดาได้ เช็กอินเป็นส่วนตัว และให้วิธีมีส่วนร่วมที่ความเสี่ยงต่ำ หากความทุกข์ใจต่อเนื่องหรือมีอันตรายให้ใช้ระบบช่วยเหลือของสถานศึกษา", tone:"rose" },
  { id:"relationships", number:"06", icon:"∞", title:"ความสัมพันธ์และการเป็นส่วนหนึ่ง", subtitle:"RELATIONSHIPS & BELONGING", observe:"ความไว้วางใจกับครู เพื่อน การร่วมมือ การสื่อสาร ขอบเขต บทบาทในกลุ่ม การยอมรับและการบูลลี่", ask:"อยู่กับใครแล้วเป็นตัวเองได้? เมื่อมีปัญหา เด็กขอความช่วยเหลือจากใคร?", examples:["พูดคุยในงานคู่ แต่เงียบเมื่ออยู่กลุ่มใหญ่", "ย้ายที่นั่งเมื่อเพื่อนบางคนเข้ามาใกล้", "ไม่ได้รับเลือกเข้ากลุ่มซ้ำในสามกิจกรรม"], apply:"จัดกลุ่มและบทบาทให้ปลอดภัย ระบุผู้ใหญ่ที่ไว้ใจ และตรวจว่าเป็นความขัดแย้งหรือการกลั่นแกล้งซ้ำ ๆ ก่อนใช้มาตรการช่วยเหลือ", tone:"teal" },
  { id:"identity", number:"07", icon:"◉", title:"อัตลักษณ์ ภาษา และวัฒนธรรม", subtitle:"IDENTITY, LANGUAGE & CULTURE", observe:"ภาษาที่ใช้ ประสบการณ์ วัฒนธรรม เพศ ความเชื่อ คุณค่า ความภาคภูมิใจ และวิธีสื่อสารที่ครอบครัวคุ้นเคย", ask:"มีส่วนใดของตัวตนที่เด็กอยากให้ครูรู้ และมีสิ่งใดที่ห้องเรียนยังมองไม่เห็น?", examples:["อธิบายแนวคิดได้ละเอียดในภาษาที่บ้าน แต่ตอบสั้นเมื่อใช้ภาษาไทย", "มีส่วนร่วมมากขึ้นเมื่อตัวอย่างเชื่อมกับชุมชนของตน", "ไม่แก้การออกเสียงชื่อของตนแม้เพื่อนเรียกผิด"], apply:"ให้ใช้ภาษา ภาพ หรือประสบการณ์เดิมเป็นสะพาน เคารพชื่อและตัวตน เลือกตัวอย่างที่หลากหลาย และถามความต้องการโดยไม่คาดเดาแทนเด็ก", tone:"violet" },
  { id:"context", number:"08", icon:"⌂", title:"ครอบครัว บริบท และการเข้าถึง", subtitle:"FAMILY, CONTEXT & ACCESS", observe:"กิจวัตร ผู้ดูแล ภาระที่บ้าน ทรัพยากร เทคโนโลยี การเดินทาง พื้นที่เรียน เหตุการณ์เปลี่ยนแปลง และอุปสรรคในระบบ", ask:"นอกห้องเรียนมีอะไรช่วยหรือขัดขวาง และโรงเรียนเปลี่ยนเงื่อนไขใดได้บ้าง?", examples:["ส่งงานที่ทำในชั้นครบ แต่งานที่ต้องทำออนไลน์ที่บ้านขาด", "มาสายเฉพาะวันที่ต้องเปลี่ยนรถสองต่อ", "ง่วงในวันที่ต้องดูแลน้องจนดึก"], apply:"ลดอุปสรรคที่โรงเรียนเปลี่ยนได้ เช่น เวลา พื้นที่ อุปกรณ์ รูปแบบส่งงาน หรือการประสานผู้ดูแล โดยไม่ลดความคาดหวังต่อการเรียนรู้", tone:"blue" },
];

const evidenceSteps = [
  { title:"เห็น", description:"สังเกตพฤติกรรมที่มองเห็นและได้ยิน บอกเวลา สถานที่ งาน และสิ่งที่เกิดก่อน–หลัง", example:"งานเขียน 3 ครั้ง เด็กเริ่มหลังเพื่อนเฉลี่ย 8 นาที แต่ตอบคำถามปากเปล่าได้ทันที" },
  { title:"ฟัง", description:"ถามผู้เรียนด้วยคำถามเปิด ให้เวลา และเคารพสิทธิที่จะยังไม่เล่าบางเรื่อง", example:"เด็กบอกว่า “รู้คำตอบ แต่ไม่รู้จะเริ่มประโยคแรกอย่างไร”" },
  { title:"ดูผลงาน", description:"เปรียบเทียบชิ้นงาน วิธีคิด ความก้าวหน้า และเงื่อนไขที่ช่วยให้ทำได้", example:"เมื่อมีประโยคเริ่มต้น เด็กเขียนเหตุผลได้ 4 ประโยค แทนกระดาษว่าง" },
  { title:"เชื่อมบริบท", description:"รับฟังครอบครัว ครูคนอื่น และผู้เกี่ยวข้องเท่าที่จำเป็น โดยรักษาความเป็นส่วนตัว", example:"ครูอีกวิชาพบว่าเด็กทำได้ดีเมื่อวาดแผนภาพและเล่าก่อนเขียน" },
];

const hypotheses = [
  ["ไม่เข้าใจ", "คำสั่งหรือเกณฑ์ยังไม่ชัด"],
  ["เริ่มไม่ถูก", "งานใหญ่เกินไปหรือขาดเครื่องมือวางแผน"],
  ["กลัวพลาด", "กังวล ประสบการณ์ล้มเหลว หรือไม่เชื่อว่าตนทำได้"],
  ["บริบทขัดขวาง", "ภาระครอบครัว การนอน อุปกรณ์ หรือเวลา"],
  ["ไม่เห็นความหมาย", "งานยังไม่เชื่อมเป้าหมาย ความสนใจ หรือเสียงของผู้เรียน"],
];

export default function WholeLearnerPage() {
  return <SubPage eyebrow="WHOLE LEARNER MAP" title="เข้าใจเด็กหนึ่งคน ต้องมองให้เห็นทั้งคน" description="พฤติกรรมหรือคะแนนเป็นเพียงร่องรอยหนึ่ง ใช้แผนที่ 8 มิตินี้เพื่อมองหาจุดแข็ง ความต้องการ ความสัมพันธ์ และบริบท—ก่อนออกแบบการช่วยเหลือ">
    <section className="whole-learner-page" id="top">
      <header className="whole-map-intro">
        <div><span className="section-kicker left">8 DIMENSIONS · ONE LEARNER</span><h2>ไม่มีมิติใดอธิบายเด็กได้ลำพัง</h2><p>แต่ละมิติเชื่อมโยงกันและเปลี่ยนไปตามวัย งาน เวลา ผู้คน และสภาพแวดล้อม เป้าหมายจึงไม่ใช่ “เก็บข้อมูลเด็กให้ครบทุกช่อง” แต่คือเลือกมิติที่เกี่ยวข้องกับคำถามของครู แล้วตรวจสอบจากหลักฐานหลายแหล่ง</p></div>
        <PrintButton />
      </header>

      <div className="whole-map" aria-label="แผนภาพ 8 มิติของการเข้าใจผู้เรียน">
        <div className="whole-map-ring" aria-hidden="true"><i/><i/></div>
        {dimensions.map(item => <article className={`whole-dimension whole-${item.id} tone-${item.tone}`} id={item.id} key={item.id}>
          <header><span className="dimension-icon" aria-hidden="true">{item.icon}</span><small>{item.number}</small></header>
          <span className="dimension-subtitle">{item.subtitle}</span><h3>{item.title}</h3>
          <p><strong>สังเกต</strong>{item.observe}</p><p><strong>ลองถาม</strong>{item.ask}</p>
          <a className="dimension-example-link" href={`#practice-${item.id}`}>ดูตัวอย่างและการนำไปใช้ ↓</a>
        </article>)}
        <div className="whole-map-center"><span>ผู้เรียน</span><strong>หนึ่งคน<br/>หนึ่งเรื่องราว</strong><small>จุดแข็ง · เสียง · สิทธิ<br/>และศักยภาพที่กำลังเติบโต</small></div>
      </div>

      <aside className="whole-map-principle"><span aria-hidden="true">!</span><div><strong>สังเกตเพื่อเข้าใจ ไม่ใช่เฝ้าจับผิด</strong><p>บันทึกสิ่งที่เกิดขึ้นจริง แยกออกจากคำตีความ ใช้ข้อมูลเท่าที่จำเป็น และไม่วินิจฉัยหรือติดป้ายผู้เรียนจากพฤติกรรม คะแนน หรือเหตุการณ์ครั้งเดียว</p></div><a href="/principles#privacy">หลักการความเป็นส่วนตัว →</a></aside>

      <section className="dimension-practice" aria-labelledby="dimension-practice-title">
        <div className="whole-section-heading"><span className="section-kicker left">CONCRETE EXAMPLES · PRACTICAL USE</span><h2 id="dimension-practice-title">จากสิ่งที่เห็นในแต่ละมิติ สู่สิ่งที่ครูลองทำได้</h2><p>ตัวอย่างต่อไปนี้เป็นเพียงร่องรอยสำหรับตั้งคำถาม ไม่ใช่รายการตรวจวินิจฉัย ให้ดูรูปแบบที่เกิดซ้ำ จุดแข็ง และข้อยกเว้นก่อนเลือกการช่วยเหลือ</p></div>
        <div className="dimension-practice-grid">{dimensions.map(item => <article id={`practice-${item.id}`} key={item.id} className={`tone-${item.tone}`}><header><span className="dimension-icon" aria-hidden="true">{item.icon}</span><div><small>{item.number} · {item.subtitle}</small><h3>{item.title}</h3></div></header><strong className="practice-label">ตัวอย่างพฤติกรรมที่สังเกตได้</strong><ul>{item.examples.map(example => <li key={example}>{example}</li>)}</ul><div className="practice-action"><strong>นำไปใช้อย่างไร</strong><p>{item.apply}</p></div><a href={`#${item.id}`}>กลับไปดูมิตินี้ ↑</a></article>)}</div>
      </section>

      <section className="whole-evidence" aria-labelledby="evidence-title">
        <div className="whole-section-heading"><span className="section-kicker left">TRIANGULATE EVIDENCE</span><h2 id="evidence-title">เข้าใจลึกขึ้น เมื่อไม่มองจากสายตาครูเพียงด้านเดียว</h2><p>ดูรูปแบบที่เกิดซ้ำในหลายเวลา หลายงาน และหลายบริบท พร้อมให้เสียงผู้เรียนมีน้ำหนักในการตีความ ตัวอย่างด้านขวาแสดงการตรวจคำถามเดียวกันจากหลักฐาน 4 แหล่ง</p></div>
        <ol>{evidenceSteps.map((step,index)=><li key={step.title}><span>{String(index+1).padStart(2,"0")}</span><div><strong>{step.title}</strong><p>{step.description}</p><small><b>ตัวอย่าง:</b> {step.example}</small></div></li>)}</ol>
        <div className="evidence-synthesis"><span aria-hidden="true">✓</span><div><small>สรุปชั่วคราวจากหลักฐานที่มาบรรจบกัน</small><strong>เด็กเข้าใจเนื้อหา แต่อุปสรรคอยู่ที่การเริ่มและถ่ายทอดความคิดเป็นงานเขียน</strong><p>ก้าวทดลอง: ให้เลือกวาดแผนภาพหรืออัดเสียงสั้นก่อนเขียน พร้อมประโยคเริ่มต้น แล้วติดตามเวลาเริ่มงานและคุณภาพเหตุผล 2 สัปดาห์ หากหลักฐานใหม่ไม่สนับสนุน ให้ปรับสมมติฐาน</p></div><a href="/toolkit#observation-log">เก็บหลักฐานของคุณ →</a></div>
      </section>

      <section className="one-behavior" aria-labelledby="behavior-title">
        <header><span className="section-kicker left light">ONE BEHAVIOR · MANY POSSIBILITIES</span><h2 id="behavior-title">“ไม่ส่งงาน” ไม่ได้แปลว่า “ขี้เกียจ”</h2><p>พฤติกรรมเดียวอาจมาจากหลายเงื่อนไข สิ่งที่ครูต้องทำคือเปลี่ยนคำตัดสินให้เป็นสมมติฐานที่ตรวจสอบได้</p></header>
        <div className="behavior-flow"><div className="behavior-start"><small>สิ่งที่เห็น</small><strong>ไม่ส่งงาน</strong><span>≠ สาเหตุ</span></div><div className="behavior-branches">{hypotheses.map(item=><article key={item[0]}><strong>{item[0]}</strong><p>{item[1]}</p></article>)}</div></div>
      </section>

      <section className="whole-action" aria-labelledby="action-title">
        <div className="whole-section-heading"><span className="section-kicker left">FROM INSIGHT TO ACTION</span><h2 id="action-title">ใช้แผนที่นี้กับเด็กหนึ่งคนใน 15 นาที</h2></div>
        <ol><li><span>1</span><div><strong>ตั้งคำถามหนึ่งเรื่อง</strong><p>เช่น “อะไรทำให้ปุณณ์เริ่มงานเขียนยาก?” ไม่เริ่มจาก “ปุณณ์เป็นอะไร?”</p></div></li><li><span>2</span><div><strong>เลือก 2–3 มิติที่เกี่ยวข้อง</strong><p>เช่น การเรียนรู้ การกำกับตนเอง และอารมณ์ ไม่จำเป็นต้องเก็บครบทุกมิติพร้อมกัน</p></div></li><li><span>3</span><div><strong>เขียนหลักฐาน ไม่เขียนคำตัดสิน</strong><p>“เริ่มงานหลังเพื่อน 8 นาทีในงานเขียน 3 ครั้ง” ชัดกว่า “ไม่รับผิดชอบ”</p></div></li><li><span>4</span><div><strong>ฟังเสียงผู้เรียนและหาข้อยกเว้น</strong><p>ถามว่างานยากตรงไหน อะไรเคยช่วย และเมื่อใดที่ปัญหาไม่เกิด</p></div></li><li><span>5</span><div><strong>ทดลองหนึ่งการเปลี่ยนแปลง</strong><p>กำหนดสิ่งที่จะปรับ หลักฐานที่จะดู และวันทบทวนภายใน 2–4 สัปดาห์</p></div></li></ol>
        <div className="whole-action-links"><a className="primary-button" href="/toolkit#observation-log">เริ่มบันทึกการสังเกต <span aria-hidden="true">→</span></a><a className="outline-button" href="/toolkit#profile-builder">สร้าง Learner Profile <span aria-hidden="true">→</span></a><a href="/case-finder">ดูกรณีศึกษาใกล้เคียง →</a></div>
      </section>

      <aside className="whole-sources"><h2>กรอบแนวคิดที่ใช้สร้างแผนที่</h2><p>แผนที่นี้สังเคราะห์แนวคิดผู้เรียนทั้งคน ความแปรผันของผู้เรียน Student Agency &amp; Well-being การศึกษาแบบเรียนรวม และการมองอุปสรรคในบริบท ไม่ใช่แบบประเมินมาตรฐานหรือเครื่องมือวินิจฉัย</p><div><a href="https://udlguidelines.cast.org/engagement/" target="_blank" rel="noreferrer">CAST UDL 3.0 ↗</a><a href="https://www.oecd.org/en/data/tools/oecd-learning-compass-2030.html" target="_blank" rel="noreferrer">OECD Learning Compass 2030 ↗</a><a href="https://www.unesco.org/en/inclusion-education" target="_blank" rel="noreferrer">UNESCO Inclusion in Education ↗</a><a href="/articles/individual-differences">บทความความแตกต่างระหว่างบุคคล →</a></div></aside>
    </section>
  </SubPage>;
}
