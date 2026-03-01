import Navbar from "../components/Navbar";

const AdminLayout = ({ children }) => {

  return (
    <div>
      <Navbar role="ADMIN" />
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;