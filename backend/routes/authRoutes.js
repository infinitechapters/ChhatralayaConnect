import express from "express";
import { getAvailableRooms, addStudent ,login} from "../controllers/authController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/rooms/available", protect, authorizeRoles("ADMIN"), getAvailableRooms);
router.post("/students/add",   protect, authorizeRoles("ADMIN"), addStudent);
router.post("/login", login);

export default router;