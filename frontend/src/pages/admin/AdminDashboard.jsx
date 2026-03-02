import React,{ useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getDashboard } from "../../services/adminApi";

const AdminDashboard = () => {

  const [data, setData] = useState(null);

useEffect(() => {
  fetchDashboard();
}, []);

const fetchDashboard = async () => {
  try {
    const res = await getDashboard(); // API wala
    setData(res.data);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <AdminLayout>
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-gray-800">
      🏢 Admin Dashboard
    </h1>
    <p className="text-gray-500 mt-1">
      Overview of hostel statistics and activities
    </p>
  </div>

  {/* Stats Cards */}
  <div className="grid md:grid-cols-3 gap-6 mb-10">

    {/* Total Students */}
    <div className="bg-linear-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm opacity-80">Total Students</p>
          <h2 className="text-3xl font-bold mt-2">
            {data?.totalStudents || 0}
          </h2>
        </div>
        <div className="text-4xl">🎓</div>
      </div>
    </div>

    {/* Pending Complaints */}
    <div className="bg-linear-to-r from-orange-400 to-orange-500 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm opacity-80">Pending Complaints</p>
          <h2 className="text-3xl font-bold mt-2">
            {data?.pendingComplaints || 0}
          </h2>
        </div>
        <div className="text-4xl">⚠️</div>
      </div>
    </div>

    {/* Total Rooms */}
    <div className="bg-linear-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm opacity-80">Total Rooms</p>
          <h2 className="text-3xl font-bold mt-2">
            {data?.totalRooms || 0}
          </h2>
        </div>
        <div className="text-4xl">🏠</div>
      </div>
    </div>

  </div>

  {/* Quick Insights Section */}
  <div className="bg-white p-6 rounded-xl shadow-md">
    <h2 className="text-xl font-semibold mb-4">
      📊 Quick Insights
    </h2>

    <div className="grid md:grid-cols-2 gap-6 text-gray-700">

      <div className="border p-4 rounded-lg bg-gray-50">
        <p className="font-medium">Room Occupancy</p>
        <p className="text-sm text-gray-500 mt-1">
          {(data?.totalStudents && data?.totalRooms)
            ? `${Math.round((data.totalStudents / data.totalRooms) * 100)}% occupied`
            : "No data available"}
        </p>
      </div>

      <div className="border p-4 rounded-lg bg-gray-50">
        <p className="font-medium">Complaint Status</p>
        <p className="text-sm text-gray-500 mt-1">
          {data?.pendingComplaints > 0
            ? "Action required on pending issues"
            : "All complaints resolved 🎉"}
        </p>
      </div>

    </div>
  </div>

</AdminLayout>
  );
};

export default AdminDashboard;