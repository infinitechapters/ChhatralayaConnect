import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
    createAnnouncement,
    getAllAnnouncements,
} from "../../services/adminApi";
import { useNavigate } from "react-router-dom";

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  if (!token || role !== "ADMIN") {
    navigate("/login");
    return;
  }

  fetchAnnouncements();
}, []);

    const fetchAnnouncements = async () => {
        try {
            const res = await getAllAnnouncements();

            const data = Array.isArray(res.data)
                ? res.data
                : res.data.announcements || [];

            setAnnouncements(data);
        } catch (error) {
            console.error("Error fetching announcements", error);
            setAnnouncements([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !message) return;

        const admin = JSON.parse(localStorage.getItem("user"));

        try {
            setLoading(true);

            await createAnnouncement({
                title,
                description: message
            });

            setTitle("");
            setMessage("");
            fetchAnnouncements();
        } catch (error) {
            console.error("Error creating announcement", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <h1 className="text-2xl font-semibold mb-6">
                📢 Manage Announcements
            </h1>

            {/* Create Form */}
            <div className="bg-white shadow rounded p-6 mb-8">
                <h2 className="text-lg font-semibold mb-4">
                    Create New Announcement
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Announcement Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    />

                    <textarea
                        placeholder="Announcement Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        rows="4"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        {loading ? "Creating..." : "Create Announcement"}
                    </button>
                </form>
            </div>

            {/* Announcement List */}
            <div className="bg-white shadow rounded p-6">
                <h2 className="text-lg font-semibold mb-4">
                    Previous Announcements
                </h2>

                {announcements.length === 0 ? (
                    <p className="text-gray-500">No announcements yet.</p>
                ) : (
                    announcements.map((a) => (
                        <div
                            key={a.id}
                            className="border-b py-4"
                        >
                            <h3 className="font-semibold text-lg">
                                {a.title}
                            </h3>
                            <p className="text-gray-600 mt-1">
                                {a.description}
                            </p>
                            <p className="text-sm text-gray-400 mt-2">
                                {new Date(a.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </AdminLayout>
    );
};

export default Announcements;