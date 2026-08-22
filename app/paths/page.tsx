import type { Metadata } from "next";
import { SubPage } from "../_components/SiteChrome";
import PathsClient from "./PathsClient";

export const metadata: Metadata = {
  title: "เส้นทางการเรียนรู้สำหรับครู | LearnerLens",
  description: "เรียนรู้ตั้งแต่ความแตกต่างระหว่างบุคคลจนถึงการนำการเปลี่ยนแปลงด้วยข้อมูล พร้อมติดตามความก้าวหน้าใน Browser",
  alternates: { canonical: "/paths" },
  openGraph: { title: "เส้นทางการเรียนรู้ | LearnerLens", description: "Beginner ถึง Expert ในจังหวะของคุณ", url: "/paths", images: [] },
  twitter: { title: "เส้นทางการเรียนรู้ | LearnerLens", description: "เส้นทางพัฒนาครู 4 ระดับ", images: [] },
};

export default function PathsPage() {
  return <SubPage eyebrow="LEARNING PATH" title="จากเข้าใจความแตกต่าง สู่การเปลี่ยนห้องเรียน" description="ใช้หน้านี้เป็นแผนที่นำทาง: เลือกบท เปิดเนื้อหาหรือเครื่องมือที่แนะนำ ทดลองใช้กับงานจริง แล้วกลับมาติ๊กบันทึกความก้าวหน้าในอุปกรณ์นี้"><PathsClient /></SubPage>;
}
