import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ role }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");

    navigate("/login");
  };

  const basePath = role.toLowerCase();

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 shadow-md flex justify-between items-center">

      {/* Logo */}
      <div className="text-xl font-semibold">
        {role === "ADMIN" ? "Admin Portal" : "Student Portal"}
      </div>

      {/* Links */}
      <div className="flex gap-6 items-center font-medium">

        <Link
          to={`/${basePath}/dashboard`}
          className="hover:text-gray-200 transition"
        >
          Dashboard
        </Link>

        {role === "ADMIN" && (
          <Link
            to="/admin/students"
            className="hover:text-gray-200 transition"
          >
            Students
          </Link>
        )}

        <Link
          to={`/${basePath}/rooms`}
          className="hover:text-gray-200 transition"
        >
          Rooms
        </Link>

        {role === "ADMIN" && (
          <Link
            to="/admin/fees"
            className="hover:text-gray-200 transition"
          >
            Fees
          </Link>
        )}

        <Link
          to={`/${basePath}/complaints`}
          className="hover:text-gray-200 transition"
        >
          Complaints
        </Link>

        <Link
          to={`/${basePath}/announcements`}
          className="hover:text-gray-200 transition"
        >
          Announcements
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;