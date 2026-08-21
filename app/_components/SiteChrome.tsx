/* Static anchors intentionally keep the GitHub Pages export dependency-free. */
/* eslint-disable @next/next/no-html-link-for-pages */
import type { ReactNode } from "react";
import { GlobalSearch } from "./GlobalSearch";

export function Brand() {
  return <a className="brand" href="/" aria-label="เรียนรู้ผู้เรียน LearnerLens หน้าแรก"><span className="brand-mark" aria-hidden="true"><i/><i/><i/></span><span className="brand-copy"><span className="brand-en">Learner<span>Lens</span></span><small>เรียนรู้ผู้เรียน</small></span></a>;
}

export function SubHeader() {
  return <header className="site-header sub-header"><Brand/><nav className="nav" aria-label="เมนูหลัก"><a href="/start">เริ่มใช้งาน</a><a href="/articles">บทความ</a><a href="/toolkit">เครื่องมือ</a><a href="/paths">เส้นทางการเรียนรู้</a><a href="/case-finder">ค้นหากรณี</a><a href="/about">เกี่ยวกับโครงการ</a></nav><div className="sub-header-actions"><GlobalSearch/><a className="coach-button" href="/coach">ลอง AI Coach <span aria-hidden="true">→</span></a></div></header>;
}

export function SiteFooter() {
  return <footer><div className="footer-brand"><Brand/><p>Understand Every Learner.<br/>Teach for Differences.</p></div><div><strong>เรียนรู้</strong><a href="/start">เริ่มใช้งานวันนี้</a><a href="/articles">บทความฉบับเต็ม</a><a href="/knowledge">คลังความรู้ฉบับย่อ</a><a href="/paths">เส้นทางการเรียนรู้</a><a href="/cases">กรณีศึกษาทั้งหมด</a><a href="/case-finder">ค้นหากรณีศึกษา</a><a href="/assessment">ประเมินตนเอง</a></div><div><strong>ลงมือทำ</strong><a href="/toolkit">เครื่องมือวิเคราะห์</a><a href="/coach">AI Teacher Coach</a><a href="/follow-up">ติดตามผล 2–4 สัปดาห์</a><a href="/downloads">ดาวน์โหลด</a><a href="/prompts">Prompt Library</a><a href="/data">ศูนย์ข้อมูลในอุปกรณ์</a></div><div><strong>เกี่ยวกับ</strong><a href="/about#how-to-use">วิธีใช้งานเว็บไซต์</a><a href="/about">จุดประสงค์และผู้จัดทำ</a><a href="/editorial">มาตรฐานเนื้อหา</a><a href="/design-system">Design System</a><a href="/principles#privacy">ความเป็นส่วนตัว</a><a href="/principles#responsible-ai">การใช้ AI อย่างรับผิดชอบ</a><a href="/principles#accessibility">การเข้าถึงสำหรับทุกคน</a></div><small>© 2026 LearnerLens · จัดทำโดย Boorapatis Ploysuwan นักวิจัยอิสระ</small></footer>;
}

export function SubPage({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: ReactNode }) {
  return <><SubHeader/><main className="subpage" id="main-content"><section className="subpage-hero"><div><span className="section-kicker left">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div></section>{children}</main><SiteFooter/></>;
}
