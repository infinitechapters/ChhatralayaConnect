import React, { useEffect, useState } from "react";
import API from "../../services/api";
import StudentLayout from "../../layouts/StudentLayout";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/students/profile");
      setProfile(res.data);
    } catch (err) {
      setError("Failed to load profile");
    }
  };

  const handleChange = (e) => {
    setProfile(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await API.put("/students/profile", profile);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  if (!profile) return <div className="p-6">Loading...</div>;

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold mb-6">
          My Profile
        </h1>

        {message && (
          <div className="bg-green-100 text-green-600 p-3 rounded mb-4">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

          {/* Read Only Fields */}
          <Input label="Name" value={profile.name} disabled />
          <Input label="Email" value={profile.email} disabled />
          <Input label="Enrollment No" value={profile.enrollmentNo} disabled />
          <Input label="Room Number" value={profile.roomNumber} disabled />
          <Input label="Hostel No" value={profile.hostelNo} disabled />

        {/* Editable Fields */}

<Input
  label="Branch"
  name="branch"
  value={profile.branch || ""}
  onChange={handleChange}
/>

<Input
  label="Year"
  name="year"
  value={profile.year || ""}
  onChange={handleChange}
/>

<Input
  label="Semester"
  name="semester"
  value={profile.semester || ""}
  onChange={handleChange}
/>

<Input
  label="Contact"
  name="contact"
  value={profile.contact || ""}
  onChange={handleChange}
/>

<div className="md:col-span-2">
  <label className="block text-sm font-medium mb-1">
    Permanent Address
  </label>
  <textarea
    name="permanentAddress"
    value={profile.permanentAddress || ""}
    onChange={handleChange}
    className="w-full border px-4 py-2 rounded-lg"
  />
</div>

<Input
  label="Parent Name"
  name="parentName"
  value={profile.parentName || ""}
  onChange={handleChange}
/>

<Input
  label="Parent Number"
  name="parentNumber"
  value={profile.parentNumber || ""}
  onChange={handleChange}
/>

<Input
  label="Local Guardian Name"
  name="LgName"
  value={profile.LgName || ""}
  onChange={handleChange}
/>

<Input
  label="Local Guardian Number"
  name="LgNumber"
  value={profile.LgNumber || ""}
  onChange={handleChange}
/>

<div className="md:col-span-2">
  <label className="block text-sm font-medium mb-1">
    Local Guardian Address
  </label>
  <textarea
    name="LgAddress"
    value={profile.LgAddress || ""}
    onChange={handleChange}
    className="w-full border px-4 py-2 rounded-lg"
  />
</div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Update Profile
            </button>
          </div>

        </form>
      </div>
    </StudentLayout>
  );
};

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1">
      {label}
    </label>
    <input
      {...props}
      className="w-full border px-4 py-2 rounded-lg bg-white"
    />
  </div>
);

export default StudentProfile;