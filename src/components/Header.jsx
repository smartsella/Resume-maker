import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaFileAlt, FaCheckCircle } from "react-icons/fa";

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <FaCheckCircle className="text-white text-lg" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Resume Maker</h1>
          </div>

          <nav className="flex space-x-4">
            <Link to="/">
              <div
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  location.pathname === "/"
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FaHome />
                <span>Dashboard</span>
              </div>
            </Link>
            <Link to="/build">
              <div
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  location.pathname === "/build"
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FaFileAlt />
                <span>Build Resume</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
