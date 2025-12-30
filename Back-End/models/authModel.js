import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
  },
  { timestamps: true }
);

// Ensure model name matches other code expectations
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
