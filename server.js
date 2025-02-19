import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./Config/MongoDb.js";

import morgan from "morgan";
import cors from "cors";
import { errorHandler, notFound } from "./Middleware/Error.js";
import exerciseRouter from "./Routes/ExerciseRoute.js";
import mealRouter from "./Routes/MealRoute.js";
import sleepRouter from "./Routes/SleepRoute.js";
import waterRouter from "./Routes/WaterRoute.js";
import weightRouter from "./Routes/WeightRoute.js";
import userRouter from "./Routes/UserRoute.js";
import importData from "./DataImports.js";

// import appointmentRouter from "./Routes/AppointmentRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan());
app.use("/webhook", express.raw({ type: "application/json" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/exercise", exerciseRouter);

app.use("/api/meal", mealRouter);
app.use("/api/sleep", sleepRouter);
app.use("/api/water", waterRouter);
app.use("/api/weight", weightRouter);
app.use("/api/users", userRouter);
app.use("/api/import", importData);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

const start = async () => {
  try {
    await connectDatabase(process.env.MONGO_URL);
    app.listen(PORT, console.log(`server is running on port ${PORT}.......`));
  } catch (error) {
    console.log(error);
  }
};
start();
