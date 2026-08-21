export type SearchItem = {
  title: string;
  description: string;
  href: string;
  category: "ความรู้" | "กรณีศึกษา" | "เครื่องมือ" | "เส้นทาง" | "ทรัพยากร";
  keywords: string[];
};

export const searchItems: SearchItem[] = [
  { title: "จิตวิทยาการเรียนรู้", description: "Piaget, Vygotsky, Bruner และ Bandura สู่การออกแบบการเรียนรู้", href: "/knowledge#learning-psychology", category: "ความรู้", keywords: ["ความจำ", "scaffolding", "ZPD", "ทฤษฎี"] },
  { title: "พัฒนาการเด็ก", description: "เข้าใจพัฒนาการหลายมิติและความแปรผันของผู้เรียน", href: "/knowledge#child-development", category: "ความรู้", keywords: ["เด็ก", "พัฒนาการ", "วัย"] },
  { title: "ความแตกต่างระหว่างบุคคล", description: "จุดแข็ง ความพร้อม ความสนใจ ประสบการณ์ และบริบท", href: "/knowledge#individual-differences", category: "ความรู้", keywords: ["ความหลากหลาย", "learner diversity"] },
  { title: "ความฉลาดหลากหลาย", description: "ใช้เป็นเลนส์มองศักยภาพ โดยไม่ติดป้ายผู้เรียน", href: "/knowledge#multiple-intelligences", category: "ความรู้", keywords: ["Gardner", "พหุปัญญา"] },
  { title: "ความชอบในการเรียนรู้", description: "ข้อควรระวังเรื่อง Learning Styles และการเลือกสื่อตามเนื้อหา", href: "/knowledge#learning-preferences", category: "ความรู้", keywords: ["learning styles", "visual", "auditory"] },
  { title: "แรงจูงใจและ Growth Mindset", description: "ความหมาย ความเป็นเจ้าของ Self-efficacy และความก้าวหน้า", href: "/knowledge#motivation", category: "ความรู้", keywords: ["Bandura", "Dweck", "motivation"] },
  { title: "Executive Functions", description: "การเริ่มงาน วางแผน Working Memory และความยืดหยุ่น", href: "/knowledge#executive-functions", category: "ความรู้", keywords: ["EF", "เริ่มงาน", "กำกับตนเอง"] },
  { title: "Inclusive Education", description: "การเข้าถึง การมีส่วนร่วม การยอมรับ และความก้าวหน้า", href: "/knowledge#inclusive-education", category: "ความรู้", keywords: ["UNESCO", "เรียนรวม", "inclusion"] },
  { title: "Universal Design for Learning", description: "UDL 3.0: Engagement, Representation, Action & Expression", href: "/knowledge#udl", category: "ความรู้", keywords: ["CAST", "UDL", "ทางเลือก"] },
  { title: "Differentiated Instruction", description: "ปรับเนื้อหา กระบวนการ ชิ้นงาน และสภาพแวดล้อมอย่างยืดหยุ่น", href: "/knowledge#differentiation", category: "ความรู้", keywords: ["Tomlinson", "DI", "จัดกลุ่ม"] },
  { title: "Assessment for Learning", description: "เก็บหลักฐานระหว่างเรียนและให้ Feedback ที่ชี้ก้าวถัดไป", href: "/knowledge#assessment-for-learning", category: "ความรู้", keywords: ["AFL", "exit ticket", "ประเมิน"] },
  { title: "เลือกวิธีตอบได้", description: "กรณีศึกษา UDL ที่เปิดทางให้ผู้เรียนแสดงความเข้าใจหลายแบบ", href: "/cases#voice-choice", category: "กรณีศึกษา", keywords: ["UDL", "เสียงผู้เรียน", "ประถม"] },
  { title: "จากไม่ส่งงานสู่เป้าหมายที่มีความหมาย", description: "ใช้การฟัง แบ่งก้าว และความสนใจเพื่อสร้างแรงจูงใจ", href: "/cases#meaningful-goals", category: "กรณีศึกษา", keywords: ["แรงจูงใจ", "ไม่ส่งงาน"] },
  { title: "หนึ่งเป้าหมาย สามระดับการพยุง", description: "Differentiation โดยไม่ลดความคาดหวัง", href: "/cases#scaffolding", category: "กรณีศึกษา", keywords: ["scaffolding", "จัดกลุ่ม"] },
  { title: "เริ่มงานได้ด้วย External Supports", description: "กรณีศึกษา Executive Functions และเครื่องมือช่วยเริ่มงาน", href: "/cases#external-supports", category: "กรณีศึกษา", keywords: ["EF", "executive function", "เริ่มงาน"] },
  { title: "Exit Ticket เปลี่ยนคาบถัดไป", description: "ใช้ Assessment for Learning ปรับแผนจากหลักฐานจริง", href: "/cases#responsive-assessment", category: "กรณีศึกษา", keywords: ["exit ticket", "feedback"] },
  { title: "วงสนทนาที่ทุกคนมีส่วนร่วม", description: "ปรับกติกาและช่องทางการมีส่วนร่วมในห้องเรียนแบบเรียนรวม", href: "/cases#inclusive-dialogue", category: "กรณีศึกษา", keywords: ["inclusion", "discussion", "เรียนรวม"] },
  { title: "ความไม่แน่นอนที่บ้าน", description: "สังเกตและช่วยเหลือเมื่อการมาสายหรือไม่ส่งงานอาจเชื่อมกับภาระครอบครัว", href: "/cases#family-instability", category: "กรณีศึกษา", keywords: ["ครอบครัว", "ย้ายบ้าน", "มาสาย", "ไม่ส่งงาน"] },
  { title: "ผู้เรียนเปิดเผยความรุนแรงที่บ้าน", description: "รับฟัง คุ้มครอง บันทึก และส่งต่อตามระบบโดยไม่สอบสวนเอง", href: "/cases#violence-disclosure", category: "กรณีศึกษา", keywords: ["ความรุนแรง", "คุ้มครองเด็ก", "1300", "safeguarding"] },
  { title: "การสูญเสียและผู้ดูแลเจ็บป่วย", description: "ให้กิจวัตร ทางเลือก และการติดตามโดยไม่เร่งการฟื้นตัว", href: "/cases#grief-caregiver", category: "กรณีศึกษา", keywords: ["สูญเสีย", "โศกเศร้า", "ครอบครัว"] },
  { title: "การบูลลี่ซ้ำและอำนาจไม่สมดุล", description: "แยกการบูลลี่จากการหยอกและคืนความปลอดภัยให้ผู้ถูกกระทำ", href: "/cases#repeated-bullying", category: "กรณีศึกษา", keywords: ["บูลลี่", "bullying", "ล้อ", "เพื่อน"] },
  { title: "Cyberbullying และกลุ่มแชต", description: "รักษาหลักฐาน หยุดการแพร่ซ้ำ และติดตามผลกระทบในโรงเรียน", href: "/cases#cyberbullying", category: "กรณีศึกษา", keywords: ["ไซเบอร์บูลลี่", "กลุ่มแชต", "ออนไลน์"] },
  { title: "ความขัดแย้งกับเพื่อน", description: "แยก Peer Conflict จาก Bullying และใช้การซ่อมแซมเมื่อปลอดภัย", href: "/cases#peer-conflict", category: "กรณีศึกษา", keywords: ["ทะเลาะ", "เพื่อน", "ไกล่เกลี่ย", "restorative"] },
  { title: "อ่านช้าหรืออาจมีปัญหาการเรียนรู้", description: "ช่วยทันที ติดตามการตอบสนอง และส่งต่อด้วยหลักฐานหลายด้าน", href: "/cases#reading-difficulty", category: "กรณีศึกษา", keywords: ["อ่านช้า", "dyslexia", "RTI", "learning difficulty"] },
  { title: "การสนับสนุนด้านสติปัญญาและการปรับตัว", description: "ปรับการเข้าถึงโดยไม่ลดคุณค่าของเป้าหมายหรือวินิจฉัยจากคะแนนเดียว", href: "/cases#cognitive-access", category: "กรณีศึกษา", keywords: ["สติปัญญา", "intellectual disability", "IQ", "การศึกษาพิเศษ"] },
  { title: "ความต่างทางภาษาไม่ใช่ความสามารถต่ำ", description: "แยกอุปสรรคภาษา วัฒนธรรม และโอกาสเรียนจากความสามารถทางปัญญา", href: "/cases#language-not-ability", category: "กรณีศึกษา", keywords: ["ภาษา", "วัฒนธรรม", "ย้ายถิ่น", "ELL"] },
  { title: "ความสามารถสูงร่วมกับความต้องการช่วยเหลือ", description: "มองทั้งศักยภาพและอุปสรรคของผู้เรียน Twice-Exceptional", href: "/cases#twice-exceptional", category: "กรณีศึกษา", keywords: ["gifted", "twice exceptional", "2e", "ความสามารถสูง"] },
  { title: "ถอนตัวและมีสัญญาณทุกข์ใจ", description: "ครูสังเกต เช็กความปลอดภัย และส่งต่อโดยไม่วินิจฉัย", href: "/cases#withdrawal-distress", category: "กรณีศึกษา", keywords: ["ซึมเศร้า", "ถอนตัว", "สุขภาพจิต", "1323"] },
  { title: "Learner Profile Builder", description: "สังเคราะห์จุดแข็ง ความสนใจ หลักฐาน อุปสรรค และก้าวถัดไป", href: "/toolkit#profile-builder", category: "เครื่องมือ", keywords: ["profile", "วิเคราะห์ผู้เรียน"] },
  { title: "Observation Log", description: "บันทึกสิ่งที่สังเกต บริบท เสียงผู้เรียน และก้าวถัดไป", href: "/toolkit#observation-log", category: "เครื่องมือ", keywords: ["สังเกต", "observation", "ABC"] },
  { title: "Interview Guide", description: "คำถามปลายเปิดเพื่อฟังประสบการณ์ของผู้เรียน", href: "/toolkit#interview-guide", category: "เครื่องมือ", keywords: ["สัมภาษณ์", "learner voice"] },
  { title: "Evidence Rubric", description: "ตรวจคุณภาพหลักฐานก่อนตัดสินใจช่วยเหลือ", href: "/toolkit#evidence-rubric", category: "เครื่องมือ", keywords: ["rubric", "หลักฐาน"] },
  { title: "Self-Assessment Center", description: "ประเมินความพร้อมและดูผลแบบ Radar Chart", href: "/assessment", category: "เครื่องมือ", keywords: ["ประเมินตนเอง", "radar"] },
  { title: "AI Teacher Coach", description: "ผู้ช่วยจัดโครงข้อมูลและเสนอแนวทางอย่างไม่ติดป้าย", href: "/coach", category: "เครื่องมือ", keywords: ["AI", "วิเคราะห์", "กิจกรรม"] },
  { title: "เส้นทาง Beginner", description: "เปิดเลนส์และเข้าใจความแตกต่าง", href: "/paths", category: "เส้นทาง", keywords: ["beginner", "เริ่มต้น"] },
  { title: "เส้นทาง Intermediate", description: "อ่านร่องรอยการเรียนรู้และสร้าง Learner Profile", href: "/paths", category: "เส้นทาง", keywords: ["intermediate", "สังเกต"] },
  { title: "เส้นทาง Advanced", description: "ออกแบบ UDL, Differentiation และ Assessment", href: "/paths", category: "เส้นทาง", keywords: ["advanced", "UDL"] },
  { title: "Prompt Library", description: "Prompt วิเคราะห์ ออกแบบกิจกรรม ประเมิน และสะท้อนผล", href: "/prompts", category: "ทรัพยากร", keywords: ["prompt", "AI"] },
  { title: "Download Center", description: "แบบสังเกต Learner Profile และ Intervention Plan", href: "/downloads", category: "ทรัพยากร", keywords: ["PDF", "DOCX", "XLSX", "ดาวน์โหลด"] },
  { title: "ศูนย์ข้อมูลในอุปกรณ์", description: "สำรอง นำเข้า และจัดการข้อมูล Local Storage", href: "/data", category: "ทรัพยากร", keywords: ["backup", "restore", "สำรองข้อมูล"] },
  { title: "วิธีใช้งานเว็บไซต์ LearnerLens", description: "เริ่มจากโจทย์จริง เปิดความรู้ เก็บหลักฐาน ออกแบบ และติดตามผลใน 5 ขั้นตอน", href: "/about#how-to-use", category: "ทรัพยากร", keywords: ["คู่มือ", "วิธีใช้", "เริ่มต้น", "ขั้นตอน"] },
  { title: "หลักการความเป็นส่วนตัว", description: "ใช้ข้อมูลเท่าที่จำเป็นและไม่ติดป้ายผู้เรียน", href: "/principles#privacy", category: "ทรัพยากร", keywords: ["privacy", "ข้อมูลส่วนบุคคล"] },
];
