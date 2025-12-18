import express from "express";
import { saveResume, getResumeById, updateResumeSection, updateTemplate } from "../controller/resumeController.js";

const router = express.Router();

router.post("/", saveResume);
router.get("/:id", getResumeById);
router.put("/:id/section", updateResumeSection);
router.put("/:id/template", updateTemplate);

export default router;
