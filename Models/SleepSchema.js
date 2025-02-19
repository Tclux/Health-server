// models/Sleep.js

import mongoose from "mongoose";

const sleepSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  hoursSlept: { type: Number, required: true },
  quality: {
    type: String,
    enum: ["Poor", "Fair", "Good", "Excellent"],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Sleep = mongoose.model("Sleep", sleepSchema);

export default Sleep;
