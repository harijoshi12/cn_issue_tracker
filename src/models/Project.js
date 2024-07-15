// src/models/Project.js

import mongoose from "mongoose";

/**
 * Project Schema
 */
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
      maxlength: [100, "Project name cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
      maxlength: [
        500,
        "Project description cannot be more than 500 characters",
      ],
    },
    author: {
      type: String,
      required: [true, "Project author is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
