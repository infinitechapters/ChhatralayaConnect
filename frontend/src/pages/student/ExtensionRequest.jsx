import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./services/api"; 

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

    setLoading(true);

    try {

      const res = await API.post("/students/extension", formData);

      setMessage("Extension request submitted successfully");

      setFormData({
        tillDate: "",
        reason: ""
      });

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">

        <h2 className="text-2xl font-bold mb-6">
          Hostel Stay Extension Form
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

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="date"
            name="tillDate"
            value={formData.tillDate}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-lg px-4 py-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default ExtensionRequest;