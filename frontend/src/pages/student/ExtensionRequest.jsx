import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ExtensionRequest = () => {
  const [formData, setFormData] = useState({
    tillDate: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!formData.tillDate || !formData.reason) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/students/extension",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.status === 401) {
        localStorage.clear();
        navigate("/dashboard");
        return;
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit request");
      }

      setMessage("Extension request submitted successfully.");
      setFormData({ tillDate: "", reason: "" });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Hostel Stay Extension Form
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

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Till Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Extension Till Date *
            </label>
            <input
              type="date"
              name="tillDate"
              value={formData.tillDate}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Reason for Extension *
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="4"
              placeholder="Explain the reason for extension..."
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Submitting..." : "SUBMIT REQUEST"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ExtensionRequest;