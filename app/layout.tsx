import type { Metadata } from "next";
import "./globals.css";
import "./pages.css";

export const metadata: Metadata = {
  title: "LearnerLens — เข้าใจผู้เรียนทุกคน",
  description: "แพลตฟอร์มความรู้และเครื่องมือสำหรับครู เพื่อเข้าใจความแตกต่างและออกแบบการเรียนรู้ที่เด็กทุกคนเติบโตได้",
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
  return <html lang="th"><body>{children}</body></html>;
}
