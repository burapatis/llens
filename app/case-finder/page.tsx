import type { Metadata } from "next";
import { SubPage } from "../_components/SiteChrome";
import CaseFinderClient from "./CaseFinderClient";

export const metadata: Metadata = {
  title: "ค้นหากรณีศึกษา | LearnerLens",
  description: "ค้นหาและกรองกรณีศึกษาตามประเภทสถานการณ์ ช่วงวัย และคำสำคัญ",
  alternates: { canonical: "/case-finder" },
  openGraph: { title: "ค้นหากรณีศึกษา | LearnerLens", description: "ค้นหาสถานการณ์ที่ใกล้เคียงก่อนเลือกแนวทางช่วยเหลือ", url: "/case-finder", images: [] },
  twitter: { title: "ค้นหากรณีศึกษา | LearnerLens", description: "ตัวกรองกรณีศึกษาสำหรับครู", images: [] },
};

export default function CaseFinderPage() {
  return <SubPage eyebrow="CASE FINDER" title="ค้นหาสถานการณ์ที่ใกล้เคียง โดยไม่รีบติดป้าย" description="กรองตามประเภท ช่วงวัย หรือคำที่ครูสังเกตเห็น แล้วเปิดกรณีฉบับเต็มเพื่อดูหลักฐาน วิธีทดลอง และขอบเขตการส่งต่อ"><CaseFinderClient /></SubPage>;
}
