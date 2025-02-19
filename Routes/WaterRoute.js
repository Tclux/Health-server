// routes/waterRoutes.js

import express from "express";
import Water from "../Models/WaterSchema.js";
import { protect } from "../Middleware/AuthMiddleware.js";

const waterRouter = express.Router();

// Create a new water entry
waterRouter.post("/create-water",protect, async (req, res) => {
  try {
       const userId = req.user._id;

       // Create a new meal object with user id included
       const newWaterEntry = new Water({
         ...req.body,
         user: userId,
       });
    const savedWaterEntry = await newWaterEntry.save();
    res.status(201).json(savedWaterEntry);
  } catch (error) {
    console.error("Error saving water entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all water entries
waterRouter.get("/waters", protect, async (req, res) => {
  try {
    const allWaterEntries = await Water.find({user:req.user._id});
    res.json(allWaterEntries);
  } catch (error) {
    console.error("Error fetching water entries:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default waterRouter;
