// import React from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = ({ role }) => {

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("role");

//     navigate("/login");
//   };

//   const basePath = role.toLowerCase();

//   return (
//     <nav className="bg-blue-600 text-white px-8 py-4 shadow-md flex justify-between items-center">

//       {/* Logo */}
//       <div className="text-xl font-semibold">
//         {role === "ADMIN" ? "Admin Portal" : "Student Portal"}
//       </div>

//       {/* Links */}
//       <div className="flex gap-6 items-center font-medium">

//         <Link
//           to={`/${basePath}/dashboard`}
//           className="hover:text-gray-200 transition"
//         >
//           Dashboard
//         </Link>

//         {role === "ADMIN" && (
//           <Link
//             to="/admin/students"
//             className="hover:text-gray-200 transition"
//           >
//             Students
//           </Link>
//         )}


//         {role === "ADMIN" && (
//           <Link
//             to="/admin/add-student"
//             className="hover:text-gray-200 transition"
//           >
//             Add Student
//           </Link>
//         )}

//         <Link
//           to={`/${basePath}/complaints`}
//           className="hover:text-gray-200 transition"
//         >
//           Complaints
//         </Link>

//         <Link
//           to={`/${basePath}/extensions`}
//           className="hover:text-gray-200 transition"
//         >
//           Extension Request
//         </Link>

//         <Link
//           to={`/${basePath}/announcements`}
//           className="hover:text-gray-200 transition"
//         >
//           Announcements
//         </Link>

//         <button
//           onClick={handleLogout}
//           className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
//         >
//           Logout
//         </button>

//       </div>

//     </nav>
//   );
// };

// export default Navbar;



import React, { useState, useEffect } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ role }) => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const basePath = role.toLowerCase();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: `/${basePath}/dashboard`,     label: "Dashboard",         icon: "⊞",  always: true  },
    { to: "/admin/students",            label: "Students",          icon: "👥", admin: true   },
    { to: "/admin/add-student",         label: "Add Student",       icon: "➕", admin: true   },
    { to: `/${basePath}/complaints`,    label: "Complaints",        icon: "⚠️", always: true  },
    { to: `/${basePath}/extensions`,    label: "Extensions",        icon: "📆", always: true  },
    { to: `/${basePath}/announcements`, label: "Announcements",     icon: "📢", always: true  },
  ].filter(l => l.always || (l.admin && role === "ADMIN"));

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        .nav-font { font-family: 'DM Sans', sans-serif; }
        .nav-display { font-family: 'Cormorant Garamond', Georgia, serif; }

        .nav-link {
          position: relative;
          display: flex; align-items: center; gap: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.65);
          padding: 6px 10px; border-radius: 10px;
          transition: all 0.2s ease;
          white-space: nowrap;
          text-decoration: none;
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
        .nav-link.active::after {
          content: '';
          position: absolute; bottom: -2px; left: 50%; transform: translateX(-50%);
          width: 16px; height: 2px; border-radius: 2px;
          background: #a5b4fc;
        }

        .logout-btn {
          display: flex; align-items: center; gap: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.07em; text-transform: uppercase;
          color: white; border: none; cursor: pointer;
          background: rgba(239,68,68,0.18);
          border: 1px solid rgba(239,68,68,0.35);
          padding: 7px 16px; border-radius: 10px;
          transition: all 0.22s ease;
        }
        .logout-btn:hover {
          background: rgba(239,68,68,0.30);
          border-color: rgba(239,68,68,0.55);
          transform: translateY(-1px);
        }

        .mobile-link {
          display: flex; align-items: center; gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 500;
          color: rgba(255,255,255,0.75);
          padding: 11px 16px; border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s;
        }
        .mobile-link:hover, .mobile-link.active {
          background: rgba(255,255,255,0.10);
          color: white;
        }

        .role-pill {
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 100px; padding: 3px 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.65);
        }
      `}</style>

      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: scrolled
          ? "rgba(30,27,75,0.97)"
          : "linear-gradient(135deg, #312e81, #4338ca)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.25)" : "0 2px 12px rgba(0,0,0,0.15)",
        transition: "all 0.4s ease",
      }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px", height:58, display:"flex", alignItems:"center", justifyContent:"space-between" }}>

          {/* ── Logo ── */}
          <div style={{ display:"flex", alignItems:"center", gap:10 }} >
            <div onClick={()=>navigate("/")}  style={{ width:34, height:34,cursor:"pointer", borderRadius:10, background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.25)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:16, color:"white" }}>
              H
            </div>
            <div>
              <div className="nav-display" style={{ fontSize:15, fontWeight:700, color:"white", lineHeight:1 }}>
                {role === "ADMIN" ? "Admin Portal" : "Student Portal"}
              </div>
              <div className="role-pill" style={{ marginTop:3 }}>
                <span style={{ width:5, height:5, borderRadius:"50%", background: role === "ADMIN" ? "#a5b4fc" : "#6ee7b7" }} />
                {role}
              </div>
            </div>
          </div>

          {/* ── Desktop Links ── */}
          <div className="hidden md:flex" style={{ alignItems:"center", gap:2 }}>
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${isActive(link.to) ? "active" : ""}`}
              >
                <span style={{ fontSize:13 }}>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Right: Logout + Mobile Toggle ── */}
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            {/* Logout — desktop */}
            <button onClick={handleLogout} className="logout-btn hidden md:flex">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
              </svg>
              Logout
            </button>

            {/* Mobile toggle */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background:"none", border:"none", cursor:"pointer" }}
            >
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display:"block", width:20, height:1.5,
                  background:"rgba(255,255,255,0.75)",
                  borderRadius:2,
                  transition:"all 0.3s",
                  transform: i===0 && menuOpen ? "rotate(45deg) translate(3px,3px)" :
                             i===1 && menuOpen ? "scaleX(0)" :
                             i===2 && menuOpen ? "rotate(-45deg) translate(3px,-3px)" : "none",
                  opacity: i===1 && menuOpen ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </div>

        {/* ── Mobile Dropdown ── */}
        <div style={{
          overflow:"hidden", transition:"max-height 0.35s cubic-bezier(0.22,1,0.36,1)",
          maxHeight: menuOpen ? "480px" : "0px",
          borderTop: menuOpen ? "1px solid rgba(255,255,255,0.07)" : "none",
        }}>
          <div style={{ padding:"12px 16px 16px", display:"flex", flexDirection:"column", gap:4 }}>
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`mobile-link ${isActive(link.to) ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                <span style={{ fontSize:16 }}>{link.icon}</span>
                {link.label}
              </Link>
            ))}
            {/* Logout mobile */}
            <button
              onClick={handleLogout}
              style={{ display:"flex", alignItems:"center", gap:10, fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:600, color:"#fca5a5", background:"rgba(239,68,68,0.10)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:12, padding:"11px 16px", marginTop:4, cursor:"pointer", transition:"all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background="rgba(239,68,68,0.18)"}
              onMouseLeave={e => e.currentTarget.style.background="rgba(239,68,68,0.10)"}
            >
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;