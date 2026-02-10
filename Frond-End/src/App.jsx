import { useState, useEffect } from "react";
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
import VerifyOTP from "./registration/VerifyOTP.jsx";
import NotFound from "./pages/NotFound.jsx";
import ForgotPassword from "./registration/ForgotPassword.jsx";
import ClasicTemplate from "./template/ClasicTemplate.jsx";
import CreativeTemplate from "./template/CreativeTemplate.jsx";

import "./App.css";

const App = () => {
  // Resume state
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

  // 🔹 API TEST STATE
  const [apiData, setApiData] = useState(null);

  // 🔹 BACKEND CALL (/api/test)
  useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend response:", data);
        setApiData(data);
      })
      .catch((err) => console.error("API error:", err));
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />

        {/* Backend test display (temporary) */}
        {apiData && (
          <div className="text-center text-green-700 text-sm py-2">
            Backend OK: {JSON.stringify(apiData)}
          </div>
        )}

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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/clasic" element={<ClasicTemplate />} />
          <Route path="/creative" element={<CreativeTemplate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
