import mongoose from "mongoose";

// Define the schema for workout routines
const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  intensity: {
    type: String,
    enum: ["Low", "Moderate", "High"],
    required: true,
  },
  caloriesBurned: {
    type: Number,
    required: true,
  },
  distanceCovered: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
 
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Create a model based on the schema
const WorkoutRoutine = mongoose.model("WorkoutRoutine", workoutSchema);

export default WorkoutRoutine;
