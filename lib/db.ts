// lib/db.ts
import mongoose from "mongoose";

const connectionUrl=process.env.MONGODB_URI as string;

if(!connectionUrl) console.log("Plese provide valid bd url");

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect("mongodb+srv://maza:28N8VbNP3ChnK1y9@cluster0.kxr8s.mongodb.net/glowniba?retryWrites=true&w=majority");
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

export default connectDB;
