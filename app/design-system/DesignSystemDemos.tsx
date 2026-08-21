"use client";

import { useState } from "react";
import { Button, ButtonLink, Badge, Card, Checklist, LearnerSnapshot, Progress, ResourceRow, SearchResult } from "@/components/ui";
import { CoachComposer, Modal, Range } from "@/components/ui/Interactive";
import { ClassroomExample, DownloadBlock, KeyTakeaway, TheoryNote } from "@/components/content/ArticleBlocks";

const swatches = [
  { name: "Blue · การลงมือ", value: "#2563EB", className: "blue" },
  { name: "Teal · การเติบโต", value: "#0F766E", className: "teal" },
  { name: "Violet · AI/สะท้อนคิด", value: "#7C3AED", className: "violet" },
  { name: "Ink · เนื้อหาหลัก", value: "#13213C", className: "ink" },
  { name: "Mist · พื้นที่พักสายตา", value: "#F4F8FD", className: "mist" },
  { name: "Paper · พื้นผิว", value: "#FFFFFF", className: "paper" },
];

export function DesignSystemDemos() {
  const [readiness, setReadiness] = useState(3);
  return <>
    <section className="subpage-section ds-foundations" id="foundations">
      <header><span className="section-kicker left">FOUNDATIONS</span><h2>สีมีหน้าที่ ระยะห่างมีจังหวะ</h2><p>ทุกสีต้องมีข้อความหรือสัญลักษณ์ร่วม ไม่ใช้สีเป็นช่องทางสื่อสารเพียงอย่างเดียว และทุกหน้าใช้ฐานระยะห่าง 8px</p></header>
      <div className="ds-swatches">{swatches.map((swatch) => <article key={swatch.value}><span className={`ds-swatch ds-${swatch.className}`} /><div><strong>{swatch.name}</strong><code>{swatch.value}</code></div></article>)}</div>
      <div className="ds-foundation-grid">
        <Card><Badge tone="blue">TYPE SCALE</Badge><div className="ds-type-scale"><span className="display">เข้าใจผู้เรียน</span><span className="heading">ออกแบบโอกาสที่ดีกว่า</span><span className="body">เนื้อหาหลักอ่านง่าย มีบรรทัดและความกว้างที่เหมาะสม</span><span className="caption">คำอธิบายและข้อมูลกำกับ</span></div></Card>
        <Card><Badge tone="teal">SPACING & RADIUS</Badge><div className="ds-spacing-scale">{[8,16,24,32,48].map(value => <div key={value}><span style={{ width: value }} /><code>{value}px</code></div>)}</div><div className="ds-radius-row"><span>8</span><span>12</span><span>18</span><span>24</span></div></Card>
      </div>
    </section>

    <section className="ds-component-band" id="actions">
      <div><span className="section-kicker left">ACTIONS & STATUS</span><h2>ส่วนประกอบพื้นฐาน</h2><p>สถานะ Hover, Focus, Disabled และขนาดพื้นที่กดถูกกำหนดจากกติกากลาง</p></div>
      <div className="ds-component-grid">
        <Card className="ds-showcase"><h3>Button</h3><div className="ds-row"><Button type="button">Primary action</Button><Button type="button" variant="outline">Outline</Button><Button type="button" variant="text">Text action</Button><Button type="button" disabled>Disabled</Button></div></Card>
        <Card className="ds-showcase"><h3>Badge</h3><div className="ds-row"><Badge tone="blue">ความรู้</Badge><Badge tone="teal">เติบโต</Badge><Badge tone="violet">AI / Reflection</Badge><Badge tone="warning">ข้อควรระวัง</Badge><Badge tone="danger">ต้องส่งต่อ</Badge></div></Card>
        <Card className="ds-showcase"><h3>Progress</h3><Progress label="ความก้าวหน้า Learning Path" value={68} /><Progress label="การเก็บหลักฐาน" value={42} tone="teal" /></Card>
        <Card className="ds-showcase"><h3>Range</h3><Range label="ความพร้อมของครู" value={readiness} onChange={setReadiness} /></Card>
        <Card className="ds-showcase"><h3>Modal</h3><p>กดเพื่อดูหน้าต่างที่รองรับ Escape, ปิดจากพื้นหลัง และย้าย Focus ไปยังปุ่มปิด</p><Modal title="ยืนยันก่อนใช้ข้อมูลผู้เรียน" triggerLabel="เปิดตัวอย่าง Modal"><Checklist compact items={["ใช้รหัสแทนชื่อจริง", "เก็บข้อมูลเท่าที่จำเป็น", "กำหนดวันทบทวน"]} /></Modal></Card>
        <Card className="ds-showcase"><h3>Checklist</h3><Checklist items={["เป้าหมายการเรียนรู้ชัดเจน", "ทางเลือกสัมพันธ์กับอุปสรรค", "มีหลักฐานติดตามผล"]} /></Card>
      </div>
    </section>

    <section className="subpage-section ds-product-patterns" id="patterns">
      <header><span className="section-kicker left">PRODUCT PATTERNS</span><h2>ส่วนประกอบที่เป็นเอกลักษณ์ของ LearnerLens</h2></header>
      <div className="ds-product-grid"><div><h3>Learner Snapshot</h3><LearnerSnapshot /></div><div><h3>Coach Composer</h3><CoachComposer /></div></div>
      <div className="ds-list-patterns">
        <Card><h3>Search Result</h3><SearchResult href="/articles/udl" icon="◉" category="ความรู้" title="Universal Design for Learning" description="ออกแบบทางเลือกเพื่อลดอุปสรรคและเพิ่ม Learner Agency" /></Card>
        <Card><h3>Resource Row</h3><ResourceRow href="/downloads" icon="▤" badge="DOCX" title="Learner Profile Template" meta="สังเคราะห์จุดแข็ง อุปสรรค และก้าวถัดไป" action="ดาวน์โหลด" /></Card>
      </div>
    </section>

    <section className="ds-content-patterns" id="content-components">
      <header><span className="section-kicker left">CONTENT COMPONENTS</span><h2>บล็อกเนื้อหาที่คงคุณภาพทุกบท</h2><p>บทความฉบับเต็มประกอบจากรูปแบบกลาง ทำให้โครงสร้าง ภาษา และการใช้งานสม่ำเสมอเมื่อคลังความรู้ขยายตัว</p></header>
      <div className="ds-content-demo"><KeyTakeaway>การปรับที่ดีเริ่มจากอุปสรรคต่อเป้าหมาย ไม่เริ่มจากฉลากของผู้เรียน</KeyTakeaway><TheoryNote>ใช้แนวคิดเป็นสมมติฐานเพื่อสำรวจต่อ ไม่ใช้เป็นการวินิจฉัยหรือข้อสรุปถาวร</TheoryNote><ClassroomExample context="ผู้เรียนอธิบายปากเปล่าได้ แต่ติดเมื่อเขียนคำตอบยาว" action="คงเป้าหมายเนื้อหาและเปิดทางตอบด้วยแผนภาพพร้อมคำอธิบาย" evidence="ใช้เกณฑ์เนื้อหาเดียวกันเปรียบเทียบคุณภาพหลักฐาน" /><DownloadBlock>ใช้ Learner Profile หรือแผนช่วยเหลือเพื่อเชื่อมสิ่งที่สังเกตกับการทดลองในคาบถัดไป</DownloadBlock></div>
    </section>

    <section className="subpage-section ds-accessibility" id="accessibility">
      <div><span className="section-kicker left">ACCESSIBILITY CONTRACT</span><h2>กติกาที่ทุกส่วนประกอบต้องผ่าน</h2><Checklist items={["เป้าหมาย Contrast ระดับ WCAG AA", "พื้นที่กดบนมือถือไม่น้อยกว่า 44×44px", "Focus state มองเห็นได้และใช้งานด้วย Keyboard", "Label และข้อความสถานะอ่านได้ด้วย Screen Reader", "รองรับ prefers-reduced-motion", "ไม่ใช้สีเป็นวิธีสื่อความหมายเพียงอย่างเดียว"]} /></div>
      <aside><Badge tone="teal">READY TO SCALE</Badge><strong>ระบบเดียว ใช้ได้ทั้งเว็บไซต์</strong><p>Foundations และ Component Contracts ช่วยให้ระยะต่อไปเพิ่มหน้า เครื่องมือ หรือ MDX ได้โดยไม่ต้องออกแบบรูปแบบพื้นฐานใหม่</p><ButtonLink href="/principles#accessibility" variant="outline">อ่านหลักการการเข้าถึง</ButtonLink></aside>
    </section>
  </>;
}
