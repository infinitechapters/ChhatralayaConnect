// import React, { useEffect, useState } from "react";
// import API from "../../services/api.js";
// import { useNavigate } from "react-router-dom";
// import StudentLayout from "../../layouts/StudentLayout";

// const StudentDashboard = () => {

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {

//     const fetchDashboard = async () => {

//       try {
//         const res = await API.get("/students/dashboard");
//         setData(res.data);

//       } catch (error) {

//         if (error.response?.status === 401) {
//           localStorage.clear();
//           navigate("/login");
//           return;
//         }

//         console.error("Failed to load dashboard", error);

//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();

//   }, [navigate]);


//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-lg font-semibold">
//         Loading dashboard...
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="flex justify-center items-center h-screen text-red-500">
//         Failed to load dashboard
//       </div>
//     );
//   }

//   return (
//     <StudentLayout>
//       <div className="min-h-screen bg-gray-100 p-6">

//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">
//             {data.welcome}
//           </h1>
//           <p className="text-gray-500 mt-1">
//             Here’s an overview of your hostel information
//           </p>
//         </div>


//         {/* Top Cards */}
//         <div className="grid md:grid-cols-4 gap-6 mb-8">

//           <Card
//             title="Room Number"
//             value={
//               data.basicInfo?.room?.roomNumber
//                 ? `Room ${data.basicInfo.room.roomNumber}`
//                 : "Not Assigned"
//             }
//           />

//           <Card
//             title="Hostel"
//             value={
//               data.basicInfo?.room?.hostelNo || "-"
//             }
//           />

//           <Card
//             title="Branch"
//             value={data.basicInfo?.branch || "-"}
//           />

//           <Card
//             title="Year"
//             value={
//               data.basicInfo?.year
//                 ? `${data.basicInfo.year} Year`
//                 : "-"
//             }
//           />

//           <Card
//             title="Stay Duration"
//             value={`${data.stayDuration?.months || 0} months`}
//           />

//         </div>


//         {/* Complaint & Extension Summary */}
//         <div className="grid md:grid-cols-2 gap-6 mb-8">

//           <div className="bg-white shadow-lg rounded-2xl p-6">

//             <h2 className="text-xl font-semibold mb-4 text-gray-700">
//               Complaints
//             </h2>

//             <div className="flex justify-between text-gray-600">
//               <span>Total</span>
//               <span>{data.complaints?.total || 0}</span>
//             </div>

//             <div className="flex justify-between text-yellow-500 font-medium mt-2">
//               <span>Pending</span>
//               <span>{data.complaints?.pending || 0}</span>
//             </div>

//             <div className="flex justify-between text-green-600 font-medium mt-2">
//               <span>Resolved</span>
//               <span>{data.complaints?.resolved || 0}</span>
//             </div>

//           </div>


//           <div className="bg-white shadow-lg rounded-2xl p-6">

//             <h2 className="text-xl font-semibold mb-4 text-gray-700">
//               Extension Requests
//             </h2>

//             <div className="flex justify-between text-gray-600">
//               <span>Pending Requests</span>
//               <span className="text-indigo-600 font-semibold">
//                 {data.extensions?.pending || 0}
//               </span>
//             </div>

//           </div>

//         </div>


//         {/* Announcements */}
//         <div className="bg-white shadow-lg rounded-2xl p-6">

//           <h2 className="text-xl font-semibold mb-6 text-gray-700">
//             Recent Announcements
//           </h2>

//           {!data.announcements || data.announcements.length === 0 ? (

//             <p className="text-gray-500">
//               No announcements available.
//             </p>

//           ) : (

//             <div className="space-y-4">
//               {data.announcements.map((announcement) => (
//                 <div
//                   key={announcement.id}
//                   className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-lg hover:shadow-md transition"
//                 >
//                   <h3 className="font-semibold text-gray-800">
//                     {announcement.title}
//                   </h3>

//                   <p className="text-gray-600 text-sm mt-1">
//                     {announcement.description}
//                   </p>

//                   <p className="text-xs text-gray-400 mt-2">
//                     {new Date(announcement.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//               ))}
//             </div>

//           )}

//         </div>

//       </div>
//     </StudentLayout>
//   );
// };


// /* Card Component */
// const Card = ({ title, value }) => (
//   <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
//     <h3 className="text-gray-500 text-sm">{title}</h3>
//     <p className="text-2xl font-bold text-gray-800 mt-2">
//       {value || "-"}
//     </p>
//   </div>
// );

// export default StudentDashboard;



import React, { useEffect, useState } from "react";
import API from "../../services/api.js";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../../layouts/StudentLayout";

const StudentDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/students/dashboard");
        setData(res.data);
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
          return;
        }
        console.error("Failed to load dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [navigate]);

  if (loading) {
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100vh", background:"#f8fafc", gap:16 }}>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <div style={{ width:44, height:44, borderRadius:"50%", border:"3px solid #e2e8f0", borderTopColor:"#6366f1", animation:"spin 0.8s linear infinite" }} />
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"#94a3b8", fontWeight:500 }}>Loading your dashboard...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100vh", background:"#f8fafc", gap:12 }}>
        <span style={{ fontSize:52 }}>⚠️</span>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:15, color:"#ef4444", fontWeight:600 }}>Failed to load dashboard</p>
      </div>
    );
  }

  const announcementColors = [
    { bar:"#6366f1", bg:"#eef2ff", badge:"#c7d2fe", badgeText:"#4f46e5" },
    { bar:"#22c55e", bg:"#f0fdf4", badge:"#bbf7d0", badgeText:"#16a34a" },
    { bar:"#f97316", bg:"#fff7ed", badge:"#fed7aa", badgeText:"#ea580c" },
    { bar:"#a855f7", bg:"#fdf4ff", badge:"#e9d5ff", badgeText:"#9333ea" },
    { bar:"#0ea5e9", bg:"#f0f9ff", badge:"#bae6fd", badgeText:"#0284c7" },
  ];

  return (
    <StudentLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        @keyframes slideIn {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .slide-in { animation: slideIn 0.5s cubic-bezier(0.22,1,0.36,1) both; }

        .info-card {
          background: #fff; border: 1.5px solid #f1f5f9;
          border-radius: 20px; padding: 22px 22px 20px;
          transition: all 0.3s ease; position: relative; overflow: hidden;
        }
        .info-card:hover {
          border-color: #c7d2fe;
          box-shadow: 0 8px 28px rgba(99,102,241,0.10);
          transform: translateY(-3px);
        }

        .summary-card {
          background: #fff; border: 1.5px solid #f1f5f9;
          border-radius: 20px; overflow: hidden;
          transition: all 0.3s ease;
        }
        .summary-card:hover {
          border-color: #c7d2fe;
          box-shadow: 0 8px 28px rgba(99,102,241,0.08);
          transform: translateY(-2px);
        }

        .ann-card {
          border-radius: 16px; padding: 18px 20px;
          border: 1.5px solid transparent;
          transition: all 0.3s ease; cursor: default;
        }
        .ann-card:hover {
          transform: translateX(4px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }

        .stat-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 0; border-bottom: 1px solid #f1f5f9;
        }
        .stat-row:last-child { border-bottom: none; padding-bottom: 0; }
      `}</style>

      <div className="font-body min-h-screen bg-slate-50" style={{ padding:"28px 24px 60px" }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>

          {/* ── Welcome Header ── */}
          <div className="slide-in" style={{ marginBottom:28 }}>
            {/* Eyebrow */}
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <div style={{ width:3, height:22, borderRadius:4, background:"linear-gradient(180deg,#4f46e5,#818cf8)" }} />
              <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#6366f1" }}>
                Student Portal
              </span>
            </div>

            <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
              <div>
                <h1 className="font-display text-slate-900" style={{ fontSize:38, fontWeight:700, lineHeight:1.1, marginBottom:6 }}>
                  {data.welcome} 👋
                </h1>
                <p className="font-body text-slate-400" style={{ fontSize:14 }}>
                  Here's an overview of your hostel information.
                </p>
              </div>
              {/* Live indicator */}
              <div style={{ display:"flex", alignItems:"center", gap:6, background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:100, padding:"6px 14px" }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:"#22c55e", boxShadow:"0 0 6px #22c55e" }} />
                <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:700, color:"#16a34a" }}>Live</span>
              </div>
            </div>
          </div>

          {/* ── Info Cards Grid ── */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))", gap:14, marginBottom:20 }}>
            {[
              { icon:"🚪", title:"Room Number",   value: data.basicInfo?.room?.roomNumber ? `Room ${data.basicInfo.room.roomNumber}` : "Not Assigned", accent:"#4f46e5", accentBg:"#eef2ff" },
              { icon:"🏠", title:"Hostel",         value: data.basicInfo?.room?.hostelNo || "—",   accent:"#0284c7", accentBg:"#f0f9ff" },
              { icon:"📚", title:"Branch",         value: data.basicInfo?.branch || "—",            accent:"#9333ea", accentBg:"#fdf4ff" },
              { icon:"🎓", title:"Year",           value: data.basicInfo?.year ? `${data.basicInfo.year} Year` : "—", accent:"#ea580c", accentBg:"#fff7ed" },
              { icon:"📅", title:"Stay Duration",  value: `${data.stayDuration?.months || 0} months`, accent:"#16a34a", accentBg:"#f0fdf4" },
            ].map((card, i) => (
              <div key={i} className="info-card slide-in" style={{ animationDelay:`${i * 0.08}s` }}>
                {/* Top accent bar */}
                <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${card.accent},${card.accent}60)`, borderRadius:"20px 20px 0 0" }} />
                {/* Icon */}
                <div style={{ width:38, height:38, borderRadius:12, background:card.accentBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, marginBottom:14 }}>
                  {card.icon}
                </div>
                <p className="font-body" style={{ fontSize:10, fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase", color:"#94a3b8", marginBottom:4 }}>
                  {card.title}
                </p>
                <p className="font-display" style={{ fontSize:22, fontWeight:700, color:"#0f172a", lineHeight:1.1 }}>
                  {card.value}
                </p>
              </div>
            ))}
          </div>

          {/* ── Complaints + Extensions Row ── */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:14, marginBottom:20 }}>

            {/* Complaints */}
            <div className="summary-card slide-in" style={{ animationDelay:"0.35s" }}>
              <div style={{ height:3, background:"linear-gradient(90deg,#f97316,#fb923c)" }} />
              <div style={{ padding:"22px 24px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:"#fff7ed", border:"1.5px solid #fed7aa", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>⚠️</div>
                  <h2 className="font-display text-slate-900" style={{ fontSize:20, fontWeight:700 }}>Complaints</h2>
                </div>
                <div>
                  {[
                    { label:"Total",    value: data.complaints?.total   || 0, color:"#64748b", dot:"#94a3b8"  },
                    { label:"Pending",  value: data.complaints?.pending || 0, color:"#d97706", dot:"#f59e0b"  },
                    { label:"Resolved", value: data.complaints?.resolved|| 0, color:"#16a34a", dot:"#22c55e"  },
                  ].map(s => (
                    <div key={s.label} className="stat-row">
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <span style={{ width:7, height:7, borderRadius:"50%", background:s.dot, flexShrink:0 }} />
                        <span className="font-body" style={{ fontSize:13, color:"#475569", fontWeight:500 }}>{s.label}</span>
                      </div>
                      <span className="font-display" style={{ fontSize:22, fontWeight:700, color:s.color, lineHeight:1 }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Extensions */}
            <div className="summary-card slide-in" style={{ animationDelay:"0.43s" }}>
              <div style={{ height:3, background:"linear-gradient(90deg,#6366f1,#818cf8)" }} />
              <div style={{ padding:"22px 24px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:"#eef2ff", border:"1.5px solid #c7d2fe", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>📆</div>
                  <h2 className="font-display text-slate-900" style={{ fontSize:20, fontWeight:700 }}>Extension Requests</h2>
                </div>

                <div style={{ background:"#eef2ff", border:"1.5px solid #c7d2fe", borderRadius:16, padding:"20px", textAlign:"center" }}>
                  <p className="font-display" style={{ fontSize:52, fontWeight:700, color:"#4f46e5", lineHeight:1 }}>
                    {data.extensions?.pending || 0}
                  </p>
                  <p className="font-body" style={{ fontSize:11, fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase", color:"#818cf8", marginTop:6 }}>
                    Pending Requests
                  </p>
                </div>

                <p className="font-body" style={{ fontSize:12, color:"#94a3b8", marginTop:12, textAlign:"center" }}>
                  {data.extensions?.pending > 0
                    ? "Your extension request is under review."
                    : "No pending extension requests."}
                </p>
              </div>
            </div>
          </div>

          {/* ── Announcements ── */}
          <div className="summary-card slide-in" style={{ animationDelay:"0.5s" }}>
            <div style={{ height:3, background:"linear-gradient(90deg,#4f46e5,#818cf8,#4f46e5)" }} />
            <div style={{ padding:"24px 28px" }}>

              {/* Header */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, flexWrap:"wrap", gap:8 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:"#eef2ff", border:"1.5px solid #c7d2fe", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17 }}>📢</div>
                  <div>
                    <h2 className="font-display text-slate-900" style={{ fontSize:22, fontWeight:700, lineHeight:1 }}>Recent Announcements</h2>
                    <p className="font-body text-slate-400" style={{ fontSize:11, marginTop:2 }}>
                      {data.announcements?.length || 0} announcement{data.announcements?.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <div style={{ background:"#eef2ff", border:"1.5px solid #c7d2fe", borderRadius:100, padding:"4px 14px" }}>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:700, color:"#4f46e5" }}>
                    Latest Updates
                  </span>
                </div>
              </div>

              {/* Empty */}
              {(!data.announcements || data.announcements.length === 0) ? (
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"32px 0", gap:10 }}>
                  <span style={{ fontSize:44 }}>🔔</span>
                  <p className="font-display text-slate-700" style={{ fontSize:18, fontWeight:600 }}>No announcements yet</p>
                  <p className="font-body text-slate-400" style={{ fontSize:12 }}>Check back later for updates from administration.</p>
                </div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {data.announcements.map((announcement, i) => {
                    const clr = announcementColors[i % announcementColors.length];
                    return (
                      <div key={announcement.id} className="ann-card slide-in"
                        style={{ background:clr.bg, borderColor:clr.badge, animationDelay:`${0.55 + i * 0.07}s`, borderLeftWidth:3, borderLeftColor:clr.bar, borderLeftStyle:"solid" }}>
                        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10, flexWrap:"wrap" }}>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:5 }}>
                              <h3 className="font-display text-slate-900" style={{ fontSize:17, fontWeight:700, lineHeight:1.2 }}>
                                {announcement.title}
                              </h3>
                              <span style={{ background:clr.badge, color:clr.badgeText, fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", borderRadius:100, padding:"2px 8px", flexShrink:0 }}>
                                Notice
                              </span>
                            </div>
                            <p className="font-body" style={{ fontSize:13, color:"#475569", lineHeight:1.7 }}>
                              {announcement.description}
                            </p>
                          </div>
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:10 }}>
                          <span style={{ fontSize:11 }}>🕒</span>
                          <span className="font-body" style={{ fontSize:11, color:"#94a3b8", fontWeight:500 }}>
                            {new Date(announcement.createdAt).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </StudentLayout>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <p className="text-2xl font-bold text-gray-800 mt-2">{value || "-"}</p>
  </div>
);

export default StudentDashboard;