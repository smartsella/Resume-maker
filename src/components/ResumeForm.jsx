import React, { useState } from "react";
import {
  FaUser,
  FaCode,
  FaProjectDiagram,
  FaBriefcase,
  FaRocket,
  FaGraduationCap,
  FaFileAlt,
  FaCheckCircle,
} from "react-icons/fa";

// Import the missing components
import SkillsManager from "./SkillsManager";
import ProjectsManager from "./ProjectsManager";
import ExperienceManager from "./ExperienceManager";
import ResumePreview from "./ResumePreview";

const ResumeForm = ({ resumeData, setResumeData }) => {
  const [activeTab, setActiveTab] = useState("personal");

  const tabs = [
    { id: "personal", label: "Personal Info", icon: FaUser },
    { id: "skills", label: "Skills", icon: FaCode },
    { id: "projects", label: "Projects", icon: FaProjectDiagram },
    { id: "experience", label: "Internships", icon: FaBriefcase },
    { id: "hackathons", label: "Hackathons", icon: FaRocket },
    { id: "education", label: "Education", icon: FaGraduationCap },
    { id: "preview", label: "Preview", icon: FaFileAlt },
  ];

  const updatePersonalInfo = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const updateSummary = (value) => {
    setResumeData((prev) => ({ ...prev, summary: value }));
  };

  const getTabStatus = (tabId) => {
    switch (tabId) {
      case "personal":
        return !!resumeData.personalInfo.name;
      case "skills":
        return resumeData.skills.technical.length > 0;
      case "projects":
        return resumeData.projects.length > 0;
      case "experience":
        return resumeData.experience.internships.length > 0;
      case "hackathons":
        return resumeData.experience.hackathons.length > 0;
      case "education":
        return resumeData.education.length > 0;
      default:
        return false;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                  {resumeData.personalInfo.name && (
                    <FaCheckCircle className="inline text-green-500 ml-2" />
                  )}
                </label>
                <input
                  type="text"
                  value={resumeData.personalInfo.name}
                  onChange={(e) => updatePersonalInfo("name", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                  {resumeData.personalInfo.email && (
                    <FaCheckCircle className="inline text-green-500 ml-2" />
                  )}
                </label>
                <input
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo("email", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={resumeData.personalInfo.location}
                  onChange={(e) =>
                    updatePersonalInfo("location", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="City, Country"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) =>
                    updatePersonalInfo("linkedin", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio/GitHub
                </label>
                <input
                  type="url"
                  value={resumeData.personalInfo.portfolio}
                  onChange={(e) =>
                    updatePersonalInfo("portfolio", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://github.com/yourusername"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Summary
                {resumeData.summary.length > 50 && (
                  <FaCheckCircle className="inline text-green-500 ml-2" />
                )}
              </label>
              <textarea
                value={resumeData.summary}
                onChange={(e) => updateSummary(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Write a brief summary about your professional background, skills, and career objectives..."
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>Minimum 50 characters recommended</span>
                <span>{resumeData.summary.length}/50</span>
              </div>
            </div>
          </div>
        );

      case "skills":
        return (
          <SkillsManager
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        );

      case "projects":
        return (
          <ProjectsManager
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        );

      case "experience":
        return (
          <ExperienceManager
            resumeData={resumeData}
            setResumeData={setResumeData}
            type="internships"
            title="Internships & Work Experience"
          />
        );

      case "hackathons":
        return (
          <ExperienceManager
            resumeData={resumeData}
            setResumeData={setResumeData}
            type="hackathons"
            title="Hackathons & Competitions"
          />
        );

      case "education":
        return (
          <ExperienceManager
            resumeData={resumeData}
            setResumeData={setResumeData}
            type="education"
            title="Education"
          />
        );

      case "preview":
        return <ResumePreview resumeData={resumeData} />;

      default:
        return (
          <div className="text-center py-8">
            <h3 className="text-xl font-semibold text-gray-800">
              Select a section to get started
            </h3>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-4 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Resume Sections
            </h3>
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isCompleted = getTabStatus(tab.id);
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? "bg-blue-500 text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="text-lg" />
                      <span className="font-medium">{tab.label}</span>
                    </div>
                    {isCompleted && (
                      <FaCheckCircle className="text-green-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-lg p-8 min-h-[600px]">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
