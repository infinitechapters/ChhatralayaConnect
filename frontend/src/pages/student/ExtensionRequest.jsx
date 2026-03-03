import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api.js";
import StudentLayout from "../../layouts/StudentLayout";

const ExtensionRequest = () => {

  const [formData, setFormData] = useState({
    tillDate: "",
    reason: "",
  });

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/students/extensions");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!formData.tillDate || !formData.reason) {
      setError("All fields are required");
      return;
    }

    if (formData.tillDate <= today) {
      setError("Extension date must be in the future");
      return;
    }

    setLoading(true);

    try {
      await API.post("/students/extension", formData);

      setMessage("Extension request submitted successfully.");

      setFormData({
        tillDate: "",
        reason: ""
      });

      fetchRequests(); // refresh list

    } catch (err) {

      if (err.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }

      setError(
        err.response?.data?.message || "Something went wrong"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <StudentLayout>

      <div className="min-h-screen bg-gray-100 py-10 px-4">

        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            Hostel Extension Application
          </h2>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-100 text-green-600 p-3 rounded mb-4">
              {message}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6 mb-10">

            <div>
              <label className="block text-sm mb-1">
                Extension for the Date *
              </label>
              <input
                type="date"
                name="tillDate"
                value={formData.tillDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">
                Reason *
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows="4"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>

          </form>

          {/* REQUEST HISTORY */}
          <h3 className="text-xl font-semibold mb-4">
            My Extension Requests
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full bg-gray-50 rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left">Till Date</th>
                  <th className="p-3 text-left">Reason</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Applied On</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id} className="border-t">
                    <td className="p-3">
                      {new Date(req.tillDate).toLocaleDateString()}
                    </td>

                    <td className="p-3">{req.reason}</td>

                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-sm ${
                        req.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : req.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {req.status}
                      </span>
                    </td>

                    <td className="p-3">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}

                {requests.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      No extension requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </StudentLayout>
  );
};

export default ExtensionRequest;