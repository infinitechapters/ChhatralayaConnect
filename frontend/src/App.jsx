import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import StudentAnnouncements from "./pages/student/StudentAnnouncement.jsx";
import ExtensionRequest from "./pages/student/ExtensionRequest.jsx";

// Admin pages
import Students from "./pages/admin/Students.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AddStudent from "./pages/admin/AddStudent.jsx";
import Complaints from "./pages/admin/Complaints.jsx";
import Announcements from "./pages/admin/Annoucements.jsx";
import Login from "./Login.jsx";
import Complaint from "./pages/student/Complaint.jsx";
import StudentProfile from "./pages/student/StudentProfile.jsx";
import ExtensionVerify from "./pages/admin/ExtensionVerify.jsx";

function App() {
  return (
    <>
        <Routes>
         <Route path="/admin/dashboard" element={<AdminDashboard/>} />

      <Route path="/admin/students" element={<Students />} />
      <Route path="/admin/announcements" element={<Announcements />} />
        <Route path="/admin/add-student" element={<AddStudent />} />

      <Route path="/admin/complaints" element={<Complaints />} />
      <Route path="/admin/extensions" element={<ExtensionVerify />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/profile" element={<StudentProfile />} />
      <Route path="/student/complaints" element={<Complaint />} />
          <Route path="/student/announcements" element={<StudentAnnouncements />} />
          <Route path="/student/extensions" element={<ExtensionRequest />} />
         <Route path="/admin/dashboard" element={<AdminDashboard />} /> */
        </Routes>
    </>
  )

}

export default App;