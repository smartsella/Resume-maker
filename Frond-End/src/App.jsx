import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import ResumeForm from "./pages/ResumeForm.jsx";
import Header from "./components/Header.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/Register.jsx";
import "./App.css";

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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
