"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const config_1 = require("../../config");
const res_1 = require("../res");
const http_status_codes_1 = require("http-status-codes");
const fs_1 = __importDefault(require("fs"));
cloudinary_1.default.v2.config({
    cloud_name: config_1.ServerConfig.CLOUDINARY_ClOUD_NAME,
    api_key: config_1.ServerConfig.CLOUDINARY_KEY_API,
    api_secret: config_1.ServerConfig.CLOUDINARY_SECRET_API,
    secure: true,
});
async function uploadOnCloudinary(filepath) {
    try {
        const response = await cloudinary_1.default.v2.uploader.upload(filepath, {
            resource_type: "auto",
        });
        console.log(`file is been uploaded on cloudinary url:${response.url}`);
        return response;
    }
    catch (error) {
        fs_1.default.unlinkSync(filepath);
        throw new res_1.ApiError(error.message, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
exports.default = uploadOnCloudinary;
