import Project from "../models/Project.js";
import Issue from "../models/Issue.js";

/**
 * Get all projects
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.render("projects/index", { title: "Projects", projects });
  } catch (error) {
    req.flash("error_msg", "Failed to fetch projects");
    res.redirect("/");
  }
};

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
export const createProject = async (req, res) => {
  try {
    await Project.create(req.body);
    req.flash("success_msg", "Project created successfully");
    res.redirect("/projects");
  } catch (error) {
    req.flash("error_msg", "Failed to create project");
    res.redirect("/projects/create");
  }
};

/**
 * Get project details
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getProjectDetails = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const issues = await Issue.find({ project: req.params.id }).populate(
      "labels"
    );
    res.render("projects/detail", { title: project.name, project, issues });
  } catch (error) {
    req.flash("error_msg", "Project not found");
    res.redirect("/projects");
  }
};
