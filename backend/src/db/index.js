import mongoose from "mongoose";
import { DB_NAME } from "../utils/index.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error ", error);
    process.exit(1);
  }
};

export { connectDB};