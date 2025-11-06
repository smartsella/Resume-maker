import React, { useState } from "react";
import { FaPlus, FaTrash, FaCheckCircle } from "react-icons/fa";

const ProjectsManager = ({ resumeData, setResumeData }) => {
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    technologies: "",
    link: "",
    duration: "",
  });

  const addProject = () => {
    if (newProject.name.trim() && newProject.description.trim()) {
      const project = {
        id: Date.now(),
        name: newProject.name.trim(),
        description: newProject.description.trim(),
        technologies: newProject.technologies
          .split(",")
          .map((tech) => tech.trim()),
        link: newProject.link.trim(),
        duration: newProject.duration.trim(),
      };

      setResumeData((prev) => ({
        ...prev,
        projects: [...prev.projects, project],
      }));

      setNewProject({
        name: "",
        description: "",
        technologies: "",
        link: "",
        duration: "",
      });
    }
  };

  const removeProject = (index) => {
    const updatedProjects = resumeData.projects.filter((_, i) => i !== index);
    setResumeData((prev) => ({ ...prev, projects: updatedProjects }));
  };

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-800">Projects</h3>

      {/* Add Project Form */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Add New Project
        </h4>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Name *
            </label>
            <input
              type="text"
              value={newProject.name}
              onChange={(e) =>
                setNewProject((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="E-commerce Website"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={newProject.description}
              onChange={(e) =>
                setNewProject((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the project and your role..."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technologies
              </label>
              <input
                type="text"
                value={newProject.technologies}
                onChange={(e) =>
                  setNewProject((prev) => ({
                    ...prev,
                    technologies: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="React, Node.js, MongoDB (comma separated)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Link
              </label>
              <input
                type="url"
                value={newProject.link}
                onChange={(e) =>
                  setNewProject((prev) => ({ ...prev, link: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://github.com/yourusername/project"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <input
              type="text"
              value={newProject.duration}
              onChange={(e) =>
                setNewProject((prev) => ({ ...prev, duration: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="3 months or Jan 2023 - Mar 2023"
            />
          </div>
          <button
            onClick={addProject}
            className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-600"
          >
            <FaPlus />
            Add Project
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-800">Your Projects</h4>
          {resumeData.projects.length >= 2 && (
            <FaCheckCircle className="text-green-500" />
          )}
        </div>

        <div className="space-y-4">
          {resumeData.projects.map((project, index) => (
            <div
              key={project.id}
              className="bg-white border border-gray-200 rounded-xl p-6"
            >
              <div className="flex justify-between items-start mb-3">
                <h5 className="text-lg font-semibold text-gray-800">
                  {project.name}
                </h5>
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <FaTrash />
                </button>
              </div>
              <p className="text-gray-600 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Project
                  </a>
                )}
                <span>{project.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsManager;
