import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error("MONGO_URI is missing. Check your .env file.");
      process.exit(1);
    }

    await mongoose.connect(uri);
    console.log("MongoDB connected Only");
  } catch (error) {
    console.error("DB Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
