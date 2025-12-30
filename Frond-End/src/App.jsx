import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import ResumeForm from "./pages/ResumeForm.jsx";
import Header from "./components/Navbar.jsx";
import Login from "./registration/Login.jsx";
import Register from "./registration/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import VerifyOTP from "./registration/VerifyOTP.jsx";
import NotFound from "./pages/NotFound.jsx";
import ForgotPassword from "./registration/ForgotPassword.jsx";
import ClasicTemplate from "./template/ClasicTemplate.jsx";
import CreativeTemplate from "./template/CreativeTemplate.jsx";

const App = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      portfolio: "",
    },
    summary: "",
    skills: {
      technical: [],
      soft: [],
    },
    projects: [],
    experience: {
      internships: [],
      jobs: [],
      hackathons: [],
    },
    education: [],
  });

  // Always show login page on first entrance by redirecting root to /login.
  // Dashboard should remain accessible without login at /dashboard.
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/dashboard"
            element={<Dashboard resumeData={resumeData} />}
          />
          <Route
            path="/resumemaking"
            element={
              <ResumeForm
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/clasic" element={<ClasicTemplate />} />
          <Route path="/creative" element={<CreativeTemplate />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
