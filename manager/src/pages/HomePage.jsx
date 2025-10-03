import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import logo from "../assets/logo.png";
import profileImg from "../assets/profile.jpg";
import Sidebar from "../components/Sidebar";

export default function HomePage() {
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const clockEl = document.getElementById("clock");
      if (clockEl) {
        clockEl.textContent = now.toLocaleTimeString("th-TH", { hour12: false });
      }
    };
    const timer = setInterval(updateClock, 1000);
    updateClock();
    return () => clearInterval(timer);
  }, []);

  // ฟังก์ชันจำลองการอนุมัติ/ปฏิเสธ
  const handleApprove = (requestId) => {
    alert(`อนุมัติคำขอ #${requestId} เรียบร้อย!`);
    // TODO: เพิ่ม Logic การอนุมัติจริง เช่น อัปเดต State หรือส่งข้อมูลไป Backend
  };

  const handleReject = (requestId) => {
    alert(`ปฏิเสธคำขอ #${requestId}`);
    // TODO: เพิ่ม Logic การปฏิเสธจริง
  };


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
        {/* Sidebar Component */}
        <Sidebar />

        {/* Dashboard */}
        <main className="dashboard">
          <h1 className="welcome-text">ยินดีต้อนรับ นางสาวแพรไหม มั่งมี</h1>

          {/* top-section */}
          <section className="top-section">
            <div className="card big-clock center">
              <div className="time" id="clock">--:--:--</div>
              <div className="date">วันพฤหัสบดีที่ 2 ตุลาคม 2568</div>
            </div>
            <div className="card work-status">
              <p>สถานะการทำงาน</p>
              <h2 className="status-text">กำลังทำงาน</h2>
              <small>บริษัท</small>
              <div className="time-info">
                <p>เข้างาน : <span id="checkin-time">09:40:12</span></p>
                <p>ออกงาน : <span id="checkout-time">-</span></p>
              </div>
            </div>
          </section>

          {/* summary-section */}
          <section className="summary-section">
            <div className="card small"><p>พนักงานทั้งหมด</p><h3>156</h3></div>
            <div className="card small"><p>เข้างานแล้ววันนี้</p><h3>142</h3></div>
            <div className="card small"><p>ทำงานที่บ้าน</p><h3>28</h3></div>
            <div className="card small"><p>คำรออนุมัติ</p><h3>7</h3></div>
          </section>

          {/* bottom-section */}
          <section className="bottom-section">
            <div className="card task-list">
              <div className="card-header">
                <h3>งานวันนี้</h3>
                <Link to="/calendar" className="see-all">ดูทั้งหมด</Link>
              </div>
              <ul>
                <li className="task yellow">
                  <div className="task-info">
                    <p className="task-title">ประชุมทีม Marketing</p>
                    <small>09:00 - 10:30</small>
                  </div>
                  <span className="badge badge-yellow">ประชุม</span>
                </li>
                <li className="task red">
                  <div className="task-info">
                    <p className="task-title">ส่งรายงานขาย Q1</p>
                    <small>ภายใน 17:00</small>
                  </div>
                  <span className="badge badge-red">เร่งด่วน</span>
                </li>
                <li className="task green">
                  <div className="task-info">
                    <p className="task-title">คุยกับลูกค้า</p>
                    <small>14:00 - 16:00</small>
                  </div>
                  <span className="badge badge-green">โปรเจค</span>
                </li>
              </ul>
            </div>
            
            <div className="card pending-requests">
              <div className="card-header">
                <h3>คำขอรออนุมัติ</h3>
              </div>
              <div className="request-list">
                <div className="request-item teal">
                  <div className="request-info">
                    <h4>คำขอเปลี่ยนเวลาเข้า</h4>
                    <p>พิมพ์ชนก สุวรรณภูมิ | <span>เปลี่ยนเวลาเข้า</span></p>
                  </div>
                  <div className="request-actions">
                    <button className="btn-approve" onClick={() => handleApprove(1)}>อนุมัติ</button>
                    <button className="btn-reject" onClick={() => handleReject(1)}>ปฏิเสธ</button>
                  </div>
                </div>
                <div className="request-item orange">
                  <div className="request-info">
                    <h4>คำขอเปลี่ยนเวลาออก</h4>
                    <p>นายกฤษณะ ศิริพร | <span>เปลี่ยนเวลาออก</span></p>
                  </div>
                  <div className="request-actions">
                    <button className="btn-approve" onClick={() => handleApprove(2)}>อนุมัติ</button>
                    <button className="btn-reject" onClick={() => handleReject(2)}>ปฏิเสธ</button>
                  </div>
                </div>
              </div>
              <Link to="/approval" className="view-all-btn">ดูทั้งหมด</Link>
            </div>
          </section>
        </main>
      </main>
    </div>
  );
}