import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../../layouts/StudentLayout";

const Complaint = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [complaints, setComplaints] = useState([]);
  const [activeTab, setActiveTab] = useState("ACTIVE");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  // ================= FETCH COMPLAINTS =================
  const fetchComplaints = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await API.get("/students/complaints");
      const data = res.data;

      if (Array.isArray(data)) {
        setComplaints(data);
      } else if (Array.isArray(data.complaints)) {
        setComplaints(data.complaints);
      } else {
        setComplaints([]);
      }
    } catch (err) {
      console.error("Error fetching complaints");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ================= SUBMIT COMPLAINT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!formData.title || !formData.description) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      await API.post("/students/complaints", formData);

      setMessage("Complaint submitted successfully.");
      setFormData({ title: "", description: "" });
      fetchComplaints();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to submit complaint"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= FILTER DATA =================
  const filteredComplaints =
    activeTab === "ACTIVE"
      ? complaints.filter((c) => c.status !== "resolved")
      : complaints.filter((c) => c.status === "resolved");

  // ================= STATUS STYLE =================
  const statusStyle = (status) => {
    if (status === "pending")
      return "bg-orange-100 text-orange-600";
    if (status === "in_progress")
      return "bg-blue-100 text-blue-600";
    if (status === "resolved")
      return "bg-green-100 text-green-600";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <StudentLayout>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto">

          {/* Page Title */}
          <h1 className="text-3xl font-bold mb-2">
            Complaints & Requests
          </h1>
          <p className="text-gray-500 mb-6">
            Submit and track your complaints and maintenance requests
          </p>

          {/* Submit Form */}
          <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Submit a New Complaint
            </h2>

            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
                {error}
              </div>
            )}

            {message && (
              <div className="bg-green-100 text-green-600 p-3 rounded mb-4 text-sm">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title *"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Description *"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Submitting..." : "SUBMIT COMPLAINT"}
              </button>
            </form>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 border-b mb-6">
            <button
              onClick={() => setActiveTab("ACTIVE")}
              className={`pb-2 font-medium ${
                activeTab === "ACTIVE"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              Active Complaints (
              {complaints.filter((c) => c.status !== "resolved").length})
            </button>

            <button
              onClick={() => setActiveTab("RESOLVED")}
              className={`pb-2 font-medium ${
                activeTab === "RESOLVED"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              Resolved (
              {complaints.filter((c) => c.status === "resolved").length})
            </button>
          </div>

          {/* Complaint List */}
          <div className="space-y-6">
            {filteredComplaints.map((complaint) => (
              <div
                key={complaint.id}
                className="bg-white shadow-md rounded-2xl p-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">
                    {complaint.title}
                  </h3>

                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${statusStyle(
                      complaint.status
                    )}`}
                  >
                    {complaint.status}
                  </span>
                </div>

                <p className="text-gray-600 mt-3">
                  {complaint.description}
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  Submitted on{" "}
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}

            {filteredComplaints.length === 0 && (
              <p className="text-gray-500">
                No complaints found.
              </p>
            )}
          </div>

        </div>
      </div>
    </StudentLayout>
  );
};

export default Complaint;