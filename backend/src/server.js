import dns from "dns";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
