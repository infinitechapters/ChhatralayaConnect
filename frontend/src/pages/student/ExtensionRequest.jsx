import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api.js";
import StudentLayout from "../../layouts/StudentLayout";

const ExtensionRequest = () => {

  const [formData, setFormData] = useState({
    tillDate: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

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

      setMessage("Your hostel stay extension request has been submitted successfully.");

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
    <StudentLayout>

      <div className="min-h-screen bg-gray-100 py-10 px-4">

        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Hostel Stay Extension Application
          </h2>

          <p className="text-gray-500 mb-6">
            Submit a formal request to extend your hostel stay due to work or other valid reasons.
          </p>

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

            {/* Current Date */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Application Date
              </label>
              <input
                type="text"
                value={today}
                disabled
                className="w-full border rounded-lg px-4 py-2 bg-gray-100"
              />
            </div>

            {/* Extension Till Date */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Requested Extension Till Date *
              </label>
              <input
                type="date"
                name="tillDate"
                value={formData.tillDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
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
                rows="5"
                placeholder="Example: I request extension of my hostel stay due to ongoing internship/work commitment..."
                className="w-full border rounded-lg px-4 py-2 resize-none"
              />
            </div>

            {/* Declaration */}
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
              I hereby declare that the information provided above is true and I
              understand that approval is subject to hostel administration rules.
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
              {loading ? "Submitting Request..." : "Submit Extension Request"}
            </button>

          </form>

        </div>

      </div>

    </StudentLayout>
  );
};

export default ExtensionRequest;