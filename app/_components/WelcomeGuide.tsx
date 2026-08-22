"use client";

/* The supplied guide image keeps its exact authored proportions. */
/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "learnerlens-welcome-guide-v1";

export function WelcomeGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const markSeen = useCallback(() => {
    try { localStorage.setItem(STORAGE_KEY, "seen"); } catch { /* Browser may block local storage. */ }
  }, []);

  const closeGuide = useCallback(() => {
    markSeen();
    setIsOpen(false);
    queueMicrotask(() => previousFocusRef.current?.focus());
  }, [markSeen]);

  const openGuide = () => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        timer = setTimeout(() => {
          previousFocusRef.current = document.activeElement as HTMLElement | null;
          setIsOpen(true);
        }, 850);
      }
    } catch {
      timer = setTimeout(() => setIsOpen(true), 850);
    }
    return () => { if (timer) clearTimeout(timer); };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeGuide();
        return;
      }
      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href]');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeGuide, isOpen]);

  return <>
    {!isOpen && <button className="welcome-guide-trigger" type="button" onClick={openGuide}><span aria-hidden="true">?</span> ดูภาพแนะนำเว็บไซต์</button>}
    {isOpen && <div className="welcome-guide-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) closeGuide(); }}>
      <section ref={dialogRef} className="welcome-guide-dialog" role="dialog" aria-modal="true" aria-labelledby="welcome-guide-title" aria-describedby="welcome-guide-description">
        <button ref={closeButtonRef} className="welcome-guide-close" type="button" onClick={closeGuide} aria-label="ปิดภาพแนะนำเว็บไซต์">×</button>
        <div className="welcome-guide-image-wrap">
          <img src="/images/learnerlens-welcome.jpg" width="900" height="1423" alt="ภาพแนะนำเว็บไซต์เรียนรู้ผู้เรียน LearnerLens อธิบายวงจร 5 ก้าว ตั้งคำถาม สังเกตและฟัง เลือกหนึ่งก้าว ทดลอง และทบทวน" />
        </div>
        <div className="welcome-guide-actions">
          <div><span className="section-kicker left">WELCOME TO LEARNERLENS</span><h2 id="welcome-guide-title">เริ่มจากการรู้จักผู้เรียน</h2><p id="welcome-guide-description">ใช้วงจรสั้น ๆ จากคำถามจริงในห้องเรียน แล้วค่อยสังเกต ทดลอง และทบทวนผลอย่างต่อเนื่อง</p><small>ภาพนี้จะแสดงอัตโนมัติเพียงครั้งแรกบนอุปกรณ์นี้</small></div>
          <div><a className="primary-button" href="/start" onClick={markSeen}>เริ่มต้นใช้งาน <span aria-hidden="true">→</span></a><a className="welcome-guide-full" href="/images/learnerlens-welcome.jpg" target="_blank" rel="noreferrer">เปิดภาพขนาดเต็ม ↗</a></div>
        </div>
      </section>
    </div>}
  </>;
}
