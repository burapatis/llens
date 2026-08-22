import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("home renders real navigation and creator information", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  for (const href of ["/start", "/whole-learner", "/articles", "/knowledge", "/toolkit", "/paths", "/case-finder", "/coach", "/follow-up", "/data", "/about"]) assert.match(html, new RegExp(`href="${href}"`));
  assert.match(html, /ค้นหาทั้งเว็บไซต์/);
  assert.match(html, /ข้ามไปยังเนื้อหาหลัก/);
  assert.match(html, /Boorapatis Ploysuwan/);
  assert.match(html, /mailto:burapatis@gmail\.com/);
  assert.match(html, /ดูภาพแนะนำเว็บไซต์/);
  assert.match(html, /สิ่งที่สังเกตได้ บริบทที่เกิด จุดแข็ง/);
  assert.match(html, /ไม่ใส่ชื่อหรือข้อมูลระบุตัวตน/);
  assert.doesNotMatch(html, /พฤติกรรมนี้อาจเกี่ยวกับความชัดเจนของงาน ความมั่นใจ/);
  assert.match(html, /class="brand-copy"[^>]*><span class="brand-en">Learner<span>Lens<\/span><\/span><small>เรียนรู้ผู้เรียน<\/small>/);
  assert.doesNotMatch(html, /#case-detail|href="#principles"/);
});

test("all destination pages server-render successfully", async () => {
  const routes = ["/start", "/whole-learner", "/knowledge", "/articles", "/articles/udl", "/articles/learning-preferences", "/editorial", "/design-system", "/toolkit", "/paths", "/cases", "/case-finder", "/coach", "/follow-up", "/downloads", "/prompts", "/assessment", "/data", "/about", "/principles"];
  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, route);
  }
});

test("about page includes the usage guide and creator portrait", async () => {
  const html = await render("/about").then(response => response.text());
  assert.match(html, /id="how-to-use"/);
  assert.match(html, /ตั้งคำถามที่อยากแก้/);
  assert.match(html, /เข้าใจ–สังเกต–ออกแบบ–ติดตาม/);
  assert.match(html, /boorapatis-ploysuwan\.jpg/);
  assert.match(html, /Boorapatis Ploysuwan ผู้จัดทำเว็บไซต์ LearnerLens/);
});

test("publishes crawler discovery files", async () => {
  const sitemap = await render("/sitemap.xml");
  const robots = await render("/robots.txt");
  assert.equal(sitemap.status,200);
  assert.match(sitemap.headers.get("content-type")??"",/xml/i);
  assert.match(await sitemap.text(),/\/toolkit/);
  assert.equal(robots.status,200);
  assert.match(robots.headers.get("content-type")??"",/^text\/plain/i);
  assert.match(await robots.text(),/Sitemap:/);
});

test("invalid links return a useful 404 page", async () => {
  const response = await render("/page-that-does-not-exist");
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /ไม่พบหน้าที่ต้องการ/);
  for (const href of ["/", "/knowledge", "/toolkit"]) {
    assert.match(html, new RegExp(`href="${href}"`));
  }
});

test("deep-link targets exist on knowledge, cases and principles pages", async () => {
  const [knowledge, cases, principles] = await Promise.all([render("/knowledge").then(r=>r.text()), render("/cases").then(r=>r.text()), render("/principles").then(r=>r.text())]);
  for (const id of ["learning-psychology", "child-development", "individual-differences", "motivation", "udl", "differentiation"]) assert.match(knowledge, new RegExp(`id="${id}"`));
  for (const id of ["voice-choice", "meaningful-goals", "scaffolding", "external-supports", "responsive-assessment", "inclusive-dialogue", "family-instability", "violence-disclosure", "grief-caregiver", "repeated-bullying", "cyberbullying", "peer-conflict", "reading-difficulty", "cognitive-access", "language-not-ability", "twice-exceptional", "withdrawal-distress", "early-learning-pace", "early-transition-attention", "primary-processing-time", "primary-attention-support", "primary-intense-interest", "primary-social-reciprocity", "secondary-hyperfocus", "secondary-gaming-sleep", "secondary-peer-boundaries", "vocational-workshop-attention", "higher-reading-load", "higher-gaming-project"]) assert.match(cases, new RegExp(`id="${id}"`));
  assert.match(cases,/ศูนย์ช่วยเหลือสังคม/);
  assert.match(cases,/สายด่วนสุขภาพจิต 24 ชม\./);
  assert.match(cases,/ขอบเขตและการส่งต่อ/);
  assert.match(cases,/ปฐมวัยถึงอุดมศึกษา/);
  for (const id of ["privacy", "responsible-ai", "accessibility"]) assert.match(principles, new RegExp(`id="${id}"`));
});

test("toolkit exposes every MVP tool target", async () => {
  const html = await render("/toolkit").then(response=>response.text());
  for (const id of ["interest-potential", "profile-builder", "observation-log", "interview-guide", "evidence-rubric"]) assert.match(html,new RegExp(`id="${id}"`));
  assert.match(html,/ฉันเป็นนักเรียน/);
  assert.match(html,/ฉันเป็นครู/);
  assert.match(html,/ไม่มีคำตอบถูกผิด/);
  assert.match(html,/ไม่ใช้จัดอันดับเด็ก/);
  assert.match(html,/แผนที่ความสนใจและศักยภาพ/);
});

test("whole learner map explains eight dimensions and an evidence-to-action workflow", async () => {
  const html = await render("/whole-learner").then(response=>response.text());
  for (const id of ["development", "learning", "executive", "motivation", "emotion", "relationships", "identity", "context"]) assert.match(html,new RegExp(`id="${id}"`));
  for (const text of ["หนึ่งคน", "หนึ่งเรื่องราว", "สังเกตเพื่อเข้าใจ ไม่ใช่เฝ้าจับผิด", "ไม่ส่งงาน", "ไม่เข้าใจ", "เริ่มไม่ถูก", "บริบทขัดขวาง", "ใช้แผนที่นี้กับเด็กหนึ่งคนใน 15 นาที", "พิมพ์ / บันทึกเป็น PDF"]) assert.match(html,new RegExp(text));
  assert.match(html,/href="\/toolkit#observation-log"/);
  assert.match(html,/href="\/toolkit#profile-builder"/);
});

test("AI Coach exposes a privacy-first three-step planning workflow", async () => {
  const html = await render("/coach").then(response => response.text());
  for (const text of ["วิเคราะห์สถานการณ์", "สร้างแผนการสอน", "สร้างแบบประเมิน", "วางแผนช่วยเหลือ", "คำถามชี้แจง", "แผนปฏิบัติ", "ดึงจาก Learner Profile", "ประมวลผลใน Browser"]) assert.match(html, new RegExp(text));
  assert.match(html, /ฉันตรวจแล้วว่าใช้รหัสแทนชื่อจริง/);
  assert.match(html, /ศูนย์ช่วยเหลือสังคม 1300/);
  assert.match(html, /สายด่วนสุขภาพจิต 1323/);
});

test("phase two supports a complete classroom action cycle", async () => {
  const [start, finder, toolkit, followUp] = await Promise.all(["/start","/case-finder","/toolkit","/follow-up"].map(route=>render(route).then(response=>response.text())));
  for (const text of ["วันนี้ครูอยากตอบคำถามใด", "วงจร 5 ก้าวที่ใช้ซ้ำได้", "YOUR DEVICE"]) assert.match(start,new RegExp(text));
  for (const text of ["ผลที่ได้", "คำถามหนึ่งประโยค", "บันทึกข้อเท็จจริง", "แผนหนึ่งก้าว", "ข้อมูลก่อน–ระหว่าง–หลัง", "คงไว้ ปรับใหม่ หรือประสานความช่วยเหลือ", "วงจรจึงเป็นการพัฒนาอย่างต่อเนื่อง"]) assert.match(start,new RegExp(text));
  for (const href of ["#choose-question", "/toolkit#observation-log", "/coach", "/follow-up#follow-up-report", "/follow-up#review-decision"]) assert.match(start,new RegExp(`href="${href}"`));
  assert.match(followUp,/id="review-decision"/);
  for (const text of ["ประเภทสถานการณ์", "ระดับการศึกษา", "ปฐมวัย", "อาชีวศึกษา", "อุดมศึกษา", "ค้นหาสถานการณ์ที่ใกล้เคียง"]) assert.match(finder,new RegExp(text));
  for (const text of ["ฉบับเด็ก", "ฉบับครู", "สร้างแผนทดลอง 2–4 สัปดาห์"]) assert.match(toolkit,new RegExp(text));
  for (const text of ["แผนทดลองหนึ่งก้าว", "CHECK-IN LOG", "พิมพ์ / บันทึก PDF"]) assert.match(followUp,new RegExp(text));
});

test("learning path clearly explains how to use and complete each module", async () => {
  const html = await render("/paths").then(response => response.text());
  for (const text of ["หน้านี้คือแผนที่การเรียนรู้และเช็กลิสต์ส่วนตัว", "เลือกจุดเริ่ม", "เปิดเนื้อหา", "ลองใช้กับงานจริง", "กลับมาติ๊กเมื่อจบ", "ต้องทำทุกบทหรือไม่", "ไม่มีคะแนนสอบและไม่ใช้จัดอันดับ", "ความก้าวหน้าบันทึกเฉพาะ Browser"]) assert.match(html, new RegExp(text));
  for (const href of ["/whole-learner", "/articles/child-development", "/toolkit#observation-log", "/articles/executive-functions", "/articles/udl", "/follow-up"]) assert.match(html, new RegExp(`href="${href}"`));
});

test("phase three publishes standardized evidence-informed articles", async () => {
  const [library, udl, preferences, editorial] = await Promise.all(["/articles", "/articles/udl", "/articles/learning-preferences", "/editorial"].map(route => render(route).then(response => response.text())));
  assert.match(library, /11 หัวข้อ/);
  assert.match(library, /มาตรฐานบทความ LearnerLens/);
  for (const text of ["ผลลัพธ์การเรียนรู้", "สัญญาณที่ควรสังเกต", "สิ่งที่ควรทำ และสิ่งที่ควรหลีกเลี่ยง", "CHECKLIST", "REFLECTION QUESTIONS", "Action Canvas", "แหล่งอ้างอิงและอ่านต่อ", "Boorapatis Ploysuwan", "21 สิงหาคม 2026"]) assert.match(udl, new RegExp(text));
  assert.match(preferences, /หลักฐานยังไม่สนับสนุนการจับคู่การสอนกับ Learning Style/);
  assert.match(preferences, /Education Endowment Foundation/);
  assert.match(editorial, /ยังไม่อ้างว่าเป็นการ Peer Review/);
  assert.match(editorial, /แนวทางทางการ/);
  assert.match(editorial, /หลักฐานสังเคราะห์/);
  assert.match(editorial, /กรอบแนวคิด/);
});

test("phase four exposes a reusable accessible design system", async () => {
  const [designSystem, article, search] = await Promise.all(["/design-system", "/articles/udl", "/"].map(route => render(route).then(response => response.text())));
  for (const text of ["Foundations", "Button", "Badge", "Progress", "Range", "Modal", "Learner Snapshot", "AI Coach Composer", "Search Result", "Resource Row", "Content Components", "Accessibility Contract", "WCAG AA", "44×44px"]) assert.match(designSystem, new RegExp(text, "i"));
  for (const text of ["Key takeaway", "ขอบเขตหลักฐาน", "ตัวอย่างในห้องเรียน", "เช็กก่อนนำไปใช้", "คำถามสะท้อนคิด", "แบบฟอร์มพร้อมใช้", "แหล่งอ้างอิงและอ่านต่อ"]) assert.match(article, new RegExp(text));
  assert.match(search, /href="\/design-system"/);
});
