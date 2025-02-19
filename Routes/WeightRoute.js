import express from "express";
import Weight from "../Models/WeightSchema.js";
import { protect } from "../Middleware/AuthMiddleware.js";

// Get all weight entries
const weightRouter = express.Router();

weightRouter.get("/weights", protect, async (req, res) => {
  try {
    const weights = await Weight.find({ user: req.user._id });
    res.json(weights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new weight entry
weightRouter.post("/create-weight", protect, async (req, res) => {
  const userId = req.user._id;
  const weight = new Weight({
    date: req.body.date,
    weight: req.body.weight,
    user: userId,
  });
  try {
    const newWeight = await weight.save();
    res.status(201).json(newWeight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default weightRouter;
