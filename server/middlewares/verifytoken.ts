import { Response, NextFunction } from "express";
import { CustomRequest } from "../types/utilitytypes";
import { ApiError } from "../utils/res";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { ServerConfig } from "../config";
async function verifytoken(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies["token"];
    if (!token) {
      return next(
        new ApiError("User not authenticated", StatusCodes.UNAUTHORIZED)
      );
    }
    const decoded = jwt.verify(token, ServerConfig.JWT_SECRET) as string;
    if (!decoded) {
      return next(new ApiError("User token invalid", StatusCodes.UNAUTHORIZED));
    }
    req.id = decoded;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return next(new ApiError("Token has expired", StatusCodes.UNAUTHORIZED));
    }
    if (error.name === "JsonWebTokenError") {
      return next(new ApiError("Invalid token", StatusCodes.UNAUTHORIZED));
    }
    next(
      new ApiError("Authentication failed", StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
}

export default verifytoken;
