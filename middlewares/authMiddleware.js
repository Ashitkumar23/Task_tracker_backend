import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.modals.js";
import jwt from "jsonwebtoken";

const verifyjwt = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accesstoken || req.header('Authorization')?.replace('Bearer ', '');

console.log("Cookies:", req.cookies);
  console.log(token, 'token from auth middleware');

  if (!token) {
    throw new ApiError(401, 'No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);

    const user = await User.findById(decoded?._id).select('-password -refreshtoken');

    if (!user) {
      throw new ApiError(401, 'Invalid access token: user not found');
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, 'Invalid or expired access token');
  }
});


export { verifyjwt };