// import React, { useState } from "react";
// import AdminLayout from "../../layouts/AdminLayout";
// import API from "../../services/api";
// import { useEffect } from "react";

// const AddStudent = () => {

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     branch: "",
//     semester: "",
//     roomId: "",
//     enrollmentNo: "",
//     contact: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [rooms, setRooms] = useState([]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   useEffect(() => {
//   fetchRooms();
// }, []);

// const fetchRooms = async () => {
//   try {
//     const res = await API.get("/admin/vacant-rooms");
//     setRooms(res.data.rooms);
//   } catch (error) {
//     console.error(error);
//   }
// };

//   // 🔥 Generate Rooms 101–122 and 201–228
//   // const generateRooms = () => {
//   //   const rooms = [];

//   //   for (let i = 101; i <= 122; i++) {
//   //     rooms.push({
//   //       id: i,
//   //       roomNumber: i,
//   //       hostelNo: "1 (Ground Floor)",
//   //     });
//   //   }

//   //   for (let i = 201; i <= 228; i++) {
//   //     rooms.push({
//   //       id: i,
//   //       roomNumber: i,
//   //       hostelNo: "1 (First Floor)",
//   //     });
//   //   }

//   //   return rooms;
//   // };

//   // const roomOptions = generateRooms();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setMessage("");
//     setError("");
//     setLoading(true);

//     try {

//       const res = await API.post("/admin/add-student", {
//         ...formData,
//         roomId: Number(formData.roomId),
//         semester: Number(formData.semester),
//       });

//       setMessage(res.data.message || "Student added successfully");

//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//         branch: "",
//         semester: "",
//         roomId: "",
//         enrollmentNo: "",
//         contact: "",
//       });

//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Failed to add student"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
//         <h2 className="text-2xl font-semibold mb-6">
//           🧑‍🎓 Register New Student
//         </h2>

//         {message && (
//           <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
//             {message}
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />

//           <input
//             type="text"
//             name="enrollmentNo"
//             placeholder="Enrollment Number"
//             value={formData.enrollmentNo}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />

//           <input
//             type="text"
//             name="branch"
//             placeholder="Branch"
//             value={formData.branch}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />

//           <input
//             type="number"
//             name="semester"
//             placeholder="Semester"
//             value={formData.semester}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />

//           {/* Room Select */}
//           <select
//   name="roomId"
//   value={formData.roomId}
//   onChange={handleChange}
//   required
// >
//   <option value="">Select Room</option>

//   {rooms.map((room) => (
//     <option key={room.id} value={room.id}>
//       Room {room.roomNumber} - Hostel {room.hostelNo}
//     </option>
//   ))}
// </select>

//           <input
//             type="text"
//             name="contact"
//             placeholder="Contact Number"
//             value={formData.contact}
//             onChange={handleChange}
//             className="border p-2 rounded"
//             required
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//           >
//             {loading ? "Registering..." : "Register Student"}
//           </button>

//         </form>
//       </div>
//     </AdminLayout>
//   );
// };

// export default AddStudent;





import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../services/api";
import { useEffect } from "react";

const AddStudent = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
    semester: "",
    roomId: "",
    enrollmentNo: "",
    contact: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [rooms, setRooms] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await API.get("/admin/vacant-rooms");
      setRooms(res.data.rooms);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/admin/add-student", {
        ...formData,
        roomId: Number(formData.roomId),
        semester: Number(formData.semester),
      });
      setMessage(res.data.message || "Student added successfully");
      setFormData({ name: "", email: "", password: "", branch: "", semester: "", roomId: "", enrollmentNo: "", contact: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "name",         type: "text",     placeholder: "Full Name",          icon: "👤", col: 1 },
    { name: "enrollmentNo", type: "text",     placeholder: "Enrollment Number",  icon: "🎓", col: 1 },
    { name: "email",        type: "email",    placeholder: "Email Address",      icon: "✉️",  col: 1 },
    { name: "password",     type: "password", placeholder: "Password",           icon: "🔒", col: 1 },
    { name: "branch",       type: "text",     placeholder: "Branch (e.g. CSE)",  icon: "📚", col: 1 },
    { name: "semester",     type: "number",   placeholder: "Semester (1–8)",     icon: "📅", col: 1 },
    { name: "contact",      type: "text",     placeholder: "Contact Number",     icon: "📞", col: 1 },
  ];

  return (
    <AdminLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }
        .field-input {
          width: 100%;
          padding: 11px 14px 11px 42px;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          color: #1e293b;
          background: #f8fafc;
          transition: all 0.2s ease;
          outline: none;
        }
        .field-input:focus {
          border-color: #6366f1;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.10);
        }
        .field-input::placeholder { color: #94a3b8; }
        .field-wrap { position: relative; }
        .field-icon {
          position: absolute; left: 13px; top: 50%;
          transform: translateY(-50%);
          font-size: 15px; pointer-events: none;
          line-height: 1;
        }
        select.field-input { cursor: pointer; appearance: none; }
        .submit-btn {
          width: 100%; padding: 13px;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: white; border: none; border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(99,102,241,0.35);
          transition: all 0.25s ease;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(99,102,241,0.45);
          background: linear-gradient(135deg, #4338ca, #6366f1);
        }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #94a3b8; margin-bottom: 12px;
          display: flex; align-items: center; gap: 8px;
        }
        .section-label::before {
          content: '';
          display: inline-block; width: 18px; height: 1px;
          background: #cbd5e1;
        }
      `}</style>

      <div className="min-h-screen bg-slate-50 font-body py-10 px-4">
        <div className="max-w-2xl mx-auto">

          {/* ── Page Header ── */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-5 rounded-full bg-indigo-500" />
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"#6366f1" }}>
                Admin Panel
              </span>
            </div>
            <h1 className="font-display text-slate-900" style={{ fontSize:36, fontWeight:700, lineHeight:1.1 }}>
              Register New Student
            </h1>
            <p className="font-body text-slate-400 text-sm mt-1.5">
              Fill in the details below to onboard a new hostel resident.
            </p>
          </div>

          {/* ── Alerts ── */}
          {message && (
            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl px-5 py-4 mb-6 text-sm font-body font-medium shadow-sm">
              <span className="text-lg leading-none mt-0.5">✅</span>
              <span>{message}</span>
            </div>
          )}
          {error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-5 py-4 mb-6 text-sm font-body font-medium shadow-sm">
              <span className="text-lg leading-none mt-0.5">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* ── Form Card ── */}
          <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden">

            {/* Card top accent */}
            <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400" />

            <div className="p-8">
              <form onSubmit={handleSubmit}>

                {/* Section: Personal Info */}
                <div className="section-label">Personal Information</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-7">

                  {/* Name */}
                  <div className="field-wrap">
                    <span className="field-icon">👤</span>
                    <input type="text" name="name" placeholder="Full Name"
                      value={formData.name} onChange={handleChange}
                      className="field-input" required />
                  </div>

                  {/* Enrollment */}
                  <div className="field-wrap">
                    <span className="field-icon">🎓</span>
                    <input type="text" name="enrollmentNo" placeholder="Enrollment Number"
                      value={formData.enrollmentNo} onChange={handleChange}
                      className="field-input" required />
                  </div>

                  {/* Contact */}
                  <div className="field-wrap md:col-span-2">
                    <span className="field-icon">📞</span>
                    <input type="text" name="contact" placeholder="Contact Number"
                      value={formData.contact} onChange={handleChange}
                      className="field-input" required />
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100 mb-7" />

                {/* Section: Academic Info */}
                <div className="section-label">Academic Details</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-7">

                  {/* Branch */}
                  <div className="field-wrap">
                    <span className="field-icon">📚</span>
                    <input type="text" name="branch" placeholder="Branch (e.g. CSE)"
                      value={formData.branch} onChange={handleChange}
                      className="field-input" required />
                  </div>

                  {/* Semester */}
                  <div className="field-wrap">
                    <span className="field-icon">📅</span>
                    <input type="number" name="semester" placeholder="Semester (1–8)"
                      value={formData.semester} onChange={handleChange}
                      className="field-input" required />
                  </div>

                  {/* Room */}
                  <div className="field-wrap md:col-span-2" style={{ position:"relative" }}>
                    <span className="field-icon">🏠</span>
                    <select name="roomId" value={formData.roomId} onChange={handleChange}
                      className="field-input" required>
                      <option value="">Select Room</option>
                      {rooms.map((room) => (
                        <option key={room.id} value={room.id}>
                          Room {room.roomNumber} — Hostel {room.hostelNo}
                        </option>
                      ))}
                    </select>
                    {/* Chevron */}
                    <svg style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"#94a3b8" }}
                      width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100 mb-7" />

                {/* Section: Account Info */}
                <div className="section-label">Account Credentials</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

                  {/* Email */}
                  <div className="field-wrap">
                    <span className="field-icon">✉️</span>
                    <input type="email" name="email" placeholder="Email Address"
                      value={formData.email} onChange={handleChange}
                      className="field-input" required />
                  </div>

                  {/* Password */}
                  <div className="field-wrap">
                    <span className="field-icon">🔒</span>
                    <input type="password" name="password" placeholder="Password"
                      value={formData.password} onChange={handleChange}
                      className="field-input" required />
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" disabled={loading} className="submit-btn">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                        <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Registering...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Register Student
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  )}
                </button>

              </form>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-slate-400 text-xs mt-6 font-body">
            All fields are required. Student will receive login credentials via email.
          </p>

        </div>
      </div>
    </AdminLayout>
  );
};

export default AddStudent;