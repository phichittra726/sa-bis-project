import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/timerequest.css";
import logo from "../assets/logo.png";
import profileImg from "../assets/profile.jpg";

export default function TimeRequestPage() {
    const [form, setForm] = useState({
        date: "",
        type: "",
        timeOld: "",
        timeNew: "",
        reason: "",
    });

    const [requests, setRequests] = useState([
        {
            id: 1,
            title: "แก้ไขเวลามาสายงาน - 14 ธ.ค. 2024",
            timeOld: "เข้างานเดิม: 10:00",
            timeNew: "เวลาที่ต้องการแก้ไข: 09:00",
            reason: "รถติด เนื่องจากฝนตก",
            status: "รอการอนุมัติ",
        },
        {
            id: 2,
            title: "แก้ไขเวลาออกงาน - 12 ธ.ค. 2024",
            timeOld: "ออกงานเดิม: 17:00",
            timeNew: "เวลาที่ต้องการแก้ไข: 16:30",
            reason: "เหตุผล: ต้องไปรับลูกที่โรงเรียน",
            status: "อนุมัติแล้ว",
        },
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.date || !form.type) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }
        const newRequest = {
            id: Date.now(),
            title: `คำขอแก้ไขเวลา - ${form.date}`,
            timeOld: `เวลาเดิม: ${form.timeOld}`,
            timeNew: `เวลาใหม่: ${form.timeNew}`,
            reason: form.reason,
            status: "รอการอนุมัติ",
        };
        setRequests([newRequest, ...requests]);
        setForm({ date: "", type: "", timeOld: "", timeNew: "", reason: "" });
    };

    return (
        <div>
            {/* Header */}
            <header>
                <div className="brand">
                    <img src={logo} alt="logo" />
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
                    <h2 className="page-title">คำขอแก้ไขเวลา</h2>

                    {/* Form */}
                    <div className="card">
                        <h3 className="card-title">ส่งคำขอใหม่</h3>
                        <form onSubmit={handleSubmit} className="request-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>วันที่</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={form.date}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>ประเภทคำขอ</label>
                                    <select
                                        name="type"
                                        value={form.type}
                                        onChange={handleChange}
                                    >
                                        <option value="">เลือกประเภท</option>
                                        <option value="checkin">แก้ไขเวลาเข้างาน</option>
                                        <option value="checkout">แก้ไขเวลาออกงาน</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>เวลาเดิม</label>
                                    <input
                                        type="time"
                                        name="timeOld"
                                        value={form.timeOld}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>เวลาที่ต้องการแก้ไข</label>
                                    <input
                                        type="time"
                                        name="timeNew"
                                        value={form.timeNew}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>เหตุผล</label>
                                <textarea
                                    name="reason"
                                    value={form.reason}
                                    onChange={handleChange}
                                    placeholder="กรุณาระบุเหตุผลในการแก้ไขเวลา"
                                ></textarea>
                            </div>

                            <button type="submit" className="btn-submit">
                                ส่งคำขอ
                            </button>
                        </form>
                    </div>

                    {/* History */}
                    <div className="card">
                        <h3 className="card-title">ประวัติคำขอ</h3>
                        <div className="request-history">
                            {requests.map((req) => (
                                <div key={req.id} className="request-item">
                                    <div className="request-info">
                                        <strong>{req.title}</strong>
                                        <p>{req.timeOld}</p>
                                        <p>{req.timeNew}</p>
                                        <p>{req.reason}</p>
                                    </div>
                                    <span
                                        className={`status-badge ${req.status === "อนุมัติแล้ว" ? "approved" : "pending"
                                            }`}
                                    >
                                        {req.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
