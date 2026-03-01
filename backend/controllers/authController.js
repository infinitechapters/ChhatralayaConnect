import prisma from "../prismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  return jwt.sign(
    { id, role},
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id,role},
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
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

    //  Try Student (enrollmentNo)
    user = await prisma.student.findUnique({
      where: { enrollmentNo: userId },
    });

    if (user) {
      role = "STUDENT";
    } else {
      //  Try Admin (adminCode)
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

    const accessToken = generateAccessToken(user.id, role);

    const refreshToken = generateRefreshToken(user.id, role);

    res.status(200).json({
      accessToken,
      refreshToken,
      role,
    });

  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};


// ================= REFRESH TOKEN =================
export const refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" });

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Invalid refresh token" });

    const newAccessToken = jwt.sign(
      { id: decoded.id , role: decoded.role},
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  });
};