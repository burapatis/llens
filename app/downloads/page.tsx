import type { Metadata } from "next";
import { SubPage } from "../_components/SiteChrome";

export const metadata: Metadata = {
  title: "Download Center | LearnerLens",
  description: "ดาวน์โหลดแบบสังเกต Learner Profile และแผนช่วยเหลือรายบุคคล เพื่อนำไปใช้และปรับแก้ได้",
  alternates: { canonical: "/downloads" },
  openGraph: { title: "Download Center | LearnerLens", description: "แบบฟอร์มพร้อมใช้สำหรับครู", url: "/downloads", images: [] },
  twitter: { title: "Download Center | LearnerLens", description: "แบบฟอร์มพร้อมใช้สำหรับครู", images: [] },
};
const downloads=[
  {icon:"▤",title:"แบบสังเกตผู้เรียนรายบุคคล",type:"XLSX",detail:"2 แผ่นงาน · แก้ไขและสรุปหลักฐานได้",href:"/downloads/learner-observation.xlsx",use:"ใช้บันทึกบริบท พฤติกรรมที่สังเกตได้ และสิ่งที่เกิดก่อน–หลัง"},
  {icon:"▧",title:"Learner Profile Template",type:"DOCX",detail:"พร้อมคำถามชี้นำ · แก้ไขได้",href:"/downloads/learner-profile-template.docx",use:"สังเคราะห์จุดแข็ง ความสนใจ หลักฐาน อุปสรรค และก้าวถัดไป"},
  {icon:"◎",title:"แผนช่วยเหลือรายบุคคล",type:"PDF",detail:"1 หน้า · พร้อมพิมพ์",href:"/downloads/intervention-plan.pdf",use:"กำหนดเป้าหมาย การช่วยเหลือ หลักฐานความก้าวหน้า และวันทบทวน"},
];
export default function DownloadsPage(){return <SubPage eyebrow="DOWNLOAD CENTER" title="แบบฟอร์มที่หยิบไปใช้ได้ทันที" description="ดาวน์โหลด ปรับให้เหมาะกับบริบท และใช้รหัสแทนชื่อจริงเสมอ"><section className="subpage-section downloads-page" id="top"><div className="download-card-grid">{downloads.map(item=><article key={item.title}><span className="download-icon">{item.icon}</span><div><span className="case-tag">{item.type}</span><h2>{item.title}</h2><p>{item.use}</p><small>{item.detail}</small><a className="primary-button" href={item.href} download>ดาวน์โหลดไฟล์ ↓</a></div></article>)}</div><div className="download-guide"><h2>ใช้แบบฟอร์มอย่างมีความหมาย</h2><ol><li><strong>ตั้งคำถามก่อนเก็บข้อมูล</strong><span>ต้องการเข้าใจอะไร และข้อมูลนี้จะเปลี่ยนการสอนอย่างไร</span></li><li><strong>เก็บหลักฐานหลายครั้ง</strong><span>หลีกเลี่ยงการสรุปจากเหตุการณ์เดียวหรือบริบทเดียว</span></li><li><strong>ฟังเสียงผู้เรียน</strong><span>ตรวจสอบการตีความและออกแบบก้าวถัดไปร่วมกัน</span></li><li><strong>ทบทวนและลบ</strong><span>เก็บเท่าที่จำเป็น และลบเมื่อหมดวัตถุประสงค์</span></li></ol></div></section></SubPage>}
