import React, { useEffect, useState } from "react";
import API from "../../services/api";
import StudentLayout from "../../layouts/StudentLayout";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");
  const [error,   setError]   = useState("");

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/students/profile");
      setProfile(res.data);
    } catch (err) { setError("Failed to load profile"); }
  };

  const handleChange = (e) => {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); setError("");
    try {
      await API.put("/students/profile", profile);
      setMessage("Profile submitted successfully! You cannot edit it again.");
      // Re-fetch so isProfileComplete becomes true and locks the form
      await fetchProfile();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  if (!profile) return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100vh", background:"#f8fafc", gap:16 }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ width:44, height:44, borderRadius:"50%", border:"3px solid #e2e8f0", borderTopColor:"#6366f1", animation:"spin 0.8s linear infinite" }} />
      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"#94a3b8", fontWeight:500 }}>Loading your profile...</p>
    </div>
  );

  // ✅ Lock form if all key fields are already filled
  const isProfileComplete = !!(
    profile?.contact &&
    profile?.parentName &&
    profile?.permanentAddress &&
    profile?.parentNumber &&
    profile?.LgName &&
    profile?.LgNumber &&
    profile?.LgAddress
  );

  const initials = profile.name
    ? profile.name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase()
    : "?";

  // ── NEW: profile picture upload ──────────────────────────────
  const handlePicUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setMessage(""); setError("");
    try {
      const form = new FormData();
      form.append("profilePic", file);
      const res = await API.post("/students/profile/picture", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfile(prev => ({ ...prev, profilePic: res.data.profilePic }));
      setMessage("Profile picture updated!");
    } catch (err) {
      setError("Failed to upload picture");
    } finally {
      setUploading(false);
    }
  };


  return (
    <StudentLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        .field-wrap { position: relative; }
        .field-icon {
          position: absolute; left: 13px; top: 50%;
          transform: translateY(-50%); pointer-events: none; font-size: 14px;
        }
        .field-icon-top { position: absolute; left: 13px; top: 13px; pointer-events: none; font-size: 14px; }

        .field-input {
          width: 100%; padding: 11px 14px 11px 40px;
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
        .field-input:disabled {
          background: #f1f5f9; color: #64748b;
          border-color: #e2e8f0; cursor: not-allowed;
        }
        textarea.field-input {
          padding-top: 11px; resize: vertical; min-height: 90px;
        }
        textarea.field-input:disabled {
          background: #f1f5f9; color: #64748b;
          border-color: #e2e8f0; cursor: not-allowed; resize: none;
        }

        .submit-btn {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: white; border: none; border-radius: 12px;
          font-family: 'DM Sans',sans-serif; font-size: 13px;
          font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; box-shadow: 0 4px 20px rgba(99,102,241,0.35);
          transition: all 0.25s ease;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(99,102,241,0.45);
        }

        .section-label {
          font-family: 'DM Sans',sans-serif; font-size: 10px;
          font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase;
          color: #94a3b8; display: flex; align-items: center; gap: 8px;
          margin-bottom: 16px; margin-top: 4px;
        }
        .section-label::after {
          content: ''; flex: 1; height: 1px; background: #f1f5f9;
        }

        @keyframes slideIn {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .slide-in { animation: slideIn 0.5s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <div className="font-body min-h-screen bg-slate-50" style={{ padding:"28px 24px 60px" }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>

          {/* ── Page Header ── */}
          <div className="slide-in" style={{ marginBottom:28 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <div style={{ width:3, height:22, borderRadius:4, background:"linear-gradient(180deg,#4f46e5,#818cf8)" }} />
              <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#6366f1" }}>
                Student Portal
              </span>
            </div>
            <h1 className="font-display text-slate-900" style={{ fontSize:38, fontWeight:700, lineHeight:1.1 }}>
              My Profile
            </h1>
            <p className="font-body text-slate-400 text-sm mt-1.5">
              View and update your personal and academic information.
            </p>
          </div>

          {/* ── Profile Hero Banner ── */}
          <div className="slide-in" style={{ background:"linear-gradient(135deg,#312e81,#4338ca)", borderRadius:24, padding:"28px 32px", marginBottom:24, position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.08)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", bottom:-30, right:80, width:100, height:100, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.06)", pointerEvents:"none" }} />

            <div style={{ display:"flex", alignItems:"center", gap:20, position:"relative", zIndex:1 }}>
              <div style={{ width:72, height:72, borderRadius:"50%", background:"rgba(255,255,255,0.15)", border:"2px solid rgba(255,255,255,0.3)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:700, color:"white", flexShrink:0 }}>
                {initials}
              </div>
              <div>
                <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:700, color:"white", lineHeight:1.1, marginBottom:4 }}>
                  {profile.name}
                </h2>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {[
                    { icon:"🎓", label: profile.enrollmentNo || "N/A" },
                    { icon:"🏠", label: profile.room?.roomNumber ? `Room ${profile.room.roomNumber}` : "Not Assigned" },
                    { icon:"📚", label: profile.branch || "—" },
                  ].map((tag, i) => (
                    <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:100, padding:"4px 12px", fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:500, color:"rgba(255,255,255,0.8)" }}>
                      <span style={{ fontSize:12 }}>{tag.icon}</span>
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* ✅ Lock badge shown in banner when profile is complete */}
              {isProfileComplete && (
                <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:100, padding:"6px 14px", flexShrink:0 }}>
                  <span style={{ fontSize:14 }}>🔒</span>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.85)", letterSpacing:"0.08em" }}>
                    Profile Locked
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ── Alerts ── */}
          {message && (
            <div className="slide-in" style={{ display:"flex", alignItems:"flex-start", gap:10, background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:12, padding:"12px 16px", marginBottom:16 }}>
              <span style={{ fontSize:15 }}>✅</span>
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"#16a34a", fontWeight:500 }}>{message}</span>
            </div>
          )}
          {error && (
            <div className="slide-in" style={{ display:"flex", alignItems:"flex-start", gap:10, background:"#fef2f2", border:"1px solid #fecaca", borderRadius:12, padding:"12px 16px", marginBottom:16 }}>
              <span style={{ fontSize:15 }}>⚠️</span>
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"#dc2626", fontWeight:500 }}>{error}</span>
            </div>
          )}

          {/* ✅ Already submitted banner */}
          {isProfileComplete && (
            <div className="slide-in" style={{ display:"flex", alignItems:"center", gap:12, background:"#fffbeb", border:"1.5px solid #fde68a", borderRadius:14, padding:"14px 18px", marginBottom:20 }}>
              <span style={{ fontSize:20, flexShrink:0 }}>🔒</span>
              <div>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:700, color:"#92400e", margin:0 }}>
                  Profile already submitted
                </p>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#b45309", margin:"2px 0 0" }}>
                  Your details have been locked. Contact hostel administration for any changes.
                </p>
              </div>
            </div>
          )}

          {/* ── Form Card ── */}
          <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden slide-in">
            <div style={{ height:3, background:"linear-gradient(90deg,#4f46e5,#818cf8,#4f46e5)" }} />
            <div style={{ padding:"28px 30px" }}>
              <form onSubmit={handleSubmit}>

                {/* ── Section: Account Info (always read-only) ── */}
                <div className="section-label">Account Information</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:14, marginBottom:24 }}>
                  <Input label="Full Name"     value={profile.name}          icon="👤" disabled />
                  <Input label="Email Address" value={profile.email}         icon="✉️"  disabled />
                  <Input label="Enrollment No" value={profile.enrollmentNo}  icon="🎓" disabled />
                  <Input label="Room Number"   value={profile.room?.roomNumber ? `Room ${profile.room.roomNumber}` : "Not Assigned"} icon="🚪" disabled />
                  <Input label="Hostel No"     value={profile.room?.hostelNo || "—"} icon="🏠" disabled />
                </div>

                {/* ── Section: Academic Info ── */}
                <div className="section-label">Academic Details</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:14, marginBottom:24 }}>
                  {/* ✅ disabled={isProfileComplete} on all editable fields */}
                  <Input label="Branch"   name="branch"   value={profile.branch   || ""} onChange={handleChange} icon="📚" disabled={isProfileComplete} />
                  <Input label="Year"     name="year"     value={profile.year     || ""} onChange={handleChange} icon="🗓️" disabled={isProfileComplete} />
                  <Input label="Semester" name="semester" value={profile.semester || ""} onChange={handleChange} icon="📅" disabled={isProfileComplete} />
                  <Input label="Contact"  name="contact"  value={profile.contact  || ""} onChange={handleChange} icon="📞" disabled={isProfileComplete} />
                </div>

                {/* Permanent Address */}
                <div style={{ marginBottom:24 }}>
                  <div className="section-label">Permanent Address</div>
                  <div className="field-wrap">
                    <span className="field-icon-top">📍</span>
                    <textarea
                      name="permanentAddress"
                      value={profile.permanentAddress || ""}
                      onChange={handleChange}
                      placeholder="Enter your permanent address..."
                      className="field-input"
                      rows="3"
                      disabled={isProfileComplete}
                    />
                  </div>
                </div>

                {/* ── Section: Parent / Guardian ── */}
                <div className="section-label">Parent & Guardian Details</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:14, marginBottom:24 }}>
                  <Input label="Parent Name"          name="parentName"   value={profile.parentName   || ""} onChange={handleChange} icon="👨‍👩‍👦" disabled={isProfileComplete} />
                  <Input label="Parent Phone"         name="parentNumber" value={profile.parentNumber || ""} onChange={handleChange} icon="📱"    disabled={isProfileComplete} />
                  <Input label="Local Guardian Name"  name="LgName"       value={profile.LgName       || ""} onChange={handleChange} icon="🧑"   disabled={isProfileComplete} />
                  <Input label="Local Guardian Phone" name="LgNumber"     value={profile.LgNumber     || ""} onChange={handleChange} icon="📲"   disabled={isProfileComplete} />
                </div>

                {/* LG Address */}
                <div style={{ marginBottom:28 }}>
                  <div className="section-label">Local Guardian Address</div>
                  <div className="field-wrap">
                    <span className="field-icon-top">📍</span>
                    <textarea
                      name="LgAddress"
                      value={profile.LgAddress || ""}
                      onChange={handleChange}
                      placeholder="Enter local guardian's address..."
                      className="field-input"
                      rows="3"
                      disabled={isProfileComplete}
                    />
                  </div>
                </div>

                {/* ✅ Submit button OR locked message */}
                {isProfileComplete ? (
                  <div style={{ display:"flex", alignItems:"center", gap:12, background:"#f8fafc", border:"1.5px solid #e2e8f0", borderRadius:12, padding:"16px 20px" }}>
                    <div style={{ width:36, height:36, borderRadius:"50%", background:"#fef3c7", border:"1.5px solid #fde68a", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>
                      🔒
                    </div>
                    <div>
                      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:700, color:"#1e293b", margin:0 }}>
                        Profile is locked
                      </p>
                      <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#64748b", margin:"2px 0 0" }}>
                        Contact administration to make any changes to your profile.
                      </p>
                    </div>
                  </div>
                ) : (
                  <button type="submit" className="submit-btn">
                    Save Changes
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                )}

              </form>
            </div>
          </div>

          {/* Footer note */}
          <p style={{ textAlign:"center", fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#94a3b8", marginTop:20 }}>
            {isProfileComplete
              ? "Your profile has been submitted and is locked. Contact admin for changes."
              : "Read-only fields can only be updated by hostel administration."}
          </p>

        </div>
      </div>
    </StudentLayout>
  );
};

/* ── Input Sub-component ── */
const Input = ({ label, icon, ...props }) => (
  <div>
    <label style={{ display:"block", fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:700, letterSpacing:"0.13em", textTransform:"uppercase", color:"#94a3b8", marginBottom:6 }}>
      {label}
    </label>
    <div style={{ position:"relative" }}>
      {icon && <span style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", fontSize:14, pointerEvents:"none" }}>{icon}</span>}
      <input
        {...props}
        className="field-input"
      />
    </div>
  </div>
);

export default StudentProfile;