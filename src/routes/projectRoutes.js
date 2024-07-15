import express from "express";
import * as projectController from "../controllers/projectController.js";

const router = express.Router();

// Get all projects
router.get("/", projectController.getAllProjects);

// Get create project page
router.get("/create", projectController.getCreateProjectPage);

// Create a new project
router.post("/", projectController.createProject);

// Get project details
router.get("/:id", projectController.getProjectDetails);

export default router;
