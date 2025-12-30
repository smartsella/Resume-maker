import express from "express";
import {
  saveResume,
  getResumeById,
  updateResumeSection,
  updateTemplate,
} from "../controller/Personalinfo.js";
import { authMiddleware } from "../middlewares/authMiddlewares.js";

const resumeRouter = express.Router();

/**
 * Resume API
 *
 * POST   /               - create/save resume (protected)
 * GET    /:id            - fetch resume by id (public)
 * PUT    /:id/section    - update a specific resume section (protected)
 * PUT    /:id/template   - update resume template selection (protected)
 *
 * Business logic and handler references unchanged to preserve existing behavior.
 */

resumeRouter.post("/", authMiddleware, saveResume);
resumeRouter.get("/:id", getResumeById);
resumeRouter.put("/:id/section", authMiddleware, updateResumeSection);
resumeRouter.put("/:id/template", authMiddleware, updateTemplate);

// Export router for use in main app
export default resumeRouter;
