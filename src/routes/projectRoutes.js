// src/routes/projectRoutes.js

import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Public
 */
router.post("/", createProject);

/**
 * @route   GET /api/projects
 * @desc    Get all projects
 * @access  Public
 */
router.get("/", getAllProjects);

/**
 * @route   GET /api/projects/:id
 * @desc    Get a single project by ID
 * @access  Public
 */
router.get("/:id", getProjectById);

/**
 * @route   PUT /api/projects/:id
 * @desc    Update a project
 * @access  Public
 */
router.put("/:id", updateProject);

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete a project
 * @access  Public
 */
router.delete("/:id", deleteProject);

export default router;
