import React, { useEffect, useState } from "react";
import axios from "axios";

const ResumePreview = ({ resumeId, resumeData }) => {
  const [resume, setResume] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchResume = async () => {
      if (resumeData) {
        if (mounted) setResume(resumeData);
        return;
      }

      if (!resumeId) return;
      try {
        const res = await axios.get(
          `http://localhost:3000/api/resume/${resumeId}`
        );
        // Always expect { resume: ... }
        if (mounted) setResume(res.data.resume);
      } catch (err) {
        console.error("Error fetching resume", err);
      }
    };

    fetchResume();

    return () => {
      mounted = false;
    };
  }, [resumeId, resumeData]);

  if (!resume) return <div>Loading or select a resume...</div>;

  const isModern = resume.template === "modern";

  return (
    <div
      className={`p-8 border shadow-lg max-w-2xl mx-auto bg-white ${
        isModern ? "text-sans" : "text-serif"
      }`}
    >
      <div className="text-xs text-right text-gray-400 mb-2">
        Template: {resume.template}
      </div>
      <div className={`text-center mb-6 ${isModern ? "border-b pb-4" : ""}`}>
        <h1 className="text-3xl font-bold">
          {resume.personalInfo?.fullName || ""}
        </h1>
        <p className="text-gray-600">
          {resume.personalInfo?.email || ""} |{" "}
          {resume.personalInfo?.phone || ""}
        </p>
        <p className="text-gray-600">{resume.personalInfo?.address || ""}</p>
      </div>

      <div className="mb-6">
        <h2
          className={`text-xl font-bold border-b-2 border-gray-300 mb-2 ${
            isModern ? "text-blue-600" : "text-black"
          }`}
        >
          Education
        </h2>
        {(resume.education || []).map((edu, idx) => (
          <div key={idx} className="mb-2">
            <h3 className="font-semibold">{edu.institution}</h3>
            <p>{edu.degree}</p>
            <p className="text-sm text-gray-500">
              {edu.startDate} - {edu.endDate}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2
          className={`text-xl font-bold border-b-2 border-gray-300 mb-2 ${
            isModern ? "text-blue-600" : "text-black"
          }`}
        >
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {(resume.skills || []).map((skill, idx) => (
            <span key={idx} className="bg-gray-200 px-2 py-1 rounded text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2
          className={`text-xl font-bold border-b-2 border-gray-300 mb-2 ${
            isModern ? "text-blue-600" : "text-black"
          }`}
        >
          Experience
        </h2>
        {(resume.experience || []).map((exp, idx) => (
          <div key={idx} className="mb-2">
            <h3 className="font-semibold">{exp.company}</h3>
            <p>{exp.role}</p>
            <p className="text-sm text-gray-500">
              {exp.startDate} - {exp.endDate}
            </p>
            <p className="mt-1">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2
          className={`text-xl font-bold border-b-2 border-gray-300 mb-2 ${
            isModern ? "text-blue-600" : "text-black"
          }`}
        >
          Projects
        </h2>
        {(resume.projects || []).map((proj, idx) => (
          <div key={idx} className="mb-2">
            <h3 className="font-semibold">{proj.title}</h3>
            <p className="text-sm font-light">{proj.technologies.join(", ")}</p>
            <p className="mt-1">{proj.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumePreview;
