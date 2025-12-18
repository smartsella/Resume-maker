import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaFileAlt,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Auth state (simple & realistic)
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // { name, email }
  const isLoggedIn = !!token;

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <FaFileAlt className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">ResumeMaker</h1>
          </div>

          {/* Nav */}
          <nav className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-2 rounded-lg px-4 py-2 transition ${
                location.pathname === "/"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>Dashboard</span>
            </Link>

            <Link
              to="/resumemaking"
              className={`flex items-center space-x-2 rounded-lg px-4 py-2 transition ${
                location.pathname === "/resumemaking"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <FaFileAlt />
              <span>Build Resume</span>
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Profile */}
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-blue-500">
                    <FaUser className="text-white" />
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold text-gray-800">
                      {user?.name || "User"}
                    </p>
                    <p className="text-gray-500">Profile</p>
                  </div>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition"
                >
                  <FaSignInAlt />
                  <span>Login</span>
                </Link>

                <Link
                  to="/register"
                  className="flex items-center space-x-2 rounded-lg border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-50 transition"
                >
                  <FaUserPlus />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
