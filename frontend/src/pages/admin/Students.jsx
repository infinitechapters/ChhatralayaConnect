import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getAllStudents } from "../../services/adminApi";

const Students = () => {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await getAllStudents();
    setStudents(res.data);
  };

  return (
    <AdminLayout>

      <h1 className="text-2xl mb-4">Students</h1>

      <table className="w-full bg-white shadow rounded">

        <thead>
          <tr className="bg-gray-100">
            <th>Name</th>
            <th>Room</th>
            <th>Course</th>
          </tr>
        </thead>

        <tbody>

          {students.map((student) => (

            <tr key={student.id}>

              <td>{student.name}</td>
              <td>{student.roomNumber}</td>
              <td>{student.course}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </AdminLayout>
  );
};

export default Students;