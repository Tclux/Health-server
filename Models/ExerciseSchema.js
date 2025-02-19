import mongoose from "mongoose";

const loggedExerciseSchema = new mongoose.Schema({
  routine: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const LoggedExercise = mongoose.model("LoggedExercise", loggedExerciseSchema);

export default LoggedExercise;
