import prisma from "../prismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ================= TOKEN GENERATORS =================

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};

// ================= HELPER: Random Password Generator =================

const generateRandomPassword = (length = 10) => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};

// ================= GET AVAILABLE ROOMS =================

export const getAvailableRooms = async (req, res) => {
  try {
    const rooms = await prisma.room.findMany({
      where: { isAvailable: true },
      select: {
        id: true,
        roomNumber: true,
        floor: true,
        capacity: true,
      },
      orderBy: { roomNumber: "asc" },
    });

    if (rooms.length === 0) {
      return res.status(404).json({ message: "No vacant rooms available" });
    }

    return res.status(200).json({
      message: "Available rooms fetched successfully",
      totalAvailable: rooms.length,
      rooms,
    });
  } catch (error) {
    console.error("Get available rooms error:", error);
    res.status(500).json({ message: "Failed to fetch available rooms" });
  }
};

// ================= ADD STUDENT =================

export const addStudent = async (req, res) => {
  try {
    const { name, enrollmentNo, semester, branch, department, roomId } =
      req.body;

    // Validate required fields
    if (
      !name ||
      !enrollmentNo ||
      !semester ||
      !branch ||
      !department ||
      !roomId
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if enrollment number already exists
    const existingStudent = await prisma.student.findUnique({
      where: { enrollmentNo },
    });

    if (existingStudent) {
      return res
        .status(409)
        .json({ message: "Student with this enrollment number already exists" });
    }

    // Check if room exists and is available
    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (!room.isAvailable) {
      return res.status(400).json({ message: "Room is already occupied" });
    }

    // Generate and hash password
    const plainPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Create student and mark room as occupied in a transaction
    const student = await prisma.$transaction(async (tx) => {
      const newStudent = await tx.student.create({
        data: {
          name,
          enrollmentNo,
          password: hashedPassword,
          semester,
          branch,
          department,
          roomId,
        },
      });

      await tx.room.update({
        where: { id: roomId },
        data: { isAvailable: false },
      });

      return newStudent;
    });

    // Return student info + plain password (admin shares it with student)
    return res.status(201).json({
      message: "Student registered successfully",
      student: {
        id: student.id,
        name: student.name,
        enrollmentNo: student.enrollmentNo,
        semester: student.semester,
        branch: student.branch,
        department: student.department,
        roomId: student.roomId,
      },
      generatedPassword: plainPassword, // Admin must share this with the student
    });
  } catch (error) {
    console.error("Add student error:", error);
    res.status(500).json({ message: "Failed to register student" });
  }
};

// ================= LOGIN =================

export const login = async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({ message: "UserId and password required" });
    }

    let user = null;
    let role = null;

    // Try Student (enrollmentNo)
    user = await prisma.student.findUnique({
      where: { enrollmentNo: userId },
    });

    if (user) {
      role = "STUDENT";
    } else {
      // Try Admin (adminCode)
      user = await prisma.admin.findUnique({
        where: { adminCode: userId },
      });

      if (user) role = "ADMIN";
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken({ id: user.id, role });
    const refreshToken = generateRefreshToken({ id: user.id, role });

    res.status(200).json({
      accessToken,
      refreshToken,
      role,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

// ================= REFRESH TOKEN =================

export const refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" });

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    (err, decoded) => {
      if (err)
        return res.status(403).json({ message: "Invalid refresh token" });

      const newAccessToken = jwt.sign(
        { id: decoded.id, role: decoded.role },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken: newAccessToken });
    }
  );
};