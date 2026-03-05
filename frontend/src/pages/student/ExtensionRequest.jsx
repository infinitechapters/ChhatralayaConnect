// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../../services/api.js";
// import StudentLayout from "../../layouts/StudentLayout";

// const ExtensionRequest = () => {

//   const [formData, setFormData] = useState({
//     tillDate: "",
//     reason: "",
//   });

//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const navigate = useNavigate();
//   const today = new Date().toISOString().split("T")[0];

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     try {
//       const res = await API.get("/students/extensions");
//       setRequests(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setMessage("");

//     if (!formData.tillDate || !formData.reason) {
//       setError("All fields are required");
//       return;
//     }

//     if (formData.tillDate <= today) {
//       setError("Extension date must be in the future");
//       return;
//     }

//     setLoading(true);

//     try {
//       await API.post("/students/extension", formData);

//       setMessage("Extension request submitted successfully.");

//       setFormData({
//         tillDate: "",
//         reason: ""
//       });

//       fetchRequests(); // refresh list

//     } catch (err) {

//       if (err.response?.status === 401) {
//         localStorage.clear();
//         navigate("/login");
//       }

//       setError(
//         err.response?.data?.message || "Something went wrong"
//       );

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <StudentLayout>

//       <div className="min-h-screen bg-gray-100 py-10 px-4">

//         <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">

//           <h2 className="text-3xl font-bold mb-6">
//             Hostel Extension Application
//           </h2>

//           {error && (
//             <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
//               {error}
//             </div>
//           )}

//           {message && (
//             <div className="bg-green-100 text-green-600 p-3 rounded mb-4">
//               {message}
//             </div>
//           )}

//           {/* FORM */}
//           <form onSubmit={handleSubmit} className="space-y-6 mb-10">

//             <div>
//               <label className="block text-sm mb-1">
//                 Extension for the Date *
//               </label>
//               <input
//                 type="date"
//                 name="tillDate"
//                 value={formData.tillDate}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg px-4 py-2"
//               />
//             </div>

//             <div>
//               <label className="block text-sm mb-1">
//                 Reason *
//               </label>
//               <textarea
//                 name="reason"
//                 value={formData.reason}
//                 onChange={handleChange}
//                 rows="4"
//                 className="w-full border rounded-lg px-4 py-2"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
//             >
//               {loading ? "Submitting..." : "Submit Request"}
//             </button>

//           </form>

//           {/* REQUEST HISTORY */}
//           <h3 className="text-xl font-semibold mb-4">
//             My Extension Requests
//           </h3>

//           <div className="overflow-x-auto">
//             <table className="w-full bg-gray-50 rounded-lg">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="p-3 text-left">Till Date</th>
//                   <th className="p-3 text-left">Reason</th>
//                   <th className="p-3 text-left">Status</th>
//                   <th className="p-3 text-left">Applied On</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {requests.map((req) => (
//                   <tr key={req.id} className="border-t">
//                     <td className="p-3">
//                       {new Date(req.tillDate).toLocaleDateString()}
//                     </td>

//                     <td className="p-3">{req.reason}</td>

//                     <td className="p-3">
//                       <span className={`px-2 py-1 rounded text-sm ${
//                         req.status === "pending"
//                           ? "bg-yellow-100 text-yellow-700"
//                           : req.status === "approved"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-700"
//                       }`}>
//                         {req.status}
//                       </span>
//                     </td>

//                     <td className="p-3">
//                       {new Date(req.createdAt).toLocaleDateString()}
//                     </td>
//                   </tr>
//                 ))}

//                 {requests.length === 0 && (
//                   <tr>
//                     <td colSpan="4" className="p-4 text-center text-gray-500">
//                       No extension requests found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//         </div>

//       </div>

//     </StudentLayout>
//   );
// };

// export default ExtensionRequest;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api.js";
import StudentLayout from "../../layouts/StudentLayout";

const statusConfig = {
  pending:  { label:"Pending",  bg:"#fffbeb", color:"#d97706", dot:"#f59e0b", border:"#fde68a" },
  approved: { label:"Approved", bg:"#f0fdf4", color:"#16a34a", dot:"#22c55e", border:"#bbf7d0" },
  rejected: { label:"Rejected", bg:"#fff1f2", color:"#e11d48", dot:"#f43f5e", border:"#fecdd3" },
};

const ExtensionRequest = () => {
  const [formData, setFormData] = useState({ tillDate: "", reason: "" });
  const [requests, setRequests] = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [message,  setMessage]  = useState("");
  const [error,    setError]    = useState("");

  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => { fetchRequests(); }, []);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/students/extensions");
      setRequests(res.data);
    } catch (err) { console.error(err); }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    if (!formData.tillDate || !formData.reason) { setError("All fields are required"); return; }
    if (formData.tillDate <= today) { setError("Extension date must be in the future"); return; }
    setLoading(true);
    try {
      await API.post("/students/extension", formData);
      setMessage("Extension request submitted successfully.");
      setFormData({ tillDate: "", reason: "" });
      fetchRequests();
    } catch (err) {
      if (err.response?.status === 401) { localStorage.clear(); navigate("/login"); }
      setError(err.response?.data?.message || "Something went wrong");
    } finally { setLoading(false); }
  };

  const counts = {
    pending:  requests.filter(r => r.status === "pending").length,
    approved: requests.filter(r => r.status === "approved").length,
    rejected: requests.filter(r => r.status === "rejected").length,
  };

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
          transition: all 0.2s ease; box-sizing: border-box;
        }
        .field-input:focus {
          border-color: #6366f1; background: #fff;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.10);
        }
        .field-input::placeholder { color: #94a3b8; }
        textarea.field-input { resize: vertical; min-height: 110px; padding-top: 12px; }
        input[type="date"].field-input { cursor: pointer; }

        .submit-btn {
          width: 100%; padding: 13px;
          background: linear-gradient(135deg,#4f46e5,#6366f1);
          color: white; border: none; border-radius: 12px;
          font-family: 'DM Sans',sans-serif; font-size: 13px;
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

        .tbl-row {
          border-bottom: 1.5px solid #f1f5f9;
          transition: background 0.2s, transform 0.2s;
        }
        .tbl-row:hover { background: #f8faff; transform: translateX(3px); }
        .tbl-row td {
          padding: 14px 16px;
          font-family: 'DM Sans',sans-serif; font-size: 13.5px; color: #334155;
          vertical-align: middle;
        }
        .tbl-head th {
          padding: 11px 16px;
          font-family: 'DM Sans',sans-serif; font-size: 10px;
          font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase;
          color: #94a3b8; border-bottom: 1.5px solid #e2e8f0; background: #fafafa;
          white-space: nowrap;
        }

        .summary-pill {
          flex: 1; border-radius: 14px; padding: 14px 18px;
          border: 1.5px solid; text-align: center; min-width: 90px;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .summary-pill:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.07); }

        @keyframes slideIn {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .slide-in { animation: slideIn 0.45s cubic-bezier(0.22,1,0.36,1) both; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 15px; height: 15px; border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: white;
          animation: spin 0.7s linear infinite;
        }

        .section-label {
          font-family: 'DM Sans',sans-serif; font-size: 10px;
          font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: #94a3b8;
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 12px;
        }
        .section-label::before {
          content: ''; display: inline-block;
          width: 16px; height: 1px; background: #cbd5e1;
        }
      `}</style>

      <div className="font-body min-h-screen bg-slate-50" style={{ padding:"28px 24px 60px" }}>
        <div style={{ maxWidth:820, margin:"0 auto" }}>

          {/* ── Page Header ── */}
          <div className="slide-in" style={{ marginBottom:28 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <div style={{ width:3, height:22, borderRadius:4, background:"linear-gradient(180deg,#4f46e5,#818cf8)" }} />
              <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#6366f1" }}>
                Student Portal
              </span>
            </div>
            <h1 className="font-display text-slate-900" style={{ fontSize:38, fontWeight:700, lineHeight:1.1 }}>
              Hostel Extension
            </h1>
            <p className="font-body text-slate-400 text-sm mt-1.5">
              Apply for a hostel stay extension and track your past requests.
            </p>
          </div>

          {/* ── Summary Pills ── */}
          {requests.length > 0 && (
            <div style={{ display:"flex", gap:12, marginBottom:22, flexWrap:"wrap" }} className="slide-in">
              {[
                { key:"pending",  label:"Pending",  icon:"🕐" },
                { key:"approved", label:"Approved", icon:"✅" },
                { key:"rejected", label:"Rejected", icon:"❌" },
              ].map(({ key, label, icon }) => {
                const cfg = statusConfig[key];
                return (
                  <div key={key} className="summary-pill"
                    style={{ background:cfg.bg, borderColor:cfg.border }}>
                    <div style={{ fontSize:20, marginBottom:5 }}>{icon}</div>
                    <div className="font-display" style={{ fontSize:28, fontWeight:700, color:cfg.color, lineHeight:1 }}>
                      {counts[key]}
                    </div>
                    <div style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:cfg.color, opacity:0.7, marginTop:3 }}>
                      {label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Form Card ── */}
          <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden mb-7 slide-in">
            <div style={{ height:3, background:"linear-gradient(90deg,#4f46e5,#818cf8,#4f46e5)" }} />
            <div style={{ padding:"28px 30px" }}>

              {/* Form header */}
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22 }}>
                <div style={{ width:38, height:38, borderRadius:12, background:"#eef2ff", border:"1.5px solid #c7d2fe", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>
                  📝
                </div>
                <div>
                  <h2 className="font-display text-slate-900" style={{ fontSize:22, fontWeight:700, lineHeight:1 }}>
                    New Extension Request
                  </h2>
                  <p className="font-body text-slate-400 text-xs mt-0.5">
                    Fill in the details — your request will be reviewed by administration.
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

              <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:16 }}>

                {/* Date Section */}
                <div>
                  <div className="section-label">Extension Till Date</div>
                  <div style={{ position:"relative" }}>
                    <span style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", fontSize:15, pointerEvents:"none" }}>📅</span>
                    <input
                      type="date"
                      name="tillDate"
                      value={formData.tillDate}
                      onChange={handleChange}
                      min={today}
                      className="field-input"
                    />
                  </div>
                </div>

                {/* Reason section */}
                <div>
                  <div className="section-label">Reason for Extension</div>
                  <div style={{ position:"relative" }}>
                    <span style={{ position:"absolute", left:13, top:13, fontSize:15, pointerEvents:"none" }}>💬</span>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Explain why you need an extension..."
                      className="field-input"
                    />
                  </div>
                </div>

                {/* Footer row */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10, paddingTop:2 }}>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"#94a3b8" }}>
                    📋 Requests are reviewed within 24–48 hours.
                  </p>
                  <button type="submit" disabled={loading} className="submit-btn" style={{ width:"auto", paddingLeft:28, paddingRight:28 }}>
                    {loading ? (
                      <><div className="spinner" /> Submitting...</>
                    ) : (
                      <>
                        Submit Request
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

          {/* ── History Card ── */}
          <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden slide-in" style={{ animationDelay:"0.15s" }}>
            <div style={{ height:3, background:"linear-gradient(90deg,#4f46e5,#818cf8,#4f46e5)" }} />
            <div style={{ padding:"24px 28px" }}>

              {/* Header */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18, flexWrap:"wrap", gap:8 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:38, height:38, borderRadius:12, background:"#eef2ff", border:"1.5px solid #c7d2fe", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>
                    🗂️
                  </div>
                  <div>
                    <h3 className="font-display text-slate-900" style={{ fontSize:22, fontWeight:700, lineHeight:1 }}>
                      My Extension Requests
                    </h3>
                    <p className="font-body text-slate-400 text-xs mt-0.5">
                      {requests.length} request{requests.length !== 1 ? "s" : ""} submitted
                    </p>
                  </div>
                </div>
                {requests.length > 0 && (
                  <div style={{ background:"#eef2ff", border:"1.5px solid #c7d2fe", borderRadius:100, padding:"4px 14px" }}>
                    <span style={{ fontSize:12, fontWeight:700, color:"#4f46e5" }}>{requests.length} Total</span>
                  </div>
                )}
              </div>

              {/* Empty state */}
              {requests.length === 0 ? (
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"40px 0", gap:10 }}>
                  <span style={{ fontSize:52, lineHeight:1 }}>📭</span>
                  <p className="font-display text-slate-700" style={{ fontSize:20, fontWeight:600 }}>No requests yet</p>
                  <p className="font-body text-slate-400" style={{ fontSize:13 }}>Submit your first extension request above.</p>
                </div>
              ) : (
                <div style={{ overflowX:"auto", borderRadius:16, border:"1.5px solid #f1f5f9" }}>
                  <table style={{ width:"100%", borderCollapse:"collapse" }}>
                    <thead>
                      <tr className="tbl-head">
                        <th>#</th>
                        <th>Till Date</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Applied On</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.map((req, i) => {
                        const cfg = statusConfig[req.status] || statusConfig.pending;
                        return (
                          <tr key={req.id} className="tbl-row">
                            {/* Index */}
                            <td style={{ color:"#94a3b8", fontWeight:600, fontSize:12, width:40 }}>
                              {String(i + 1).padStart(2,"0")}
                            </td>

                            {/* Till Date */}
                            <td>
                              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                                <span style={{ fontSize:13 }}>📅</span>
                                <span style={{ fontWeight:600, color:"#1e293b" }}>
                                  {new Date(req.tillDate).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}
                                </span>
                              </div>
                            </td>

                            {/* Reason */}
                            <td>
                              <div style={{ maxWidth:220, fontSize:13, color:"#475569", lineHeight:1.5 }}>
                                {req.reason}
                              </div>
                            </td>

                            {/* Status */}
                            <td>
                              <span style={{ display:"inline-flex", alignItems:"center", gap:5, background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}`, borderRadius:100, padding:"4px 12px", fontSize:11, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase" }}>
                                <span style={{ width:6, height:6, borderRadius:"50%", background:cfg.dot }} />
                                {cfg.label}
                              </span>
                            </td>

                            {/* Applied On */}
                            <td>
                              <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                                <span style={{ fontSize:11 }}>🕒</span>
                                <span style={{ fontSize:12, color:"#94a3b8", fontWeight:500 }}>
                                  {new Date(req.createdAt).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}
                                </span>
                              </div>
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
      </div>
    </StudentLayout>
  );
};

export default ExtensionRequest;