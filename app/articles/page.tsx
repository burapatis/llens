import type { Metadata } from "next";
import { SubPage } from "../_components/SiteChrome";
import { knowledgeArticles } from "../_data/articles";

export const metadata: Metadata = {
  title: "บทความฉบับเต็มสำหรับครู | LearnerLens",
  description: "บทความ 11 หัวข้อที่เชื่อมแนวคิด หลักฐาน สัญญาณในห้องเรียน ตัวอย่าง Checklist และแผนทดลองสำหรับครู",
  alternates: { canonical: "/articles" },
  openGraph: { title: "บทความฉบับเต็มสำหรับครู | LearnerLens", description: "องค์ความรู้เพื่อเข้าใจผู้เรียนและลงมือใช้ในห้องเรียน", url: "/articles", images: [] },
  twitter: { title: "บทความฉบับเต็มสำหรับครู | LearnerLens", description: "องค์ความรู้เพื่อเข้าใจผู้เรียนและลงมือใช้ในห้องเรียน", images: [] },
};

export default function ArticlesPage() {
  return (
    <SubPage
      eyebrow="EVIDENCE-INFORMED KNOWLEDGE"
      title="บทความที่อ่านแล้วนำไปใช้ได้"
      description="แต่ละบทใช้โครงสร้างเดียวกัน ตั้งแต่ผลลัพธ์การเรียนรู้ สัญญาณที่ควรสังเกต ตัวอย่างในห้องเรียน ไปจนถึงแผนทดลองและแหล่งอ้างอิง"
    >
      <section className="subpage-section article-library-intro">
        <div>
          <span className="section-kicker left">มาตรฐานบทความ LearnerLens</span>
          <h2>อ่านเพื่อเข้าใจ แล้วจบด้วยก้าวที่ทดลองได้</h2>
          <p>เราแยกกรอบแนวคิด แนวทางทางการ และหลักฐานสังเคราะห์ให้เห็นชัด พร้อมระบุข้อควรระวังเพื่อไม่ให้ทฤษฎีกลายเป็นฉลากของผู้เรียน</p>
        </div>
        <aside>
          <strong>11 หัวข้อ</strong>
          <span>อ่าน 7–10 นาทีต่อบท</span>
          <a href="/editorial">ดูนโยบายบรรณาธิการ →</a>
        </aside>
      </section>

      <section className="subpage-section article-card-grid" aria-label="บทความทั้งหมด">
        {knowledgeArticles.map((article, index) => (
          <article key={article.slug}>
            <div className="article-card-meta"><span>{String(index + 1).padStart(2, "0")}</span><small>{article.readingMinutes} นาที</small></div>
            <p>{article.englishTitle}</p>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <div className="article-card-tags"><span>ตัวอย่าง</span><span>Checklist</span><span>Action Canvas</span></div>
            <a href={`/articles/${article.slug}`} aria-label={`อ่านบทความ ${article.title}`}>อ่านบทความฉบับเต็ม <span aria-hidden="true">→</span></a>
          </article>
        ))}
      </section>

      <section className="article-library-footer">
        <div><span className="section-kicker left">ต้องการฉบับย่อ?</span><h2>เปิดคลังความรู้แบบสแกนเร็ว</h2><p>อ่านสาระสำคัญ ตัวอย่าง Checklist และคำถามสะท้อนคิดของทุกหัวข้อในหน้าเดียว</p></div>
        <a className="outline-button" href="/knowledge">เปิดคลังความรู้ฉบับย่อ</a>
      </section>
    </SubPage>
  );
}
