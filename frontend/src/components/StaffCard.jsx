import { useState } from "react";
import React from "react";

const StaffCard = ({ name, designation, email, phone, imageUrl, index = 0 }) => {
  const [hovered, setHovered] = useState(false);

  const accents = [
    { from: "from-blue-600",   to: "to-indigo-600",  light: "bg-blue-50",   ring: "ring-blue-400",   badge: "bg-blue-100 text-blue-700",   icon: "text-blue-500"   },
    { from: "from-violet-600", to: "to-purple-600",  light: "bg-violet-50", ring: "ring-violet-400", badge: "bg-violet-100 text-violet-700",icon: "text-violet-500" },
    { from: "from-teal-500",   to: "to-cyan-600",    light: "bg-teal-50",   ring: "ring-teal-400",   badge: "bg-teal-100 text-teal-700",   icon: "text-teal-500"   },
    { from: "from-rose-500",   to: "to-pink-600",    light: "bg-rose-50",   ring: "ring-rose-400",   badge: "bg-rose-100 text-rose-700",   icon: "text-rose-500"   },
  ];
  const accent = accents[index % accents.length];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative bg-white rounded-3xl overflow-hidden w-72
        border border-slate-100
        shadow-lg hover:shadow-2xl
        transition-all duration-500 ease-out
        ${hovered ? "-translate-y-2 scale-[1.02]" : "translate-y-0 scale-100"}
      `}
    >
      {/* Top gradient banner */}
      <div className={`h-28 w-full bg-linear-to-br ${accent.from} ${accent.to} relative overflow-hidden`}>
        {/* Decorative circles on banner */}
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-4 w-20 h-20 rounded-full bg-white/10" />
        <div className="absolute top-3 right-16 w-8 h-8 rounded-full bg-white/10" />
      </div>

      {/* Avatar — overlaps banner */}
      <div className="flex justify-center -mt-12 relative z-10">
        <div className={`w-24 h-24 rounded-full ring-4 ${accent.ring} ring-offset-2 overflow-hidden bg-slate-200 shadow-lg`}>
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-3 pb-6 flex flex-col items-center gap-2 text-center">

        {/* Name */}
        <h2 className="text-slate-900 text-lg font-bold tracking-tight leading-tight font-serif">
          {name}
        </h2>

        {/* Designation badge */}
        <span className={`${accent.badge} text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full`}>
          {designation}
        </span>

        {/* Divider */}
        <div className={`w-10 h-0.5 rounded-full bg-linear-to-r ${accent.from} ${accent.to} mt-1`} />

        {/* Contact info */}
        <div className="w-full mt-1 space-y-2">

          {/* Email */}
          <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2">
            <svg className={`w-4 h-4 shrink-0 ${accent.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-slate-600 text-xs truncate">{email}</span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2">
            <svg className={`w-4 h-4 shrink-0 ${accent.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-slate-600 text-xs">{phone}</span>
          </div>
        </div>

        {/* Contact button */}
        <button
          className={`
            mt-2 w-full py-2 rounded-xl text-white text-xs font-bold tracking-widest uppercase
            bg-linear-to-r ${accent.from} ${accent.to}
            shadow-md hover:shadow-lg hover:brightness-110
            transition-all duration-300
            ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
          `}
        >
          Contact
        </button>
      </div>
    </div>
  );
};

export default StaffCard;