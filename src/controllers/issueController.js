// src/controllers/issueController.js

import Issue from "../models/Issue.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * Create a new issue
 * @route POST /api/issues
 * @access Public
 */
export const createIssue = asyncHandler(async (req, res) => {
  const { title, description, author, project, labels } = req.body;

  const issue = await Issue.create({
    title,
    description,
    author,
    project,
    labels,
  });

  res.success(201, "Issue created successfully", issue);
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
