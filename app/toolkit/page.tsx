import type { Metadata } from "next";
import { SubPage } from "../_components/SiteChrome";
import ToolkitClient from "./ToolkitClient";

export const metadata: Metadata = {
  title: "เครื่องมือวิเคราะห์ผู้เรียน | LearnerLens",
  description: "Checklist แบบสังเกต สัมภาษณ์ Rubric และ Learner Profile Builder ที่บันทึกในอุปกรณ์ของคุณ",
  openGraph: { title: "เครื่องมือวิเคราะห์ผู้เรียน | LearnerLens", description: "เปลี่ยนการสังเกตเป็นข้อมูลที่ใช้วางแผนการสอนได้", images: [] },
  twitter: { title: "เครื่องมือวิเคราะห์ผู้เรียน | LearnerLens", description: "เครื่องมือสำหรับครูที่ไม่ติดป้ายผู้เรียน", images: [] },
};

export default function ToolkitPage() {
  return <SubPage eyebrow="LEARNER ANALYSIS TOOLKIT" title="มองผู้เรียนด้วยหลักฐาน ไม่ใช่การคาดเดา" description="เลือกเครื่องมือที่เหมาะกับคำถาม บันทึกด้วยรหัสแทนชื่อจริง และเปลี่ยนข้อมูลเป็นก้าวถัดไปที่ทำได้"><ToolkitClient /></SubPage>;
}
