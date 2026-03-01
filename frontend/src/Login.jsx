import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 If already logged in → redirect automatically
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (token && role === "STUDENT") {
      navigate("/student/dashboard");
    }
    if (token && role === "ADMIN") {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userId || !formData.password) {
      setError("All fields are required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Save tokens
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("role", data.role);

      // ✅ Redirect based on role
      if (data.role === "STUDENT") {
        navigate("/student/dashboard");
      } else if (data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        setError("Invalid role received from server");
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-900 to-blue-600 px-4">

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Portal Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* User ID */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Enrollment No / Admin Code
            </label>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your ID"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter password"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;