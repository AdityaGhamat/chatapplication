import { UserServices } from "../services";
import { Request, Response } from "express";
import { ApiError, ApiSuccess } from "../utils/res";
import { StatusCodes } from "http-status-codes";
import { UserTypes, LoginUserTypes } from "../types";
import bcrypt from "bcrypt";
import { CustomRequest } from "../types/utilitytypes";

async function createUser(req: Request, res: Response) {
  try {
    const { name, username, password, avatar, url }: UserTypes = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const response = await UserServices.createUser({
      name,
      username,
      password: hashPassword,
      avatar,
      url,
    });
    if (response instanceof ApiError) {
      return res.status(response.statusCode).json(response.toJSON());
    }
    const success = new ApiSuccess(
      StatusCodes.CREATED,
      "User Created Successfully",
      response
    );
    return res.status(success.statusCode).json(success.toJson());
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.toJSON());
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

async function loginUser(req: Request, res: Response) {
  try {
    const { username, password }: LoginUserTypes = req.body;
    const response = await UserServices.loginUser({ username, password });
    if (response instanceof ApiError) {
      return res.status(response.statusCode).json(response.toJSON());
    }
    const success = new ApiSuccess(
      StatusCodes.ACCEPTED,
      "user logged in successfully",
      {}
    );
    return res
      .status(success.statusCode)
      .cookie("token", response.token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        httpOnly: true,
        secure: true,
      })
      .json(success.toJson());
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.toJSON());
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

async function getUser(req: CustomRequest, res: Response) {
  try {
    const id = req.id as string;
    const response = await UserServices.getUser(id);
    if (response instanceof ApiError) {
      return res.status(response.statusCode).json(response.toJSON());
    }
    const success = new ApiSuccess(
      StatusCodes.ACCEPTED,
      "Successfully found user",
      response
    );
    return res.status(success.statusCode).json(success.toJson());
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.toJSON());
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

async function updateUser(req: CustomRequest, res: Response) {
  try {
    const id = req.id as string;
    const response = await UserServices.updateUser(id, req.body);
    if (response instanceof ApiError) {
      return res.status(response.statusCode).json(response.toJSON());
    }
    const success = new ApiSuccess(
      StatusCodes.ACCEPTED,
      "Successfully updated user",
      response
    );
    return res.status(success.statusCode).json(success.toJson());
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.toJSON());
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

async function deleteUser(req: CustomRequest, res: Response) {
  try {
    const id = req.id as string;
    const response = await UserServices.deleteUser(id);
    if (response instanceof ApiError) {
      return res.status(response.statusCode).json(response.toJSON());
    }
    const success = new ApiSuccess(
      StatusCodes.ACCEPTED,
      "Successfully deleted",
      response
    );
    return res.status(success.statusCode).json(success.toJson());
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.toJSON());
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}
async function logoutUser(req: Request, res: Response) {
  try {
    res
      .clearCookie("token", {
        sameSite: "none",
        httpOnly: true,
        secure: true,
      })
      .status(StatusCodes.OK)
      .json(new ApiSuccess(StatusCodes.OK, "Successfully logged out", {}));
  } catch (error: any) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error.toJSON());
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

export { createUser, loginUser, getUser, updateUser, deleteUser, logoutUser };
