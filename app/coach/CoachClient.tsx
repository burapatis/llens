"use client";

import { useEffect, useMemo, useState } from "react";

type TaskId = "analyze" | "teach" | "activity" | "lesson" | "assessment" | "support";
type CoachInput = {
  level: string;
  goal: string;
  situation: string;
  strengths: string;
  tried: string;
  constraints: string;
};
type PlanSection = { title: string; purpose: string; items: string[] };
type CoachPlan = { headline: string; summary: string; principles: string[]; sections: PlanSection[]; monitor: string[]; caution: string };

const STORAGE_KEY = "learnerlens-coach-session";
const emptyInput: CoachInput = { level: "ประถมปลาย", goal: "", situation: "", strengths: "", tried: "", constraints: "" };

const tasks: { id: TaskId; icon: string; label: string; description: string }[] = [
  { id: "analyze", icon: "⌕", label: "วิเคราะห์สถานการณ์", description: "แยกข้อเท็จจริง จุดแข็ง และสมมติฐาน" },
  { id: "teach", icon: "◫", label: "เสนอวิธีสอน", description: "ออกแบบการเข้าถึงและการพยุง" },
  { id: "activity", icon: "✦", label: "ออกแบบกิจกรรม", description: "สร้างกิจกรรมที่มีทางเลือก" },
  { id: "lesson", icon: "▤", label: "สร้างแผนการสอน", description: "วางก่อนเรียน–ระหว่างเรียน–หลังเรียน" },
  { id: "assessment", icon: "◎", label: "สร้างแบบประเมิน", description: "เก็บหลักฐานและให้ Feedback" },
  { id: "support", icon: "↗", label: "วางแผนช่วยเหลือ", description: "กำหนดเป้าหมาย ทดลอง และติดตาม" },
];

const examples: Record<TaskId, CoachInput> = {
  analyze: { level: "ประถมปลาย", goal: "ค้นหาว่าอะไรช่วยให้ผู้เรียนเริ่มและทำงานเขียนได้", situation: "ผู้เรียนรหัส P5-07 อธิบายปากเปล่าได้ดี แต่เริ่มเขียนช้าและส่งงานไม่ครบ เมื่อใช้แผนภาพจะมีส่วนร่วมมากขึ้น", strengths: "เล่าเรื่องเก่ง สนใจภาพและวิทยาศาสตร์ กล้าตอบเมื่อคุยเป็นคู่", tried: "เพิ่มเวลาแล้ว แต่ยังเริ่มงานช้า", constraints: "ครูมีเวลาเช็กอินรายบุคคลประมาณ 3 นาที" },
  teach: { level: "มัธยมต้น", goal: "อธิบายความสัมพันธ์ของเหตุและผลจากข้อความ", situation: "ห้องเรียนมีความพร้อมต่างกัน บางคนอ่านโจทย์ยาวได้ช้าและไม่ค่อยยกมือ", strengths: "ผู้เรียนตอบได้ดีเมื่อเห็นภาพและได้คุยกับเพื่อนก่อน", tried: "อธิบายซ้ำทั้งชั้นและแจกสรุปหนึ่งหน้า", constraints: "คาบละ 50 นาที นักเรียน 38 คน" },
  activity: { level: "ประถมปลาย", goal: "อธิบายความสัมพันธ์ในระบบนิเวศ", situation: "ต้องการกิจกรรม 30 นาทีที่ผู้เรียนทุกคนได้มีส่วนร่วมและแสดงความเข้าใจได้หลายวิธี", strengths: "ห้องนี้ชอบลงมือทำ วาดภาพ และอภิปรายกลุ่มเล็ก", tried: "เคยใช้ใบงานเดี่ยว แต่บางคนทำไม่ทัน", constraints: "มีเพียงกระดาษ สี และอุปกรณ์ในห้อง" },
  lesson: { level: "มัธยมต้น", goal: "เปรียบเทียบข้อเท็จจริงกับความคิดเห็นในสื่อ", situation: "ผู้เรียนชอบคลิปสั้น แต่มีความสามารถในการอ่านและสรุปต่างกัน", strengths: "สนใจข่าว กีฬา และเรื่องใกล้ตัว", tried: "เคยให้ทุกคนอ่านบทความเดียวและตอบคำถาม", constraints: "เวลา 50 นาที ใช้โทรศัพท์ได้เฉพาะช่วงกิจกรรม" },
  assessment: { level: "ประถมต้น", goal: "ตรวจว่าผู้เรียนเข้าใจการบวกแบบทดหรือยัง", situation: "ต้องการ Exit Ticket ที่ไม่วัดเฉพาะการจำขั้นตอน และช่วยแบ่งกลุ่มสอนซ่อมในคาบถัดไป", strengths: "ผู้เรียนอธิบายด้วยของจริงหรือภาพได้ดี", tried: "ใช้แบบฝึก 10 ข้อ แต่ไม่เห็นว่าผิดเพราะอะไร", constraints: "มีเวลา 7 นาทีท้ายคาบ" },
  support: { level: "มัธยมต้น", goal: "เพิ่มการเริ่มงานและการส่งงานย่อยอย่างสม่ำเสมอ", situation: "ผู้เรียนรหัส M2-12 มักไม่เริ่มงานเมื่อคำสั่งยาว แต่ทำได้เมื่อครูแบ่งก้าวและเช็กอิน", strengths: "ทำงานปฏิบัติได้ดี สนใจเทคโนโลยี และช่วยเพื่อนติดตั้งอุปกรณ์", tried: "เตือนหลายครั้งและให้เวลาเพิ่ม", constraints: "ต้องใช้แนวทางที่ครูหลายวิชาทำร่วมกันได้" },
};

const riskPattern = /(ทำร้ายตัวเอง|ไม่อยากอยู่|ฆ่าตัวตาย|ถูกทำร้าย|ล่วงละเมิด|ความรุนแรง|ถูกตี|บูลลี่|bully|คุกคาม)/i;

function clarifyingQuestions(task: TaskId, input: CoachInput) {
  const shared = [
    "พฤติกรรมหรือผลงานนี้เกิดขึ้นเมื่อไร ที่ไหน และไม่เกิดขึ้นเมื่อไร?",
    "ผู้เรียนบอกว่าอะไรช่วย อะไรยาก และอยากลองวิธีใด?",
  ];
  const specific: Record<TaskId, string> = {
    analyze: "มีหลักฐานจากงานหรือสถานการณ์อื่นที่ยืนยันหรือขัดกับข้อสังเกตนี้หรือไม่?",
    teach: "ส่วนใดของเนื้อหาคือเป้าหมายหลัก และส่วนใดเป็นอุปสรรคที่ปรับได้?",
    activity: "เมื่อจบกิจกรรม ผู้เรียนต้องสร้างหรือแสดงหลักฐานอะไรจึงถือว่าเข้าใจ?",
    lesson: "ผู้เรียนมีความรู้เดิมอะไร และครูจะตรวจความเข้าใจระหว่างทางเมื่อใด?",
    assessment: "เกณฑ์ความสำเร็จที่มองเห็นได้คืออะไร และข้อผิดพลาดแบบใดต้องการก้าวถัดไปต่างกัน?",
    support: "จะเห็นความก้าวหน้าจากพฤติกรรมใด วัดบ่อยเพียงใด และใครช่วยติดตามได้?",
  };
  if (!input.strengths.trim()) shared.unshift("ผู้เรียนหรือชั้นเรียนนี้มีจุดแข็ง ความสนใจ หรือเงื่อนไขที่ทำได้ดีอะไรบ้าง?");
  return [...shared.slice(0, 2), specific[task]];
}

function matchedStrategies(text: string) {
  const strategies: string[] = [];
  if (/(อ่าน|ข้อความ|โจทย์ยาว)/i.test(text)) strategies.push("แบ่งข้อความเป็นช่วงสั้น เน้นคำสำคัญ และมีภาพหรือการอ่านออกเสียงเป็นทางเลือก");
  if (/(เขียน|สะกด|เรียงความ)/i.test(text)) strategies.push("ให้ซ้อมตอบด้วยปากเปล่าหรือภาพก่อนเขียน พร้อมโครงประโยคและตัวอย่างงาน");
  if (/(ไม่เริ่ม|เริ่มงาน|ผัดผ่อน|ไม่ส่ง)/i.test(text)) strategies.push("ทำก้าวแรกให้ใช้ไม่เกิน 3 นาที ใช้การ์ดขั้นตอน และเช็กอินหลังเริ่มแทนการเตือนซ้ำ");
  if (/(สมาธิ|วอกแวก|นั่งไม่อยู่)/i.test(text)) strategies.push("แบ่งช่วงทำงาน ลดสิ่งรบกวนที่ไม่จำเป็น และกำหนดจุดพักหรือการเคลื่อนไหวที่คาดเดาได้");
  if (/(เงียบ|ไม่ตอบ|ไม่ยกมือ|ไม่ร่วม)/i.test(text)) strategies.push("ให้เวลาคิด ซ้อมตอบเป็นคู่ และเลือกตอบด้วยพูด เขียน วาด หรือบัตรคำ");
  if (/(คณิต|จำนวน|บวก|ลบ|คูณ|หาร)/i.test(text)) strategies.push("เชื่อมของจริง–ภาพ–สัญลักษณ์ และขอให้ผู้เรียนอธิบายเหตุผลมากกว่าดูคำตอบสุดท้าย");
  if (/(ภาษา|คำศัพท์|ย้ายถิ่น)/i.test(text)) strategies.push("สอนคำสำคัญล่วงหน้า ใช้ภาพ/ท่าทาง และเปิดโอกาสให้แสดงความเข้าใจก่อนความคล่องทางภาษา");
  if (!strategies.length) strategies.push("ทำเป้าหมายและเกณฑ์ให้ชัด เปิดทางเลือกที่ไม่เปลี่ยนเป้าหมาย และเก็บหลักฐานระหว่างเรียน");
  return strategies.slice(0, 3);
}

function buildPlan(task: TaskId, input: CoachInput, responses: string[], risk: boolean): CoachPlan {
  const text = Object.values(input).join(" ");
  const strategies = matchedStrategies(text);
  const learnerVoice = responses[1]?.trim() || "ชวนผู้เรียนอธิบายว่าอะไรช่วย อะไรยาก และอยากลองวิธีใด";

  if (risk) return {
    headline: "เริ่มจากความปลอดภัย ก่อนวางแผนการเรียนรู้",
    summary: "ข้อความมีสัญญาณที่อาจเกี่ยวข้องกับความปลอดภัยหรือสุขภาวะ AI Coach จึงไม่ควรสรุปหรือจัดการแทนระบบคุ้มครองเด็ก",
    principles: ["Safety first", "ฟังโดยไม่สอบสวน", "ส่งต่อตามระบบ", "ติดตามต่อเนื่อง"],
    sections: [
      { title: "1. ประเมินความปลอดภัยเร่งด่วน", purpose: "ดูว่าเด็กอยู่ในอันตรายทันทีหรือไม่", items: ["อยู่กับเด็กในพื้นที่ปลอดภัยและขอความช่วยเหลือตามระบบของสถานศึกษา", "หากเป็นเหตุฉุกเฉิน ให้ใช้บริการฉุกเฉินในพื้นที่ทันที", "ไม่สัญญาว่าจะเก็บเป็นความลับทั้งหมด"] },
      { title: "2. รับฟังและบันทึก", purpose: "ลดการทำร้ายซ้ำและรักษาข้อเท็จจริง", items: ["ฟังด้วยถ้อยคำสงบ ขอบคุณที่เด็กบอก และไม่ซักนำ", "บันทึกคำพูดและสิ่งที่สังเกตได้ตามจริง แยกจากการตีความ", "ไม่เผชิญหน้าผู้ที่อาจเกี่ยวข้องด้วยตนเอง"] },
      { title: "3. ส่งต่อและติดตาม", purpose: "ให้ผู้รับผิดชอบดำเนินการตามบทบาท", items: ["แจ้งผู้รับผิดชอบด้านคุ้มครองเด็ก/ระบบดูแลช่วยเหลือนักเรียน", "ตกลงผู้ใหญ่ที่เด็กติดต่อได้และจุดเช็กอินที่ชัดเจน", "ติดตามการเข้าเรียน ความรู้สึกปลอดภัย และการเข้าถึงความช่วยเหลือ"] },
    ],
    monitor: ["เด็กบอกว่ารู้ว่าจะขอความช่วยเหลือจากใคร", "ความเสี่ยงเร่งด่วนได้รับการตอบสนอง", "มีผู้รับผิดชอบติดตามอย่างต่อเนื่อง"],
    caution: "กรณีเร่งด่วนในประเทศไทย: ศูนย์ช่วยเหลือสังคม 1300 และสายด่วนสุขภาพจิต 1323; ใช้ระบบฉุกเฉินในพื้นที่เมื่อมีอันตรายทันที",
  };

  const plans: Record<TaskId, CoachPlan> = {
    analyze: {
      headline: "แยกสิ่งที่รู้ ออกจากสิ่งที่ต้องตรวจสอบ",
      summary: `เป้าหมายสำหรับระดับ${input.level}: ${input.goal}`,
      principles: ["Strength-based", "Learner voice", "หลายแหล่งหลักฐาน", "ไม่วินิจฉัย"],
      sections: [
        { title: "ข้อเท็จจริงและจุดแข็ง", purpose: "ตั้งต้นจากหลักฐานที่มี", items: [input.strengths || "ระบุสิ่งที่ผู้เรียนทำได้ดีและบริบทที่เกิดขึ้น", input.situation, "แยกคำบรรยายพฤติกรรมออกจากการตีความเจตนา"] },
        { title: "สมมติฐานที่ควรทดสอบ", purpose: "เปิดไว้หลายคำอธิบาย", items: ["ความชัดเจนและความยาวของคำสั่ง", "ความรู้เดิม ภาษา เวลา และรูปแบบการตอบ", "ความมั่นใจ แรงจูงใจ และบริบทที่เกิดขึ้นก่อนพฤติกรรม"] },
        { title: "การทดลองครั้งถัดไป", purpose: "เปลี่ยนหนึ่งอย่างเพื่ออ่านผลได้", items: [...strategies, learnerVoice] },
      ],
      monitor: ["การเริ่มงาน", "การมีส่วนร่วม", "คุณภาพของเหตุผล/ชิ้นงาน", "ระดับการช่วยเหลือที่ต้องใช้"],
      caution: "เปรียบเทียบอย่างน้อย 2–3 โอกาสก่อนสรุป และอย่าใช้ผลนี้เป็นการวินิจฉัยความสามารถหรือภาวะใด",
    },
    teach: {
      headline: "รักษาเป้าหมายเดิม แต่เพิ่มเส้นทางไปถึง",
      summary: `ออกแบบการสอนระดับ${input.level} เพื่อให้ผู้เรียน ${input.goal}`,
      principles: ["UDL", "Scaffolding", "High expectations", "Responsive teaching"],
      sections: [
        { title: "เข้าถึงสาระ", purpose: "ลดอุปสรรคที่ไม่ใช่เป้าหมาย", items: ["บอกเป้าหมายและตัวอย่างความสำเร็จด้วยภาษาชัดเจน", ...strategies] },
        { title: "มีส่วนร่วม", purpose: "ให้เหตุผลและความเป็นเจ้าของ", items: ["เชื่อมโจทย์กับความสนใจหรือสถานการณ์จริง", "ให้เลือกคู่ วัสดุ หรือลำดับงานในขอบเขตที่จัดการได้", "ใช้เช็กอินสั้น ๆ ก่อนผู้เรียนหลุดจากงาน"] },
        { title: "แสดงความเข้าใจ", purpose: "เห็นการเรียนรู้มากกว่าช่องทางเดียว", items: ["เปิดให้พูด เขียน วาด หรือสร้างแบบจำลองเมื่อไม่เปลี่ยนเป้าหมาย", "ใช้คำถามเหตุผลเดียวกันกับทุกช่องทาง", "ให้ Feedback ที่บอกก้าวถัดไป"] },
      ],
      monitor: ["ผู้เรียนเข้าถึงคำสั่งได้", "เริ่มงานโดยใช้การช่วยเหลือน้อยลง", "แสดงหลักฐานตรงเป้าหมาย", "อธิบายว่าอะไรช่วยตนเองได้"],
      caution: "ทางเลือกควรลดอุปสรรค ไม่ลดระดับความคิดหรือความคาดหวังของเป้าหมาย",
    },
    activity: {
      headline: "กิจกรรมสั้นที่ทุกคนมีทางเข้าและทางแสดงออก",
      summary: `กิจกรรมระดับ${input.level} สำหรับเป้าหมาย: ${input.goal}`,
      principles: ["Active learning", "Choice", "Collaboration", "Formative evidence"],
      sections: [
        { title: "เปิดโจทย์ · 5 นาที", purpose: "กระตุ้นความรู้เดิม", items: ["ใช้ภาพ วัตถุ หรือคำถามใกล้ตัวหนึ่งอย่าง", "ให้คิดคนเดียวก่อนแลกเปลี่ยนเป็นคู่", "บอกหลักฐานที่ต้องมีในชิ้นงาน"] },
        { title: "สำรวจ · 15–20 นาที", purpose: "ลงมือสร้างความเข้าใจ", items: ["จัดกลุ่มเล็กและแบ่งบทบาทที่เปลี่ยนได้", ...strategies, "ครูใช้คำถามชี้เหตุผลแทนการบอกคำตอบ"] },
        { title: "แสดงและสะท้อน · 5–10 นาที", purpose: "ทำให้การเรียนรู้มองเห็นได้", items: ["เลือกสรุปด้วยแผนภาพ คำอธิบาย หรือแบบจำลอง", "ให้เพื่อน Feedback ตามเกณฑ์เดียวกัน", "ปิดด้วยคำถามว่าอะไรช่วยและจะปรับอะไร"] },
      ],
      monitor: ["ทุกคนมีบทบาทและสร้างหลักฐาน", "ชิ้นงานตอบเป้าหมาย", "ผู้เรียนอธิบายเหตุผลได้", "ครูเห็นผู้ที่ต้องการก้าวเสริมหรือก้าวท้าทาย"],
      caution: "การให้เลือกไม่ควรทำให้ผู้เรียนบางคนถูกจำกัดอยู่กับงานง่ายหรือบทบาทเดิมซ้ำ ๆ",
    },
    lesson: {
      headline: "แผนการสอนที่ตรวจความเข้าใจระหว่างทาง",
      summary: `แผนระดับ${input.level}: ${input.goal}`,
      principles: ["Backward design", "UDL", "Explicit instruction", "Assessment for Learning"],
      sections: [
        { title: "ก่อนเรียน", purpose: "กำหนดเป้าหมายและอ่านความรู้เดิม", items: ["เขียนเป้าหมายเป็นพฤติกรรมที่สังเกตได้", "แสดงตัวอย่างงานและเกณฑ์สำเร็จ", "ใช้คำถาม/ภาพสั้นเพื่อตรวจความรู้เดิม"] },
        { title: "ระหว่างเรียน", purpose: "สอน ออกแบบทางเลือก และปรับทันที", items: ["สาธิตคิดออกเสียงแล้วให้ลองแบบมีการพยุง", ...strategies, "หยุดเช็กความเข้าใจกลางคาบและจัดกลุ่มยืดหยุ่น"] },
        { title: "หลังเรียน", purpose: "เก็บหลักฐานเพื่อวางคาบถัดไป", items: ["ให้ Exit Ticket ที่ถามทั้งคำตอบและเหตุผล", "แยกผู้เรียนเป็น พร้อมต่อ–ต้องฝึก–ต้องตรวจความเข้าใจใหม่", "บันทึกการปรับหนึ่งอย่างสำหรับคาบถัดไป"] },
      ],
      monitor: ["หลักฐานก่อน–ระหว่าง–หลังเรียนสอดคล้องกับเป้าหมาย", "ผู้เรียนใช้ทางเลือกอย่างมีจุดหมาย", "ครูปรับกลุ่มหรือการพยุงจากข้อมูลจริง"],
      caution: "อย่าใส่กิจกรรมมากจนไม่มีเวลาตรวจว่าผู้เรียนกำลังเข้าใจอะไรและเพราะเหตุใด",
    },
    assessment: {
      headline: "ประเมินเพื่อเห็นความคิด และเลือกก้าวถัดไป",
      summary: `ประเมินระดับ${input.level} สำหรับเป้าหมาย: ${input.goal}`,
      principles: ["Validity", "Multiple evidence", "Actionable feedback", "Student reflection"],
      sections: [
        { title: "เกณฑ์ความสำเร็จ", purpose: "ทำให้สิ่งที่ต้องการเห็นชัด", items: ["ระบุสาระ/เหตุผลที่ต้องมี 2–3 ข้อ", "แยกความเข้าใจเนื้อหาออกจากความคล่องในการเขียนเมื่อไม่ใช่เป้าหมาย", "ยกตัวอย่างงานระดับกำลังพัฒนาและระดับบรรลุ"] },
        { title: "ภาระงานประเมิน", purpose: "เปิดหลายทางแต่ใช้เกณฑ์เดียว", items: ["คำถามสั้นหนึ่งข้อที่ต้องอธิบายเหตุผล", "ทางเลือกตอบด้วยข้อความ ภาพ หรือคำอธิบายปากเปล่า", ...strategies] },
        { title: "Feedback และก้าวถัดไป", purpose: "เปลี่ยนผลเป็นการเรียนรู้", items: ["บอกสิ่งที่ทำได้แล้วด้วยหลักฐาน", "ให้ก้าวถัดไปหนึ่งอย่างที่ทำได้ทันที", "ให้ผู้เรียนแก้หรือทดลองใหม่หลัง Feedback"] },
      ],
      monitor: ["คำตอบบอกเหตุผล ไม่ใช่เพียงถูก/ผิด", "ครูจำแนกความเข้าใจผิดได้", "Feedback นำไปสู่การแก้งาน", "วิธีตอบไม่บดบังความเข้าใจเป้าหมาย"],
      caution: "อย่าใช้คะแนนครั้งเดียวสรุปศักยภาพ ควรดูแนวโน้มจากหลายภาระงานและหลายช่องทาง",
    },
    support: {
      headline: "แผนช่วยเหลือเล็ก ชัด และทบทวนได้",
      summary: `เป้าหมายการช่วยเหลือระดับ${input.level}: ${input.goal}`,
      principles: ["Student-centered", "Least intrusive support", "Progress monitoring", "Team consistency"],
      sections: [
        { title: "กำหนดเป้าหมาย 2–3 สัปดาห์", purpose: "เห็นความก้าวหน้าที่สังเกตได้", items: [input.goal, "กำหนดจุดเริ่มต้นจากข้อมูลปัจจุบัน", "ตกลงเป้าหมายและวิธีช่วยกับผู้เรียน"] },
        { title: "การช่วยเหลือประจำ", purpose: "ทำซ้ำได้ในหลายคาบ", items: [...strategies, "ใช้สัญญาณและถ้อยคำเดียวกันระหว่างครูที่เกี่ยวข้อง", learnerVoice] },
        { title: "ทบทวนและตัดสินใจ", purpose: "เพิ่ม ลด หรือเปลี่ยนการช่วยเหลือจากข้อมูล", items: ["บันทึกข้อมูลสั้น ๆ สัปดาห์ละ 2–3 ครั้ง", "ทบทวนกับผู้เรียนว่าอะไรช่วยจริง", "หากไม่ก้าวหน้า ให้ตรวจความเข้มข้น ความสม่ำเสมอ และประสานทีมที่เหมาะสม"] },
      ],
      monitor: ["ความถี่/เวลาที่ใช้เริ่มงาน", "สัดส่วนงานย่อยที่เสร็จ", "ระดับการเตือนหรือช่วยเหลือ", "มุมมองและความมั่นใจของผู้เรียน"],
      caution: "เพิ่มการช่วยเหลือจากความต้องการจริง ไม่ใช้แผนนี้แทนการประเมินโดยผู้เชี่ยวชาญเมื่อมีข้อบ่งชี้ว่าต้องส่งต่อ",
    },
  };
  return plans[task];
}

export default function CoachClient() {
  const [task, setTask] = useState<TaskId>("analyze");
  const [input, setInput] = useState<CoachInput>(emptyInput);
  const [privacyConfirmed, setPrivacyConfirmed] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [responses, setResponses] = useState(["", "", ""]);
  const [plan, setPlan] = useState<CoachPlan | null>(null);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    queueMicrotask(() => {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      try {
        const saved = JSON.parse(raw);
        if (tasks.some((item) => item.id === saved.task) && saved.input && saved.plan) {
          setTask(saved.task);
          setInput(saved.input);
          setResponses(Array.isArray(saved.responses) ? saved.responses : ["", "", ""]);
          setPlan(saved.plan);
          setPrivacyConfirmed(true);
          setStep(3);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    });
  }, []);

  const riskDetected = useMemo(() => riskPattern.test(Object.values(input).join(" ")), [input]);
  const questions = useMemo(() => clarifyingQuestions(task, input), [task, input]);
  const ready = input.goal.trim().length >= 6 && input.situation.trim().length >= 15 && privacyConfirmed;
  const taskInfo = tasks.find((item) => item.id === task) ?? tasks[0];

  const update = (key: keyof CoachInput, value: string) => {
    setInput((current) => ({ ...current, [key]: value }));
    setPlan(null);
    setStep(1);
    setCopied(false);
    setMessage("");
  };

  const chooseTask = (nextTask: TaskId) => {
    setTask(nextTask);
    setInput(examples[nextTask]);
    setResponses(["", "", ""]);
    setPrivacyConfirmed(false);
    setPlan(null);
    setStep(1);
    setMessage("");
  };

  const loadProfile = () => {
    const raw = localStorage.getItem("learnerlens-profile");
    if (!raw) { setMessage("ยังไม่พบ Learner Profile ใน Browser นี้"); return; }
    try {
      const profile = JSON.parse(raw);
      setInput((current) => ({ ...current, situation: profile.evidence || current.situation, strengths: [profile.strengths, profile.interests].filter(Boolean).join(" · ") || current.strengths, goal: profile.nextStep || current.goal, constraints: profile.barriers || current.constraints }));
      setPlan(null);
      setStep(1);
      setMessage("ดึงข้อมูลจาก Learner Profile แล้ว กรุณาตรวจและลบข้อมูลที่ไม่จำเป็น ✓");
    } catch {
      setMessage("Learner Profile ที่บันทึกไว้ไม่สามารถอ่านได้");
    }
  };

  const generate = () => {
    const nextPlan = buildPlan(task, input, responses, riskDetected);
    setPlan(nextPlan);
    setStep(3);
    setCopied(false);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ task, input, responses, plan: nextPlan, savedAt: new Date().toISOString() }));
    requestAnimationFrame(() => document.querySelector("#coach-plan")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const copyPlan = async () => {
    if (!plan) return;
    const text = [plan.headline, plan.summary, `หลักการ: ${plan.principles.join(" · ")}`, ...plan.sections.flatMap((section) => [`\n${section.title} — ${section.purpose}`, ...section.items.map((item) => `• ${item}`)]), "\nติดตามผล", ...plan.monitor.map((item) => `• ${item}`), `\nข้อควรระวัง: ${plan.caution}`].join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
  };

  const clear = () => {
    setInput(emptyInput);
    setResponses(["", "", ""]);
    setPlan(null);
    setStep(1);
    setPrivacyConfirmed(false);
    setMessage("");
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <section className="subpage-section coach-page" id="top">
      <div className="coach-status-band"><div><span>PRIVACY-FIRST MVP</span><strong>ผู้ช่วยวางแผนอัจฉริยะในอุปกรณ์</strong><p>รุ่นนี้ใช้กระบวนการตัดสินใจแบบมีโครงสร้างและไม่ส่งข้อความไปบริการ AI ภายนอก</p></div><div><span>1</span> ใส่บริบท <i /> <span>2</span> ตอบคำถาม <i /> <span>3</span> รับแผน</div></div>
      <div className="coach-workspace enhanced-coach">
        <aside>
          <span className="section-kicker left">CHOOSE A TASK</span><h2>วันนี้อยากคิดเรื่องใด?</h2>
          {tasks.map((item) => <button type="button" className={task === item.id ? "active" : ""} onClick={() => chooseTask(item.id)} key={item.id}><span>{item.icon}</span><div><strong>{item.label}</strong><small>{item.description}</small></div></button>)}
          <div className="privacy-card"><strong>ก่อนกรอกข้อมูล</strong><p>ใช้รหัสแทนชื่อจริง ไม่ใส่ภาพ เลขประจำตัว ที่อยู่ เบอร์โทร หรือรายละเอียดครอบครัวที่ไม่จำเป็น</p><a href="/principles#responsible-ai">อ่านหลักการใช้ AI →</a><div className="coach-help-lines"><small>หากเกี่ยวกับความปลอดภัย</small><a href="tel:1300">ศูนย์ช่วยเหลือสังคม 1300</a><a href="tel:1323">สายด่วนสุขภาพจิต 1323</a></div></div>
        </aside>

        <div className="coach-console">
          <header><div><span>✦</span><strong>LearnerLens Coach</strong></div><small>Guided Coach · ประมวลผลใน Browser</small></header>
          <div className="coach-stepper" aria-label={`ขั้นตอนปัจจุบัน ${step} จาก 3`}>{["บริบท", "คำถามชี้แจง", "แผนปฏิบัติ"].map((label, index) => <div className={step > index + 1 ? "done" : step === index + 1 ? "active" : ""} key={label}><span>{step > index + 1 ? "✓" : index + 1}</span><strong>{label}</strong></div>)}</div>

          <section className="coach-input-panel" aria-labelledby="coach-context-title">
            <div className="coach-panel-title"><div><span className="task-label">{taskInfo.icon} {taskInfo.label}</span><h2 id="coach-context-title">ข้อมูลที่จำเป็นต่อการช่วยคิด</h2></div><button className="outline-action" type="button" onClick={loadProfile}>ดึงจาก Learner Profile</button></div>
            <label>ระดับชั้นหรือช่วงวัย<select value={input.level} onChange={(event) => update("level", event.target.value)}><option>อนุบาล</option><option>ประถมต้น</option><option>ประถมปลาย</option><option>มัธยมต้น</option><option>มัธยมปลาย</option><option>อาชีวศึกษา</option><option>ชั้นเรียนหลายช่วงวัย</option></select></label>
            <label>เป้าหมายที่อยากให้เกิดขึ้น <span aria-hidden="true">*</span><textarea value={input.goal} onChange={(event) => update("goal", event.target.value)} placeholder="เขียนสิ่งที่อยากให้ผู้เรียนรู้ ทำ หรือพัฒนาอย่างสังเกตได้" /></label>
            <label>สถานการณ์และหลักฐานที่สังเกตได้ <span aria-hidden="true">*</span><textarea value={input.situation} onChange={(event) => update("situation", event.target.value)} placeholder="เกิดอะไรขึ้น เมื่อไร ในบริบทใด และมีผลงานหรือคำพูดอะไรยืนยัน" /></label>
            <div className="coach-form-grid"><label>จุดแข็งและความสนใจ<textarea value={input.strengths} onChange={(event) => update("strengths", event.target.value)} placeholder="สิ่งที่ทำได้ดี สนใจ หรือเงื่อนไขที่มีส่วนร่วม" /></label><label>สิ่งที่เคยลองและผลที่เกิด<textarea value={input.tried} onChange={(event) => update("tried", event.target.value)} placeholder="วิธีที่ใช้แล้ว สิ่งที่ช่วยหรือยังไม่ช่วย" /></label></div>
            <label>เวลา ทรัพยากร หรือข้อจำกัด<textarea value={input.constraints} onChange={(event) => update("constraints", event.target.value)} placeholder="เช่น เวลา 30 นาที นักเรียน 40 คน วัสดุที่มี" /></label>
            {riskDetected && <aside className="coach-risk-alert" role="alert"><strong>พบคำที่อาจเกี่ยวข้องกับความปลอดภัย</strong><p>Coach จะให้แนวทางคุ้มครองและส่งต่อก่อนคำแนะนำการสอน หากมีอันตรายทันที โปรดใช้ระบบฉุกเฉิน/คุ้มครองเด็กในพื้นที่</p><div><a href="tel:1300">ศูนย์ช่วยเหลือสังคม 1300</a><a href="tel:1323">สายด่วนสุขภาพจิต 1323</a></div></aside>}
            <label className="privacy-confirm"><input type="checkbox" checked={privacyConfirmed} onChange={(event) => setPrivacyConfirmed(event.target.checked)} /><span>ฉันตรวจแล้วว่าใช้รหัสแทนชื่อจริง และไม่มีข้อมูลระบุตัวเด็กที่ไม่จำเป็น</span></label>
            <div className="console-actions"><button className="quiet-action" type="button" onClick={clear}>ล้างแบบฟอร์ม</button><button className="outline-action" type="button" onClick={() => { setInput(examples[task]); setPlan(null); setStep(1); }}>ใช้ตัวอย่าง</button><button className="primary-button" type="button" disabled={!ready} onClick={() => setStep(2)}>ตรวจข้อมูลและตั้งคำถาม →</button></div>
            <div className="coach-message" role="status">{message}{!ready && !message ? "กรอกเป้าหมาย สถานการณ์ และยืนยันความเป็นส่วนตัวเพื่อไปต่อ" : ""}</div>
          </section>

          {step >= 2 && (
            <section className="coach-clarify" aria-labelledby="coach-clarify-title">
              <span className="section-kicker left">THINK BEFORE ADVISE</span><h2 id="coach-clarify-title">คำถามที่ควรถามก่อนสรุป</h2><p>ตอบเท่าที่ทราบ หรือเขียน “ยังไม่ทราบ” เพื่อให้แผนระบุสิ่งที่ต้องเก็บข้อมูลต่อ</p>
              {questions.map((question, index) => <label key={question}>{question}<textarea value={responses[index] || ""} onChange={(event) => setResponses((current) => current.map((response, responseIndex) => responseIndex === index ? event.target.value : response))} placeholder="คำตอบสั้น ๆ หรือ ‘ยังไม่ทราบ’" /></label>)}
              <div className="console-actions"><button className="outline-action" type="button" onClick={() => setStep(1)}>← กลับไปแก้ข้อมูล</button><button className="primary-button" type="button" onClick={generate}>สร้างแผนที่นำไปทดลองได้ →</button></div>
            </section>
          )}

          {step === 3 && plan && (
            <section className={`coach-plan ${riskDetected ? "risk-plan" : ""}`} id="coach-plan" aria-live="polite">
              <header><div><span className="case-tag">แผนฉบับพร้อมทดลอง</span><h2>{plan.headline}</h2><p>{plan.summary}</p></div><div className="coach-principles">{plan.principles.map((principle) => <span key={principle}>{principle}</span>)}</div></header>
              <div className="coach-plan-sections">{plan.sections.map((section, index) => <article key={section.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{section.title}</h3><p>{section.purpose}</p><ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul></div></article>)}</div>
              <div className="coach-monitor"><div><span className="section-kicker left">MONITOR</span><h3>หลักฐานที่ควรติดตาม</h3></div><ul>{plan.monitor.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <p className="ai-caution"><strong>ขอบเขตการใช้:</strong> {plan.caution}</p>
              <div className="coach-plan-actions"><button className="outline-action" type="button" onClick={copyPlan}>{copied ? "คัดลอกแล้ว ✓" : "คัดลอกแผน"}</button><button className="primary-button" type="button" onClick={() => setStep(2)}>ปรับคำตอบและสร้างใหม่</button><span>บันทึกใน Browser นี้แล้ว ✓</span></div>
            </section>
          )}
        </div>
      </div>
      <div className="next-links"><a href="/toolkit">เปิดเครื่องมือวิเคราะห์ผู้เรียน →</a><a href="/prompts">เลือก Prompt ฉบับเต็ม →</a><a href="/data">สำรองข้อมูล Coach →</a></div>
    </section>
  );
}
