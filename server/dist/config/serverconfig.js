"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.ServerConfig = {
    PORT: process.env.PORT,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    JWT_SECRET: process.env.JWT_SECRET,
    CLOUDINARY_SECRET_API: process.env.CLOUDINARY_SECRET_API,
    CLOUDINARY_KEY_API: process.env.CLOUDINARY_KEY_API,
    CLOUDINARY_ClOUD_NAME: process.env.CLOUDINARY_ClOUD_NAME,
};
