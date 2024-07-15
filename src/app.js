// src/app.js

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import dotenv from "dotenv";

import { setupResponseHandler } from "./middleware/responseHandler.js";
import errorHandler from "./middleware/errorHandler.js";
import projectRoutes from "./routes/projectRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import labelRoutes from "./routes/labelRoutes.js";

// Load environment variables
dotenv.config();

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

// Middleware
// Enable Cross-Origin Resource Sharing
app.use(cors());
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: process.env.RATE_LIMIT_MAX,
  windowMs: process.env.RATE_LIMIT_WINDOW_MS,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Serve static files
app.use(express.static(path.join(__dirname, "..", "public")));

// Custom response handler
setupResponseHandler(app);

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/labels", labelRoutes);

// Serve the main page
app.get("/", (req, res) => {
  res.render("projects/index", { title: "Issue Tracker" });
});

// 404 handler
app.all("*", (req, res) => {
  res.status(404).render("error", {
    title: "Not Found",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Global error handler
app.use(errorHandler);

export default app;
