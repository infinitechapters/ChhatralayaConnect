
// STUDENT DASHBOARD
export const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;

    // 1️⃣ Get Student Info
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      select: {
        name: true,
        email: true,
        enrollmentNo: true,
        course: true,
        year: true,
        roomNumber: true,
        hostelNo: true,
        createdAt: true,
      },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // 2️⃣ Complaint Stats
    const totalComplaints = await prisma.complaint.count({
      where: { studentId },
    });

    const pendingComplaints = await prisma.complaint.count({
      where: { studentId, status: "pending" },
    });

    const resolvedComplaints = await prisma.complaint.count({
      where: { studentId, status: "resolved" },
    });

    // 3️⃣ Extension Status
    const pendingExtensions = await prisma.extensionRequest.count({
      where: { studentId, status: "pending" },
    });

    // 4️⃣ Stay Duration (months)
    const today = new Date();
    const joinedDate = new Date(student.createdAt);

    const monthsStayed =
      (today.getFullYear() - joinedDate.getFullYear()) * 12 +
      (today.getMonth() - joinedDate.getMonth());

    // 5️⃣ Latest Announcements
    const latestAnnouncements = await prisma.announcement.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      welcome: `Welcome, ${student.name}`,
      basicInfo: {
        enrollmentNo: student.enrollmentNo,
        email: student.email,
        course: student.course,
        year: student.year,
        roomNumber: student.roomNumber,
        hostelNo: student.hostelNo,
      },
      complaints: {
        total: totalComplaints,
        pending: pendingComplaints,
        resolved: resolvedComplaints,
      },
      extensions: {
        pending: pendingExtensions,
      },
      stayDuration: {
        months: monthsStayed,
        since: student.createdAt,
      },
      announcements: latestAnnouncements,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error loading dashboard" });
  }
};

//  STUDENT PROFILE
export const getStudentProfile = async (req, res) => {
  try {
    const studentId = req.user.id;

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      select: {
        id: true,
        name: true,
        email: true,
        enrollmentNo: true,
        roomNumber: true,
        course: true,
        year: true,
        contact: true,
      },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);

  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

//ANNOUNCEMENTS
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Error fetching announcements" });
  }
};

//  COMPLAINT SECTION
// Submit Complaint
export const submitComplaint = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { title, description } = req.body;

    const complaint = await prisma.complaint.create({
      data: {
        title,
        description,
        studentId,
      },
    });

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: "Error submitting complaint" });
  }
};

// Get Student Complaints
export const getStudentComplaints = async (req, res) => {
  try {
    const studentId = req.user.id;

    const complaints = await prisma.complaint.findMany({
      where: { studentId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaints" });
  }
};

// EXTENSION REQUEST

// Submit Extension Request
export const submitExtensionRequest = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { reason, tillDate } = req.body;

    const extension = await prisma.extensionRequest.create({
      data: {
        reason,
        tillDate: new Date(tillDate),
        studentId,
      },
    });

    res.status(201).json({
      message: "Extension request submitted",
      extension,
    });
  } catch (error) {
    res.status(500).json({ message: "Error submitting extension request" });
  }
};


// Get Student Extension Requests
export const getExtensionRequests = async (req, res) => {
  try {
    const studentId = req.user.id;

    const requests = await prisma.extensionRequest.findMany({
      where: { studentId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching extension requests" });
  }
};