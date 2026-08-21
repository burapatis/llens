import type { Metadata } from "next";
import { SubPage } from "../_components/SiteChrome";
import AssessmentClient from "./AssessmentClient";

export const metadata: Metadata = {title:"Self-Assessment Center | LearnerLens",description:"ประเมินความพร้อมด้านความเข้าใจผู้เรียน ห้องเรียนแบบเรียนรวม และการสอนที่ยืดหยุ่น พร้อม Radar Chart",openGraph:{title:"Self-Assessment Center | LearnerLens",description:"ประเมินตนเองและเลือกก้าวพัฒนา",images:[]},twitter:{title:"Self-Assessment Center | LearnerLens",description:"ประเมินตนเองสำหรับครู",images:[]}};
export default function AssessmentPage(){return <SubPage eyebrow="SELF-ASSESSMENT CENTER" title="เห็นจุดแข็งของตนเอง แล้วเลือกหนึ่งก้าวที่จะพัฒนา" description="แบบประเมินนี้ใช้เพื่อสะท้อนคิด ไม่ใช่การตัดสิน ผลลัพธ์บันทึกเฉพาะใน Browser"><AssessmentClient /></SubPage>}
