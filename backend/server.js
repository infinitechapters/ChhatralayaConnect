import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "https://chhatralaya-connect.vercel.app",
      "http://localhost:5173"
    ],
    credentials: true,
  })
);
app.use(express.json());

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/students", studentRoutes);

/* Test route */
app.get("/", (req, res) => {
  res.send("Hostel Management Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});