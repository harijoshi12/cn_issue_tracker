import Project from "../models/Project.js";
import Issue from "../models/Issue.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * Get all projects
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find();
  res.render("projects/index", { title: "Projects", projects });
});

/**
 * Get create project page
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getCreateProjectPage = (req, res) => {
  res.render("projects/create", { title: "Create Project" });
};

/**
 * Create a new project
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const createProject = asyncHandler(async (req, res) => {
  await Project.create(req.body);
  req.flash("success_msg", "Project created successfully");
  res.redirect("/projects");
});

/**
 * Get project details
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getProjectDetails = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    req.flash("error_msg", "Project not found");
    return res
      .status(404)
      .render("error", { title: "Not Found", message: "Project not found" });
  }
  const issues = await Issue.find({ project: req.params.id }).populate(
    "labels"
  );
  res.render("projects/detail", { title: project.name, project, issues });
});
