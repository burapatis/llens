"use client";

export default function PrintButton() {
  return <button className="whole-print-button" type="button" onClick={() => window.print()}><span aria-hidden="true">▣</span> พิมพ์ / บันทึกเป็น PDF</button>;
}
