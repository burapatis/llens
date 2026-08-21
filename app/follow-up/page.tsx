import type { Metadata } from "next";
import { SubPage } from "../_components/SiteChrome";
import FollowUpClient from "./FollowUpClient";

export const metadata: Metadata = {
  title: "ติดตามผลการช่วยเหลือ | LearnerLens",
  description: "สร้างแผนทดลอง 2–4 สัปดาห์ บันทึกหลักฐาน และตัดสินใจก้าวถัดไปโดยไม่ติดป้ายผู้เรียน",
  alternates: { canonical: "/follow-up" },
  openGraph: { title: "ติดตามผลการช่วยเหลือ | LearnerLens", description: "เปลี่ยนก้าวเล็กในห้องเรียนให้เป็นวงจรเรียนรู้จากหลักฐาน", url: "/follow-up", images: [] },
  twitter: { title: "ติดตามผลการช่วยเหลือ | LearnerLens", description: "แผนติดตามผล 2–4 สัปดาห์สำหรับครู", images: [] },
};

export default function FollowUpPage() {
  return <SubPage eyebrow="FOLLOW-UP PLANNER" title="ทดลองหนึ่งก้าว เก็บหลักฐาน แล้วปรับอย่างมีเหตุผล" description="ติดตามผลเป็นเวลา 2–4 สัปดาห์ โดยใช้รหัสแทนชื่อจริง และไม่สรุปจากเหตุการณ์ครั้งเดียว"><FollowUpClient /></SubPage>;
}
