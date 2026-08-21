import type { ReactNode } from "react";
import type { ArticleSource } from "@/app/_data/articles";
import { Badge, ButtonLink, Checklist } from "@/components/ui";

export function ArticleHeader({ eyebrow, title, description, meta, actions, breadcrumb }: { eyebrow: string; title: string; description: string; meta: string[]; actions?: ReactNode; breadcrumb?: ReactNode }) {
  return <header className="knowledge-article-hero">{breadcrumb}<span className="section-kicker left">{eyebrow}</span><h1>{title}</h1><p>{description}</p><div className="knowledge-article-meta">{meta.map((item) => <span key={item}>{item}</span>)}</div>{actions}</header>;
}

export function KeyTakeaway({ children }: { children: ReactNode }) {
  return <aside className="ll-key-takeaway"><span aria-hidden="true">◎</span><div><strong>Key takeaway</strong><p>{children}</p></div></aside>;
}

export function TheoryNote({ children, title = "ขอบเขตหลักฐาน" }: { children: ReactNode; title?: string }) {
  return <aside className="evidence-caution"><strong>{title}</strong><p>{children}</p></aside>;
}

export function ClassroomExample({ context, action, evidence }: { context: string; action: string; evidence: string }) {
  return <section id="example" className="classroom-example"><span className="section-kicker left">CLASSROOM EXAMPLE</span><h2>ตัวอย่างในห้องเรียน</h2><dl><div><dt>บริบท</dt><dd>{context}</dd></div><div><dt>สิ่งที่ครูลอง</dt><dd>{action}</dd></div><div><dt>หลักฐานที่ติดตาม</dt><dd>{evidence}</dd></div></dl></section>;
}

export function ChecklistBlock({ items }: { items: string[] }) {
  return <section id="checklist" className="article-checklist-section"><span className="section-kicker left">CHECKLIST</span><h2>เช็กก่อนนำไปใช้</h2><Checklist items={items} /></section>;
}

export function ReflectionBlock({ items }: { items: string[] }) {
  return <section id="reflection"><span className="section-kicker left">REFLECTION QUESTIONS</span><h2>คำถามสะท้อนคิด</h2><ol className="reflection-list">{items.map((item, index) => <li key={item}><span>{index + 1}</span><p>{item}</p></li>)}</ol></section>;
}

export function DownloadBlock({ children, href = "/downloads", action = "เปิด Download Center" }: { children: ReactNode; href?: string; action?: string }) {
  return <aside className="ll-download-block"><span aria-hidden="true">↓</span><div><strong>แบบฟอร์มพร้อมใช้</strong><p>{children}</p></div><ButtonLink href={href} variant="outline" size="small">{action}</ButtonLink></aside>;
}

export function ReferenceList({ sources }: { sources: ArticleSource[] }) {
  const tone = (kind: ArticleSource["kind"]) => kind === "แนวทางทางการ" ? "blue" : kind === "หลักฐานสังเคราะห์" ? "teal" : "violet";
  return <section id="references" className="article-references"><span className="section-kicker left">REFERENCES</span><h2>แหล่งอ้างอิงและอ่านต่อ</h2><ol>{sources.map((source) => <li key={source.url}><div><Badge tone={tone(source.kind)}>{source.kind}</Badge><strong>{source.title}</strong><small>{source.organization}</small></div><a href={source.url} target="_blank" rel="noreferrer">เปิดแหล่งต้นฉบับ ↗</a></li>)}</ol></section>;
}
