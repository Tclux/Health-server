import express from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "./../Utils/GenerateToken.js";


import User from "../Models/UserSchema.js";
import { protect } from "../Middleware/AuthMiddleware.js";
import Doctors from "../Models/DoctorSchema.js";

const userRouter = express.Router();

// Register User
userRouter.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { email, lastName, firstName, password } = req.body;
    console.log(req.body);
    if (!email || !password || !firstName || !lastName) {
      res.status(400);
      throw new Error("please add all fields");
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error("User already exist");
    }
    const user = await User.create({
      email,
      firstName,
      lastName,
      password,
    });
    res.status(201).json({
      _id: user._id,
      name: user.firstName,
      email: user.lastName,
      token: generateToken(user._id),
      createdAt: user.createdAt,
    });
  })
);

// ****Login User
userRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!email || !password) {
      throw new Error("Please fill all fields");
    }

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastname: user.lastName,
        email: user.email,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid credentials");
    }
  })
);

userRouter.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({ user });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

userRouter.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const { lastName,firstName, email, password, city, state, country, address, gender } = req.body;
    const user = await User.findById(req.user._id);
    if (user) {
      user.firstName = firstName || user.firstName;
      user.email = email || user.email;
         user.lastName = lastName || user.lastName;
      user.city = city || user.city;
         user.address = address || user.address;
      user.state = state || user.state;
      user.country = country || user.country;
        user.gender = gender || user.gender;
      if (password !== "") {
        user.password = password;
      }
      const updateUser = await user.save();
      res.json({
        _id: updateUser._id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser._id),
        createdAt: updateUser.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

userRouter.get(
  "/doctors",
  asyncHandler(async (req, res) => {
    try {
      const doctors = await Doctors.find();
      if (!doctors) {
        throw new Error("Doctors not found");
      }
      res.json(doctors);
    } catch (error) {
      throw new Error("Error fetching doctors: " + error.message);
    }
  })
);
userRouter.get(
  "/doctors/profile",
  asyncHandler(async (req, res) => {
    try {
      const doctorId = "660e69c1e61cf4e6becd74f9";
      const doctor = await Doctors.findById(doctorId);
      if (!doctor) {
        throw new Error(`Doctor with ID ${doctorId} not found`);
      }
      res.json(doctor);
    } catch (error) {
      throw new Error(`Error fetching doctor: ${error.message}`);
    }
  })
);
userRouter.get(
  "/doctors/:id",
  asyncHandler(async (req, res) => {
    try {
      const doctorId = req.params.id;
      const doctor = await Doctors.findById(doctorId);
      if (!doctor) {
        throw new Error(`Doctor with ID ${doctorId} not found`);
      }
      res.json(doctor);
    } catch (error) {
      throw new Error(`Error fetching doctor: ${error.message}`);
    }
  })
);



export default userRouter;
