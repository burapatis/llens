import type { Metadata } from "next";
import "./globals.css";
import "./pages.css";
import { siteUrl } from "./_data/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "เรียนรู้ผู้เรียน | LearnerLens — เข้าใจผู้เรียนทุกคน",
  description: "แพลตฟอร์มความรู้และเครื่องมือสำหรับครู เพื่อเข้าใจความแตกต่างและออกแบบการเรียนรู้ที่เด็กทุกคนเติบโตได้",
  keywords: ["เข้าใจผู้เรียน", "UDL", "Differentiated Instruction", "Inclusive Education", "จิตวิทยาการเรียนรู้", "เครื่องมือสำหรับครู"],
  alternates: { canonical: "/" },
  authors: [{ name: "Boorapatis Ploysuwan" }],
  creator: "Boorapatis Ploysuwan",
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "เรียนรู้ผู้เรียน | LearnerLens — เข้าใจผู้เรียนทุกคน",
    description: "Understand Every Learner — ความรู้ เครื่องมือ และ AI Coach สำหรับครู",
    images: ["/og.png"],
    type: "website",
    url: "/",
    siteName: "เรียนรู้ผู้เรียน | LearnerLens",
    locale: "th_TH",
  },
  twitter: {
    card: "summary_large_image",
    title: "เรียนรู้ผู้เรียน | LearnerLens — เข้าใจผู้เรียนทุกคน",
    description: "Understand Every Learner — ความรู้ เครื่องมือ และ AI Coach สำหรับครู",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { "@context":"https://schema.org", "@type":"WebSite", name:"เรียนรู้ผู้เรียน | LearnerLens", alternateName:["LearnerLens","เข้าใจผู้เรียน"], url:siteUrl, description:"แพลตฟอร์มความรู้และเครื่องมือสำหรับครู เพื่อเข้าใจความแตกต่างของผู้เรียน", inLanguage:"th", author:{"@type":"Person",name:"Boorapatis Ploysuwan",jobTitle:"ผู้วิจัยอิสระ",email:"burapatis@gmail.com",image:`${siteUrl}/images/boorapatis-ploysuwan.jpg`}, potentialAction:{"@type":"SearchAction",target:`${siteUrl}/?q={search_term_string}`,"query-input":"required name=search_term_string"} };
  return <html lang="th"><body><a className="skip-link" href="#main-content">ข้ามไปยังเนื้อหาหลัก</a>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/></body></html>;
}
