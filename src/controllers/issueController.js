import Issue from "../models/Issue.js";
import Project from "../models/Project.js";
import Label from "../models/Label.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * Get create issue page
 * @route GET /issues/create/:projectId
 * @access Public
 */
export const getCreateIssuePage = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (!project) {
    req.flash("error_msg", "Project not found");
    return res
      .status(404)
      .render("error", { title: "Not Found", message: "Project not found" });
  }
  res.render("issues/create", { title: "Create New Issue", project });
});

/**
 * Create a new issue
 * @route POST /issues
 * @access Public
 */
export const createIssue = asyncHandler(async (req, res) => {
  const { title, description, author, project, labels } = req.body;

  // Process labels
  const labelArray = labels.split(",").map((label) => label.trim());
  const labelIds = await Promise.all(
    labelArray.map(async (labelName) => {
      let label = await Label.findOne({ name: labelName });
      if (!label) {
        label = await Label.create({ name: labelName });
      }
      return label._id;
    })
  );

  const issue = await Issue.create({
    title,
    description,
    author,
    project,
    labels: labelIds,
  });

  req.flash("success_msg", "Issue created successfully");
  res.redirect(`/projects/${project}`);
});

/**
 * Get all issues
 * @route GET /api/issues
 * @access Public
 */
export const getAllIssues = asyncHandler(async (req, res) => {
  const issues = await Issue.find().populate("project").populate("labels");
  res.success(200, "Issues retrieved successfully", issues);
});

/**
 * Get a single issue by ID
 * @route GET /api/issues/:id
 * @access Public
 */
export const getIssueById = asyncHandler(async (req, res) => {
  const issue = await Issue.findById(req.params.id)
    .populate("project")
    .populate("labels");

  if (!issue) {
    return res.error(404, "Issue not found");
  }

  res.success(200, "Issue retrieved successfully", issue);
});

/**
 * Update an issue
 * @route PUT /api/issues/:id
 * @access Public
 */
export const updateIssue = asyncHandler(async (req, res) => {
  const { title, description, author, project, labels } = req.body;

  const issue = await Issue.findByIdAndUpdate(
    req.params.id,
    { title, description, author, project, labels },
    { new: true, runValidators: true }
  )
    .populate("project")
    .populate("labels");

  if (!issue) {
    return res.error(404, "Issue not found");
  }

  res.success(200, "Issue updated successfully", issue);
});

/**
 * Delete an issue
 * @route DELETE /api/issues/:id
 * @access Public
 */
export const deleteIssue = asyncHandler(async (req, res) => {
  const issue = await Issue.findByIdAndDelete(req.params.id);

  if (!issue) {
    return res.error(404, "Issue not found");
  }

  res.success(200, "Issue deleted successfully");
});

/**
 * Suggest labels
 * @route GET /api/labels/suggest
 * @access Public
 */
export const suggestLabels = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const labels = await Label.find({ name: new RegExp(q, "i") }).limit(5);
  res.json(labels);
});
