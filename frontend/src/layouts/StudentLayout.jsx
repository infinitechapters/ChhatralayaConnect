// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const StudentLayout = ({ children }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">

//       {/* Sidebar */}
//       <div className="w-64 bg-blue-700 text-white p-6 hidden md:block">

//         <h2 className="text-2xl font-bold mb-8">🎓 Student Panel</h2>

//         <nav className="space-y-4">
//           <Link to="/student/dashboard" className="block hover:text-gray-200">
//             Dashboard
//           </Link>

//           <Link to="/student/complaints" className="block hover:text-gray-200">
//             Complaints
//           </Link>

//           <Link to="/student/extensions" className="block hover:text-gray-200">
//             Extension Requests
//           </Link>

//           <Link to="/student/profile" className="block hover:text-gray-200">
//             Profile
//           </Link>
//         </nav>

//         <button
//           onClick={handleLogout}
//           className="mt-10 bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
//         >
//           Logout
//         </button>

//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         {children}
//       </div>

//     </div>
//   );
// };

// export default StudentLayout;




import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const StudentLayout = ({ children }) => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: "/student/dashboard",  label: "Dashboard",          icon: "⊞" },
    { to: "/student/complaints", label: "Complaints",         icon: "⚠️" },
    { to: "/student/extensions", label: "Extension Requests", icon: "📆" },
    { to: "/student/profile",    label: "My Profile",         icon: "👤" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        .sidebar {
          width: 240px;
          min-height: 100vh;
          background: linear-gradient(175deg, #1e1b4b 0%, #312e81 50%, #3730a3 100%);
          display: flex; flex-direction: column;
          position: sticky; top: 0; height: 100vh;
          border-right: 1px solid rgba(255,255,255,0.06);
          box-shadow: 4px 0 24px rgba(0,0,0,0.18);
          transition: width 0.3s cubic-bezier(0.22,1,0.36,1);
          flex-shrink: 0;
          z-index: 40;
        }
        .sidebar.collapsed { width: 70px; }

        .nav-link {
          display: flex; align-items: center; gap: 11px;
          padding: 10px 14px; border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap; overflow: hidden;
          position: relative;
        }
        .nav-link:hover {
          color: white;
          background: rgba(255,255,255,0.09);
        }
        .nav-link.active {
          color: white;
          background: rgba(255,255,255,0.13);
          font-weight: 600;
        }
        .nav-link.active::before {
          content: '';
          position: absolute; left: 0; top: 20%; bottom: 20%;
          width: 3px; border-radius: 0 3px 3px 0;
          background: #a5b4fc;
        }
        .nav-icon { font-size: 16px; flex-shrink: 0; width: 20px; text-align: center; }
        .nav-label { transition: opacity 0.2s, width 0.3s; }
        .sidebar.collapsed .nav-label { opacity: 0; width: 0; overflow: hidden; }

        .logout-btn {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px; border-radius: 12px; border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 600;
          color: #fca5a5;
          background: rgba(239,68,68,0.10);
          border: 1px solid rgba(239,68,68,0.20);
          cursor: pointer; width: 100%;
          transition: all 0.2s ease;
          white-space: nowrap; overflow: hidden;
        }
        .logout-btn:hover {
          background: rgba(239,68,68,0.20);
          border-color: rgba(239,68,68,0.35);
          color: #f87171;
        }
        .sidebar.collapsed .logout-btn span { display: none; }

        .collapse-btn {
          width: 28px; height: 28px; border-radius: 8px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.10);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(255,255,255,0.5);
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .collapse-btn:hover { background: rgba(255,255,255,0.14); color: white; }

        /* Mobile top bar */
        .mobile-bar {
          display: none;
          position: sticky; top: 0; z-index: 50;
          background: rgba(30,27,75,0.97);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding: 0 20px; height: 54px;
          align-items: center; justify-content: space-between;
          box-shadow: 0 2px 12px rgba(0,0,0,0.2);
        }
        @media(max-width:767px) {
          .mobile-bar { display: flex; }
          .sidebar { display: none; }
        }

        .mobile-drawer {
          position: fixed; inset: 0; z-index: 60;
          display: flex;
        }
        .drawer-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.5); backdrop-filter: blur(2px);
        }
        .drawer-panel {
          position: relative; z-index: 1;
          width: 240px; min-height: 100vh;
          background: linear-gradient(175deg,#1e1b4b,#312e81,#3730a3);
          display: flex; flex-direction: column;
          padding: 20px 16px;
          box-shadow: 8px 0 32px rgba(0,0,0,0.3);
          animation: slideRight 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes slideRight {
          from { transform: translateX(-100%); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }

        .section-divider {
          height: 1px; background: rgba(255,255,255,0.06);
          margin: 12px 0;
        }
      `}</style>

      <div style={{ display:"flex", minHeight:"100vh", background:"#f8fafc" }}>

        {/* ── Desktop Sidebar ── */}
        <div className={`sidebar font-body ${collapsed ? "collapsed" : ""}`}>

          {/* Logo */}
          <div style={{ padding:"22px 16px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, overflow:"hidden", flex:1 }}>
              <div onClick={()=> navigate("/")} style={{ width:34, height:34, borderRadius:10, background:"rgba(255,255,255,0.14)", border:"1px solid rgba(255,255,255,0.20)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond',serif",cursor:"pointer", fontWeight:700, fontSize:16, color:"white", flexShrink:0 }}>
                H
              </div>
              {!collapsed && (
                <div style={{ overflow:"hidden" }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, fontWeight:700, color:"white", lineHeight:1 }}>
                    Student Portal
                  </div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:9, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,0.32)", marginTop:3 }}>
                    JEC · Jabalpur
                  </div>
                </div>
              )}
            </div>
            <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                {collapsed
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                }
              </svg>
            </button>
          </div>

          {/* Role pill */}
          {!collapsed && (
            <div style={{ padding:"0 16px", marginBottom:16 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:100, padding:"4px 10px" }}>
                <span style={{ width:5, height:5, borderRadius:"50%", background:"#6ee7b7", boxShadow:"0 0 6px #6ee7b7" }} />
                <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(255,255,255,0.55)" }}>
                  STUDENT
                </span>
              </div>
            </div>
          )}

          <div className="section-divider" />

          {/* Nav label */}
          {!collapsed && (
            <div style={{ padding:"8px 16px 4px", fontFamily:"'DM Sans',sans-serif", fontSize:9, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,0.25)" }}>
              Navigation
            </div>
          )}

          {/* Nav Links */}
          <nav style={{ padding:"4px 8px", flex:1, display:"flex", flexDirection:"column", gap:2 }}>
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${isActive(link.to) ? "active" : ""}`}
                title={collapsed ? link.label : ""}
              >
                <span className="nav-icon">{link.icon}</span>
                <span className="nav-label">{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="section-divider" />

          {/* Logout */}
          <div style={{ padding:"8px 8px 20px" }}>
            <button onClick={handleLogout} className="logout-btn">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ flexShrink:0 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* ── Mobile Top Bar ── */}
        <div className="mobile-bar">
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:30, height:30, borderRadius:9, background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:14, color:"white" }}>H</div>
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, fontWeight:700, color:"white" }}>Student Portal</span>
          </div>
          <button
            onClick={() => setMobileOpen(true)}
            style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", gap:5, padding:4 }}
          >
            {[0,1,2].map(i => (
              <span key={i} style={{ display:"block", width:20, height:1.5, background:"rgba(255,255,255,0.7)", borderRadius:2 }} />
            ))}
          </button>
        </div>

        {/* ── Mobile Drawer ── */}
        {mobileOpen && (
          <div className="mobile-drawer">
            <div className="drawer-overlay" onClick={() => setMobileOpen(false)} />
            <div className="drawer-panel">
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:32, height:32, borderRadius:10, background:"rgba(255,255,255,0.14)", border:"1px solid rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:15, color:"white" }}>H</div>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, fontWeight:700, color:"white" }}>Student Portal</span>
                </div>
                <button onClick={() => setMobileOpen(false)}
                  style={{ width:28, height:28, borderRadius:8, background:"rgba(255,255,255,0.1)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:14 }}>
                  ✕
                </button>
              </div>

              <div className="section-divider" />

              <nav style={{ display:"flex", flexDirection:"column", gap:2, flex:1, padding:"8px 0" }}>
                {navLinks.map(link => (
                  <Link key={link.to} to={link.to}
                    className={`nav-link ${isActive(link.to) ? "active" : ""}`}
                    onClick={() => setMobileOpen(false)}>
                    <span className="nav-icon">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="section-divider" />
              <div style={{ paddingTop:8 }}>
                <button onClick={handleLogout} className="logout-btn">
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Main Content ── */}
        <div style={{ flex:1, minWidth:0, overflowY:"auto" }}>
          {children}
        </div>

      </div>
    </>
  );
};

export default StudentLayout;