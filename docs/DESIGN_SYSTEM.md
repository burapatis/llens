# LearnerLens Design System

ระยะที่ 4 เปลี่ยน Visual Specification ให้เป็น Foundations และ Component Contracts ที่นำกลับมาใช้ได้จริง โดยมีหน้า `/design-system` เป็น Living Documentation

## Foundations

- สี: Blue สำหรับการลงมือ, Teal สำหรับการเติบโต/การช่วยเหลือ, Violet สำหรับ AI/Reflection และ Ink สำหรับข้อความหลัก
- ระยะห่าง: ฐาน 8px (`--space-2`) และลำดับ 4, 8, 12, 16, 24, 32, 48, 64px
- Radius: 8, 12, 18, 24px และ Pill
- Type: ใช้ Semantic Heading ตามลำดับ ไม่เลือกขนาดแทนโครงสร้างเอกสาร
- Accessibility: Contrast เป้าหมาย WCAG AA, Focus ที่มองเห็น, Touch target 44×44px, Keyboard และ Reduced Motion

## UI components

อยู่ใน `components/ui/`

- `Button`, `ButtonLink`: primary, outline, text; small, medium, large
- `Badge`: blue, teal, violet, neutral, warning, danger
- `Card`, `Progress`, `Checklist`, `Range`, `Modal`, `SearchResult`
- `LearnerSnapshot`, `CoachComposer`, `ResourceRow`

## Content components

อยู่ใน `components/content/ArticleBlocks.tsx`

- `ArticleHeader`, `KeyTakeaway`, `TheoryNote`, `ClassroomExample`
- `ChecklistBlock`, `ReflectionBlock`, `DownloadBlock`, `ReferenceList`

บทความควรประกอบจากชุดนี้เพื่อรักษาลำดับเนื้อหา ภาษาคำเตือน การอ้างอิง และรูปแบบการพิมพ์ให้สม่ำเสมอ

## Component contract

1. รับข้อมูลผ่าน props และไม่มีเนื้อหาเฉพาะหน้าฝังอยู่ใน UI component
2. ใช้ semantic HTML และต้องมี Accessible Name เมื่อไม่มีข้อความที่มองเห็น
3. สีสถานะต้องมีข้อความหรือสัญลักษณ์ร่วมเสมอ
4. Client state ใช้เฉพาะ interaction; เนื้อหาหลักต้อง Server Render ได้
5. การเพิ่ม variant ใหม่ต้องอธิบายหน้าที่ ไม่ตั้งชื่อตามสีเพียงอย่างเดียวในระดับผลิตภัณฑ์
