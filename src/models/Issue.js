// src/models/Issue.js

import mongoose from "mongoose";

/**
 * Issue Schema
 */
const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Issue title is required"],
      trim: true,
      maxlength: [200, "Issue title cannot be more than 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Issue description is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Issue author is required"],
      trim: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Issue must belong to a project"],
    },
    labels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Label",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;
