import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import dotenv from "dotenv";
import session from "express-session";
import flash from "connect-flash";
import expressLayouts from "express-ejs-layouts";

import connectDB from "./config/database.js";
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

// Connect to database
connectDB();

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

// EJS Layouts middleware
app.use(expressLayouts);
app.set("layout", "layouts/main");

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Flash messages middleware
app.use(flash());

// Global variables middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// Routes
app.use("/projects", projectRoutes);
app.use("/issues", issueRoutes);
app.use("/api/labels", labelRoutes);

// Home route
app.get("/", (req, res) => {
  res.redirect("/projects");
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).render("error", {
    title: "Not Found",
    message: "The page you are looking for does not exist.",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error", {
    title: "Server Error",
    message: "Something went wrong on our end.",
  });
});

export default app;
