import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  getAllComplaints,
  updateComplaintStatus,
} from "../../services/adminApi";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const res = await getAllComplaints();

      // Handle different backend response structures safely
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.complaints || [];

      setComplaints(data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateComplaintStatus(id, status);
      fetchComplaints(); // refresh after update
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-4">
        Complaints Management
      </h1>

      <div className="bg-white shadow rounded p-4">

        {loading ? (
          <p>Loading complaints...</p>
        ) : complaints.length === 0 ? (
          <p className="text-gray-500">No complaints found.</p>
        ) : (
          complaints.map((c) => (
            <div
              key={c.id}
              className="border-b py-4 flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold text-lg">
                  {c.title}
                </h2>
                <p className="text-gray-600">
                  {c.description}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Student: {c.student?.name || "Unknown"}
                </p>
              </div>

              <select
                value={c.status}
                onChange={(e) =>
                  handleStatusChange(c.id, e.target.value)
                }
                className="border px-3 py-1 rounded"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          ))
        )}

      </div>
    </AdminLayout>
  );
};

export default Complaints;