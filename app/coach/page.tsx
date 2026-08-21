import type { Metadata } from "next";
import { SubPage } from "../_components/SiteChrome";
import CoachClient from "./CoachClient";

export const metadata: Metadata = {
  title: "AI Teacher Coach | LearnerLens",
  description: "ผู้ช่วยวิเคราะห์สถานการณ์ ตั้งคำถาม และสร้างแผนการสอน กิจกรรม แบบประเมิน และแผนช่วยเหลืออย่างรับผิดชอบ",
  openGraph: { title: "AI Teacher Coach | LearnerLens", description: "เปลี่ยนข้อมูลการสังเกตเป็นแผนที่นำไปทดลองและติดตามผลได้", images: [] },
  twitter: { title: "AI Teacher Coach | LearnerLens", description: "AI ผู้ช่วยคิดสำหรับครู", images: [] },
};

export default function CoachPage(){return <SubPage eyebrow="AI TEACHER COACH" title="คิดอย่างเป็นระบบ แล้วเปลี่ยนเป็นแผนที่ลงมือได้" description="Coach จะช่วยตรวจบริบท ถามคำถามก่อนสรุป และสร้างแผนพร้อมหลักฐานติดตาม โดยข้อมูลอยู่ใน Browser และครูยังเป็นผู้ตัดสินใจ"><CoachClient /></SubPage>}
