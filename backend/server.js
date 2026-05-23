const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const workspaceRoutes = require("./routes/workspaceRoutes");
const aiRoutes = require("./routes/aiRoutes");


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "FlowTrack API is running." });
});

app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api", aiRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

app.use((error, req, res, next) => {
  console.error(error);

  if (error.name === "CastError") {
    return res.status(400).json({ message: "Invalid resource id." });
  }

  if (error.name === "ValidationError") {
    const message = Object.values(error.errors)
      .map((detail) => detail.message)
      .join(" ");
    return res.status(400).json({ message });
  }

  if (error.code === 11000) {
    return res.status(409).json({ message: "Duplicate value already exists." });
  }

  res.status(error.status || 500).json({
    message: error.message || "Server error."
  });
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`FlowTrack API listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });
