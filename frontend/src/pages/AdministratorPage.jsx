// import StaffCard from "../components/StaffCard";

// import React from "react";
// const staffMembers = [
//   {
//     name: "Warden A",
//     designation: "Hostel Warden",
//     email: "wardenA@hostel.com",
//     phone: "+91 9876543210",
//     imageUrl: "/images/warden1.jpg",
//   },
//   {
//     name: "Warden B",
//     designation: "Hostel Warden",
//     email: "wardenB@hostel.com",
//     phone: "+91 9876543211",
//     imageUrl: "/images/warden2.jpg",
//   },
//   {
//     name: "Caretaker Ma’am",
//     designation: "Hostel Caretaker",
//     email: "caretaker@hostel.com",
//     phone: "+91 9876543212",
//     imageUrl: "/images/caretaker.jpg",
//   },
// ];

// const AdministratorPage = () => {
//   return (
//     <div className="max-w-7xl mx-auto px-6 py-8">
//       <h1 className="text-3xl font-bold text-blue-900 mb-8">
//         Hostel Staff & Administrators
//       </h1>

//       <div className="flex flex-wrap gap-8 justify-center">
//         {staffMembers.map((staff, index) => (
//           <StaffCard
//             key={index}
//             name={staff.name}
//             designation={staff.designation}
//             email={staff.email}
//             phone={staff.phone}
//             imageUrl={staff.imageUrl}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdministratorPage;





import { useState, useEffect } from "react";
import React from "react";
import StaffCard from "../components/StaffCard";

const staffMembers = [
  { name: "Loveleen Kaur",       designation: "Hostel-1 Warden",    email: "wardenA@hostel.com",    phone: "+91 9876543210", imageUrl: "/images/warden1.jpg"   },
  { name: "Agya Mishra",       designation: "Hostel-1 Warden",    email: "wardenB@hostel.com",    phone: "+91 9876543211", imageUrl: "/images/warden2.jpg"   },
  { name: "Rameshwari Pradhan",designation: "Hostel Caretaker", email: "caretaker@hostel.com",  phone: "+91 9876543212", imageUrl: "/images/caretaker.jpg" },
];

const stats = [
  { value: "24/7", label: "Support",      icon: "🛡️" },
  { value: "3+",   label: "Staff Members",icon: "👥" },
  { value: "100%", label: "Dedicated",    icon: "⭐" },
  { value: "365",  label: "Days Active",  icon: "📅" },
];

const AdministratorPage = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── Hero Header ── */}
      <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-10 pt-16 pb-14 overflow-hidden">

        {/* Decorative rings */}
        <div className="absolute -top-16 -right-10 w-80 h-80 rounded-full border border-white/10 bg-white/[0.03] pointer-events-none" />
        <div className="absolute top-8 right-52 w-40 h-40 rounded-full border border-white/[0.06] pointer-events-none" />
        <div className="absolute -bottom-24 -left-14 w-64 h-64 rounded-full border border-white/[0.06] bg-white/[0.02] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">

          {/* Eyebrow */}
          <div className={`inline-flex items-center gap-2 bg-white/[0.07] border border-white/10 rounded-full px-4 py-1.5 mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="text-base">🏛️</span>
            <span className="text-white/70 text-[11px] font-bold tracking-[0.1em] uppercase">Administration</span>
          </div>

          {/* Title */}
          <h1 className={`text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-4 font-serif transition-all duration-700 delay-75 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Hostel Administrators &amp;
            <br />
            <span className="bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Staff
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-white/50 text-base leading-relaxed max-w-md mb-10 transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Meet the dedicated team that ensures your hostel experience is safe, comfortable, and fulfilling every single day.
          </p>

          {/* Stats row */}
          <div className={`grid grid-cols-4 gap-4 max-w-xl transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {stats.map((s) => (
              <div key={s.label} className="bg-white/[0.07] border border-white/10 rounded-2xl px-3 py-3 text-center">
                <div className="text-xl mb-1">{s.icon}</div>
                <div className="text-xl font-extrabold text-white font-serif leading-none">{s.value}</div>
                <div className="text-[10px] text-white/40 font-semibold tracking-widest uppercase mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Wave divider ── */}
      <div className="w-full overflow-hidden -mt-1">
        <svg viewBox="0 0 1440 48" className="w-full h-12 fill-slate-50" preserveAspectRatio="none">
          <path d="M0,48 C360,0 1080,0 1440,48 L1440,48 L0,48 Z" />
        </svg>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-5xl mx-auto px-10 pb-20 -mt-4">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-6 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
          <span className="text-[11px] font-bold text-slate-400 tracking-[0.12em] uppercase">
            Meet the Team — {staffMembers.length} members
          </span>
        </div>

        {/* Cards grid */}
        <div className="flex flex-wrap gap-8 justify-center mb-16">
          {staffMembers.map((staff, index) => (
            <StaffCard key={index} index={index} {...staff} />
          ))}
        </div>


       
        

      </div>
    </div>
  );
};

export default AdministratorPage;