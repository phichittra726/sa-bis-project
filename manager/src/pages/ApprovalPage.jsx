import React, { useState } from "react";
import "../styles/approvalpage.css"; // ตรวจสอบให้แน่ใจว่าไฟล์นี้ถูกเรียกใช้
import logo from "../assets/logo.png";
import profileImg from "../assets/profile.jpg";
import Sidebar from "../components/Sidebar";

// --- Mock Data for requests ---
const initialRequests = [
    {
        id: 1,
        name: "พิมพ์ชนก สุวรรณภูมิ",
        role: "Programmer",
        avatar: "https://i.pinimg.com/736x/9b/f3/e3/9bf3e34070cac29be3a86c3a71826bec.jpg",
        requestType: "แก้ไขเวลาเข้างาน",
        recordedTime: "10.00",
        reason: "เนื่องจากมีความจำเป็นต้องเดินทางไปติดต่องานด่วนในช่วงเช้า",
        typeClass: "in",
        typeName: "คำร้องเวลาเข้างาน"
    },
    {
        id: 2,
        name: "นายกฤษณะ ศิริพร",
        role: "Software Engineer",
        avatar: "https://i.pinimg.com/736x/8c/5e/9d/8c5e9dd58ecd175df019b09f6bac72b6.jpg",
        requestType: "แก้ไขเวลาออกงาน",
        recordedTime: "17.32",
        reason: "เนื่องจากคอมพิวเตอร์ไฟฟ้าดับ ทำให้ไม่สามารถบันทึกเวลาได้",
        typeClass: "out",
        typeName: "คำร้องเวลาออกงาน"
    },
    {
        id: 3,
        name: "นางสาว ชญานิษฐ์ เกษมสุข",
        role: "Software Engineer",
        avatar: "https://i.pinimg.com/736x/a7/8c/eb/a78ceb29c87f39161e7d78825bb17186.jpg",
        requestType: "แก้ไขเวลาออกงาน",
        recordedTime: "17.32",
        reason: "เนื่องจากอินเทอร์เน็ตมีปัญหา ไม่สามารถลงทะเบียนออกงานได้",
        typeClass: "out",
        typeName: "คำร้องเวลาออกงาน"
    }

];

// --- Modal Component for Rejection ---
const RejectionModal = ({ isOpen, onClose, onSubmit }) => {
    const [reason, setReason] = useState("");
    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!reason.trim()) {
            alert("กรุณากรอกเหตุผล");
            return;
        }
        onSubmit(reason);
        setReason("");
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>ยืนยันการปฏิเสธ</h2>
                <p>กรุณาระบุเหตุผลในการปฏิเสธคำขอนี้</p>
                <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="ระบุเหตุผล..."
                />
                <div className="modal-actions">
                    <button onClick={handleSubmit} className="modal-confirm-btn">ยืนยัน</button>
                    <button onClick={onClose} className="modal-cancel-btn">ยกเลิก</button>
                </div>
            </div>
        </div>
    );
};


export default function ApprovalPage() {
    const [requests, setRequests] = useState(initialRequests);
    const [history, setHistory] = useState([]); // State สำหรับเก็บประวัติ
    const [activeTab, setActiveTab] = useState('pending'); // State สำหรับจัดการ Tab
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState(null);

    // --- Event Handlers ---
    const handleApprove = (requestId) => {
        const requestToMove = requests.find(req => req.id === requestId);
        if (requestToMove) {
            // เพิ่ม 'status' แล้วย้ายไป history
            setHistory(prevHistory => [{ ...requestToMove, status: 'approved' }, ...prevHistory]);
            // ลบออกจาก requests
            setRequests(currentRequests => currentRequests.filter(req => req.id !== requestId));
            alert("อนุมัติคำขอเรียบร้อยแล้ว");
        }
    };

    const handleRejectClick = (requestId) => {
        setSelectedRequestId(requestId);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedRequestId(null);
    };

    const handleModalSubmit = (reason) => {
        const requestToMove = requests.find(req => req.id === selectedRequestId);
        if (requestToMove) {
            // เพิ่ม 'status' และ 'reason' แล้วย้ายไป history
            setHistory(prevHistory => [{ ...requestToMove, status: 'rejected', rejectionReason: reason }, ...prevHistory]);
            // ลบออกจาก requests
            setRequests(currentRequests => currentRequests.filter(req => req.id !== selectedRequestId));
            alert("ปฏิเสธคำขอเรียบร้อยแล้ว");
            handleModalClose();
        }
    };

    return (
        <div>
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

            <main className="main-layout">
                <Sidebar />
                <div className="content-wrapper">
                    <h1 className="main-title">การอนุมัติคำขอ</h1>

                    <div className="tabs">
                        <button
                            className={`tab-item ${activeTab === 'pending' ? 'active' : ''}`}
                            onClick={() => setActiveTab('pending')}
                        >
                            คำขอรออนุมัติ ({requests.length})
                        </button>
                        <button
                            className={`tab-item ${activeTab === 'history' ? 'active' : ''}`}
                            onClick={() => setActiveTab('history')}
                        >
                            ประวัติการอนุมัติ ({history.length})
                        </button>
                    </div>

                    <section className="request-list">
                        {/* --- Conditional Rendering based on Active Tab --- */}
                        {activeTab === 'pending' && (
                            requests.length > 0 ? requests.map(request => (
                                // Pending Request Card
                                <div key={request.id} className="request-card">
                                    <div className="card-content">
                                        <div className="card-info"><img src={request.avatar} alt="Avatar" className="card-avatar" /><div className="info-text"><strong className="card-name">{request.name}</strong><span className="card-role">{request.role}</span></div></div>
                                        <div className="card-details"><p><span>ประเภทการร้องขอ:</span> {request.requestType}</p><p><span>เวลาที่บันทึก:</span> {request.recordedTime}</p><p><span>เหตุผล:</span> {request.reason}</p></div>
                                    </div>
                                    <div className="card-action">
                                        <button className={`request-type-btn ${request.typeClass}`}>{request.typeName}</button>
                                        <div className="card-footer"><button className="approve-btn" onClick={() => handleApprove(request.id)}>อนุมัติ</button><button className="reject-btn" onClick={() => handleRejectClick(request.id)}>ปฏิเสธ</button></div>
                                    </div>
                                </div>
                            )) : <p className="no-requests">ไม่มีคำขอรออนุมัติ</p>
                        )}

                        {activeTab === 'history' && (
                            history.length > 0 ? history.map(request => (
                                // History Card
                                <div key={request.id} className="request-card history-card">
                                    <div className="card-content">
                                        <div className="card-info"><img src={request.avatar} alt="Avatar" className="card-avatar" /><div className="info-text"><strong className="card-name">{request.name}</strong><span className="card-role">{request.role}</span></div></div>
                                        <div className="card-details"><p><span>ประเภทการร้องขอ:</span> {request.requestType}</p>
                                            {request.status === 'rejected' && request.rejectionReason && (<p className="rejection-reason"><span>เหตุผลที่ปฏิเสธ:</span> {request.rejectionReason}</p>)}
                                        </div>
                                    </div>
                                    <div className="card-action">
                                        <div className={`status-badge ${request.status === 'approved' ? 'status-approved' : 'status-rejected'}`}>
                                            {request.status === 'approved' ? 'อนุมัติแล้ว' : 'ปฏิเสธแล้ว'}
                                        </div>
                                    </div>
                                </div>
                            )) : <p className="no-requests">ไม่มีประวัติการอนุมัติ</p>
                        )}
                    </section>
                </div>
            </main>

            <RejectionModal isOpen={isModalOpen} onClose={handleModalClose} onSubmit={handleModalSubmit} />
        </div>
    );
}

