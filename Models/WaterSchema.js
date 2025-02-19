// models/Water.js

import mongoose from "mongoose";

const waterSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  litersDrank: { type: Number, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Water = mongoose.model("Water", waterSchema);

export default Water;
