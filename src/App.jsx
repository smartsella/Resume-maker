import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ResumeForm from "./components/ResumeForm";
import Header from "./components/Header";
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
            path="/build"
            element={
              <ResumeForm
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
