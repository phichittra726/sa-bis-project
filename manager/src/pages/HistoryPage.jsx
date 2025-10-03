import React, { useEffect } from "react";
import "../styles/history.css";
import logo from "../assets/logo.png";
import profileImg from "../assets/profile.jpg";
import Sidebar from "../components/Sidebar";

export default function HistoryPage() {
  useEffect(() => {
    // ทำให้ลิงก์ของหน้าปัจจุบัน active
    document.querySelectorAll(".menu-item").forEach(link => {
      if (
        window.location.pathname.includes(link.getAttribute("href")) &&
        !link.classList.contains("logout")
      ) {
        link.classList.add("active");
      }
    });
  }, []);

  return (
    <div>
      {/* Header */}
      <header>
        <div className="brand">
          <img src={logo} alt="logo CDG" className="img-fluid me-3" />
          <div>
            <h1>ระบบบันทึกเวลา และการเข้าทำงาน</h1>
            <span>CDG Group</span>
          </div>
        </div>
        <div className="profile">
          <div className="profile-info">
            <strong>นางสาวแพรไหม มั่งมี</strong>
            <span>ผู้จัดการ</span>
          </div>
          <img src={profileImg} alt="profile" />
        </div>
      </header>

      <main>
        <Sidebar />

        <div className="container">
          <h1 className="page-title">ประวัติการเข้า – ออกงาน</h1>

          {/* Summary Boxes */}
          <div className="summary-boxes">
            <div className="box">
              <span className="number">0</span>
              <span className="label">วันทำงาน/เดือน</span>
            </div>
            <div className="box yellow">
              <span className="number">0</span>
              <span className="label">สาย</span>
            </div>
            <div className="box red">
              <span className="number">0</span>
              <span className="label">ขาด</span>
            </div>
            <div className="box gray">
              <span className="number">0</span>
              <span className="label">ลา</span>
            </div>
            <div className="box dark">
              <span className="number">0</span>
              <span className="label">ชั่วโมงทั้งหมด/เดือน</span>
            </div>
          </div>

          {/* Table */}
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>วันที่</th>
                  <th>สถานที่ทำงาน</th>
                  <th>เข้า</th>
                  <th>ออก</th>
                  <th>รวม(ชม.)</th>
                  <th>หมายเหตุ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "20px", color: "#777" }}>
                    ไม่มีข้อมูลประวัติการเข้า – ออกงาน
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
