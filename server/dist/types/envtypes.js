"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
const envTypes = zod_1.z.object({
    POSTGRES_USER: zod_1.z.string(),
    POSTGRES_PASSWORD: zod_1.z.string(),
    POSTGRES_DB: zod_1.z.string(),
    POSTGRES_PORT: zod_1.z.string().transform(Number),
    POSTGRES_HOST: zod_1.z.string(),
    JWT_SECRET: zod_1.z.string(),
    CLOUDINARY_SECRET_API: zod_1.z.string(),
    CLOUDINARY_KEY_API: zod_1.z.string(),
    CLOUDINARY_ClOUD_NAME: zod_1.z.string(),
});
dotenv_1.default.config();
envTypes.parse(process.env);
