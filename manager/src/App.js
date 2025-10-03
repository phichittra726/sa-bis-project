import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CheckInPage from "./pages/CheckInPage";
import CheckOutPage from "./pages/CheckOutPage";
import CalendarPage from "./pages/CalendarPage";
import HistoryPage from "./pages/HistoryPage";
import TimeRequestPage from "./pages/TimeRequestPage";
import ApprovalPage from "./pages/ApprovalPage";
//import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/checkin" element={<CheckInPage />} />
        <Route path="/checkout" element={<CheckOutPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/approval" element={<ApprovalPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/timerequest" element={<TimeRequestPage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
