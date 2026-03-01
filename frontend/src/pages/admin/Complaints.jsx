import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getAllComplaints, updateComplaintStatus } from "../../services/adminApi";

const Complaints = () => {

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const res = await getAllComplaints();
    setComplaints(res.data);
  };

  const handleStatusChange = async (id, status) => {

    await updateComplaintStatus(id, status);

    fetchComplaints();
  };

  return (
    <AdminLayout>

      <h1 className="text-2xl font-semibold mb-4">
        Complaints
      </h1>

      <div className="bg-white shadow rounded p-4">

        {complaints.map((c) => (

          <div
            key={c.id}
            className="border-b py-3 flex justify-between"
          >

            <div>
              <h2 className="font-semibold">{c.title}</h2>
              <p>{c.description}</p>
              <p className="text-sm text-gray-500">
                Student: {c.student.name}
              </p>
            </div>

            <select
              value={c.status}
              onChange={(e) =>
                handleStatusChange(c.id, e.target.value)
              }
              className="border px-2 py-1 rounded"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>

          </div>

        ))}

      </div>

    </AdminLayout>
  );
};

export default Complaints;