import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `mongodb+srv://aviralch30:${process.env.MONGO_PASSWORD}@vrv-deployment.6yujg.mongodb.net/?retryWrites=true&w=majority&appName=VRV-Deployment`
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error ", error);
    process.exit(1);
  }
};

export { connectDB};