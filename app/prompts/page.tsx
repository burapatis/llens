import type { Metadata } from "next";
import { SubPage } from "../_components/SiteChrome";
import PromptsClient from "./PromptsClient";

export const metadata: Metadata = {title:"Prompt Library | LearnerLens",description:"Prompt สำหรับวิเคราะห์ผู้เรียน ออกแบบการเรียนรู้ สร้างกิจกรรม ประเมินผล และสะท้อนการสอน",alternates:{canonical:"/prompts"},openGraph:{title:"Prompt Library | LearnerLens",description:"Prompt พร้อมคัดลอกสำหรับครู",url:"/prompts",images:[]},twitter:{title:"Prompt Library | LearnerLens",description:"Prompt พร้อมคัดลอกสำหรับครู",images:[]}};
export default function PromptsPage(){return <SubPage eyebrow="PROMPT LIBRARY" title="Prompt ที่ช่วยให้ AI ถามกลับอย่างรอบคอบ" description="แทนที่ข้อความในวงเล็บเหลี่ยม และลบข้อมูลระบุตัวตนของผู้เรียนก่อนใช้งาน"><PromptsClient /></SubPage>}
