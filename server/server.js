import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import imageRoutes from "./routes/imageRoutes.js";
import storageRoutes from "./routes/storageRoutes.js";
import shareRoutes from "./routes/shareRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ─── API Routes ───────────────────────────────────
app.use("/api/images", imageRoutes);
app.use("/api/storage", storageRoutes);
app.use("/api/share", shareRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "PhotoMall API is running",
    timestamp: new Date().toISOString(),
  });
});

// ─── Error Handler (must be last) ─────────────────
app.use(errorHandler);

// ─── Database + Server Start ──────────────────────
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/photomall";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 PhotoMall API running on http://localhost:${PORT}`);
      console.log(`📁 Uploads served from http://localhost:${PORT}/uploads`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    console.log("\n💡 Make sure MongoDB is running. You can start it with:");
    console.log("   mongod --dbpath <your-data-path>\n");
    process.exit(1);
  });

export default app;
