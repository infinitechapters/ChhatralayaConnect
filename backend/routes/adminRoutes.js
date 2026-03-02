import express from "express";

import {
  addStudent,
  getDashboardStats,
  getVerifiedStudents
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
  approveExtensionRequest,
  rejectExtensionRequest
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.use(protect); // Protect all routes below

// Add student
router.post("/add-student", addStudent);

router.get("/dashboard", getDashboardStats);


// Get verified students
router.get("/students", getVerifiedStudents);
// Get all complaints
router.get("/complaints", getAllComplaints);

// Get active complaints
router.get("/complaints/active", getActiveComplaints);

// Get resolved complaints
router.get("/complaints/resolved", getResolvedComplaints);

// Update complaint status
router.put("/complaints/:id", updateComplaintStatus);



// Announcement Routes,

router.post("/announcements" ,createAnnouncement);

router.get("/announcements", getAllAnnouncements);

router.put("/announcements/:id", updateAnnouncement);

router.delete("/announcements/:id", deleteAnnouncement);


// GET all extension requests
router.get("/extensions", getAllExtensionRequests);


// APPROVE extension
router.put("/extensions/:id/approve", approveExtensionRequest);


// REJECT extension
router.put("/extensions/:id/reject", rejectExtensionRequest);

export default router;