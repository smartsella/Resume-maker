import React from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaCode,
  FaProjectDiagram,
  FaBriefcase,
  FaGraduationCap,
  FaRocket,
  FaChartLine,
  FaExclamationTriangle,
} from "react-icons/fa";

const Dashboard = ({ resumeData }) => {
  const calculateScore = () => {
    let score = 0;
    let totalPoints = 0;

    // Personal Info (20 points)
    totalPoints += 20;
    if (resumeData.personalInfo.name) score += 5;
    if (resumeData.personalInfo.email) score += 5;
    if (resumeData.personalInfo.phone) score += 5;
    if (resumeData.personalInfo.location) score += 5;

    // Skills (20 points)
    totalPoints += 20;
    if (resumeData.skills.technical.length >= 3) score += 10;
    if (resumeData.skills.soft.length >= 2) score += 10;

    // Projects (20 points)
    totalPoints += 20;
    if (resumeData.projects.length >= 2) score += 20;

    // Experience (20 points)
    totalPoints += 20;
    if (resumeData.experience.internships.length >= 1) score += 10;
    if (resumeData.experience.hackathons.length >= 1) score += 10;

    // Education (10 points)
    totalPoints += 10;
    if (resumeData.education.length >= 1) score += 10;

    // Summary (10 points)
    totalPoints += 10;
    if (resumeData.summary.length > 50) score += 10;

    return Math.round((score / totalPoints) * 100);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = (score) => {
    if (score >= 80) return "Excellent! Your resume is well-structured.";
    if (score >= 60) return "Good! Some improvements needed.";
    return "Needs significant improvements.";
  };

  const checkIssues = () => {
    const issues = [];

    if (!resumeData.personalInfo.name) {
      issues.push("Missing full name");
    }
    if (!resumeData.personalInfo.email) {
      issues.push("Missing email address");
    }
    if (resumeData.skills.technical.length < 3) {
      issues.push("Add at least 3 technical skills");
    }
    if (resumeData.projects.length < 2) {
      issues.push("Include at least 2 projects");
    }
    if (
      resumeData.experience.internships.length === 0 &&
      resumeData.experience.hackathons.length === 0
    ) {
      issues.push("Add internships or hackathon experience");
    }
    if (resumeData.summary.length < 50) {
      issues.push("Write a more detailed professional summary");
    }

    return issues;
  };

  const score = calculateScore();
  const issues = checkIssues();

  const sections = [
    {
      icon: FaUser,
      label: "Personal Info",
      completed: !!resumeData.personalInfo.name,
      status: resumeData.personalInfo.name ? "Complete" : "Incomplete",
      color: resumeData.personalInfo.name ? "green" : "red",
    },
    {
      icon: FaCode,
      label: "Technical Skills",
      completed: resumeData.skills.technical.length >= 3,
      status: `${resumeData.skills.technical.length}/3 skills`,
      color: resumeData.skills.technical.length >= 3 ? "green" : "red",
    },
    {
      icon: FaProjectDiagram,
      label: "Projects",
      completed: resumeData.projects.length >= 2,
      status: `${resumeData.projects.length}/2 projects`,
      color: resumeData.projects.length >= 2 ? "green" : "red",
    },
    {
      icon: FaBriefcase,
      label: "Internships",
      completed: resumeData.experience.internships.length >= 1,
      status: `${resumeData.experience.internships.length} added`,
      color: resumeData.experience.internships.length >= 1 ? "green" : "red",
    },
    {
      icon: FaRocket,
      label: "Hackathons",
      completed: resumeData.experience.hackathons.length >= 1,
      status: `${resumeData.experience.hackathons.length} added`,
      color: resumeData.experience.hackathons.length >= 1 ? "green" : "red",
    },
    {
      icon: FaGraduationCap,
      label: "Education",
      completed: resumeData.education.length >= 1,
      status: `${resumeData.education.length} added`,
      color: resumeData.education.length >= 1 ? "green" : "red",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Resume Quality Checker
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Analyze and improve your resume with our comprehensive checker
        </p>
      </div>

      {/* Score Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Resume Score
            </h2>
            <p className="text-gray-600">
              Based on industry standards and best practices
            </p>
          </div>

          <div className="text-center">
            <div className={`text-5xl font-bold ${getScoreColor(score)} mb-2`}>
              {score}%
            </div>
            <div className="text-gray-600 font-medium">
              {getScoreMessage(score)}
            </div>
          </div>

          <Link to="/build">
            <button className="px-8 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors">
              {score === 0 ? "Start Building" : "Improve Resume"}
            </button>
          </Link>
        </div>
      </div>

      <div className="resume-checker-grid">
        {/* Progress Sections */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Resume Sections
          </h3>
          <div className="space-y-4">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.label}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${
                        section.color === "green"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      <Icon />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {section.label}
                      </div>
                      <div
                        className={`text-sm ${
                          section.color === "green"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {section.status}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      section.color === "green" ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Issues & Recommendations */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <FaExclamationTriangle className="text-yellow-500 text-xl" />
            <h3 className="text-xl font-bold text-gray-800">
              Areas for Improvement
            </h3>
          </div>

          {issues.length === 0 ? (
            <div className="text-center py-8">
              <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
              <p className="text-gray-600 font-medium">
                Great! No critical issues found.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {issues.map((issue, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                >
                  <FaExclamationTriangle className="text-yellow-500 mt-1" />
                  <span className="text-yellow-800">{issue}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tips Section */}
          <div className="mt-8">
            <h4 className="font-semibold text-gray-800 mb-4">
              Pro Tips for Better Resume
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p>Include specific technologies and frameworks in skills</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p>Add live project links and GitHub repositories</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p>Quantify achievements with numbers and metrics</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <p>Keep professional summary between 3-5 lines</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
