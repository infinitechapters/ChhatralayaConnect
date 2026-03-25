import prisma from "../prismaClient.js";
import bcrypt from "bcryptjs";
import { sendAnnouncementMail } from "../utils/sendMail.js";


// GET DASHBOARD STATS
export const getDashboardStats = async (req, res) => {
  try {

    const totalStudents = await prisma.student.count({
      where: { isVerified: true }
    });

    const pendingComplaints = await prisma.complaint.count({
      where: {
        status: { in: ["pending", "in_progress"] }
      }
    });

    const totalRooms = await prisma.room.count();

    res.status(200).json({
      totalStudents,
      pendingComplaints,
      totalRooms
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
};

//get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: {
        room: {
          select: {
            roomNumber: true,
            hostelNo: true,
          }
        }
      }
    });

    res.status(200).json({ students });

  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const studentId = Number(req.params.id);

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        room: true
      }
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);

  } catch (error) {
    res.status(500).json({ message: "Error fetching student" });
  }
};

//assign room to student
export const assignRoomToStudent = async (req, res) => {
  try {
    const { studentId, roomId } = req.body;

    const updatedStudent = await prisma.student.update({
      where: { id: Number(studentId) },
      data: {
        roomId: Number(roomId),
      },
      include: {
        room: true,
      }
    });

    res.status(200).json({
      message: "Room assigned successfully",
      student: updatedStudent,
    });

  } catch (error) {
    console.error("ASSIGN ROOM ERROR:", error);
    res.status(500).json({ message: "Error assigning room" });
  }
};

export const sendAnnouncementEmail = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // fetch the announcement
    const announcement = await prisma.announcement.findUnique({
      where: { id },
    });

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    // fetch all student emails from db
    const students = await prisma.student.findMany({
      select: { email: true },
    });

    const emails = students.map(s => s.email).filter(Boolean);

    if (emails.length === 0) {
      return res.status(400).json({ message: "No student emails found" });
    }

    await sendAnnouncementMail(emails, announcement.title, announcement.description);

    // ✅ CORRECT — wrap in backticks
    res.status(200).json({ message: `Mail sent to ${emails.length} students` });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending emails" });
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
      roomId,
      enrollmentNo,
      contact
    } = req.body;

    const parsedSemester = semester ? Number(semester) : null;
    const parsedRoomId = roomId ? Number(roomId) : null;

    const existingStudent = await prisma.student.findUnique({
      where: { email }
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await prisma.student.create({
      data: {
        name,
        email,
        password: hashedPassword,
        branch,
        semester: parsedSemester,
        roomId: parsedRoomId,
        enrollmentNo,
        contact,
        isVerified: false   // ✅ IMPORTANT
      }
    });

    res.status(201).json({
      success: true,
      message: "Student added successfully",
      student
    });

  } catch (error) {
    console.error("ADD STUDENT ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// UPDATE STUDENT BY ADMIN
export const updateStudentByAdmin = async (req, res) => {
  try {
    const studentId = Number(req.params.id);

    const {
      enrollmentNo,
      name,
      email,
      branch,
      year,
      semester,
      contact,
      permanentAddress,
      parentName,
      parentNumber,
      LgName,
      LgNumber,
      LgAddress
    } = req.body;

    // Optional: Check if student is verified first
    const student = await prisma.student.findUnique({
      where: { id: studentId }
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // 🔒 Only allow update if verified (optional logic)
    // if (!student.isVerified) {
    //   return res.status(400).json({
    //     message: "Student is not verified yet"
    //   });
    // }

    const updatedStudent = await prisma.student.update({
      where: { id: studentId },
      data: {
        enrollmentNo,
        name,
        email,
        branch,
        year: year ? Number(year) : undefined,
        semester: semester ? Number(semester) : undefined,
        contact,
        permanentAddress,
        parentName,
        parentNumber,
        LgName,
        LgNumber,
        LgAddress
      }
    });

    res.status(200).json({
      message: "Student updated by admin successfully",
      student: updatedStudent
    });

  } catch (error) {
    console.error("ADMIN UPDATE ERROR:", error);
    res.status(500).json({
      message: "Error updating student"
    });
  }
};

// vacant rooms 
  export const getVacantRooms = async (req, res) => {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        _count: {
          select: { students: true }
        }
      }
    });

    const vacantRooms = rooms.filter(
      room => room._count.students < room.capacity
    );

    res.json({ rooms: vacantRooms });

  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms" });
  }
};


// VERIFY STUDENT PROFILE
export const verifyStudentProfile = async (req, res) => {
  try {
    const studentId = Number(req.params.id);

    const updatedStudent = await prisma.student.update({
      where: { id: studentId },
      data: { isVerified: true }
    });

    res.status(200).json({
      success: true,
      message: "Student profile verified successfully",
      student: updatedStudent
    });

  } catch (error) {
    console.error("VERIFY ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error verifying student"
    });
  }
};


// ✅ Get Verified Students
export const getVerifiedStudents = async (req, res) => {
  try {

    const students = await prisma.student.findMany({
      where: { isVerified: true },

      include: {
        room: {
          select: {
            id: true,
            roomNumber: true,
            hostelNo: true
          }
        }
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


// GET ALL 

export const getAllComplaints = async (req, res) => {
  try {

    const complaints = await prisma.complaint.findMany({
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            room: {
              select: {
                roomNumber: true,
                hostelNo: true
              }
            }
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
    console.error("COMPLAINT FETCH ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching complaints"
    });
  }
};


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
            room: {
  select: { roomNumber: true }
}
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
            room: {
  select: { roomNumber: true }
}
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



export const getAllAnnouncements = async (req, res) => {
  try {
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5); // 👈 5 days back

    const announcements = await prisma.announcement.findMany({
      where: {
        createdAt: {
          gte: fiveDaysAgo, // only announcements from last 5 days
        },
      },
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

// GET ALL ANNOUNCEMENTS
// export const getAllAnnouncements = async (req, res) => {
//   try {
//     const announcements = await prisma.announcement.findMany({
//       include: {
//         createdBy: {
//           select: {
//             id: true,
//             name: true,
//             hostelNo: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     res.status(200).json(announcements);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error fetching announcements" });
//   }
// };



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
            enrollmentNo: true,
            room: {
              select: {
                roomNumber: true,
                hostelNo: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.status(200).json(requests);

  } catch (error) {
    console.error("EXTENSION FETCH ERROR:", error);
    res.status(500).json({ message: "Error fetching requests" });
  }
};

//Update extension request status (Admin)
export const updateExtensionStatus = async (req, res) => {
  try {
    const requestId = Number(req.params.id);
    const { status } = req.body;

    const validStatus = ["approved", "rejected"];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value"
      });
    }

    const updated = await prisma.extensionRequest.update({
      where: { id: requestId },
      data: { status }
    });

    res.status(200).json({
      message: `Extension ${status} successfully`,
      updated
    });

  } catch (error) {
    console.error("UPDATE EXTENSION ERROR:", error);
    res.status(500).json({ message: "Error updating extension" });
  }
};
