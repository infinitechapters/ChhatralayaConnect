// import React, { useEffect, useState } from "react";
// import API from "../../services/api";
// import { useNavigate } from "react-router-dom";
// import StudentLayout from "../../layouts/StudentLayout";

// const Complaint = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//   });

//   const [complaints, setComplaints] = useState([]);
//   const [activeTab, setActiveTab] = useState("ACTIVE");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const navigate = useNavigate();
//   const token = localStorage.getItem("accessToken");

//   // ================= FETCH COMPLAINTS =================
//   const fetchComplaints = async () => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     try {
//       const res = await API.get("/students/complaints");
//       const data = res.data;

//       if (Array.isArray(data)) {
//         setComplaints(data);
//       } else if (Array.isArray(data.complaints)) {
//         setComplaints(data.complaints);
//       } else {
//         setComplaints([]);
//       }
//     } catch (err) {
//       console.error("Error fetching complaints");
//     }
//   };

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   // ================= HANDLE CHANGE =================
//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // ================= SUBMIT COMPLAINT =================
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");

//     if (!formData.title || !formData.description) {
//       setError("All fields are required.");
//       return;
//     }

//     setLoading(true);

//     try {
//       await API.post("/students/complaints", formData);

//       setMessage("Complaint submitted successfully.");
//       setFormData({ title: "", description: "" });
//       fetchComplaints();
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Failed to submit complaint"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= FILTER DATA =================
//   const filteredComplaints =
//     activeTab === "ACTIVE"
//       ? complaints.filter((c) => c.status !== "resolved")
//       : complaints.filter((c) => c.status === "resolved");

//   // ================= STATUS STYLE =================
//   const statusStyle = (status) => {
//     if (status === "pending")
//       return "bg-orange-100 text-orange-600";
//     if (status === "in_progress")
//       return "bg-blue-100 text-blue-600";
//     if (status === "resolved")
//       return "bg-green-100 text-green-600";
//     return "bg-gray-100 text-gray-600";
//   };

//   return (
//     <StudentLayout>
//       <div className="min-h-screen bg-gray-100 p-6">
//         <div className="max-w-5xl mx-auto">

//           {/* Page Title */}
//           <h1 className="text-3xl font-bold mb-2">
//             Complaints & Requests
//           </h1>
//           <p className="text-gray-500 mb-6">
//             Submit and track your complaints and maintenance requests
//           </p>

//           {/* Submit Form */}
//           <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
//             <h2 className="text-xl font-semibold mb-4">
//               Submit a New Complaint
//             </h2>

//             {error && (
//               <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
//                 {error}
//               </div>
//             )}

//             {message && (
//               <div className="bg-green-100 text-green-600 p-3 rounded mb-4 text-sm">
//                 {message}
//               </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="Title *"
//                 className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//               />

//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows="4"
//                 placeholder="Description *"
//                 className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
//               />

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full py-3 rounded-lg font-semibold text-white transition ${
//                   loading
//                     ? "bg-blue-400 cursor-not-allowed"
//                     : "bg-blue-600 hover:bg-blue-700"
//                 }`}
//               >
//                 {loading ? "Submitting..." : "SUBMIT COMPLAINT"}
//               </button>
//             </form>
//           </div>

//           {/* Tabs */}
//           <div className="flex gap-8 border-b mb-6">
//             <button
//               onClick={() => setActiveTab("ACTIVE")}
//               className={`pb-2 font-medium ${
//                 activeTab === "ACTIVE"
//                   ? "border-b-2 border-blue-600 text-blue-600"
//                   : "text-gray-500"
//               }`}
//             >
//               Active Complaints (
//               {complaints.filter((c) => c.status !== "resolved").length})
//             </button>

//             <button
//               onClick={() => setActiveTab("RESOLVED")}
//               className={`pb-2 font-medium ${
//                 activeTab === "RESOLVED"
//                   ? "border-b-2 border-blue-600 text-blue-600"
//                   : "text-gray-500"
//               }`}
//             >
//               Resolved (
//               {complaints.filter((c) => c.status === "resolved").length})
//             </button>
//           </div>

//           {/* Complaint List */}
//           <div className="space-y-6">
//             {filteredComplaints.map((complaint) => (
//               <div
//                 key={complaint.id}
//                 className="bg-white shadow-md rounded-2xl p-6"
//               >
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-xl font-semibold">
//                     {complaint.title}
//                   </h3>

//                   <span
//                     className={`px-3 py-1 text-sm rounded-full font-medium ${statusStyle(
//                       complaint.status
//                     )}`}
//                   >
//                     {complaint.status}
//                   </span>
//                 </div>

//                 <p className="text-gray-600 mt-3">
//                   {complaint.description}
//                 </p>

//                 <p className="text-xs text-gray-400 mt-2">
//                   Submitted on{" "}
//                   {new Date(complaint.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//             ))}

//             {filteredComplaints.length === 0 && (
//               <p className="text-gray-500">
//                 No complaints found.
//               </p>
//             )}
//           </div>

//         </div>
//       </div>
//     </StudentLayout>
//   );
// };

// export default Complaint;


import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../../layouts/StudentLayout";

const Complaint = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [complaints, setComplaints] = useState([]);
  const [activeTab, setActiveTab] = useState("ACTIVE");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const fetchComplaints = async () => {
    if (!token) { navigate("/login"); return; }
    try {
      const res = await API.get("/students/complaints");
      const data = res.data;
      if (Array.isArray(data)) setComplaints(data);
      else if (Array.isArray(data.complaints)) setComplaints(data.complaints);
      else setComplaints([]);
    } catch (err) { console.error("Error fetching complaints"); }
  };

  useEffect(() => { fetchComplaints(); }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    if (!formData.title || !formData.description) { setError("All fields are required."); return; }
    setLoading(true);
    try {
      await API.post("/students/complaints", formData);
      setMessage("Complaint submitted successfully.");
      setFormData({ title: "", description: "" });
      fetchComplaints();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit complaint");
    } finally { setLoading(false); }
  };

  const filteredComplaints =
    activeTab === "ACTIVE"
      ? complaints.filter((c) => c.status !== "resolved")
      : complaints.filter((c) => c.status === "resolved");

  const statusStyle = (status) => {
    if (status === "pending")     return "bg-orange-100 text-orange-600";
    if (status === "in_progress") return "bg-blue-100 text-blue-600";
    if (status === "resolved")    return "bg-green-100 text-green-600";
    return "bg-gray-100 text-gray-600";
  };

  const statusConfig = {
    pending:     { bg:"#fff7ed", color:"#ea580c", dot:"#f97316", border:"#fed7aa", label:"Pending"     },
    in_progress: { bg:"#eff6ff", color:"#2563eb", dot:"#3b82f6", border:"#bfdbfe", label:"In Progress" },
    resolved:    { bg:"#f0fdf4", color:"#16a34a", dot:"#22c55e", border:"#bbf7d0", label:"Resolved"    },
  };

  const activeCount   = complaints.filter((c) => c.status !== "resolved").length;
  const resolvedCount = complaints.filter((c) => c.status === "resolved").length;

  return (
    <StudentLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        .field-input {
          width: 100%; padding: 11px 14px 11px 42px;
          border: 1.5px solid #e2e8f0; border-radius: 12px;
          font-family: 'DM Sans', sans-serif; font-size: 13.5px;
          color: #1e293b; background: #f8fafc; outline: none;
          transition: all 0.2s ease; resize: none; box-sizing: border-box;
        }
        .field-input:focus {
          border-color: #6366f1; background: #fff;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.10);
        }
        .field-input::placeholder { color: #94a3b8; }

        .submit-btn {
          width: 100%; padding: 13px;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: white; border: none; border-radius: 12px;
          font-family: 'DM Sans', sans-serif; font-size: 13px;
          font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; box-shadow: 0 4px 20px rgba(99,102,241,0.35);
          transition: all 0.25s ease;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(99,102,241,0.45);
        }
        .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        .tab-btn {
          position: relative; padding: 10px 4px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
          background: none; border: none; cursor: pointer;
          transition: color 0.2s;
          display: flex; align-items: center; gap: 7px;
        }
        .tab-btn.active { color: #4f46e5; }
        .tab-btn.inactive { color: #94a3b8; }
        .tab-btn.inactive:hover { color: #64748b; }
        .tab-btn.active::after {
          content: ''; position: absolute; bottom: -1px; left: 0; right: 0;
          height: 2px; background: #4f46e5; border-radius: 2px;
        }

        .complaint-card {
          background: #fff; border: 1.5px solid #f1f5f9;
          border-radius: 18px; padding: 22px 24px;
          transition: all 0.3s ease;
        }
        .complaint-card:hover {
          border-color: #c7d2fe;
          box-shadow: 0 4px 20px rgba(99,102,241,0.09);
          transform: translateY(-2px);
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .slide-in { animation: slideIn 0.45s cubic-bezier(0.22,1,0.36,1) both; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 15px; height: 15px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: white;
          animation: spin 0.7s linear infinite;
        }
      `}</style>

      <div className="font-body min-h-screen bg-slate-50 p-6">
        <div style={{ maxWidth: 860, margin: "0 auto" }}>

          {/* ── Page Header ── */}
          <div className="mb-8 slide-in">
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <div style={{ width:3, height:22, borderRadius:4, background:"linear-gradient(180deg,#4f46e5,#818cf8)" }} />
              <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#6366f1" }}>
                Student Portal
              </span>
            </div>
            <h1 className="font-display text-slate-900" style={{ fontSize:38, fontWeight:700, lineHeight:1.1 }}>
              Complaints & Requests
            </h1>
            <p className="font-body text-slate-400 text-sm mt-1.5">
              Submit and track your complaints and maintenance requests.
            </p>
          </div>

          {/* ── Summary Pills ── */}
          {complaints.length > 0 && (
            <div style={{ display:"flex", gap:12, marginBottom:24, flexWrap:"wrap" }} className="slide-in">
              {[
                { label:"Total",    value: complaints.length,   bg:"#eef2ff", color:"#4f46e5", border:"#c7d2fe" },
                { label:"Active",   value: activeCount,         bg:"#fff7ed", color:"#ea580c", border:"#fed7aa" },
                { label:"Resolved", value: resolvedCount,       bg:"#f0fdf4", color:"#16a34a", border:"#bbf7d0" },
              ].map(s => (
                <div key={s.label} style={{ background:s.bg, border:`1.5px solid ${s.border}`, borderRadius:14, padding:"12px 20px", textAlign:"center", minWidth:90 }}>
                  <div className="font-display" style={{ fontSize:26, fontWeight:700, color:s.color, lineHeight:1 }}>{s.value}</div>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:s.color, opacity:0.7, marginTop:3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* ── Submit Form Card ── */}
          <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden mb-7 slide-in">
            <div style={{ height:3, background:"linear-gradient(90deg,#4f46e5,#818cf8,#4f46e5)" }} />
            <div style={{ padding:"28px 30px" }}>

              {/* Form header */}
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22 }}>
                <div style={{ width:38, height:38, borderRadius:12, background:"#eef2ff", border:"1.5px solid #c7d2fe", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>
                  ✍️
                </div>
                <div>
                  <h2 className="font-display text-slate-900" style={{ fontSize:22, fontWeight:700, lineHeight:1 }}>
                    Submit a New Complaint
                  </h2>
                  <p className="font-body text-slate-400 text-xs mt-0.5">
                    Describe your issue and we'll get it resolved promptly.
                  </p>
                </div>
              </div>

              {/* Alerts */}
              {error && (
                <div style={{ display:"flex", alignItems:"flex-start", gap:10, background:"#fef2f2", border:"1px solid #fecaca", borderRadius:12, padding:"11px 14px", marginBottom:16 }}>
                  <span style={{ fontSize:15, flexShrink:0 }}>⚠️</span>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"#dc2626", fontWeight:500 }}>{error}</span>
                </div>
              )}
              {message && (
                <div style={{ display:"flex", alignItems:"flex-start", gap:10, background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:12, padding:"11px 14px", marginBottom:16 }}>
                  <span style={{ fontSize:15, flexShrink:0 }}>✅</span>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"#16a34a", fontWeight:500 }}>{message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {/* Title */}
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", fontSize:15, pointerEvents:"none" }}>📌</span>
                  <input
                    type="text" name="title"
                    value={formData.title} onChange={handleChange}
                    placeholder="Complaint Title *"
                    className="field-input"
                  />
                </div>

                {/* Description */}
                <div style={{ position:"relative" }}>
                  <span style={{ position:"absolute", left:13, top:13, fontSize:15, pointerEvents:"none" }}>💬</span>
                  <textarea
                    name="description"
                    value={formData.description} onChange={handleChange}
                    rows="4" placeholder="Describe your issue in detail *"
                    className="field-input"
                  />
                </div>

                {/* Submit */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10, paddingTop:2 }}>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"#94a3b8" }}>
                    📍 Your complaint will be reviewed by hostel administration.
                  </p>
                  <button type="submit" disabled={loading} className="submit-btn" style={{ width:"auto", paddingLeft:28, paddingRight:28 }}>
                    {loading ? (
                      <><div className="spinner" /> Submitting...</>
                    ) : (
                      <>
                        Submit Complaint
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* ── Tabs ── */}
          <div style={{ borderBottom:"1.5px solid #e2e8f0", display:"flex", gap:24, marginBottom:20 }}>
            <button
              onClick={() => setActiveTab("ACTIVE")}
              className={`tab-btn ${activeTab === "ACTIVE" ? "active" : "inactive"}`}
            >
              <span style={{ fontSize:14 }}>🔥</span>
              Active Complaints
              <span style={{
                background: activeTab === "ACTIVE" ? "#eef2ff" : "#f1f5f9",
                color:      activeTab === "ACTIVE" ? "#4f46e5" : "#94a3b8",
                borderRadius:100, padding:"1px 8px", fontSize:11, fontWeight:700,
              }}>
                {activeCount}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("RESOLVED")}
              className={`tab-btn ${activeTab === "RESOLVED" ? "active" : "inactive"}`}
            >
              <span style={{ fontSize:14 }}>✅</span>
              Resolved
              <span style={{
                background: activeTab === "RESOLVED" ? "#eef2ff" : "#f1f5f9",
                color:      activeTab === "RESOLVED" ? "#4f46e5" : "#94a3b8",
                borderRadius:100, padding:"1px 8px", fontSize:11, fontWeight:700,
              }}>
                {resolvedCount}
              </span>
            </button>
          </div>

          {/* ── Complaint List ── */}
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {filteredComplaints.map((complaint, i) => {
              const cfg = statusConfig[complaint.status] || { bg:"#f1f5f9", color:"#64748b", dot:"#94a3b8", border:"#e2e8f0", label: complaint.status };
              return (
                <div key={complaint.id} className="complaint-card slide-in"
                  style={{ animationDelay:`${i * 0.07}s` }}>

                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, flexWrap:"wrap" }}>
                    {/* Left */}
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6, flexWrap:"wrap" }}>
                        {/* Number */}
                        <span style={{ width:24, height:24, borderRadius:"50%", background:"#eef2ff", border:"1.5px solid #c7d2fe", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:800, color:"#4f46e5", flexShrink:0 }}>
                          {String(i + 1).padStart(2,"0")}
                        </span>
                        <h3 className="font-display text-slate-900" style={{ fontSize:18, fontWeight:700, lineHeight:1.2 }}>
                          {complaint.title}
                        </h3>
                      </div>
                      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13.5, color:"#475569", lineHeight:1.7, marginBottom:10 }}>
                        {complaint.description}
                      </p>
                      <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                        <span style={{ fontSize:11 }}>🕒</span>
                        <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"#94a3b8", fontWeight:500 }}>
                          Submitted on {new Date(complaint.createdAt).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}
                        </span>
                      </div>
                    </div>

                    {/* Status badge */}
                    <span style={{ display:"inline-flex", alignItems:"center", gap:5, background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}`, borderRadius:100, padding:"5px 13px", fontSize:11, fontWeight:700, letterSpacing:"0.07em", textTransform:"uppercase", flexShrink:0 }}>
                      <span style={{ width:6, height:6, borderRadius:"50%", background:cfg.dot }} />
                      {cfg.label}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Empty state */}
            {filteredComplaints.length === 0 && (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"48px 20px", gap:12 }}>
                <span style={{ fontSize:52, lineHeight:1 }}>
                  {activeTab === "ACTIVE" ? "😊" : "🎉"}
                </span>
                <div style={{ textAlign:"center" }}>
                  <p className="font-display text-slate-700" style={{ fontSize:20, fontWeight:600 }}>
                    {activeTab === "ACTIVE" ? "No active complaints" : "No resolved complaints yet"}
                  </p>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"#94a3b8", marginTop:4 }}>
                    {activeTab === "ACTIVE" ? "You're all good! Submit a complaint above if needed." : "Resolved complaints will appear here."}
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </StudentLayout>
  );
};

export default Complaint;