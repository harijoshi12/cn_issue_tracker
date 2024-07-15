import Label from "../models/Label.js";

export const suggestLabels = async (req, res) => {
  try {
    const query = req.query.q;
    const labels = await Label.find({ name: new RegExp(query, "i") }).limit(5);
    res.json(labels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching label suggestions" });
  }
};

export const createLabel = async (req, res) => {
  try {
    const label = await Label.create(req.body);
    res.status(201).json(label);
  } catch (error) {
    res.status(400).json({ message: "Error creating label" });
  }
};
