// src/controllers/labelController.js

import Label from "../models/Label.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * Create a new label
 * @route POST /api/labels
 * @access Public
 */
export const createLabel = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const label = await Label.create({ name });

  res.success(201, "Label created successfully", label);
});

/**
 * Get all labels
 * @route GET /api/labels
 * @access Public
 */
export const getAllLabels = asyncHandler(async (req, res) => {
  const labels = await Label.find();

  res.success(200, "Labels retrieved successfully", labels);
});

/**
 * Get a single label by ID
 * @route GET /api/labels/:id
 * @access Public
 */
export const getLabelById = asyncHandler(async (req, res) => {
  const label = await Label.findById(req.params.id);

  if (!label) {
    return res.error(404, "Label not found");
  }

  res.success(200, "Label retrieved successfully", label);
});

/**
 * Update a label
 * @route PUT /api/labels/:id
 * @access Public
 */
export const updateLabel = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const label = await Label.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true, runValidators: true }
  );

  if (!label) {
    return res.error(404, "Label not found");
  }

  res.success(200, "Label updated successfully", label);
});

/**
 * Delete a label
 * @route DELETE /api/labels/:id
 * @access Public
 */
export const deleteLabel = asyncHandler(async (req, res) => {
  const label = await Label.findByIdAndDelete(req.params.id);

  if (!label) {
    return res.error(404, "Label not found");
  }

  res.success(200, "Label deleted successfully");
});
