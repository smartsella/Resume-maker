import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import ResumeForm from "./pages/ResumeForm.jsx";
import Header from "./components/Navbar.jsx";
import Login from "./registration/Login.jsx";
import Register from "./registration/Register.jsx";
import "./App.css";
import VerifyOTP from "./registration/VerifyOTP.jsx";
import NotFound from "./pages/NotFound.jsx";
import ForgotPassword from "./registration/ForgotPassword.jsx";

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

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard resumeData={resumeData} />} />
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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
