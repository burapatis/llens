"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

export function ArticleActions() {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function printArticle() {
    document.body.classList.add("print-knowledge-article");
    window.print();
    window.setTimeout(() => document.body.classList.remove("print-knowledge-article"), 300);
  }

  return (
    <div className="article-actions no-print" aria-label="เครื่องมือบทความ">
      <Button type="button" onClick={printArticle}>พิมพ์ / บันทึก PDF</Button>
      <Button type="button" variant="outline" onClick={copyLink}>{copied ? "คัดลอกลิงก์แล้ว" : "คัดลอกลิงก์"}</Button>
    </div>
  );
}
