import cloudinary from "cloudinary";
import { ServerConfig } from "../../config";
import { ApiError } from "../res";
import { StatusCodes } from "http-status-codes";
import fs from "fs";

cloudinary.v2.config({
  cloud_name: ServerConfig.CLOUDINARY_ClOUD_NAME,
  api_key: ServerConfig.CLOUDINARY_KEY_API,
  api_secret: ServerConfig.CLOUDINARY_SECRET_API,
  secure: true,
});

async function uploadOnCloudinary(filepath: string) {
  try {
    const response = await cloudinary.v2.uploader.upload(filepath, {
      resource_type: "auto",
    });
    console.log(`file is been uploaded on cloudinary url:${response.url}`);
    return response;
  } catch (error: any) {
    fs.unlinkSync(filepath);
    throw new ApiError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export default uploadOnCloudinary;
