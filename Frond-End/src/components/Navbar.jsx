import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaFileAlt,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, user, logout } = useContext(AuthContext);

  const isLoggedIn = Boolean(token);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-600">
              <FaFileAlt className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">ResumeMaker</h1>
          </div>

          {/* Navigation (NO AUTH CHECK) */}
          <nav className="flex gap-4">
            {/* Dashboard */}
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded ${
                location.pathname === "/dashboard"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Dashboard
            </Link>

            {/* Build Resume */}
            <Link
              to="/resumemaking"
              className={`px-4 py-2 rounded ${
                location.pathname === "/resumemaking"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Build Resume
            </Link>
          </nav>

          {/* Right buttons */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                {/* <div className="text-sm text-gray-700 mr-2">
                  {user?.name || user?.email}
                </div> */}
                {/* <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                    {(user?.name || user?.email)?.[0]?.toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 truncate max-w-[120px]">
                    {user?.name || user?.email}
                  </span>
                </div> */}
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
                    {(user?.name || user?.email)?.charAt(0).toUpperCase()}
                  </div>

                  {/* Name / Email */}
                  <div className="text-sm">
                    <p className="font-semibold text-gray-800 leading-none">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  <FaSignInAlt />
                  Login
                </Link>

                <Link
                  to="/register"
                  className="flex items-center gap-2 rounded border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-50"
                >
                  <FaUserPlus />
                  Register
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
