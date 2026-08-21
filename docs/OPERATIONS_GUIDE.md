# Deployment and Maintenance Guide

## Deployment

1. ตรวจค่าตัวแปร `OPENAI_API_KEY` หรือ Azure equivalents ในระบบ hosting โดยไม่เก็บ secret ใน source code
2. สร้าง production build และตรวจหน้าแรก เส้นทางบทความ ตัวดาวน์โหลด Search และ local-storage interactions
3. Deploy บน Vercel หรือ Sites; เปิด HTTPS, compression, cache สำหรับ assets และ security headers
4. ตั้ง custom domain, sitemap, robots, Open Graph image และ analytics ที่ไม่เก็บข้อมูลผู้เรียน
5. Smoke test บนมือถือและ desktop รวมถึง keyboard navigation และ screen-reader labels

## AI configuration

ใช้ server-side route เป็น proxy ไปยัง OpenAI/Azure OpenAI, จำกัดขนาด input, ทำ rate limit, ไม่ log ข้อความที่อาจมีข้อมูลผู้เรียน และใช้ system prompt ที่ห้ามวินิจฉัย ติดป้าย หรือสรุปจากข้อมูลไม่เพียงพอ หน้าเว็บต้องทำงานส่วนความรู้และเครื่องมือ local-first ได้แม้ AI ไม่พร้อม

## Content maintenance

- ผู้เขียนใช้ MDX frontmatter schema เดียวกันและ checklist บังคับก่อนเผยแพร่
- ผู้ทบทวนวิชาการตรวจ accuracy, classroom applicability, inclusive language และแหล่งอ้างอิง
- ทบทวนบทความทุก 12 เดือน หรือเมื่อ CAST/OECD/UNESCO ออกกรอบใหม่
- แสดงวันที่ตรวจทานล่าสุดและ version ของ downloadable templates
- สร้าง search index ใหม่เมื่อ content เปลี่ยน

## Privacy and safety

- ไม่ขอชื่อจริง รหัสนักเรียน ภาพใบหน้า สุขภาพ หรือข้อมูลครอบครัวใน AI Coach
- ให้ผู้ใช้ลบ local data ได้จาก Settings และอธิบายว่า browser data ผูกกับอุปกรณ์
- ทำ privacy impact review ก่อนเพิ่ม account, cloud sync หรือ analytics ระดับบุคคล

## Quality checklist per release

- Build/test ผ่าน; ไม่มี broken link หรือ missing download
- Lighthouse goals: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- ตรวจ contrast, zoom 200%, keyboard-only, reduced motion และหน้าจอ 360px
- ตรวจ metadata, canonical URL, sitemap และ structured data
- ตรวจ AI refusal, uncertainty language, privacy warning และ fallback state
