import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    template: {
      type: String,
      required: [true, "Template is required"],
      enum: ["modern", "classic", "creative", "minimal"],
    },
    summary: String,
    personalInfo: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: String,
      address: String,
      location: String,
      linkedin: String,
      portfolio: String,
    },
    education: [
      {
        institution: String,
        degree: String,
        startDate: String,
        endDate: String,
        grade: String,
      },
    ],
    skills: [String],
    experience: [
      {
        company: String,
        role: String,
        startDate: String,
        endDate: String,
        description: String,
        // Optionally allow 'title' for frontend compatibility
        title: String,
        location: String,
        grade: String,
      },
    ],
    projects: [
      {
        title: String,
        description: String,
        technologies: [String],
        link: String,
      },
    ],
  },
  { timestamps: true }
);

// Prevent OverwriteModelError
export default mongoose.models.Resume || mongoose.model("Resume", resumeSchema);
