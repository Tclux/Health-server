// routes/sleepRoutes.js

import express from "express";

import Sleep from "./../Models/SleepSchema.js";
import { protect } from "../Middleware/AuthMiddleware.js";

const sleepRouter = express.Router();

// Create a new sleep entry
sleepRouter.post("/create-sleep", protect, async (req, res) => {
  try {
        const userId = req.user._id;

        // Create a new meal object with user id included
        const newSleep = new Sleep({
          ...req.body,
          user: userId,
        });
  
    const savedSleep = await newSleep.save();
    res.status(201).json(savedSleep);
  } catch (error) {
    console.error("Error saving sleep entry:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// Get all sleep entries
sleepRouter.get("/sleeps", protect, async (req, res) => {
  try {
    const allSleepEntries = await Sleep.find({user:req.user?._id});
    res.json(allSleepEntries);
  } catch (error) {
    console.error("Error fetching sleep entries:", error);
    res.status(500).json({ message: "Internal server error",error});
  }
});

export default sleepRouter;
