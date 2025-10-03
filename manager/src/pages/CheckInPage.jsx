import React, { useState, useEffect } from "react";
import "../styles/checkin.css";
import logo from "../assets/logo.png";
import profileImg from "../assets/profile.jpg";
import Sidebar from "../components/Sidebar";

export default function CheckInPage() {
    const [currentTime, setCurrentTime] = useState("--:--:--");
    const [currentDate, setCurrentDate] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("office");
    const [isWorking, setIsWorking] = useState(false);
    const [checkInTime, setCheckInTime] = useState(null);
    const [message, setMessage] = useState("");

    // อัปเดตเวลา
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(
                now.toLocaleTimeString("th-TH", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                })
            );
            setCurrentDate(
                now.toLocaleDateString("th-TH", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })
            );
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    // ฟังก์ชันเข้างาน
    const handleCheckIn = () => {
        if (!isWorking) {
            const now = new Date().toLocaleTimeString("th-TH", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });
            setCheckInTime(now);
            setIsWorking(true);
            setMessage(`บันทึกเข้างานสำเร็จ เวลา ${now}`);
        }
    };

    return (
        <div>
            {/* Header */}
            <header>
                <div className="brand">
                    <img src={logo} alt="logo CDG" />
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

                <div className="main-content">
                    <div className="content-wrapper">
                        <h2 className="page-title">บันทึกเข้างาน</h2>


                        {/* Time card */}
                        <div className="time-card">
                            <div className="current-time">{currentTime}</div>
                            <div className="current-date">{currentDate}</div>
                        </div>

                        {/* Location selection */}
                        <div className="location-section">
                            <div className="section-title">เลือกสถานที่ทำงาน</div>
                            <div className="location-options">
                                <div
                                    className={`location-btn ${selectedLocation === "office" ? "selected" : ""}`}
                                    onClick={() => setSelectedLocation("office")}
                                >
                                    <div className="location-title">ทำงานที่บริษัท</div>
                                    <div className="location-subtitle">Office Work</div>
                                </div>
                                <div
                                    className={`location-btn ${selectedLocation === "home" ? "selected" : ""}`}
                                    onClick={() => setSelectedLocation("home")}
                                >
                                    <div className="location-title">ทำงานที่บ้าน</div>
                                    <div className="location-subtitle">Work from home</div>
                                </div>
                            </div>
                        </div>

                        {/* ปุ่มเข้างาน */}
                        <div className="attendance-buttons">
                            <button
                                className="btn check-in"
                                onClick={handleCheckIn}
                                disabled={isWorking}
                            >
                                เข้างาน
                            </button>
                        </div>

                        {/* ข้อความแจ้งเตือน */}
                        {message && <p className="status-message-text">{message}</p>}
                    </div>
                </div>
            </main>
        </div>
    );
}
