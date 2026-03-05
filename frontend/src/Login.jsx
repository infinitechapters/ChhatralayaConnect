// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "./services/api";
// import { jwtDecode } from "jwt-decode";

// function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     userId: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // 🔐 If already logged in → redirect automatically
//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     const role = localStorage.getItem("role");

//     if (token) {
//     const decoded = jwtDecode(token);

//     if (decoded.exp * 1000 > Date.now()) {
//       if (role === "ADMIN") navigate("/admin/dashboard");
//       if (role === "STUDENT") navigate("/student/dashboard");
//     } else {
//       localStorage.clear();
//     }
//   }
// }, []);
//   const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormData((prev) => ({
//     ...prev,
//     [name]: value,
//   }));
// };

//  const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!formData.userId || !formData.password) {
//     setError("All fields are required");
//     return;
//   }

//   setError("");
//   setLoading(true);

//   try {
//     const response = await API.post("/auth/login", formData);

//     const data = response.data;

//     // Save tokens
//     localStorage.setItem("accessToken", data.accessToken);
//     localStorage.setItem("refreshToken", data.refreshToken);
//     localStorage.setItem("role", data.role);

//     // Redirect
//     if (data.role === "STUDENT") {
//       navigate("/student/dashboard");
//     } else if (data.role === "ADMIN") {
//       navigate("/admin/dashboard");
//     }

//   } catch (err) {
//     setError(
//       err.response?.data?.message || "Login failed. Please try again."
//     );
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-900 to-blue-600 px-4">

//       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">

//         <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
//           Portal Login
//         </h2>

//         {error && (
//           <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm text-center">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">

//           {/* User ID */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Enrollment No / Admin Code
//             </label>
//             <input
//               type="text"
//               name="userId"
//               value={formData.userId}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//               placeholder="Enter your ID"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//               placeholder="Enter password"
//             />
//           </div>

//           {/* Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "./services/api";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);

    const token = localStorage.getItem("accessToken");
    const role  = localStorage.getItem("role");

    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 > Date.now()) {
        if (role === "ADMIN")   navigate("/admin/dashboard");
        if (role === "STUDENT") navigate("/student/dashboard");
      } else {
        localStorage.clear();
      }
    }

    return () => clearTimeout(t);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userId || !formData.password) {
      setError("All fields are required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await API.post("/auth/login", formData);
      const data = response.data;

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("role", data.role);

      if (data.role === "STUDENT") navigate("/student/dashboard");
      else if (data.role === "ADMIN") navigate("/admin/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        .login-bg {
          min-height: 100vh;
          display: flex;
          position: relative;
          overflow: hidden;
          background: #0f0c29;
        }

        /* Animated gradient orbs */
        .orb {
          position: absolute; border-radius: 50%;
          filter: blur(80px); opacity: 0.45;
          animation: drift 10s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .orb-1 { width:500px; height:500px; background:#4338ca; top:-120px; left:-100px; animation-duration:12s; }
        .orb-2 { width:400px; height:400px; background:#7c3aed; bottom:-80px; right:-80px; animation-duration:9s; animation-delay:2s; }
        .orb-3 { width:300px; height:300px; background:#1d4ed8; top:40%; right:38%; animation-duration:14s; animation-delay:1s; }

        @keyframes drift {
          0%   { transform: translate(0,0) scale(1); }
          100% { transform: translate(40px,30px) scale(1.08); }
        }

        /* Grid texture */
        .grid-texture {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 52px 52px;
          pointer-events: none;
        }

        /* Left panel */
        .left-panel {
          flex: 1; display:none;
          flex-direction:column; justify-content:center;
          padding: 60px 64px; position:relative; z-index:1;
        }
        @media(min-width:900px) { .left-panel { display:flex; } }

        /* Right panel (form) */
        .right-panel {
          width: 100%; max-width: 480px;
          display:flex; flex-direction:column; justify-content:center;
          padding: 40px 36px;
          margin: auto;
          position: relative; z-index: 2;
        }
        @media(min-width:900px) {
          .right-panel {
            background: rgba(255,255,255,0.04);
            backdrop-filter: blur(20px);
            border-left: 1px solid rgba(255,255,255,0.07);
            min-height: 100vh;
            padding: 0 56px;
          }
        }

        .form-card {
          background: white;
          border-radius: 24px;
          padding: 40px 36px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.35);
        }
        @media(min-width:900px) {
          .form-card {
            background: transparent;
            border-radius: 0; padding: 0;
            box-shadow: none;
          }
        }

        .field-wrap { position: relative; }
        .field-input {
          width: 100%;
          padding: 13px 44px 13px 44px;
          border: 1.5px solid rgba(255,255,255,0.12);
          border-radius: 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; color: white;
          background: rgba(255,255,255,0.07);
          outline: none;
          transition: all 0.25s ease;
          box-sizing: border-box;
        }
        .field-input::placeholder { color: rgba(255,255,255,0.3); }
        .field-input:focus {
          border-color: rgba(165,180,252,0.6);
          background: rgba(255,255,255,0.11);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.18);
        }
        /* Mobile form card inputs */
        @media(max-width:899px) {
          .field-input {
            border-color: #e2e8f0;
            color: #1e293b;
            background: #f8fafc;
          }
          .field-input::placeholder { color: #94a3b8; }
          .field-input:focus {
            border-color: #6366f1;
            background: #fff;
            box-shadow: 0 0 0 3px rgba(99,102,241,0.10);
          }
        }

        .field-icon {
          position:absolute; left:14px; top:50%;
          transform:translateY(-50%); pointer-events:none;
          font-size:15px;
        }

        .eye-btn {
          position:absolute; right:14px; top:50%;
          transform:translateY(-50%);
          background:none; border:none; cursor:pointer;
          color:rgba(255,255,255,0.4); padding:2px;
          transition:color 0.2s;
        }
        .eye-btn:hover { color:rgba(255,255,255,0.75); }
        @media(max-width:899px) {
          .eye-btn { color:#94a3b8; }
          .eye-btn:hover { color:#475569; }
        }

        .submit-btn {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg,#4f46e5,#7c3aed);
          color: white; border: none; border-radius: 14px;
          font-family: 'DM Sans',sans-serif;
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 6px 24px rgba(99,102,241,0.45);
          transition: all 0.25s ease;
          display: flex; align-items:center; justify-content:center; gap:8px;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(99,102,241,0.55);
        }
        .submit-btn:disabled { opacity:0.6; cursor:not-allowed; }

        .label-text {
          font-family:'DM Sans',sans-serif;
          font-size:11px; font-weight:700;
          letter-spacing:0.14em; text-transform:uppercase;
          color:rgba(255,255,255,0.45);
          display:block; margin-bottom:7px;
        }
        @media(max-width:899px) { .label-text { color:#64748b; } }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-1 { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
        .fade-2 { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.22s both; }
        .fade-3 { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.34s both; }
        .fade-4 { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.46s both; }

        .stat-item {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; padding:18px 20px;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width:16px; height:16px; border-radius:50%;
          border:2px solid rgba(255,255,255,0.3);
          border-top-color:white;
          animation: spin 0.7s linear infinite;
        }
      `}</style>

      <div className="login-bg">

        {/* Background orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-texture" />

        {/* ── Left Panel ── */}
        <div className="left-panel">

          {/* Logo */}
          <div className="fade-1" style={{display:"flex",alignItems:"center",gap:12,marginBottom:64}}>
            <div style={{width:42,height:42,borderRadius:14,background:"rgba(255,255,255,0.12)",border:"1px solid rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Cormorant Garamond',serif",fontWeight:700,fontSize:20,color:"white"}}>
              H
            </div>
            <div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,fontWeight:700,color:"white",lineHeight:1}}>HostelMS</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.35)",marginTop:3}}>JEC · Jabalpur</div>
            </div>
          </div>

          {/* Hero text */}
          <div className="fade-2" style={{marginBottom:48}}>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(165,180,252,0.8)",marginBottom:14}}>
              Welcome Back
            </p>
            <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:52,fontWeight:700,color:"white",lineHeight:1.08,letterSpacing:"-0.5px",marginBottom:16}}>
              Manage your<br/>
              <em style={{fontStyle:"normal",background:"linear-gradient(90deg,#a5b4fc,#c4b5fd)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                hostel with ease
              </em>
            </h1>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"rgba(255,255,255,0.45)",lineHeight:1.8,maxWidth:360}}>
              A centralized platform for JEC residents and administrators. Access rooms, complaints, announcements and more.
            </p>
          </div>

          {/* Stats */}
          <div className="fade-3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,maxWidth:380}}>
            {[
              {v:"500+", l:"Students"},
              {v:"200+", l:"Rooms"},
              {v:"24/7", l:"Support"},
            ].map(s => (
              <div key={s.l} className="stat-item">
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:700,color:"white",lineHeight:1}}>{s.v}</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,fontWeight:600,letterSpacing:"0.14em",textTransform:"uppercase",color:"rgba(255,255,255,0.35)",marginTop:4}}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div className="fade-4" style={{marginTop:"auto",paddingTop:48}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:"#4ade80",boxShadow:"0 0 8px #4ade80"}} />
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"rgba(255,255,255,0.35)",fontWeight:500}}>
                System is live and operational
              </span>
            </div>
          </div>
        </div>

        {/* ── Right Panel (Form) ── */}
        <div className="right-panel">
          <div className="form-card">

            {/* Form header */}
            <div className="fade-1" style={{marginBottom:32,textAlign:"center"}}>
              {/* Mobile logo */}
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:20}} className="md:hidden">
                <div style={{width:36,height:36,borderRadius:11,background:"linear-gradient(135deg,#4f46e5,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Cormorant Garamond',serif",fontWeight:700,fontSize:17,color:"white"}}>H</div>
                <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontWeight:700,color:"#1e293b"}}>HostelMS</span>
              </div>

              <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:34,fontWeight:700,color:"white",lineHeight:1.1,marginBottom:6}}>
                Sign In
              </h2>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"rgba(255,255,255,0.4)"}}>
                Enter your credentials to continue
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="fade-1" style={{display:"flex",alignItems:"flex-start",gap:10,background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:14,padding:"12px 16px",marginBottom:20}}>
                <span style={{fontSize:15,flexShrink:0}}>⚠️</span>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"#fca5a5",fontWeight:500}}>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:18}}>

              {/* User ID */}
              <div className="fade-2">
                <label className="label-text">Enrollment No / Admin Code</label>
                <div className="field-wrap">
                  <span className="field-icon">🎓</span>
                  <input
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    className="field-input"
                    placeholder="Enter your ID"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="fade-3">
                <label className="label-text">Password</label>
                <div className="field-wrap">
                  <span className="field-icon">🔒</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="field-input"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <div className="fade-4" style={{marginTop:4}}>
                <button type="submit" disabled={loading} className="submit-btn">
                  {loading ? (
                    <>
                      <div className="spinner" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

            </form>

            {/* Footer */}
            <div style={{marginTop:28,textAlign:"center"}}>
              <div style={{height:1,background:"rgba(255,255,255,0.07)",marginBottom:20}} />
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"rgba(255,255,255,0.25)"}}>
                © 2026 HostelMS · JEC Jabalpur
              </p>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}

export default Login;