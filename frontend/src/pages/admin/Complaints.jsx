// import React, { useEffect, useState } from "react";
// import AdminLayout from "../../layouts/AdminLayout";
// import {
//   getAllComplaints,
//   updateComplaintStatus,
// } from "../../services/adminApi";

// const Complaints = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   const fetchComplaints = async () => {
//     try {
//       setLoading(true);

//       const res = await getAllComplaints();

//       // Handle different backend response structures safely
//       const data = Array.isArray(res.data)
//         ? res.data
//         : res.data.complaints || [];

//       setComplaints(data);
//     } catch (error) {
//       console.error("Error fetching complaints:", error);
//       setComplaints([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusChange = async (id, status) => {
//     try {
//       await updateComplaintStatus(id, status);
//       fetchComplaints(); // refresh after update
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   return (
//     <AdminLayout>
//       <h1 className="text-2xl font-semibold mb-4">
//         Complaints Management
//       </h1>

//       <div className="bg-white shadow rounded p-4">

//         {loading ? (
//           <p>Loading complaints...</p>
//         ) : complaints.length === 0 ? (
//           <p className="text-gray-500">No complaints found.</p>
//         ) : (
//           complaints.map((c) => (
//             <div
//               key={c.id}
//               className="border-b py-4 flex justify-between items-center"
//             >
//               <div>
//                 <h2 className="font-semibold text-lg">
//                   {c.title}
//                 </h2>
//                 <p className="text-gray-600">
//                   {c.description}
//                 </p>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Student: {c.student?.name || "Unknown"}
//                 </p>
//               </div>

//               <select
//                 value={c.status}
//                 onChange={(e) =>
//                   handleStatusChange(c.id, e.target.value)
//                 }
//                 className="border px-3 py-1 rounded"
//               >
//                 <option value="pending">Pending</option>
//                 <option value="in_progress">In Progress</option>
//                 <option value="resolved">Resolved</option>
//               </select>
//             </div>
//           ))
//         )}

//       </div>
//     </AdminLayout>
//   );
// };

// export default Complaints;



import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getAllComplaints, updateComplaintStatus } from "../../services/adminApi";

const statusConfig = {
  pending:     { label: "Pending",     bg: "#fff7ed", color: "#ea580c", dot: "#f97316", border: "#fed7aa" },
  in_progress: { label: "In Progress", bg: "#eff6ff", color: "#2563eb", dot: "#3b82f6", border: "#bfdbfe" },
  resolved:    { label: "Resolved",    bg: "#f0fdf4", color: "#16a34a", dot: "#22c55e", border: "#bbf7d0" },
};

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const res = await getAllComplaints();
      const data = Array.isArray(res.data) ? res.data : res.data.complaints || [];
      setComplaints(data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateComplaintStatus(id, status);
      fetchComplaints();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const counts = {
    pending:     complaints.filter(c => c.status === "pending").length,
    in_progress: complaints.filter(c => c.status === "in_progress").length,
    resolved:    complaints.filter(c => c.status === "resolved").length,
  };

  return (
    <AdminLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        .complaint-card {
          background: #fafafa;
          border: 1.5px solid #f1f5f9;
          border-radius: 16px;
          padding: 20px 22px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          transition: all 0.3s ease;
        }
        .complaint-card:hover {
          background: #fff;
          border-color: #c7d2fe;
          box-shadow: 0 4px 20px rgba(99,102,241,0.09);
          transform: translateX(4px);
        }

        .status-select {
          appearance: none;
          -webkit-appearance: none;
          border-radius: 10px;
          padding: 8px 32px 8px 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
          border: 1.5px solid;
          cursor: pointer;
          outline: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          min-width: 140px;
          transition: box-shadow 0.2s;
        }
        .status-select:focus {
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }

        @keyframes slideIn {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .slide-in { animation: slideIn 0.45s cubic-bezier(0.22,1,0.36,1) both; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 36px; height: 36px; border-radius: 50%;
          border: 3px solid #e2e8f0;
          border-top-color: #6366f1;
          animation: spin 0.8s linear infinite;
        }

        .summary-card {
          flex: 1; border-radius: 16px; padding: 18px 20px;
          border: 1.5px solid; transition: transform 0.25s, box-shadow 0.25s;
        }
        .summary-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.07); }
      `}</style>

      <div className="font-body min-h-screen bg-slate-50 p-2">

        {/* ── Page Header ── */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div style={{ width:3, height:22, borderRadius:4, background:"linear-gradient(180deg,#4f46e5,#818cf8)" }} />
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#6366f1" }}>
              Admin Panel
            </span>
          </div>
          <h1 className="font-display text-slate-900" style={{ fontSize:38, fontWeight:700, lineHeight:1.1 }}>
            Complaints Management
          </h1>
          <p className="font-body text-slate-400 text-sm mt-1.5">
            Review, track, and resolve student complaints from one place.
          </p>
        </div>

        {/* ── Summary Strip ── */}
        {!loading && complaints.length > 0 && (
          <div className="flex gap-4 mb-7 flex-wrap slide-in">
            {[
              { key:"pending",     label:"Pending",     icon:"🕐" },
              { key:"in_progress", label:"In Progress", icon:"🔄" },
              { key:"resolved",    label:"Resolved",    icon:"✅" },
            ].map(({ key, label, icon }) => {
              const cfg = statusConfig[key];
              return (
                <div key={key} className="summary-card"
                  style={{ background: cfg.bg, borderColor: cfg.border }}>
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ fontSize:20 }}>{icon}</span>
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
        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden">
          <div style={{ height:3, background:"linear-gradient(90deg,#4f46e5,#818cf8,#4f46e5)" }} />

          <div className="p-7">
            {/* Card header */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div style={{ width:38, height:38, borderRadius:12, background:"#eef2ff", border:"1.5px solid #c7d2fe", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>
                  ⚠️
                </div>
                <div>
                  <h2 className="font-display text-slate-900" style={{ fontSize:22, fontWeight:700, lineHeight:1 }}>
                    All Complaints
                  </h2>
                  <p className="font-body text-slate-400 text-xs mt-0.5">
                    {complaints.length} complaint{complaints.length !== 1 ? "s" : ""} found
                  </p>
                </div>
              </div>

              {!loading && (
                <div style={{ background:"#eef2ff", border:"1.5px solid #c7d2fe", borderRadius:100, padding:"4px 14px" }}>
                  <span style={{ fontSize:12, fontWeight:700, color:"#4f46e5" }}>
                    {complaints.length} Total
                  </span>
                </div>
              )}
            </div>

            {/* ── Loading ── */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="spinner" />
                <p className="font-body text-slate-400 text-sm">Fetching complaints...</p>
              </div>
            )}

            {/* ── Empty State ── */}
            {!loading && complaints.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <span style={{ fontSize:60, lineHeight:1 }}>🎉</span>
                <div className="text-center">
                  <p className="font-display text-slate-700" style={{ fontSize:20, fontWeight:600 }}>
                    No complaints found
                  </p>
                  <p className="font-body text-slate-400 text-sm mt-1">
                    All student issues have been resolved. Great work!
                  </p>
                </div>
              </div>
            )}

            {/* ── Complaint List ── */}
            {!loading && complaints.length > 0 && (
              <div className="space-y-3">
                {complaints.map((c, i) => {
                  const cfg = statusConfig[c.status] || statusConfig.pending;
                  return (
                    <div key={c.id} className="complaint-card slide-in"
                      style={{ animationDelay:`${i * 0.06}s` }}>

                      {/* Left: info */}
                      <div style={{ flex:1, minWidth:0 }}>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          {/* Number */}
                          <span style={{ width:26, height:26, borderRadius:"50%", background:"#eef2ff", border:"1.5px solid #c7d2fe", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:800, color:"#4f46e5", flexShrink:0 }}>
                            {String(i + 1).padStart(2, "0")}
                          </span>

                          {/* Title */}
                          <h2 className="font-display text-slate-900" style={{ fontSize:17, fontWeight:700, lineHeight:1.2 }}>
                            {c.title}
                          </h2>

                          {/* Status badge */}
                          <span style={{ background: cfg.bg, color: cfg.color, border:`1px solid ${cfg.border}`, fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", borderRadius:100, padding:"2px 9px", display:"inline-flex", alignItems:"center", gap:4 }}>
                            <span style={{ width:5, height:5, borderRadius:"50%", background: cfg.dot, display:"inline-block" }} />
                            {cfg.label}
                          </span>
                        </div>

                        <p className="font-body text-slate-500 text-sm leading-relaxed mb-2">
                          {c.description}
                        </p>
                         <div className="flex gap-2 flex-wrap mb-2">

  <span
    style={{
      background:"#eef2ff",
      color:"#4f46e5",
      border:"1px solid #c7d2fe",
      borderRadius:"999px",
      padding:"3px 10px",
      fontSize:"10px",
      fontWeight:"700",
      letterSpacing:"0.08em",
      textTransform:"uppercase"
    }}
  >
    {c.category || "General"}
  </span>

  <span
    style={{
      background:
        c.priority === "High"
          ? "#fef2f2"
          : c.priority === "Medium"
          ? "#fff7ed"
          : "#f0fdf4",

      color:
        c.priority === "High"
          ? "#dc2626"
          : c.priority === "Medium"
          ? "#ea580c"
          : "#16a34a",

      borderRadius:"999px",
      padding:"3px 10px",
      fontSize:"10px",
      fontWeight:"700",
      letterSpacing:"0.08em",
      textTransform:"uppercase"
    }}
  >
    {c.priority || "Low"} Priority
  </span>

</div>

                        <div className="flex items-center gap-1.5">
                          <span style={{ fontSize:11 }}>👤</span>
                          <span className="font-body text-slate-400" style={{ fontSize:11, fontWeight:500 }}>
                            {c.student?.name || "Unknown Student"}
                          </span>
                          <span className="font-body text-slate-400" style={{ fontSize:11, fontWeight:500 }}>
                            {c.student?.room?.roomNumber || "Unknown Student"}
                          </span>
                        </div>
                      </div>

                      {/* Right: status select */}
                      <div style={{ flexShrink:0 }}>
                        <label className="font-body" style={{ fontSize:10, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"#94a3b8", display:"block", marginBottom:5 }}>
                          Update Status
                        </label>
                        <select
                          value={c.status}
                          onChange={(e) => handleStatusChange(c.id, e.target.value)}
                          className="status-select"
                          style={{
                            background: cfg.bg,
                            color: cfg.color,
                            borderColor: cfg.border,
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Complaints;