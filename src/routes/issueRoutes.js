import express from "express";
import * as issueController from "../controllers/issueController.js";

const router = express.Router();

// Get create issue page
router.get("/create/:projectId", issueController.getCreateIssuePage);

// Create a new issue
router.post("/", issueController.createIssue);

export default router;
