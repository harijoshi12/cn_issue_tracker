// src/routes/labelRoutes.js

import express from "express";
import {
  createLabel,
  getAllLabels,
  getLabelById,
  updateLabel,
  deleteLabel,
} from "../controllers/labelController.js";

const router = express.Router();

/**
 * @route   POST /api/labels
 * @desc    Create a new label
 * @access  Public
 */
router.post("/", createLabel);

/**
 * @route   GET /api/labels
 * @desc    Get all labels
 * @access  Public
 */
router.get("/", getAllLabels);

/**
 * @route   GET /api/labels/:id
 * @desc    Get a single label by ID
 * @access  Public
 */
router.get("/:id", getLabelById);

/**
 * @route   PUT /api/labels/:id
 * @desc    Update a label
 * @access  Public
 */
router.put("/:id", updateLabel);

/**
 * @route   DELETE /api/labels/:id
 * @desc    Delete a label
 * @access  Public
 */
router.delete("/:id", deleteLabel);

export default router;
