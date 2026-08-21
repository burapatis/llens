import type { Metadata } from "next";
import { SubPage } from "../_components/SiteChrome";
import StartTodayClient from "./StartTodayClient";

export const metadata: Metadata = {
  title: "เริ่มใช้งานวันนี้ | LearnerLens",
  description: "เลือกคำถามหนึ่งเรื่องและใช้วงจร เข้าใจ–สังเกต–ออกแบบ–ติดตาม เพื่อช่วยผู้เรียนอย่างเป็นขั้นตอน",
  alternates: { canonical: "/start" },
  openGraph: { title: "เริ่มใช้งานวันนี้ | LearnerLens", description: "จุดเริ่มต้นที่ช่วยให้ครูลงมือได้ภายใน 10–30 นาที", url: "/start", images: [] },
  twitter: { title: "เริ่มใช้งานวันนี้ | LearnerLens", description: "เริ่มจากผู้เรียนหนึ่งคนและก้าวเล็กหนึ่งก้าว", images: [] },
};

export default function StartPage() {
  return <SubPage eyebrow="START TODAY" title="เริ่มจากผู้เรียนหนึ่งคน และคำถามหนึ่งเรื่อง" description="ไม่ต้องใช้ทุกเครื่องมือในครั้งเดียว เลือกเส้นทางที่ตรงกับโจทย์วันนี้ แล้วบันทึกเพียงข้อมูลที่จำเป็น"><StartTodayClient /></SubPage>;
}
