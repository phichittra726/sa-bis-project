import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  const location = useLocation();

  // ฟังก์ชันเช็ค path ปัจจุบัน
  const isActive = (path) => {
    return location.pathname.includes(path) ? "active" : "";
  };

  return (
    <aside className="sidebar">
      <Link to="/home" className={`menu-item ${isActive("home")}`}>
        <i className="fi fi-rr-home"></i> หน้าหลัก
      </Link>
      <Link to="/checkin" className={`menu-item ${isActive("checkin")}`}>
        <i className="fi fi-rr-clock-five"></i> บันทึกเข้างาน
      </Link>
      <Link to="/checkout" className={`menu-item ${isActive("checkout")}`}>
        <i className="fi fi-rr-clock"></i> บันทึกออกงาน
      </Link>
      <Link to="/calendar" className={`menu-item ${isActive("calendar")}`}>
        <i className="fi fi-rr-calendar"></i> ปฏิทินงาน
      </Link>
      <Link to="/approval" className={`menu-item ${isActive("approval")}`}>
        <i className="fi fi-rr-calendar"></i> อนุมัติคำขอ
      </Link>
      <Link to="/history" className={`menu-item ${isActive("history")}`}>
        <i className="fi fi-rr-search-alt"></i> ประวัติการเข้า – ออกงาน
      </Link>
      <Link to="/logout" className={`menu-item ${isActive("logout")}`}>
        <i className="fi fi-rr-sign-out-alt"></i> ออกจากระบบ
      </Link>
    </aside>
  );
}
