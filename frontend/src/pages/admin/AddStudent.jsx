import React, { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import API from "../../services/api";
import { useEffect } from "react";

const AddStudent = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
    semester: "",
    roomId: "",
    enrollmentNo: "",
    contact: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [rooms, setRooms] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
  fetchRooms();
}, []);

const fetchRooms = async () => {
  try {
    const res = await API.get("/admin/vacant-rooms");
    setRooms(res.data.rooms);
  } catch (error) {
    console.error(error);
  }
};

  // 🔥 Generate Rooms 101–122 and 201–228
  // const generateRooms = () => {
  //   const rooms = [];

  //   for (let i = 101; i <= 122; i++) {
  //     rooms.push({
  //       id: i,
  //       roomNumber: i,
  //       hostelNo: "1 (Ground Floor)",
  //     });
  //   }

  //   for (let i = 201; i <= 228; i++) {
  //     rooms.push({
  //       id: i,
  //       roomNumber: i,
  //       hostelNo: "1 (First Floor)",
  //     });
  //   }

  //   return rooms;
  // };

  // const roomOptions = generateRooms();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {

      const res = await API.post("/admin/add-student", {
        ...formData,
        roomId: Number(formData.roomId),
        semester: Number(formData.semester),
      });

      setMessage(res.data.message || "Student added successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
        branch: "",
        semester: "",
        roomId: "",
        enrollmentNo: "",
        contact: "",
      });

    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to add student"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6">
          🧑‍🎓 Register New Student
        </h2>

        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="enrollmentNo"
            placeholder="Enrollment Number"
            value={formData.enrollmentNo}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="branch"
            placeholder="Branch"
            value={formData.branch}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            name="semester"
            placeholder="Semester"
            value={formData.semester}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          {/* Room Select */}
          <select
  name="roomId"
  value={formData.roomId}
  onChange={handleChange}
  required
>
  <option value="">Select Room</option>

  {rooms.map((room) => (
    <option key={room.id} value={room.id}>
      Room {room.roomNumber} - Hostel {room.hostelNo}
    </option>
  ))}
</select>

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Registering..." : "Register Student"}
          </button>

        </form>
      </div>
    </AdminLayout>
  );
};

export default AddStudent;