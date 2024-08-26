import { uploadOnCloudinary } from ".";
import fs from "fs";
import { ApiError } from "../res";
import { StatusCodes } from "http-status-codes";

async function handleFileUploads(files: Express.Multer.File[]) {
  const uploadedFiles = [];
  for (const file of files) {
    const cloudinaryResponse = await uploadOnCloudinary(file.path);
    uploadedFiles.push({
      attachmentPublicId: cloudinaryResponse.public_id,
      attachmentUrl: cloudinaryResponse.url,
    });
    fs.unlinkSync(file.path);
  }

  if (uploadedFiles.length === 0) {
    throw new ApiError("No files uploaded", StatusCodes.BAD_REQUEST);
  }
  return uploadedFiles[0];
}

export default handleFileUploads;
