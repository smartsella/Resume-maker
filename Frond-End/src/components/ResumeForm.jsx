import React, { useState } from "react";
import axios from "axios";

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    userId: "USER_ID_PLACEHOLDER", // Replace with valid ObjectID from auth
    template: "modern", // Default template
    personalInfo: { fullName: "", email: "", phone: "", address: "", linkedin: "" },
    education: [],
    skills: [],
    experience: [],
    projects: []
  });

  const handleChange = (section, e, index = null, field = null) => {
    if (section === "template") {
         setFormData({ ...formData, template: e.target.value });
    } else if (section === "personalInfo") {
      setFormData({
        ...formData,
        personalInfo: { ...formData.personalInfo, [e.target.name]: e.target.value }
      });
    } else if (index !== null) {
      const updatedSection = [...formData[section]];
      updatedSection[index][field] = e.target.value;
      setFormData({ ...formData, [section]: updatedSection });
    }
  };

  const handleSkillChange = (e, index) => {
    const newSkills = [...formData.skills];
    newSkills[index] = e.target.value;
    setFormData({...formData, skills: newSkills});
  }

  const addSkill = () => {
    setFormData({...formData, skills: [...formData.skills, ""]});
  }

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { institution: "", degree: "", startDate: "", endDate: "", grade: "" }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/resume", formData);
      alert("Resume Saved! ID: " + res.data.resume._id);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Error saving resume");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-bold mb-4">Create Resume</h2>
      
      {/* Template Selection */}
      <div className="mb-4">
        <label className="font-semibold block mb-1">Select Template</label>
        <select 
            value={formData.template} 
            onChange={(e) => handleChange('template', e)} 
            className="w-full p-2 border rounded"
        >
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
        </select>
      </div>

      {/* Personal Info */}
      <div className="mb-4">
        <h3 className="font-semibold">Personal Info</h3>
        <input name="fullName" placeholder="Full Name" onChange={(e) => handleChange('personalInfo', e)} className="block w-full mb-2 p-2 border" />
        <input name="email" placeholder="Email" onChange={(e) => handleChange('personalInfo', e)} className="block w-full mb-2 p-2 border" />
        <input name="phone" placeholder="Phone" onChange={(e) => handleChange('personalInfo', e)} className="block w-full mb-2 p-2 border" />
      </div>

      {/* Skills */}
      <div className="mb-4">
          <h3 className="font-semibold">Skills</h3>
          {formData.skills.map((skill, idx) => (
              <input key={idx} value={skill} onChange={(e) => handleSkillChange(e, idx)} className="border p-2 mr-2 mb-2" placeholder="Skill" />
          ))}
          <button type="button" onClick={addSkill} className="bg-blue-300 text-black px-2 py-1 text-sm rounded">Add Skill</button>
      </div>

      {/* Education */}
      <div className="mb-4">
        <h3 className="font-semibold">Education</h3>
        {formData.education.map((edu, idx) => (
          <div key={idx} className="mb-2 p-2 border bg-white">
            <input placeholder="Institution" value={edu.institution} onChange={(e) => handleChange('education', e, idx, 'institution')} className="mr-2 border p-1" />
            <input placeholder="Degree" value={edu.degree} onChange={(e) => handleChange('education', e, idx, 'degree')} className="border p-1" />
          </div>
        ))}
        <button type="button" onClick={addEducation} className="bg-blue-500 text-white px-3 py-1 mt-2">Add Education</button>
      </div>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 mt-4 rounded">Save Resume</button>
    </form>
  );
};

export default ResumeForm;
