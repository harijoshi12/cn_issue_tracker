// src/models/Label.js

import mongoose from "mongoose";

/**
 * Label Schema
 */
const labelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Label name is required"],
    trim: true,
    unique: true,
    maxlength: [50, "Label name cannot be more than 50 characters"],
  },
});

const Label = mongoose.model("Label", labelSchema);

export default Label;
