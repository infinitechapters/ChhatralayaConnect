// import React from "react";
// import { Link } from "react-router-dom";


// const features = [
//   {
//     title: "Room Management",
//     description:
//       "Allocate rooms, track occupancy and manage hostel capacity efficiently.",
//     icon: "🏢",
//   },
//   {
//     title: "Fee Management",
//     description:
//       "Monitor payments, track pending dues and maintain financial records.",
//     icon: "💳",
//   },
//   {
//     title: "Complaint System",
//     description:
//       "Students raise issues and admins track & resolve them efficiently.",
//     icon: "⚠️",
//   },
// ];

// function Dashboard() {
//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
      
//       {/* 🔷 NAVBAR */}
   


//     <nav className="bg-linear-to-r from-blue-900 to-blue-600 text-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         {/* Logo / Title */}
//         <h1 className="text-xl font-bold tracking-wide">
//           Hostel Management System
//         </h1>

//         {/* Navbar Links */}
//         <div className="space-x-4 flex items-center">
//           <Link
//             to="/activities"
//             className="hover:text-gray-200 transition font-medium"
//           >
//            Hostel Events
//           </Link>

//           <Link
//             to="/administrator"
//             className="hover:text-gray-200 transition font-medium"
//           >
//             Administrator
//           </Link>

//           <Link
//             to="/rules"
//             className="hover:text-gray-200 transition font-medium"
//           >
//             Hostel Rules
//           </Link>
//         </div>
//       </div>
//     </nav>




//       {/* 🔥 HERO SECTION */}
// <section
//   className="relative h-screen flex items-center justify-center text-center text-white"
//   style={{
//     backgroundImage: "url('https://media.licdn.com/dms/image/v2/C4D1BAQGm8R3TrgmH7g/company-background_10000/company-background_10000/0/1651111385364/jabalpur_engineering_college_cover?e=2147483647&v=beta&t=D58OpmwvVj6FFhKpBKzwEjZGqM7D3pTHWNpgZYCQQs4')",
//     backgroundSize: "cover",
//     backgroundPosition: "center",

//   }}
// >
//   <div className="absolute inset-0 bg-black/40"></div>

//   <div className="relative z-10 px-6">
//     <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
//       Smart Hostel Management
//     </h2>
//     <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
//       Manage students, rooms, fees, complaints and administration
//       seamlessly in one powerful platform.
//     </p>

//     <div className="space-x-4">
//       <Link
//         to="/login"
//         className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-semibold transition transform hover:scale-105"
//       >
//         Student Portal
//       </Link>

//       <Link
//         to="/login"
//         className="border border-white hover:bg-white hover:text-black px-6 py-3 rounded-lg text-lg font-semibold transition transform hover:scale-105"
//       >
//         Admin Dashboard
//       </Link>
//     </div>
//   </div>
// </section>


//       {/* 🌟 FEATURES SECTION */}
//       <section className="py-20 bg-gray-100">
//         <div className="max-w-7xl mx-auto px-6">
          
//           <h3 className="text-3xl font-bold text-center mb-12">
//             Key Features
//           </h3>

//           <div className="grid md:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-2xl shadow-lg p-8 text-center transition transform hover:-translate-y-3 hover:shadow-2xl"
//               >
//                 <div className="text-5xl mb-4">{feature.icon}</div>
//                 <h4 className="text-xl font-semibold mb-3">
//                   {feature.title}
//                 </h4>
//                 <p className="text-gray-600">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 🚀 CTA SECTION */}
//       <section className="py-16 bg-linear-to-r from-blue-800 to-blue-600 text-white text-center">
//         <h3 className="text-3xl font-bold mb-4">
//           Ready to Simplify Hostel Management?
//         </h3>
//         <p className="mb-6 text-lg">
//           Join our platform and manage everything efficiently.
//         </p>

//         <Link
//           to="/login"
//           className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
//         >
//           Get Started
//         </Link>
//       </section>

//       {/* 🔻 FOOTER */}
//       <footer className="bg-gray-900 text-gray-400 py-6 text-center">
//         <p>© 2026 Hostel Management System. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default Dashboard;




import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { to: "/activities",    label: "Hostel Events"  },
  { to: "/administrator", label: "Administrator"  },
  { to: "/rules",         label: "Rules"          },
];

const quickLinks = [
  {
    to: "/activities",
    icon: "✦",
    label: "Events & Activities",
    desc: "Cultural nights, celebrations & community events",
    accent: "#6C3BAA",
  },
  {
    to: "/administrator",
    icon: "✦",
    label: "Administration",
    desc: "Meet the wardens, caretakers & hostel staff",
    accent: "#2B6CB0",
  },
  {
    to: "/rules",
    icon: "✦",
    label: "Rules & Regulations",
    desc: "Official hostel guidelines and code of conduct",
    accent: "#276749",
  },
];

const stats = [
  { value: "500+", sub: "Residents"        },
  { value: "200+", sub: "Rooms"            },
  { value: "24/7", sub: "Staff Support"    },
  { value: "10+",  sub: "Years of Service" },
];

export default function Dashboard() {
  const [scrolled,  setScrolled]  = useState(false);
  const [visible,   setVisible]   = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [counts,    setCounts]    = useState([0, 0, 0, 0]);
  const statsRef = useRef(null);
  const targets = [500, 200, 247, 10];
  
  //announcement ticker

  const [announcements, setAnnouncements] = useState([]);
useEffect(() => {
  fetch("http://localhost:5000/api/admin/announcements")
    .then(res => res.json())
    .then(data => {
      const items = data.map(a => `${a.title} — ${a.description}`);
      setAnnouncements(items);
    })
    .catch(err => console.error("Failed to fetch announcements", err));
}, []);
  //end of announcement ticker

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      targets.forEach((max, i) => {
        let n = 0;
        const step = Math.ceil(max / 55);
        const id = setInterval(() => {
          n = Math.min(n + step, max);
          setCounts(p => { const a = [...p]; a[i] = n; return a; });
          if (n >= max) clearInterval(id);
        }, 18);
      });
      obs.disconnect();
    }, { threshold: 0.4 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }
        .hero-overlay {
          background:
            linear-gradient(to bottom, rgba(15,10,30,0.72) 0%, rgba(15,10,30,0.38) 50%, rgba(15,10,30,0.80) 100%);
        }
        .card-shine::before {
          content:''; position:absolute; inset:0; border-radius:inherit;
          background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 60%);
          pointer-events:none;
        }
@keyframes ticker-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.ticker-track {
  display: flex;
  white-space: nowrap;
  animation: ticker-scroll 30s linear infinite;
}
.ticker-track:hover { animation-play-state: paused; }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        .fade-up-1 { animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s both; }
        .fade-up-2 { animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.30s both; }
        .fade-up-3 { animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.45s both; }
        .fade-up-4 { animation: fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.60s both; }
        .line-grow  { animation: fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.35s both; }
        .nav-link-line {
          position:relative;
        }
        .nav-link-line::after {
          content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px;
          background:currentColor; transition:width 0.3s ease;
        }
        .nav-link-line:hover::after { width:100%; }
      `}</style>

      <div className="min-h-screen flex flex-col font-body bg-stone-50">

        {/* ── NAVBAR ── */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/96 backdrop-blur-xl border-b border-stone-200/80 shadow-sm py-3"
            : "bg-transparent py-6"
        }`}>
          <div className="max-w-6xl mx-auto px-8 flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 rounded-xl bg-linear-to-br from-indigo-900 to-indigo-700 shadow-md" />
                <span className="absolute inset-0 flex items-center justify-center text-white font-display font-bold text-base">H</span>
              </div>
              <div className="leading-none">
                <div className={`font-display font-semibold text-m tracking-wide transition-colors duration-300 ${scrolled ? "text-stone-900" : "text-white"}`}>
                  HostelMS
                </div>
                <div className={`text-[9px] font-body font-semibold tracking-[0.18em] uppercase mt-0.5 transition-colors duration-300 ${scrolled ? "text-stone-400" : "text-white/45"}`}>
                  JEC · Jabalpur
                </div>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map(link => (
                <Link key={link.to} to={link.to}
                  className={`nav-link-line font-body text-[16px] font-medium tracking-wide transition-colors duration-200 ${
                    scrolled ? "text-stone-500 hover:text-stone-900" : "text-white/65 hover:text-white"
                  }`}>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile toggle */}
            <button className="md:hidden p-1.5" onClick={() => setMenuOpen(!menuOpen)}>
              <div className="flex flex-col gap-1.5">
                {[0,1,2].map(i => (
                  <span key={i} className={`block w-5 h-px transition-all duration-300 ${scrolled ? "bg-stone-700" : "bg-white/75"} ${
                    i===0 && menuOpen ? "rotate-45 translate-y-2.5" :
                    i===1 && menuOpen ? "opacity-0 scale-x-0" :
                    i===2 && menuOpen ? "-rotate-45 -translate-y-2.5" : ""
                  }`}/>
                ))}
              </div>
            </button>
          </div>

          {/* Mobile dropdown */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-48" : "max-h-0"}`}>
            <div className="bg-white border-t border-stone-100 px-8 py-3 flex flex-col">
              {navLinks.map(link => (
                <Link key={link.to} to={link.to}
                  className="text-stone-600 hover:text-indigo-700 font-body text-sm py-3 border-b border-stone-100 last:border-0 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section
          className="relative h-screen flex items-end justify-start overflow-hidden"
          style={{
            backgroundImage: "url('https://media.licdn.com/dms/image/v2/C4D1BAQGm8R3TrgmH7g/company-background_10000/company-background_10000/0/1651111385364/jabalpur_engineering_college_cover?e=2147483647&v=beta&t=D58OpmwvVj6FFhKpBKzwEjZGqM7D3pTHWNpgZYCQQs4')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          <div className="hero-overlay absolute inset-0" />

          {/* Left edge accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-transparent via-indigo-400/60 to-transparent" />

          <div className="relative z-10 max-w-6xl mx-auto px-8 pb-20 w-full">
            <div className="max-w-2xl">

              {/* Eyebrow */}
              <div className="fade-up-1 flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-indigo-400/70" />
                <span className="text-indigo-100 font-body text-[11px] font-semibold tracking-[0.2em] uppercase">
                  Jabalpur Engineering College
                </span>
              </div>

              {/* Headline */}
              <h1 className="fade-up-2 font-display text-white leading-[1.05] mb-6"
                style={{ fontSize: "clamp(42px, 6vw, 72px)", fontWeight: 600 }}>
                Welcome to
                <br />
                <em className="not-italic text-indigo-300">ChhatralayaConnect</em>
                <br />
              <span>Your Hostel Simplified.</span>
              </h1>

              {/* Subtitle */}
              <p className="fade-up-3 font-body text-white text-base leading-relaxed max-w-md mb-10">
                A dedicated platform for JEC residents and staff — bringing clarity, ease, and transparency to every aspect of hostel life.
              </p>

              {/* Buttons */}
              <div className="fade-up-4 flex flex-wrap gap-3">
                <Link to="/login"
                  className="font-body bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-3 rounded-xl text-[13px] font-semibold tracking-wider uppercase shadow-xl shadow-indigo-900/50 hover:shadow-indigo-500/40 transition-all duration-300 hover:-translate-y-0.5">
                  Student Portal
                </Link>
                <Link to="/login"
                  className="font-body border border-white/25 hover:border-white/50 hover:bg-white/10 text-white/80 hover:text-white px-7 py-3 rounded-xl text-[13px] font-semibold tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5">
                  Admin Access
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 opacity-30">
            <div className="w-px h-10 bg-linear-to-b from-white to-transparent" />
            <span className="font-body text-white text-[9px] tracking-[0.2em] uppercase rotate-90 origin-center translate-x-3">Scroll</span>
          </div>
        </section>

        {/* ── ANNOUNCEMENT TICKER ── */}
{announcements.length > 0 && (
  <div style={{ background: "#1e1b4b", borderTop: "1px solid #4f46e5", borderBottom: "1px solid #4f46e5", overflow: "hidden", display: "flex", alignItems: "center", height: "44px" }}>
    <div style={{ background: "#4f46e5", color: "#e0e7ff", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", padding: "0 20px", height: "100%", display: "flex", alignItems: "center", whiteSpace: "nowrap", flexShrink: 0 }}>
      📢 Announcements
    </div>
    <div style={{ overflow: "hidden", flex: 1 }}>
      <div className="ticker-track">
        {[...announcements, ...announcements].map((text, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#c7d2fe", fontSize: "13px", paddingRight: "48px", fontFamily: "'DM Sans', sans-serif" }}>
            <span style={{ width: "5px", height: "5px", background: "#818cf8", borderRadius: "50%", flexShrink: 0, display: "inline-block" }} />
            {text}
          </span>
        ))}
      </div>
    </div>
  </div>
)}

        {/* ── STATS BAND ── */}
        <div ref={statsRef} className="bg-indigo-950 border-y border-indigo-900/50">
          <div className="max-w-6xl mx-auto px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-indigo-900/60">
            {stats.map((s, i) => (
              <div key={s.sub} className="text-center px-6 py-2">
                <div className="font-display text-white text-3xl font-semibold leading-none">
                  {i === 2 ? "24/7" : `${counts[i]}+`}
                </div>
                <div className="font-body text-indigo-400/70 text-[11px] font-semibold tracking-[0.15em] uppercase mt-2">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── QUICK ACCESS ── */}
        <section className="py-24 bg-stone-50">
          <div className="max-w-6xl mx-auto px-8">

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <p className="font-body text-indigo-600 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Navigate</p>
                <h2 className="font-display text-stone-900 leading-tight" style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 600 }}>
                  What are you <br /><em>looking for?</em>
                </h2>
              </div>
              <p className="font-body text-stone-400 text-sm leading-relaxed max-w-xs">
                Access all hostel services, staff information, and guidelines from one place.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {quickLinks.map((item, i) => (
                <Link key={i} to={item.to}
                  className="card-shine group relative bg-white border border-stone-200/80 hover:border-stone-300 rounded-2xl p-8 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-stone-200/80 overflow-hidden block">

                  {/* Top accent line */}
                  <div className="absolute top-0 left-8 right-8 h-px transition-all duration-500 group-hover:left-0 group-hover:right-0"
                    style={{ background: `linear-gradient(90deg, transparent, ${item.accent}60, transparent)` }} />

                  {/* Icon */}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 text-lg font-display font-bold transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${item.accent}12`, color: item.accent }}>
                    {item.icon}
                  </div>

                  <h3 className="font-display text-stone-900 text-xl font-semibold mb-2 leading-tight">
                    {item.label}
                  </h3>
                  <p className="font-body text-stone-400 text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  <div className="flex items-center gap-2 font-body text-xs font-semibold tracking-wide transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
                    style={{ color: item.accent }}>
                    Explore
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT STRIP ── */}
        <section className="py-24 bg-white border-t border-stone-100">
          <div className="max-w-6xl mx-auto px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">

              {/* Left */}
              <div>
                <p className="font-body text-indigo-600 text-xs font-semibold tracking-[0.2em] uppercase mb-4">About</p>
                <h2 className="font-display text-stone-900 leading-tight mb-5" style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 600 }}>
                  A Home Away <br /><em>from Home</em>
                </h2>
                <div className="w-10 h-px bg-indigo-400 mb-6" />
                <p className="font-body text-stone-500 text-sm leading-[1.85] mb-4">
                  JEC Hostel provides a disciplined, nurturing, and inclusive environment where students thrive academically and personally. Our committed staff ensures safety, comfort, and a strong sense of community throughout the year.
                </p>
                <p className="font-body text-stone-400 text-sm leading-[1.85] mb-8">
                  From well-maintained facilities to responsive administration, every element is designed with the student's well-being in mind.
                </p>
                <Link to="/administrator"
                  className="inline-flex items-center gap-2 font-body text-indigo-700 hover:text-indigo-600 text-sm font-semibold tracking-wide transition-colors duration-200 border-b border-indigo-200 hover:border-indigo-400 pb-0.5">
                  Meet Our Staff
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* Right — decorative stat grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: "500+", l: "Students",        bg: "bg-indigo-950", text: "text-white",       sub: "text-indigo-400" },
                  { v: "200+", l: "Rooms",            bg: "bg-stone-100",  text: "text-stone-900",   sub: "text-stone-400" },
                  { v: "24/7", l: "Support Available",bg: "bg-stone-100",  text: "text-stone-900",   sub: "text-stone-400" },
                  { v: "10+",  l: "Years of Service", bg: "bg-indigo-950", text: "text-white",       sub: "text-indigo-400" },
                ].map((s, i) => (
                  <div key={i} className={`${s.bg} rounded-2xl p-7 flex flex-col justify-between aspect-square`}>
                    <div className={`font-display text-4xl font-semibold ${s.text} leading-none`}>{s.v}</div>
                    <div className={`font-body ${s.sub} text-xs font-semibold tracking-[0.15em] uppercase leading-snug`}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="relative bg-indigo-950 py-20 overflow-hidden">
          {/* Background texture */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-indigo-400/40 to-transparent" />

          <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
            <p className="font-body text-indigo-400/70 text-[11px] font-semibold tracking-[0.2em] uppercase mb-5">Access Your Portal</p>
            <h2 className="font-display text-white leading-tight mb-4" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 600 }}>
              Ready to get started?
            </h2>
            <p className="font-body text-indigo-300/45 text-base leading-relaxed max-w-sm mx-auto mb-10">
              Log in to access your personalized hostel dashboard and stay updated.
            </p>
            <Link to="/login"
              className="inline-flex items-center gap-2.5 font-body bg-white text-indigo-900 hover:bg-indigo-50 px-8 py-3.5 rounded-xl text-[13px] font-bold tracking-widest uppercase shadow-2xl shadow-black/30 transition-all duration-300 hover:-translate-y-0.5">
              Enter Portal
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="bg-stone-900 py-10 px-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-700 flex items-center justify-center text-white font-display font-bold text-sm">H</div>
              <div>
                <span className="font-display text-white/60 text-sm font-semibold">HostelMS</span>
                <span className="font-body text-stone-500 text-xs ml-2">— JEC Jabalpur</span>
              </div>
            </div>
            <p className="font-body text-stone-500 text-xs tracking-wide">
              © 2026 Hostel Management System. All rights reserved.
            </p>
            {/* <p className="font-body text-stone-500 text-xs tracking-wide">
              Mentored by- Dr. Mamta Lambert Prof. and HOD IT Dept.
            </p>
            <p className="font-body text-stone-500 text-xs tracking-wide">
              Developers-  Aanchal Deode (0201IT221002)
              Savitri Iyer (0201IT221091)
              Yashashvi Sharma (0201IT221116)
            </p> */}
            <div className="flex items-center gap-6">
              {["Privacy", "Terms", "Contact"].map(item => (
                <span key={item} className="font-body text-stone-500 hover:text-stone-300 text-xs font-medium cursor-pointer tracking-wide transition-colors duration-200">{item}</span>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}












