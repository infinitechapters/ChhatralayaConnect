import React from "react";
import { Routes, Route } from "react-router-dom";
import React, { useState } from 'react'
import Dashboard from './Dashboard.jsx'
import StudentDashboard from './pages/student/StudentDashboard.jsx'

import LoginPage from './Login.jsx'

import Dashboard from "./pages/admin/Dashboard";
import Students from "./pages/admin/Students";
import Complaints from "./pages/admin/Complaints";

function App() {
  return (
    <Routes>

      <Route path="/admin/dashboard" element={<Dashboard />} />

      <Route path="/admin/students" element={<Students />} />

      <Route path="/admin/complaints" element={<Complaints />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />

    </Routes>
  );

}

export default App;