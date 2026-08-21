/* Static anchors intentionally keep the GitHub Pages export dependency-free. */
/* eslint-disable @next/next/no-html-link-for-pages */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SubHeader, SiteFooter } from "../../_components/SiteChrome";
import { getKnowledgeArticle, knowledgeArticles } from "../../_data/articles";
import { siteUrl } from "../../_data/site";
import { ArticleActions } from "../ArticleActions";

export function generateStaticParams() {
  return knowledgeArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getKnowledgeArticle(slug);
  if (!article) return {};
  const url = `/articles/${article.slug}`;
  return {
    title: `${article.title} | LearnerLens`,
    description: article.description,
    alternates: { canonical: url },
    openGraph: { title: `${article.title} | LearnerLens`, description: article.description, url, type: "article", images: [] },
    twitter: { title: `${article.title} | LearnerLens`, description: article.description, images: [] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getKnowledgeArticle(slug);
  if (!article) notFound();

  const articleIndex = knowledgeArticles.findIndex((entry) => entry.slug === article.slug);
  const previous = knowledgeArticles.at(articleIndex - 1);
  const next = knowledgeArticles.at(articleIndex + 1);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    inLanguage: "th",
    url: `${siteUrl}/articles/${article.slug}`,
    dateModified: "2026-08-21",
    author: { "@type": "Person", name: "Boorapatis Ploysuwan", jobTitle: "ผู้วิจัยอิสระ" },
    publisher: { "@type": "Organization", name: "เรียนรู้ผู้เรียน | LearnerLens" },
  };

  return (
    <>
      <SubHeader />
      <main className="knowledge-article-page" id="main-content">
        <article id="knowledge-article">
          <header className="knowledge-article-hero">
            <div className="article-breadcrumb"><a href="/articles">บทความ</a><span aria-hidden="true">/</span><span>{article.englishTitle}</span></div>
            <span className="section-kicker left">EVIDENCE-INFORMED ARTICLE</span>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <div className="knowledge-article-meta"><span>อ่านประมาณ {article.readingMinutes} นาที</span><span>ทบทวนล่าสุด 21 สิงหาคม 2026</span><span>สถานะ: ทบทวนเบื้องต้น</span></div>
            <ArticleActions />
          </header>

          <div className="knowledge-article-layout">
            <aside className="article-toc no-print" aria-label="สารบัญบทความ">
              <strong>ในบทความนี้</strong>
              <a href="#outcomes">ผลลัพธ์การเรียนรู้</a>
              <a href="#key-ideas">แนวคิดสำคัญ</a>
              <a href="#signals">สัญญาณที่ควรสังเกต</a>
              <a href="#example">ตัวอย่างในห้องเรียน</a>
              <a href="#do-avoid">สิ่งที่ควรทำ / หลีกเลี่ยง</a>
              <a href="#checklist">Checklist</a>
              <a href="#reflection">Reflection Questions</a>
              <a href="#action-canvas">Action Canvas</a>
              <a href="#references">แหล่งอ้างอิง</a>
            </aside>

            <div className="knowledge-article-body">
              <aside className="evidence-caution"><strong>ขอบเขตหลักฐาน</strong><p>{article.evidenceNote}</p></aside>

              <section id="outcomes">
                <span className="section-kicker left">LEARNING OUTCOMES</span>
                <h2>เมื่ออ่านจบ ครูจะสามารถ</h2>
                <ul className="article-check-list">{article.outcomes.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>

              <section id="key-ideas">
                <span className="section-kicker left">KEY CONCEPTS</span>
                <h2>แนวคิดสำคัญ</h2>
                <div className="key-idea-grid">{article.keyIdeas.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
              </section>

              <section id="signals">
                <span className="section-kicker left">NOTICE BEFORE JUDGING</span>
                <h2>สัญญาณที่ควรสังเกต</h2>
                <p className="article-section-lead">ใช้เป็นจุดเริ่มเก็บข้อมูล ไม่ใช่เกณฑ์วินิจฉัยหรือติดป้ายผู้เรียน</p>
                <div className="signal-grid">{article.signals.map((signal) => <div key={signal}><span aria-hidden="true">↗</span><p>{signal}</p></div>)}</div>
              </section>

              <section id="example" className="classroom-example">
                <span className="section-kicker left">CLASSROOM EXAMPLE</span>
                <h2>ตัวอย่างในห้องเรียน</h2>
                <dl><div><dt>บริบท</dt><dd>{article.classroomExample.context}</dd></div><div><dt>สิ่งที่ครูลอง</dt><dd>{article.classroomExample.action}</dd></div><div><dt>หลักฐานที่ติดตาม</dt><dd>{article.classroomExample.evidence}</dd></div></dl>
              </section>

              <section id="do-avoid">
                <span className="section-kicker left">DO / AVOID</span>
                <h2>สิ่งที่ควรทำ และสิ่งที่ควรหลีกเลี่ยง</h2>
                <div className="do-avoid-grid"><article><h3>ควรทำ</h3><ul>{article.doItems.map((item) => <li key={item}>{item}</li>)}</ul></article><article><h3>ควรหลีกเลี่ยง</h3><ul>{article.avoidItems.map((item) => <li key={item}>{item}</li>)}</ul></article></div>
              </section>

              <section id="checklist" className="article-checklist-section">
                <span className="section-kicker left">CHECKLIST</span>
                <h2>เช็กก่อนนำไปใช้</h2>
                <ul>{article.checklist.map((item) => <li key={item}><span aria-hidden="true" />{item}</li>)}</ul>
              </section>

              <section id="reflection">
                <span className="section-kicker left">REFLECTION QUESTIONS</span>
                <h2>คำถามสะท้อนคิด</h2>
                <ol className="reflection-list">{article.reflections.map((item, index) => <li key={item}><span>{index + 1}</span><p>{item}</p></li>)}</ol>
              </section>

              <section id="action-canvas" className="action-canvas">
                <span className="section-kicker left">DOWNLOADABLE TEMPLATE</span>
                <h2>Action Canvas — ทดลองหนึ่งก้าว</h2>
                <p>พิมพ์หน้านี้หรือบันทึกเป็น PDF แล้วเขียนแผนสั้น ๆ ลงในช่องว่าง</p>
                <div><label>1. สิ่งที่จะสังเกต<small>{article.actionCanvas.notice}</small><span /></label><label>2. สิ่งที่จะลองในคาบถัดไป<small>{article.actionCanvas.tryNext}</small><span /></label><label>3. หลักฐานที่จะเก็บ<small>{article.actionCanvas.collect}</small><span /></label><label>4. วันและเกณฑ์ทบทวน<small>{article.actionCanvas.review}</small><span /></label></div>
                <a className="no-print" href="/follow-up">นำไปสร้างแผนติดตาม 2–4 สัปดาห์ →</a>
              </section>

              <section id="references" className="article-references">
                <span className="section-kicker left">REFERENCES</span>
                <h2>แหล่งอ้างอิงและอ่านต่อ</h2>
                <ol>{article.sources.map((source) => <li key={source.url}><div><span>{source.kind}</span><strong>{source.title}</strong><small>{source.organization}</small></div><a href={source.url} target="_blank" rel="noreferrer">เปิดแหล่งต้นฉบับ ↗</a></li>)}</ol>
              </section>

              <footer className="article-editorial-note">
                <div><strong>ข้อมูลการทบทวน</strong><p>เรียบเรียงและทบทวนเบื้องต้นโดย Boorapatis Ploysuwan ผู้วิจัยอิสระ · ทบทวนล่าสุด 21 สิงหาคม 2026 · กำหนดทบทวนอย่างน้อยทุก 12 เดือนหรือเมื่อแหล่งหลักเปลี่ยนแปลง</p></div>
                <a href="/editorial">นโยบายบรรณาธิการและแจ้งแก้ไข →</a>
              </footer>
            </div>
          </div>
        </article>

        <nav className="article-pager no-print" aria-label="บทความก่อนหน้าและถัดไป">
          {previous ? <a href={`/articles/${previous.slug}`}><small>บทก่อนหน้า</small><strong>← {previous.title}</strong></a> : <a href="/articles"><small>คลังบทความ</small><strong>← ดูทุกหัวข้อ</strong></a>}
          {next ? <a href={`/articles/${next.slug}`}><small>บทถัดไป</small><strong>{next.title} →</strong></a> : <a href="/toolkit"><small>ลงมือทำ</small><strong>เปิดเครื่องมือ →</strong></a>}
        </nav>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
