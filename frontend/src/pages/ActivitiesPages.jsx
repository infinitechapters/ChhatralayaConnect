// import ActivityCard from "../components/activityCard.jsx";
// import React from "react";
// const events = [
//   {
//     title: "Farewell Party",
//     description: "A memorable farewell celebration for seniors with fun games and performances.",
//     imageUrl: "/images/farewell.jpg",
//   },
//   {
//     title: "Ganesh Chaturthi",
//     description: "Celebration of Ganesh Chaturthi with decoration, rituals, and community activities.",
//     imageUrl: "/images/ganesh.jpg",
//   },
//   {
//     title: "Inchargeship Transfer",
//     description: "Passing on responsibilities to new hostel incharges in a fun ceremony.",
//     imageUrl: "/images/inchargeship.jpg",
//   },
//   {
//     title: "26 January Celebration",
//     description: "Flag hoisting and patriotic events for Republic Day.",
//     imageUrl: "/images/26january.jpg",
//   },
//   {
//     title: "Janmashtami",
//     description: "Dahi Handi and cultural events to celebrate Krishna Janmashtami.",
//     imageUrl: "/images/janmashtami.jpg",
//   },
//   {
//     title: "Freshers Party",
//     description: "Welcome party for freshers with music, dance, and games.",
//     imageUrl: "/images/freshers.jpg",
//   },
//   {
//     title: "Christmas Celebration",
//     description: "Christmas party with decorations, gifts, and festivities.",
//     imageUrl: "/images/christmas.jpg",
//   },
// ];

// const ActivitiesPage = () => {
//   return (
//     <div className="max-w-7xl mx-auto px-6 py-8">
//       <h1 className="text-3xl font-bold text-blue-900 mb-6">Hostel Activities & Events</h1>

//       {events.map((event, index) => (
//         <ActivityCard
//           key={index}
//           title={event.title}
//           description={event.description}
//           imageUrl={event.imageUrl}
//         />
//       ))}
//     </div>
//   );
// };

// export default ActivitiesPage;

import { useState, useEffect } from "react";
import ActivityCard from "../components/TempCard.jsx";
import React from "react";

import farewellImg      from "../assets/Farewell.jpeg";
import ganeshaImg       from "../assets/Ganesha.jpeg";
import inchargeImg      from "../assets/Inchargeship.jpeg";
import republicImg      from "../assets/Republic.jpeg";
import holiImg          from "../assets/Holi.jpeg";
import freshersImg      from "../assets/Freshers.jpeg";
import newYearImg       from "../assets/New_Year.jpeg";

const events = [
      { title: "Holi Celebration",       description: "Holi is celebrated with colors, water balloons and a day filled with dance and masti.",               imageUrl: holiImg      },

      { title: "Ganesha Chaturthi",      description: "Celebration of Ganesha Chaturthi with decoration, rituals, and vibrant community activities.",        imageUrl: ganeshaImg   },
  { title: "Farewell Party",         description: "A memorable farewell celebration for seniors with fun games, performances, and heartfelt goodbyes.", imageUrl: farewellImg  },

  { title: "Inchargeship Transfer",  description: "Passing on responsibilities to new hostel Incharges in a fun and ceremonious occasion.",              imageUrl: inchargeImg  },
  { title: "26 January Celebration", description: "Flag hoisting and patriotic events to honor Republic Day with pride and enthusiasm.",                 imageUrl: republicImg  },
  { title: "Freshers Party",         description: "Welcome party for freshers with music, dance, games, and a warm community reception.",                imageUrl: freshersImg  },
  { title: "New Year Celebration",   description: "New year party with decorations, gift exchange, carols, and festive cheer for all.",                  imageUrl: newYearImg   },
];

const ActivitiesPage = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── Hero Header ── */}
      <div className="relative bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 px-10 pt-16 pb-14 overflow-hidden">
        <div className="absolute -top-16 -right-10 w-72 h-72 rounded-full border border-white/10 bg-white/5 pointer-events-none" />
        <div className="absolute top-6 right-48 w-36 h-36 rounded-full border border-white/6 pointer-events-none" />
        <div className="absolute -bottom-20 -left-12 w-56 h-56 rounded-full border border-white/[0.07] bg-white/3 pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className={`inline-flex items-center gap-2 bg-white/[0.07] border border-white/10 rounded-full px-4 py-1.5 mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="text-base">🎉</span>
            <span className="text-white/70 text-[11px] font-bold tracking-widest uppercase">Campus Life</span>
          </div>

          <h1 className={`text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-4 font-serif transition-all duration-700 delay-75 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Hostel Activities
            <br />
            <span className="bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              &amp; Events
            </span>
          </h1>

          <p className={`text-white/50 text-base leading-relaxed max-w-md mb-8 transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Celebrating culture, community, and unforgettable moments — all under one roof.
          </p>

          <div className={`flex gap-8 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {[{ v: `${events.length}`, l: "Events" }, { v: "365", l: "Days of Fun" }, { v: "∞", l: "Memories" }].map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-extrabold text-white font-serif leading-none">{s.v}</div>
                <div className="text-[11px] text-white/40 font-semibold tracking-widest uppercase mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Cards Section ── */}
      <div className="max-w-3xl mx-auto px-10 pt-11 pb-20">
        <div className="flex items-center gap-3 mb-7">
          <div className="w-6 h-0.5 rounded-full bg-linear-to-r from-blue-500 to-violet-500" />
          <span className="text-[11px] font-bold text-slate-400 tracking-[0.12em] uppercase">
            All Events — {events.length} total
          </span>
        </div>

        {events.map((event, index) => (
          <ActivityCard
            key={index}
            index={index}
            title={event.title}
            description={event.description}
            imageUrl={event.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivitiesPage;