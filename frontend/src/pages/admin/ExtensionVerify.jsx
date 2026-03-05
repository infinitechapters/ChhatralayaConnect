// import React, { useEffect, useState } from "react";
// import AdminLayout from "../../layouts/AdminLayout";
// import API from "../../services/api";

// const ExtensionVerify = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     try {
//       const res = await API.get("/admin/extensions");
//       setRequests(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleUpdate = async (id, status) => {
//     try {
//       setLoading(true);
//       await API.put(`/admin/extensions/${id}`, { status });
//       fetchRequests();
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6">
//         <h1 className="text-2xl font-semibold mb-6">
//           Extension Requests
//         </h1>

//         <div className="bg-white shadow rounded-lg overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-3 text-left">Student</th>
//                 <th className="p-3 text-left">Room</th>
//                 <th className="p-3 text-left">Reason</th>
//                 <th className="p-3 text-left">Till Date</th>
//                 <th className="p-3 text-left">Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {requests.map((req) => (
//                 <tr key={req.id} className="border-t">
//                   <td className="p-3">
//                     {req.student.name}
//                     <div className="text-sm text-gray-500">
//                       {req.student.enrollmentNo}
//                     </div>
//                   </td>

//                   <td className="p-3">
//                     {req.student.room
//                       ? `Room ${req.student.room.roomNumber} - Hostel ${req.student.room.hostelNo}`
//                       : "Not Assigned"}
//                   </td>

//                   <td className="p-3">{req.reason}</td>

//                   <td className="p-3">
//                     {new Date(req.tillDate).toLocaleDateString()}
//                   </td>

//                   <td className="p-3">
//                     <span
//                       className={`px-2 py-1 rounded text-sm ${
//                         req.status === "pending"
//                           ? "bg-yellow-100 text-yellow-700"
//                           : req.status === "approved"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       {req.status}
//                     </span>
//                   </td>

//                   <td className="p-3 space-x-2">
//                     {req.status === "pending" && (
//                       <>
//                         <button
//                           onClick={() =>
//                             handleUpdate(req.id, "approved")
//                           }
//                           disabled={loading}
//                           className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//                         >
//                           Approve
//                         </button>

//                         <button
//                           onClick={() =>
//                             handleUpdate(req.id, "rejected")
//                           }
//                           disabled={loading}
//                           className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                         >
//                           Reject
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))}

//               {requests.length === 0 && (
//                 <tr>
//                   <td colSpan="6" className="p-4 text-center text-gray-500">
//                     No extension requests found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

// export default ExtensionVerify;




import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../services/api";

const statusConfig = {
  pending:  { label: "Pending",  bg: "#fffbeb", color: "#d97706", dot: "#f59e0b", border: "#fde68a" },
  approved: { label: "Approved", bg: "#f0fdf4", color: "#16a34a", dot: "#22c55e", border: "#bbf7d0" },
  rejected: { label: "Rejected", bg: "#fff1f2", color: "#e11d48", dot: "#f43f5e", border: "#fecdd3" },
};

const ExtensionVerify = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/admin/extensions");
      setRequests(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id, status) => {
    try {
      setLoading(true);
      await API.put(`/admin/extensions/${id}`, { status });
      fetchRequests();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const counts = {
    pending:  requests.filter(r => r.status === "pending").length,
    approved: requests.filter(r => r.status === "approved").length,
    rejected: requests.filter(r => r.status === "rejected").length,
  };

  const initials = (name) =>
    name ? name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : "?";

  const avatarColors = [
    ["#eef2ff","#4f46e5"], ["#f0fdf4","#16a34a"], ["#fff7ed","#ea580c"],
    ["#fdf4ff","#9333ea"], ["#f0f9ff","#0284c7"], ["#fef9c3","#ca8a04"],
  ];

  return (
    <AdminLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        .tbl-row {
          border-bottom: 1.5px solid #f1f5f9;
          transition: background 0.2s, transform 0.2s;
        }
        .tbl-row:hover { background: #f8faff; transform: translateX(3px); }
        .tbl-row td {
          padding: 15px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px; color: #334155;
          vertical-align: middle;
        }
        .tbl-head th {
          padding: 12px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.13em; text-transform: uppercase;
          color: #94a3b8; border-bottom: 1.5px solid #e2e8f0;
          background: #fafafa; white-space: nowrap;
        }

        .action-btn {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 6px 14px; border-radius: 10px; border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.07em; text-transform: uppercase;
          cursor: pointer; transition: all 0.22s ease;
        }
        .action-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none !important; }
        .approve-btn {
          background: linear-gradient(135deg,#16a34a,#22c55e);
          color: white;
          box-shadow: 0 3px 10px rgba(22,163,74,0.28);
        }
        .approve-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(22,163,74,0.38);
        }
        .reject-btn {
          background: linear-gradient(135deg,#e11d48,#f43f5e);
          color: white;
          box-shadow: 0 3px 10px rgba(225,29,72,0.25);
        }
        .reject-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(225,29,72,0.35);
        }

        .summary-card {
          flex: 1; border-radius: 16px; padding: 18px 20px;
          border: 1.5px solid; transition: transform 0.25s, box-shadow 0.25s;
          min-width: 120px;
        }
        .summary-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.07); }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .slide-in { animation: slideIn 0.45s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <div className="font-body bg-slate-50 min-h-screen p-2">

        {/* ── Page Header ── */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div style={{ width:3, height:22, borderRadius:4, background:"linear-gradient(180deg,#4f46e5,#818cf8)" }} />
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#6366f1" }}>
              Admin Panel
            </span>
          </div>
          <h1 className="font-display text-slate-900" style={{ fontSize:38, fontWeight:700, lineHeight:1.1 }}>
            Extension Requests
          </h1>
          <p className="font-body text-slate-400 text-sm mt-1.5">
            Review and action student stay extension applications.
          </p>
        </div>

        {/* ── Summary Strip ── */}
        {requests.length > 0 && (
          <div className="flex gap-4 mb-7 flex-wrap slide-in">
            {[
              { key: "pending",  label: "Pending",  icon: "🕐" },
              { key: "approved", label: "Approved", icon: "✅" },
              { key: "rejected", label: "Rejected", icon: "❌" },
            ].map(({ key, label, icon }) => {
              const cfg = statusConfig[key];
              return (
                <div key={key} className="summary-card"
                  style={{ background: cfg.bg, borderColor: cfg.border }}>
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ fontSize: 20 }}>{icon}</span>
                    <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color: cfg.color }}>
                      {label}
                    </span>
                  </div>
                  <div className="font-display" style={{ fontSize:34, fontWeight:700, color: cfg.color, lineHeight:1 }}>
                    {counts[key]}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Main Card ── */}
        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden slide-in">
          <div style={{ height:3, background:"linear-gradient(90deg,#4f46e5,#818cf8,#4f46e5)" }} />

          <div className="p-6">

            {/* Card header */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div style={{ width:38, height:38, borderRadius:12, background:"#eef2ff", border:"1.5px solid #c7d2fe", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>
                  📋
                </div>
                <div>
                  <h2 className="font-display text-slate-900" style={{ fontSize:22, fontWeight:700, lineHeight:1 }}>
                    All Requests
                  </h2>
                  <p className="font-body text-slate-400 text-xs mt-0.5">
                    {requests.length} request{requests.length !== 1 ? "s" : ""} submitted
                  </p>
                </div>
              </div>
              {requests.length > 0 && (
                <div style={{ background:"#eef2ff", border:"1.5px solid #c7d2fe", borderRadius:100, padding:"5px 16px" }}>
                  <span style={{ fontSize:12, fontWeight:700, color:"#4f46e5" }}>
                    {requests.length} Total
                  </span>
                </div>
              )}
            </div>

            {/* ── Empty State ── */}
            {requests.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <span style={{ fontSize:58, lineHeight:1 }}>📭</span>
                <div className="text-center">
                  <p className="font-display text-slate-700" style={{ fontSize:20, fontWeight:600 }}>
                    No extension requests
                  </p>
                  <p className="font-body text-slate-400 text-sm mt-1">
                    No students have submitted extension requests yet.
                  </p>
                </div>
              </div>
            )}

            {/* ── Table ── */}
            {requests.length > 0 && (
              <div className="overflow-x-auto rounded-2xl border border-slate-100">
                <table className="w-full">
                  <thead>
                    <tr className="tbl-head">
                      <th>#</th>
                      <th>Student</th>
                      <th>Room</th>
                      <th>Reason</th>
                      <th>Till Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {requests.map((req, i) => {
                      const cfg = statusConfig[req.status] || statusConfig.pending;
                      const [abg, afg] = avatarColors[i % avatarColors.length];

                      return (
                        <tr key={req.id} className="tbl-row slide-in"
                          style={{ animationDelay:`${i * 0.06}s` }}>

                          {/* Index */}
                          <td style={{ color:"#94a3b8", fontWeight:600, fontSize:12, width:40 }}>
                            {String(i + 1).padStart(2, "0")}
                          </td>

                          {/* Student */}
                          <td>
                            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                              <div style={{ width:34, height:34, borderRadius:"50%", background:abg, border:`1.5px solid ${afg}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, color:afg, flexShrink:0 }}>
                                {initials(req.student.name)}
                              </div>
                              <div>
                                <div style={{ fontWeight:600, color:"#1e293b", fontSize:13.5 }}>
                                  {req.student.name}
                                </div>
                                <div style={{ fontSize:11, color:"#94a3b8", marginTop:1 }}>
                                  {req.student.enrollmentNo}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Room */}
                          <td>
                            {req.student.room ? (
                              <span style={{ background:"#f0fdf4", color:"#16a34a", border:"1px solid #bbf7d0", borderRadius:8, padding:"3px 10px", fontSize:12, fontWeight:600 }}>
                                🏠 Room {req.student.room.roomNumber}
                                <span style={{ color:"#86efac", margin:"0 4px" }}>·</span>
                                Hostel {req.student.room.hostelNo}
                              </span>
                            ) : (
                              <span style={{ background:"#fff7ed", color:"#ea580c", border:"1px solid #fed7aa", borderRadius:8, padding:"3px 10px", fontSize:12, fontWeight:600 }}>
                                Not Assigned
                              </span>
                            )}
                          </td>

                          {/* Reason */}
                          <td>
                            <div style={{ maxWidth:200, fontSize:13, color:"#475569", lineHeight:1.5 }}>
                              {req.reason}
                            </div>
                          </td>

                          {/* Till Date */}
                          <td>
                            <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                              <span style={{ fontSize:13 }}>📅</span>
                              <span style={{ fontWeight:600, color:"#1e293b", fontSize:13 }}>
                                {new Date(req.tillDate).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}
                              </span>
                            </div>
                          </td>

                          {/* Status */}
                          <td>
                            <span style={{ display:"inline-flex", alignItems:"center", gap:5, background: cfg.bg, color: cfg.color, border:`1px solid ${cfg.border}`, borderRadius:100, padding:"4px 12px", fontSize:11, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase" }}>
                              <span style={{ width:6, height:6, borderRadius:"50%", background: cfg.dot }} />
                              {cfg.label}
                            </span>
                          </td>

                          {/* Actions */}
                          <td>
                            {req.status === "pending" ? (
                              <div style={{ display:"flex", gap:6 }}>
                                <button
                                  onClick={() => handleUpdate(req.id, "approved")}
                                  disabled={loading}
                                  className="action-btn approve-btn"
                                >
                                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleUpdate(req.id, "rejected")}
                                  disabled={loading}
                                  className="action-btn reject-btn"
                                >
                                  <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                  Reject
                                </button>
                              </div>
                            ) : (
                              <span style={{ fontSize:12, color:"#94a3b8", fontStyle:"italic" }}>
                                — Actioned
                              </span>
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
    </AdminLayout>
  );
};

export default ExtensionVerify;