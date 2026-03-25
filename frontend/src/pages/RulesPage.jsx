import React from 'react'

// import RulesCard from "../components/RulesCard";

// const RulesPage = () => {
//   return (
//     <div className="max-w-4xl mx-auto px-6 py-8">
//       <h1 className="text-3xl font-bold text-blue-900 mb-8 text-center">
//         Hostel Rules & Regulations
//       </h1>

//       {/* Hostel Rules */}
//       <RulesCard title="Hostel Rules" color="#1E40AF">
//         <ul className="list-disc list-inside">
//           <li>Keep your rooms clean and tidy at all times.</li>
//           <li>Respect hostel timings and curfew rules.</li>
//           <li>Visitors are not allowed without prior permission.</li>
//         </ul>
//       </RulesCard>

//       {/* Maintenance Rules */}
//       <RulesCard title="Maintenance Rules" color="#2563EB">
//         <ul className="list-disc list-inside">
//           <li>Report any broken furniture or equipment immediately.</li>
//           <li>Do not damage hostel property intentionally.</li>
//           <li>Maintain hygiene in washrooms and common areas.</li>
//         </ul>
//       </RulesCard>

//       {/* Mess Rules */}
//       <RulesCard title="Mess Rules" color="#3B82F6">
//         <ul className="list-disc list-inside">
//           <li>Follow mess timings strictly.</li>
//           <li>Keep the dining area clean after meals.</li>
//           <li>Do not waste food; take only what you can eat.</li>
//         </ul>
//       </RulesCard>

//       {/* General Rules */}
//       <RulesCard title="General Rules" color="#60A5FA">
//         <ul className="list-disc list-inside">
//           <li>Be punctual and disciplined in all hostel activities.</li>
//           <li>Maintain decorum in common areas.</li>
//           <li>Cooperate with hostel staff and administration.</li>
//         </ul>
//       </RulesCard>

//       {/* Anti-Ragging & Disciplinary Rules */}
//       <RulesCard title="Anti-Ragging & Disciplinary Rules" color="#93C5FD">
//         <ul className="list-disc list-inside">
//           <li>Strictly no ragging in any form.</li>
//           <li>Violators will face immediate disciplinary action.</li>
//           <li>Follow all rules of conduct prescribed by the hostel authorities.</li>
//         </ul>
//       </RulesCard>
//     </div>
//   );
// };

// export default RulesPage;




import { useState, useEffect } from "react";
import RulesCard from "../components/RulesCard";

const rulesData = [
  {
    title: "Hostel Rules",
    icon: "🏠",
    rules: [
      "Keep your rooms clean and tidy at all times.",
      "Respect hostel timings and curfew rules strictly.",
      "Visitors are not allowed inside without prior written permission.",
      "Lights out by 11:00 PM in all dormitory areas.",
      "Personal belongings must be secured; hostel is not liable for losses.",
    ],
  },
  {
    title: "Maintenance Rules",
    icon: "🔧",
    rules: [
      "Report any broken furniture or equipment to the warden immediately.",
      "Do not damage hostel property intentionally — costs will be recovered.",
      "Maintain hygiene in washrooms and all common areas.",
      "Do not tamper with electrical fittings or plumbing.",
      "Dispose of waste only in designated dustbins.",
    ],
  },
  {
    title: "Mess Rules",
    icon: "🍽️",
    rules: [
      "Follow mess timings strictly — no late entry will be entertained.",
      "Keep the dining area clean and tidy after every meal.",
      "Do not waste food; take only what you can eat.",
      "Outside food is not permitted in the mess hall.",
      "Carry your mess card at all times during meal hours.",
    ],
  },
  {
    title: "General Rules",
    icon: "📋",
    rules: [
      "Be punctual and disciplined in all hostel activities.",
      "Maintain decorum and silence in common areas.",
      "Cooperate fully with hostel staff and administration.",
      "No loud music or parties without prior permission.",
      "Smoking and alcohol are strictly prohibited on premises.",
    ],
  },
  {
    title: "Anti-Ragging & Disciplinary Rules",
    icon: "🚫",
    rules: [
      "Strictly zero tolerance for ragging in any form whatsoever.",
      "Violators will face immediate suspension and disciplinary action.",
      "All forms of harassment, bullying, or intimidation are prohibited.",
      "Any incident must be reported to the warden within 24 hours.",
      "Follow all rules of conduct prescribed by hostel authorities.",
    ],
  },
];

const RulesPage = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const totalRules = rulesData.reduce((acc, r) => acc + r.rules.length, 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── Hero Header ── */}
      <div className="relative bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 px-10 pt-16 pb-14 overflow-hidden">

        {/* Decorative rings */}
        <div className="absolute -top-16 -right-10 w-80 h-80 rounded-full border border-white/10 bg-white/3 pointer-events-none" />
        <div className="absolute top-8 right-52 w-40 h-40 rounded-full border border-white/6 pointer-events-none" />
        <div className="absolute -bottom-24 -left-14 w-64 h-64 rounded-full border border-white/5 bg-white/2 pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">

          {/* Eyebrow */}
          <div className={`inline-flex items-center gap-2 bg-white/[0.07] border border-white/10 rounded-full px-4 py-1.5 mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="text-base">📜</span>
            <span className="text-white/70 text-[11px] font-bold tracking-widest uppercase">Guidelines</span>
          </div>

          {/* Title */}
          <h1 className={`text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-4 font-serif transition-all duration-700 delay-75 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Hostel Rules &amp;
            <br />
            <span className="bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Regulations
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-white/50 text-base leading-relaxed max-w-md mb-10 transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            A safe, respectful, and comfortable environment starts with everyone following these guidelines. Please read carefully.
          </p>

          {/* Stats row */}
          <div className={`flex gap-6 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {[
              { v: `${rulesData.length}`, l: "Sections",   icon: "📂" },
              { v: `${totalRules}`,       l: "Total Rules", icon: "📌" },
              { v: "Strict",              l: "Enforcement", icon: "⚖️" },
            ].map((s) => (
              <div key={s.l} className="bg-white/[0.07] border border-white/10 rounded-2xl px-4 py-3 text-center min-w-22.5">
                <div className="text-lg mb-1">{s.icon}</div>
                <div className="text-xl font-extrabold text-white font-serif leading-none">{s.v}</div>
                <div className="text-[10px] text-white/40 font-semibold tracking-widest uppercase mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="w-full overflow-hidden -mt-1">
        <svg viewBox="0 0 1440 48" className="w-full h-12 fill-slate-50" preserveAspectRatio="none">
          <path d="M0,48 C360,0 1080,0 1440,48 L1440,48 L0,48 Z" />
        </svg>
      </div>

      {/* ── Rules Content ── */}
      <div className="max-w-3xl mx-auto px-10 pb-20 -mt-4">

        {/* Notice banner */}
        <div className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 mb-8 shadow-sm">
          <span className="text-2xl mt-0.5">⚠️</span>
          <div>
            <p className="text-amber-800 font-bold text-sm">Important Notice</p>
            <p className="text-amber-700 text-xs leading-relaxed mt-0.5">
              Violation of any hostel rule may result in disciplinary action, fine, or expulsion. All residents are expected to read, understand, and adhere to these regulations.
            </p>
          </div>
        </div>

        {/* Section label */}
        <div className="flex items-center gap-3 mb-7">
          <div className="w-6 h-0.5 rounded-full bg-linear-to-r from-blue-500 to-violet-500" />
          <span className="text-[11px] font-bold text-slate-400 tracking-[0.12em] uppercase">
            All Sections — {rulesData.length} categories
          </span>
        </div>

        {/* Rules Cards — collapsible */}
        {rulesData.map((section, index) => (
          <RulesCard
            key={index}
            index={index}
            title={section.title}
            icon={section.icon}
            rules={section.rules}
          />
        ))}

        {/* Footer acknowledgement box */}
        <div className="mt-4 bg-linear-to-br from-slate-900 to-blue-950 rounded-3xl px-8 py-7 flex flex-col md:flex-row items-center gap-5 shadow-xl text-center md:text-left">
          <span className="text-4xl">🤝</span>
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg font-serif mb-1">I Acknowledge These Rules</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              By residing in this hostel, you agree to abide by all the rules and regulations listed above. Ignorance will not be accepted as an excuse.
            </p>
          </div>
          <button className="shrink-0 bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-xl transition-colors duration-200 shadow-lg">
            I Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default RulesPage;