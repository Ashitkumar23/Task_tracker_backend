import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.modals.js";
import jwt from "jsonwebtoken";

const generateAccessandrefreshToken = async (userID) => {
  
  try {
      const user = await User.findById(userID)
      const accesstoken = user.generateAccessToken()
      const refreshtoken = user.generateRefreshToken()

      console.log(accesstoken,refreshtoken)

      user.refreshtoken = refreshtoken
      await user.save({validateBeforeSave: false})

      return {accesstoken,refreshtoken}

  } catch (error) {
       throw new ApiError(500, "something went wrong while generating tokken")
  }
}

const signin = asyncHandler(async (req, res) => {
  const { fullname, email, country, password } = req.body;

  if (
    [fullname, country, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "all fields are mandaotry");
  }

  const exist = await User.findOne({
    email
  })

  if (exist) {
    throw new ApiError(400,"user already exist")
  }

  const user = await User.create({
    fullname, email, country, password
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshTokken"
   )

   if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registring")
   }

   return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered succusfully")
   )

});


const login = async (req, res) => {
  const { email, password } = req.body;

  // Find user and check password (simplified for brevity)
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign(user.toJSON(), process.env.ACCES_TOKEN_SECRET, { expiresIn: '1h' });

  // Set the token in a cookie
  res.cookie("accesstoken", token, {
    httpOnly: true,
    secure: false,      // false is okay for localhost over HTTP
    sameSite: "Lax",    // ✅ works without secure over localhost
    maxAge: 1000 * 60 * 60 // 1 hour
  });

  console.log("accesstoken", token)

  // Respond with user data (optional)
  res.json({ user });
};



export {signin, login}