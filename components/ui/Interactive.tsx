"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Button, Badge } from "./index";

export function Range({ label, value, min = 1, max = 5, onChange }: { label: string; value: number; min?: number; max?: number; onChange: (value: number) => void }) {
  const id = useId();
  return <label className="ll-range" htmlFor={id} aria-label={label}><span><strong>{label}</strong><output htmlFor={id}>{value}/{max}</output></span><input id={id} type="range" min={min} max={max} step={1} value={value} onChange={(event) => onChange(Number(event.target.value))} /><small><span>ยังไม่เริ่ม</span><span>ทำได้สม่ำเสมอ</span></small></label>;
}

export function Modal({ title, triggerLabel, children }: { title: string; triggerLabel: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);
  return <><Button type="button" variant="outline" onClick={() => setOpen(true)}>{triggerLabel}</Button>{open && <div className="ll-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setOpen(false); }}><section className="ll-modal" role="dialog" aria-modal="true" aria-labelledby="ll-modal-title"><header><div><Badge tone="violet">ตัวอย่าง Modal</Badge><h2 id="ll-modal-title">{title}</h2></div><button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="ปิดหน้าต่าง">×</button></header><div>{children}</div><footer><Button type="button" variant="text" onClick={() => setOpen(false)}>ยกเลิก</Button><Button type="button" onClick={() => setOpen(false)}>ยืนยัน</Button></footer></section></div>}</>;
}

export function CoachComposer() {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  function submit() {
    setMessage(text.trim() ? "พร้อมนำบริบทนี้ไปถามคำถามชี้แจงในขั้นถัดไป" : "โปรดเขียนสิ่งที่สังเกตได้ก่อน");
  }
  return <section className="ll-coach-composer"><header><span aria-hidden="true">✦</span><div><strong>AI Coach Composer</strong><small>เริ่มจากหลักฐาน ไม่เริ่มจากฉลาก</small></div><Badge tone="violet">LOCAL DEMO</Badge></header><label>สิ่งที่สังเกตได้<textarea value={text} onChange={(event) => setText(event.target.value)} placeholder="เช่น ผู้เรียนเริ่มงานได้เมื่อมีตัวอย่าง แต่หยุดเมื่อโจทย์เปลี่ยน..." /></label><div><small>ไม่ใส่ชื่อจริงหรือข้อมูลที่ระบุตัวเด็กได้</small><Button type="button" size="small" onClick={submit}>ตรวจบริบท →</Button></div><p role="status">{message}</p></section>;
}
