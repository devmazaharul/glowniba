// lib/db.ts
import mongoose from "mongoose";

const connectionUrl=process.env.MONGODB_URI as string;
console.log(connectionUrl && connectionUrl);
if(!connectionUrl) console.log("Plese provide valid bd url");

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(connectionUrl);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

export default connectDB;
