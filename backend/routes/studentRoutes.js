import express from "express";
import {
  getStudentDashboard,
  getStudentProfile,
  getAnnouncements,
  submitComplaint,
  getStudentComplaints,
  submitExtensionRequest,
  getExtensionRequests,
  updateStudentProfile,
} from "../controllers/studentController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import upload from "../src/middleware/upload.js";
import { uploadProfilePicture } from "../controllers/studentController.js";

// Add this one line with your existing routes:
const router = express.Router();
router.use(protect);
router.use(authorizeRoles("STUDENT"));
router.post("/profile/picture", protect, upload.single("profilePic"), uploadProfilePicture);

router.get("/dashboard", getStudentDashboard);
router.get("/profile", getStudentProfile);
router.get("/announcements", getAnnouncements);

router.get("/profile", getStudentProfile);
router.put("/profile", updateStudentProfile);

router.get("/complaints", getStudentComplaints);
router.post("/complaints", submitComplaint);;

router.post("/extension", submitExtensionRequest);
router.get("/extensions", getExtensionRequests);

export default router;