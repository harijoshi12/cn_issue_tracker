import express from "express";
import * as labelController from "../controllers/labelController.js";

const router = express.Router();

// Suggest labels
router.get("/suggest", labelController.suggestLabels);

// Create a new label
router.post("/", labelController.createLabel);

export default router;
