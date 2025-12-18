import express from "express";
import { login, register, validUser } from "../controller/authController.js";
import { authMiddleware } from "../middlewares/authMiddlewares.js";
import { registerUser, verifyOTP } from "../controller/otpController.js";


const router = express.Router();

// http://localhost:3000/api/auth/register
router.post("/register", registerUser);
router.post("/login", login);
router.get("/me", authMiddleware, validUser);
router.post("/verify-otp", verifyOTP);

// detalis
// detalis route moved to resumeRoute

export default router;
