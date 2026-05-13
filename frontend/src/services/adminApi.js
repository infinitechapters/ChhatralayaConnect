import axios from "axios";
import API from "./api";

export const getDashboard = () =>
  API.get("/admin/dashboard");

export const getAllStudents = () =>
  API.get("/admin/students");

export const getAllComplaints = () =>
  API.get("/admin/complaints");

export const updateComplaintStatus = (id, status) =>
  API.put(`/admin/complaints/${id}`, { status });

export const getAllAnnouncements = () =>
  API.get("/admin/announcements");

export const createAnnouncement = (data) =>
  API.post("/admin/announcements", data);

export const generateAnnouncementAI = (prompt) =>
  API.post("/admin/generate-announcement", { prompt });

export const recommendRoom = (studentId) =>
  API.get(`/admin/students/${studentId}/recommend-room`);