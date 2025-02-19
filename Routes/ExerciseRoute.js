import express from "express";
import LoggedExercise from "../Models/ExerciseSchema.js";
import { protect } from "../Middleware/AuthMiddleware.js";
import asyncHandler from "express-async-handler";

const exerciseRouter = express.Router();

// Route to handle saving a logged exercise
exerciseRouter.post("/create-exercise",protect, async (req, res) => {
  try {
    // Create a new instance of LoggedExercise model with data from request body
      const userId = req.user._id;

   
    const newExercise = new LoggedExercise({
      ...req.body,
      user: userId,
    });
    // Save the new exercise to the database
    const savedExercise = await newExercise.save();
    // Send the saved exercise back as a response
    res.status(201).json(savedExercise);
  } catch (error) {
    console.error("Error saving exercise:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
exerciseRouter.get(
  "/exercises",
  protect,
  asyncHandler(async (req, res) => {
    try {
      // Fetch meals for the logged-in user using the user ID from req.user._id
      const exercises = await LoggedExercise.find({ user: req.user._id });
      res.status(200).json(exercises);
    } catch (error) {
      console.error("Error fetching meals:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

// Export the router
export default exerciseRouter;
