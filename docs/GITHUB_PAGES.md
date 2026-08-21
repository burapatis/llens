# LearnerLens: GitHub Pages production guide

เว็บไซต์ใช้แนวทางผสม โดยมีซอร์สโค้ดชุดเดียวและสร้างผลลัพธ์สองแบบ:

- `npm run build` สำหรับเว็บไซต์ Sites ปัจจุบัน
- `npm run build:pages` สำหรับ GitHub Pages ที่ `llens.thamdee.com`

## เปิดใช้ GitHub Pages

1. นำโครงการขึ้น GitHub โดยใช้สาขาหลักชื่อ `main`
2. เปิด **Settings → Pages** และเลือก **GitHub Actions** เป็น Source
3. ตั้ง Custom domain เป็น `llens.thamdee.com`
4. ที่ผู้ให้บริการ DNS สร้าง CNAME ชื่อ `llens` ให้ชี้ไปที่ `<ชื่อผู้ใช้ GitHub>.github.io`
5. รอการตรวจสอบ DNS แล้วเปิด **Enforce HTTPS**
6. ส่งการแก้ไขขึ้นสาขา `main` ระบบจะตรวจ สร้าง และเผยแพร่โดยอัตโนมัติ

## ก่อนเปลี่ยนโดเมนหลัก

- ทดสอบหน้าแรกและทุกหน้าจาก URL โดยตรง รวมถึงการ Refresh
- ทดสอบ Search, Toolkit, AI Coach แบบใน Browser, Learning Path และไฟล์ดาวน์โหลด
- ส่งออกข้อมูลเดิมจากหน้า `/data` ก่อนย้ายโดเมน เพราะ Local Storage ไม่ย้ายข้ามโดเมนอัตโนมัติ
- ตั้ง Canonical URL เป็นโดเมนใหม่เมื่อ DNS และ HTTPS พร้อมแล้ว
- คงเว็บไซต์ Sites เดิมไว้จนกว่าการตรวจสอบ GitHub Pages จะผ่านครบถ้วน

## ขอบเขตของ GitHub Pages

เว็บไซต์ฉบับ Static รองรับเนื้อหา เครื่องมือ Local Storage, Fuse.js และ Coach แบบประมวลผลใน Browser หากเพิ่ม OpenAI/Azure OpenAI จริง ให้เรียกผ่าน Serverless API ที่เก็บกุญแจไว้ฝั่งเซิร์ฟเวอร์ ห้ามวาง API Key ในโค้ดหน้าเว็บ
