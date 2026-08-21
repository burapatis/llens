import type { Metadata } from "next";
import { SubPage } from "../_components/SiteChrome";
import { DesignSystemDemos } from "./DesignSystemDemos";

export const metadata: Metadata = {
  title: "Design System และ Component Library | LearnerLens",
  description: "มาตรฐานสี ตัวอักษร ระยะห่าง การเข้าถึง และส่วนประกอบกลางที่ทำให้ LearnerLens สม่ำเสมอและขยายได้",
  alternates: { canonical: "/design-system" },
  openGraph: { title: "Design System | LearnerLens", description: "ระบบออกแบบสำหรับแพลตฟอร์มความรู้และเครื่องมือเพื่อครู", url: "/design-system", images: [] },
  twitter: { title: "Design System | LearnerLens", description: "ระบบออกแบบสำหรับแพลตฟอร์มความรู้และเครื่องมือเพื่อครู", images: [] },
};

export default function DesignSystemPage() {
  return <SubPage eyebrow="PHASE 4 · DESIGN SYSTEM" title="ออกแบบครั้งเดียว ใช้ได้อย่างสม่ำเสมอ" description="ระบบสี ตัวอักษร ระยะห่าง และส่วนประกอบกลางที่รักษาบุคลิก Human, evidence-informed, calm, practical และ inclusive ในทุกหน้า"><nav className="ds-anchor-nav" aria-label="สารบัญ Design System"><a href="#foundations">Foundations</a><a href="#actions">Actions & Status</a><a href="#patterns">Product Patterns</a><a href="#content-components">Content Components</a><a href="#accessibility">Accessibility</a></nav><DesignSystemDemos /></SubPage>;
}
