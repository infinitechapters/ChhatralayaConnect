import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getAllStudents } from "../../services/adminApi";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [vacantRooms, setVacantRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
    fetchVacantRooms();
  }, []);

  const fetchVacantRooms = async () => {
    try {
      const res = await API.get("/admin/vacant-rooms");
      setVacantRooms(res.data.rooms);
    } catch (error) { console.error(error); }
  };

  const verifyStudent = async (id) => {
    try {
      await API.put(`/admin/verifyStudent/${id}`);
      alert("Student Verified Successfully");
      fetchStudents();
    } catch (error) { console.error(error); }
  };

  const assignRoom = async () => {
    try {
      await API.put("/admin/assign-room", {
        studentId: selectedStudent.id,
        roomId: selectedRoom,
      });
      alert("Room Assigned Successfully");
      fetchStudents();
      fetchVacantRooms();
      setSelectedStudent(null);
    } catch (error) { console.error(error); }
  };

  // ✅ Now returns fresh list so updateStudent can use it
  const fetchStudents = async () => {
    try {
      const res = await getAllStudents();
      setStudents(res.data.students || []);
      return res.data.students || [];
    } catch (error) { console.error(error); return []; }
  };

  const updateStudent = async () => {
    try {
      // ✅ Safely strip "T..." time part whether or not it's present
      const rawDate = formData.admissionDate || "";
      const cleanDate = rawDate.includes("T") ? rawDate.split("T")[0] : rawDate;

      const cleanedData = {
        enrollmentNo: formData.enrollmentNo,
        admissionDate: cleanDate || null,
        branch: formData.branch,
        semester: formData.semester,
        contact: formData.contact,
        permanentAddress: formData.permanentAddress,
        parentName: formData.parentName,
        parentNumber: formData.parentNumber,
        LgName: formData.LgName,
        LgNumber: formData.LgNumber,
        LgAddress: formData.LgAddress,
      };

      // ✅ Check browser console to confirm what is actually going to DB
      console.log("Sending to DB:", cleanedData);

      await API.put(`/admin/students/${selectedStudent.id}`, cleanedData);

      if (selectedRoom) {
        await API.put("/admin/assign-room", {
          studentId: selectedStudent.id,
          roomId: selectedRoom,
        });
      }

      alert("Student Updated Successfully");

      // ✅ Fetch fresh data, then find & re-set the updated student so modal reflects new values immediately
      const freshStudents = await fetchStudents();
      await fetchVacantRooms();

      const updatedStudent = freshStudents.find((s) => s.id === selectedStudent.id);
      if (updatedStudent) {
        setSelectedStudent(updatedStudent);
        setFormData(updatedStudent);
      }

      setIsEditing(false);
      setSelectedRoom("");

    } catch (error) {
      console.error(error);
      alert("Failed to update student. Please try again.");
    }
  };

  const q = searchQuery.toLowerCase();
  const filteredStudents = students.filter((s) => {
    if (!q) return true;
    return (
      (s.name?.toLowerCase().includes(q)) ||
      (s.branch?.toLowerCase().includes(q)) ||
      (s.semester !== undefined && s.semester !== null && String(s.semester).includes(q)) ||
      (s.enrollmentNo?.toLowerCase().includes(q)) ||
      (s.room?.roomNumber !== undefined && String(s.room.roomNumber).includes(q))
    );
  });

  const initials = (name) =>
    name ? name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : "?";

  const avatarColors = [
    ["#eef2ff", "#4f46e5"], ["#f0fdf4", "#16a34a"], ["#fff7ed", "#ea580c"],
    ["#fdf4ff", "#9333ea"], ["#f0f9ff", "#0284c7"], ["#fef9c3", "#ca8a04"],
  ];

  const labelToKey = (label) => {
    const map = {
      "Enrollment No": "enrollmentNo",
      "Department": "branch",
      "Semester": "semester",
      "Phone": "contact",
      "Address": "permanentAddress",
      "Parent Name": "parentName",
      "Parent Phone": "parentNumber",
      "Local Guardian Name": "LgName",
      "Local Guardian Phone": "LgNumber",
      "Local Guardian Address": "LgAddress",
      "Admission Date": "admissionDate",
    };
    return map[label];
  };

  return (
    <AdminLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        .tbl-row {
          border-bottom: 1.5px solid #f1f5f9;
          transition: background 0.2s, transform 0.2s;
          cursor: pointer;
        }
        .tbl-row:hover { background: #f8faff; transform: translateX(3px); }
        .tbl-row td { padding: 14px 16px; font-family:'DM Sans',sans-serif; font-size:13.5px; color:#334155; }

        .tbl-head th {
          padding: 12px 16px;
          font-family:'DM Sans',sans-serif; font-size:10px; font-weight:700;
          letter-spacing:0.13em; text-transform:uppercase; color:#94a3b8;
          border-bottom: 1.5px solid #e2e8f0; background:#fafafa;
          white-space: nowrap;
        }

        .search-input {
          width: 100%; padding: 11px 14px 11px 42px;
          border: 1.5px solid #e2e8f0; border-radius: 12px;
          font-family:'DM Sans',sans-serif; font-size:13.5px; color:#1e293b;
          background:#f8fafc; outline:none; transition:all 0.2s;
        }
        .search-input:focus {
          border-color:#6366f1; background:#fff;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.10);
        }
        .search-input::placeholder { color:#94a3b8; }

        .modal-overlay {
          position:fixed; inset:0;
          background:rgba(15,23,42,0.55);
          backdrop-filter:blur(4px);
          display:flex; align-items:center; justify-content:center;
          z-index:50; padding:20px;
          animation: fadeIn 0.2s ease;
        }
        .modal-box {
          background:#fff; border-radius:24px;
          width:100%; max-width:480px;
          box-shadow:0 32px 80px rgba(0,0,0,0.22);
          overflow:hidden;
          animation: slideUp 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes fadeIn  { from{opacity:0}  to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .slide-in { animation: slideIn 0.45s cubic-bezier(0.22,1,0.36,1) both; }

        .room-select {
          width:100%; padding:10px 32px 10px 14px; border-radius:12px;
          border:1.5px solid #e2e8f0; font-family:'DM Sans',sans-serif;
          font-size:13px; color:#1e293b; background:#f8fafc;
          outline:none; appearance:none;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat:no-repeat; background-position:right 10px center;
          transition:all 0.2s;
        }
        .room-select:focus { border-color:#6366f1; background:#fff; box-shadow:0 0 0 3px rgba(99,102,241,0.10); }

        .detail-row {
          display:flex; gap:8px; padding:10px 0;
          border-bottom:1px solid #f1f5f9; align-items:flex-start;
        }
        .detail-row:last-child { border-bottom:none; }
      `}</style>

      <div className="font-body bg-slate-50 min-h-screen p-2">

        {/* ── Page Header ── */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div style={{ width: 3, height: 22, borderRadius: 4, background: "linear-gradient(180deg,#4f46e5,#818cf8)" }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6366f1" }}>
              Admin Panel
            </span>
          </div>
          <h1 className="font-display text-slate-900" style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.1 }}>
            Hostel Students
          </h1>
          <p className="font-body text-slate-400 text-sm mt-1.5">
            View, verify, and manage all registered hostel residents.
          </p>
        </div>

        {/* ── Main Card ── */}
        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden slide-in">
          <div style={{ height: 3, background: "linear-gradient(90deg,#4f46e5,#818cf8,#4f46e5)" }} />

          <div className="p-6">

            {/* ── Toolbar: search + count ── */}
            <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">

              {/* Search */}
              <div style={{ position: "relative", maxWidth: 360, flex: 1 }}>
                <svg style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#94a3b8" }}
                  width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by name, branch, enrollment, room, semester…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Count badge */}
              <div style={{ background: "#eef2ff", border: "1.5px solid #c7d2fe", borderRadius: 100, padding: "5px 16px", flexShrink: 0 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#4f46e5" }}>
                  {filteredStudents.length} / {students.length} Students
                </span>
              </div>
            </div>

            {/* ── Table ── */}
            {filteredStudents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <span style={{ fontSize: 56, lineHeight: 1 }}>🔍</span>
                <p className="font-display text-slate-700" style={{ fontSize: 20, fontWeight: 600 }}>No students found</p>
                <p className="font-body text-slate-400 text-sm">Try adjusting your search query.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-100">
                <table className="w-full">
                  <thead>
                    <tr className="tbl-head">
                      <th style={{ borderRadius: "12px 0 0 0" }}>#</th>
                      <th>Student</th>
                      <th>Branch</th>
                      <th>Sem</th>
                      <th>Enrollment No</th>
                      <th>Room</th>
                      <th style={{ borderRadius: "0 12px 0 0" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student, i) => {
                      const [bg, fg] = avatarColors[i % avatarColors.length];
                      return (
                        <tr key={student.id} className="tbl-row"
                          onClick={() => {
                            setSelectedStudent(student);
                            setFormData(student);
                            setIsEditing(false);
                          }}>

                          {/* Index */}
                          <td style={{ color: "#94a3b8", fontWeight: 600, fontSize: 12, width: 40 }}>
                            {String(i + 1).padStart(2, "0")}
                          </td>

                          {/* Name + avatar */}
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ width: 34, height: 34, borderRadius: "50%", background: bg, border: `1.5px solid ${fg}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: fg, flexShrink: 0 }}>
                                {initials(student.name)}
                              </div>
                              <div>
                                <div style={{ fontWeight: 600, color: "#1e293b", fontSize: 13.5 }}>{student.name}</div>
                                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>{student.email}</div>
                              </div>
                            </div>
                          </td>

                          <td style={{ fontWeight: 500 }}>{student.branch}</td>
                          <td>
                            <span style={{ background: "#f1f5f9", borderRadius: 8, padding: "3px 9px", fontSize: 12, fontWeight: 600, color: "#475569" }}>
                              Sem {student.semester}
                            </span>
                          </td>
                          <td style={{ fontFamily: "monospace", fontSize: 12.5, color: "#64748b", letterSpacing: "0.03em" }}>
                            {student.enrollmentNo}
                          </td>

                          {/* Room */}
                          <td>
                            {student.room?.roomNumber ? (
                              <span style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", borderRadius: 8, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>
                                🏠 {student.room.roomNumber}
                              </span>
                            ) : (
                              <span style={{ background: "#fff7ed", color: "#ea580c", border: "1px solid #fed7aa", borderRadius: 8, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>
                                Not Assigned
                              </span>
                            )}
                          </td>

                          {/* Verified */}
                          <td onClick={(e) => e.stopPropagation()}>
                            {student.isVerified ? (
                              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", borderRadius: 100, padding: "4px 12px", fontSize: 11, fontWeight: 700 }}>
                                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
                                Verified
                              </span>
                            ) : (
                              <button
                                onClick={(e) => { e.stopPropagation(); verifyStudent(student.id); }}
                                style={{ background: "linear-gradient(135deg,#16a34a,#22c55e)", color: "white", border: "none", borderRadius: 100, padding: "5px 14px", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", cursor: "pointer", boxShadow: "0 2px 8px rgba(22,163,74,0.3)", transition: "all 0.2s" }}
                                onMouseEnter={e => e.target.style.transform = "translateY(-1px)"}
                                onMouseLeave={e => e.target.style.transform = "translateY(0)"}
                              >
                                Verify
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      {selectedStudent && (
        <div className="modal-overlay" onClick={() => { setSelectedStudent(null); setIsEditing(false); setSelectedRoom(""); }}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>

            {/* Modal header */}
            <div style={{ background: "linear-gradient(135deg,#4f46e5,#818cf8)", padding: "24px 28px", position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    style={{
                      padding: "6px 14px",
                      background: "#6366f1",
                      color: "white",
                      borderRadius: 8,
                      border: "none",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer"
                    }}
                  >
                    Edit
                  </button>
                ) : (
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => {
                        setFormData(selectedStudent);
                        setIsEditing(false);
                        setSelectedRoom("");
                      }}
                      style={{
                        padding: "6px 14px",
                        background: "#e2e8f0",
                        borderRadius: 8,
                        border: "none",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      onClick={updateStudent}
                      style={{
                        padding: "6px 14px",
                        background: "#16a34a",
                        color: "white",
                        borderRadius: 8,
                        border: "none",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>

              {/* Decorative circles */}
              <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: -16, left: 20, width: 50, height: 50, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />

              <button onClick={() => { setSelectedStudent(null); setIsEditing(false); setSelectedRoom(""); }}
                style={{ position: "absolute", top: 14, right: 16, width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}>
                ✕
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "white", fontFamily: "'Cormorant Garamond',serif" }}>
                  {initials(selectedStudent.name)}
                </div>
                <div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 700, color: "white", lineHeight: 1.1 }}>
                    {selectedStudent.name}
                  </h2>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 3 }}>
                    {selectedStudent.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal body */}
            <div style={{ padding: "24px 28px", overflowY: "auto", maxHeight: "65vh" }}>

              {/* Info grid */}
              {[
                { icon: "🎓", label: "Enrollment No",          value: formData.enrollmentNo },
                { icon: "📅", label: "Admission Date",         value: formData.admissionDate },
                { icon: "📚", label: "Department",             value: formData.branch },
                { icon: "📅", label: "Semester",               value: formData.semester },
                { icon: "📞", label: "Phone",                  value: formData.contact },
                { icon: "🏠", label: "Hostel",                 value: selectedStudent.room?.hostelNo || "—" },
                { icon: "📍", label: "Address",                value: formData.permanentAddress },
                { icon: "👨‍👩‍👦", label: "Parent Name",          value: formData.parentName },
                { icon: "📱", label: "Parent Phone",           value: formData.parentNumber },
                { icon: "👨‍👩‍👦", label: "Local Guardian Name",  value: formData.LgName },
                { icon: "📱", label: "Local Guardian Phone",  value: formData.LgNumber },
                { icon: "📍", label: "LG-Address",             value: formData.LgAddress },
              ].map(({ icon, label, value }) => (
                <div key={label} className="detail-row">
                  <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 2 }}>
                      {label}
                    </div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, color: "#1e293b", fontWeight: 500 }}>
                      {isEditing && label !== "Hostel" ? (
                        <input
                          type={label === "Admission Date" ? "date" : "text"}
                          value={
                            label === "Admission Date" && formData.admissionDate
                              // ✅ strip T part whether or not it exists
                              ? (formData.admissionDate.includes("T")
                                  ? formData.admissionDate.split("T")[0]
                                  : formData.admissionDate)
                              : formData[labelToKey(label)] ?? ""
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [labelToKey(label)]: e.target.value,
                            })
                          }
                          style={{
                            fontFamily: "'DM Sans',sans-serif",
                            fontSize: 13.5,
                            color: "#1e293b",
                            fontWeight: 500,
                            width: "100%",
                            border: "1px solid #e2e8f0",
                            borderRadius: 6,
                            padding: "6px 8px",
                          }}
                        />
                      ) : (
                        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, color: "#1e293b", fontWeight: 500 }}>
                          {label === "Admission Date" && value
                            ? (value.includes("T") ? value.split("T")[0] : value)
                            : label === "Semester" && value
                            ? `Semester ${value}`
                            : value || "—"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Room section */}
              {selectedStudent.room ? (
                <div style={{ marginTop: 12 }}>
                  <div className="detail-row">
                    <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>🚪</span>
                    <div style={{ width: "100%" }}>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 6 }}>
                        Room
                      </div>

                      {/* VIEW MODE */}
                      {!isEditing ? (
                        <span style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", borderRadius: 8, padding: "4px 12px", fontSize: 13, fontWeight: 600 }}>
                          🏠 {selectedStudent.room?.roomNumber
                            ? `Room ${selectedStudent.room.roomNumber}`
                            : "Not Assigned"}
                        </span>
                      ) : (
                        /* EDIT MODE */
                        <select
                          value={selectedRoom}
                          onChange={(e) => setSelectedRoom(e.target.value)}
                          className="room-select"
                        >
                          <option value="">Select a room</option>
                          {selectedStudent.room && (
                            <option value={selectedStudent.room.id}>
                              Current: Room {selectedStudent.room.roomNumber} — Hostel {selectedStudent.room.hostelNo}
                            </option>
                          )}
                          {vacantRooms.map((room) => (
                            <option key={room.id} value={room.id}>
                              Room {room.roomNumber} — Hostel {room.hostelNo}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: 12, background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 16, padding: "16px" }}>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10 }}>
                    🏠 Assign Room
                  </p>
                  <div style={{ position: "relative" }}>
                    <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}
                      className="room-select">
                      <option value="">Select a vacant room</option>
                      {vacantRooms.map((room) => (
                        <option key={room.id} value={room.id}>
                          Room {room.roomNumber} — Hostel {room.hostelNo}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button onClick={assignRoom} disabled={!selectedRoom}
                    style={{ marginTop: 10, width: "100%", padding: "11px", background: selectedRoom ? "linear-gradient(135deg,#4f46e5,#6366f1)" : "#e2e8f0", color: selectedRoom ? "white" : "#94a3b8", border: "none", borderRadius: 12, fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: selectedRoom ? "pointer" : "not-allowed", boxShadow: selectedRoom ? "0 4px 16px rgba(99,102,241,0.3)" : "none", transition: "all 0.25s" }}>
                    Assign Room →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Students;