import express from "express";
import {
  getStudentDashboard,
  getStudentProfile,
  getStudentFees,
  getAnnouncements,
  submitComplaint,
  getStudentComplaints,
  submitExtensionRequest,
  getExtensionRequests,
} from "../controllers/studentController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(protect);
router.use(authorizeRoles("STUDENT"));

router.get("/dashboard", getStudentDashboard);
router.get("/profile", getStudentProfile);
router.get("/fees", getStudentFees);
router.get("/announcements", getAnnouncements);

router.post("/complaint", submitComplaint);
router.get("/complaint/:id", getStudentComplaints);

router.post("/extension", submitExtensionRequest);
router.get("/extension", getExtensionRequests);

export default router;
