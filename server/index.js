const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");
// Try .env.local first (Next.js convention), then .env
const envLocalPath = path.resolve(__dirname, "../.env.local");
const envPath = path.resolve(__dirname, "../.env");
const envFile = fs.existsSync(envLocalPath) ? envLocalPath : envPath;
require("dotenv").config({ path: envFile });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Database connection with auto-reconnect
const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("✅ MongoDB already connected");
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    // Retry connection after 5 seconds
    setTimeout(() => {
      console.log("🔄 Retrying MongoDB connection...");
      connectDB();
    }, 5000);
  }
};

// Initial connection
connectDB();

// Handle connection events
mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected. Reconnecting...");
  connectDB();
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Routes (database connection is handled automatically via connectDB function)
app.use("/api/auth", require("./routes/auth"));
app.use("/api/cars", require("./routes/cars"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/homepage", require("./routes/homepage"));
app.use("/api/admin", require("./routes/admin"));

// Middleware to ensure DB connection before handling API requests
app.use("/api/*", async (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    console.log("🔄 Database not connected, attempting connection...");
    try {
      await connectDB();
      // Wait a bit for connection to establish
      let attempts = 0;
      while (mongoose.connection.readyState !== 1 && attempts < 10) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        attempts++;
      }
    } catch (err) {
      console.error("Failed to connect to database:", err);
      return res.status(503).json({ error: "Database connection failed" });
    }
  }
  next();
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
