import Resume from "../models/Resume.js";

// Save Resume Data
export const saveResume = async (req, res) => {
  try {
    // Prefer userId from authenticated token (authMiddleware sets req.user)
    const userIdFromToken = req.user?.id;
    const {
      template,
      personalInfo,
      education,
      skills,
      experience,
      projects,
      summary,
    } = req.body;

    // Diagnostic log: show incoming payload and token-derived user id
    console.log("[saveResume] userIdFromToken:", userIdFromToken);
    console.log("[saveResume] incoming template:", template);
    console.log("[saveResume] incoming personalInfo:", personalInfo);
    console.log("[saveResume] full request body:", req.body);

    const userId = userIdFromToken || req.body.userId;

    // Validate Required Fields
    if (!userId || !personalInfo || !template) {
      return res.status(400).json({
        msg: "Template and Personal Info are required and user must be authenticated",
      });
    }

    // Normalize personalInfo: accept `name` or `fullName`, and keep address/location symmetric
    const personal = { ...(personalInfo || {}) };
    // Map different frontend keys to model keys
    if (!personal.fullName && personal.name) personal.fullName = personal.name;
    if (!personal.fullName && personal.full_name)
      personal.fullName = personal.full_name;

    if (personal.location && !personal.address)
      personal.address = personal.location;
    if (personal.address && !personal.location)
      personal.location = personal.address;

    // Ensure email is present under expected key
    if (!personal.email && personal.mail) personal.email = personal.mail;

    // Normalize skills: frontend may send { technical: [], soft: [] }
    let skillsArray = [];
    if (Array.isArray(skills)) skillsArray = skills;
    else if (skills && typeof skills === "object") {
      skillsArray = [
        ...(Array.isArray(skills.technical) ? skills.technical : []),
        ...(Array.isArray(skills.soft) ? skills.soft : []),
      ];
    }

    // Normalize projects: frontend may use { id, name, description, technologies, link, duration }
    let projectsArray = [];
    if (Array.isArray(projects)) {
      projectsArray = projects.map((p) => ({
        title: p.title || p.name || "",
        description: p.description || "",
        technologies: Array.isArray(p.technologies) ? p.technologies : [],
        link: p.link || "",
      }));
    }

    // Normalize experience: frontend may send { internships: [...] }
    let experienceArray = [];
    if (Array.isArray(experience)) {
      experienceArray = experience;
    } else if (experience && typeof experience === "object") {
      const combine = [];
      // internships/hackathons/jobs
      ["internships", "jobs", "hackathons"].forEach((key) => {
        if (Array.isArray(experience[key])) {
          experience[key].forEach((it) => {
            combine.push({
              company: it.company || it.companyName || "",
              role: it.title || it.role || "",
              startDate: it.startDate || "",
              endDate: it.endDate || it.duration || "",
              description: it.description || "",
            });
          });
        }
      });
      experienceArray = combine;
    }

    const newResume = new Resume({
      userId,
      template,
      summary: summary || "",
      personalInfo: {
        fullName: personal.fullName || "",
        email: personal.email || "",
        phone: personal.phone || "",
        address: personal.address || "",
        location: personal.location || "",
        linkedin: personal.linkedin || "",
        portfolio: personal.portfolio || "",
      },
      education: Array.isArray(education) ? education : [],
      skills: skillsArray,
      experience: experienceArray,
      projects: projectsArray,
    });

    const savedResume = await newResume.save();
    res
      .status(201)
      .json({ msg: "Resume saved successfully", resume: savedResume });
  } catch (err) {
    console.error("Save Resume Error:", err);
    if (err.name === "ValidationError") {
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

    res.status(200).json({ resume: responseRequired });
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

    const validSections = [
      "personalInfo",
      "education",
      "skills",
      "experience",
      "projects",
      "template",
    ];

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

    if (!updatedResume)
      return res.status(404).json({ msg: "Resume not found" });

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

    if (!template) return res.status(400).json({ msg: "Template is required" });

    const updatedResume = await Resume.findByIdAndUpdate(
      id,
      { template },
      { new: true, runValidators: true }
    );
    if (!updatedResume)
      return res.status(404).json({ msg: "Resume not found" });

    res.status(200).json({ msg: "Template updated", resume: updatedResume });
  } catch (err) {
    console.error("Update Template Error:", err);
    res.status(500).json({ msg: "Server Error updating template" });
  }
};
