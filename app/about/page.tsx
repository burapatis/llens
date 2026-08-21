import type { Metadata } from "next";
import { SubPage } from "../_components/SiteChrome";

export const metadata: Metadata = {
  title: "เกี่ยวกับโครงการและวิธีใช้งาน | LearnerLens",
  description: "จุดประสงค์ วิธีใช้งานอย่างมีประสิทธิภาพ และข้อมูลผู้จัดทำเว็บไซต์ LearnerLens",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "เกี่ยวกับโครงการและวิธีใช้งาน | LearnerLens",
    description: "รู้จัก LearnerLens และเริ่มใช้งานผ่าน 5 ขั้นตอนง่าย ๆ สำหรับครู",
    url: "/about",
    images: [{ url: "/images/boorapatis-ploysuwan.jpg", width: 800, height: 1000, alt: "Boorapatis Ploysuwan ผู้จัดทำ LearnerLens" }],
  },
  twitter: {
    title: "เกี่ยวกับโครงการและวิธีใช้งาน | LearnerLens",
    description: "รู้จัก LearnerLens และเริ่มใช้งานผ่าน 5 ขั้นตอนง่าย ๆ สำหรับครู",
    images: ["/images/boorapatis-ploysuwan.jpg"],
  },
};

const usageSteps = [
  { number: "01", title: "ตั้งคำถามที่อยากแก้", text: "เริ่มจากผู้เรียนหนึ่งคนหรือสถานการณ์หนึ่งเรื่อง เช่น ไม่เริ่มงาน อ่านช้า ถูกบูลลี่ หรือไม่มีส่วนร่วม", href: "/cases", action: "ดูกรณีที่ใกล้เคียง" },
  { number: "02", title: "เปิดเลนส์ความรู้", text: "อ่านหัวข้อที่เกี่ยวข้องเพื่อแยกสิ่งที่สังเกตได้ออกจากการคาดเดา และเลือกหลักการที่เหมาะกับบริบท", href: "/articles", action: "เปิดบทความฉบับเต็ม" },
  { number: "03", title: "เก็บหลักฐานสั้น ๆ", text: "ใช้ Observation Log, คำถามสัมภาษณ์ หรือ Learner Profile บันทึกพฤติกรรม บริบท จุดแข็ง และเสียงของผู้เรียน", href: "/toolkit", action: "ใช้เครื่องมือวิเคราะห์" },
  { number: "04", title: "เลือกการเปลี่ยนแปลงหนึ่งอย่าง", text: "ออกแบบก้าวเล็กที่ทดลองได้ในคาบถัดไป หรือใช้ AI Coach ช่วยจัดทางเลือกโดยไม่ใส่ชื่อและข้อมูลระบุตัวตน", href: "/coach", action: "วางแผนกับ AI Coach" },
  { number: "05", title: "ลงมือและติดตามผล", text: "ดูว่าผู้เรียนตอบสนองอย่างไร บันทึกสิ่งที่เปลี่ยน และปรับแผนต่อเนื่องผ่านเส้นทางการเรียนรู้ของคุณ", href: "/paths", action: "ติดตามเส้นทาง" },
];

export default function AboutPage() {
  return (
    <SubPage
      eyebrow="ABOUT LEARNERLENS"
      title="เข้าใจผู้เรียน เพื่อออกแบบโอกาสที่ดีกว่า"
      description="LearnerLens เป็นแพลตฟอร์มความรู้และเครื่องมือสำหรับครู ที่เชื่อว่าความแตกต่างไม่ใช่ปัญหาที่ต้องกำจัด แต่เป็นข้อมูลสำคัญสำหรับการออกแบบการเรียนรู้"
    >
      <section className="subpage-section about-grid" id="top">
        <article className="about-lead">
          <span className="section-kicker left">จุดประสงค์การจัดทำเว็บไซต์</span>
          <h2>ทำให้ความรู้เรื่องผู้เรียน นำไปใช้ได้จริงในห้องเรียน</h2>
          <p>เว็บไซต์นี้จัดทำขึ้นเพื่อช่วยให้ครูและผู้เกี่ยวข้องกับการศึกษาเข้าใจผู้เรียนเป็นรายบุคคลอย่างรอบด้าน มองเห็นทั้งจุดแข็ง ความสนใจ ความพร้อม พัฒนาการ อารมณ์ แรงจูงใจ และบริบทที่มีผลต่อการเรียนรู้</p>
          <p>แพลตฟอร์มมุ่งเชื่อมโยงองค์ความรู้ด้านจิตวิทยาการเรียนรู้ พัฒนาการเด็ก Universal Design for Learning, Differentiated Instruction, Inclusive Education และ Assessment for Learning เข้ากับตัวอย่าง เครื่องมือ และคำถามที่ครูนำไปใช้ได้ทันที</p>
          <div className="purpose-grid">
            <div><span>01</span><strong>พัฒนาความรู้</strong><p>เข้าถึงแนวคิดสำคัญด้วยภาษาที่ชัดเจนและมีหลักฐานรองรับ</p></div>
            <div><span>02</span><strong>สร้างความเข้าใจ</strong><p>วิเคราะห์ผู้เรียนโดยไม่รีบตัดสิน วินิจฉัย หรือติดป้าย</p></div>
            <div><span>03</span><strong>หล่อหลอมทัศนคติ</strong><p>ส่งเสริม Empathy, Growth Mindset และ Inclusive Mindset</p></div>
            <div><span>04</span><strong>พัฒนาทักษะครู</strong><p>ออกแบบกิจกรรม ประเมิน และช่วยเหลือผู้เรียนจากหลักฐาน</p></div>
          </div>
        </article>

        <aside className="creator-card">
          <figure className="creator-photo">
            {/* A pre-sized static asset avoids runtime image transformation in the Sites worker. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/boorapatis-ploysuwan.jpg"
              alt="Boorapatis Ploysuwan ผู้จัดทำเว็บไซต์ LearnerLens"
              width={800}
              height={1000}
              loading="eager"
              decoding="async"
            />
          </figure>
          <span className="section-kicker left">ผู้จัดทำ</span>
          <h2>Boorapatis Ploysuwan</h2>
          <p className="creator-role">ผู้วิจัยอิสระ</p>
          <p>สนใจการออกแบบระบบความรู้ เทคโนโลยีการศึกษา และการสร้างเครื่องมือที่ช่วยให้ครูเข้าใจผู้เรียนได้ลึกขึ้นและลงมือช่วยเหลือได้อย่างเป็นรูปธรรม</p>
          <a className="contact-button" href="mailto:burapatis@gmail.com">✉ burapatis@gmail.com</a>
        </aside>
      </section>

      <section className="usage-guide" id="how-to-use" aria-labelledby="usage-title">
        <header className="usage-guide-head">
          <div><span className="section-kicker left">วิธีใช้งานเว็บไซต์</span><h2 id="usage-title">เริ่มง่าย ใช้จริง และเห็นก้าวถัดไป</h2></div>
          <p>ไม่จำเป็นต้องอ่านทุกหน้า เริ่มจากโจทย์จริงหนึ่งเรื่อง แล้ววนรอบ “เข้าใจ–สังเกต–ออกแบบ–ติดตาม”</p>
        </header>
        <ol className="usage-steps">
          {usageSteps.map((step) => (
            <li key={step.number}>
              <span>{step.number}</span>
              <div><h3>{step.title}</h3><p>{step.text}</p><a href={step.href}>{step.action} <span aria-hidden="true">→</span></a></div>
            </li>
          ))}
        </ol>
        <div className="usage-shortcuts" aria-label="ทางลัดตามเวลาที่มี">
          <article><strong>มีเวลา 10 นาที</strong><p>เลือกกรณีศึกษา 1 เรื่อง แล้วจดสิ่งที่จะลองในคาบถัดไป 1 อย่าง</p><a href="/cases">เริ่มจากกรณีศึกษา</a></article>
          <article><strong>มีเวลา 30 นาที</strong><p>อ่านความรู้ที่เกี่ยวข้อง บันทึก Observation Log และกำหนดวิธีติดตามผล</p><a href="/toolkit#observation-log">เปิดแบบสังเกต</a></article>
          <article><strong>พัฒนาต่อเนื่อง</strong><p>ใช้ Learning Path เรียงลำดับการเรียนและบันทึกความก้าวหน้าไว้ในอุปกรณ์</p><a href="/paths">เริ่ม Learning Path</a></article>
        </div>
        <aside className="usage-safety"><strong>ใช้ข้อมูลอย่างปลอดภัย</strong><p>หลีกเลี่ยงชื่อจริง เลขประจำตัว ภาพถ่าย หรือรายละเอียดที่ระบุตัวผู้เรียนได้ โดยเฉพาะเมื่อนำสถานการณ์ไปใช้กับ AI Coach ข้อมูลเครื่องมือในเวอร์ชันนี้เก็บใน Browser ของอุปกรณ์ที่ใช้งาน</p><a href="/principles#privacy">อ่านหลักการความเป็นส่วนตัว →</a></aside>
      </section>

      <section className="vision-band">
        <div><span>VISION</span><h2>ครูทุกคนมองเห็น เข้าใจ และตอบสนองต่อความเป็นเอกลักษณ์ของผู้เรียนได้</h2></div>
        <div><span>MISSION</span><h2>เปลี่ยนองค์ความรู้ให้เป็นการตัดสินใจเล็ก ๆ ที่ทำให้ห้องเรียนเข้าถึงและท้าทายสำหรับทุกคน</h2></div>
      </section>

      <section className="subpage-section values-section">
        <span className="section-kicker left">แนวคิดที่ยึดถือ</span>
        <div className="values-grid">
          <div><strong>Understand Every Learner</strong><p>เริ่มต้นจากการฟัง สังเกต และทำความเข้าใจ</p></div>
          <div><strong>Teach for Differences</strong><p>ออกแบบความยืดหยุ่นโดยไม่ลดความคาดหวัง</p></div>
          <div><strong>Every Child Can Learn</strong><p>เชื่อในศักยภาพและการเติบโตของผู้เรียนทุกคน</p></div>
        </div>
      </section>
    </SubPage>
  );
}
