import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLink,
  FaDownload,
  FaStar,
  FaAward,
  FaCheckCircle,
  FaFilePdf,
} from "react-icons/fa";

const ResumePreview = ({ resumeData }) => {
  // Calculate Resume Score
  const calculateScore = () => {
    let score = 0;

    // Personal Info (20 points)
    if (resumeData.personalInfo.name) score += 5;
    if (resumeData.personalInfo.email) score += 5;
    if (resumeData.personalInfo.phone) score += 5;
    if (resumeData.personalInfo.location) score += 5;

    // Summary (10 points)
    if (resumeData.summary.length > 50) score += 10;

    // Skills (20 points)
    if (resumeData.skills.technical.length >= 3) score += 10;
    if (resumeData.skills.soft.length >= 2) score += 10;

    // Projects (20 points)
    if (resumeData.projects.length >= 2) score += 20;

    // Experience (20 points)
    if (resumeData.experience.internships.length >= 1) score += 10;
    if (resumeData.experience.hackathons.length >= 1) score += 10;

    // Education (10 points)
    if (resumeData.education.length >= 1) score += 10;

    return score;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLevel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Average";
    return "Needs Work";
  };

  // Download PDF Function
  const downloadPDF = () => {
    // Simple alert for demo - in real app, use libraries like jsPDF or react-to-print
    alert(
      "PDF download feature would be implemented here! In a real application, this would generate and download a professional PDF resume."
    );

    // Example of what would happen:
    // 1. Convert resume to PDF format
    // 2. Apply professional styling
    // 3. Download the file
  };

  const resumeScore = calculateScore();

  return (
    <div className="space-y-8">
      {/* Header with Score and Download */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Resume Preview</h3>
          <p className="text-gray-600">
            Real-time preview of your professional resume
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Score Display */}
          <div className="bg-white rounded-xl shadow-lg p-4 border-2 border-gray-100 min-w-[140px]">
            <div className="flex items-center gap-2 mb-2">
              <FaAward className={`text-lg ${getScoreColor(resumeScore)}`} />
              <span className="text-sm font-medium text-gray-600">
                Resume Score
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span
                className={`text-2xl font-bold ${getScoreColor(resumeScore)}`}
              >
                {resumeScore}%
              </span>
              <span className="text-sm text-gray-500">
                {getScoreLevel(resumeScore)}
              </span>
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={downloadPDF}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            <FaFilePdf className="text-lg" />
            <span>Download PDF</span>
            <FaDownload className="text-sm" />
          </button>
        </div>
      </div>

      {/* Resume Content */}
      <div className="bg-white border-2 border-gray-300 rounded-xl p-8 max-w-4xl mx-auto shadow-lg">
        {/* Header Section */}
        <div className="text-center mb-8 border-b pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {resumeData.personalInfo.name || "Your Name"}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-4">
            {resumeData.personalInfo.email && (
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-blue-500" />
                <span>{resumeData.personalInfo.email}</span>
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="flex items-center gap-2">
                <FaPhone className="text-green-500" />
                <span>{resumeData.personalInfo.phone}</span>
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                <span>{resumeData.personalInfo.location}</span>
              </div>
            )}
            {resumeData.personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <FaLink className="text-blue-600" />
                <span>LinkedIn</span>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center gap-6 text-xs text-gray-500">
            <span>{resumeData.skills.technical.length} Technical Skills</span>
            <span>{resumeData.projects.length} Projects</span>
            <span>{resumeData.experience.internships.length} Internships</span>
            <span>{resumeData.education.length} Education</span>
          </div>
        </div>

        {/* Summary */}
        {resumeData.summary && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-gray-800">
                Professional Summary
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-justify">
              {resumeData.summary}
            </p>
          </section>
        )}

        {/* Skills */}
        {(resumeData.skills.technical.length > 0 ||
          resumeData.skills.soft.length > 0) && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 bg-green-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-gray-800">Skills</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resumeData.skills.technical.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaStar className="text-yellow-500 text-sm" />
                    Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.technical.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {resumeData.skills.soft.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <FaCheckCircle className="text-green-500 text-sm" />
                    Soft Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.soft.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200"
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

        {/* Projects */}
        {resumeData.projects.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-gray-800">Projects</h2>
            </div>
            <div className="space-y-6">
              {resumeData.projects.map((project, index) => (
                <div
                  key={index}
                  className="border-l-4 border-purple-500 pl-4 bg-purple-50 rounded-r-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {project.name}
                    </h3>
                    {project.duration && (
                      <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">
                        {project.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm mb-3 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-white text-purple-700 rounded text-xs border border-purple-200 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <div className="text-xs text-purple-600 font-medium">
                      🔗 Project Link Available
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {(resumeData.experience.internships.length > 0 ||
          resumeData.experience.hackathons.length > 0) && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-gray-800">Experience</h2>
            </div>

            {/* Internships */}
            {resumeData.experience.internships.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-4 text-lg border-b pb-2">
                  Internships
                </h3>
                <div className="space-y-4">
                  {resumeData.experience.internships.map((intern, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-green-500 pl-4 bg-green-50 rounded-r-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-800">
                          {intern.title}
                        </h4>
                        <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                          {intern.duration}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm mb-2 font-medium">
                        {intern.company} • {intern.location}
                      </p>
                      {intern.description && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {intern.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hackathons */}
            {resumeData.experience.hackathons.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-4 text-lg border-b pb-2">
                  Hackathons & Competitions
                </h3>
                <div className="space-y-4">
                  {resumeData.experience.hackathons.map((hackathon, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-purple-500 pl-4 bg-purple-50 rounded-r-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-800">
                          {hackathon.title}
                        </h4>
                        <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">
                          {hackathon.duration}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm mb-2 font-medium">
                        {hackathon.company}
                      </p>
                      {hackathon.description && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {hackathon.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-gray-800">Education</h2>
            </div>
            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start p-4 bg-blue-50 rounded-lg border border-blue-200"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {edu.title}
                    </h3>
                    <p className="text-gray-700 font-medium">{edu.company}</p>
                    {edu.description && (
                      <p className="text-gray-600 text-sm mt-1">
                        {edu.description}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 font-semibold">
                      {edu.duration}
                    </p>
                    {edu.grade && (
                      <p className="text-blue-600 text-sm font-medium">
                        Grade: {edu.grade}
                      </p>
                    )}
                    {edu.location && (
                      <p className="text-gray-500 text-sm">{edu.location}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer Note */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Resume generated with ResumeCraft Maker • Score: {resumeScore}% •
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Improvement Tips */}
      {resumeScore < 80 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-4xl mx-auto">
          <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
            💡 Tips to Improve Your Resume Score
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
            {resumeData.personalInfo.name || (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>Add your full name</span>
              </div>
            )}
            {resumeData.summary.length < 50 && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>Write a detailed professional summary</span>
              </div>
            )}
            {resumeData.skills.technical.length < 3 && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>Add at least 3 technical skills</span>
              </div>
            )}
            {resumeData.projects.length < 2 && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>Include 2+ projects with descriptions</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
