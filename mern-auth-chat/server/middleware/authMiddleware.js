import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { promisify } from "util"

// Middleware function to protect routes by verifying the user's token.
const protect = asyncHandler(async (req, res, next) => {
  let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }else if (req.headers.cookie && req.headers.cookie.startsWith('jwt')) {
        token = req.headers.cookie.split('=')[1];
    };
    try{
      console.log(token,'token');

    // Verify the token using the JWT_SECRET_KEY. 
    const decoder = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
    const currentUser = await User.findById(decoder.id).select("-password");
    req.user = currentUser;
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
});

export { protect };
