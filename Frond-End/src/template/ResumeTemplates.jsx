import React, { useState } from "react";
import {
  FaDownload,
  FaFilePdf,
  FaFileWord,
  FaFileAlt,
  FaEdit,
  FaEye,
  FaArrowLeft,
  FaCheck,
} from "react-icons/fa";

const ResumeTemplates = ({ resumeData, onBack }) => {
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [previewMode, setPreviewMode] = useState(false);

  // Template designs
  const templates = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean and professional design",
      color: "bg-blue-500",
    },
    {
      id: "classic",
      name: "Classic",
      description: "Traditional resume format",
      color: "bg-gray-600",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Modern with creative elements",
      color: "bg-purple-500",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and clean layout",
      color: "bg-green-500",
    },
  ];

  // Download functions
  const downloadPDF = () => {
    alert("PDF download feature would be implemented here with jsPDF!");
    // In real implementation, use jsPDF to generate PDF
  };

  const downloadDOC = () => {
    alert("DOC download feature would be implemented here!");
    // In real implementation, generate DOC file
  };

  const downloadTXT = () => {
    // Generate text format
    const textContent = generateTextResume();
    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateTextResume = () => {
    let text = "";

    // Header
    text += `${resumeData.personalInfo.name || "Your Name"}\n`;
    text += "=".repeat(50) + "\n\n";

    // Contact Info
    if (resumeData.personalInfo.email)
      text += `Email: ${resumeData.personalInfo.email}\n`;
    if (resumeData.personalInfo.phone)
      text += `Phone: ${resumeData.personalInfo.phone}\n`;
    if (resumeData.personalInfo.location)
      text += `Location: ${resumeData.personalInfo.location}\n\n`;

    // Summary
    if (resumeData.summary) {
      text += "PROFESSIONAL SUMMARY\n";
      text += "-".repeat(20) + "\n";
      text += `${resumeData.summary}\n\n`;
    }

    // Skills
    if (
      resumeData.skills.technical.length > 0 ||
      resumeData.skills.soft.length > 0
    ) {
      text += "SKILLS\n";
      text += "-".repeat(20) + "\n";

      if (resumeData.skills.technical.length > 0) {
        text += `Technical: ${resumeData.skills.technical.join(", ")}\n`;
      }

      if (resumeData.skills.soft.length > 0) {
        text += `Soft Skills: ${resumeData.skills.soft.join(", ")}\n`;
      }
      text += "\n";
    }

    // Projects
    if (resumeData.projects.length > 0) {
      text += "PROJECTS\n";
      text += "-".repeat(20) + "\n";
      resumeData.projects.forEach((project) => {
        text += `${project.name}${
          project.duration ? ` (${project.duration})` : ""
        }\n`;
        text += `${project.description}\n`;
        if (project.technologies.length > 0) {
          text += `Technologies: ${project.technologies.join(", ")}\n`;
        }
        text += "\n";
      });
    }

    // Experience
    if (resumeData.experience.internships.length > 0) {
      text += "EXPERIENCE\n";
      text += "-".repeat(20) + "\n";
      resumeData.experience.internships.forEach((intern) => {
        text += `${intern.title}${
          intern.duration ? ` (${intern.duration})` : ""
        }\n`;
        text += `${intern.company}${
          intern.location ? `, ${intern.location}` : ""
        }\n`;
        if (intern.description) {
          text += `${intern.description}\n`;
        }
        text += "\n";
      });
    }

    // Education
    if (resumeData.education.length > 0) {
      text += "EDUCATION\n";
      text += "-".repeat(20) + "\n";
      resumeData.education.forEach((edu) => {
        text += `${edu.title}\n`;
        text += `${edu.company}${edu.duration ? ` | ${edu.duration}` : ""}\n`;
        if (edu.grade) text += `Grade: ${edu.grade}\n`;
        if (edu.description) text += `${edu.description}\n`;
        text += "\n";
      });
    }

    return text;
  };

  // Render template preview based on selection
  const renderTemplatePreview = () => {
    switch (selectedTemplate) {
      case "modern":
        return <ModernTemplate resumeData={resumeData} />;
      case "classic":
        return <ClassicTemplate resumeData={resumeData} />;
      case "creative":
        return <CreativeTemplate resumeData={resumeData} />;
      case "minimal":
        return <MinimalTemplate resumeData={resumeData} />;
      default:
        return <ModernTemplate resumeData={resumeData} />;
    }
  };

  if (previewMode) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setPreviewMode(false)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              <FaArrowLeft />
              Back to Templates
            </button>
            <div className="flex gap-3">
              <button
                onClick={downloadPDF}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                <FaFilePdf />
                PDF
              </button>
              <button
                onClick={downloadDOC}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <FaFileWord />
                DOC
              </button>
              <button
                onClick={downloadTXT}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                <FaFileAlt />
                TXT
              </button>
            </div>
          </div>

          {/* Resume Preview */}
          <div className="bg-white p-8 shadow-lg max-w-4xl mx-auto">
            {renderTemplatePreview()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Choose Template
            </h1>
            <p className="text-gray-600">
              Select a template and download your resume
            </p>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            <FaArrowLeft />
            Back to Editor
          </button>
        </div>

        {/* Template Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`bg-white rounded-lg shadow-md border-2 ${
                selectedTemplate === template.id
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-200"
              } cursor-pointer transition-all hover:shadow-lg`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <div
                className={`h-32 ${template.color} rounded-t-lg flex items-center justify-center`}
              >
                <span className="text-white font-semibold text-lg">
                  {template.name}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">{template.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {template.description}
                </p>
                {selectedTemplate === template.id && (
                  <div className="flex items-center gap-1 mt-2 text-green-600">
                    <FaCheck className="text-sm" />
                    <span className="text-sm font-medium">Selected</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setPreviewMode(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            <FaEye />
            Preview Template
          </button>
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
          >
            <FaDownload />
            Download All Formats
          </button>
        </div>

        {/* Quick Download Options */}
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Download
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 border border-red-300"
            >
              <FaFilePdf />
              PDF Format
            </button>
            <button
              onClick={downloadDOC}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 border border-blue-300"
            >
              <FaFileWord />
              DOC Format
            </button>
            <button
              onClick={downloadTXT}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 border border-gray-300"
            >
              <FaFileAlt />
              TXT Format
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Template Components
const ModernTemplate = ({ resumeData }) => (
  <div className="font-sans text-gray-800">
    <div className="text-center border-b-2 border-gray-300 pb-4 mb-6">
      <h1 className="text-3xl font-bold text-gray-900">
        {resumeData.personalInfo.name}
      </h1>
      <div className="flex justify-center gap-4 mt-2 text-sm">
        {resumeData.personalInfo.email && (
          <span>{resumeData.personalInfo.email}</span>
        )}
        {resumeData.personalInfo.phone && (
          <span>• {resumeData.personalInfo.phone}</span>
        )}
        {resumeData.personalInfo.location && (
          <span>• {resumeData.personalInfo.location}</span>
        )}
      </div>
    </div>

    {resumeData.summary && (
      <section className="mb-6">
        <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-3">
          Summary
        </h2>
        <p className="text-gray-700">{resumeData.summary}</p>
      </section>
    )}

    {(resumeData.skills.technical.length > 0 ||
      resumeData.skills.soft.length > 0) && (
      <section className="mb-6">
        <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-3">
          Skills
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {resumeData.skills.technical.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Technical</h3>
              <div className="flex flex-wrap gap-1">
                {resumeData.skills.technical.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-2 py-1 rounded text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          {resumeData.skills.soft.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Soft Skills</h3>
              <div className="flex flex-wrap gap-1">
                {resumeData.skills.soft.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-2 py-1 rounded text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    )}

    {resumeData.experience.internships.length > 0 && (
      <section className="mb-6">
        <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-3">
          Experience
        </h2>
        {resumeData.experience.internships.map((intern, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold">{intern.title}</h3>
              <span className="text-sm text-gray-600">{intern.duration}</span>
            </div>
            <p className="text-gray-700">
              {intern.company} • {intern.location}
            </p>
            {intern.description && (
              <p className="text-gray-600 mt-1">{intern.description}</p>
            )}
          </div>
        ))}
      </section>
    )}

    {resumeData.projects.length > 0 && (
      <section className="mb-6">
        <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-3">
          Projects
        </h2>
        {resumeData.projects.map((project, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold">{project.name}</h3>
              <span className="text-sm text-gray-600">{project.duration}</span>
            </div>
            <p className="text-gray-700 mb-2">{project.description}</p>
            <div className="flex flex-wrap gap-1">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>
    )}

    {resumeData.education.length > 0 && (
      <section>
        <h2 className="text-xl font-bold border-b border-gray-300 pb-1 mb-3">
          Education
        </h2>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold">{edu.title}</h3>
              <span className="text-sm text-gray-600">{edu.duration}</span>
            </div>
            <p className="text-gray-700">{edu.company}</p>
            {edu.grade && <p className="text-gray-600">Grade: {edu.grade}</p>}
          </div>
        ))}
      </section>
    )}
  </div>
);

const ClassicTemplate = ({ resumeData }) => (
  <div className="font-serif text-gray-800">
    <div className="text-center mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {resumeData.personalInfo.name}
      </h1>
      <div className="text-sm text-gray-600">
        {resumeData.personalInfo.email && (
          <span>{resumeData.personalInfo.email} | </span>
        )}
        {resumeData.personalInfo.phone && (
          <span>{resumeData.personalInfo.phone} | </span>
        )}
        {resumeData.personalInfo.location && (
          <span>{resumeData.personalInfo.location}</span>
        )}
      </div>
    </div>

    {/* Similar structure as ModernTemplate but with classic styling */}
    {/* You can customize this further for classic look */}
    {resumeData.summary && (
      <section className="mb-6">
        <h2 className="text-lg font-bold uppercase border-b border-gray-400 pb-1 mb-3">
          Professional Summary
        </h2>
        <p className="text-gray-700 italic">{resumeData.summary}</p>
      </section>
    )}

    {/* Add other sections similarly */}
  </div>
);

const CreativeTemplate = ({ resumeData }) => (
  <div className="font-sans text-gray-800">
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-6">
      <h1 className="text-3xl font-bold mb-2">
        {resumeData.personalInfo.name}
      </h1>
      <div className="flex flex-wrap gap-4 text-sm">
        {resumeData.personalInfo.email && (
          <span>{resumeData.personalInfo.email}</span>
        )}
        {resumeData.personalInfo.phone && (
          <span>{resumeData.personalInfo.phone}</span>
        )}
        {resumeData.personalInfo.location && (
          <span>{resumeData.personalInfo.location}</span>
        )}
      </div>
    </div>
    {/* Add creative styling for other sections */}
  </div>
);

const MinimalTemplate = ({ resumeData }) => (
  <div className="font-sans text-gray-800">
    <div className="text-center mb-8">
      <h1 className="text-2xl font-light text-gray-900 mb-1">
        {resumeData.personalInfo.name}
      </h1>
      <div className="text-xs text-gray-500">
        {resumeData.personalInfo.email && (
          <span>{resumeData.personalInfo.email} • </span>
        )}
        {resumeData.personalInfo.phone && (
          <span>{resumeData.personalInfo.phone} • </span>
        )}
        {resumeData.personalInfo.location && (
          <span>{resumeData.personalInfo.location}</span>
        )}
      </div>
    </div>
    {/* Minimal styling for other sections */}
  </div>
);

export default ResumeTemplates;
