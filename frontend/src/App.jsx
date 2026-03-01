
import { Routes, Route } from "react-router-dom";
import React, { useState } from 'react'
import Dashboard from './Dashboard.jsx'
import StudentDashboard from './pages/student/StudentDashboard.jsx'

import LoginPage from './Login.jsx'
import StudentAnnouncements from './pages/student/StudentAnnouncement.jsx'
import ExtensionRequest from './pages/student/ExtensionRequest.jsx'


import Students from "./pages/admin/Students";
import Complaints from "./pages/admin/Complaints";

function App() {
  return (
    <>
        <Routes>
         <Route path="/admin/dashboard" element={<Dashboard />} />

      <Route path="/admin/students" element={<Students />} />

      <Route path="/admin/complaints" element={<Complaints />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/announcements" element={<StudentAnnouncements />} />
          <Route path="/extensionrequest" element={<ExtensionRequest />} />
          {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
        </Routes>
    </>
  )

}

export default App;