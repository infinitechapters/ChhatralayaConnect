import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getDashboard } from "../../services/adminApi";

const Dashboard = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout>

      <h1 className="text-2xl font-semibold mb-6">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white shadow p-4 rounded">
          <p>Total Students</p>
          <h2 className="text-2xl font-bold">
            {data?.totalStudents || 0}
          </h2>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <p>Pending Complaints</p>
          <h2 className="text-2xl font-bold text-orange-500">
            {data?.pendingComplaints || 0}
          </h2>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <p>Total Rooms</p>
          <h2 className="text-2xl font-bold">
            {data?.totalRooms || 0}
          </h2>
        </div>

      </div>

    </AdminLayout>
  );
};

export default Dashboard;