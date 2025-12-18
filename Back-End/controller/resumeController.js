import Resume from "../models/Resume.js";

// Save Resume Data
export const saveResume = async (req, res) => {
  try {
    const { userId, template, personalInfo, education, skills, experience, projects } = req.body;

    // Validate Required Fields
    if (!userId || !personalInfo || !template) {
      return res.status(400).json({ msg: "User ID, Template, and Personal Info are required" });
    }

    // Upsert or Create new? User might want multiple resumes. 
    // For now, assuming create new as per POST request.

    const newResume = new Resume({
      userId,
      template,
      personalInfo,
      education,
      skills,
      experience,
      projects,
    });

    const savedResume = await newResume.save();
    res.status(201).json({ msg: "Resume saved successfully", resume: savedResume });
  } catch (err) {
    console.error("Save Resume Error:", err);
    if (err.name === 'ValidationError') {
         return res.status(400).json({ msg: err.message, errors: err.errors });
    }
    res.status(500).json({ msg: "Server Error saving resume" });
  }
};

// Get Resume by ID
export const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate MongoDB ID format to prevent crash on cast error
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ msg: "Invalid Resume ID" });
    }

    const resume = await Resume.findById(id);
    if (!resume) return res.status(404).json({ msg: "Resume not found" });
    
    // Backward compatibility: If template missing, default to 'modern'
    const responseRequired = resume.toObject();
    if (!responseRequired.template) {
        responseRequired.template = "modern"; 
    }

    res.status(200).json(responseRequired);
  } catch (err) {
    console.error("Get Resume Error:", err);
    res.status(500).json({ msg: "Server Error fetching resume" });
  }
};

// Update Resume Section
export const updateResumeSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { section, data } = req.body; 
    
     // Validate MongoDB ID
     if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ msg: "Invalid Resume ID" });
    }

    const validSections = ["personalInfo", "education", "skills", "experience", "projects", "template"];
    
    if (!validSections.includes(section)) {
      return res.status(400).json({ msg: "Invalid section name" });
    }

    const updateQuery = {};
    updateQuery[section] = data;

    const updatedResume = await Resume.findByIdAndUpdate(
      id,
      { $set: updateQuery },
      { new: true, runValidators: true }
    );

    if (!updatedResume) return res.status(404).json({ msg: "Resume not found" });

    res.status(200).json({ msg: "Resume updated", resume: updatedResume });
  } catch (err) {
    console.error("Update Resume Error:", err);
    res.status(500).json({ msg: "Server Error updating resume" });
  }
};

export const updateTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const { template } = req.body;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ msg: "Invalid Resume ID" });
        }
        
        if (!template) return res.status(400).json({msg: "Template is required"});

        const updatedResume = await Resume.findByIdAndUpdate(
            id,
            { template },
            { new: true, runValidators: true }
        );
         if (!updatedResume) return res.status(404).json({ msg: "Resume not found" });

         res.status(200).json({ msg: "Template updated", resume: updatedResume });

    } catch (err) {
        console.error("Update Template Error:", err);
        res.status(500).json({ msg: "Server Error updating template" });
    }
}
