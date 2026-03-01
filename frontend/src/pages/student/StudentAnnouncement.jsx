import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(
          "http://localhost:5000/api/students/announcements",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 401) {
          localStorage.clear();
          navigate("/login");
          return;
        }

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch announcements");
        }

        setAnnouncements(data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading announcements...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Announcements
        </h1>

        {announcements.length === 0 ? (
          <div className="bg-white shadow-lg rounded-xl p-6 text-center text-gray-500">
            No announcements available.
          </div>
        ) : (
          <div className="space-y-6">
            {announcements.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-xl p-6 border-l-4 border-blue-600 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h2>

                <p className="text-gray-600 mt-2">
                  {item.description}
                </p>

                <p className="text-sm text-gray-400 mt-3">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Announcements;