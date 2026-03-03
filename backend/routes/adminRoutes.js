import express from "express";

import {
  addStudent,
  assignRoomToStudent,
  getAllStudents,
  getDashboardStats,
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


const router = express.Router();

router.use(protect); // Protect all routes below

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

router.delete("/announcements/:id", deleteAnnouncement);

router.put("/verifyStudent/:id", verifyStudentProfile);


// extension requests
router.get("/extensions", getAllExtensionRequests);
router.put("/extensions/:id",  updateExtensionStatus);

export default router;