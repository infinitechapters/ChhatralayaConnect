import Navbar from "../components/Navbar";

const StudentLayout = ({ children }) => {

  return (
    <div>
      <Navbar role="STUDENT" />
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default StudentLayout;