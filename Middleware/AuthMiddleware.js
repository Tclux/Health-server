import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../Models/UserSchema.js";



// Middleware for protecting routes accessible only to parents

// Middleware for protecting routes accessible only to children
export const protect = asyncHandler(async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } else {
      throw new Error("Not Authorized, no token provided");
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Not Authorized", error: error.message });
  }
});
