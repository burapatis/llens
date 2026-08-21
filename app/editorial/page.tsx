import type { Metadata } from "next";
import { SubPage } from "../_components/SiteChrome";

export const metadata: Metadata = {
  title: "นโยบายบรรณาธิการและมาตรฐานเนื้อหา | LearnerLens",
  description: "หลักเกณฑ์คัดเลือกแหล่งอ้างอิง การทบทวน ขอบเขต และช่องทางแจ้งแก้ไขเนื้อหา LearnerLens",
  alternates: { canonical: "/editorial" },
  openGraph: { title: "นโยบายบรรณาธิการ | LearnerLens", description: "ความโปร่งใสด้านแหล่งอ้างอิง การทบทวน และขอบเขตการใช้เนื้อหา", url: "/editorial", images: [] },
  twitter: { title: "นโยบายบรรณาธิการ | LearnerLens", description: "ความโปร่งใสด้านแหล่งอ้างอิง การทบทวน และขอบเขตการใช้เนื้อหา", images: [] },
};

export default function EditorialPage() {
  return (
    <SubPage eyebrow="EDITORIAL STANDARD" title="ความน่าเชื่อถือเริ่มจากความโปร่งใส" description="LearnerLens แสดงที่มาของแนวคิด ระดับของแหล่งอ้างอิง ข้อควรระวัง และวันที่ทบทวน เพื่อให้ครูประเมินและใช้เนื้อหาอย่างมีวิจารณญาณ">
      <section className="subpage-section editorial-principles">
        <span className="section-kicker left">หลักการ 4 ข้อ</span>
        <div>
          <article><span>01</span><h2>ผู้เรียนมาก่อนฉลาก</h2><p>ใช้ภาษาที่อธิบายสิ่งที่สังเกตได้ ไม่วินิจฉัย ไม่จัดอันดับ และไม่ทำให้ทฤษฎีกลายเป็นตัวตนถาวรของเด็ก</p></article>
          <article><span>02</span><h2>แยกหลักฐานให้ชัด</h2><p>ระบุว่าแหล่งใดเป็นแนวทางทางการ หลักฐานสังเคราะห์ หรือกรอบแนวคิด เพื่อไม่สื่อว่าทุกข้ออ้างมีน้ำหนักเท่ากัน</p></article>
          <article><span>03</span><h2>เชื่อมสู่การปฏิบัติ</h2><p>ทุกบทมีตัวอย่าง สิ่งที่ควรทำและหลีกเลี่ยง Checklist คำถามสะท้อนคิด และวิธีเก็บหลักฐานหลังทดลอง</p></article>
          <article><span>04</span><h2>เปิดเผยขอบเขต</h2><p>เนื้อหาใช้เพื่อการเรียนรู้และวางแผนเบื้องต้น ไม่แทนการประเมินโดยผู้เชี่ยวชาญ ระบบคุ้มครองเด็ก หรือนโยบายของสถานศึกษา</p></article>
        </div>
      </section>

      <section className="editorial-source-levels">
        <header><span className="section-kicker left">SOURCE HIERARCHY</span><h2>เราอ่านป้ายแหล่งอ้างอิงอย่างไร</h2></header>
        <div>
          <article><strong>แนวทางทางการ</strong><p>เอกสารจากหน่วยงานหรือองค์กรเจ้าของกรอบ เช่น CAST, UNESCO, OECD และ IES ใช้เพื่อยืนยันนิยามและข้อเสนอแนะหลัก</p></article>
          <article><strong>หลักฐานสังเคราะห์</strong><p>Toolkit, Practice Guide หรือบทสังเคราะห์ที่รวบรวมงานศึกษาหลายชิ้น ใช้พิจารณาความสม่ำเสมอและข้อจำกัดของผล</p></article>
          <article><strong>กรอบแนวคิด</strong><p>ทฤษฎีหรือโมเดลของนักวิชาการ ใช้เป็นเลนส์ตั้งคำถามและออกแบบ แต่ไม่ถือเป็นเครื่องมือวินิจฉัยโดยอัตโนมัติ</p></article>
        </div>
      </section>

      <section className="subpage-section editorial-process">
        <div>
          <span className="section-kicker left">REVIEW PROCESS</span>
          <h2>วงจรทบทวนเนื้อหา</h2>
          <ol><li><span>1</span><div><strong>กำหนดคำถามและขอบเขต</strong><p>ระบุว่าบทความต้องช่วยครูตัดสินใจเรื่องใด และสิ่งใดอยู่นอกขอบเขต</p></div></li><li><span>2</span><div><strong>ตรวจแหล่งต้นฉบับ</strong><p>ให้ความสำคัญกับหน่วยงานเจ้าของกรอบ แนวทางทางการ และบทสังเคราะห์ที่อัปเดต</p></div></li><li><span>3</span><div><strong>ทบทวนภาษาและความเสี่ยง</strong><p>ตรวจคำกล่าวอ้าง ภาษาติดป้าย ความเป็นส่วนตัว การคุ้มครองเด็ก และความเป็นไปได้ในห้องเรียน</p></div></li><li><span>4</span><div><strong>ระบุวันที่และอัปเดต</strong><p>ทบทวนอย่างน้อยทุก 12 เดือน หรือเร็วกว่านั้นเมื่อแหล่งหลักและแนวทางเปลี่ยนแปลง</p></div></li></ol>
        </div>
        <aside><span>สถานะปัจจุบัน</span><strong>เรียบเรียงและทบทวนเบื้องต้น</strong><p>เนื้อหาระยะที่ 3 จัดทำโดย Boorapatis Ploysuwan ผู้วิจัยอิสระ และยังไม่อ้างว่าเป็นการ Peer Review โดยผู้ทรงคุณวุฒิภายนอก</p><a href="mailto:burapatis@gmail.com?subject=LearnerLens%20แจ้งแก้ไขเนื้อหา">แจ้งข้อผิดพลาดหรือเสนอแหล่งอ้างอิง</a></aside>
      </section>

      <section className="editorial-correction">
        <div><span className="section-kicker left">CORRECTIONS</span><h2>พบข้อมูลที่ควรแก้ไข?</h2><p>โปรดส่งชื่อบทความ ข้อความที่ควรทบทวน เหตุผล และแหล่งอ้างอิงต้นฉบับ (ถ้ามี) การแก้ไขสาระสำคัญจะปรับวันที่ทบทวนในหน้าบทความ</p></div>
        <a className="primary-button" href="mailto:burapatis@gmail.com?subject=LearnerLens%20แจ้งแก้ไขเนื้อหา">อีเมลถึงผู้จัดทำ</a>
      </section>
    </SubPage>
  );
}
