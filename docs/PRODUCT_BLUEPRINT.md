# LearnerLens — Product Blueprint

## Phase 1: Vision, Mission, Branding, Sitemap

**Vision:** ครูทุกคนมองเห็น เข้าใจ และตอบสนองต่อความเป็นเอกลักษณ์ของผู้เรียนได้อย่างมีหลักฐาน มีความเมตตา และเชื่อว่าผู้เรียนทุกคนเติบโตได้

**Mission:** เปลี่ยนองค์ความรู้ด้านผู้เรียนให้เป็นประสบการณ์เรียนรู้ เครื่องมือ และคำแนะนำที่ครูใช้ได้ในคาบถัดไป โดยรักษาความเป็นส่วนตัวและไม่ติดป้ายผู้เรียน

**Brand promise:** Understand Every Learner · Teach for Differences · Every Child Can Learn

**Brand personality:** Human, evidence-informed, calm, practical, inclusive. สีหลัก Blue `#2563EB`, Teal `#0F766E`, Violet `#7C3AED`; ใช้ Deep Navy สร้างความน่าเชื่อถือและพื้นที่สีอ่อนลดภาระทางสายตา

Sitemap ฉบับ machine-readable อยู่ที่ `data/site-map.json` หน้าแรกทำหน้าที่เป็น portal เข้าสู่ 8 พื้นที่หลัก โดยรายละเอียดเนื้อหาใช้เส้นทางแบบ `/knowledge/[slug]` และ `/cases/[slug]` เมื่อขยายเป็นหลายหน้า

## Phase 2: Information Architecture, Journey, Personas, Content

### Information architecture

1. **Learn:** Knowledge Hub, Learning Path, Best Practices
2. **Understand:** Toolkit, Self-Assessment
3. **Act:** AI Coach, Prompt Library, Download Center
4. **Reflect:** progress, reflection questions, evidence review

### Primary journey

Discover problem → Learn a concept → Observe without judgment → Build a learner profile → Select one small adaptation → Try in class → Collect evidence → Reflect and revise.

### Personas

- **ครูเมย์ — ครูประถมต้น:** เวลาน้อย ดูแลเด็กหลากหลาย ต้องการตัวอย่างและแบบฟอร์มที่ใช้ทันที
- **ครูนนท์ — ครูมัธยม:** สอนหลายห้อง ต้องการมองรูปแบบระดับชั้นเรียนและปรับกิจกรรมโดยไม่เพิ่มภาระตรวจงาน
- **ครูอ้อม — ครูการศึกษาพิเศษ/แนะแนว:** ต้องการเครื่องมือร่วมมือกับครูประจำวิชาและภาษาที่ไม่ติดป้าย
- **ศึกษานิเทศก์พีท:** ต้องการ Learning Path และกรณีศึกษาเพื่อพัฒนาครูเป็นกลุ่ม

### Content strategy

ทุกบทความใช้โครง **Key takeaway → Theory → Classroom example → Checklist → Reflection → Download** และแยกเนื้อหาอ้างอิงออกจากข้อเสนอแนะเชิงปฏิบัติอย่างชัดเจน เนื้อหาแกนกลางอิง Piaget, Vygotsky, Bruner, Bandura, Bloom, Gardner, Gagné, Tomlinson, Hattie, CAST, OECD และ UNESCO พร้อมวันทบทวนเอกสาร

หมายเหตุด้านวิชาการ: นำเสนอ “learning preferences” เป็นความชอบที่ยืดหยุ่น ไม่ใช้ Learning Styles เพื่อจำแนกหรือติดป้ายผู้เรียน และอธิบาย Multiple Intelligences ในฐานะเลนส์สำรวจศักยภาพ ไม่ใช่แบบทดสอบความสามารถถาวร

## Phase 3: Wireframe and UX/UI specifications

### Page anatomy

Header → value-led hero with learner snapshot → beliefs → why it matters → knowledge hub → interactive toolkit → learning path → AI coach → best practices → self-assessment → resources → CTA → footer.

### Interaction specification

- Touch target ไม่น้อยกว่า 44×44px ในหน้ามือถือ
- Focus state ที่มองเห็นได้, semantic headings, label ครบ, รองรับ keyboard และ reduced motion
- Local-first: checklist, readiness scores และ learning progress อยู่ใน `localStorage`; ไม่เก็บชื่อผู้เรียน
- AI input แจ้งให้ลบข้อมูลระบุตัวตน แสดงข้อจำกัด และแยกคำแนะนำจากการวินิจฉัย
- Search ระยะแรกใช้ Fuse.js กับ JSON/MDX index และทำงาน client-side
- Mobile: เลย์เอาต์คอลัมน์เดียว, เมนูพับ, การ์ดและแบบประเมินปรับตามความกว้าง

### Visual specification

8px spacing system, card radius 12–24px, border สีอ่อนแทนเงาหนัก, typography hierarchy 11/12/14/18/32/52px และใช้สี accent เฉพาะเพื่อสื่อความหมาย ไม่พึ่งสีเพียงอย่างเดียว

## Phase 4: Design System and Component Library

### Foundations

- `--blue`: primary actions and progress
- `--teal`: success, growth, inclusive supports
- `--violet`: AI and reflection
- `--ink`: primary text; contrast target WCAG AA
- Components: Button (primary/outline/text), Badge, Card, Progress, Checklist, Range, Modal, SearchResult, LearnerSnapshot, CoachComposer, ResourceRow

### Content components

`ArticleHeader`, `KeyTakeaway`, `TheoryNote`, `ClassroomExample`, `ChecklistBlock`, `ReflectionBlock`, `DownloadBlock`, `ReferenceList`. เนื้อหา MDX ต้องประกอบจากชุดนี้เพื่อคงคุณภาพและความสม่ำเสมอ

## Phase 5: Architecture

เว็บไซต์ตัวอย่างทำงานแบบ local-first ไม่มีฐานข้อมูล โครงสร้างเป้าหมาย:

```text
app/                 routes, layouts, API boundary
components/          shared UI and feature components
content/articles/    academic MDX
content/cases/       case-study MDX
data/                navigation, prompts, search index
public/downloads/    teacher templates
docs/                product and operations guides
```

ขยายภายหลังได้โดยรักษา content schema และ component contracts เดิม แล้วเปลี่ยน search index, analytics หรือ profile storage เป็น managed services ผ่าน abstraction layer แทนการแก้หน้าเว็บใหม่ทั้งหมด
