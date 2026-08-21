import type { Metadata } from "next";
import { SubPage } from "../_components/SiteChrome";
import PathsClient from "./PathsClient";

export const metadata: Metadata = {
  title: "เส้นทางการเรียนรู้สำหรับครู | LearnerLens",
  description: "เรียนรู้ตั้งแต่ความแตกต่างระหว่างบุคคลจนถึงการนำการเปลี่ยนแปลงด้วยข้อมูล พร้อมติดตามความก้าวหน้าใน Browser",
  openGraph: { title: "เส้นทางการเรียนรู้ | LearnerLens", description: "Beginner ถึง Expert ในจังหวะของคุณ", images: [] },
  twitter: { title: "เส้นทางการเรียนรู้ | LearnerLens", description: "เส้นทางพัฒนาครู 4 ระดับ", images: [] },
};

export default function PathsPage() {
  return <SubPage eyebrow="LEARNING PATH" title="จากเข้าใจความแตกต่าง สู่การเปลี่ยนห้องเรียน" description="เรียนตามลำดับหรือเลือกเฉพาะเรื่องที่ต้องใช้ ความก้าวหน้าจะบันทึกไว้ในอุปกรณ์นี้"><PathsClient /></SubPage>;
}
