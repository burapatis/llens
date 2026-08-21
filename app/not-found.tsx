import { SiteFooter, SubHeader } from "./_components/SiteChrome";

export default function NotFound() {
  return <>
    <SubHeader />
    <main className="not-found" id="main-content">
      <span className="not-found-code">404</span>
      <p className="section-kicker">ไม่พบหน้าที่ต้องการ</p>
      <h1>ลิงก์นี้อาจถูกย้าย<br/>แต่การเรียนรู้ไปต่อได้</h1>
      <p>ลองค้นหาหัวข้อที่ต้องการ หรือกลับไปยังส่วนสำคัญของเว็บไซต์</p>
      <nav aria-label="ทางเลือกเมื่อไม่พบหน้า">
        <a className="primary-button" href="/">กลับหน้าแรก <span aria-hidden="true">→</span></a>
        <a className="outline-button" href="/knowledge">เปิดคลังความรู้</a>
        <a className="outline-button" href="/toolkit">สำรวจเครื่องมือ</a>
      </nav>
    </main>
    <SiteFooter />
  </>;
}
