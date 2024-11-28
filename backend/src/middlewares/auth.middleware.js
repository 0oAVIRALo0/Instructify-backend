import { asyncHandler, errorHandler } from "../utils/index.js";
import jwt from "jsonwebtoken"; 
import { User } from "../models/index.js";
import { generateTokens } from "../utils/index.js";

const verifyJWT = asyncHandler(async(req, _, next) => {
  try {
    const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    const refreshToken = req.cookies?.refreshToken

    if (!accessToken) {
        throw new errorHandler(401, "Unauthorized request")
    }

    let decodedAccessToken;
    try {
     decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET) 
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        if (!refreshToken) {
          throw new errorHandler(401, "Unauthorized request")
        }

        const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedRefreshToken?._id)

        if (!user || user.refreshToken !== refreshToken) {
          throw new errorHandler(401, "Invalid or expired refresh token")
        }

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await generateTokens(user._id);

        res.cookie("accessToken", newAccessToken, { httpOnly: true, secure: true });
        res.cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: true });

        decodedAccessToken = jwt.verify(newAccessToken, process.env.ACCESS_TOKEN_SECRET)
      } else { 
        throw new errorHandler(401, error?.message || "Invalid access token")
      }
    }

    const user = await User.findById(decodedAccessToken?._id).select("-password -refreshToken")
    // console.log("user", user);

    if (!user) {
        throw new errorHandler(401, "Invalid Access Token")
    }

    req.user = user;
    next()
  } catch (error) {
    throw new errorHandler(401, error?.message || "Invalid access token")
  }
})

export { verifyJWT }