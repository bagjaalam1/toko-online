import mongoose from "mongoose";
import app from "../src/app.js";

let cached = global.__mongoose;
if (!cached) cached = global.__mongoose = { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, { bufferCommands: false })
      .then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default async function handler(req, res) {
  try {
    await dbConnect();
    return app(req, res);
  } catch (err) {
    console.error("Handler error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
