import express from "express";
import Meal from "../Models/MealSchema.js";
import asyncHandler from "express-async-handler";
import { protect } from './../Middleware/AuthMiddleware.js';
const mealRouter = express.Router();

mealRouter.post(
  "/create-meal",
  protect,
  asyncHandler(async (req, res) => {
    try {
      // Extract user id from request
      const userId = req.user._id;

      // Create a new meal object with user id included
      const newMeal = new Meal({
        ...req.body,
        user: userId,
      });

      // Save the meal
      const savedMeal = await newMeal.save();

      // Respond with the saved meal
      res.status(201).json(savedMeal);
    } catch (error) {
      console.error("Error saving meal:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);


mealRouter.get(
  "/meals",
  protect,
  asyncHandler(async (req, res) => {
    try {
      // Fetch meals for the logged-in user using the user ID from req.user._id
      const meals = await Meal.find({ user: req.user._id });
      res.status(200).json(meals);
    } catch (error) {
      console.error("Error fetching meals:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);
 


export default mealRouter;
