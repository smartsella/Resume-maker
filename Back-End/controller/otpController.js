import TempUser from "../models/TempUser.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/sendEmail.js";

// =====================================
// REGISTER → SEND OTP
// =====================================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ msg: "All fields are required" });

    const emailLower = email.toLowerCase();

    // Check if already registered
    const existingUser = await User.findOne({ email: emailLower });
    if (existingUser)
      return res.status(400).json({ msg: "Email already registered" });

    // Remove old OTP record
    await TempUser.deleteOne({ email: emailLower });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 min

    // Save temp user
    await TempUser.create({
      name,
      email: emailLower,
      password: hashedPassword,
      otp,
      otpExpires,
    });

    await sendEmail(
      emailLower,
      "Complete Your Resume – OTP Verification Required",
      `
Hi,

You're just one step away from continuing your resume creation.

Use the OTP below to securely verify your email and proceed:

OTP: ${otp}

⏱ Valid for 10 minutes  
🔒 For your security, do not share this OTP with anyone.

After verification, you’ll be able to:
• Create and update resumes
• Choose professional templates
• Download your resume instantly

If you did not request this verification, no action is required.

Thank you for choosing Resume Builder.
— Resume Builder Team
  `
    );

    return res.status(200).json({
      msg: "OTP sent successfully",
      email: emailLower,
    });
  } catch (err) {
    console.error("OTP Sending Error:", err);
    return res.status(500).json({ msg: "Error sending OTP" });
  }
};

// =====================================
// VERIFY OTP
// =====================================
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({ msg: "Email and OTP required" });

    const emailLower = email.toLowerCase();

    const tempUser = await TempUser.findOne({ email: emailLower });

    if (!tempUser) return res.status(400).json({ msg: "No pending OTP found" });

    // Check OTP (convert both to string)
    if (tempUser.otp !== String(otp))
      return res.status(400).json({ msg: "Invalid OTP" });

    // Check expiry
    if (tempUser.otpExpires < Date.now()) {
      await TempUser.deleteOne({ email: emailLower });
      return res.status(400).json({ msg: "OTP expired" });
    }

    // Save user permanently
    await User.create({
      name: tempUser.name,
      email: tempUser.email,
      password: tempUser.password,
      verified: true,
    });

    await TempUser.deleteOne({ email: emailLower });

    return res.status(200).json({
      msg: "OTP verified successfully!",
    });
  } catch (err) {
    console.error("Verify OTP Error:", err);
    return res.status(500).json({ msg: "Server error verifying OTP" });
  }
};
