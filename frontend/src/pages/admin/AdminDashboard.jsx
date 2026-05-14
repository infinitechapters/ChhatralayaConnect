import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getDashboard } from "../../services/adminApi";

const AdminDashboard = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const occupancy = (data?.totalStudents && data?.totalRooms)
    ? Math.round((data.totalStudents / data.totalRooms) * 100)
    : 0;

  const statCards = [
    {
      label: "Total Students",
      value: data?.totalStudents || 0,
      icon: "🎓",
      from: "#4f46e5", to: "#6366f1",
      shadow: "rgba(99,102,241,0.35)",
      trend: "+12% this month",
    },
    {
      label: "Pending Complaints",
      value: data?.pendingComplaints || 0,
      icon: "⚠️",
      from: "#ea580c", to: "#f97316",
      shadow: "rgba(249,115,22,0.35)",
      trend: data?.pendingComplaints > 0 ? "Needs attention" : "All clear",
    },
    {
      label: "Total Rooms",
      value: data?.totalRooms || 0,
      icon: "🏠",
      from: "#059669", to: "#10b981",
      shadow: "rgba(16,185,129,0.35)",
      trend: `${occupancy}% occupied`,
    },
  ];

  return (
    <AdminLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        @keyframes countUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .stat-value { animation: countUp 0.6s cubic-bezier(0.22,1,0.36,1) both; }

        .stat-card {
          position: relative; overflow: hidden;
          border-radius: 20px; padding: 28px;
          color: white; cursor: default;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
        }
        .stat-card:hover {
          transform: translateY(-4px) scale(1.015);
        }
        .stat-card::before {
          content: '';
          position: absolute; top: -30px; right: -30px;
          width: 120px; height: 120px; border-radius: 50%;
          background: rgba(255,255,255,0.10);
          pointer-events: none;
        }
        .stat-card::after {
          content: '';
          position: absolute; bottom: -20px; right: 20px;
          width: 80px; height: 80px; border-radius: 50%;
          background: rgba(255,255,255,0.07);
          pointer-events: none;
        }

        .insight-card {
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 16px;
          padding: 22px 24px;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .insight-card:hover {
          border-color: #c7d2fe;
          box-shadow: 0 4px 20px rgba(99,102,241,0.08);
          transform: translateY(-2px);
        }

        .progress-bar-track {
          background: #e2e8f0;
          border-radius: 100px;
          height: 8px;
          overflow: hidden;
          margin-top: 10px;
        }
        .progress-bar-fill {
          height: 100%;
          border-radius: 100px;
          background: linear-gradient(90deg, #4f46e5, #818cf8);
          transition: width 1s cubic-bezier(0.22,1,0.36,1);
        }
      `}</style>

      <div className="font-body min-h-screen bg-slate-50 p-2">

        {/* ── Page Header ── */}
        <div className="mb-9">
          <div className="flex items-center gap-2 mb-2">
            <div style={{ width:3, height:22, borderRadius:4, background:"linear-gradient(180deg,#4f46e5,#818cf8)" }} />
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#6366f1" }}>
              Overview
            </span>
          </div>
          <h1 className="font-display text-slate-900" style={{ fontSize:38, fontWeight:700, lineHeight:1.1 }}>
            Admin Dashboard
          </h1>
          <p className="font-body text-slate-400 text-sm mt-1.5">
            A live snapshot of hostel statistics and pending activities.
          </p>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {statCards.map((card, i) => (
            <div
              key={i}
              className="stat-card"
              style={{
                background: `linear-gradient(135deg, ${card.from}, ${card.to})`,
                boxShadow: `0 8px 32px ${card.shadow}`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p style={{ fontSize:11, fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", opacity:0.75, fontFamily:"'DM Sans',sans-serif" }}>
                    {card.label}
                  </p>
                </div>
                <div style={{ fontSize:28, lineHeight:1, filter:"drop-shadow(0 2px 6px rgba(0,0,0,0.15))" }}>
                  {card.icon}
                </div>
              </div>

              {/* Value */}
              <div className="stat-value font-display" style={{ fontSize:52, fontWeight:700, lineHeight:1, letterSpacing:"-1px", fontFamily:"'Cormorant Garamond',serif", animationDelay:`${0.2 + i*0.1}s` }}>
                {card.value}
              </div>

              {/* Trend */}
              <div style={{ marginTop:10, fontSize:12, fontWeight:500, opacity:0.75, fontFamily:"'DM Sans',sans-serif", display:"flex", alignItems:"center", gap:4 }}>
                <span style={{ fontSize:10 }}>●</span>
                {card.trend}
              </div>
            </div>
          ))}
        </div>

        {/* ── Quick Insights ── */}
        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-lg shadow-slate-200/50 overflow-hidden">

          {/* Card top accent */}
          <div style={{ height:3, background:"linear-gradient(90deg,#4f46e5,#818cf8,#4f46e5)", backgroundSize:"200% 100%" }} />

          <div className="p-7">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div style={{ width:14, height:14, borderRadius:"50%", background:"linear-gradient(135deg,#4f46e5,#818cf8)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <div style={{ width:5, height:5, borderRadius:"50%", background:"white" }} />
                  </div>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#94a3b8" }}>
                    Insights
                  </span>
                </div>
                <h2 className="font-display text-slate-900" style={{ fontSize:24, fontWeight:700 }}>
                  Quick Overview
                </h2>
              </div>
              <div style={{ background:"#f1f5f9", borderRadius:10, padding:"6px 14px" }}>
                <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:600, color:"#64748b" }}>
                  Live Data
                </span>
              </div>
            </div>

            {/* Insight Cards */}
            <div className="grid md:grid-cols-2 gap-4">

              {/* Room Occupancy */}
              <div className="insight-card">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-body font-semibold text-slate-800 text-sm">Room Occupancy</p>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:700, color:"#4f46e5", background:"#eef2ff", borderRadius:100, padding:"2px 10px" }}>
                    {occupancy}%
                  </span>
                </div>
                <p className="font-body text-slate-400 text-xs mb-3">
                  {data?.totalStudents || 0} students across {data?.totalRooms || 0} rooms
                </p>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{ width:`${Math.min(occupancy, 100)}%` }} />
                </div>
                <div className="flex justify-between mt-2">
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, color:"#94a3b8" }}>0%</span>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, color:"#94a3b8" }}>100%</span>
                </div>
              </div>

              {/* Complaint Status */}
              <div className="insight-card">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-body font-semibold text-slate-800 text-sm">Complaint Status</p>
                  <span style={{
                    fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:700,
                    borderRadius:100, padding:"2px 10px",
                    background: data?.pendingComplaints > 0 ? "#fff7ed" : "#f0fdf4",
                    color:       data?.pendingComplaints > 0 ? "#ea580c"  : "#059669",
                  }}>
                    {data?.pendingComplaints > 0 ? "Pending" : "Resolved"}
                  </span>
                </div>
                <p className="font-body text-slate-400 text-xs mb-4">
                  {data?.pendingComplaints > 0
                    ? `${data.pendingComplaints} complaint${data.pendingComplaints > 1 ? "s" : ""} require your attention`
                    : "All complaints have been resolved"}
                </p>

                {/* Status pill row */}
                <div className="flex items-center gap-2">
                  <div style={{
                    display:"flex", alignItems:"center", gap:6,
                    background: data?.pendingComplaints > 0 ? "#fff7ed" : "#f0fdf4",
                    border: `1px solid ${data?.pendingComplaints > 0 ? "#fed7aa" : "#bbf7d0"}`,
                    borderRadius:10, padding:"8px 14px", width:"100%",
                  }}>
                    <span style={{ fontSize:16 }}>{data?.pendingComplaints > 0 ? "⚠️" : "🎉"}</span>
                    <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:500, color: data?.pendingComplaints > 0 ? "#9a3412" : "#166534" }}>
                      {data?.pendingComplaints > 0
                        ? "Action required on pending issues"
                        : "All complaints resolved"}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;