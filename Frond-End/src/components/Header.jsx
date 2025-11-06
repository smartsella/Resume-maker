import { Link, useLocation } from "react-router-dom";
import { FaFileAlt, FaUser, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Header = () => {
  const location = useLocation();
  const isLoggedIn = false; // Change this based on your auth state

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Left Side - Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FaFileAlt className="text-white text-lg" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">ResumeMaker</h1>
          </div>

          {/* Center - Navigation */}
          <nav className="flex space-x-4">
            <Link to="/">
              <div
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  location.pathname === "/"
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>Dashboard</span>
              </div>
            </Link>
            <Link to="/resumemaking">
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

          {/* Right Side - User Section */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-all">
                  <FaUser className="text-white" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-gray-800">John Doe</p>
                  <p className="text-gray-500">Profile</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all cursor-pointer">
                    <FaSignInAlt />
                    <span>Login</span>
                  </div>
                </Link>
                <Link to="/register">
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
                    <FaUserPlus />
                    <span>Register</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
