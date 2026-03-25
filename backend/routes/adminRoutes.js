import express from "express";
import { updateStudentByAdmin } from "../controllers/adminController.js";

import {
  addStudent,
  assignRoomToStudent,
  getAllStudents,
  getDashboardStats,
  getStudentById,
  getVacantRooms,
  verifyStudentProfile
} from "../controllers/adminController.js";


import {
  getAllComplaints,
  getActiveComplaints,
  getResolvedComplaints,
  updateComplaintStatus
} from "../controllers/adminController.js";


import {
  createAnnouncement,
  getAllAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/adminController.js";

import {
  getAllExtensionRequests,
   updateExtensionStatus
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

import { sendAnnouncementEmail } from "../controllers/adminController.js";


const router = express.Router();

router.use(protect); // Protect all routes below

router.post("/announcements/:id/send-mail", sendAnnouncementEmail);

// Add student
router.post("/add-student", addStudent);
router.get("/dashboard", getDashboardStats);


// Get verified students
router.get("/students", getAllStudents);
// Get all complaints
router.get("/complaints", getAllComplaints);

// Get active complaints
router.get("/complaints/active", getActiveComplaints);

// Get resolved complaints
router.get("/complaints/resolved", getResolvedComplaints);

// Update complaint status
router.put("/complaints/:id", updateComplaintStatus);

//vacant rooms
router.get("/vacant-rooms", getVacantRooms);

router.put("/assign-room", assignRoomToStudent);

// Announcement Routes,

router.post("/announcements" ,createAnnouncement);

router.get("/announcements", getAllAnnouncements);

router.put("/announcements/:id", updateAnnouncement);

router.get("/students/:id", getStudentById); 

router.delete("/announcements/:id", deleteAnnouncement); 

// Add this route (put it near the other student routes)
router.put("/students/:id", updateStudentByAdmin);

router.put("/verifyStudent/:id", verifyStudentProfile);


// extension requests
router.get("/extensions", getAllExtensionRequests);
router.put("/extensions/:id",  updateExtensionStatus);

export default router;