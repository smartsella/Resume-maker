import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Reusable transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to, subject, text, html = null) => {
  try {
    const info = await transporter.sendMail({
      from: `"ResumeMaker" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    return info;
  } catch (err) {
    console.error("Email send error:", err);
    throw new Error("Failed to send email");
  }
};
