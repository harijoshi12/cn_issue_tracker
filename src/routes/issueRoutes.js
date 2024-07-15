// src/routes/issueRoutes.js

import express from "express";
import {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
} from "../controllers/issueController.js";

const router = express.Router();

/**
 * @route   POST /api/issues
 * @desc    Create a new issue
 * @access  Public
 */
router.post("/", createIssue);

/**
 * @route   GET /api/issues
 * @desc    Get all issues
 * @access  Public
 */
router.get("/", getAllIssues);

/**
 * @route   GET /api/issues/:id
 * @desc    Get a single issue by ID
 * @access  Public
 */
router.get("/:id", getIssueById);

/**
 * @route   PUT /api/issues/:id
 * @desc    Update an issue
 * @access  Public
 */
router.put("/:id", updateIssue);

/**
 * @route   DELETE /api/issues/:id
 * @desc    Delete an issue
 * @access  Public
 */
router.delete("/:id", deleteIssue);

export default router;
