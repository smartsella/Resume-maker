import React, { useState } from "react";
import { FaPlus, FaTrash, FaCheckCircle } from "react-icons/fa";

const SkillsManager = ({ resumeData, setResumeData }) => {
  const [newSkill, setNewSkill] = useState("");
  const [skillCategory, setSkillCategory] = useState("technical");

  const popularSkills = {
    technical: [
      "JavaScript",
      "React",
      "Node.js",
      "Python",
      "Java",
      "HTML/CSS",
      "TypeScript",
      "MongoDB",
      "SQL",
      "Git",
      "AWS",
      "Docker",
    ],
    soft: [
      "Communication",
      "Teamwork",
      "Problem Solving",
      "Leadership",
      "Time Management",
      "Adaptability",
      "Creativity",
      "Critical Thinking",
    ],
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      const updatedSkills = {
        ...resumeData.skills,
        [skillCategory]: [...resumeData.skills[skillCategory], newSkill.trim()],
      };
      setResumeData((prev) => ({ ...prev, skills: updatedSkills }));
      setNewSkill("");
    }
  };

  const removeSkill = (category, index) => {
    const updatedSkills = {
      ...resumeData.skills,
      [category]: resumeData.skills[category].filter((_, i) => i !== index),
    };
    setResumeData((prev) => ({ ...prev, skills: updatedSkills }));
  };

  const addPopularSkill = (skill, category) => {
    const updatedSkills = {
      ...resumeData.skills,
      [category]: [...resumeData.skills[category], skill],
    };
    setResumeData((prev) => ({ ...prev, skills: updatedSkills }));
  };

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-800">
        Skills & Technologies
      </h3>

      {/* Add New Skill */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Add New Skill
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Enter skill name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <select
              value={skillCategory}
              onChange={(e) => setSkillCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="technical">Technical</option>
              <option value="soft">Soft Skill</option>
            </select>
          </div>
          <div>
            <button
              onClick={addSkill}
              className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-600"
            >
              <FaPlus />
              Add Skill
            </button>
          </div>
        </div>
      </div>

      {/* Skills Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Technical Skills */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-800">
              Technical Skills
            </h4>
            {resumeData.skills.technical.length >= 3 && (
              <FaCheckCircle className="text-green-500" />
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {popularSkills.technical.map((skill) => (
              <button
                key={skill}
                onClick={() => addPopularSkill(skill, "technical")}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
              >
                {skill} +
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {resumeData.skills.technical.map((skill, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="font-medium">{skill}</span>
                <button
                  onClick={() => removeSkill("technical", index)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-800">Soft Skills</h4>
            {resumeData.skills.soft.length >= 2 && (
              <FaCheckCircle className="text-green-500" />
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {popularSkills.soft.map((skill) => (
              <button
                key={skill}
                onClick={() => addPopularSkill(skill, "soft")}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors"
              >
                {skill} +
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {resumeData.skills.soft.map((skill, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="font-medium">{skill}</span>
                <button
                  onClick={() => removeSkill("soft", index)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsManager;
