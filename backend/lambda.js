const express = require("express");
const serverless = require("serverless-http");
const connectDB = require("./utils/verceldb");
const userRoutes = require("./routes/userRoutes");
const empRoutes = require("./routes/empRoutes");

const app = express();
app.use(express.json({ limit: "5mb" }));

// DB middleware for each request
app.use(async (req, res, next) => {
  try {
    await connectDB(process.env.MONGODB_URI);
    next();
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    res.status(500).json({ status: false, message: "DB connection error", error: err.message });
  }
});

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/emp", empRoutes);

module.exports = serverless(app);
