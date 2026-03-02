import prisma from "../prismaClient.js";
import bcrypt from "bcryptjs";


// GET DASHBOARD STATS
export const getDashboardStats = async (req, res) => {
  try {

    const totalStudents = await prisma.student.count({
      where: { isVerified: true }
    });

    const pendingComplaints = await prisma.complaint.count({
      where: {
        status: {
          in: ["pending", "in_progress"]
        }
      }
    });

   const rooms = await prisma.student.findMany({
  distinct: ['roomNumber'],
  select: { roomNumber: true }
});

const totalRooms = rooms.length;

    res.status(200).json({
      totalStudents,
      pendingComplaints,
      totalRooms
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching dashboard data"
    });
  }
};

// ✅ Add Student
export const addStudent = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      branch,
      semester,
      roomNumber,
      hostelNo,
      enrollmentNo,
      contact
    } = req.body;


    // Check if student exists
    const existingStudent = await prisma.student.findUnique({
      where: { email }
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student already exists"
      });
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);


    // Create student
    const student = await prisma.student.create({
      data: {
        name,
        email,
        password: hashedPassword,
        branch,
        semester,
        roomNumber,
        hostelNo,
        enrollmentNo,
        contact,
        role: "STUDENT",
        isVerified: true
      }
    });


    res.status(201).json({
      success: true,
      message: "Student added successfully",
      student
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};



// ✅ Get Verified Students
export const getVerifiedStudents = async (req, res) => {

  try {

    const students = await prisma.student.findMany({

      where: {
        isVerified: true
      },

      select: {
        id: true,
        name: true,
        email: true,
        branch: true,
        semester: true,
        roomNumber: true,
        hostelNo: true
      }

    });

    res.status(200).json({
      success: true,
      students
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};














/*
========================================
GET ALL COMPLAINTS
/api/admin/complaints
========================================
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


/*
====================================
GET ALL COMPLAINTS
====================================
*/
export const getAllComplaints = async (req, res) => {
  try {

    const complaints = await prisma.complaint.findMany({

      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            roomNumber: true
          }
        }
      },

      orderBy: {
        createdAt: "desc"
      }

    });

    res.status(200).json({
      success: true,
      complaints
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error fetching complaints"
    });

  }
};



/*
====================================
GET ACTIVE COMPLAINTS
pending + in_progress
====================================
*/
export const getActiveComplaints = async (req, res) => {

  try {

    const complaints = await prisma.complaint.findMany({

      where: {
        status: {
          in: ["pending", "in_progress"]
        }
      },

      include: {
        student: {
          select: {
            name: true,
            roomNumber: true
          }
        }
      },

      orderBy: {
        createdAt: "desc"
      }

    });

    res.status(200).json({
      success: true,
      complaints
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error fetching active complaints"
    });

  }

};




/*
====================================
GET RESOLVED COMPLAINTS
====================================
*/
export const getResolvedComplaints = async (req, res) => {

  try {

    const complaints = await prisma.complaint.findMany({

      where: {
        status: "resolved"
      },

      include: {
        student: {
          select: {
            name: true,
            roomNumber: true
          }
        }
      }

    });

    res.status(200).json({
      success: true,
      complaints
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error fetching resolved complaints"
    });

  }

};




/*
====================================
UPDATE STATUS
====================================
*/
export const updateComplaintStatus = async (req, res) => {

  try {

    const complaintId = Number(req.params.id);

    const { status } = req.body;


    // Validate enum value
    const validStatus = ["pending", "in_progress", "resolved"];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }


    const updatedComplaint = await prisma.complaint.update({

      where: {
        id: complaintId
      },

      data: {
        status,
        resolvedAt: status === "resolved" ? new Date() : null
      }

    });

    res.status(200).json({
      success: true,
      message: "Complaint status updated",
      complaint: updatedComplaint
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error updating complaint"
    });

  }

};










// CREATE ANNOUNCEMENT
export const createAnnouncement = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const announcement = await prisma.announcement.create({
      data: {
        title,
        description,
        createdById: req.user.id // ✅ only this needed
      }
    });

    res.status(201).json({
      message: "Announcement created successfully",
      announcement,
    });

  } catch (error) {
    console.error("CREATE ERROR FULL:", error);
console.error("MESSAGE:", error.message);
console.error("STACK:", error.stack);
    res.status(500).json({ message: "Error creating announcement" });
  }
};


// GET ALL ANNOUNCEMENTS
export const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await prisma.announcement.findMany({
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            hostelNo: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(announcements);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching announcements" });
  }
};



// UPDATE ANNOUNCEMENT
export const updateAnnouncement = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, description, hostelNo } = req.body;

    const announcement = await prisma.announcement.update({
      where: { id },
      data: {
        title,
        description,
        hostelNo,
      },
    });

    res.status(200).json({
      message: "Announcement updated successfully",
      announcement,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating announcement" });
  }
};



// DELETE ANNOUNCEMENT
export const deleteAnnouncement = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.announcement.delete({
      where: { id },
    });

    res.status(200).json({
      message: "Announcement deleted successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting announcement" });
  }
};










// GET all extension requests (Admin)
export const getAllExtensionRequests = async (req, res) => {
  try {

    const requests = await prisma.extensionRequest.findMany({

      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            roomNumber: true,
          }
        }
      },

      orderBy: {
        createdAt: "desc"
      }

    });

    res.status(200).json(requests);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching extension requests"
    });
  }
};



// APPROVE extension request
export const approveExtensionRequest = async (req, res) => {

  try {

    const requestId = Number(req.params.id);

    const updatedRequest = await prisma.extensionRequest.update({

      where: { id: requestId },

      data: {
        status: "approved"
      }

    });

    res.status(200).json({
      message: "Extension request approved",
      updatedRequest
    });

  } catch (error) {
    res.status(500).json({
      message: "Error approving extension request"
    });
  }
};



// REJECT extension request
export const rejectExtensionRequest = async (req, res) => {

  try {

    const requestId = Number(req.params.id);

    const updatedRequest = await prisma.extensionRequest.update({

      where: { id: requestId },

      data: {
        status: "rejected"
      }

    });

    res.status(200).json({
      message: "Extension request rejected",
      updatedRequest
    });

  } catch (error) {
    res.status(500).json({
      message: "Error rejecting extension request"
    });
  }
};