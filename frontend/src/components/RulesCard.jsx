import React from "react";


// const RulesCard = ({ title, children, color }) => {
//   return (
//     <div
//       className={`rounded-lg p-6 mb-6 shadow-md text-white`}
//       style={{ backgroundColor: color }}
//     >
//       <h2 className="text-2xl font-bold mb-3">{title}</h2>
//       <div className="text-white text-base">{children}</div>
//     </div>
//   );
// };

// export default RulesCard;



import { useState } from "react";

const RulesCard = ({ title, rules, icon, index }) => {
  const [open, setOpen] = useState(true);

  const accents = [
    { from: "from-blue-600",   to: "to-indigo-600",  light: "bg-blue-50",   border: "border-blue-100",  num: "bg-blue-600",    text: "text-blue-700",   badge: "bg-blue-100 text-blue-700"   },
    { from: "from-violet-600", to: "to-purple-700",  light: "bg-violet-50", border: "border-violet-100",num: "bg-violet-600",  text: "text-violet-700", badge: "bg-violet-100 text-violet-700" },
    { from: "from-teal-500",   to: "to-cyan-600",    light: "bg-teal-50",   border: "border-teal-100",  num: "bg-teal-600",    text: "text-teal-700",   badge: "bg-teal-100 text-teal-700"   },
    { from: "from-rose-500",   to: "to-pink-600",    light: "bg-rose-50",   border: "border-rose-100",  num: "bg-rose-600",    text: "text-rose-700",   badge: "bg-rose-100 text-rose-700"   },
    { from: "from-amber-500",  to: "to-orange-600",  light: "bg-amber-50",  border: "border-amber-100", num: "bg-amber-600",   text: "text-amber-700",  badge: "bg-amber-100 text-amber-700"  },
  ];
  const a = accents[index % accents.length];

  return (
    <div className={`rounded-3xl overflow-hidden border ${a.border} shadow-md hover:shadow-xl transition-all duration-500 mb-6`}>

      {/* Card Header */}
      <div
        className={`bg-gradient-to-r ${a.from} ${a.to} px-7 py-5 flex items-center justify-between cursor-pointer select-none`}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-4">
          {/* Icon bubble */}
          <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shadow-inner">
            {icon}
          </div>
          {/* Title */}
          <div>
            <p className="text-white/60 text-[10px] font-bold tracking-[0.12em] uppercase mb-0.5">
              Section {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="text-white text-lg font-bold tracking-tight leading-tight">
              {title}
            </h2>
          </div>
        </div>
        {/* Toggle chevron */}
        <div className={`w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}>
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Card Body */}
      <div className={`${a.light} transition-all duration-500 overflow-hidden ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <ul className="px-7 py-5 space-y-3">
          {rules.map((rule, i) => (
            <li key={i} className="flex items-start gap-3 group">
              {/* Number badge */}
              <span className={`${a.num} text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5`}>
                {i + 1}
              </span>
              <span className="text-slate-700 text-sm leading-relaxed">{rule}</span>
            </li>
          ))}
        </ul>

        {/* Footer strip */}
        <div className={`px-7 py-3 border-t ${a.border} flex items-center justify-between`}>
          <span className={`${a.badge} text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full`}>
            {rules.length} Rules
          </span>
          <span className="text-slate-400 text-[11px] font-medium">Hostel Regulations</span>
        </div>
      </div>
    </div>
  );
};

export default RulesCard;