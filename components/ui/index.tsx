import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

type Tone = "blue" | "teal" | "violet" | "neutral" | "warning" | "danger";

export function Button({ variant = "primary", size = "medium", className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline" | "text"; size?: "small" | "medium" | "large" }) {
  return <button className={`ll-button ll-button-${variant} ll-button-${size} ${className}`.trim()} {...props} />;
}

export function ButtonLink({ href, children, variant = "primary", size = "medium", className = "", download, target }: { href: string; children: ReactNode; variant?: "primary" | "outline" | "text"; size?: "small" | "medium" | "large"; className?: string; download?: boolean; target?: string }) {
  return <a className={`ll-button ll-button-${variant} ll-button-${size} ${className}`.trim()} href={href} download={download} target={target}>{children}</a>;
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: Tone }) {
  return <span className={`ll-badge ll-badge-${tone}`}>{children}</span>;
}

export function Card({ children, className = "", interactive = false, ...props }: HTMLAttributes<HTMLElement> & { children: ReactNode; interactive?: boolean }) {
  return <article className={`ll-card ${interactive ? "ll-card-interactive" : ""} ${className}`.trim()} {...props}>{children}</article>;
}

export function Progress({ value, label, showValue = true, tone = "blue" }: { value: number; label: string; showValue?: boolean; tone?: "blue" | "teal" | "violet" }) {
  const normalized = Math.max(0, Math.min(100, Math.round(value)));
  return <div className="ll-progress"><div><span>{label}</span>{showValue && <strong>{normalized}%</strong>}</div><div className="ll-progress-track" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={normalized}><i className={`ll-progress-${tone}`} style={{ width: `${normalized}%` }} /></div></div>;
}

export function Checklist({ items, compact = false }: { items: string[]; compact?: boolean }) {
  return <ul className={`ll-checklist ${compact ? "ll-checklist-compact" : ""}`}>{items.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>;
}

export function SearchResult({ href, icon, category, title, description, onSelect }: { href: string; icon: string; category: string; title: string; description: string; onSelect?: () => void }) {
  return <a className="ll-search-result" href={href} onClick={onSelect}><span className="ll-search-icon" aria-hidden="true">{icon}</span><span><small>{category}</small><strong>{title}</strong><em>{description}</em></span><b aria-hidden="true">→</b></a>;
}

export function LearnerSnapshot({ name = "ผู้เรียน A", level = "ประถมปลาย", progress = 72, strengths = ["สนใจธรรมชาติ", "อธิบายด้วยภาพ"], support = "เริ่มงานได้ดีขึ้นเมื่อเห็นก้าวแรก" }: { name?: string; level?: string; progress?: number; strengths?: string[]; support?: string }) {
  return <section className="ll-learner-snapshot" aria-label={`ภาพรวมของ ${name}`}><header><span aria-hidden="true">ผร</span><div><strong>{name}</strong><small>{level} · ใช้รหัสแทนชื่อจริง</small></div><Badge tone="teal">กำลังเติบโต</Badge></header><Progress value={progress} label="หลักฐานที่รวบรวมแล้ว" /><div className="ll-snapshot-strengths">{strengths.map((strength) => <span key={strength}>✦ {strength}</span>)}</div><aside><strong>สิ่งที่อาจช่วย</strong><p>{support}</p></aside></section>;
}

export function ResourceRow({ icon, title, meta, href, action = "เปิดทรัพยากร", badge }: { icon: string; title: string; meta: string; href: string; action?: string; badge?: string }) {
  return <a className="ll-resource-row" href={href}><span aria-hidden="true">{icon}</span><div>{badge && <Badge tone="blue">{badge}</Badge>}<strong>{title}</strong><small>{meta}</small></div><b>{action} →</b></a>;
}
