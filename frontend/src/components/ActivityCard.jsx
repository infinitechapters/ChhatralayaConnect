import React from "react";

// const ActivityCard = ({ title, description, imageUrl }) => {
//   return (
//     <div className="flex bg-white shadow-lg rounded-lg overflow-hidden mb-6">
//       {/* Image */}
//       <div className="w-1/3">
//         <img
//           src={imageUrl}
//           alt={title}
//           className="object-cover h-full w-full"
//         />
//       </div>

//       {/* Text Content */}
//       <div className="p-4 flex flex-col justify-center w-2/3">
//         <h2 className="text-xl font-bold text-blue-900 mb-2">{title}</h2>
//         <p className="text-gray-700">{description}</p>
//       </div>
//     </div>
//   );
// };

// export default ActivityCard;
import { useState, useEffect } from "react";

const TAG_COLORS = [
  { pill: "bg-orange-100 text-orange-800", dot: "bg-orange-500", dotText: "text-orange-500", bar: "from-orange-500" },
  { pill: "bg-green-100 text-green-800",   dot: "bg-green-500",  dotText: "text-green-500",  bar: "from-green-500"  },
  { pill: "bg-blue-100 text-blue-800",     dot: "bg-blue-500",   dotText: "text-blue-500",   bar: "from-blue-500"   },
  { pill: "bg-purple-100 text-purple-800", dot: "bg-purple-500", dotText: "text-purple-500", bar: "from-purple-500" },
  { pill: "bg-rose-100 text-rose-800",     dot: "bg-rose-500",   dotText: "text-rose-500",   bar: "from-rose-500"   },
  { pill: "bg-teal-100 text-teal-800",     dot: "bg-teal-500",   dotText: "text-teal-500",   bar: "from-teal-500"   },
  { pill: "bg-yellow-100 text-yellow-800", dot: "bg-yellow-500", dotText: "text-yellow-500", bar: "from-yellow-500" },
];

const ActivityCard = ({ title, description, imageUrl, index }) => {
  const [visible, setVisible] = useState(false);
  const tag = TAG_COLORS[index % TAG_COLORS.length];

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300 + index * 130);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      className={`
        group flex bg-white rounded-2xl overflow-hidden mb-6
        border border-slate-100 shadow-md
        hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.005]
        transition-all duration-500 ease-out cursor-default
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
    >
      {/* Image Panel */}
      <div className="relative w-56 min-w-56 overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col justify-center flex-1 px-8 py-7 gap-3">

        {/* Tag pill */}
        <div className={`inline-flex items-center gap-1.5 ${tag.pill} rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase w-fit`}>
          <span className={`w-1.5 h-1.5 rounded-full ${tag.dot}`} />
          Hostel Event
        </div>

        {/* Title */}
        <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-tight font-serif">
          {title}
        </h2>

        {/* Accent bar */}
        <div className={`h-0.5 rounded-full bg-linear-to-r ${tag.bar} to-transparent w-8 group-hover:w-20 transition-all duration-500`} />

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed">
          {description}
        </p>

        {/* Hover CTA */}
        <span className={`text-xs font-semibold tracking-wide mt-1 ${tag.dotText} opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300`}>
          View Details →
        </span>
      </div>
    </div>
  );
};

export default ActivityCard;