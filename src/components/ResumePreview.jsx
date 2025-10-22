import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaDownload,
  FaFilePdf,
} from "react-icons/fa";

const ResumePreview = ({ resumeData }) => {
  // Download PDF Function
  const downloadPDF = () => {
    alert("PDF download feature would be implemented here!");
  };

  return (
    <div className="space-y-6">
      {/* Header with Download */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-black">Resume Preview</h3>
        </div>

        {/* Download Button */}
        <button
          onClick={downloadPDF}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded font-semibold border border-black"
        >
          <FaFilePdf />
          <span>Download PDF</span>
        </button>
      </div>

      {/* Resume Content */}
      <div className="bg-white border border-black rounded p-6 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6 border-b border-black pb-4">
          <h1 className="text-2xl font-bold text-black mb-2">
            {resumeData.personalInfo.name || "Your Name"}
          </h1>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-black mb-3">
            {resumeData.personalInfo.email && (
              <div className="flex items-center gap-1">
                <FaEnvelope />
                <span>{resumeData.personalInfo.email}</span>
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="flex items-center gap-1">
                <FaPhone />
                <span>{resumeData.personalInfo.phone}</span>
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-center gap-1">
                <FaMapMarkerAlt />
                <span>{resumeData.personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {resumeData.summary && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-black mb-2">Summary</h2>
            <p className="text-black leading-relaxed">{resumeData.summary}</p>
          </section>
        )}

        {/* Skills */}
        {(resumeData.skills.technical.length > 0 ||
          resumeData.skills.soft.length > 0) && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-black mb-2">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resumeData.skills.technical.length > 0 && (
                <div>
                  <h3 className="font-semibold text-black mb-2">
                    Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {resumeData.skills.technical.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-black rounded text-sm border border-black"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {resumeData.skills.soft.length > 0 && (
                <div>
                  <h3 className="font-semibold text-black mb-2">Soft Skills</h3>
                  <div className="flex flex-wrap gap-1">
                    {resumeData.skills.soft.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-black rounded text-sm border border-black"
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
          <section className="mb-6">
            <h2 className="text-lg font-bold text-black mb-2">Projects</h2>
            <div className="space-y-4">
              {resumeData.projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-black">{project.name}</h3>
                    {project.duration && (
                      <span className="text-sm text-black">
                        {project.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-black text-sm mb-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 text-black rounded text-xs border border-black"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {(resumeData.experience.internships.length > 0 ||
          resumeData.experience.hackathons.length > 0) && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-black mb-2">Experience</h2>

            {/* Internships */}
            {resumeData.experience.internships.length > 0 && (
              <div className="mb-4">
                <div className="space-y-3">
                  {resumeData.experience.internships.map((intern, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-black">
                          {intern.title}
                        </h4>
                        <span className="text-sm text-black">
                          {intern.duration}
                        </span>
                      </div>
                      <p className="text-black text-sm mb-1">
                        {intern.company} • {intern.location}
                      </p>
                      {intern.description && (
                        <p className="text-black text-sm">
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
                <div className="space-y-3">
                  {resumeData.experience.hackathons.map((hackathon, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-black">
                          {hackathon.title}
                        </h4>
                        <span className="text-sm text-black">
                          {hackathon.duration}
                        </span>
                      </div>
                      <p className="text-black text-sm mb-1">
                        {hackathon.company}
                      </p>
                      {hackathon.description && (
                        <p className="text-black text-sm">
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
            <h2 className="text-lg font-bold text-black mb-2">Education</h2>
            <div className="space-y-3">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-black">{edu.title}</h3>
                    <p className="text-black">{edu.company}</p>
                    {edu.description && (
                      <p className="text-black text-sm">{edu.description}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-black font-semibold">{edu.duration}</p>
                    {edu.grade && (
                      <p className="text-black text-sm">Grade: {edu.grade}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
