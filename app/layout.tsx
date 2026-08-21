import type { Metadata } from "next";
import "./globals.css";
import "./pages.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://learnerlens-th.burapatis.chatgpt.site"),
  title: "LearnerLens — เข้าใจผู้เรียนทุกคน",
  description: "แพลตฟอร์มความรู้และเครื่องมือสำหรับครู เพื่อเข้าใจความแตกต่างและออกแบบการเรียนรู้ที่เด็กทุกคนเติบโตได้",
  keywords: ["เข้าใจผู้เรียน", "UDL", "Differentiated Instruction", "Inclusive Education", "จิตวิทยาการเรียนรู้", "เครื่องมือสำหรับครู"],
  alternates: { canonical: "/" },
  authors: [{ name: "Boorapatis Ploysuwan" }],
  creator: "Boorapatis Ploysuwan",
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "LearnerLens — เข้าใจผู้เรียนทุกคน",
    description: "Understand Every Learner — ความรู้ เครื่องมือ และ AI Coach สำหรับครู",
    images: ["/og.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LearnerLens — เข้าใจผู้เรียนทุกคน",
    description: "Understand Every Learner — ความรู้ เครื่องมือ และ AI Coach สำหรับครู",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { "@context":"https://schema.org", "@type":"WebSite", name:"LearnerLens", alternateName:"เข้าใจผู้เรียน", url:"https://learnerlens-th.burapatis.chatgpt.site", description:"แพลตฟอร์มความรู้และเครื่องมือสำหรับครู เพื่อเข้าใจความแตกต่างของผู้เรียน", inLanguage:"th", author:{"@type":"Person",name:"Boorapatis Ploysuwan",jobTitle:"ผู้วิจัยอิสระ",email:"burapatis@gmail.com"}, potentialAction:{"@type":"SearchAction",target:"https://learnerlens-th.burapatis.chatgpt.site/?q={search_term_string}","query-input":"required name=search_term_string"} };
  return <html lang="th"><body><a className="skip-link" href="#main-content">ข้ามไปยังเนื้อหาหลัก</a>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/></body></html>;
}
