import type { Metadata } from "next";
import { SubPage } from "../_components/SiteChrome";
import CoachClient from "./CoachClient";

export const metadata: Metadata = {
  title: "AI Teacher Coach | LearnerLens",
  description: "ผู้ช่วยตั้งคำถามและวางแผนการสอนอย่างรับผิดชอบ โดยไม่วินิจฉัยหรือติดป้ายผู้เรียน",
  openGraph: { title: "AI Teacher Coach | LearnerLens", description: "เปลี่ยนข้อมูลการสังเกตเป็นแนวทางทดลองในห้องเรียน", images: [] },
  twitter: { title: "AI Teacher Coach | LearnerLens", description: "AI ผู้ช่วยคิดสำหรับครู", images: [] },
};

export default function CoachPage(){return <SubPage eyebrow="AI TEACHER COACH" title="คิดไปกับ AI โดยครูยังเป็นผู้ตัดสินใจ" description="รุ่นทดลองนี้ช่วยจัดโครงข้อมูลและเสนอทางเลือกเบื้องต้น ข้อมูลไม่ถูกส่งออกจาก Browser และผลลัพธ์ไม่ใช่การวินิจฉัย"><CoachClient /></SubPage>}
