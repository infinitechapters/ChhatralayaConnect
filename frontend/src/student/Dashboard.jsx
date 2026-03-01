// import React, { useEffect, useState } from "react";

// const Dashboard = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const res = await fetch("/api/students/dashboard", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         const result = await res.json();
//         setData(result);
//       } catch (error) {
//         console.error("Failed to load dashboard");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-lg font-semibold">
//         Loading dashboard...
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="flex justify-center items-center h-screen text-red-500">
//         Failed to load dashboard
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
      
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">
//           {data.welcome}
//         </h1>
//         <p className="text-gray-500 mt-1">
//           Here’s an overview of your hostel information
//         </p>
//       </div>

//       {/* Top Cards */}
//       <div className="grid md:grid-cols-4 gap-6 mb-8">
//         <Card title="Room Number" value={data.basicInfo.roomNumber} />
//         <Card title="Course" value={data.basicInfo.course} />
//         <Card title="Year" value={`${data.basicInfo.year} Year`} />
//         <Card title="Stay Duration" value={`${data.stayDuration.months} months`} />
//       </div>

//       {/* Complaint & Extension Summary */}
//       <div className="grid md:grid-cols-2 gap-6 mb-8">
//         <div className="bg-white shadow-lg rounded-2xl p-6">
//           <h2 className="text-xl font-semibold mb-4 text-gray-700">
//             Complaints
//           </h2>
//           <div className="flex justify-between text-gray-600">
//             <span>Total</span>
//             <span>{data.complaints.total}</span>
//           </div>
//           <div className="flex justify-between text-yellow-500 font-medium mt-2">
//             <span>Pending</span>
//             <span>{data.complaints.pending}</span>
//           </div>
//           <div className="flex justify-between text-green-600 font-medium mt-2">
//             <span>Resolved</span>
//             <span>{data.complaints.resolved}</span>
//           </div>
//         </div>

//         <div className="bg-white shadow-lg rounded-2xl p-6">
//           <h2 className="text-xl font-semibold mb-4 text-gray-700">
//             Extension Requests
//           </h2>
//           <div className="flex justify-between text-gray-600">
//             <span>Pending Requests</span>
//             <span className="text-indigo-600 font-semibold">
//               {data.extensions.pending}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Announcements */}
//       <div className="bg-white shadow-lg rounded-2xl p-6">
//         <h2 className="text-xl font-semibold mb-6 text-gray-700">
//           Recent Announcements
//         </h2>

//         {data.announcements.length === 0 ? (
//           <p className="text-gray-500">No announcements available.</p>
//         ) : (
//           <div className="space-y-4">
//             {data.announcements.map((announcement) => (
//               <div
//                 key={announcement.id}
//                 className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-lg hover:shadow-md transition"
//               >
//                 <h3 className="font-semibold text-gray-800">
//                   {announcement.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm mt-1">
//                   {announcement.description}
//                 </p>
//                 <p className="text-xs text-gray-400 mt-2">
//                   {new Date(announcement.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// /* Reusable Card Component */
// const Card = ({ title, value }) => (
//   <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
//     <h3 className="text-gray-500 text-sm">{title}</h3>
//     <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
//   </div>
// );

// export default Dashboard;