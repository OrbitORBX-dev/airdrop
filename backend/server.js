import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import Routes
import betsRoutes from "./routes/bets.js";
import oddsRoutes from "./routes/odds.js";
import adminRoutes from "./routes/admin.js";

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/bets", betsRoutes);
app.use("/api/odds", oddsRoutes);
app.use("/api/admin", adminRoutes);

// Health Check (Recommended for 2026 deployments)
app.get("/health", (req, res) => res.status(200).send("OK"));

// Start Server
app.listen(PORT, () => {
  console.log(`ORBX Bet backend running on port ${PORT}`);
}).on("error", (err) => {
  console.error("Server failed to start:", err);
});
