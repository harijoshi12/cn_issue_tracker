// src/controllers/projectController.js

import Project from "../models/Project.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * Create a new project
 * @route POST /api/projects
 * @access Public
 */
export const createProject = asyncHandler(async (req, res) => {
  const { name, description, author } = req.body;

  const project = await Project.create({
    name,
    description,
    author,
  });

  res.success(201, "Project created successfully", project);
});

/**
 * Get all projects
 * @route GET /api/projects
 * @access Public
 */
export const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find();

  res.success(200, "Projects retrieved successfully", projects);
});

/**
 * Get a single project by ID
 * @route GET /api/projects/:id
 * @access Public
 */
export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.error(404, "Project not found");
  }

  res.success(200, "Project retrieved successfully", project);
});

/**
 * Update a project
 * @route PUT /api/projects/:id
 * @access Public
 */
export const updateProject = asyncHandler(async (req, res) => {
  const { name, description, author } = req.body;

  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { name, description, author },
    { new: true, runValidators: true }
  );

  if (!project) {
    return res.error(404, "Project not found");
  }

  res.success(200, "Project updated successfully", project);
});

/**
 * Delete a project
 * @route DELETE /api/projects/:id
 * @access Public
 */
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    return res.error(404, "Project not found");
  }

  res.success(200, "Project deleted successfully");
});
