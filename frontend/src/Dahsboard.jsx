import React from "react";
import { Link } from "react-router-dom";


const features = [
  {
    title: "Room Management",
    description:
      "Allocate rooms, track occupancy and manage hostel capacity efficiently.",
    icon: "🏢",
  },
  {
    title: "Fee Management",
    description:
      "Monitor payments, track pending dues and maintain financial records.",
    icon: "💳",
  },
  {
    title: "Complaint System",
    description:
      "Students raise issues and admins track & resolve them efficiently.",
    icon: "⚠️",
  },
];

function Dashboard() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      
      {/* 🔷 NAVBAR */}
      <nav className="bg-linear-to-r from-blue-900 to-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wide">
            Hostel Management System
          </h1>

          <div className="space-x-4">
            <Link
              to="/loginStudent"
              className="hover:text-gray-200 transition"
            >
              Student Login
            </Link>

            <Link
              to="/loginAdmin"
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-medium transition"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </nav>

      {/* 🔥 HERO SECTION */}
<section
  className="relative h-screen flex items-center justify-center text-center text-white"
  style={{
    backgroundImage: "url('https://media.licdn.com/dms/image/v2/C4D1BAQGm8R3TrgmH7g/company-background_10000/company-background_10000/0/1651111385364/jabalpur_engineering_college_cover?e=2147483647&v=beta&t=D58OpmwvVj6FFhKpBKzwEjZGqM7D3pTHWNpgZYCQQs4')",
    backgroundSize: "cover",
    backgroundPosition: "center",

  }}
>
  <div className="absolute inset-0 bg-black/40"></div>

  <div className="relative z-10 px-6">
    <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
      Smart Hostel Management
    </h2>
    <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
      Manage students, rooms, fees, complaints and administration
      seamlessly in one powerful platform.
    </p>

    <div className="space-x-4">
      <Link
        to="/loginStudent"
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-semibold transition transform hover:scale-105"
      >
        Student Portal
      </Link>

      <Link
        to="/loginAdmin"
        className="border border-white hover:bg-white hover:text-black px-6 py-3 rounded-lg text-lg font-semibold transition transform hover:scale-105"
      >
        Admin Dashboard
      </Link>
    </div>
  </div>
</section>


      {/* 🌟 FEATURES SECTION */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <h3 className="text-3xl font-bold text-center mb-12">
            Key Features
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 text-center transition transform hover:-translate-y-3 hover:shadow-2xl"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 CTA SECTION */}
      <section className="py-16 bg-linear-to-r from-blue-800 to-blue-600 text-white text-center">
        <h3 className="text-3xl font-bold mb-4">
          Ready to Simplify Hostel Management?
        </h3>
        <p className="mb-6 text-lg">
          Join our platform and manage everything efficiently.
        </p>

        <Link
          to="/login?role=student"
          className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Get Started
        </Link>
      </section>

      {/* 🔻 FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-center">
        <p>© 2026 Hostel Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Dashboard;