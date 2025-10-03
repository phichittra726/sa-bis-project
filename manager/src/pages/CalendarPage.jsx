import React, { useState, useEffect } from "react";
import "../styles/calendar.css";
import logo from "../assets/logo.png";
import profileImg from "../assets/profile.jpg";
import Sidebar from "../components/Sidebar";

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [monthYear, setMonthYear] = useState("");

    // ✨ STEP 1: เพิ่ม State สำหรับวันที่ถูกเลือก และ State สำหรับ Events
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([
        { date: 5, title: "ประชุมทีม", type: "yellow" },
        { date: 8, title: "ส่งงาน", type: "green" },
        { date: 12, title: "ลางาน", type: "red" },
        { date: 15, title: "อบรม", type: "blue" },
        { date: 15, title: "คุยกับลูกค้า", type: "yellow" },
        { date: 21, title: "อัพเดทโปรเจค", type: "green" },
    ]);

    const [formData, setFormData] = useState({
        title: "", date: "", startTime: "", endTime: "",
        assignee: "", type: "", detail: ""
    });

    useEffect(() => {
        const options = { year: 'numeric', month: 'long' };
        setMonthYear(currentDate.toLocaleDateString("th-TH", options));
    }, [currentDate]);

    // 🔄 STEP 5: อัปเดตฟอร์มเมื่อมีการเลือกวัน
    useEffect(() => {
        if (selectedDate) {
            // Format date to "YYYY-MM-DD" for the input field
            const formattedDate = selectedDate.toISOString().split('T')[0];
            setFormData(prev => ({ ...prev, date: formattedDate }));
        }
    }, [selectedDate]);


    const handlePrev = () => {
        setSelectedDate(null); // Reset selection when changing month
        setCurrentDate(prev => new Date(new Date(prev).setMonth(prev.getMonth() - 1)));
    };

    const handleNext = () => {
        setSelectedDate(null); // Reset selection when changing month
        setCurrentDate(prev => new Date(new Date(prev).setMonth(prev.getMonth() + 1)));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.date || !formData.title || !formData.type) {
            alert("กรุณากรอกข้อมูล ชื่องาน, วันที่ และประเภทงาน");
            return;
        }

        const newEvent = {
            date: new Date(formData.date).getDate(), // Get day number from date string
            title: formData.title,
            type: formData.type, // Get color type from form
        };

        setEvents(prevEvents => [...prevEvents, newEvent]);
        alert("เพิ่มงานใหม่ลงในปฏิทินเรียบร้อย!");

        // Reset form and selection
        setFormData({ title: "", date: "", startTime: "", endTime: "", assignee: "", type: "", detail: "" });
        setSelectedDate(null);
    };

    // ✨ STEP 2: สร้างฟังก์ชันสำหรับจัดการการคลิก
    const handleDayClick = (dayNumber) => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);
        setSelectedDate(date);
    };

    // ✨ STEP 3: แก้ไขการสร้างปฏิทินให้คลิกได้และมีไฮไลท์
    const generateDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const today = new Date();

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month +0, 0).getDate();

        let days = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="day empty"></div>);
        }

        for (let d = 0; d <= daysInMonth; d++) {
            const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

            const isSelected = selectedDate &&
                d === selectedDate.getDate() &&
                month === selectedDate.getMonth() &&
                year === selectedDate.getFullYear();

            // กำหนด CSS class ตามเงื่อนไข
            const dayClass = `day ${isToday ? "today" : ""} ${isSelected ? "selected" : ""}`;

            // ค้นหา Events ของวันนี้จาก State
            const eventsForDay = events.filter(event => event.date === d);

            days.push(
                <div key={d} className={dayClass} onClick={() => handleDayClick(d)}>
                    <span>{d}</span>
                    {eventsForDay.map((event, index) => (
                        <div key={index} className={`event ${event.type}`}>{event.title}</div>
                    ))}
                </div>
            );
        }
        return days;
    };

    return (
        <div className="calendar-page">
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
            
                <main className="dashboard">
                <div className="main-content-area">
                    <section className="calendar-section">
                        <h1 className="main-title">ปฏิทินงาน</h1>
                        <div className="calendar-header">
                            <h2>{monthYear}</h2>
                            <div className="calendar-nav">
                                <button className="nav-btn" onClick={handlePrev}>&larr;</button>
                                <button className="nav-btn" onClick={handleNext}>&rarr;</button>
                            </div>
                        </div>
                        <div className="calendar-box">
                            <div className="calendar-weekdays">
                                <div>อา</div><div>จ</div><div>อ</div><div>พ</div><div>พฤ</div><div>ศ</div><div>ส</div>
                            </div>
                            <div className="calendar-grid">
                                {generateDays()}
                            </div>
                        </div>
                    </section>
                    <section className="form-section">
                        <form className="add-task-form" onSubmit={handleSubmit}>
                            <h2>เพิ่มงานใหม่</h2>
                            <label>ชื่องาน</label>
                            <input type="text" name="title" placeholder="ระบุชื่องาน...." value={formData.title} onChange={handleChange} />

                            <label>วันที่</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} />

                            <label>เวลา</label>
                            <div className="time-inputs">
                                <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} />
                                <span>ถึง</span>
                                <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} />
                            </div>

                            <label>มอบหมายให้</label>
                            <select name="assignee" value={formData.assignee} onChange={handleChange}>
                                <option value="">-- เลือกพนักงาน --</option>
                                <option value="นางสาว ชญานิษฐ์ เกษมสุข">นางสาว ชญานิษฐ์ เกษมสุข</option>
                                <option value="นางสาว พิชิตตรา คุณน้อย">นางสาว พิชิตตรา คุณน้อย</option>
                                <option value="นาย ธนพล ศรีประเสริฐ">นาย ธนพล ศรีประเสริฐ</option>

                            </select>

                            <label>ประเภทงาน</label>
                            <select name="type" value={formData.type} onChange={handleChange}>
                                <option value="">-- เลือกประเภท --</option>
                                <option value="yellow">ประชุม/นัดหมาย</option>
                                <option value="red">งานเร่งด่วน/Deadline</option>
                                <option value="green">โปรเจค/งานพัฒนา</option>
                                <option value="blue">งานส่วนตัว</option>
                            </select>

                            <label>รายละเอียด</label>
                            <textarea name="detail" placeholder="รายละเอียดงาน...." value={formData.detail} onChange={handleChange} />

                            <button type="submit" className="submit-btn">เพิ่มงาน</button>
                        </form>
                    </section>
                </div>
                </main>
            </main>
        </div>
    );
}