// lib/db.ts
import mongoose from "mongoose";

const connectionUrl=process.env.MONGODB_URI as string;

if(!connectionUrl) console.log("Plese provide valid bd url");

const connectDB = async () => {
  try {
    await mongoose.connect(connectionUrl);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

export default connectDB;
