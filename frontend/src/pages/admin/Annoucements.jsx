import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { createAnnouncement, getAllAnnouncements, generateAnnouncementAI } from "../../services/adminApi";
import { useNavigate } from "react-router-dom";

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [aiPrompt, setAiPrompt] = useState("");
    const [aiLoading, setAiLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        const role = localStorage.getItem("role");
        if (!token || role !== "ADMIN") { navigate("/login"); return; }
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const res = await getAllAnnouncements();
            const data = Array.isArray(res.data) ? res.data : res.data.announcements || [];
            setAnnouncements(data);
        } catch (error) {
            console.error("Error fetching announcements", error);
            setAnnouncements([]);
        }
    };

    const handleGenerateAI = async () => {

        try {

            setAiLoading(true);

            const res = await generateAnnouncementAI(aiPrompt);

            setMessage(res.data.content);

        } catch (error) {

            console.error(error);

        } finally {

            setAiLoading(false);
        }
    };

    const handleSendMail = async (id) => {
        try {
            const token = localStorage.getItem("accessToken");
            const res = await API.post(
                `/admin/announcements/${id}/send-mail`
            );
            const data = await res.json();
            alert(data.message);
        } catch (err) {
            console.error(err);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !message) return;
        const admin = JSON.parse(localStorage.getItem("user"));
        try {
            setLoading(true);
            await createAnnouncement({ title, description: message });
            setTitle("");
            setMessage("");
            fetchAnnouncements();
        } catch (error) {
            console.error("Error creating announcement", error);
        } finally {
            setLoading(false);
        }
    };

    // Tag color cycling
    const tagPalette = [
        { bg: "#eef2ff", color: "#4f46e5", dot: "#6366f1" },
        { bg: "#f0fdf4", color: "#16a34a", dot: "#22c55e" },
        { bg: "#fff7ed", color: "#ea580c", dot: "#f97316" },
        { bg: "#fdf4ff", color: "#9333ea", dot: "#a855f7" },
        { bg: "#f0f9ff", color: "#0284c7", dot: "#38bdf8" },
    ];

    return (
        <AdminLayout>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');
                .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
                .font-body    { font-family: 'DM Sans', sans-serif; }

                .ann-input {
                    width: 100%;
                    padding: 11px 14px 11px 42px;
                    border: 1.5px solid #e2e8f0;
                    border-radius: 12px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 13.5px;
                    color: #1e293b;
                    background: #f8fafc;
                    outline: none;
                    transition: all 0.2s ease;
                    resize: none;
                }
                .ann-input:focus {
                    border-color: #6366f1;
                    background: #fff;
                    box-shadow: 0 0 0 3px rgba(99,102,241,0.10);
                }
                .ann-input::placeholder { color: #94a3b8; }
                .ann-textarea {
                    width: 100%;
                    padding: 12px 14px 12px 42px;
                    border: 1.5px solid #e2e8f0;
                    border-radius: 12px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 13.5px;
                    color: #1e293b;
                    background: #f8fafc;
                    outline: none;
                    transition: all 0.2s ease;
                    resize: vertical;
                    min-height: 110px;
                }
                .ann-textarea:focus {
                    border-color: #6366f1;
                    background: #fff;
                    box-shadow: 0 0 0 3px rgba(99,102,241,0.10);
                }
                .ann-textarea::placeholder { color: #94a3b8; }
                .submit-btn {
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                    padding: 12px 28px;
                    background: linear-gradient(135deg, #4f46e5, #6366f1);
                    color: white; border: none; border-radius: 12px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 13px; font-weight: 700;
                    letter-spacing: 0.08em; text-transform: uppercase;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(99,102,241,0.35);
                    transition: all 0.25s ease;
                }
                .submit-btn:hover:not(:disabled) {
                    transform: translateY(-1px);
                    box-shadow: 0 8px 28px rgba(99,102,241,0.45);
                }
                .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }

                .ann-card {
                    display: flex; gap: 16px; align-items: flex-start;
                    padding: 20px 22px;
                    border-radius: 16px;
                    border: 1.5px solid #f1f5f9;
                    background: #fafafa;
                    transition: all 0.3s ease;
                }
                .ann-card:hover {
                    border-color: #c7d2fe;
                    background: #fff;
                    box-shadow: 0 4px 20px rgba(99,102,241,0.08);
                    transform: translateX(4px);
                }

                @keyframes slideIn {
                    from { opacity:0; transform: translateY(16px); }
                    to   { opacity:1; transform: translateY(0); }
                }
                .slide-in { animation: slideIn 0.5s cubic-bezier(0.22,1,0.36,1) both; }

                .megaphone-float {
                    animation: float 4s ease-in-out infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(-3deg); }
                    50%       { transform: translateY(-10px) rotate(3deg); }
                }
            `}</style>

            <div className="font-body min-h-screen bg-slate-50 p-2">

                {/* ── Page Header ── */}
                <div className="mb-9 flex items-start justify-between flex-wrap gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div style={{ width: 3, height: 22, borderRadius: 4, background: "linear-gradient(180deg,#4f46e5,#818cf8)" }} />
                            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6366f1" }}>
                                Admin Panel
                            </span>
                        </div>
                        <h1 className="font-display text-slate-900" style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.1 }}>
                            Manage Announcements
                        </h1>
                        <p className="font-body text-slate-400 text-sm mt-1.5">
                            Broadcast important notices to all hostel residents instantly.
                        </p>
                    </div>

                    {/* Floating megaphone illustration */}
                    <div className="megaphone-float hidden md:flex items-center justify-center"
                        style={{ width: 90, height: 90, borderRadius: 24, background: "linear-gradient(135deg,#eef2ff,#e0e7ff)", border: "1.5px solid #c7d2fe" }}>
                        <span style={{ fontSize: 46 }}>📢</span>
                    </div>
                </div>

                {/* ── Create Form Card ── */}
                <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden mb-8 slide-in">
                    <div style={{ height: 3, background: "linear-gradient(90deg,#4f46e5,#818cf8,#4f46e5)" }} />

                    <div className="p-8">
                        {/* Form header */}
                        <div className="flex items-center gap-3 mb-7">
                            <div style={{ width: 38, height: 38, borderRadius: 12, background: "#eef2ff", border: "1.5px solid #c7d2fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                                ✍️
                            </div>
                            <div>
                                <h2 className="font-display text-slate-900" style={{ fontSize: 22, fontWeight: 700, lineHeight: 1 }}>
                                    New Announcement
                                </h2>
                                <p className="font-body text-slate-400 text-xs mt-0.5">
                                    This will be visible to all students immediately.
                                </p>
                            </div>
                        </div>


                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Title */}
                            <div style={{ position: "relative" }}>
                                {/* AI Generator */}
                                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">

                                    <div className="flex items-center gap-2 mb-3">
                                        <span style={{ fontSize: 18 }}>✨</span>

                                        <div>
                                            <h3
                                                className="font-body"
                                                style={{
                                                    fontSize: 13,
                                                    fontWeight: 700,
                                                    color: "#4338ca"
                                                }}
                                            >
                                                AI Announcement Generator
                                            </h3>

                                            <p
                                                className="font-body"
                                                style={{
                                                    fontSize: 11,
                                                    color: "#6366f1"
                                                }}
                                            >
                                                Describe the announcement briefly and AI will generate it.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 flex-wrap">

                                        <input
                                            type="text"
                                            placeholder="e.g. Water maintenance tomorrow from 10 AM to 1 PM"
                                            value={aiPrompt}
                                            onChange={(e) => setAiPrompt(e.target.value)}
                                            className="ann-input"
                                            style={{ flex: 1, paddingLeft: 14 }}
                                        />

                                        <button
                                            type="button"
                                            onClick={handleGenerateAI}
                                            disabled={aiLoading}
                                            style={{
                                                background: "linear-gradient(135deg,#4f46e5,#6366f1)",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: 12,
                                                padding: "0 18px",
                                                fontSize: 12,
                                                fontWeight: 700,
                                                cursor: "pointer",
                                                minHeight: 46,
                                                boxShadow: "0 4px 14px rgba(99,102,241,0.25)"
                                            }}
                                        >
                                            {aiLoading ? "Generating..." : "Generate With AI"}
                                        </button>

                                    </div>

                                </div>
                                <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 15, pointerEvents: "none" }}>📌</span>
                                <input
                                    type="text"
                                    placeholder="Announcement Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="ann-input"
                                />
                            </div>

                            {/* Message */}
                            <div style={{ position: "relative" }}>
                                <span style={{ position: "absolute", left: 13, top: 14, fontSize: 15, pointerEvents: "none" }}>💬</span>
                                <textarea
                                    placeholder="Write your announcement message here..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="ann-textarea"
                                    rows="4"
                                />
                            </div>

                            {/* Footer row */}
                            <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
                                <p className="font-body text-slate-400 text-xs">
                                    📍 Visible to all hostel residents once published.
                                </p>
                                <button type="submit" disabled={loading} className="submit-btn">
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                                                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                                            </svg>
                                            Publishing...
                                        </>
                                    ) : (
                                        <>
                                            Publish Announcement
                                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* ── Announcements List ── */}
                <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden">
                    <div style={{ height: 3, background: "linear-gradient(90deg,#4f46e5,#818cf8,#4f46e5)" }} />

                    <div className="p-8">
                        {/* List header */}
                        <div className="flex items-center justify-between mb-7 flex-wrap gap-3">
                            <div className="flex items-center gap-3">
                                <div style={{ width: 38, height: 38, borderRadius: 12, background: "#eef2ff", border: "1.5px solid #c7d2fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                                    🗂️
                                </div>
                                <div>
                                    <h2 className="font-display text-slate-900" style={{ fontSize: 22, fontWeight: 700, lineHeight: 1 }}>
                                        Previous Announcements
                                    </h2>
                                    <p className="font-body text-slate-400 text-xs mt-0.5">
                                        {announcements.length} announcement{announcements.length !== 1 ? "s" : ""} published
                                    </p>
                                </div>
                            </div>

                            {/* Count badge */}
                            <div style={{ background: "#eef2ff", border: "1.5px solid #c7d2fe", borderRadius: 100, padding: "4px 14px" }}>
                                <span style={{ fontSize: 12, fontWeight: 700, color: "#4f46e5" }}>
                                    {announcements.length} Total
                                </span>
                            </div>
                        </div>

                        {/* Empty state */}
                        {announcements.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 gap-4">
                                <div style={{ fontSize: 64, lineHeight: 1, filter: "grayscale(0.2)" }}>🔔</div>
                                <div className="text-center">
                                    <p className="font-display text-slate-700" style={{ fontSize: 20, fontWeight: 600 }}>
                                        No announcements yet
                                    </p>
                                    <p className="font-body text-slate-400 text-sm mt-1">
                                        Create your first announcement above to notify students.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {announcements.map((a, i) => {
                                    const palette = tagPalette[i % tagPalette.length];
                                    return (
                                        <div key={a.id} className="ann-card slide-in" style={{ animationDelay: `${i * 0.07}s` }}>

                                            {/* Index bubble */}
                                            <div style={{
                                                minWidth: 36, height: 36, borderRadius: "50%",
                                                background: palette.bg,
                                                border: `1.5px solid ${palette.dot}30`,
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontSize: 12, fontWeight: 800, color: palette.color,
                                                flexShrink: 0, marginTop: 2,
                                            }}>
                                                {String(i + 1).padStart(2, "0")}
                                            </div>

                                            {/* Content */}
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                                    <h3 className="font-display text-slate-900" style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.2 }}>
                                                        {a.title}
                                                    </h3>
                                                    {/* Tag */}
                                                    <span style={{
                                                        background: palette.bg,
                                                        color: palette.color,
                                                        fontSize: 10, fontWeight: 700,
                                                        letterSpacing: "0.1em", textTransform: "uppercase",
                                                        borderRadius: 100, padding: "2px 9px",
                                                        border: `1px solid ${palette.dot}30`,
                                                    }}>
                                                        Notice
                                                    </span>
                                                </div>
                                                <p className="font-body text-slate-500 text-sm leading-relaxed mt-1 mb-2">
                                                    {a.description}
                                                </p>
                                                <div className="flex items-center gap-1.5">
                                                    <span style={{ fontSize: 11 }}>🕒</span>
                                                    <span className="font-body text-slate-400" style={{ fontSize: 11, fontWeight: 500 }}>
                                                        {new Date(a.createdAt).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Right chevron */}
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0 }}>
                                                <button
                                                    onClick={() => handleSendMail(a.id)}
                                                    style={{
                                                        background: "#eef2ff", border: "1.5px solid #c7d2fe",
                                                        borderRadius: 8, padding: "5px 10px",
                                                        fontSize: 11, fontWeight: 700, color: "#4f46e5",
                                                        cursor: "pointer", whiteSpace: "nowrap"
                                                    }}>
                                                    📧 Send Mail
                                                </button>
                                                <svg style={{ color: "#cbd5e1", transition: "color 0.2s" }}
                                                    width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
};

export default Announcements;