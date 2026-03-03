import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getAllStudents } from "../../services/adminApi";
import API from "../../services/api";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [vacantRooms, setVacantRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");

  useEffect(() => {
    fetchStudents();
    fetchVacantRooms();
  }, []);

  const fetchVacantRooms = async () => {
    try {
      const res = await API.get("/admin/vacant-rooms");
      setVacantRooms(res.data.rooms);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyStudent = async (id) => {
    try {
      await API.put(`/admin/verifyStudent/${id}`);
      alert("Student Verified Successfully");
      fetchStudents();
    } catch (error) {
      console.error(error);
    }
  };

  const assignRoom = async () => {
    try {
      await API.put("/admin/assign-room", {
        studentId: selectedStudent.id,
        roomId: selectedRoom,
      });

      alert("Room Assigned Successfully");

      fetchStudents();
      fetchVacantRooms();
      setSelectedStudent(null);

    } catch (error) {
      console.error(error);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await getAllStudents();
      setStudents(res.data.students || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-semibold mb-6">Hostel Students</h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Department</th>
              <th className="p-3">Semester</th>
              <th className="p-3">Enrollment No</th>
              <th className="p-3">Room</th>
              <th className="p-3">Profile Verified</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className="border-t hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.branch}</td>
                <td className="p-3">{student.semester}</td>
                <td className="p-3">{student.enrollmentNo}</td>

                {/* Room Column */}
                <td className="p-3">
                  {student.room?.roomNumber || "Not Assigned"}
                </td>

                {/* Profile Verified Column */}
                <td className="p-3">
                  {student.isVerified ? (
                    <span className="px-2 py-1 rounded text-sm bg-green-100 text-green-700">
                      Verified
                    </span>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        verifyStudent(student.id);
                      }}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Verify
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-125 p-6 relative">

            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">
              {selectedStudent.name}'s Details
            </h2>

            <div className="space-y-2">
              <p><strong>Enrollment No:</strong> {selectedStudent.enrollmentNo}</p>
              <p><strong>Department:</strong> {selectedStudent.branch}</p>
              <p><strong>Semester:</strong> {selectedStudent.semester}</p>

              {selectedStudent.room ? (

                <>
                  <p>
                    <strong>Room Number:</strong>{" "}
                    {selectedStudent.room.roomNumber}
                  </p>
                  <p>
                    <strong>Hostel:</strong>{" "}
                    {selectedStudent.room.hostelNo}
                  </p>
                </>

              ) : (

                <div className="mt-3">
                  <p className="mb-2 font-medium">Assign Room</p>

                  <select
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="border p-2 rounded w-full"
                  >
                    <option value="">Select Room</option>

                    {vacantRooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        Room {room.roomNumber} - Hostel {room.hostelNo}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={assignRoom}
                    disabled={!selectedRoom}
                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Assign Room
                  </button>
                </div>

              )}

              <p>
                <strong>Hostel:</strong>{" "}
                {selectedStudent.room?.hostelNo || "-"}
              </p>

              <p><strong>Email:</strong> {selectedStudent.email}</p>
              <p><strong>Phone:</strong> {selectedStudent.contact}</p>
              <p><strong>Address:</strong> {selectedStudent.permanentAddress}</p>
              <p><strong>Parent Name:</strong> {selectedStudent.parentName}</p>
              <p><strong>Parent Phone:</strong> {selectedStudent.parentNumber}</p>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Students;