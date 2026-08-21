import type { Metadata } from "next";
import { SubPage } from "../_components/SiteChrome";
import DataCenterClient from "./DataCenterClient";

export const metadata: Metadata = {title:"ศูนย์ข้อมูลในอุปกรณ์ | LearnerLens",description:"สำรอง นำเข้า และจัดการข้อมูล LearnerLens ที่บันทึกใน Browser ของคุณ",alternates:{canonical:"/data"},openGraph:{title:"ศูนย์ข้อมูลในอุปกรณ์ | LearnerLens",description:"ควบคุมข้อมูล Local Storage ได้ด้วยตนเอง",url:"/data",images:[]},twitter:{title:"ศูนย์ข้อมูลในอุปกรณ์ | LearnerLens",description:"สำรองและนำเข้าข้อมูล LearnerLens",images:[]}};

export default function DataPage(){return <SubPage eyebrow="LOCAL DATA CENTER" title="ข้อมูลของคุณ อยู่ในการควบคุมของคุณ" description="สำรองความก้าวหน้า Learner Profile บันทึกการสังเกต และแบบประเมินเป็นไฟล์เดียว หรือนำกลับมาใช้ใน Browser เครื่องนี้"><DataCenterClient/></SubPage>}
