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

const router = express.Router();
router.use(protect);
router.use(authorizeRoles("STUDENT"));

router.get("/dashboard", getStudentDashboard);
router.get("/profile", getStudentProfile);
router.get("/announcements", getAnnouncements);

router.get("/profile", getStudentProfile);
router.put("/profile", updateStudentProfile);

router.get("/complaints", getStudentComplaints);
router.post("/complaints", submitComplaint);;

router.post("/extensionRequest", submitExtensionRequest);
router.get("/extension", getExtensionRequests);

export default router;
