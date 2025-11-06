import React, { useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaCheckCircle,
  FaGraduationCap,
} from "react-icons/fa";

const ExperienceManager = ({ resumeData, setResumeData, type, title }) => {
  const [newItem, setNewItem] = useState({
    title: "",
    company: "",
    duration: "",
    description: "",
    location: "",
    grade: "",
  });

  // FIX: Different data structure for education
  const addItem = () => {
    if (newItem.title.trim() && newItem.company.trim()) {
      const item = {
        id: Date.now(),
        title: newItem.title.trim(),
        company: newItem.company.trim(),
        duration: newItem.duration.trim(),
        description: newItem.description.trim(),
        location: newItem.location.trim(),
        grade: newItem.grade.trim(),
      };

      // FIX: Handle education differently from experience
      if (type === "education") {
        setResumeData((prev) => ({
          ...prev,
          education: [...prev.education, item], // Direct under resumeData
        }));
      } else {
        setResumeData((prev) => ({
          ...prev,
          experience: {
            ...prev.experience,
            [type]: [...prev.experience[type], item],
          },
        }));
      }

      setNewItem({
        title: "",
        company: "",
        duration: "",
        description: "",
        location: "",
        grade: "",
      });
    }
  };

  // FIX: Different removal logic for education
  const removeItem = (index) => {
    if (type === "education") {
      const updatedEducation = resumeData.education.filter(
        (_, i) => i !== index
      );
      setResumeData((prev) => ({
        ...prev,
        education: updatedEducation,
      }));
    } else {
      const updatedItems = resumeData.experience[type].filter(
        (_, i) => i !== index
      );
      setResumeData((prev) => ({
        ...prev,
        experience: { ...prev.experience, [type]: updatedItems },
      }));
    }
  };

  // FIX: Different get logic for education
  const getItems = () => {
    if (type === "education") {
      return resumeData.education;
    } else {
      return resumeData.experience[type];
    }
  };

  const isComplete = () => {
    return getItems().length > 0;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {type === "education" && (
            <FaGraduationCap className="text-blue-500 text-2xl" />
          )}
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        </div>
        {isComplete() && <FaCheckCircle className="text-green-500" />}
      </div>

      {/* Add Form */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Add{" "}
          {type === "education"
            ? "Education"
            : type === "hackathons"
            ? "Hackathon"
            : "Experience"}
        </h4>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {type === "education" ? "Degree/Course *" : "Position *"}
              </label>
              <input
                type="text"
                value={newItem.title}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={
                  type === "education"
                    ? "B.Tech Computer Science"
                    : "Frontend Developer Intern"
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {type === "education" ? "Institution *" : "Company *"}
              </label>
              <input
                type="text"
                value={newItem.company}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, company: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={
                  type === "education" ? "Anna University" : "Company Name"
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {type === "education" ? "Duration (Years)" : "Duration"}
              </label>
              <input
                type="text"
                value={newItem.duration}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, duration: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={type === "education" ? "2020 - 2024" : "3 months"}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {type === "education" ? "Grade/CGPA" : "Location"}
              </label>
              <input
                type="text"
                value={type === "education" ? newItem.grade : newItem.location}
                onChange={(e) =>
                  type === "education"
                    ? setNewItem((prev) => ({ ...prev, grade: e.target.value }))
                    : setNewItem((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={
                  type === "education" ? "8.9 CGPA" : "City, Country"
                }
              />
            </div>
          </div>

          {type === "education" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={newItem.location}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, location: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Chennai, Tamil Nadu"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {type === "education"
                ? "Achievements & Relevant Coursework"
                : "Description"}
            </label>
            <textarea
              value={newItem.description}
              onChange={(e) =>
                setNewItem((prev) => ({ ...prev, description: e.target.value }))
              }
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder={
                type === "education"
                  ? "Dean's List, Relevant projects, Academic achievements..."
                  : "Describe your responsibilities and achievements..."
              }
            />
          </div>

          <button
            onClick={addItem}
            className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
          >
            <FaPlus />
            Add{" "}
            {type === "education"
              ? "Education"
              : type === "hackathons"
              ? "Hackathon"
              : "Experience"}
          </button>
        </div>
      </div>

      {/* Items List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-800">
            Your{" "}
            {type === "education"
              ? "Education"
              : type === "hackathons"
              ? "Hackathons"
              : "Work Experience"}
            ({getItems().length})
          </h4>
          {getItems().length > 0 && (
            <span className="text-sm text-gray-500">
              {getItems().length}{" "}
              {type === "education" ? "education entries" : "entries"} added
            </span>
          )}
        </div>

        {getItems().length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <FaGraduationCap className="text-gray-400 text-4xl mx-auto mb-4" />
            <p className="text-gray-500">
              No {type === "education" ? "education" : "experience"} added yet
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Add your{" "}
              {type === "education"
                ? "educational background"
                : type === "hackathons"
                ? "hackathon participation"
                : "work experience"}{" "}
              to get started
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {getItems().map((item, index) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      {type === "education" && (
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FaGraduationCap className="text-blue-600" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h5 className="text-lg font-semibold text-gray-800">
                          {item.title}
                        </h5>
                        <p className="text-gray-700 font-medium">
                          {item.company}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Duration:</span>{" "}
                    {item.duration}
                  </div>
                  {type === "education" ? (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Grade:</span> {item.grade}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Location:</span>{" "}
                      {item.location}
                    </div>
                  )}
                </div>

                {type === "education" && item.location && (
                  <div className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">Location:</span>{" "}
                    {item.location}
                  </div>
                )}

                {item.description && (
                  <div className="mt-3">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Tips */}
      {type === "education" && getItems().length === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h4 className="font-semibold text-blue-800 mb-3">Education Tips</h4>
          <div className="space-y-2 text-sm text-blue-700">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p>Start with your highest degree first</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p>Include relevant coursework and projects</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p>Mention academic achievements and awards</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <p>Add GPA if it's 3.0 or higher</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceManager;
