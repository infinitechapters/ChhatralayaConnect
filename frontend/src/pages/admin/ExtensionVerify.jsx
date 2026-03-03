import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../services/api";

const ExtensionVerify = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/admin/extensions");
      setRequests(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id, status) => {
    try {
      setLoading(true);
      await API.put(`/admin/extensions/${id}`, { status });
      fetchRequests();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">
          Extension Requests
        </h1>

        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Room</th>
                <th className="p-3 text-left">Reason</th>
                <th className="p-3 text-left">Till Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-t">
                  <td className="p-3">
                    {req.student.name}
                    <div className="text-sm text-gray-500">
                      {req.student.enrollmentNo}
                    </div>
                  </td>

                  <td className="p-3">
                    {req.student.room
                      ? `Room ${req.student.room.roomNumber} - Hostel ${req.student.room.hostelNo}`
                      : "Not Assigned"}
                  </td>

                  <td className="p-3">{req.reason}</td>

                  <td className="p-3">
                    {new Date(req.tillDate).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        req.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : req.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>

                  <td className="p-3 space-x-2">
                    {req.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            handleUpdate(req.id, "approved")
                          }
                          disabled={loading}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            handleUpdate(req.id, "rejected")
                          }
                          disabled={loading}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}

              {requests.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No extension requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ExtensionVerify;